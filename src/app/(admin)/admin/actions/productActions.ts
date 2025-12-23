"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getAllProducts,
} from "@/lib/content/products";
import type { Product } from "@/lib/content/types";

export type ProductFormData = Omit<Product, "descriptionHtml">;

export type ActionResult = {
  success: boolean;
  error?: string;
};

export async function createProductAction(data: ProductFormData): Promise<ActionResult> {
  try {
    // Check if slug already exists
    const existing = getProductBySlug(data.slug);
    if (existing) {
      return { success: false, error: "A product with this slug already exists" };
    }

    createProduct(data);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProductAction(
  originalSlug: string,
  data: ProductFormData
): Promise<ActionResult> {
  try {
    // Check if new slug already exists (if slug changed)
    if (originalSlug !== data.slug) {
      const existing = getProductBySlug(data.slug);
      if (existing) {
        return { success: false, error: "A product with this slug already exists" };
      }
    }

    updateProduct(originalSlug, data);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    if (originalSlug !== data.slug) {
      revalidatePath(`/products/${originalSlug}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProductAction(slug: string): Promise<ActionResult> {
  try {
    deleteProduct(slug);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function getProductAction(slug: string): Promise<Product | null> {
  return getProductBySlug(slug);
}

export async function getAllProductsAction(): Promise<Product[]> {
  return getAllProducts();
}

