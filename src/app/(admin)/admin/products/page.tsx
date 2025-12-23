import { getAllProducts } from "@/lib/content/products";
import { getAllCategories } from "@/lib/content/categories";
import { requireAuth } from "@/lib/auth";
import { ProductsListClient } from "./ProductsListClient";

export default async function AdminProductsPage() {
  await requireAuth();
  const products = getAllProducts();
  const categories = getAllCategories();

  return <ProductsListClient products={products} categories={categories} />;
}
