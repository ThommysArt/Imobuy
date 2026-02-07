import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed creates one demo user and sample listings. Run from Convex dashboard or script.

const SAMPLE_LISTINGS = [
  {
    slug: "modern-luxury-villa-yaounde",
    title: "Modern Luxury Villa",
    description:
      "Stunning modern villa with panoramic views, premium finishes, and spacious living areas. Perfect for families seeking luxury and comfort in the heart of Yaoundé.",
    price: 45000000,
    type: "house" as const,
    transaction: "sale" as const,
    area_m2: 350,
    bedrooms: 4,
    bathrooms: 3,
    location: {
      address: "Bastos",
      city: "Yaoundé",
      country: "Cameroon",
      lat: 3.848,
      lng: 11.5021,
    },
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    amenities: ["pool", "garden", "parking"],
    tags: ["luxury", "villa"],
    featured: true,
  },
  {
    slug: "downtown-apartment-douala",
    title: "Downtown Apartment",
    description:
      "Contemporary apartment in the heart of Douala's business district with modern amenities and excellent connectivity.",
    price: 28000000,
    type: "apartment" as const,
    transaction: "sale" as const,
    area_m2: 120,
    bedrooms: 2,
    bathrooms: 2,
    location: {
      address: "Bonanjo",
      city: "Douala",
      country: "Cameroon",
      lat: 4.0511,
      lng: 9.7679,
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    amenities: ["parking", "security"],
    tags: ["apartment", "downtown"],
    featured: true,
  },
  {
    slug: "prime-land-yaounde",
    title: "Prime Land Parcel",
    description:
      "Prime development land in a rapidly growing area. Perfect for residential or commercial development with all legal documentation in order.",
    price: 32000000,
    type: "land" as const,
    transaction: "sale" as const,
    area_m2: 500,
    location: {
      address: "Etoa-Meki",
      city: "Yaoundé",
      country: "Cameroon",
      lat: 3.86,
      lng: 11.52,
    },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    ],
    amenities: [],
    tags: ["land", "development"],
    featured: true,
  },
];

export const seedDemo = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    let userId = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "demo@imobuy.local"))
      .first()
      .then((u) => u?._id);

    if (!userId) {
      userId = await ctx.db.insert("users", {
        email: "demo@imobuy.local",
        name: "Demo Admin",
        role: "admin",
        emailVerified: true,
        authMethod: "betterauth",
        createdAt: now,
        updatedAt: now,
      });
    }

    let inserted = 0;
    for (const sample of SAMPLE_LISTINGS) {
      const existing = await ctx.db
        .query("listings")
        .withIndex("by_slug", (q) => q.eq("slug", sample.slug))
        .first();
      if (existing) continue;

      await ctx.db.insert("listings", {
        slug: sample.slug,
        title: sample.title,
        description: sample.description,
        price: sample.price,
        currency: "XAF",
        type: sample.type,
        transaction: sample.transaction,
        area_m2: sample.area_m2,
        bedrooms: sample.bedrooms,
        bathrooms: sample.bathrooms,
        images: sample.images,
        location: sample.location,
        amenities: sample.amenities,
        tags: sample.tags,
        ownerId: userId,
        status: "active",
        featured: sample.featured,
        viewsCount: 0,
        favoritesCount: 0,
        createdAt: now,
        updatedAt: now,
        publishedAt: now,
      });
      inserted++;
    }
    return { ok: true, userId, listingsInserted: inserted };
  },
});

export const seedListings = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const now = Date.now();
    for (const sample of SAMPLE_LISTINGS) {
      const existing = await ctx.db
        .query("listings")
        .withIndex("by_slug", (q) => q.eq("slug", sample.slug))
        .first();
      if (existing) continue;

      await ctx.db.insert("listings", {
        slug: sample.slug,
        title: sample.title,
        description: sample.description,
        price: sample.price,
        currency: "XAF",
        type: sample.type,
        transaction: sample.transaction,
        area_m2: sample.area_m2,
        bedrooms: sample.bedrooms,
        bathrooms: sample.bathrooms,
        images: sample.images,
        location: sample.location,
        amenities: sample.amenities,
        tags: sample.tags,
        ownerId: args.userId,
        status: "active",
        featured: sample.featured,
        viewsCount: 0,
        favoritesCount: 0,
        createdAt: now,
        updatedAt: now,
        publishedAt: now,
      });
    }
    return { ok: true, count: SAMPLE_LISTINGS.length };
  },
});
