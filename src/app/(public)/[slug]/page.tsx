import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/constants";

type StaticPageProps = {
  params: Promise<{ slug: string }>;
};

const ALLOWED_PAGES = ["faq", "privacy", "terms", "shipping", "returns"];

export async function generateMetadata({ params }: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (!ALLOWED_PAGES.includes(slug)) {
    return {
      title: "Page Not Found",
    };
  }

  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description || `${page.title} - ${SITE_CONFIG.name}`,
  };
}

export async function generateStaticParams() {
  return ALLOWED_PAGES.map((slug) => ({
    slug,
  }));
}

export default async function StaticPage({ params }: StaticPageProps) {
  const { slug } = await params;

  if (!ALLOWED_PAGES.includes(slug)) {
    notFound();
  }

  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="pt-[var(--header-height)]">
      {/* Page Header */}
      <section className="bg-gray-50 py-14 lg:py-18 border-b border-gray-200">
        <div className="container">
          <div className="max-w-4xl space-y-3">
            <h1 className="heading-1 text-gray-900">{page.title}</h1>
            {page.description && (
              <p className="body-large text-gray-600 max-w-3xl">
                {page.description}
              </p>
            )}
            {page.lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Page Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-8 md:p-10 shadow-sm">
            <article
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-display prose-headings:font-medium
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-900
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-800
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-[var(--geowags-red)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-600 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--geowags-red)]
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-code:text-[var(--geowags-red)] prose-code:bg-gray-100
                prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-hr:my-12 prose-hr:border-gray-200"
              dangerouslySetInnerHTML={{ __html: page.contentHtml }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
