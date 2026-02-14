"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id, Doc } from "@/convex/_generated/dataModel";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/currency";
import Image from "next/image";
import { Check, X, ExternalLink, Search, Trash2 } from "lucide-react";
import { CreateListingButton } from "@/components/admin/create-listing-dialog";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 20;

export default function AdminListingsPage() {
  const t = useTranslations("admin");
  const tDetails = useTranslations("admin.createListingDialog.details");
  const tStatus = useTranslations("common.status");
  const tCommon = useTranslations("common.button");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [transactionFilter, setTransactionFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const [cursor, setCursor] = useState<string>("");
  const [accumulatedListings, setAccumulatedListings] = useState<
    Doc<"listings">[]
  >([]);
  const [selectedIds, setSelectedIds] = useState<Set<Id<"listings">>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Id<"listings"> | null>(
    null
  );

  const result = useQuery(api.listings.getAdminListingsPaginated, {
    search: search.trim() || undefined,
    status: statusFilter || undefined,
    type: typeFilter || undefined,
    transaction: transactionFilter || undefined,
    sort: sort || undefined,
    cursor: cursor || undefined,
    numItems: PAGE_SIZE,
  });

  useEffect(() => {
    if (!result) return;
    if (!cursor) {
      setAccumulatedListings(result.page);
    } else {
      setAccumulatedListings((prev) => [...prev, ...result.page]);
    }
  }, [result?.page, result?.total, cursor]);

  const approveListing = useMutation(api.listings.approveListing);
  const rejectListing = useMutation(api.listings.rejectListing);
  const deleteListing = useMutation(api.listings.deleteListing);
  const deleteListings = useMutation(api.listings.deleteListings);

  const total = result?.total ?? 0;
  const nextCursor = result?.nextCursor ?? null;
  const isDone = result?.isDone ?? true;
  const displayed = accumulatedListings;

  const typeLabels: Record<string, string> = {
    land: tDetails("typeLand"),
    house: tDetails("typeHouse"),
    apartment: tDetails("typeApartment"),
    studio: tDetails("typeStudio"),
    other: tDetails("typeOther"),
  };
  const transactionLabels: Record<string, string> = {
    sale: tDetails("sale"),
    rent: tDetails("rent"),
  };

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.size === displayed.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayed.map((l) => l._id)));
    }
  }, [displayed, selectedIds.size]);

  const toggleSelectOne = useCallback((id: Id<"listings">) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleApprove = async (id: Id<"listings">) => {
    await approveListing({ id });
  };
  const handleReject = async (id: Id<"listings">) => {
    await rejectListing({ id });
  };

  const handleDeleteSelected = useCallback(async () => {
    if (listingToDelete) {
      await deleteListing({ id: listingToDelete });
      setAccumulatedListings((prev) =>
        prev.filter((l) => l._id !== listingToDelete)
      );
      setListingToDelete(null);
    } else {
      const ids = Array.from(selectedIds);
      if (ids.length === 0) return;
      await deleteListings({ ids });
      setAccumulatedListings((prev) => prev.filter((l) => !ids.includes(l._id)));
      setSelectedIds(new Set());
    }
    setDeleteDialogOpen(false);
  }, [selectedIds, listingToDelete, deleteListing, deleteListings]);

  const openDeleteDialog = useCallback((id: Id<"listings">) => {
    setListingToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (nextCursor) setCursor(nextCursor);
  }, [nextCursor]);

  const from = total === 0 ? 0 : 1;
  const to = displayed.length;
  const showLoadMore = !isDone && total > PAGE_SIZE;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t("listings")}</h1>
        <CreateListingButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("allListings")}</CardTitle>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCursor("");
                  setAccumulatedListings([]);
                }}
                className="pl-8"
              />
            </div>
            <Select
              value={statusFilter || "all"}
              onValueChange={(v) => {
                setStatusFilter(v === "all" ? "" : (v ?? ""));
                setCursor("");
                setAccumulatedListings([]);
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tStatus("all")}</SelectItem>
                <SelectItem value="draft">{tStatus("draft")}</SelectItem>
                <SelectItem value="pending">{tStatus("pending")}</SelectItem>
                <SelectItem value="active">{tStatus("active")}</SelectItem>
                <SelectItem value="approved">{tStatus("approved")}</SelectItem>
                <SelectItem value="sold">{tStatus("sold")}</SelectItem>
                <SelectItem value="archived">{tStatus("archived")}</SelectItem>
                <SelectItem value="rejected">{tStatus("rejected")}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter || "all"}
              onValueChange={(v) => {
                setTypeFilter(v === "all" ? "" : (v ?? ""));
                setCursor("");
                setAccumulatedListings([]);
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filterAll")}</SelectItem>
                <SelectItem value="land">{typeLabels.land}</SelectItem>
                <SelectItem value="house">{typeLabels.house}</SelectItem>
                <SelectItem value="apartment">{typeLabels.apartment}</SelectItem>
                <SelectItem value="studio">{typeLabels.studio}</SelectItem>
                <SelectItem value="other">{typeLabels.other}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={transactionFilter || "all"}
              onValueChange={(v) => {
                setTransactionFilter(v === "all" ? "" : (v ?? ""));
                setCursor("");
                setAccumulatedListings([]);
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filterAll")}</SelectItem>
                <SelectItem value="sale">{transactionLabels.sale}</SelectItem>
                <SelectItem value="rent">{transactionLabels.rent}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v ?? "newest");
                setCursor("");
                setAccumulatedListings([]);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("sortNewest")}</SelectItem>
                <SelectItem value="oldest">{t("sortOldest")}</SelectItem>
                <SelectItem value="price_asc">{t("sortPriceAsc")}</SelectItem>
                <SelectItem value="price_desc">{t("sortPriceDesc")}</SelectItem>
                <SelectItem value="title_asc">{t("sortTitleAsc")}</SelectItem>
                <SelectItem value="title_desc">{t("sortTitleDesc")}</SelectItem>
              </SelectContent>
            </Select>
            {selectedIds.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="size-4 mr-2" />
                {t("deleteSelected")} ({selectedIds.size})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        displayed.length > 0 &&
                        selectedIds.size === displayed.length
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label={t("selectAll")}
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">{t("image")}</TableHead>
                  <TableHead>{t("title")}</TableHead>
                  <TableHead>{t("type")}</TableHead>
                  <TableHead>{t("transaction")}</TableHead>
                  <TableHead>{t("price")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result === undefined ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      {t("loading")}
                    </TableCell>
                  </TableRow>
                ) : displayed.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      {t("noListings")}
                    </TableCell>
                  </TableRow>
                ) : (
                  displayed.map((listing) => (
                    <TableRow key={listing._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(listing._id)}
                          onCheckedChange={() => toggleSelectOne(listing._id)}
                          aria-label={t("selectAll")}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative h-12 w-16 rounded overflow-hidden bg-muted">
                          <Image
                            src={
                              listing.images?.[0] ?? "/placeholder-property.jpg"
                            }
                            alt={listing.title}
                            fill
                            className="object-cover"
                            unoptimized={listing.images?.[0]?.startsWith(
                              "http"
                            )}
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
                      <TableCell>
                        {typeLabels[listing.type] ?? listing.type}
                      </TableCell>
                      <TableCell>
                        {transactionLabels[listing.transaction] ??
                          listing.transaction}
                      </TableCell>
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
                          {tStatus(listing.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/listings/${listing.slug}`}
                          target="_blank"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            title={t("view")}
                          >
                            <ExternalLink className="size-4" />
                          </Button>
                        </Link>
                        {listing.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title={t("approve")}
                              onClick={() => handleApprove(listing._id)}
                            >
                              <Check className="size-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title={t("reject")}
                              onClick={() => handleReject(listing._id)}
                            >
                              <X className="size-4 text-destructive" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          title={t("delete")}
                          onClick={() => openDeleteDialog(listing._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {t("pageInfo", { from, to, total })}
            </p>
            {showLoadMore && (
              <Button variant="outline" onClick={loadMore}>
                {t("loadMore")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteDialogOpen || listingToDelete !== null}
        onOpenChange={handleDeleteDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteSelected")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirm", {
                count: listingToDelete ? 1 : selectedIds.size,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSelected}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("deleteSelected")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
