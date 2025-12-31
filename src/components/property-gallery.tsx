"use client"

import { useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="w-full">
      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage] || images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

