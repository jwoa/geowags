"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductCardData } from "@/lib/types";

type ProductCardProps = {
  product: ProductCardData;
  priority?: boolean;
};

export const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-white border border-gray-200 hover:border-[var(--geowags-red)] transition-colors shadow-sm hover:shadow-lg"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          {/* Product Image */}
          <Image
            src={product.images[0]?.url || "/images/placeholder.jpg"}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && <span className="badge badge-primary">New</span>}
            {product.isFeatured && !product.isNew && (
              <span className="badge badge-accent">Featured</span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="px-10 pt-8 pb-10 space-y-4">
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

