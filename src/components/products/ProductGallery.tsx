"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/content/types";

type ProductGalleryProps = {
  images: Product["images"];
  productName: string;
  isNew?: boolean;
  isFeatured?: boolean;
};

export const ProductGallery = ({ images, productName, isNew, isFeatured }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const primaryImage = images.find((img) => img.primary) || images[0];

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-lg border border-gray-100">
        <Image
          src="/images/placeholder.jpg"
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  const currentImage = images[selectedIndex] || primaryImage;

  return (
    <div className="space-y-6">
      <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-lg border border-gray-100">
        <Image
          src={currentImage.url}
          alt={currentImage.alt || productName}
          fill
          className="object-cover"
          priority={selectedIndex === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {(isNew || isFeatured) && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && <span className="badge badge-primary">New</span>}
            {isFeatured && <span className="badge badge-accent">Featured</span>}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square bg-gray-100 overflow-hidden border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--geowags-red)] ${
                selectedIndex === index
                  ? "border-[var(--geowags-red)]"
                  : "border-gray-200 hover:border-[var(--geowags-red)]"
              }`}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={selectedIndex === index ? "true" : "false"}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} - View ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
              {selectedIndex === index && (
                <div className="absolute inset-0 ring-2 ring-[var(--geowags-red)] pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
