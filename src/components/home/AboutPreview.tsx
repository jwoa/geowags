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
    <section className="section">
      <div className="container">
        <div className="about-grid">
          {/* Content */}
          <div className="stack-md">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="caption text-primary"
            >
              About Geowags
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-1"
            >
              Ghana&apos;s Premier <br />
              <span className="text-primary">Home Improvement</span> Destination
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-large text-subtle"
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
              className="text-subtle"
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
              <Link href="/about" className="btn btn-primary btn-large">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="about-visual">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-visual__frame"
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
              <div className="about-visual__accent" />
            </motion.div>

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="about-stats"
            >
              <div className="about-stats__grid">
                <div>
                  <span className="block heading-1 text-primary">
                    10+
                  </span>
                  <span className="text-subtle text-sm">Years Experience</span>
                </div>
                <div>
                  <span className="block heading-1 text-primary">
                    5k+
                  </span>
                  <span className="text-subtle text-sm">Happy Customers</span>
                </div>
                <div>
                  <span className="block heading-1 text-primary">
                    500+
                  </span>
                  <span className="text-subtle text-sm">Products</span>
                </div>
                <div>
                  <span className="block heading-1 text-primary">
                    50+
                  </span>
                  <span className="text-subtle text-sm">Brands</span>
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
          className="about-features"
        >
          <div className="about-features__grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="feature-card"
                >
                  <div className="feature-card__icon">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="heading-4">{feature.title}</h3>
                  <p className="text-subtle text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

