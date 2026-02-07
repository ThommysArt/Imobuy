# Deploy notes – Imobuy

## Environment variables

### Next.js (Vercel / host)

- `NEXT_PUBLIC_CONVEX_URL` – Convex deployment URL (set by `npx convex dev` or from Convex dashboard)
- `NEXT_PUBLIC_APP_URL` – Public app URL for absolute OG/metadata (e.g. `https://imobuy.vercel.app`)
- `BETTER_AUTH_SECRET` – Secret for BetterAuth (min 32 chars)
- `BETTER_AUTH_DATABASE_PATH` – Path to SQLite DB for BetterAuth (e.g. `./sqlite.db`); for production use Postgres or another DB via BetterAuth adapter

### Convex dashboard

- `RESEND_API_KEY` – Resend API key for auth code emails
- `RESEND_FROM` – Optional; sender email (e.g. `Imobuy <noreply@yourdomain.com>`)

## Convex

1. Link project: `npx convex dev` (or `npx convex deploy` for production)
2. Set env in Convex dashboard: **Settings → Environment Variables** → add `RESEND_API_KEY` (and optionally `RESEND_FROM`)

## Seed data

From Convex dashboard **Functions** tab, run:

- `seed.seedDemo` – creates a demo admin user (`demo@imobuy.local`) and sample listings

Or via CLI (after `npx convex dev`):

```bash
npx convex run seed:seedDemo
```

## Auth

- BetterAuth handles sign-in/sign-up; sessions are stored in the configured DB (SQLite for dev).
- On signup, Convex action `email.signupSyncAndSendCode` syncs the user to Convex, generates an auth code, and sends it via Resend. Users verify on `/auth/verify`.
- For production, configure a real database adapter for BetterAuth and a verified Resend domain.

## Build

```bash
pnpm install
pnpm run build
```

Ensure `NEXT_PUBLIC_CONVEX_URL` is set at build time.

## Tests

- **Convex unit tests**: Use Convex testing utilities to test server functions (RBAC, success paths). Add tests in `convex/` with `*.test.ts` and run via `npx convex test` when configured.
- **E2E (Cypress)**: Add Cypress (or Playwright) for flows such as sign up → verify → sign in → create listing. Configure in `cypress/` or `e2e/` and run after starting the app and Convex dev.
