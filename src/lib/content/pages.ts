import { getMarkdownFile } from "../markdown";
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
 * Get a single page by slug
 */
export function getPageBySlug(slug: string): Page | null {
  try {
    const file = getMarkdownFile<PageFrontmatter>(PAGES_DIR, slug);
    return markdownToPage(file);
  } catch (error) {
    return null;
  }
}
