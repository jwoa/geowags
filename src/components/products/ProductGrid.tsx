"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { ProductCardData } from "@/lib/types";

type ProductGridProps = {
  products: ProductCardData[];
  loading?: boolean;
};

export const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="product-grid product-grid--spacious">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="stack-sm">
            <div className="skeleton" style={{ aspectRatio: "1 / 1" }} />
            <div className="skeleton-line" style={{ width: "5rem" }} />
            <div className="skeleton-line" style={{ width: "75%", height: "1.25rem" }} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center stack-md" style={{ padding: "4rem 0" }}>
        <p className="text-subtle text-lg">No products found</p>
        <p className="text-muted">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="product-grid product-grid--spacious"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </motion.div>
  );
};

