import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/content/products";
import { getAllCategories } from "@/lib/content/categories";
import { getAllBrands } from "@/lib/content/brands";
import { getAllCollections } from "@/lib/content/collections";
import { requireAuth } from "@/lib/auth";
import { ProductForm } from "../ProductForm";

// Generate static params for all products
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditProductPage({ params }: Props) {
  await requireAuth();
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categories = getAllCategories();
  const brands = getAllBrands();
  const collections = getAllCollections();

  return (
    <ProductForm
      product={product}
      categories={categories}
      brands={brands}
      collections={collections}
    />
  );
}

