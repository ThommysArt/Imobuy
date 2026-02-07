import { query } from "./_generated/server";

export const getAdminStats = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").collect();
    const users = await ctx.db.query("users").collect();
    const totalListings = listings.length;
    const totalUsers = users.length;
    const pendingListings = listings.filter((l) => l.status === "pending").length;
    const activeListings = listings.filter((l) => l.status === "active").length;
    const draftListings = listings.filter((l) => l.status === "draft").length;
    const authCodes = await ctx.db.query("auth_codes").collect();
    const unusedCodes = authCodes.filter((c) => !c.used && c.expiresAt > Date.now()).length;
    return {
      totalListings,
      totalUsers,
      pendingListings,
      activeListings,
      draftListings,
      totalAuthCodes: authCodes.length,
      unusedAuthCodes: unusedCodes,
    };
  },
});
