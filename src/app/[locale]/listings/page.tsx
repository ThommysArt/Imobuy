"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { ListingsMap } from "@/components/listings-map";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";

const PAGE_SIZE = 20;

export default function ListingsPage() {
  const t = useTranslations("listingsPage");
  const tNav = useTranslations("navigation");
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [transactionFilter, setTransactionFilter] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [accumulated, setAccumulated] = useState<Doc<"listings">[]>([]);
  const [mapOpen, setMapOpen] = useState(false);

  const filter = useCallback(
    () => ({
      type: typeFilter ?? undefined,
      transaction: transactionFilter ?? undefined,
      search: searchQuery.trim() || undefined,
    }),
    [typeFilter, transactionFilter, searchQuery]
  );

  const result = useQuery(api.listings.getListings, {
    filter: filter(),
    sort,
    page: { cursor: cursor ?? undefined, numItems: PAGE_SIZE },
  });

  const total = result?.total ?? 0;
  const nextCursor = result?.nextCursor;
  const currentPage = result?.listings ?? [];

  const displayedListings =
    cursor === undefined ? currentPage : [...accumulated, ...currentPage];

  const handleLoadMore = useCallback(() => {
    if (!result?.listings || !result?.nextCursor) return;
    setAccumulated((prev) => [...prev, ...result.listings]);
    setCursor(result.nextCursor ?? undefined);
  }, [result?.listings, result?.nextCursor]);

  const resetPagination = useCallback(() => {
    setCursor(undefined);
    setAccumulated([]);
  }, []);

  const canLoadMore = Boolean(nextCursor);
  const isLoading = result === undefined;

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] pt-28 sm:pt-40 pb-16 sm:pb-[10vh]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{tNav("home")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tNav("listings")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Filters row: search + filters + Map dialog trigger */}
        <div className="flex flex-wrap gap-2 items-center mb-8">
          <Input
            placeholder={t("search.placeholder")}
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              resetPagination();
            }}
          />
          <Select
            value={typeFilter ?? "all"}
            onValueChange={(v) => {
              setTypeFilter(v === "all" || !v ? undefined : v);
              resetPagination();
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={transactionFilter ?? "all"}
            onValueChange={(v) => {
              setTransactionFilter(v === "all" || !v ? undefined : v);
              resetPagination();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sort}
            onValueChange={(v: "newest" | "price_asc" | "price_desc") => {
              setSort(v);
              resetPagination();
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: low to high</SelectItem>
              <SelectItem value="price_desc">Price: high to low</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="default">
                <MapPin className="size-4 mr-2" />
                {t("map")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>{t("map")}</DialogTitle>
              </DialogHeader>
              <div className="min-h-[300px] flex-1 overflow-hidden rounded-lg">
                <ListingsMap
                  listings={displayedListings}
                  className="h-[60vh] w-full"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Listings count */}
        <p className="text-sm text-muted-foreground mb-4">
          {total} {total === 1 ? "listing" : "listings"}
        </p>

        {/* Listings grid below (full width) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-lg bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : displayedListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedListings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
            {canLoadMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={!nextCursor}
                >
                  {t("loadMore")}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
            <p>{t("noResults")}</p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                {tNav("home")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
