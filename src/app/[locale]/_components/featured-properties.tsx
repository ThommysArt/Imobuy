"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ListingCard } from "./listing-card";
import { InteractiveHoverButton } from "./interactive-hover-button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function FeaturedProperties() {
  const t = useTranslations("home.featuredProperties");
  const featured = useQuery(api.listings.getFeaturedListings, { limit: 6 });

  return (
    <section className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-[2vw] py-16 sm:py-[10vh] relative bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <p className="text-4xl sm:text-6xl md:text-8xl lg:text-[10em] max-w-5xl font-medium tracking-tighter leading-[1] uppercase">
            {t("title")}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground mt-4 sm:mt-6 max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {featured === undefined ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-lg bg-muted/50 animate-pulse"
                aria-hidden
              />
            ))
          ) : featured.length > 0 ? (
            featured.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))
          ) : null}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <Link href="/listings">
            <InteractiveHoverButton className="tracking-tighter uppercase text-xs sm:text-sm">
              {t("viewAll")}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
