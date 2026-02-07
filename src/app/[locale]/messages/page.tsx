"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function MessagesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/auth/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-screen px-4 pt-24 flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Messages</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Real-time messaging will be available here. Thread list and thread view coming soon.
            </p>
            <Link href="/listings">
              <Button variant="outline">Browse listings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
