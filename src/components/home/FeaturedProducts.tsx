"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductCardData } from "@/lib/types";

type FeaturedProductsProps = {
  products: ProductCardData[];
};

export const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={itemVariants}>
              <Link
                href={`/products/${product.slug}`}
                className="group block bg-white border border-gray-200 hover:border-[var(--geowags-red)] transition-colors shadow-sm hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  {/* Product Image */}
                  <Image
                    src={product.images[0]?.url || "/images/placeholder.jpg"}
                    alt={product.images[0]?.alt || product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.isNew && (
                      <span className="badge badge-primary">New</span>
                    )}
                    {product.isFeatured && !product.isNew && (
                      <span className="badge badge-accent">Featured</span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-4 space-y-2">
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

