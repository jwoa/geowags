"use client";

import Link from "next/link";
import {
  Package,
  Grid3X3,
  FolderOpen,
  Mail,
  Image,
  Settings,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Total Products",
    value: "128",
    change: "+12%",
    trend: "up",
    icon: Package,
  },
  {
    label: "Categories",
    value: "4",
    change: "0%",
    trend: "neutral",
    icon: Grid3X3,
  },
  {
    label: "Collections",
    value: "8",
    change: "+2",
    trend: "up",
    icon: FolderOpen,
  },
  {
    label: "Inquiries",
    value: "23",
    change: "+8",
    trend: "up",
    icon: Mail,
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
    label: "View Inquiries",
    description: "Check contact submissions",
    href: "/admin/inquiries",
    icon: Mail,
    color: "bg-[var(--geowags-teal)]",
  },
  {
    label: "Site Settings",
    description: "Configure website settings",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gray-600",
  },
];

const recentProducts = [
  { id: "1", name: "Carrara White Marble Tile", category: "Tiles", status: "active" },
  { id: "2", name: "Modern Rainfall Shower Set", category: "Bathroom Fixtures", status: "active" },
  { id: "3", name: "Hexagon Cement Tiles", category: "Tiles", status: "draft" },
  { id: "4", name: "Freestanding Bathtub Elite", category: "Bathroom Fixtures", status: "active" },
  { id: "5", name: "Porcelain Wood Plank", category: "Tiles", status: "active" },
];

const recentInquiries = [
  { id: "1", name: "John Mensah", subject: "Product Inquiry", time: "2 hours ago", status: "new" },
  { id: "2", name: "Ama Darko", subject: "Quote Request", time: "5 hours ago", status: "new" },
  { id: "3", name: "Kwame Asante", subject: "General Inquiry", time: "1 day ago", status: "read" },
];

export default function AdminDashboard() {
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
              { label: "Products", href: "/admin/products", icon: Package },
              { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
              { label: "Collections", href: "/admin/collections", icon: FolderOpen },
              { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
              { label: "Media", href: "/admin/media", icon: Image },
              { label: "Settings", href: "/admin/settings", icon: Settings },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-[var(--geowags-red)] transition-colors"
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                    {stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
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
                  key={product.id}
                  href={`/admin/products/${product.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded" />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
              <Link
                href="/admin/inquiries"
                className="text-sm text-[var(--geowags-red)] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/inquiries/${inquiry.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {inquiry.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">{inquiry.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mb-1 ${
                        inquiry.status === "new" ? "bg-[var(--geowags-red)]" : "bg-gray-300"
                      }`}
                    />
                    <p className="text-xs text-gray-500">{inquiry.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

