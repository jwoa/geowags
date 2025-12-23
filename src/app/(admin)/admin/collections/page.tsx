import { getAllCollections } from "@/lib/content/collections";
import { requireAuth } from "@/lib/auth";
import { CollectionsListClient } from "./CollectionsListClient";

export default async function AdminCollectionsPage() {
  await requireAuth();
  const collections = getAllCollections();

  return <CollectionsListClient collections={collections} />;
}

