"use server";

import { revalidatePath } from "next/cache";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionBySlug,
  getAllCollections,
} from "@/lib/content/collections";
import type { Collection } from "@/lib/content/types";

export type CollectionFormData = Omit<Collection, "contentHtml">;

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createCollectionAction(data: CollectionFormData): Promise<ActionResult> {
  try {
    // Check if slug already exists
    const existing = getCollectionBySlug(data.slug);
    if (existing) {
      return { success: false, error: "A collection with this slug already exists" };
    }

    createCollection(data);
    revalidatePath("/admin/collections");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating collection:", error);
    return { success: false, error: "Failed to create collection" };
  }
}

export async function updateCollectionAction(
  originalSlug: string,
  data: CollectionFormData
): Promise<ActionResult> {
  try {
    // Check if new slug already exists (if slug changed)
    if (originalSlug !== data.slug) {
      const existing = getCollectionBySlug(data.slug);
      if (existing) {
        return { success: false, error: "A collection with this slug already exists" };
      }
    }

    updateCollection(originalSlug, data);
    revalidatePath("/admin/collections");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating collection:", error);
    return { success: false, error: "Failed to update collection" };
  }
}

export async function deleteCollectionAction(slug: string): Promise<ActionResult> {
  try {
    deleteCollection(slug);
    revalidatePath("/admin/collections");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting collection:", error);
    return { success: false, error: "Failed to delete collection" };
  }
}

export async function getCollectionAction(slug: string): Promise<Collection | null> {
  return getCollectionBySlug(slug);
}

export async function getAllCollectionsAction(): Promise<Collection[]> {
  return getAllCollections();
}

