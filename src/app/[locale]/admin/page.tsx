"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Users, KeyRound, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function AdminDashboardPage() {
  const stats = useQuery(api.admin.getAdminStats, {});

  if (stats === undefined) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">—</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">—</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Listings",
      value: stats.totalListings,
      icon: List,
      href: "/admin/listings",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Pending Listings",
      value: stats.pendingListings,
      icon: AlertCircle,
      href: "/admin/listings",
      variant: stats.pendingListings > 0 ? "default" : "muted",
    },
    {
      title: "Auth Codes (unused)",
      value: stats.unusedAuthCodes,
      icon: KeyRound,
      href: "/admin/authcodes",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Listings by status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Active</span>
                <span className="font-medium">{stats.activeListings}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">{stats.pendingListings}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Draft</span>
                <span className="font-medium">{stats.draftListings}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
