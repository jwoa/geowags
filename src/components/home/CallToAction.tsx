"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export const CallToAction = () => {
  return (
    <section className="relative section bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 45h90M45 0v90' stroke='%23E5E7EB' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 text-sm uppercase tracking-[0.2em] text-[var(--geowags-red)] font-medium"
          >
            Let&apos;s Work Together
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display text-gray-900"
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Whether you&apos;re renovating your home, designing a new space, or
            sourcing for a project, our team is here to help you find the
            perfect products for your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="/contact" className="btn btn-primary btn-large group">
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn btn-outline btn-large group"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-12 border-t border-gray-200 space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Trusted by homeowners and professionals across Ghana
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 text-xs tracking-wide"
                >
                  Partner {i}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

