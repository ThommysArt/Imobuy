"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";
import { useTranslations } from "next-intl";
import type { Doc } from "@/convex/_generated/dataModel";

interface ListingCardProps {
  listing: Doc<"listings">;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const t = useTranslations("common.propertyType");
  const tLabel = useTranslations("common.label");
  const tProperties = useTranslations("properties");

  const formatPrice = (price: number, currency?: string) => {
    return formatCurrency(price, currency, { maximumFractionDigits: 0 });
  };

  const getTypeLabel = (type: string) => {
    try {
      return t(type as any);
    } catch {
      return type;
    }
  };

  const imageUrl = listing.images?.[0] ?? "/placeholder-property.jpg";

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          unoptimized={imageUrl.startsWith("blob:") || imageUrl.startsWith("http")}
        />
        {listing.featured && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {tProperties("featured")}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(listing.price, listing.currency)}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {getTypeLabel(listing.type)}
          </span>
          {listing.area_m2 != null && (
            <span className="text-xs sm:text-sm text-muted-foreground">
              {listing.area_m2} m²
            </span>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {listing.location.address}, {listing.location.city}
        </p>
        {(listing.bedrooms != null || listing.bathrooms != null) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            {listing.bedrooms != null && (
              <span>
                {listing.bedrooms}{" "}
                {listing.bedrooms > 1 ? tLabel("beds") : tLabel("bed")}
              </span>
            )}
            {listing.bathrooms != null && (
              <span>
                {listing.bathrooms}{" "}
                {listing.bathrooms > 1 ? tLabel("baths") : tLabel("bath")}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
