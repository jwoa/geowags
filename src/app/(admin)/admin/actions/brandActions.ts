"use server";

import { revalidatePath } from "next/cache";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandBySlug,
  getAllBrands,
} from "@/lib/content/brands";
import type { Brand } from "@/lib/content/types";

export type BrandFormData = Omit<Brand, "contentHtml">;

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createBrandAction(data: BrandFormData): Promise<ActionResult> {
  try {
    // Check if slug already exists
    const existing = getBrandBySlug(data.slug);
    if (existing) {
      return { success: false, error: "A brand with this slug already exists" };
    }

    createBrand(data);
    revalidatePath("/admin/brands");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { success: false, error: "Failed to create brand" };
  }
}

export async function updateBrandAction(
  originalSlug: string,
  data: BrandFormData
): Promise<ActionResult> {
  try {
    // Check if new slug already exists (if slug changed)
    if (originalSlug !== data.slug) {
      const existing = getBrandBySlug(data.slug);
      if (existing) {
        return { success: false, error: "A brand with this slug already exists" };
      }
    }

    updateBrand(originalSlug, data);
    revalidatePath("/admin/brands");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating brand:", error);
    return { success: false, error: "Failed to update brand" };
  }
}

export async function deleteBrandAction(slug: string): Promise<ActionResult> {
  try {
    deleteBrand(slug);
    revalidatePath("/admin/brands");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting brand:", error);
    return { success: false, error: "Failed to delete brand" };
  }
}

export async function getBrandAction(slug: string): Promise<Brand | null> {
  return getBrandBySlug(slug);
}

export async function getAllBrandsAction(): Promise<Brand[]> {
  return getAllBrands();
}

