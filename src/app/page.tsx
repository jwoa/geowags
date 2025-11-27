import {
  Hero,
  CategoryShowcase,
  FeaturedProducts,
  AboutPreview,
  CallToAction,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <AboutPreview />
      <CallToAction />
    </>
  );
}
