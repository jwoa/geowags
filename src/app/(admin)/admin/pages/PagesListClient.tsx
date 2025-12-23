"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, FileText } from "lucide-react";
import { AdminHeader, ConfirmDialog } from "@/components/admin";
import { deletePageAction } from "../actions/pageActions";
import type { Page } from "@/lib/content/types";

type Props = {
  pages: Page[];
};

export const PagesListClient = ({ pages }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const result = await deletePageAction(slug);
      if (result.success) {
        setDeleteSlug(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Pages</h1>
            <p className="text-gray-600">
              Manage static pages ({pages.length} total)
            </p>
          </div>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--geowags-red)] text-white rounded-sm hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Page
          </Link>
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{page.title}</p>
                        <p className="text-sm text-gray-500">/{page.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <p className="line-clamp-2">{page.description || "-"}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {page.lastUpdated || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteSlug(page.slug)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No pages found. Create your first page.</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteSlug}
        title="Delete Page"
        message="Are you sure you want to delete this page? This action cannot be undone."
        confirmLabel={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteSlug && handleDelete(deleteSlug)}
        onCancel={() => setDeleteSlug(null)}
        isDestructive
      />
    </div>
  );
};

