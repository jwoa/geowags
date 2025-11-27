export const SITE_CONFIG = {
  name: "Geowags",
  tagline: "Premier Housewares & Tiles",
  description:
    "Geowags is Ghana's premier supplier of high-quality housewares, tiles, bathroom fixtures, and home-improvement products.",
  url: "https://geowags.com",
  email: "info@geowags.com",
  phone: "+233 XX XXX XXXX",
  address: "Accra, Ghana",
  social: {
    facebook: "https://facebook.com/geowags",
    instagram: "https://instagram.com/geowags",
    twitter: "https://twitter.com/geowags",
    linkedin: "https://linkedin.com/company/geowags",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "Tiles", href: "/products?category=tiles" },
    { label: "Bathroom Fixtures", href: "/products?category=bathroom-fixtures" },
    { label: "Kitchen & Dining", href: "/products?category=kitchen-dining" },
    { label: "Home Decor", href: "/products?category=home-decor" },
    { label: "All Collections", href: "/products" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Inspiration Gallery", href: "/inspiration" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const PRODUCT_CATEGORIES = [
  {
    name: "Tiles",
    slug: "tiles",
    description: "Premium floor and wall tiles for every space",
    icon: "Grid3X3",
  },
  {
    name: "Bathroom Fixtures",
    slug: "bathroom-fixtures",
    description: "Elegant fixtures for modern bathrooms",
    icon: "Bath",
  },
  {
    name: "Kitchen & Dining",
    slug: "kitchen-dining",
    description: "Quality kitchenware and dining essentials",
    icon: "ChefHat",
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Beautiful accents for your living spaces",
    icon: "Home",
  },
] as const;

export const PAGE_SIZE = 12;

