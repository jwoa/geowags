import {
  Hero,
  CategoryShowcase,
  FeaturedProducts,
  AboutPreview,
  CallToAction,
} from "@/components/home";
import { getFeaturedProducts, getAllCategories } from "@/lib/content";

export default function HomePage() {
  // Fetch featured products from markdown content
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();

  // Convert to format expected by components
  const productCardData = featuredProducts.slice(0, 6).map((product) => ({
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
    <>
      <Hero />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={productCardData} />
      <AboutPreview />
      <CallToAction />
    </>
  );
}
