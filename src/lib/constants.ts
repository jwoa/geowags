export const SITE_CONFIG = {
  name: "Geowags",
  tagline: "Premium Building Materials & Home Improvement",
  description:
    "Geowags represents tested and trusted brands the whole world over - Vado from UK, Grespania from Italy, Gala from Spain amongst others. Ghana's premier supplier of tiles, bathroom fixtures, kitchen sinks, and home improvement products.",
  url: "https://geowags.com",
  email: "geowags@hotmail.com",
  phone: "+233 30 291 1125",
  phoneAlt: "+233 26 886 5860",
  whatsapp: "+233268865860",
  address: "Korang House, Aburi Road, Adenta Barrier",
  poBox: "P.O. Box 15040, Accra-North",
  hours: {
    weekdays: "Monday - Friday: 8:00 AM - 5:30 PM",
    saturday: "Saturday: 8:00 AM - 3:00 PM",
    sunday: "Sunday: Closed",
  },
  social: {
    facebook: "https://www.facebook.com/Geowags.com.gh/",
    instagram: "https://www.instagram.com/geowagsltd/",
    twitter: "https://twitter.com/GeowagsCompany",
  },
  googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.013415918336!2d-0.17315138567511007!3d5.711198533657998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d6b0427a909%3A0x7e1774e2922b73c8!2sGeowags+Limited!5e0!3m2!1sen!2sgh!4v1540884585958",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "Bathroom", href: "/products?category=bathroom" },
    { label: "Kitchen", href: "/products?category=kitchen" },
    { label: "Tiles", href: "/products?category=tiles" },
    { label: "Paints", href: "/products?category=paints" },
    { label: "All Products", href: "/products" },
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
    name: "Bathroom",
    slug: "bathroom",
    description: "Premium bathroom fixtures, bathtubs, showers, and accessories",
    icon: "Bath",
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    description: "Quality kitchen sinks, faucets, and accessories",
    icon: "ChefHat",
  },
  {
    name: "Tiles",
    slug: "tiles",
    description: "Premium floor and wall tiles from Grespania and other leading manufacturers",
    icon: "Grid3X3",
  },
  {
    name: "Paints",
    slug: "paints",
    description: "Monto specialty paints and coatings for every application",
    icon: "Paintbrush",
  },
  {
    name: "Doors",
    slug: "doors",
    description: "Security doors and interior doors for residential and commercial use",
    icon: "DoorOpen",
  },
] as const;

export const BRAND_LIST = [
  { name: "Gala", slug: "gala", country: "Spain" },
  { name: "Vado", slug: "vado", country: "UK" },
  { name: "Grespania", slug: "grespania", country: "Italy" },
  { name: "Reginox", slug: "reginox", country: "Netherlands" },
  { name: "Carysil", slug: "carysil", country: "India" },
  { name: "Wesen", slug: "wesen", country: "Germany" },
  { name: "Banos10", slug: "banos10", country: "Spain" },
  { name: "Bella Casa", slug: "bella-casa", country: "Italy" },
  { name: "Pestan", slug: "pestan", country: "Serbia" },
] as const;

export const PAGE_SIZE = 12;

