"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Fingerprint, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PasskeyItem = {
  id: string;
  name?: string | null;
  createdAt?: number | null;
};

export default function AdminSettingsPage() {
  const t = useTranslations("auth.passkeys");
  const [passkeys, setPasskeys] = useState<PasskeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPasskeys = useCallback(async () => {
    setLoading(true);
    const { data, error } = await authClient.passkey.listUserPasskeys({});
    if (error) {
      setMessage({ type: "error", text: String(error.message ?? "Failed to load passkeys") });
      setPasskeys([]);
    } else {
      setPasskeys((data as PasskeyItem[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchPasskeys();
  }, [fetchPasskeys]);

  const handleAddPasskey = async () => {
    setAddLoading(true);
    setMessage(null);
    const { data, error } = await authClient.passkey.addPasskey({});
    setAddLoading(false);
    if (error) {
      setMessage({ type: "error", text: String(error.message ?? "Failed to add passkey") });
    } else {
      setMessage({ type: "success", text: t("addPasskeySuccess") });
      void fetchPasskeys();
    }
  };

  const handleDeletePasskey = async (id: string) => {
    const { error } = await authClient.passkey.deletePasskey({ id });
    if (error) {
      setMessage({ type: "error", text: String(error.message ?? "Failed to remove passkey") });
    } else {
      void fetchPasskeys();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Admin settings.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="size-5" />
            {t("title")}
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div
              className={`rounded-md p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {message.text}
            </div>
          )}
          <Button onClick={handleAddPasskey} disabled={addLoading}>
            {addLoading ? "..." : t("addPasskey")}
          </Button>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading passkeys…</p>
          ) : passkeys.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noPasskeys")}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("listTitle")}</p>
              <ul className="space-y-2">
                {passkeys.map((pk) => (
                  <li
                    key={pk.id}
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                  >
                    <span className="text-sm">
                      {pk.name ?? (pk.createdAt ? "Passkey" : pk.id.slice(0, 12) + "…")}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove passkey?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You will need to use email/password or add another passkey to sign in.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePasskey(pk.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {t("deletePasskey")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
