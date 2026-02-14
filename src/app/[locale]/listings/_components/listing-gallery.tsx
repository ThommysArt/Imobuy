"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

interface ListingGalleryProps {
  images: string[];
  title: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export function ListingGallery({
  images,
  title,
  videoUrl,
  videoThumbnail,
}: ListingGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const displayImages = images.length > 0 ? images : ["/placeholder-property.jpg"];
  const hasVideo = Boolean(videoUrl);
  const isVideoSelected = hasVideo && selectedIndex === 0;
  const mainImageUrl = hasVideo
    ? isVideoSelected
      ? videoThumbnail || displayImages[0]
      : displayImages[selectedIndex - 1]
    : displayImages[selectedIndex];

  return (
    <div className="w-full">
      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
        {isVideoSelected ? (
          <>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 group"
              aria-label="Play video"
            >
              <span className="rounded-full bg-primary/90 p-4 text-primary-foreground transition group-hover:scale-110">
                <Play className="h-10 w-10" fill="currentColor" />
              </span>
            </button>
            {mainImageUrl && (
              <Image
                src={mainImageUrl}
                alt={title}
                fill
                className="object-cover"
                unoptimized={mainImageUrl.startsWith("http")}
              />
            )}
          </>
        ) : (
          mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={title}
              fill
              className="object-cover"
              unoptimized={mainImageUrl.startsWith("http")}
            />
          )
        )}
      </div>

      {(displayImages.length > 1 || hasVideo) && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {hasVideo && (
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                selectedIndex === 0 ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {(videoThumbnail || displayImages[0]) && (
                <Image
                  src={videoThumbnail || displayImages[0]}
                  alt={`${title} – Video`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="h-8 w-8 text-white" fill="currentColor" />
              </span>
            </button>
          )}
          {displayImages.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(hasVideo ? idx + 1 : idx)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                (hasVideo ? idx + 1 : idx) === selectedIndex
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} – Image ${idx + 1}`}
                fill
                className="object-cover"
                unoptimized={image.startsWith("http")}
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{title} – Video</DialogTitle>
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full aspect-video"
              poster={videoThumbnail}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
