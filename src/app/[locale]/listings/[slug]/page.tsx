import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ListingDetailClient } from "./listing-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await fetchQuery(api.listings.getListingBySlug, { slug });
  if (!listing) {
    return { title: "Listing – Imobuy" };
  }
  const description = listing.description?.slice(0, 160) ?? undefined;
  const image = listing.images?.[0];
  return {
    title: `${listing.title} – Imobuy`,
    description,
    openGraph: {
      title: listing.title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ListingDetailClient slug={slug} />;
}
