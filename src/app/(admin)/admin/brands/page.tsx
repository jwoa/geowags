import { getAllBrands } from "@/lib/content/brands";
import { requireAuth } from "@/lib/auth";
import { BrandsListClient } from "./BrandsListClient";

export default async function AdminBrandsPage() {
  await requireAuth();
  const brands = getAllBrands();

  return <BrandsListClient brands={brands} />;
}

