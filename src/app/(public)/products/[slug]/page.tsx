import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Share2, Check, Truck, Shield, Phone, MessageCircle } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import { getProductBySlug, getProductsByCategory, getAllCategories, getAllProducts, getBrandBySlug } from "@/lib/content";
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

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === product.category);
  const brand = product.brand ? getBrandBySlug(product.brand) : null;
  
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
  const specEntries = Object.entries(specifications);

  return (
    <div className="page-layout">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-8 border-b border-gray-100" aria-label="Breadcrumb">
        <div className="container max-w-7xl">
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
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">
            {/* Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-lg border border-gray-100">
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
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className="relative aspect-square bg-gray-100 overflow-hidden border border-gray-200 hover:border-[var(--geowags-red)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--geowags-red)]"
                      aria-label={`View image ${index + 1} of ${product.images.length}`}
                      tabIndex={0}
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
            <div className="space-y-8 lg:space-y-10">
              {/* Category, Brand & Collection */}
              <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-xs uppercase tracking-widest font-medium hover:text-[var(--geowags-red)] transition-colors"
                >
                  {category?.name || product.category}
                </Link>
                {brand && (
                  <>
                    <span className="text-gray-300">|</span>
                    <Link
                      href={`/products?brand=${brand.slug}`}
                      className="text-xs uppercase tracking-wider text-[var(--geowags-red)] font-medium hover:text-[var(--geowags-red-dark)] transition-colors"
                    >
                      {brand.name}
                    </Link>
                  </>
                )}
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
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 leading-tight tracking-tight">{product.name}</h1>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

              {/* Variants */}
              <div className="space-y-8 pt-4">
                {/* Colors */}
                {product.colors.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">Color</h4>
                      <span className="text-xs uppercase tracking-wider text-gray-500">Pick an option</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          className="group flex flex-col items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--geowags-red)]"
                          title={color.name}
                          aria-label={color.name}
                          aria-pressed={color === product.colors[0]}
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
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">Size</h4>
                      <span className="text-xs uppercase tracking-wider text-gray-500">Dimensions</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size, index) => (
                        <button
                          key={size.name}
                          className={`px-4 py-2 border text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--geowags-red)] ${
                            index === 0
                              ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                              : "border-gray-200 text-gray-700 hover:border-[var(--geowags-red)]"
                          }`}
                          aria-pressed={index === 0}
                          aria-label={`Size ${size.name}`}
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
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900">Finish</h4>
                      <span className="text-xs uppercase tracking-wider text-gray-500">Surface</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.finishes.map((finish, index) => (
                        <button
                          key={finish}
                          className={`px-4 py-2 border text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--geowags-red)] ${
                            index === 0
                              ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                              : "border-gray-200 text-gray-700 hover:border-[var(--geowags-red)]"
                          }`}
                          aria-pressed={index === 0}
                          aria-label={`Finish ${finish}`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi, I'm interested in the ${encodeURIComponent(product.name)}. Please provide pricing and availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large flex-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>
                <Link href="/contact" className="btn btn-secondary btn-large sm:min-w-[160px]">
                  <Phone className="w-5 h-5" />
                  Call Us
                </Link>
              </div>
              
              {/* Contact Info */}
              <div className="bg-gray-50 border border-gray-200 p-6 rounded">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Need help?</strong> Our team is here to assist you.
                </p>
                <p className="text-sm text-gray-500">
                  Call: <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`} className="text-[var(--geowags-red)] hover:underline">{SITE_CONFIG.phone}</a>
                  <span className="mx-2">|</span>
                  Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--geowags-red)] hover:underline">{SITE_CONFIG.email}</a>
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-gray-200">
                <div className="flex items-start gap-3 rounded border border-gray-200 p-4 bg-gray-50">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-[var(--geowags-red)] border border-gray-200">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                    <p className="text-xs text-gray-500">Within Accra</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded border border-gray-200 p-4 bg-gray-50">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-[var(--geowags-red)] border border-gray-200">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                    <p className="text-xs text-gray-500">Premium products</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded border border-gray-200 p-4 bg-gray-50">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-[var(--geowags-red)] border border-gray-200">
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
          {specEntries.length > 0 && (
            <div className="mt-20 lg:mt-28 pt-16 lg:pt-20 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <h2 className="heading-2 text-gray-900">Specifications</h2>
                <p className="text-sm text-gray-500">
                  Material details and care to help you plan your project.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {specEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white"
                  >
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-gray-900 font-medium text-right">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container max-w-7xl">
          <h2 className="heading-2 text-gray-900 mb-10 lg:mb-14">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </section>
    </div>
  );
}

