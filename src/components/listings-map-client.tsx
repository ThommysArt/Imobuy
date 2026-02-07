"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Doc } from "@/convex/_generated/dataModel";

// Fix default marker icons in Next/SSR
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapBounds({ listings }: { listings: Doc<"listings">[] }) {
  const map = useMap();
  const hasListings = listings.length > 0;
  const bounds = useMemo(() => {
    if (!hasListings) return null;
    const points = listings.map((l) => [l.location.lat, l.location.lng] as [number, number]);
    return L.latLngBounds(points);
  }, [listings, hasListings]);

  useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 14 });
    }
  }, [map, bounds]);

  return null;
}

interface ListingsMapClientProps {
  listings: Doc<"listings">[];
  className?: string;
  mapKey?: string;
}

export function ListingsMapClient({ listings, className, mapKey: mapKeyProp }: ListingsMapClientProps) {
  const fallbackId = useId();
  const mapKey = mapKeyProp ?? fallbackId;
  const [mounted, setMounted] = useState(false);

  // Defer map creation until after mount so Leaflet never sees a reused container.
  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (!cancelled) setMounted(true);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, []);

  const center: [number, number] =
    listings.length > 0
      ? [
          listings[0].location.lat,
          listings[0].location.lng,
        ]
      : [3.848, 11.502]; // Yaoundé default

  if (!mounted) {
    return (
      <div
        className={className}
        style={{ minHeight: 300 }}
        aria-label="Map loading"
      >
        <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-border bg-muted/30">
          <span className="text-sm text-muted-foreground">Loading map…</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ minHeight: 300 }} key={mapKey}>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={10}
        className="h-[300px] w-full rounded-lg border border-border z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds listings={listings} />
        {listings.map((listing) => (
          <Marker
            key={listing.slug}
            position={[listing.location.lat, listing.location.lng]}
          >
            <Popup>
              <a href={`/listings/${listing.slug}`} className="font-medium">
                {listing.title}
              </a>
              <br />
              <span className="text-muted-foreground text-sm">
                {listing.location.city}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

