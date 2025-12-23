import { getAllMarkdownFiles, getMarkdownFile, writeMarkdownFile, deleteMarkdownFile } from "../markdown";
import type { Page, PageFrontmatter } from "./types";

const PAGES_DIR = "pages";

/**
 * Convert markdown file to Page object
 */
function markdownToPage(file: {
  data: PageFrontmatter;
  content: string;
  contentHtml: string;
  slug: string;
}): Page {
  return {
    slug: file.slug,
    title: file.data.title,
    description: file.data.description,
    lastUpdated: file.data.lastUpdated,
    content: file.content,
    contentHtml: file.contentHtml,
  };
}

/**
 * Get all pages
 */
export function getAllPages(): Page[] {
  const files = getAllMarkdownFiles<PageFrontmatter>(PAGES_DIR);
  return files.map(markdownToPage).sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get a single page by slug
 */
export function getPageBySlug(slug: string): Page | null {
  try {
    const file = getMarkdownFile<PageFrontmatter>(PAGES_DIR, slug);
    return markdownToPage(file);
  } catch {
    return null;
  }
}

/**
 * Create a new page
 */
export function createPage(page: Omit<Page, "contentHtml">): void {
  const frontmatter: PageFrontmatter = {
    title: page.title,
    description: page.description,
    lastUpdated: page.lastUpdated || new Date().toISOString().split("T")[0],
  };

  writeMarkdownFile(PAGES_DIR, page.slug, frontmatter, page.content);
}

/**
 * Update an existing page
 */
export function updatePage(slug: string, page: Omit<Page, "contentHtml">): void {
  // Delete old file if slug changed
  if (slug !== page.slug) {
    deleteMarkdownFile(PAGES_DIR, slug);
  }

  createPage(page);
}

/**
 * Delete a page
 */
export function deletePage(slug: string): void {
  deleteMarkdownFile(PAGES_DIR, slug);
}
