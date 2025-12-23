"use client";

import { useState } from "react";
import { Plus, X, Star, GripVertical } from "lucide-react";
import Image from "next/image";

export type ImageItem = {
  url: string;
  alt: string;
  primary: boolean;
};

type ImagePickerProps = {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  label?: string;
};

export const ImagePicker = ({ images, onChange, label = "Images" }: ImagePickerProps) => {
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const handleAddImage = () => {
    if (!newUrl.trim()) return;

    const newImage: ImageItem = {
      url: newUrl.trim(),
      alt: newAlt.trim() || "Product image",
      primary: images.length === 0,
    };

    onChange([...images, newImage]);
    setNewUrl("");
    setNewAlt("");
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    // If we removed the primary image, make the first one primary
    if (images[index].primary && updated.length > 0) {
      updated[0].primary = true;
    }
    onChange(updated);
  };

  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      primary: i === index,
    }));
    onChange(updated);
  };

  const handleUpdateAlt = (index: number, alt: string) => {
    const updated = images.map((img, i) =>
      i === index ? { ...img, alt } : img
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Existing Images */}
      {images.length > 0 && (
        <div className="space-y-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 border rounded-lg ${
                image.primary ? "border-[var(--geowags-red)] bg-red-50" : "border-gray-200"
              }`}
            >
              <div className="flex items-center text-gray-400 cursor-move">
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                {image.url.startsWith("/") || image.url.startsWith("http") ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No preview
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={image.url}
                  readOnly
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded bg-gray-50"
                />
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleUpdateAlt(index, e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1 text-xs border border-gray-200 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetPrimary(index)}
                  className={`p-1.5 rounded transition-colors ${
                    image.primary
                      ? "text-[var(--geowags-red)]"
                      : "text-gray-400 hover:text-[var(--geowags-red)]"
                  }`}
                  title={image.primary ? "Primary image" : "Set as primary"}
                >
                  <Star className={`w-4 h-4 ${image.primary ? "fill-current" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Image */}
      <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-3">
        <p className="text-sm text-gray-500">Add a new image</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Image URL (e.g., /images/products/...)"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
          />
          <input
            type="text"
            value={newAlt}
            onChange={(e) => setNewAlt(e.target.value)}
            placeholder="Alt text"
            className="w-40 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddImage}
            disabled={!newUrl.trim()}
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-sm hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

