"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export const CallToAction = () => {
  return (
    <section className="section cta">
      <div
        className="cta__background"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 45h90M45 0v90' stroke='%23E5E7EB' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative">
        <div className="cta__content">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hero__eyebrow"
          >
            Let&apos;s Work Together
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display"
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-large text-subtle"
            style={{ maxWidth: "48rem", margin: "0 auto" }}
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
            className="cta__actions"
          >
            <Link href="/contact" className="btn btn-primary btn-large">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn btn-outline btn-large"
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
            className="cta__trust"
          >
            <p className="caption text-subtle">
              Trusted by homeowners and professionals across Ghana
            </p>

            <div className="cta__logos">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="cta__logo">
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

