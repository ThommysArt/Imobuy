import { v } from "convex/values";
import { mutation, internalMutation, query } from "./_generated/server";

export const createOrUpdateUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(
      v.union(
        v.literal("guest"),
        v.literal("user"),
        v.literal("owner"),
        v.literal("agent"),
        v.literal("admin"),
        v.literal("superadmin")
      )
    ),
    emailVerified: v.optional(v.boolean()),
    authMethod: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    const now = Date.now();
    const doc = {
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      phone: args.phone,
      role: (args.role ?? "user") as "user",
      emailVerified: args.emailVerified ?? false,
      authMethod: (args.authMethod ?? "betterauth") as "betterauth" | "oauth" | "webauthn",
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc);
      return existing._id;
    }
    return await ctx.db.insert("users", doc);
  },
});

/** Used by signup action only. */
export const internalCreateOrUpdateUser = internalMutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    const now = Date.now();
    const doc = {
      email: args.email,
      name: args.name,
      role: "user" as const,
      emailVerified: args.emailVerified ?? false,
      authMethod: "betterauth" as const,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc);
      return existing._id;
    }
    return await ctx.db.insert("users", doc);
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
