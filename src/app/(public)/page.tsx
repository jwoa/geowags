import {
  Hero,
  CategoryShowcase,
  AboutPreview,
  CallToAction,
} from "@/components/home";
import { getAllCategories } from "@/lib/content";

export default function HomePage() {
  const categories = getAllCategories();

  return (
    <>
      <Hero />
      <CategoryShowcase categories={categories} />
      <AboutPreview />
      <CallToAction />
    </>
  );
}
