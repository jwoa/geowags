"use server";

import { revalidatePath } from "next/cache";
import {
  createPage,
  updatePage,
  deletePage,
  getPageBySlug,
  getAllPages,
} from "@/lib/content/pages";
import type { Page } from "@/lib/content/types";

export type PageFormData = Omit<Page, "contentHtml">;

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createPageAction(data: PageFormData): Promise<ActionResult> {
  try {
    // Check if slug already exists
    const existing = getPageBySlug(data.slug);
    if (existing) {
      return { success: false, error: "A page with this slug already exists" };
    }

    createPage(data);
    revalidatePath("/admin/pages");
    revalidatePath(`/${data.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating page:", error);
    return { success: false, error: "Failed to create page" };
  }
}

export async function updatePageAction(
  originalSlug: string,
  data: PageFormData
): Promise<ActionResult> {
  try {
    // Check if new slug already exists (if slug changed)
    if (originalSlug !== data.slug) {
      const existing = getPageBySlug(data.slug);
      if (existing) {
        return { success: false, error: "A page with this slug already exists" };
      }
    }

    updatePage(originalSlug, data);
    revalidatePath("/admin/pages");
    revalidatePath(`/${data.slug}`);
    if (originalSlug !== data.slug) {
      revalidatePath(`/${originalSlug}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating page:", error);
    return { success: false, error: "Failed to update page" };
  }
}

export async function deletePageAction(slug: string): Promise<ActionResult> {
  try {
    deletePage(slug);
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (error) {
    console.error("Error deleting page:", error);
    return { success: false, error: "Failed to delete page" };
  }
}

export async function getPageAction(slug: string): Promise<Page | null> {
  return getPageBySlug(slug);
}

export async function getAllPagesAction(): Promise<Page[]> {
  return getAllPages();
}

