import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * App schema. Auth identity lives in the Better Auth component (convex/betterAuth/schema.ts).
 * The `users` table is the app profile/role store: synced on signup (email.ts signupSyncUser)
 * and on first sign-in (users.ensureCurrentUser via ConvexClientProvider). See BETTER_AUTH_SETUP.md.
 */
export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.union(
      v.literal("guest"),
      v.literal("user"),
      v.literal("owner"),
      v.literal("agent"),
      v.literal("admin"),
      v.literal("superadmin")
    ),
    emailVerified: v.boolean(),
    authMethod: v.optional(
      v.union(
        v.literal("betterauth"),
        v.literal("oauth"),
        v.literal("webauthn")
      )
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    metadata: v.optional(v.any()),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_createdAt", ["createdAt"]),

  listings: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.literal("XAF"),
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
    images: v.array(v.string()),
    videoUrl: v.optional(v.string()),
    videoThumbnail: v.optional(v.string()),
    location: v.object({
      address: v.string(),
      city: v.string(),
      region: v.optional(v.string()),
      country: v.string(),
      lat: v.number(),
      lng: v.number(),
      geohash: v.optional(v.string()),
    }),
    amenities: v.array(v.string()),
    tags: v.array(v.string()),
    ownerId: v.id("users"),
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("approved"),
      v.literal("active"),
      v.literal("sold"),
      v.literal("archived"),
      v.literal("rejected")
    ),
    featured: v.boolean(),
    viewsCount: v.number(),
    favoritesCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    publishedAt: v.optional(v.number()),
    priceHistory: v.optional(
      v.array(
        v.object({
          price: v.number(),
          date: v.number(),
        })
      )
    ),
    ownershipDocuments: v.optional(v.array(v.string())),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_price", ["price"])
    .index("by_ownerId", ["ownerId"])
    .index("by_featured_publishedAt", ["featured", "publishedAt"]),

  favorites: defineTable({
    userId: v.id("users"),
    listingId: v.id("listings"),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_listingId", ["listingId"]),

  messages: defineTable({
    participants: v.array(v.id("users")),
    listingId: v.optional(v.id("listings")),
    messages: v.array(
      v.object({
        senderId: v.id("users"),
        text: v.string(),
        attachments: v.optional(v.array(v.string())),
        createdAt: v.number(),
        read: v.boolean(),
      })
    ),
    updatedAt: v.number(),
  })
    .index("by_participants", ["participants"])
    .index("by_listingId", ["listingId"])
    .index("by_updatedAt", ["updatedAt"]),

  visits: defineTable({
    listingId: v.id("listings"),
    userId: v.id("users"),
    dateTime: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("done")
    ),
    createdAt: v.number(),
  })
    .index("by_listingId", ["listingId"])
    .index("by_userId", ["userId"]),

  auth_codes: defineTable({
    userId: v.id("users"),
    code: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
    used: v.boolean(),
    visibleToRoles: v.array(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_createdAt", ["createdAt"]),

  media: defineTable({
    ownerId: v.id("users"),
    listingId: v.optional(v.id("listings")),
    type: v.union(v.literal("image"), v.literal("video")),
    url: v.string(),
    thumbnailUrl: v.optional(v.string()),
    size: v.optional(v.number()),
    mime: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_listingId", ["listingId"]),

  audit_logs: defineTable({
    actorId: v.id("users"),
    action: v.string(),
    objectType: v.string(),
    objectId: v.string(),
    details: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_actorId", ["actorId"])
    .index("by_createdAt", ["createdAt"]),

  support_chats: defineTable({
    visitorToken: v.string(),
    respondentId: v.optional(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_visitorToken", ["visitorToken"])
    .index("by_updatedAt", ["updatedAt"])
    .index("by_respondentId", ["respondentId"]),

  support_chat_messages: defineTable({
    chatId: v.id("support_chats"),
    sender: v.union(v.literal("visitor"), v.literal("admin")),
    senderId: v.optional(v.id("users")),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_chatId_createdAt", ["chatId", "createdAt"]),
});
