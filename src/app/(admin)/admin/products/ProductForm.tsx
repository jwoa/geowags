"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import {
  AdminHeader,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  ImagePicker,
  MarkdownEditor,
  SpecificationsEditor,
  TagsEditor,
  type ImageItem,
} from "@/components/admin";
import {
  createProductAction,
  updateProductAction,
  type ProductFormData,
} from "../actions/productActions";
import type { Product, Category, Brand, Collection, Subcategory } from "@/lib/content/types";

type Props = {
  product?: Product;
  categories: Category[];
  brands: Brand[];
  collections: Collection[];
  isNew?: boolean;
};

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const ProductForm = ({
  product,
  categories,
  brands,
  collections,
  isNew = false,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [category, setCategory] = useState(product?.category || "");
  const [subcategory, setSubcategory] = useState(product?.subcategory || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [collection, setCollection] = useState(product?.collection || "");
  const [featured, setFeatured] = useState(product?.featured || false);
  const [isNew_, setIsNew_] = useState(product?.new || false);
  const [active, setActive] = useState(product?.active ?? true);
  const [images, setImages] = useState<ImageItem[]>(product?.images || []);
  const [specifications, setSpecifications] = useState<Record<string, string>>(
    product?.specifications || {}
  );
  const [finishes, setFinishes] = useState<string[]>(product?.finishes || []);
  const [description, setDescription] = useState(product?.description || "");

  // Get subcategories for selected category
  const selectedCategory = categories.find((c) => c.slug === category);
  const subcategories: Subcategory[] = selectedCategory?.subcategories || [];

  const handleNameChange = (value: string) => {
    setName(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData: ProductFormData = {
      name,
      slug,
      category,
      subcategory: subcategory || undefined,
      brand: brand || undefined,
      collection: collection || undefined,
      featured,
      new: isNew_,
      active,
      images,
      specifications,
      colors: product?.colors || [],
      sizes: product?.sizes || [],
      finishes,
      description,
    };

    startTransition(async () => {
      const result = isNew
        ? await createProductAction(formData)
        : await updateProductAction(product!.slug, formData);

      if (result.success) {
        router.push("/admin/products");
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
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? "Add New Product" : `Edit: ${product?.name}`}
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
                  Basic Information
                </h2>

                <FormInput
                  label="Product Name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter product name"
                  required
                />

                <FormInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="product-slug"
                  helpText="URL-friendly identifier. Auto-generated from name."
                  required
                />

                <FormTextarea
                  label="Short Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief product description..."
                  rows={3}
                />
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Images
                </h2>
                <ImagePicker images={images} onChange={setImages} />
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Specifications
                </h2>
                <SpecificationsEditor
                  specifications={specifications}
                  onChange={setSpecifications}
                  label=""
                />
              </div>

              {/* Finishes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Finishes
                </h2>
                <TagsEditor
                  tags={finishes}
                  onChange={setFinishes}
                  label=""
                  placeholder="Add a finish (e.g., Chrome, Brushed Nickel)"
                />
              </div>

              {/* Full Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Full Description
                </h2>
                <MarkdownEditor
                  value={description}
                  onChange={setDescription}
                  label=""
                  placeholder="Write a detailed product description..."
                  rows={8}
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
                <div className="space-y-4">
                  <FormCheckbox
                    label="Active"
                    checked={active}
                    onChange={setActive}
                    helpText="Product is visible on the website"
                  />
                  <FormCheckbox
                    label="Featured"
                    checked={featured}
                    onChange={setFeatured}
                    helpText="Show in featured section"
                  />
                  <FormCheckbox
                    label="New"
                    checked={isNew_}
                    onChange={setIsNew_}
                    helpText="Mark as new product"
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
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
                        {isNew ? "Create Product" : "Save Changes"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Organization
                </h2>
                <div className="space-y-4">
                  <FormSelect
                    label="Category"
                    options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                    value={category}
                    onChange={(val) => {
                      setCategory(val);
                      setSubcategory("");
                    }}
                    required
                  />

                  {subcategories.length > 0 && (
                    <FormSelect
                      label="Subcategory"
                      options={subcategories.map((s) => ({ value: s.slug, label: s.name }))}
                      value={subcategory}
                      onChange={setSubcategory}
                      placeholder="Select subcategory..."
                    />
                  )}

                  <FormSelect
                    label="Brand"
                    options={brands.map((b) => ({ value: b.slug, label: b.name }))}
                    value={brand}
                    onChange={setBrand}
                    placeholder="Select brand..."
                  />

                  <FormSelect
                    label="Collection"
                    options={collections.map((c) => ({ value: c.slug, label: c.name }))}
                    value={collection}
                    onChange={setCollection}
                    placeholder="Select collection..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

