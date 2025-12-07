import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid, ProductFilters, ProductSort } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveProducts, getAllCategories, filterProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse our extensive collection of premium tiles, bathroom fixtures, and housewares at ${SITE_CONFIG.name}. Quality products for every home improvement project.`,
};
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
  const categories = getAllCategories();
  
  // Fetch and filter products from markdown content
  let products = getActiveProducts();
  
  // Apply filters
  const filters: any = {};
  if (params.category) {
    filters.categories = params.category.split(",");
  }
  if (params.collection) {
    filters.collections = params.collection.split(",");
  }
  if (params.color) {
    filters.colors = params.color.split(",");
  }
  if (params.size) {
    filters.sizes = params.size.split(",");
  }
  if (params.finish) {
    filters.finishes = params.finish.split(",");
  }
  
  const filteredProducts = Object.keys(filters).length > 0 
    ? filterProducts(filters) 
    : products;
  
  // Convert to format expected by components
  const productCardData = filteredProducts.map((product) => ({
    id: product.slug,
    name: product.name,
    slug: product.slug,
    isFeatured: product.featured,
    isNew: product.new,
    category: {
      name: categories.find((c) => c.slug === product.category)?.name || product.category,
      slug: product.category,
    },
    images: product.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      isPrimary: img.primary,
    })),
  }));

  return (
    <div className="pt-[var(--header-height)]">
      {/* Page Header */}
      <section className="bg-gray-50 py-14 lg:py-18 border-b border-gray-200">
        <div className="container">
          <div className="max-w-3xl space-y-3">
            <h1 className="heading-1 text-gray-900">Our Products</h1>
            <p className="body-large text-gray-600">
              Explore our extensive collection of premium tiles, bathroom fixtures,
              and housewares. Quality products for every home improvement project.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-12 xl:gap-16 items-start">
            {/* Sidebar Filters */}
            <Suspense fallback={<div className="hidden lg:block w-[280px]" />}>
              <div className="hidden lg:block sticky top-[calc(var(--header-height)+2rem)]">
                <div className="border border-gray-200 bg-white shadow-sm p-6 space-y-6">
                  <ProductFilters />
                </div>
              </div>
            </Suspense>

            {/* Main Content */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
                <p className="text-gray-600 leading-relaxed">
                  Showing <span className="font-medium text-gray-900">{productCardData.length}</span> products
                </p>
                <Suspense fallback={null}>
                  <ProductSort />
                </Suspense>
              </div>

              {/* Products Grid */}
              <ProductGrid products={productCardData} />

              {/* Pagination would go here */}
              {productCardData.length > 12 && (
                <div className="mt-14 flex justify-center">
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

