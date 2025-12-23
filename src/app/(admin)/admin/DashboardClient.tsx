"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Grid3X3,
  FolderOpen,
  Building2,
  FileText,
  Plus,
  Eye,
  Star,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin";
import type { Product, Category } from "@/lib/content/types";

type Stats = {
  totalProducts: number;
  activeProducts: number;
  featuredProducts: number;
  newProducts: number;
  categories: number;
  brands: number;
  collections: number;
  pages: number;
};

type Props = {
  stats: Stats;
  recentProducts: Product[];
  categories: Category[];
};

const statCards = [
  {
    key: "totalProducts",
    label: "Total Products",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "activeProducts",
    label: "Active Products",
    icon: Eye,
    color: "bg-green-100 text-green-600",
  },
  {
    key: "featuredProducts",
    label: "Featured",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    key: "newProducts",
    label: "New Products",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
  },
];

const quickActions = [
  {
    label: "Add Product",
    description: "Create a new product listing",
    href: "/admin/products/new",
    icon: Plus,
    color: "bg-[var(--geowags-red)]",
  },
  {
    label: "Manage Products",
    description: "View and edit all products",
    href: "/admin/products",
    icon: Package,
    color: "bg-gray-800",
  },
  {
    label: "Categories",
    description: "Manage product categories",
    href: "/admin/categories",
    icon: Grid3X3,
    color: "bg-gray-600",
  },
  {
    label: "Brands",
    description: "Manage product brands",
    href: "/admin/brands",
    icon: Building2,
    color: "bg-gray-600",
  },
];

export const DashboardClient = ({ stats, recentProducts, categories }: Props) => {
  const getPrimaryImage = (product: Product) => {
    const primary = product.images.find((img) => img.primary);
    return primary?.url || product.images[0]?.url;
  };

  const getCategoryName = (slug: string) => {
    return categories.find((c) => c.slug === slug)?.name || slug;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      {/* Main Content */}
      <main className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h1>
          <p className="text-gray-600">Here&apos;s an overview of your content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const IconComponent = stat.icon;
            const value = stats[stat.key as keyof Stats];
            return (
              <div key={stat.key} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.categories}</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.brands}</p>
              <p className="text-xs text-gray-500">Brands</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.collections}</p>
              <p className="text-xs text-gray-500">Collections</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.pages}</p>
              <p className="text-xs text-gray-500">Pages</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Products</h2>
              <Link
                href="/admin/products"
                className="text-sm text-[var(--geowags-red)] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/admin/products/${product.slug}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      {getPrimaryImage(product) ? (
                        <Image
                          src={getPrimaryImage(product)!}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{getCategoryName(product.category)}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </Link>
              ))}
              {recentProducts.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No products yet
                </div>
              )}
            </div>
          </div>

          {/* Categories Overview */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Categories</h2>
              <Link
                href="/admin/categories"
                className="text-sm text-[var(--geowags-red)] hover:underline"
              >
                Manage
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/admin/categories`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Grid3X3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">
                        {category.subcategories?.length || 0} subcategories
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {categories.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No categories yet
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

