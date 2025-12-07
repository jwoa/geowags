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
      className="product-card"
    >
      <Link href={`/products/${product.slug}`} className="product-card__link">
        <div className="product-card__image">
          <Image
            src={product.images[0]?.url || "/images/placeholder.jpg"}
            alt={product.images[0]?.alt || product.name}
            fill
            className="product-card__media"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          <div className="product-card__badges">
            {product.isNew && <span className="badge badge-primary">New</span>}
            {product.isFeatured && !product.isNew && (
              <span className="badge badge-accent">Featured</span>
            )}
          </div>

          <div className="product-card__overlay" />
        </div>

        <div className="product-card__content">
          <span className="product-card__category">
            {product.category.name}
          </span>
          <h3 className="heading-4 product-card__title line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
};

