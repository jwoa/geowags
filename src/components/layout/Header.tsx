"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMobileMenu();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "site-header",
          isScrolled && "site-header--scrolled"
        )}
      >
        <div className="container site-header__container">
          {/* Logo */}
          <Logo variant={isScrolled ? "default" : "white"} size="md" />

          {/* Desktop Navigation */}
          <nav
            className="nav-desktop"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link",
                  isActive(item.href) && "is-active"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/contact" className="btn btn-primary btn-small">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={handleToggleMobileMenu}
            onKeyDown={handleKeyDown}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            tabIndex={0}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "mobile-menu",
          isMobileMenuOpen && "is-open"
        )}
      >
        {/* Backdrop */}
        <div
          className="mobile-menu__backdrop"
          onClick={handleToggleMobileMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className="mobile-menu__panel"
        >
          <div className="mobile-menu__content">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <ul className="stack-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "mobile-nav__link",
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile CTA */}
            <div className="mobile-menu__footer">
              <Link href="/contact" className="btn btn-primary full-width">
                Get in Touch
              </Link>

              <div className="stack-sm text-center text-subtle">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-subtle"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

