import { getAllMarkdownFiles, getMarkdownFile } from "../markdown";
import type { Brand, BrandFrontmatter } from "./types";

const BRANDS_DIR = "brands";

/**
 * Convert markdown file to Brand object
 */
function markdownToBrand(file: {
  data: BrandFrontmatter;
  content: string;
  contentHtml: string;
  slug: string;
}): Brand {
  return {
    slug: file.slug,
    name: file.data.name,
    description: file.data.description,
    country: file.data.country,
    logo: file.data.logo,
    website: file.data.website,
    order: file.data.order,
    content: file.content,
    contentHtml: file.contentHtml,
  };
}

/**
 * Get all brands
 */
export function getAllBrands(): Brand[] {
  const files = getAllMarkdownFiles<BrandFrontmatter>(BRANDS_DIR);
  return files.map(markdownToBrand).sort((a, b) => a.order - b.order);
}

/**
 * Get a single brand by slug
 */
export function getBrandBySlug(slug: string): Brand | null {
  try {
    const file = getMarkdownFile<BrandFrontmatter>(BRANDS_DIR, slug);
    return markdownToBrand(file);
  } catch (error) {
    return null;
  }
}

