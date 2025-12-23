import { notFound } from "next/navigation";
import { getPageBySlug, getAllPages } from "@/lib/content/pages";
import { requireAuth } from "@/lib/auth";
import { PageForm } from "../PageForm";

// Generate static params for all pages
export function generateStaticParams() {
  const pages = getAllPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPagePage({ params }: Props) {
  await requireAuth();
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <PageForm page={page} />;
}

