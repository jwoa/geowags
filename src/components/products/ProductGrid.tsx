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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 mb-4" />
            <div className="h-3 bg-gray-200 w-20 mb-2" />
            <div className="h-5 bg-gray-200 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">No products found</p>
        <p className="text-gray-400">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </motion.div>
  );
};

