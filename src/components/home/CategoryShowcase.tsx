"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Grid3X3, Bath, ChefHat, Home } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/lib/content";

const categoryIcons: Record<string, React.ElementType> = {
  Grid3X3: Grid3X3,
  Bath: Bath,
  ChefHat: ChefHat,
  Home: Home,
};

type CategoryShowcaseProps = {
  categories: Category[];
};

export const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="categories" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="caption text-[var(--geowags-red)] mb-4 block"
          >
            Our Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-1"
          >
            Explore Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-large text-subtle"
          >
            From premium tiles to elegant bathroom fixtures, discover everything
            you need to transform your spaces.
          </motion.p>
        </div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="category-grid"
        >
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.icon];

            return (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="category-card"
                >
                  <div
                    className="category-card__overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%23E5E7EB' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Content */}
                  <div className="category-card__content">
                    <div className="category-card__top">
                      {IconComponent && (
                        <div className="category-card__icon">
                          <IconComponent className="w-7 h-7" />
                        </div>
                      )}
                      <span className="category-card__slug">
                        {category.slug.replace("-", " ")}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="heading-3">
                        {category.name}
                      </h3>
                      <p className="category-card__description line-clamp-2">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <span className="category-card__cta">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center stack-sm"
        >
          <Link href="/products" className="btn btn-outline btn-large group">
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

