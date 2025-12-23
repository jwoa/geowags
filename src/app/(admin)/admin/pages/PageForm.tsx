"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import {
  AdminHeader,
  FormInput,
  FormTextarea,
  MarkdownEditor,
} from "@/components/admin";
import {
  createPageAction,
  updatePageAction,
  type PageFormData,
} from "../actions/pageActions";
import type { Page } from "@/lib/content/types";

type Props = {
  page?: Page;
  isNew?: boolean;
};

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const PageForm = ({ page, isNew = false }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [description, setDescription] = useState(page?.description || "");
  const [content, setContent] = useState(page?.content || "");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData: PageFormData = {
      title,
      slug,
      description: description || undefined,
      lastUpdated: new Date().toISOString().split("T")[0],
      content,
    };

    startTransition(async () => {
      const result = isNew
        ? await createPageAction(formData)
        : await updatePageAction(page!.slug, formData);

      if (result.success) {
        router.push("/admin/pages");
      } else {
        setError(result.error || "An error occurred");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pages
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? "Add New Page" : `Edit: ${page?.title}`}
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Page Information
                </h2>

                <FormInput
                  label="Title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Page title"
                  required
                />

                <FormInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="page-slug"
                  helpText="URL path for this page (e.g., /faq, /terms)"
                  required
                />

                <FormTextarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for SEO..."
                  rows={2}
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Page Content
                </h2>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  label=""
                  placeholder="Write your page content here..."
                  rows={20}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Publish
                </h2>

                {page?.lastUpdated && (
                  <p className="text-sm text-gray-500 mb-4">
                    Last updated: {page.lastUpdated}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--geowags-red)] text-white rounded-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {isNew ? "Create Page" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>

              {/* Preview Link */}
              {!isNew && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Preview
                  </h2>
                  <Link
                    href={`/${page?.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-[var(--geowags-red)] hover:underline"
                  >
                    View page →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

