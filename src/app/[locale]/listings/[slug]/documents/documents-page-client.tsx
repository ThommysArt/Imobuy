"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

const OwnershipDocumentViewer = dynamic(
  () =>
    import("./_components/ownership-document-viewer").then((mod) => ({
      default: mod.OwnershipDocumentViewer,
    })),
  { ssr: false }
);

interface DocumentsPageClientProps {
  slug: string;
  documents: string[];
  listingTitle: string;
}

export function DocumentsPageClient({
  slug,
  documents,
  listingTitle,
}: DocumentsPageClientProps) {
  const t = useTranslations("properties.detail.ownershipDocs");
  const tNav = useTranslations("navigation");

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href={`/listings/${slug}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-4 mr-2" />
              {tNav("properties")} / {listingTitle}
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("notice")}</p>
        </div>
        <ScrollArea className="w-full">
          <OwnershipDocumentViewer documents={documents} listingTitle={listingTitle} />
        </ScrollArea>
      </main>
    </div>
  );
}
