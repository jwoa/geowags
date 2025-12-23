import { getAllProducts, getActiveProducts, getFeaturedProducts, getNewProducts } from "@/lib/content/products";
import { getAllCategories } from "@/lib/content/categories";
import { getAllBrands } from "@/lib/content/brands";
import { getAllCollections } from "@/lib/content/collections";
import { getAllPages } from "@/lib/content/pages";
import { requireAuth } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";

export default async function AdminDashboard() {
  await requireAuth();
  const products = getAllProducts();
  const activeProducts = getActiveProducts();
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();
  const collections = getAllCollections();
  const pages = getAllPages();

  const stats = {
    totalProducts: products.length,
    activeProducts: activeProducts.length,
    featuredProducts: featuredProducts.length,
    newProducts: newProducts.length,
    categories: categories.length,
    brands: brands.length,
    collections: collections.length,
    pages: pages.length,
  };

  // Get recent products (last 5)
  const recentProducts = products.slice(0, 5);

  return (
    <DashboardClient
      stats={stats}
      recentProducts={recentProducts}
      categories={categories}
    />
  );
}
