import { getAllCategories } from "@/lib/content/categories";
import { getAllBrands } from "@/lib/content/brands";
import { getAllCollections } from "@/lib/content/collections";
import { requireAuth } from "@/lib/auth";
import { ProductForm } from "../ProductForm";

export default async function NewProductPage() {
  await requireAuth();
  const categories = getAllCategories();
  const brands = getAllBrands();
  const collections = getAllCollections();

  return (
    <ProductForm
      categories={categories}
      brands={brands}
      collections={collections}
      isNew
    />
  );
}
