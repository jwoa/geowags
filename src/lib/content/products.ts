import { getAllMarkdownFiles, getMarkdownFile, writeMarkdownFile, deleteMarkdownFile } from "../markdown";
import type { Product, ProductFrontmatter } from "./types";

const PRODUCTS_DIR = "products";

/**
 * Convert markdown file to Product object
 */
function markdownToProduct(file: {
  data: ProductFrontmatter;
  content: string;
  contentHtml: string;
  slug: string;
}): Product {
  return {
    slug: file.slug,
    name: file.data.name,
    category: file.data.category,
    collection: file.data.collection,
    featured: file.data.featured,
    new: file.data.new,
    active: file.data.active,
    images: file.data.images || [],
    specifications: file.data.specifications || {},
    colors: file.data.colors || [],
    sizes: file.data.sizes || [],
    finishes: file.data.finishes || [],
    description: file.content,
    descriptionHtml: file.contentHtml,
  };
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  const files = getAllMarkdownFiles<ProductFrontmatter>(PRODUCTS_DIR);
  return files.map(markdownToProduct).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get active products only
 */
export function getActiveProducts(): Product[] {
  return getAllProducts().filter((product) => product.active);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((product) => product.featured);
}

/**
 * Get new products
 */
export function getNewProducts(): Product[] {
  return getActiveProducts().filter((product) => product.new);
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | null {
  try {
    const file = getMarkdownFile<ProductFrontmatter>(PRODUCTS_DIR, slug);
    return markdownToProduct(file);
  } catch (error) {
    return null;
  }
}

/**
 * Get products by category
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return getActiveProducts().filter((product) => product.category === categorySlug);
}

/**
 * Get products by collection
 */
export function getProductsByCollection(collectionSlug: string): Product[] {
  return getActiveProducts().filter((product) => product.collection === collectionSlug);
}

/**
 * Search products
 */
export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  return getActiveProducts().filter((product) => {
    // Search in name
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in description
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in category
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in collection
    if (product.collection?.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in specifications
    if (product.specifications) {
      const specsString = Object.entries(product.specifications)
        .map(([key, value]) => `${key} ${value}`)
        .join(" ")
        .toLowerCase();
      
      if (specsString.includes(normalizedQuery)) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Filter products by multiple criteria
 */
export type ProductFilters = {
  categories?: string[];
  collections?: string[];
  colors?: string[];
  sizes?: string[];
  finishes?: string[];
  featured?: boolean;
  new?: boolean;
};

export function filterProducts(filters: ProductFilters): Product[] {
  let products = getActiveProducts();

  if (filters.categories && filters.categories.length > 0) {
    products = products.filter((p) => filters.categories!.includes(p.category));
  }

  if (filters.collections && filters.collections.length > 0) {
    products = products.filter((p) => p.collection && filters.collections!.includes(p.collection));
  }

  if (filters.colors && filters.colors.length > 0) {
    products = products.filter((p) =>
      p.colors.some((color) => filters.colors!.includes(color.name.toLowerCase()))
    );
  }

  if (filters.sizes && filters.sizes.length > 0) {
    products = products.filter((p) =>
      p.sizes.some((size) => filters.sizes!.includes(size.name.toLowerCase()))
    );
  }

  if (filters.finishes && filters.finishes.length > 0) {
    products = products.filter((p) =>
      p.finishes.some((finish) => filters.finishes!.includes(finish.toLowerCase()))
    );
  }

  if (filters.featured !== undefined) {
    products = products.filter((p) => p.featured === filters.featured);
  }

  if (filters.new !== undefined) {
    products = products.filter((p) => p.new === filters.new);
  }

  return products;
}

/**
 * Create a new product
 */
export function createProduct(product: Omit<Product, "descriptionHtml">): void {
  const frontmatter: ProductFrontmatter = {
    name: product.name,
    slug: product.slug,
    category: product.category,
    collection: product.collection,
    featured: product.featured,
    new: product.new,
    active: product.active,
    images: product.images,
    specifications: product.specifications,
    colors: product.colors,
    sizes: product.sizes,
    finishes: product.finishes,
  };

  writeMarkdownFile(PRODUCTS_DIR, product.slug, frontmatter, product.description);
}

/**
 * Update an existing product
 */
export function updateProduct(slug: string, product: Omit<Product, "descriptionHtml">): void {
  // Delete old file if slug changed
  if (slug !== product.slug) {
    deleteMarkdownFile(PRODUCTS_DIR, slug);
  }

  createProduct(product);
}

/**
 * Delete a product
 */
export function deleteProduct(slug: string): void {
  deleteMarkdownFile(PRODUCTS_DIR, slug);
}
