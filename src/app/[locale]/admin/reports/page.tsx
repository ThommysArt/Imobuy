"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Audit logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reports and audit logs coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
