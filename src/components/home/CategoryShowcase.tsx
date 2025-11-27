"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Grid3X3, Bath, ChefHat, Home } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const categoryIcons: Record<string, React.ElementType> = {
  Grid3X3: Grid3X3,
  Bath: Bath,
  ChefHat: ChefHat,
  Home: Home,
};

const categoryImages: Record<string, string> = {
  tiles: "/images/categories/tiles.jpg",
  "bathroom-fixtures": "/images/categories/bathroom.jpg",
  "kitchen-dining": "/images/categories/kitchen.jpg",
  "home-decor": "/images/categories/decor.jpg",
};

const categoryGradients: Record<string, string> = {
  tiles: "from-amber-900/80 to-amber-950/90",
  "bathroom-fixtures": "from-sky-900/80 to-sky-950/90",
  "kitchen-dining": "from-emerald-900/80 to-emerald-950/90",
  "home-decor": "from-rose-900/80 to-rose-950/90",
};

export const CategoryShowcase = () => {
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
    <section id="categories" className="section bg-white">
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
            className="heading-1 text-gray-900 mb-4"
          >
            Explore Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-large text-gray-600"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCT_CATEGORIES.map((category) => {
            const IconComponent = categoryIcons[category.icon];
            const gradient = categoryGradients[category.slug] || "from-gray-900/80 to-gray-950/90";

            return (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`}>
                    {/* Decorative pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    {/* Icon */}
                    <div className="mb-auto pt-4">
                      {IconComponent && (
                        <div className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-[var(--geowags-red)] transition-colors duration-300">
                          <IconComponent className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="heading-3 mb-2 group-hover:text-[var(--geowags-red-light)] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider group-hover:gap-4 transition-all">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--geowags-red)]/0 group-hover:bg-[var(--geowags-red)]/10 transition-colors duration-300" />
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
          className="text-center mt-12"
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

