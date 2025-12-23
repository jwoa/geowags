import { getAllCategories } from "@/lib/content/categories";
import { requireAuth } from "@/lib/auth";
import { CategoriesListClient } from "./CategoriesListClient";

export default async function AdminCategoriesPage() {
  await requireAuth();
  const categories = getAllCategories();

  return <CategoriesListClient categories={categories} />;
}

