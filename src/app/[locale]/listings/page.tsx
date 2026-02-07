"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

export default function ListingsPage() {
  const t = useTranslations("properties");
  const tNav = useTranslations("navigation");
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [transactionFilter, setTransactionFilter] = useState<string | undefined>(undefined);

  const result = useQuery(api.listings.getListings, {
    filter: {
      type: typeFilter,
      transaction: transactionFilter,
    },
    sort,
    page: { numItems: 24 },
  });

  const listings = result?.listings ?? [];
  const total = result?.total ?? 0;

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 sm:pb-[10vh]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{tNav("home")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tNav("properties")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Input
                placeholder={t("search.placeholder")}
                className="max-w-xs"
              />
              <Select
                value={typeFilter ?? "all"}
                onValueChange={(v) => setTypeFilter(v === "all" || !v ? undefined : v)}
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
                onValueChange={(v) =>
                  setTransactionFilter(v === "all" || !v ? undefined : v)
                }
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
              <Select value={sort} onValueChange={(v: any) => setSort(v)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_asc">Price: low to high</SelectItem>
                  <SelectItem value="price_desc">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ListingsMap listings={listings} className="rounded-lg overflow-hidden" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {total} {total === 1 ? "listing" : "listings"}
            </p>
            {result === undefined ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-48 rounded-lg bg-muted/50 animate-pulse"
                  />
                ))}
              </div>
            ) : listings.length > 0 ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {listings.map((listing) => (
                  <ListingCard key={listing.slug} listing={listing} />
                ))}
              </div>
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

        {listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {listings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
