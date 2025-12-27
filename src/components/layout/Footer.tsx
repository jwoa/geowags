"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Main Footer */}
      <div className="site-container footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-col--brand">
            <Logo variant="white" size="lg" />
            <p className="text-subtle leading-relaxed max-w-sm stack-sm">
              {SITE_CONFIG.description}
            </p>

            {/* Contact Info */}
            <div className="footer-contact">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="footer-link"
              >
                <Mail className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="footer-link"
              >
                <Phone className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <div className="flex-row text-subtle">
                <MapPin className="w-5 h-5 text-[var(--geowags-red)]" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div className="footer-col footer-col--products">
            <h4 className="footer-heading">
              Products
            </h4>
            <ul className="footer-links">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col footer-col--company">
            <h4 className="footer-heading">
              Company
            </h4>
            <ul className="footer-links">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col footer-col--newsletter">
            <h4 className="footer-heading">
              Stay Updated
            </h4>
            <p className="text-subtle">
              Subscribe to receive updates on new products and collections.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn btn-primary btn-small"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Social Links */}
            <div className="stack-sm">
              <p className="text-subtle">Follow us</p>
              <div className="social-links">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="site-container">
          <div className="footer-bottom__content">
            <p className="text-subtle">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

