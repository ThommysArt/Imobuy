"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Ban } from "lucide-react";
import { format } from "date-fns";

function maskCode(code: string) {
  if (code.length <= 4) return "****";
  return code.slice(0, 2) + "****" + code.slice(-2);
}

export default function AdminAuthCodesPage() {
  const codes = useQuery(api.authCodes.listAuthCodesWithUser, {});
  const revealAuthCode = useMutation(api.authCodes.revealAuthCode);
  const revokeAuthCode = useMutation(api.authCodes.revokeAuthCode);
  const [revealedCode, setRevealedCode] = useState<{ id: Id<"auth_codes">; code: string } | null>(null);

  const handleReveal = async (id: Id<"auth_codes">) => {
    try {
      const result = await revealAuthCode({ id });
      setRevealedCode({ id, code: result.code });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevoke = async (id: Id<"auth_codes">) => {
    await revokeAuthCode({ id });
    if (revealedCode?.id === id) setRevealedCode(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Auth Codes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Verification codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User email</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes === undefined ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Loading…
                    </TableCell>
                  </TableRow>
                ) : codes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No auth codes
                    </TableCell>
                  </TableRow>
                ) : (
                  codes.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell className="font-medium">{row.userEmail}</TableCell>
                      <TableCell className="font-mono">
                        {revealedCode?.id === row._id
                          ? row.code
                          : maskCode(row.code)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(row.createdAt, "PPp")}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(row.expiresAt, "PPp")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.used ? "secondary" : "default"}>
                          {row.used ? "Used" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {!row.used && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Reveal"
                              onClick={() => handleReveal(row._id)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Revoke"
                              onClick={() => handleRevoke(row._id)}
                            >
                              <Ban className="size-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!revealedCode} onOpenChange={() => setRevealedCode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revealed code</DialogTitle>
          </DialogHeader>
          {revealedCode && (
            <p className="font-mono text-lg tracking-widest text-center py-4">
              {revealedCode.code}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
