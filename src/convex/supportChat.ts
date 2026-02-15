import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// --- Visitor (unauthenticated) ---

export const getOrCreateChat = mutation({
  args: { visitorToken: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("support_chats")
      .withIndex("by_visitorToken", (q) => q.eq("visitorToken", args.visitorToken))
      .first();
    if (existing) return existing._id;
    const now = Date.now();
    return await ctx.db.insert("support_chats", {
      visitorToken: args.visitorToken,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const listMessagesForVisitor = query({
  args: {
    visitorToken: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("support_chats")
      .withIndex("by_visitorToken", (q) => q.eq("visitorToken", args.visitorToken))
      .first();
    if (!chat) {
      return { page: [], isDone: true, continueCursor: "", splitCursor: undefined };
    }
    return await ctx.db
      .query("support_chat_messages")
      .withIndex("by_chatId_createdAt", (q) => q.eq("chatId", chat._id))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const sendMessageAsVisitor = mutation({
  args: { visitorToken: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    const chat = await ctx.db
      .query("support_chats")
      .withIndex("by_visitorToken", (q) => q.eq("visitorToken", args.visitorToken))
      .first();
    if (!chat) throw new Error("Chat not found");
    const now = Date.now();
    await ctx.db.insert("support_chat_messages", {
      chatId: chat._id,
      sender: "visitor",
      text: args.text.trim(),
      createdAt: now,
    });
    await ctx.db.patch(chat._id, { updatedAt: now });
    return chat._id;
  },
});

// --- Admin (authenticated + role check) ---

/** For now, any signed-in user can access support chat. Tighten to admin/superadmin when ready. */
async function requireAuthenticatedUser(ctx: QueryCtx | MutationCtx): Promise<Id<"users">> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) throw new Error("Unauthorized");
  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .first();
  if (!user) throw new Error("User not found");
  return user._id;
}

export const listChats = query({
  args: {},
  handler: async (ctx) => {
    await requireAuthenticatedUser(ctx);
    return await ctx.db
      .query("support_chats")
      .withIndex("by_updatedAt")
      .order("desc")
      .collect();
  },
});

/** Returns current signed-in user's Convex user id, or null. Used for respondent/take-over UI. */
export const getCurrentAdminUserId = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    return user?._id ?? null;
  },
});

export const getChat = query({
  args: { chatId: v.id("support_chats") },
  handler: async (ctx, args) => {
    await requireAuthenticatedUser(ctx);
    return await ctx.db.get(args.chatId);
  },
});

export const listMessagesForAdmin = query({
  args: {
    chatId: v.id("support_chats"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await requireAuthenticatedUser(ctx);
    return await ctx.db
      .query("support_chat_messages")
      .withIndex("by_chatId_createdAt", (q) => q.eq("chatId", args.chatId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const sendMessageAsAdmin = mutation({
  args: { chatId: v.id("support_chats"), text: v.string() },
  handler: async (ctx, args) => {
    const adminId = await requireAuthenticatedUser(ctx);
    const chat = await ctx.db.get(args.chatId);
    if (!chat) throw new Error("Chat not found");
    const now = Date.now();
    const respondentId = chat.respondentId ?? adminId;
    if (!chat.respondentId) {
      await ctx.db.patch(args.chatId, { respondentId: adminId, updatedAt: now });
    } else {
      await ctx.db.patch(args.chatId, { updatedAt: now });
    }
    await ctx.db.insert("support_chat_messages", {
      chatId: args.chatId,
      sender: "admin",
      senderId: adminId,
      text: args.text.trim(),
      createdAt: now,
    });
  },
});

export const takeOverChat = mutation({
  args: { chatId: v.id("support_chats") },
  handler: async (ctx, args) => {
    const adminId = await requireAuthenticatedUser(ctx);
    const chat = await ctx.db.get(args.chatId);
    if (!chat) throw new Error("Chat not found");
    await ctx.db.patch(args.chatId, { respondentId: adminId, updatedAt: Date.now() });
  },
});
