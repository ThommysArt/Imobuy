"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Fingerprint, Mail } from "lucide-react";

export default function SignInPage() {
  const t = useTranslations("auth.signIn");
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricsEmail, setBiometricsEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);

  const adminCallback = `/${locale}/admin`;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: adminCallback,
      });
      if (result.error) {
        setError(result.error.message ?? "Sign in failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!biometricsEmail?.trim()) {
      setError("Email is required");
      return;
    }
    setError(null);
    setPasskeyLoading(true);
    try {
      const result = await signIn.passkey({
        fetchOptions: {
          onSuccess() {
            router.push("/admin");
          },
        },
      });
      if (result?.error) {
        setError(result.error.message ?? "Biometrics sign in failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Biometrics sign in failed");
    } finally {
      setPasskeyLoading(false);
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
              <form onSubmit={handleBiometricsSignIn} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="biometrics-email">{t("email")}</Label>
                  <Input
                    id="biometrics-email"
                    type="email"
                    placeholder="you@example.com"
                    value={biometricsEmail}
                    onChange={(e) => setBiometricsEmail(e.target.value)}
                    required
                    autoComplete="email webauthn"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={passkeyLoading || !biometricsEmail.trim()}
                >
                  {passkeyLoading ? "..." : t("signInWithBiometrics")}
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
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "..." : t("submit")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href="/auth/signup" className="text-primary font-medium underline">
              {t("signUpLink")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
