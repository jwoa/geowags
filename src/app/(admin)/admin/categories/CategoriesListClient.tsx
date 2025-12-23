"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, X, Save, Loader2 } from "lucide-react";
import {
  AdminHeader,
  FormInput,
  FormTextarea,
  MarkdownEditor,
  ConfirmDialog,
} from "@/components/admin";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  type CategoryFormData,
} from "../actions/categoryActions";
import type { Category, Subcategory } from "@/lib/content/types";

type Props = {
  categories: Category[];
};

type EditingCategory = CategoryFormData | null;

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const CategoriesListClient = ({ categories }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<EditingCategory>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(0);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [content, setContent] = useState("");

  // Subcategory form
  const [newSubName, setNewSubName] = useState("");
  const [newSubSlug, setNewSubSlug] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setIcon("");
    setImage("");
    setOrder(categories.length + 1);
    setSubcategories([]);
    setContent("");
    setNewSubName("");
    setNewSubSlug("");
    setError(null);
  };

  const openNewModal = () => {
    resetForm();
    setIsNew(true);
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description);
    setIcon(category.icon);
    setImage(category.image);
    setOrder(category.order);
    setSubcategories(category.subcategories || []);
    setContent(category.content);
    setIsNew(false);
    setEditingCategory(category);
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

  const handleAddSubcategory = () => {
    if (!newSubName.trim()) return;
    const subSlug = newSubSlug.trim() || generateSlug(newSubName);
    setSubcategories([...subcategories, { name: newSubName.trim(), slug: subSlug }]);
    setNewSubName("");
    setNewSubSlug("");
  };

  const handleRemoveSubcategory = (index: number) => {
    setSubcategories(subcategories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData: CategoryFormData = {
      name,
      slug,
      description,
      icon,
      image,
      order,
      subcategories,
      content,
    };

    startTransition(async () => {
      const result = isNew
        ? await createCategoryAction(formData)
        : await updateCategoryAction(editingCategory!.slug, formData);

      if (result.success) {
        closeModal();
      } else {
        setError(result.error || "An error occurred");
      }
    });
  };

  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const result = await deleteCategoryAction(slug);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Categories</h1>
            <p className="text-gray-600">
              Manage product categories ({categories.length} total)
            </p>
          </div>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--geowags-red)] text-white rounded-sm hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Category Image */}
              <div className="aspect-video bg-gray-100 relative">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Category Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Order: {category.order}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>

                {/* Subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Subcategories:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub.slug}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openEditModal(category)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteSlug(category.slug)}
                    className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found. Create your first category.</p>
          </div>
        )}
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
                {isNew ? "Add New Category" : `Edit: ${editingCategory?.name}`}
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
                  placeholder="Category name"
                  required
                />
                <FormInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="category-slug"
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

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Icon name (e.g., Bath)"
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
              </div>

              <FormInput
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/categories/..."
                required
              />

              {/* Subcategories */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Subcategories
                </label>

                {subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {subcategories.map((sub, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                      >
                        {sub.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubcategory(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSubName}
                    onChange={(e) => {
                      setNewSubName(e.target.value);
                      setNewSubSlug(generateSlug(e.target.value));
                    }}
                    placeholder="Subcategory name"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)]"
                  />
                  <input
                    type="text"
                    value={newSubSlug}
                    onChange={(e) => setNewSubSlug(e.target.value)}
                    placeholder="slug"
                    className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    disabled={!newSubName.trim()}
                    className="px-3 py-2 bg-gray-800 text-white text-sm rounded-sm hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <MarkdownEditor
                value={content}
                onChange={setContent}
                label="Content"
                placeholder="Additional content about this category..."
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
                      {isNew ? "Create Category" : "Save Changes"}
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
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone. Products in this category will become uncategorized."
        confirmLabel={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteSlug && handleDelete(deleteSlug)}
        onCancel={() => setDeleteSlug(null)}
        isDestructive
      />
    </div>
  );
};

