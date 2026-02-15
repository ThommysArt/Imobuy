import { query } from "./_generated/server";

/**
 * Returns the current Better Auth identity (from Convex auth config).
 * See BETTER_AUTH_SETUP.md and convex/auth.config.ts.
 * For app profile/role use users.getUserByEmail(identity.email) after ensureCurrentUser.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity;
  },
});
