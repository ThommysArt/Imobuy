import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
