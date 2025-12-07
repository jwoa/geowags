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
    <div className="page-layout">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header__body" style={{ maxWidth: "48rem" }}>
            <h1 className="heading-1">{page.title}</h1>
            {page.description && (
              <p className="body-large text-subtle" style={{ maxWidth: "36rem" }}>
                {page.description}
              </p>
            )}
            {page.lastUpdated && (
              <p className="text-subtle text-sm">
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
      <section className="page-content">
        <div className="container">
          <div className="surface" style={{ maxWidth: "48rem", margin: "0 auto", padding: "2.5rem" }}>
            <article dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
          </div>
        </div>
      </section>
    </div>
  );
}
