"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Users, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We source only the finest materials from trusted manufacturers worldwide.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our team of specialists is here to guide you through every project.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Fast and secure delivery across Ghana, ensuring your products arrive safely.",
  },
  {
    icon: Shield,
    title: "Guaranteed Satisfaction",
    description: "Your satisfaction is our priority with quality assurance on every purchase.",
  },
];

export const AboutPreview = () => {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="caption text-[var(--geowags-red)] mb-4 block"
            >
              About Geowags
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-1 text-gray-900 mb-6"
            >
              Ghana&apos;s Premier <br />
              <span className="text-[var(--geowags-red)]">Home Improvement</span> Destination
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-large text-gray-600 mb-8"
            >
              For years, Geowags has been at the forefront of bringing world-class
              housewares, tiles, and bathroom fixtures to Ghana. We believe that
              every space deserves the finest materials and exceptional design.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 mb-10"
            >
              Our curated collection represents the best of international craftsmanship,
              carefully selected to meet the diverse needs of homeowners, architects,
              and interior designers across the country.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/about" className="btn btn-primary btn-large group">
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-gray-100"
            >
              {/* Placeholder - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--geowags-red)]" />
            </motion.div>

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 right-0 md:right-8 bg-white shadow-xl p-8 max-w-xs"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-4xl font-display font-bold text-[var(--geowags-red)]">
                    10+
                  </span>
                  <span className="text-sm text-gray-600">Years Experience</span>
                </div>
                <div>
                  <span className="block text-4xl font-display font-bold text-[var(--geowags-red)]">
                    5k+
                  </span>
                  <span className="text-sm text-gray-600">Happy Customers</span>
                </div>
                <div>
                  <span className="block text-4xl font-display font-bold text-[var(--geowags-red)]">
                    500+
                  </span>
                  <span className="text-sm text-gray-600">Products</span>
                </div>
                <div>
                  <span className="block text-4xl font-display font-bold text-[var(--geowags-red)]">
                    50+
                  </span>
                  <span className="text-sm text-gray-600">Brands</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-gray-100 text-[var(--geowags-red)]">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="heading-4 text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

