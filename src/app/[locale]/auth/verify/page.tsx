"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";

export default function VerifyPage() {
  const t = useTranslations("auth.verify");
  const { data: session, isPending: sessionPending } = useSession();
  const convexUser = useQuery(
    api.users.getUserByEmail,
    session?.user?.email ? { email: session.user.email } : "skip"
  );
  const verifyAuthCode = useMutation(api.authCodes.verifyAuthCode);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convexUser?._id) return;
    setError(null);
    setLoading(true);
    try {
      const result = await verifyAuthCode({
        userId: convexUser._id as Id<"users">,
        code: code.trim().toUpperCase(),
      });
      if (result.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(t("invalidCode"));
      }
    } catch (err) {
      setError(t("invalidCode"));
    } finally {
      setLoading(false);
    }
  };

  if (sessionPending || (session && !convexUser && convexUser !== undefined)) {
    return (
      <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>Please sign in first to verify your email.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/signin">
              <Button className="w-full">Sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (convexUser === null) {
    return (
      <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>
              Your account is being set up. Please wait a moment and refresh, or sign in again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/signin">
              <Button className="w-full">Sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Verified</CardTitle>
            <CardDescription>{t("success")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Redirecting…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="code">{t("code")}</Label>
              <Input
                id="code"
                type="text"
                placeholder="XXXXXXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\s/g, "").toUpperCase().slice(0, 8))}
                required
                maxLength={8}
                className="font-mono tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "..." : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
