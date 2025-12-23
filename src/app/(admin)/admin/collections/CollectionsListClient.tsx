"use client";

import { useState, useTransition } from "react";
import { Plus, Edit, Trash2, X, Save, Loader2, FolderOpen } from "lucide-react";
import {
  AdminHeader,
  FormInput,
  FormTextarea,
  MarkdownEditor,
  ConfirmDialog,
} from "@/components/admin";
import {
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
  type CollectionFormData,
} from "../actions/collectionActions";
import type { Collection } from "@/lib/content/types";

type Props = {
  collections: Collection[];
};

type EditingCollection = CollectionFormData | null;

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const CollectionsListClient = ({ collections }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<EditingCollection>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [content, setContent] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setOrder(collections.length + 1);
    setContent("");
    setError(null);
  };

  const openNewModal = () => {
    resetForm();
    setIsNew(true);
    setEditingCollection(null);
    setIsModalOpen(true);
  };

  const openEditModal = (collection: Collection) => {
    setName(collection.name);
    setSlug(collection.slug);
    setDescription(collection.description);
    setOrder(collection.order);
    setContent(collection.content);
    setIsNew(false);
    setEditingCollection(collection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData: CollectionFormData = {
      name,
      slug,
      description,
      order,
      content,
    };

    startTransition(async () => {
      const result = isNew
        ? await createCollectionAction(formData)
        : await updateCollectionAction(editingCollection!.slug, formData);

      if (result.success) {
        closeModal();
      } else {
        setError(result.error || "An error occurred");
      }
    });
  };

  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const result = await deleteCollectionAction(slug);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Collections</h1>
            <p className="text-gray-600">
              Manage product collections ({collections.length} total)
            </p>
          </div>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--geowags-red)] text-white rounded-sm hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Collection
          </button>
        </div>

        {/* Collections List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {collections.map((collection) => (
                <tr key={collection.slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 w-20">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full font-medium">
                      {collection.order}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{collection.name}</p>
                        <p className="text-sm text-gray-500">/{collection.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                    <p className="line-clamp-2">{collection.description}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(collection)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteSlug(collection.slug)}
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

          {collections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No collections found. Create your first collection.</p>
            </div>
          )}
        </div>
      </main>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {isNew ? "Add New Collection" : `Edit: ${editingCollection?.name}`}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Collection name"
                  required
                />
                <FormInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="collection-slug"
                  required
                />
              </div>

              <FormTextarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                rows={2}
                required
              />

              <FormInput
                label="Order"
                type="number"
                value={order.toString()}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                min={1}
                required
              />

              <MarkdownEditor
                value={content}
                onChange={setContent}
                label="Content"
                placeholder="Additional content about this collection..."
                rows={6}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--geowags-red)] text-white text-sm rounded-sm hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {isNew ? "Create Collection" : "Save Changes"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteSlug}
        title="Delete Collection"
        message="Are you sure you want to delete this collection? This action cannot be undone."
        confirmLabel={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteSlug && handleDelete(deleteSlug)}
        onCancel={() => setDeleteSlug(null)}
        isDestructive
      />
    </div>
  );
};

