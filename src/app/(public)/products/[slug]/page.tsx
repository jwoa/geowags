import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Heart, Share2, Check, Truck, Shield, Phone } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import type { ProductCardData } from "@/lib/types";

// Demo product data - will be replaced with database fetch
const demoProducts = [
  {
    id: "1",
    name: "Carrara White Marble Tile",
    slug: "carrara-white-marble-tile",
    description: "Elevate your space with the timeless elegance of Carrara White Marble Tiles. These premium tiles feature the classic white background with subtle grey veining that has made Carrara marble a favorite of architects and designers for centuries. Perfect for floors, walls, and countertops.",
    specifications: JSON.stringify({
      material: "Natural Marble",
      finish: "Polished",
      thickness: "10mm",
      origin: "Italy",
      usage: "Indoor/Outdoor",
      waterAbsorption: "< 0.5%",
    }),
    isFeatured: true,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    collection: { name: "Luxury Marble", slug: "luxury-marble" },
    images: [
      { url: "/images/products/tile-1.jpg", alt: "Carrara White Marble Tile - Main", isPrimary: true },
      { url: "/images/products/tile-1-2.jpg", alt: "Carrara White Marble Tile - Detail", isPrimary: false },
      { url: "/images/products/tile-1-3.jpg", alt: "Carrara White Marble Tile - Room", isPrimary: false },
    ],
    colors: [
      { name: "White", hexCode: "#FFFFFF" },
      { name: "Grey", hexCode: "#808080" },
    ],
    sizes: [
      { name: "30x30 cm", dimensions: "300mm x 300mm x 10mm" },
      { name: "60x60 cm", dimensions: "600mm x 600mm x 10mm" },
      { name: "60x120 cm", dimensions: "600mm x 1200mm x 10mm" },
    ],
    finishes: [
      { name: "Polished" },
      { name: "Honed" },
      { name: "Brushed" },
    ],
  },
];

// Related products demo
const relatedProducts: ProductCardData[] = [
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
    id: "5",
    name: "Porcelain Wood Plank",
    slug: "porcelain-wood-plank",
    isFeatured: false,
    isNew: false,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-3.jpg", alt: "Porcelain Wood Plank", isPrimary: true }],
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
    id: "11",
    name: "Slate Effect Porcelain",
    slug: "slate-effect-porcelain",
    isFeatured: false,
    isNew: true,
    category: { name: "Tiles", slug: "tiles" },
    images: [{ url: "/images/products/tile-6.jpg", alt: "Slate Effect Porcelain", isPrimary: true }],
  },
];

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = demoProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${SITE_CONFIG.name}`,
      description: product.description,
      images: product.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = demoProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const specifications = JSON.parse(product.specifications || "{}");
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <div className="pt-[var(--header-height)]">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4" aria-label="Breadcrumb">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link href="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                Products
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {product.category.name}
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {/* Placeholder - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-lg">Product Image</span>
                  </div>
                </div>

                {/* Badges */}
                {(product.isNew || product.isFeatured) && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <span className="badge badge-primary">New</span>}
                    {product.isFeatured && <span className="badge badge-accent">Featured</span>}
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className="relative aspect-square bg-gray-100 overflow-hidden border-2 border-transparent hover:border-[var(--geowags-red)] transition-colors"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-250" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              {/* Category & Collection */}
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-xs uppercase tracking-wider text-gray-500 hover:text-[var(--geowags-red)] transition-colors"
                >
                  {product.category.name}
                </Link>
                {product.collection && (
                  <>
                    <span className="text-gray-300">|</span>
                    <Link
                      href={`/products?collection=${product.collection.slug}`}
                      className="text-xs uppercase tracking-wider text-gray-500 hover:text-[var(--geowags-red)] transition-colors"
                    >
                      {product.collection.name}
                    </Link>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="heading-1 text-gray-900 mb-6">{product.name}</h1>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              {/* Variants */}
              <div className="space-y-6 mb-8">
                {/* Colors */}
                {product.colors.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Color</h4>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          className="group flex flex-col items-center gap-2"
                          title={color.name}
                        >
                          <span
                            className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-[var(--geowags-red)] transition-colors"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          <span className="text-xs text-gray-600">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Size</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size, index) => (
                        <button
                          key={size.name}
                          className={`px-4 py-2 border text-sm font-medium transition-all ${
                            index === 0
                              ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                              : "border-gray-200 text-gray-700 hover:border-[var(--geowags-red)]"
                          }`}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Finishes */}
                {product.finishes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Finish</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.finishes.map((finish, index) => (
                        <button
                          key={finish.name}
                          className={`px-4 py-2 border text-sm font-medium transition-all ${
                            index === 0
                              ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                              : "border-gray-200 text-gray-700 hover:border-[var(--geowags-red)]"
                          }`}
                        >
                          {finish.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn btn-primary btn-large flex-1">
                  <Phone className="w-5 h-5" />
                  Inquire Now
                </Link>
                <button className="btn btn-secondary btn-large">
                  <Heart className="w-5 h-5" />
                  Save
                </button>
                <button className="btn btn-secondary btn-large">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-[var(--geowags-red)]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                    <p className="text-xs text-gray-500">Within Accra</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-[var(--geowags-red)]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                    <p className="text-xs text-gray-500">Premium products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-[var(--geowags-red)]">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expert Support</p>
                    <p className="text-xs text-gray-500">Professional advice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="heading-2 text-gray-900 mb-8">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-gray-900 font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="heading-2 text-gray-900 mb-8">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </section>
    </div>
  );
}

