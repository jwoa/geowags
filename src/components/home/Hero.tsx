"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  {
    id: 1,
    title: "Elevate Your Living Spaces",
    subtitle: "Premium Tiles & Housewares",
    description:
      "Discover Ghana's finest collection of high-quality tiles, bathroom fixtures, and home improvement products.",
    image: "/images/hero/hero-1.jpg",
    cta: { label: "Explore Collection", href: "/products" },
  },
  {
    id: 2,
    title: "Transform Your Bathroom",
    subtitle: "Luxury Fixtures",
    description:
      "Create your dream bathroom with our curated selection of elegant fixtures and accessories.",
    image: "/images/hero/hero-2.jpg",
    cta: { label: "View Bathroom Collection", href: "/products?category=bathroom-fixtures" },
  },
  {
    id: 3,
    title: "Timeless Tile Designs",
    subtitle: "Floor & Wall Solutions",
    description:
      "From contemporary to classic, find the perfect tiles to complement your architectural vision.",
    image: "/images/hero/hero-3.jpg",
    cta: { label: "Browse Tiles", href: "/products?category=tiles" },
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleSlideChange = (index: number) => {
    stopAutoplay();
    setCurrentSlide(index);
    startAutoplay();
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById("categories");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[640px] md:min-h-[720px] overflow-hidden bg-white">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.05),transparent_38%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%23E5E7EB' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Subtitle */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4 text-sm uppercase tracking-[0.2em] text-[var(--geowags-red)] font-medium"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.span>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="heading-display text-gray-900 mb-6"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
              >
                <Link
                  href={heroSlides[currentSlide].cta.href}
                className="btn btn-primary btn-large group"
                >
                  {heroSlides[currentSlide].cta.label}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                className="btn btn-outline btn-large"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 flex gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleSlideChange(index)}
            className={`w-12 h-1 transition-all duration-300 ${
              index === currentSlide ? "bg-[var(--geowags-red)]" : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
    </section>
  );
};

