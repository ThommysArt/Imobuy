"use client";

import { useEffect, useRef } from "react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { useMutation } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { authClient, useSession } from "@/lib/auth-client";
import { api } from "@/convex/_generated/api";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
);

/** Ensures the signed-in user has a Convex users row (for passkey/OAuth/first load). */
function EnsureConvexUser() {
  const ensureCurrentUser = useMutation(api.users.ensureCurrentUser);
  const { data: session } = useSession();
  const didEnsure = useRef(false);
  useEffect(() => {
    if (!session?.user?.email || didEnsure.current) return;
    didEnsure.current = true;
    ensureCurrentUser().catch(() => {
      didEnsure.current = false;
    });
  }, [session?.user?.email, ensureCurrentUser]);
  return null;
}

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) {
  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      <EnsureConvexUser />
      {children}
    </ConvexBetterAuthProvider>
  );
}
