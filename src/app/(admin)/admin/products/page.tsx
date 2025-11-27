"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  Package,
  Grid3X3,
  FolderOpen,
  Mail,
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

const products = [
  {
    id: "1",
    name: "Carrara White Marble Tile",
    slug: "carrara-white-marble-tile",
    category: "Tiles",
    collection: "Luxury Marble",
    status: "active",
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Modern Rainfall Shower Set",
    slug: "modern-rainfall-shower-set",
    category: "Bathroom Fixtures",
    collection: "Modern Bath",
    status: "active",
    featured: true,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Hexagon Cement Tiles",
    slug: "hexagon-cement-tiles",
    category: "Tiles",
    collection: "Contemporary",
    status: "draft",
    featured: false,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Freestanding Bathtub Elite",
    slug: "freestanding-bathtub-elite",
    category: "Bathroom Fixtures",
    collection: "Luxury Bath",
    status: "active",
    featured: true,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Porcelain Wood Plank",
    slug: "porcelain-wood-plank",
    category: "Tiles",
    collection: "Wood Look",
    status: "active",
    featured: false,
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    name: "Vessel Sink Basin",
    slug: "vessel-sink-basin",
    category: "Bathroom Fixtures",
    collection: "Modern Bath",
    status: "active",
    featured: true,
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    name: "Mosaic Glass Tiles",
    slug: "mosaic-glass-tiles",
    category: "Tiles",
    collection: "Contemporary",
    status: "active",
    featured: false,
    createdAt: "2024-01-09",
  },
  {
    id: "8",
    name: "Wall-Mount Faucet Chrome",
    slug: "wall-mount-faucet-chrome",
    category: "Bathroom Fixtures",
    collection: "Classic",
    status: "inactive",
    featured: false,
    createdAt: "2024-01-08",
  },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
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
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Link
            href="/admin/products/new"
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select className="input w-auto">
                <option value="">All Categories</option>
                <option value="tiles">Tiles</option>
                <option value="bathroom-fixtures">Bathroom Fixtures</option>
                <option value="kitchen-dining">Kitchen & Dining</option>
                <option value="home-decor">Home Decor</option>
              </select>
              <select className="input w-auto">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selected
              </span>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Set Active
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                Set Draft
              </button>
              <button className="text-sm text-red-600 hover:text-red-700">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.collection}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {product.featured ? (
                        <span className="text-[var(--geowags-red)]">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{product.createdAt}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === product.id ? null : product.id)
                          }
                          className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openMenuId === product.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Link>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </button>
                            <hr className="my-1" />
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredProducts.length}</span> of{" "}
              <span className="font-medium">{products.length}</span> products
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 text-sm text-white bg-[var(--geowags-red)] rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

