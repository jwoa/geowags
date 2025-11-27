"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Package,
  Grid3X3,
  FolderOpen,
  Mail,
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

type ProductFormData = {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  collectionId: string;
  specifications: Record<string, string>;
  colors: { name: string; hexCode: string }[];
  sizes: { name: string; dimensions: string }[];
  finishes: string[];
  isFeatured: boolean;
  isNew: boolean;
  isActive: boolean;
};

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  categoryId: "",
  collectionId: "",
  specifications: {},
  colors: [],
  sizes: [],
  finishes: [],
  isFeatured: false,
  isNew: true,
  isActive: true,
};

const categories = [
  { id: "1", name: "Tiles" },
  { id: "2", name: "Bathroom Fixtures" },
  { id: "3", name: "Kitchen & Dining" },
  { id: "4", name: "Home Decor" },
];

const collections = [
  { id: "1", name: "Luxury Marble" },
  { id: "2", name: "Modern Bath" },
  { id: "3", name: "Contemporary" },
  { id: "4", name: "Classic" },
  { id: "5", name: "Wood Look" },
];

const availableFinishes = ["Matte", "Glossy", "Polished", "Textured", "Satin", "Brushed"];

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });
  const [newColor, setNewColor] = useState({ name: "", hexCode: "#000000" });
  const [newSize, setNewSize] = useState({ name: "", dimensions: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Auto-generate slug from name
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleAddSpec = () => {
    if (newSpec.key && newSpec.value) {
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [newSpec.key]: newSpec.value },
      }));
      setNewSpec({ key: "", value: "" });
    }
  };

  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const { [key]: removed, ...rest } = prev.specifications;
      return { ...prev, specifications: rest };
    });
  };

  const handleAddColor = () => {
    if (newColor.name) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, { ...newColor }],
      }));
      setNewColor({ name: "", hexCode: "#000000" });
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleAddSize = () => {
    if (newSize.name) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }],
      }));
      setNewSize({ name: "", dimensions: "" });
    }
  };

  const handleRemoveSize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleToggleFinish = (finish: string) => {
    setFormData((prev) => ({
      ...prev,
      finishes: prev.finishes.includes(finish)
        ? prev.finishes.filter((f) => f !== finish)
        : [...prev.finishes, finish],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xl font-bold text-[var(--geowags-red)]">
              GEOWAGS
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-medium">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Eye className="w-4 h-4" />
              View Site
            </Link>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <ul className="flex gap-1">
            {[
              { label: "Dashboard", href: "/admin", icon: TrendingUp },
              { label: "Products", href: "/admin/products", icon: Package, active: true },
              { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
              { label: "Collections", href: "/admin/collections", icon: FolderOpen },
              { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
              { label: "Media", href: "/admin/media", icon: ImageIcon },
              { label: "Settings", href: "/admin/settings", icon: Settings },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      item.active
                        ? "text-[var(--geowags-red)] border-b-2 border-[var(--geowags-red)]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600">Create a new product listing</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push("/admin/products")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Product
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="e.g., Carrara White Marble Tile"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="slug" className="label">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="carrara-white-marble-tile"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      URL: /products/{formData.slug || "product-slug"}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="description" className="label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className="input textarea"
                      placeholder="Describe the product..."
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Images</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drop images here or click to upload</p>
                  <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB</p>
                  <button type="button" className="btn btn-secondary">
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Specifications</h2>
                
                {/* Existing specs */}
                {Object.entries(formData.specifications).length > 0 && (
                  <div className="mb-4 space-y-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span>
                          <strong className="text-gray-700">{key}:</strong>{" "}
                          <span className="text-gray-600">{value}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(key)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new spec */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpec.key}
                    onChange={(e) => setNewSpec((prev) => ({ ...prev, key: e.target.value }))}
                    className="input flex-1"
                    placeholder="Property (e.g., Material)"
                  />
                  <input
                    type="text"
                    value={newSpec.value}
                    onChange={(e) => setNewSpec((prev) => ({ ...prev, value: e.target.value }))}
                    className="input flex-1"
                    placeholder="Value (e.g., Porcelain)"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="btn btn-secondary"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Variants */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Variants</h2>

                {/* Colors */}
                <div className="mb-6">
                  <label className="label">Colors</label>
                  {formData.colors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.colors.map((color, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          {color.name}
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newColor.name}
                      onChange={(e) => setNewColor((prev) => ({ ...prev, name: e.target.value }))}
                      className="input flex-1"
                      placeholder="Color name"
                    />
                    <input
                      type="color"
                      value={newColor.hexCode}
                      onChange={(e) => setNewColor((prev) => ({ ...prev, hexCode: e.target.value }))}
                      className="w-12 h-10 border border-gray-200 rounded cursor-pointer"
                    />
                    <button type="button" onClick={handleAddColor} className="btn btn-secondary">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <label className="label">Sizes</label>
                  {formData.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                        >
                          {size.name}
                          {size.dimensions && (
                            <span className="text-gray-500 text-sm">({size.dimensions})</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSize.name}
                      onChange={(e) => setNewSize((prev) => ({ ...prev, name: e.target.value }))}
                      className="input flex-1"
                      placeholder="Size (e.g., 60x60 cm)"
                    />
                    <input
                      type="text"
                      value={newSize.dimensions}
                      onChange={(e) => setNewSize((prev) => ({ ...prev, dimensions: e.target.value }))}
                      className="input flex-1"
                      placeholder="Dimensions (optional)"
                    />
                    <button type="button" onClick={handleAddSize} className="btn btn-secondary">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Finishes */}
                <div>
                  <label className="label">Finishes</label>
                  <div className="flex flex-wrap gap-2">
                    {availableFinishes.map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => handleToggleFinish(finish)}
                        className={`px-4 py-2 border text-sm font-medium transition-all ${
                          formData.finishes.includes(finish)
                            ? "border-[var(--geowags-red)] text-[var(--geowags-red)] bg-red-50"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Status</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
                    />
                    <span className="text-gray-700">Active (visible on site)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
                    />
                    <span className="text-gray-700">Featured product</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
                    />
                    <span className="text-gray-700">Mark as new</span>
                  </label>
                </div>
              </div>

              {/* Category & Collection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Organization</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="categoryId" className="label">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="input"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="collectionId" className="label">
                      Collection
                    </label>
                    <select
                      id="collectionId"
                      name="collectionId"
                      value={formData.collectionId}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="">Select collection (optional)</option>
                      {collections.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

