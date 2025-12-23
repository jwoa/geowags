"use server";

import { revalidatePath } from "next/cache";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
  getAllCategories,
} from "@/lib/content/categories";
import type { Category } from "@/lib/content/types";

export type CategoryFormData = Omit<Category, "contentHtml">;

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createCategoryAction(data: CategoryFormData): Promise<ActionResult> {
  try {
    // Check if slug already exists
    const existing = getCategoryBySlug(data.slug);
    if (existing) {
      return { success: false, error: "A category with this slug already exists" };
    }

    createCategory(data);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategoryAction(
  originalSlug: string,
  data: CategoryFormData
): Promise<ActionResult> {
  try {
    // Check if new slug already exists (if slug changed)
    if (originalSlug !== data.slug) {
      const existing = getCategoryBySlug(data.slug);
      if (existing) {
        return { success: false, error: "A category with this slug already exists" };
      }
    }

    updateCategory(originalSlug, data);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategoryAction(slug: string): Promise<ActionResult> {
  try {
    deleteCategory(slug);
    revalidatePath("/admin/categories");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

export async function getCategoryAction(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug);
}

export async function getAllCategoriesAction(): Promise<Category[]> {
  return getAllCategories();
}

