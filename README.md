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
- Wishlists and quotations

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0 + Custom CSS
- **Database:** Prisma + SQLite (dev) / PostgreSQL (production)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

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
│   ├── db.ts            # Prisma client
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
└── prisma/
    ├── schema.prisma    # Database schema
    └── seed.ts          # Demo data
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

3. Set up the database:
```bash
# Create .env file with DATABASE_URL
echo 'DATABASE_URL="file:./dev.db"' > .env

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:push    # Push schema to database
npm run db:seed    # Seed database with demo data
npm run db:studio  # Open Prisma Studio
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

### Environment Variables

```env
DATABASE_URL="file:./dev.db"  # SQLite for development
# DATABASE_URL="postgresql://..."  # PostgreSQL for production
```

### Site Configuration

Edit `src/lib/constants.ts` to update:
- Site name and tagline
- Contact information
- Social media links
- Navigation items
- Product categories

## 🚀 Deployment

### DreamHost VPS

1. Build the application:
```bash
npm run build
```

2. Copy to server:
```bash
scp -r .next package.json node_modules user@server:/path/to/app
```

3. Start with PM2:
```bash
pm2 start npm --name "geowags" -- start
```

### Environment Setup for Production

1. Set up PostgreSQL database
2. Update `DATABASE_URL` in production environment
3. Run `npx prisma migrate deploy`
4. Configure reverse proxy (Nginx)

## 📄 License

Private - All rights reserved.

## 👥 Contact

**Geowags**
- Email: info@geowags.com
- Phone: +233 XX XXX XXXX
- Location: Accra, Ghana
