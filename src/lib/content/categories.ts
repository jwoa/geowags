import { getAllMarkdownFiles, getMarkdownFile, writeMarkdownFile, deleteMarkdownFile } from "../markdown";
import type { Category, CategoryFrontmatter } from "./types";

const CATEGORIES_DIR = "categories";

/**
 * Convert markdown file to Category object
 */
function markdownToCategory(file: {
  data: CategoryFrontmatter;
  content: string;
  contentHtml: string;
  slug: string;
}): Category {
  return {
    slug: file.slug,
    name: file.data.name,
    description: file.data.description,
    icon: file.data.icon,
    image: file.data.image,
    order: file.data.order,
    subcategories: file.data.subcategories || [],
    content: file.content,
    contentHtml: file.contentHtml,
  };
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  const files = getAllMarkdownFiles<CategoryFrontmatter>(CATEGORIES_DIR);
  return files.map(markdownToCategory).sort((a, b) => a.order - b.order);
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  try {
    const file = getMarkdownFile<CategoryFrontmatter>(CATEGORIES_DIR, slug);
    return markdownToCategory(file);
  } catch {
    return null;
  }
}

/**
 * Create a new category
 */
export function createCategory(category: Omit<Category, "contentHtml">): void {
  const frontmatter: CategoryFrontmatter = {
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    image: category.image,
    order: category.order,
    subcategories: category.subcategories,
  };

  writeMarkdownFile(CATEGORIES_DIR, category.slug, frontmatter, category.content);
}

/**
 * Update an existing category
 */
export function updateCategory(slug: string, category: Omit<Category, "contentHtml">): void {
  // Delete old file if slug changed
  if (slug !== category.slug) {
    deleteMarkdownFile(CATEGORIES_DIR, slug);
  }

  createCategory(category);
}

/**
 * Delete a category
 */
export function deleteCategory(slug: string): void {
  deleteMarkdownFile(CATEGORIES_DIR, slug);
}

/**
 * Get all subcategories across all categories
 */
export function getAllSubcategories(): { name: string; slug: string; categorySlug: string }[] {
  const categories = getAllCategories();
  const subcategories: { name: string; slug: string; categorySlug: string }[] = [];

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      subcategories.push({
        name: subcategory.name,
        slug: subcategory.slug,
        categorySlug: category.slug,
      });
    }
  }

  return subcategories;
}
