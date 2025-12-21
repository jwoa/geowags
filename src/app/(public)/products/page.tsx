import { Suspense } from "react";
import { Metadata } from "next";
import { ProductGrid, ProductFilters, ProductSort } from "@/components/products";
import { SITE_CONFIG } from "@/lib/constants";
import { getActiveProducts, getAllCategories, filterProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse our extensive collection of premium tiles, bathroom fixtures, and housewares at ${SITE_CONFIG.name}. Quality products for every home improvement project.`,
};

export const dynamic = "force-static";

type SearchParams = {
  category?: string;
  collection?: string;
  color?: string;
  size?: string;
  finish?: string;
  search?: string;
  sort?: string;
  page?: string;
};

type ProductsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) || {};
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
    <div className="page-layout">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header__body">
            <h1 className="heading-1">Our Products</h1>
            <p className="body-large text-subtle">
              Explore our extensive collection of premium tiles, bathroom fixtures,
              and housewares. Quality products for every home improvement project.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="page-content">
        <div className="container">
          <div className="products-layout">
            {/* Sidebar Filters */}
            <Suspense fallback={<div aria-hidden className="hide-mobile" style={{ width: "280px" }} />}>
              <ProductFilters />
            </Suspense>

            {/* Main Content */}
            <div>
              {/* Toolbar */}
              <div className="toolbar">
                <p className="text-subtle">
                  Showing <span className="text-primary">{productCardData.length}</span> products
                </p>
                <Suspense fallback={null}>
                  <ProductSort />
                </Suspense>
              </div>

              {/* Products Grid */}
              <ProductGrid products={productCardData} />

              {/* Pagination would go here */}
              {productCardData.length > 12 && (
                <div className="flex-center" style={{ marginTop: "3.5rem" }}>
                  <nav className="flex-row" style={{ gap: "0.5rem" }} aria-label="Pagination">
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

