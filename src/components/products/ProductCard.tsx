"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductCardData } from "@/lib/types";

type ProductCardProps = {
  product: ProductCardData;
  priority?: boolean;
};

export const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
          {/* Placeholder gradient - replace with actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-sm">Product Image</span>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && <span className="badge badge-primary">New</span>}
            {product.isFeatured && !product.isNew && (
              <span className="badge badge-accent">Featured</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">
            {product.category.name}
          </span>
          <h3 className="heading-4 text-gray-900 group-hover:text-[var(--geowags-red)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
};

