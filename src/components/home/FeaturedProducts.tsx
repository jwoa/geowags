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
    <section className="section section-muted">
      <div className="site-container">
        {/* Section Header */}
        <div className="flex-between stack-md" style={{ alignItems: "flex-end", gap: "1.5rem" }}>
          <div className="stack-sm">
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
              className="heading-1"
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
              className="flex-row text-subtle"
              style={{ gap: "0.5rem" }}
            >
              View all featured products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="product-grid product-grid--spacious"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={itemVariants}>
              <Link
                href={`/products/${product.slug}`}
                className="product-card"
              >
                {/* Image Container */}
                <div className="product-card__image">
                  {/* Product Image */}
                  <Image
                    src={product.images[0]?.url || "/images/placeholder.jpg"}
                    alt={product.images[0]?.alt || product.name}
                    fill
                    className="product-card__media"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Badges */}
                  <div className="product-card__badges">
                    {product.isNew && (
                      <span className="badge badge-primary">New</span>
                    )}
                    {product.isFeatured && !product.isNew && (
                      <span className="badge badge-accent">Featured</span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="product-card__overlay" />
                </div>

                {/* Content */}
                <div className="product-card__content" style={{ padding: "1.5rem" }}>
                  <span className="product-card__category">
                    {product.category.name}
                  </span>
                  <h3 className="heading-4 product-card__title">
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

