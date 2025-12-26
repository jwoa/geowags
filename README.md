# Geowags - Premium Housewares & Tiles

A modern, elegant website for **Geowags**, Ghana's premier supplier of high-quality housewares, tiles, bathroom fixtures, and home-improvement products.

## 🚀 Features

### Phase 1 (Current)
- **Homepage** - Hero banner, category highlights, featured collections, brand overview
- **Product Catalog** - Category-based browsing with filters (collection, color, size, finish)
- **Product Detail Pages** - High-quality images, descriptions, specifications, variants
- **About Page** - Company history, mission, values, milestones
- **Contact Page** - Contact form, phone, email, location
- **Admin Dashboard** - Product management, categories, inquiries

### Phase 2 (Future)
- Full eCommerce functionality
- Paystack payment integration
- Customer accounts
- Order & inventory management
- Quotations

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0 + Custom CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Content:** Markdown files (no database required)

## 📁 Project Structure

```
src/
├── app/
│   ├── (admin)/          # Admin dashboard routes
│   │   └── admin/
│   │       ├── products/
│   │       └── page.tsx
│   ├── (public)/         # Public website routes
│   │   ├── about/
│   │   ├── contact/
│   │   ├── products/
│   │   └── page.tsx
│   ├── globals.css       # Design system & styles
│   └── layout.tsx        # Root layout
├── components/
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, Footer, Logo
│   └── products/         # Product cards, grid, filters
├── lib/
│   ├── constants.ts      # Site config, navigation
│   ├── content/          # Markdown content helpers
│   ├── markdown.ts       # Markdown parsing utilities
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
content/
├── categories/           # Category markdown files
├── collections/          # Collection markdown files
├── pages/                # Static page content (FAQ, terms, etc.)
└── products/             # Product markdown files
```

## 📝 Content Management

All content is managed via markdown files in the `content/` directory. No database required!

### Adding a Product

Create a new `.md` file in `content/products/`:

```markdown
---
name: Product Name
slug: product-slug
category: tiles
collection: luxury-marble
featured: true
new: true
active: true
images:
  - url: /images/products/product.jpg
    alt: Product description
    isPrimary: true
specifications:
  material: Marble
  finish: Polished
colors:
  - name: White
    hexCode: "#FFFFFF"
sizes:
  - name: 60x60 cm
    dimensions: 600mm x 600mm x 10mm
finishes:
  - Polished
  - Honed
---

Product description goes here in markdown format.
```

## 🎨 Design System

### Colors
- **Primary (Red):** `#C41E3A` - Brand color, CTAs
- **Accent (Teal):** `#0D9488` - Highlights
- **White:** Dominant background
- **Grays:** Text and subtle backgrounds

### Typography
- **Display:** Playfair Display (headings)
- **Body:** Inter (body text)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd geowags
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production (static export)
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, categories, featured products, about preview |
| Products | `/products` | Product catalog with filters |
| Product Detail | `/products/[slug]` | Individual product page |
| About | `/about` | Company information |
| Contact | `/contact` | Contact form and info |
| Admin Dashboard | `/admin` | Admin overview |
| Manage Products | `/admin/products` | Product CRUD |
| Add Product | `/admin/products/new` | Create new product |

## 🔧 Configuration

### Site Configuration

Edit `src/lib/constants.ts` to update:
- Site name and tagline
- Contact information
- Social media links
- Navigation items
- Product categories

## 🚀 Deployment

This is a static site that can be deployed anywhere.

### Static Export

```bash
npm run build
```

The static files are generated in the `out/` directory.

### DreamHost / Any Static Host

1. Build the application:
```bash
npm run build
```

2. Upload the `out/` directory to your web server.

### Vercel / Netlify

Simply connect your repository and deploy. No additional configuration needed.

## 📄 License

Private - All rights reserved

## 👥 Contact

**Geowags**
- Email: info@geowags.com
- Phone: +233 XX XXX XXXX
- Location: Accra, Ghana
