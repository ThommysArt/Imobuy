"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker must match the API version (react-pdf bundles its own pdfjs). Use CDN with same version.
if (typeof window !== "undefined") {
  const version = pdfjs.version ?? "5.4.296";
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

interface SingleDocumentViewerProps {
  url: string;
  index: number;
  totalDocs: number;
}

function SingleDocumentViewer({
  url,
  index,
  totalDocs,
}: SingleDocumentViewerProps) {
  const t = useTranslations("properties.detail.ownershipDocs");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [contentHidden, setContentHidden] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pdfFailed, setPdfFailed] = useState(false);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleCopy = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "p" || e.key === "s")) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setContentHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const onLoadSuccess = useCallback(
    (pdf: { numPages: number }) => {
      setNumPages(pdf.numPages);
      setPageNumber(1);
      setLoadError(null);
      setPdfFailed(false);
    },
    []
  );

  const onLoadError = useCallback(() => {
    setLoadError("Failed to load document");
    setPdfFailed(true);
  }, []);

  const prevPage = () =>
    setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () =>
    setPageNumber((p) => Math.min(numPages ?? 1, p + 1));

  const fileOptions = useMemo(() => ({ url }), [url]);

  // Try PDF first for all URLs (storage URLs have no .pdf); show image when PDF fails
  if (!pdfFailed) {
    return (
      <div
        className="relative rounded-lg overflow-hidden bg-muted"
        data-doc-viewer
        data-print-message={t("printBlocked")}
        onContextMenu={handleContextMenu}
        onKeyDown={handleCopy}
        onKeyDownCapture={handleCopy}
      >
        <style>{`
          @media print {
            [data-doc-viewer] .react-pdf__Page {
              visibility: hidden !important;
            }
            [data-doc-viewer]::after {
              content: attr(data-print-message);
              visibility: visible !important;
              display: block;
              padding: 2rem;
              font-size: 1.25rem;
              text-align: center;
            }
          }
        `}</style>
        {contentHidden && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg">
            <p className="text-center text-muted-foreground px-4 font-medium">
              {t("returnToView")}
            </p>
          </div>
        )}
        <div
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg"
          aria-hidden
        >
          <div
            className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-4 place-items-center"
            style={{ transform: "rotate(-25deg) scale(1.2)" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="text-muted-foreground/30 font-bold text-xs sm:text-sm whitespace-nowrap select-none"
                style={{
                  textShadow: "0 0 16px rgba(255,255,255,0.6)",
                }}
              >
                IMOBUY — VIEW ONLY
              </span>
            ))}
          </div>
        </div>
        <div
          className="relative z-0 p-4 flex flex-col items-center select-none"
          style={{ WebkitUserSelect: "none", userSelect: "none" }}
        >
          {loadError ? (
            <p className="text-destructive py-8">{loadError}</p>
          ) : (
            <>
              <Document
                file={fileOptions}
                onLoadSuccess={onLoadSuccess}
                onLoadError={onLoadError}
                loading={
                  <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
                    {t("loading")}
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={Math.min(
                    typeof window !== "undefined" ? window.innerWidth - 128 : 800,
                    920
                  )}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
              {numPages !== null && numPages > 1 && (
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[8rem] text-center">
                    {t("pageOf", { current: pageNumber, total: numPages })}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-muted"
      data-doc-viewer
      data-print-message={t("printBlocked")}
      onContextMenu={handleContextMenu}
      onKeyDown={handleCopy}
      onKeyDownCapture={handleCopy}
    >
      <style>{`
        @media print {
          [data-doc-viewer] img {
            visibility: hidden !important;
          }
          [data-doc-viewer]::after {
            content: attr(data-print-message);
            visibility: visible !important;
            display: block;
            padding: 2rem;
            font-size: 1.25rem;
            text-align: center;
          }
        }
      `}</style>
      {contentHidden && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg">
          <p className="text-center text-muted-foreground px-4 font-medium">
            {t("returnToView")}
          </p>
        </div>
      )}
      <div
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg"
        aria-hidden
      >
        <div
          className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-4 place-items-center"
          style={{ transform: "rotate(-25deg) scale(1.2)" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="text-muted-foreground/30 font-bold text-xs sm:text-sm whitespace-nowrap select-none"
              style={{
                textShadow: "0 0 16px rgba(255,255,255,0.6)",
              }}
            >
              IMOBUY — VIEW ONLY
            </span>
          ))}
        </div>
      </div>
      <div
        className="relative z-0 p-4 flex justify-center select-none"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <img
          src={url}
          alt={t("document") + " " + (index + 1)}
          className="max-w-full h-auto rounded object-contain max-h-[85vh]"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

export interface OwnershipDocumentViewerProps {
  documents: string[];
  listingTitle?: string;
}

export function OwnershipDocumentViewer({
  documents,
}: OwnershipDocumentViewerProps) {
  const t = useTranslations("properties.detail.ownershipDocs");

  if (!documents.length) return null;

  return (
    <div className="space-y-12">
      {documents.map((url, index) => (
        <div key={url} className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t("document")} {index + 1} {documents.length > 1 ? `/${documents.length}` : ""}
          </h3>
          <SingleDocumentViewer
            url={url}
            index={index}
            totalDocs={documents.length}
          />
        </div>
      ))}
    </div>
  );
}
