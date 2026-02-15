"use client";

import { useState } from "react";
import { signUp, authClient } from "@/lib/auth-client";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Fingerprint, Mail } from "lucide-react";

function generateSecurePassword(): string {
  const bytes = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function SignUpPage() {
  const t = useTranslations("auth.signUp");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricsName, setBiometricsName] = useState("");
  const [biometricsEmail, setBiometricsEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [biometricsLoading, setBiometricsLoading] = useState(false);
  const signupSyncUser = useAction(api.email.signupSyncUser);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signUp.email({
        email,
        password,
        name: name.trim() || email.split("@")[0] || "User",
        callbackURL: "/admin",
      });
      if (result.error) {
        setError(String(result.error.message ?? "Sign up failed"));
        setLoading(false);
        return;
      }
      await signupSyncUser({ email, name: name || undefined });
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricsSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!biometricsEmail?.trim()) {
      setError("Email is required");
      return;
    }
    setError(null);
    setBiometricsLoading(true);
    try {
      const nameToUse =
        biometricsName.trim() || biometricsEmail.split("@")[0] || "User";
      const randomPassword = generateSecurePassword();
      const result = await signUp.email({
        email: biometricsEmail.trim(),
        password: randomPassword,
        name: nameToUse,
        callbackURL: "/admin",
      });
      if (result.error) {
        setError(String(result.error.message ?? "Sign up failed"));
        setBiometricsLoading(false);
        return;
      }
      await signupSyncUser({
        email: biometricsEmail.trim(),
        name: nameToUse,
      });
      const addResult = await authClient.passkey.addPasskey({
        name: `Biometrics (${biometricsEmail})`,
      });
      if (addResult.error) {
        setError(addResult.error.message ?? "Could not register Biometrics");
        setBiometricsLoading(false);
        return;
      }
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setBiometricsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="biometrics"
            className="w-full"
            onValueChange={() => setError(null)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="biometrics" className="gap-1.5">
                <Fingerprint className="size-4" />
                {t("tabBiometrics")}
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1.5">
                <Mail className="size-4" />
                {t("tabEmail")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="biometrics" className="mt-4">
              <form onSubmit={handleBiometricsSignUp} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="biometrics-name">{t("name")}</Label>
                  <Input
                    id="biometrics-name"
                    type="text"
                    placeholder={t("name")}
                    value={biometricsName}
                    onChange={(e) => setBiometricsName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biometrics-email">{t("email")}</Label>
                  <Input
                    id="biometrics-email"
                    type="email"
                    placeholder="you@example.com"
                    value={biometricsEmail}
                    onChange={(e) => setBiometricsEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={biometricsLoading || !biometricsEmail.trim()}
                >
                  {biometricsLoading ? "..." : t("signUpWithBiometrics")}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="email" className="mt-4">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "..." : t("submit")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link href="/auth/signin" className="text-primary font-medium underline">
              {t("signInLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
