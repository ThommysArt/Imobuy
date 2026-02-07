"use client";

import type { Doc } from "@/convex/_generated/dataModel";

interface ListingsMapProps {
  listings: Doc<"listings">[];
  className?: string;
}

/**
 * Map placeholder – Leaflet map temporarily disabled to avoid
 * "Map container is already initialized" runtime errors with Next.js/Turbopack.
 * Re-enable by restoring the previous implementation that used listings-map-client.
 */
export function ListingsMap({ listings, className }: ListingsMapProps) {
  const hasListings = listings.length > 0;
  const first = hasListings ? listings[0] : null;
  const osmLat = first?.location.lat ?? 3.848;
  const osmLng = first?.location.lng ?? 11.502;
  const osmLink = `https://www.openstreetmap.org/?mlat=${osmLat}&mlon=${osmLng}&zoom=12`;

  return (
    <div
      className={className}
      style={{ minHeight: 300 }}
      aria-label="Map placeholder"
    >
      <a
        href={osmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[300px] w-full items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm text-center px-4">
          View area on OpenStreetMap
          {hasListings && (
            <span className="block mt-1 text-xs">
              {listings.length} listing{listings.length !== 1 ? "s" : ""} in this area
            </span>
          )}
        </span>
      </a>
    </div>
  );
}
