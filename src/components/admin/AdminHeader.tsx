"use client";

import { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Grid3X3,
  FolderOpen,
  FileText,
  Building2,
  Settings,
  TrendingUp,
  Eye,
  LogOut,
  Loader2,
} from "lucide-react";
import { logoutAction } from "@/app/(admin)/admin/actions/authActions";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: TrendingUp },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Grid3X3 },
  { label: "Brands", href: "/admin/brands", icon: Building2 },
  { label: "Collections", href: "/admin/collections", icon: FolderOpen },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminHeader = () => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <>
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
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Site
            </Link>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <ul className="flex gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      active
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
    </>
  );
};
