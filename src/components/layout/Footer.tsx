"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo variant="white" size="lg" />
            <p className="mt-6 text-gray-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-6">
              Subscribe to receive updates on new products and collections.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--geowags-red)] focus:outline-none transition-colors"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-[var(--geowags-red)] text-white hover:bg-[var(--geowags-red-dark)] transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-4">Follow us</p>
              <div className="flex gap-4">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-[var(--geowags-red)] hover:text-white transition-all"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

