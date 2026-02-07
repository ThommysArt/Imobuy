"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

/** Sends auth code email via Resend. Called from signupSyncAndSendCode. */
export const sendAuthCodeEmail = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    code: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set; skipping auth code email");
      return { sent: false };
    }

    const from =
      process.env.RESEND_FROM ?? "Imobuy <onboarding@resend.dev>";
    const to = args.email;
    const subject = "Your verification code – Imobuy";
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333;">
  <p>Hello${args.name ? ` ${args.name}` : ""},</p>
  <p>Your verification code is: <strong style="letter-spacing: 0.2em; font-size: 1.2em;">${args.code}</strong></p>
  <p>Enter this code on the verification page to verify your email. The code expires in 7 days.</p>
  <p>If you didn't sign up for Imobuy, you can ignore this email.</p>
  <p>— Imobuy</p>
</body>
</html>
`.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend failed: ${res.status} ${err}`);
    }
    return { sent: true };
  },
});

/** Sync user to Convex only (no verification). Call after BetterAuth signup when verification is disabled. */
export const signupSyncUser = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: true }> => {
    await ctx.runMutation(internal.users.internalCreateOrUpdateUser, {
      email: args.email,
      name: args.name,
      emailVerified: true,
    });
    return { success: true };
  },
});

/** Sync user to Convex, generate auth code, and send email. Call after BetterAuth signup when verification is enabled. */
export const signupSyncAndSendCode = action({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: true }> => {
    const userId = await ctx.runMutation(internal.users.internalCreateOrUpdateUser, {
      email: args.email,
      name: args.name,
      emailVerified: false,
    });
    const { code } = await ctx.runMutation(internal.authCodes.internalGenerateAuthCode, {
      userId,
      createdBy: "system",
    });
    // Inline send to avoid extra action call (same runtime)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const from = process.env.RESEND_FROM ?? "Imobuy <onboarding@resend.dev>";
      const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333;">
  <p>Hello${args.name ? ` ${args.name}` : ""},</p>
  <p>Your verification code is: <strong style="letter-spacing: 0.2em; font-size: 1.2em;">${code}</strong></p>
  <p>Enter this code on the verification page to verify your email. The code expires in 7 days.</p>
  <p>If you didn't sign up for Imobuy, you can ignore this email.</p>
  <p>— Imobuy</p>
</body>
</html>
`.trim();
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [args.email],
          subject: "Your verification code – Imobuy",
          html,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Resend failed:", res.status, err);
      }
    }
    return { success: true };
  },
});
