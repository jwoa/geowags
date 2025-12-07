import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Share2, Check, Truck, Shield, Phone } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import { getProductBySlug, getProductsByCategory, getAllCategories } from "@/lib/content";
type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === product.category);
  
  // Get related products from same category
  const relatedProductsFull = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);
  
  const relatedProducts = relatedProductsFull.map((p) => ({
    id: p.slug,
    name: p.name,
    slug: p.slug,
    isFeatured: p.featured,
    isNew: p.new,
    category: {
      name: category?.name || p.category,
      slug: p.category,
    },
    images: p.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      isPrimary: img.primary,
    })),
  }));

  const specifications = product.specifications || {};
  const primaryImage = product.images.find((img) => img.primary) || product.images[0];

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
                href={`/products?category=${product.category}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {category?.name || product.category}
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
                <Image
                  src={primaryImage?.url || "/images/placeholder.jpg"}
                  alt={primaryImage?.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Badges */}
                {(product.new || product.featured) && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.new && <span className="badge badge-primary">New</span>}
                    {product.featured && <span className="badge badge-accent">Featured</span>}
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
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
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
                  href={`/products?category=${product.category}`}
                  className="text-xs uppercase tracking-wider text-gray-500 hover:text-[var(--geowags-red)] transition-colors"
                >
                  {category?.name || product.category}
                </Link>
                {product.collection && (
                  <>
                    <span className="text-gray-300">|</span>
                    <Link
                      href={`/products?collection=${product.collection}`}
                      className="text-xs uppercase tracking-wider text-gray-500 hover:text-[var(--geowags-red)] transition-colors"
                    >
                      {product.collection}
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
                            style={{ backgroundColor: color.hex }}
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
                          key={finish}
                          className={`px-4 py-2 border text-sm font-medium transition-all ${
                            index === 0
                              ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                              : "border-gray-200 text-gray-700 hover:border-[var(--geowags-red)]"
                          }`}
                        >
                          {finish}
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

