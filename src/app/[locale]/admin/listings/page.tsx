"use client";

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
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/currency";
import Image from "next/image";
import { Check, X, ExternalLink } from "lucide-react";

export default function AdminListingsPage() {
  const listings = useQuery(api.listings.getAdminListings, {});
  const approveListing = useMutation(api.listings.approveListing);
  const rejectListing = useMutation(api.listings.rejectListing);

  const allListings = Array.isArray(listings) ? listings : [];
  const handleApprove = async (id: Id<"listings">) => {
    await approveListing({ id });
  };
  const handleReject = async (id: Id<"listings">) => {
    await rejectListing({ id });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Listings</h1>
      <Card>
        <CardHeader>
          <CardTitle>All listings</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings === undefined ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Loading…
                      </TableCell>
                    </TableRow>
                  ) : allListings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No listings
                      </TableCell>
                    </TableRow>
                  ) : (
                    allListings.map((listing) => (
                      <TableRow key={listing._id}>
                        <TableCell>
                          <div className="relative h-12 w-16 rounded overflow-hidden bg-muted">
                            <Image
                              src={listing.images?.[0] ?? "/placeholder-property.jpg"}
                              alt={listing.title}
                              fill
                              className="object-cover"
                              unoptimized={listing.images?.[0]?.startsWith("http")}
                              sizes="64px"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/listings/${listing.slug}`}
                            className="font-medium hover:underline"
                          >
                            {listing.title}
                          </Link>
                        </TableCell>
                        <TableCell>{listing.type}</TableCell>
                        <TableCell>
                          {formatCurrency(listing.price, listing.currency, {
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              listing.status === "active"
                                ? "default"
                                : listing.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/listings/${listing.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" title="View">
                              <ExternalLink className="size-4" />
                            </Button>
                          </Link>
                          {listing.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Approve"
                                onClick={() => handleApprove(listing._id)}
                              >
                                <Check className="size-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Reject"
                                onClick={() => handleReject(listing._id)}
                              >
                                <X className="size-4 text-destructive" />
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
    </div>
  );
}
