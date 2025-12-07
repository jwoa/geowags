import { getAllMarkdownFiles, getMarkdownFile } from "../markdown";
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
  } catch (error) {
    return null;
  }
}
