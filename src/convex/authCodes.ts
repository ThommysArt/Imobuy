import { v } from "convex/values";
import { mutation, internalMutation, query } from "./_generated/server";

function randomAlphaNum(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const generateAuthCode = mutation({
  args: {
    userId: v.id("users"),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const code = randomAlphaNum(8);
    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000;

    await ctx.db.insert("auth_codes", {
      userId: args.userId,
      code,
      createdBy: args.createdBy ?? "system",
      createdAt: now,
      expiresAt,
      used: false,
      visibleToRoles: ["admin", "superadmin"],
    });

    return { code };
  },
});

/** Used by signup action only. */
export const internalGenerateAuthCode = internalMutation({
  args: {
    userId: v.id("users"),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const code = randomAlphaNum(8);
    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000;

    await ctx.db.insert("auth_codes", {
      userId: args.userId,
      code,
      createdBy: args.createdBy ?? "system",
      createdAt: now,
      expiresAt,
      used: false,
      visibleToRoles: ["admin", "superadmin"],
    });

    return { code };
  },
});

export const verifyAuthCode = mutation({
  args: {
    userId: v.id("users"),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const codes = await ctx.db
      .query("auth_codes")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const match = codes.find(
      (c) => !c.used && c.code === args.code && c.expiresAt > Date.now()
    );
    if (!match) return { ok: false, error: "invalid_or_expired" };

    await ctx.db.patch(match._id, { used: true });
    await ctx.db.patch(args.userId, { emailVerified: true, updatedAt: Date.now() });
    return { ok: true };
  },
});

export const listAuthCodes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("auth_codes")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

/** For admin UI: auth codes with user email. */
export const listAuthCodesWithUser = query({
  args: {},
  handler: async (ctx) => {
    const codes = await ctx.db
      .query("auth_codes")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
    const result = [];
    for (const c of codes) {
      const user = await ctx.db.get(c.userId);
      result.push({
        _id: c._id,
        userId: c.userId,
        code: c.code,
        createdBy: c.createdBy,
        createdAt: c.createdAt,
        expiresAt: c.expiresAt,
        used: c.used,
        userEmail: user?.email ?? "",
      });
    }
    return result;
  },
});

export const revokeAuthCode = mutation({
  args: { id: v.id("auth_codes") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { used: true });
    return { ok: true };
  },
});

/** Admin/superadmin: return the plain code and log to audit. */
export const revealAuthCode = mutation({
  args: {
    id: v.id("auth_codes"),
    actorId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    if (!doc) throw new Error("Auth code not found");
    if (args.actorId) {
      await ctx.db.insert("audit_logs", {
        actorId: args.actorId,
        action: "reveal_auth_code",
        objectType: "auth_codes",
        objectId: args.id,
        details: { userId: doc.userId },
        createdAt: Date.now(),
      });
    }
    return { code: doc.code };
  },
});
