"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, X, Save, Loader2, ExternalLink } from "lucide-react";
import {
  AdminHeader,
  FormInput,
  FormTextarea,
  MarkdownEditor,
  ConfirmDialog,
} from "@/components/admin";
import {
  createBrandAction,
  updateBrandAction,
  deleteBrandAction,
  type BrandFormData,
} from "../actions/brandActions";
import type { Brand } from "@/lib/content/types";

type Props = {
  brands: Brand[];
};

type EditingBrand = BrandFormData | null;

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const BrandsListClient = ({ brands }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<EditingBrand>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState("");
  const [order, setOrder] = useState(0);
  const [content, setContent] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setCountry("");
    setLogo("");
    setWebsite("");
    setOrder(brands.length + 1);
    setContent("");
    setError(null);
  };

  const openNewModal = () => {
    resetForm();
    setIsNew(true);
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const openEditModal = (brand: Brand) => {
    setName(brand.name);
    setSlug(brand.slug);
    setDescription(brand.description);
    setCountry(brand.country || "");
    setLogo(brand.logo || "");
    setWebsite(brand.website || "");
    setOrder(brand.order);
    setContent(brand.content);
    setIsNew(false);
    setEditingBrand(brand);
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

    const formData: BrandFormData = {
      name,
      slug,
      description,
      country: country || undefined,
      logo: logo || undefined,
      website: website || undefined,
      order,
      content,
    };

    startTransition(async () => {
      const result = isNew
        ? await createBrandAction(formData)
        : await updateBrandAction(editingBrand!.slug, formData);

      if (result.success) {
        closeModal();
      } else {
        setError(result.error || "An error occurred");
      }
    });
  };

  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const result = await deleteBrandAction(slug);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Brands</h1>
            <p className="text-gray-600">
              Manage product brands ({brands.length} total)
            </p>
          </div>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--geowags-red)] text-white rounded-sm hover:bg-red-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Brand
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.slug}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Brand Logo */}
              <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="max-h-16 w-auto object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-300">
                    {brand.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Brand Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                    {brand.country && (
                      <p className="text-xs text-gray-500">{brand.country}</p>
                    )}
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    #{brand.order}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {brand.description}
                </p>

                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--geowags-red)] hover:underline mb-3"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Website
                  </a>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openEditModal(brand)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteSlug(brand.slug)}
                    className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {brands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No brands found. Create your first brand.</p>
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
                {isNew ? "Add New Brand" : `Edit: ${editingBrand?.name}`}
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
                  placeholder="Brand name"
                  required
                />
                <FormInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="brand-slug"
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
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country of origin"
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
                label="Logo URL"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="/images/brands/..."
              />

              <FormInput
                label="Website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.brand.com"
              />

              <MarkdownEditor
                value={content}
                onChange={setContent}
                label="Content"
                placeholder="Additional content about this brand..."
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
                      {isNew ? "Create Brand" : "Save Changes"}
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
        title="Delete Brand"
        message="Are you sure you want to delete this brand? This action cannot be undone."
        confirmLabel={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteSlug && handleDelete(deleteSlug)}
        onCancel={() => setDeleteSlug(null)}
        isDestructive
      />
    </div>
  );
};

