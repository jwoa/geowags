import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid, ProductFilters, ProductSort } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import type { ProductCardData } from "@/lib/types";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse our extensive collection of premium tiles, bathroom fixtures, and housewares at ${SITE_CONFIG.name}. Quality products for every home improvement project.`,
};

// Demo products - will be replaced with database fetch
const demoProducts: ProductCardData[] = [
  {
    id: "1",
    name: "Carrara White Marble Tile",
    slug: "carrara-white-marble-tile",
    isFeatured: true,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-1.jpg", alt: "Carrara White Marble Tile", isPrimary: true }],
  },
  {
    id: "2",
    name: "Modern Rainfall Shower Set",
    slug: "modern-rainfall-shower-set",
    isFeatured: true,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/shower-1.jpg", alt: "Modern Rainfall Shower Set", isPrimary: true }],
  },
  {
    id: "3",
    name: "Hexagon Cement Tiles",
    slug: "hexagon-cement-tiles",
    isFeatured: true,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-2.jpg", alt: "Hexagon Cement Tiles", isPrimary: true }],
  },
  {
    id: "4",
    name: "Freestanding Bathtub Elite",
    slug: "freestanding-bathtub-elite",
    isFeatured: true,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/bathtub-1.jpg", alt: "Freestanding Bathtub Elite", isPrimary: true }],
  },
  {
    id: "5",
    name: "Porcelain Wood Plank",
    slug: "porcelain-wood-plank",
    isFeatured: false,
    isNew: false,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-3.jpg", alt: "Porcelain Wood Plank", isPrimary: true }],
  },
  {
    id: "6",
    name: "Vessel Sink Basin",
    slug: "vessel-sink-basin",
    isFeatured: true,
    isNew: true,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/sink-1.jpg", alt: "Vessel Sink Basin", isPrimary: true }],
  },
  {
    id: "7",
    name: "Mosaic Glass Tiles",
    slug: "mosaic-glass-tiles",
    isFeatured: false,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-4.jpg", alt: "Mosaic Glass Tiles", isPrimary: true }],
  },
  {
    id: "8",
    name: "Wall-Mount Faucet Chrome",
    slug: "wall-mount-faucet-chrome",
    isFeatured: false,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/faucet-1.jpg", alt: "Wall-Mount Faucet Chrome", isPrimary: true }],
  },
  {
    id: "9",
    name: "Terracotta Floor Tiles",
    slug: "terracotta-floor-tiles",
    isFeatured: false,
    isNew: false,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-5.jpg", alt: "Terracotta Floor Tiles", isPrimary: true }],
  },
  {
    id: "10",
    name: "Modern Toilet Suite",
    slug: "modern-toilet-suite",
    isFeatured: true,
    isNew: false,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/toilet-1.jpg", alt: "Modern Toilet Suite", isPrimary: true }],
  },
  {
    id: "11",
    name: "Slate Effect Porcelain",
    slug: "slate-effect-porcelain",
    isFeatured: false,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-6.jpg", alt: "Slate Effect Porcelain", isPrimary: true }],
  },
  {
    id: "12",
    name: "LED Vanity Mirror",
    slug: "led-vanity-mirror",
    isFeatured: false,
    isNew: true,
    category: { name: "Bathroom Fixtures", slug: "bathroom-fixtures" },
    images: [{ url: "/images/products/mirror-1.jpg", alt: "LED Vanity Mirror", isPrimary: true }],
  },
];

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    collection?: string;
    color?: string;
    size?: string;
    finish?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  // In a real app, we would fetch products from the database based on searchParams
  // For now, we'll use demo products and simulate filtering
  let filteredProducts = [...demoProducts];

  if (params.category) {
    const categories = params.category.split(",");
    filteredProducts = filteredProducts.filter((p) =>
      categories.includes(p.category.slug)
    );
  }

  return (
    <div className="pt-[var(--header-height)]">
      {/* Page Header */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container">
          <h1 className="heading-1 text-gray-900 mb-4">Our Products</h1>
          <p className="body-large text-gray-600 max-w-2xl">
            Explore our extensive collection of premium tiles, bathroom fixtures,
            and housewares. Quality products for every home improvement project.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Sidebar Filters */}
            <Suspense fallback={<div className="hidden lg:block w-[280px]" />}>
              <ProductFilters className="sticky top-[calc(var(--header-height)+2rem)] h-fit" />
            </Suspense>

            {/* Main Content */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                <p className="text-gray-600">
                  Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                </p>
                <Suspense fallback={null}>
                  <ProductSort />
                </Suspense>
              </div>

              {/* Products Grid */}
              <ProductGrid products={filteredProducts} />

              {/* Pagination would go here */}
              {filteredProducts.length > 12 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex gap-2" aria-label="Pagination">
                    <button className="btn btn-secondary btn-small" disabled>
                      Previous
                    </button>
                    <button className="btn btn-primary btn-small">1</button>
                    <button className="btn btn-secondary btn-small">2</button>
                    <button className="btn btn-secondary btn-small">3</button>
                    <button className="btn btn-secondary btn-small">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

