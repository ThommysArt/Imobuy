import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { DocumentsPageClient } from "./documents-page-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ListingDocumentsPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = await fetchQuery(api.listings.getListingBySlug, { slug });
  if (
    !listing ||
    !listing.ownershipDocuments ||
    listing.ownershipDocuments.length === 0
  ) {
    redirect(`/listings/${slug}`);
  }
  return (
    <DocumentsPageClient
      slug={slug}
      documents={listing.ownershipDocuments}
      listingTitle={listing.title}
    />
  );
}
