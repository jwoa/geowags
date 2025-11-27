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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[var(--header-height)]">
            {/* Logo */}
            <Logo variant={isScrolled ? "default" : "default"} size="md" />

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-medium tracking-wide uppercase transition-colors",
                    isActive(item.href)
                      ? "text-[var(--geowags-red)]"
                      : "text-gray-700 hover:text-[var(--geowags-red)]"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--geowags-red)]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                type="button"
                className="p-2 text-gray-700 hover:text-[var(--geowags-red)] transition-colors"
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
              className="lg:hidden p-2 text-gray-700 hover:text-[var(--geowags-red)] transition-colors"
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
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={handleToggleMobileMenu}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            <nav className="flex-1" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-4 text-lg font-medium border-b border-gray-100 transition-colors",
                        isActive(item.href)
                          ? "text-[var(--geowags-red)]"
                          : "text-gray-900 hover:text-[var(--geowags-red)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto pt-8 border-t border-gray-100">
              <Link href="/contact" className="btn btn-primary w-full">
                Get in Touch
              </Link>

              <div className="mt-6 text-center">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-gray-600 hover:text-[var(--geowags-red)]"
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

