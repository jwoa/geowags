"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductCardData } from "@/lib/types";

// Placeholder products for demo - will be replaced with real data
const placeholderProducts: ProductCardData[] = [
  {
    id: "1",
    name: "Carrara White Marble Tile",
    slug: "carrara-white-marble-tile",
    isFeatured: true,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-1.jpg", alt: "Carrara White Marble Tile", isPrimary: true }],
  },
  {
    id: "2",
    name: "Modern Rainfall Shower Set",
    slug: "modern-rainfall-shower-set",
    isFeatured: true,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/shower-1.jpg", alt: "Modern Rainfall Shower Set", isPrimary: true }],
  },
  {
    id: "3",
    name: "Hexagon Cement Tiles",
    slug: "hexagon-cement-tiles",
    isFeatured: true,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-2.jpg", alt: "Hexagon Cement Tiles", isPrimary: true }],
  },
  {
    id: "4",
    name: "Freestanding Bathtub Elite",
    slug: "freestanding-bathtub-elite",
    isFeatured: true,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/bathtub-1.jpg", alt: "Freestanding Bathtub Elite", isPrimary: true }],
  },
  {
    id: "5",
    name: "Porcelain Wood Plank",
    slug: "porcelain-wood-plank",
    isFeatured: true,
    isNew: false,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-3.jpg", alt: "Porcelain Wood Plank", isPrimary: true }],
  },
  {
    id: "6",
    name: "Vessel Sink Basin",
    slug: "vessel-sink-basin",
    isFeatured: true,
    isNew: true,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/sink-1.jpg", alt: "Vessel Sink Basin", isPrimary: true }],
  },
];

type FeaturedProductsProps = {
  products?: ProductCardData[];
};

export const FeaturedProducts = ({ products = placeholderProducts }: FeaturedProductsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="caption text-[var(--geowags-red)] mb-4 block"
            >
              Featured Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-1 text-gray-900"
            >
              Curated For You
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/products?featured=true"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-[var(--geowags-red)] font-medium transition-colors group"
            >
              View all featured products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={itemVariants}>
              <Link href={`/products/${product.slug}`} className="group block">
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
                    {product.isNew && (
                      <span className="badge badge-primary">New</span>
                    )}
                    {product.isFeatured && !product.isNew && (
                      <span className="badge badge-accent">Featured</span>
                    )}
                  </div>

                  {/* Quick Action */}
                  <button
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-[var(--geowags-red)] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle wishlist
                    }}
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">
                    {product.category.name}
                  </span>
                  <h3 className="heading-4 text-gray-900 group-hover:text-[var(--geowags-red)] transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

