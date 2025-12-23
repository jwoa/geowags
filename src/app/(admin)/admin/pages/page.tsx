import { getAllPages } from "@/lib/content/pages";
import { requireAuth } from "@/lib/auth";
import { PagesListClient } from "./PagesListClient";

export default async function AdminPagesPage() {
  await requireAuth();
  const pages = getAllPages();

  return <PagesListClient pages={pages} />;
}

