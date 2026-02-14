import type { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const getListings = query({
  args: {
    filter: v.optional(
      v.object({
        status: v.optional(v.string()),
        type: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        transaction: v.optional(v.string()),
        search: v.optional(v.string()),
      })
    ),
    page: v.optional(
      v.object({
        cursor: v.optional(v.string()),
        numItems: v.optional(v.number()),
      })
    ),
    sort: v.optional(
      v.union(
        v.literal("newest"),
        v.literal("price_asc"),
        v.literal("price_desc")
      )
    ),
  },
  handler: async (ctx, args) => {
    const numItems = args.page?.numItems ?? 20;
    const list = await ctx.db
      .query("listings")
      .withIndex("by_status", (idx) => idx.eq("status", "active"))
      .collect();
    let filtered = list;

    if (args.filter?.minPrice !== undefined) {
      filtered = filtered.filter((d) => d.price >= args.filter!.minPrice!);
    }
    if (args.filter?.maxPrice !== undefined) {
      filtered = filtered.filter((d) => d.price <= args.filter!.maxPrice!);
    }
    if (args.filter?.type) {
      filtered = filtered.filter((d) => d.type === args.filter!.type);
    }
    if (args.filter?.transaction) {
      filtered = filtered.filter((d) => d.transaction === args.filter!.transaction);
    }
    if (args.filter?.search && args.filter.search.trim()) {
      const q = args.filter.search.trim().toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.location.address.toLowerCase().includes(q) ||
          d.location.city.toLowerCase().includes(q) ||
          (d.location.region && d.location.region.toLowerCase().includes(q)) ||
          d.location.country.toLowerCase().includes(q)
      );
    }

    const order = args.sort ?? "newest";
    if (order === "newest") {
      filtered.sort((a, b) => b.createdAt - a.createdAt);
    } else if (order === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    const start = args.page?.cursor ? parseInt(args.page.cursor, 10) : 0;
    const page = filtered.slice(start, start + numItems);
    const nextCursor =
      start + numItems < filtered.length
        ? String(start + numItems)
        : undefined;

    return {
      listings: page,
      nextCursor,
      total: filtered.length,
    };
  },
});

export const getListingBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const listing = await ctx.db
      .query("listings")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return listing;
  },
});

export const getAdminListings = query({
  args: {},
  handler: async (ctx) => {
    const list = await ctx.db.query("listings").collect();
    list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  },
});

const ADMIN_SORT_OPTIONS = [
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "title_asc",
  "title_desc",
] as const;
const ADMIN_STATUS_OPTIONS = [
  "draft",
  "pending",
  "approved",
  "active",
  "sold",
  "archived",
  "rejected",
] as const;
const ADMIN_TYPE_OPTIONS = [
  "land",
  "house",
  "apartment",
  "studio",
  "other",
] as const;
const ADMIN_TRANSACTION_OPTIONS = ["sale", "rent"] as const;

export const getAdminListingsPaginated = query({
  args: {
    search: v.optional(v.string()),
    status: v.optional(v.string()),
    type: v.optional(v.string()),
    transaction: v.optional(v.string()),
    sort: v.optional(v.string()),
    cursor: v.optional(v.string()),
    numItems: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const numItems = Math.min(Math.max(args.numItems ?? 20, 1), 100);
    let list = await ctx.db.query("listings").collect();

    if (args.search?.trim()) {
      const q = args.search.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.slug.toLowerCase().includes(q) ||
          l.location.city.toLowerCase().includes(q) ||
          l.location.address.toLowerCase().includes(q)
      );
    }
    if (args.status && ADMIN_STATUS_OPTIONS.includes(args.status as (typeof ADMIN_STATUS_OPTIONS)[number])) {
      list = list.filter((l) => l.status === args.status);
    }
    if (args.type && ADMIN_TYPE_OPTIONS.includes(args.type as (typeof ADMIN_TYPE_OPTIONS)[number])) {
      list = list.filter((l) => l.type === args.type);
    }
    if (args.transaction && ADMIN_TRANSACTION_OPTIONS.includes(args.transaction as (typeof ADMIN_TRANSACTION_OPTIONS)[number])) {
      list = list.filter((l) => l.transaction === args.transaction);
    }

    const sortKey = args.sort && ADMIN_SORT_OPTIONS.includes(args.sort as (typeof ADMIN_SORT_OPTIONS)[number])
      ? args.sort
      : "newest";
    if (sortKey === "newest") {
      list.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortKey === "oldest") {
      list.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortKey === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortKey === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortKey === "title_asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "title_desc") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    const total = list.length;
    const cursorOffset = args.cursor ? parseInt(args.cursor, 10) : 0;
    const page = list.slice(cursorOffset, cursorOffset + numItems);
    const nextCursor =
      cursorOffset + numItems < total ? String(cursorOffset + numItems) : null;
    const isDone = nextCursor === null;

    return {
      page,
      nextCursor,
      isDone,
      total,
    };
  },
});

export const deleteListing = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (!listing) throw new Error("Listing not found");
    await ctx.db.delete(args.id);
    return { ok: true };
  },
});

export const deleteListings = mutation({
  args: { ids: v.array(v.id("listings")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      const listing = await ctx.db.get(id);
      if (listing) await ctx.db.delete(id);
    }
    return { ok: true, deleted: args.ids.length };
  },
});

export const getFeaturedListings = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    const listings = await ctx.db
      .query("listings")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
    const featured = listings
      .filter((l) => l.featured)
      .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
      .slice(0, limit);
    return featured;
  },
});

export const createListing = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    type: v.union(
      v.literal("land"),
      v.literal("house"),
      v.literal("apartment"),
      v.literal("studio"),
      v.literal("other")
    ),
    transaction: v.union(v.literal("sale"), v.literal("rent")),
    area_m2: v.optional(v.number()),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    location: v.object({
      address: v.string(),
      city: v.string(),
      region: v.optional(v.string()),
      country: v.string(),
      lat: v.number(),
      lng: v.number(),
    }),
    amenities: v.array(v.string()),
    tags: v.array(v.string()),
    featured: v.boolean(),
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("approved"),
      v.literal("active"),
      v.literal("sold"),
      v.literal("archived"),
      v.literal("rejected")
    ),
    imageStorageIds: v.array(v.string()),
    videoStorageId: v.optional(v.string()),
    videoThumbnailStorageId: v.optional(v.string()),
    ownershipDocumentStorageIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) throw new Error("Unauthorized");
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");
    const ownerId: Id<"users"> = user._id;

    const imageUrls: string[] = [];
    for (const id of args.imageStorageIds) {
      const url = await ctx.storage.getUrl(id);
      if (url) imageUrls.push(url);
    }
    let videoUrl: string | undefined;
    let videoThumbnail: string | undefined;
    if (args.videoStorageId) {
      videoUrl = (await ctx.storage.getUrl(args.videoStorageId)) ?? undefined;
      if (args.videoThumbnailStorageId) {
        videoThumbnail =
          (await ctx.storage.getUrl(args.videoThumbnailStorageId)) ?? undefined;
      }
    }
    const ownershipDocuments: string[] = [];
    for (const id of args.ownershipDocumentStorageIds ?? []) {
      const url = await ctx.storage.getUrl(id);
      if (url) ownershipDocuments.push(url);
    }

    let baseSlug = slugify(args.title) || "listing";
    let slug = baseSlug;
    let n = 0;
    while (await ctx.db.query("listings").withIndex("by_slug", (q) => q.eq("slug", slug)).first()) {
      n += 1;
      slug = `${baseSlug}-${n}`;
    }

    const now = Date.now();
    const listingId = await ctx.db.insert("listings", {
      slug,
      title: args.title,
      description: args.description,
      price: args.price,
      currency: "XAF",
      type: args.type,
      transaction: args.transaction,
      area_m2: args.area_m2,
      bedrooms: args.bedrooms,
      bathrooms: args.bathrooms,
      images: imageUrls,
      videoUrl,
      videoThumbnail,
      ownershipDocuments: ownershipDocuments.length > 0 ? ownershipDocuments : undefined,
      location: {
        address: args.location.address,
        city: args.location.city,
        region: args.location.region,
        country: args.location.country,
        lat: args.location.lat,
        lng: args.location.lng,
      },
      amenities: args.amenities,
      tags: args.tags,
      ownerId,
      status: args.status,
      featured: args.featured,
      viewsCount: 0,
      favoritesCount: 0,
      createdAt: now,
      updatedAt: now,
      publishedAt: args.status === "active" ? now : undefined,
    });

    const now2 = Date.now();
    for (const url of imageUrls) {
      await ctx.db.insert("media", {
        ownerId,
        listingId,
        type: "image",
        url,
        createdAt: now2,
      });
    }
    if (videoUrl) {
      await ctx.db.insert("media", {
        ownerId,
        listingId,
        type: "video",
        url: videoUrl,
        thumbnailUrl: videoThumbnail,
        createdAt: now2,
      });
    }

    return listingId;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const confirmUpload = mutation({
  args: {
    listingId: v.id("listings"),
    storageId: v.string(),
    type: v.union(v.literal("image"), v.literal("video")),
    thumbnailStorageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.listingId);
    if (!listing) throw new Error("Listing not found");
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get URL for upload");
    const now = Date.now();

    if (args.type === "image") {
      const images = [...listing.images, url];
      await ctx.db.patch(args.listingId, { images, updatedAt: now });
    } else {
      const videoThumbnail = args.thumbnailStorageId
        ? await ctx.storage.getUrl(args.thumbnailStorageId)
        : undefined;
      await ctx.db.patch(args.listingId, {
        videoUrl: url,
        videoThumbnail: videoThumbnail ?? undefined,
        updatedAt: now,
      });
    }

    const thumbUrl = args.thumbnailStorageId
      ? (await ctx.storage.getUrl(args.thumbnailStorageId)) ?? undefined
      : undefined;
    await ctx.db.insert("media", {
      ownerId: listing.ownerId,
      listingId: args.listingId,
      type: args.type,
      url,
      thumbnailUrl: thumbUrl,
      createdAt: now,
    });
    return { ok: true };
  },
});

export const recordView = mutation({
  args: { listingId: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.listingId);
    if (!listing) return;
    await ctx.db.patch(args.listingId, {
      viewsCount: listing.viewsCount + 1,
      updatedAt: Date.now(),
    });
  },
});

export const approveListing = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (!listing) throw new Error("Listing not found");
    const now = Date.now();
    await ctx.db.patch(args.id, {
      status: "active",
      updatedAt: now,
      publishedAt: now,
    });
    return { ok: true };
  },
});

export const rejectListing = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (!listing) throw new Error("Listing not found");
    await ctx.db.patch(args.id, {
      status: "rejected",
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});
