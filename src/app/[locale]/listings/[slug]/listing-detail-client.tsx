"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { ListingGallery } from "@/components/listing-gallery";
import { ListingCard } from "@/components/listing-card";
import { ListingsMap } from "@/components/listings-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/currency";
import { useTranslations } from "next-intl";

interface ListingDetailClientProps {
  slug: string;
}

export function ListingDetailClient({ slug }: ListingDetailClientProps) {
  const listing = useQuery(api.listings.getListingBySlug, { slug });
  const recordView = useMutation(api.listings.recordView);
  const related = useQuery(
    api.listings.getListings,
    listing
      ? {
          filter: {
            type: listing.type,
            transaction: listing.transaction,
          },
          page: { numItems: 4 },
          sort: "newest",
        }
      : "skip"
  );
  const relatedListings = related?.listings?.filter((l) => l.slug !== slug) ?? [];
  const t = useTranslations("properties.detail");
  const tNav = useTranslations("navigation");
  const tType = useTranslations("common.propertyType");
  const tStatus = useTranslations("common.status");
  const tLabel = useTranslations("common.label");

  useEffect(() => {
    if (listing?._id) {
      recordView({ listingId: listing._id });
    }
  }, [listing?._id, recordView]);

  if (listing === undefined) {
    return (
      <div className="min-h-screen px-4 pt-24 flex items-center justify-center">
        <div className="text-muted-foreground">Loading…</div>
      </div>
    );
  }
  if (listing === null) notFound();

  const formatPrice = (price: number, currency?: string) =>
    formatCurrency(price, currency, { maximumFractionDigits: 0 });
  const getTypeLabel = (type: string) => {
    try {
      return tType(type as "house" | "apartment" | "land" | "studio" | "other");
    } catch {
      return type;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-foreground">
              {tNav("home")}
            </Link>
            <span> / </span>
            <Link href="/listings" className="hover:text-foreground">
              {tNav("properties")}
            </Link>
            <span> / </span>
            <span className="text-foreground truncate">{listing.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <ListingGallery
                images={listing.images}
                title={listing.title}
                videoUrl={listing.videoUrl}
                videoThumbnail={listing.videoThumbnail}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    {listing.title}
                  </h1>
                  <span className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrice(listing.price, listing.currency)}
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                  {listing.location.address}, {listing.location.city}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                    {getTypeLabel(listing.type)}
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                    {listing.transaction === "sale" ? "Sale" : "Rent"}
                  </span>
                  {listing.area_m2 != null && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {listing.area_m2} m²
                    </span>
                  )}
                  {listing.bedrooms != null && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {listing.bedrooms}{" "}
                      {listing.bedrooms > 1 ? tLabel("beds") : tLabel("bed")}
                    </span>
                  )}
                  {listing.bathrooms != null && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {listing.bathrooms}{" "}
                      {listing.bathrooms > 1 ? tLabel("baths") : tLabel("bath")}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted">
                    {tStatus(listing.status as "available" | "pending" | "sold" | "active")}
                  </span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDescription")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDetails")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("type")}</p>
                      <p className="text-base font-medium">{getTypeLabel(listing.type)}</p>
                    </div>
                    {listing.area_m2 != null && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("size")}</p>
                        <p className="text-base font-medium">{listing.area_m2} m²</p>
                      </div>
                    )}
                    {listing.bedrooms != null && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("bedrooms")}</p>
                        <p className="text-base font-medium">{listing.bedrooms}</p>
                      </div>
                    )}
                    {listing.bathrooms != null && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("bathrooms")}</p>
                        <p className="text-base font-medium">{listing.bathrooms}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">{t("location")}</p>
                      <p className="text-base font-medium">{listing.location.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("city")}</p>
                      <p className="text-base font-medium">{listing.location.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {listing.amenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-wrap gap-2">
                      {listing.amenities.map((a) => (
                        <li
                          key={a}
                          className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>{t("locationMap")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ListingsMap listings={[listing]} className="rounded-lg" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("contactUs")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("contactDescription")}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link href="/contact">
                      <Button className="w-full">{t("requestVisit")}</Button>
                    </Link>
                    <a href="tel:+237612345678">
                      <Button variant="outline" className="w-full">
                        {t("callNow")}
                      </Button>
                    </a>
                    <a
                      href="https://wa.me/237612345678"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full">
                        {t("whatsApp")}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {relatedListings.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8">
                {t("relatedProperties")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedListings.slice(0, 3).map((l) => (
                  <ListingCard key={l.slug} listing={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
