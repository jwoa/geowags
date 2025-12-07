import { getAllMarkdownFiles, getMarkdownFile } from "../markdown";
import type { Collection, CollectionFrontmatter } from "./types";

const COLLECTIONS_DIR = "collections";

/**
 * Convert markdown file to Collection object
 */
function markdownToCollection(file: {
  data: CollectionFrontmatter;
  content: string;
  contentHtml: string;
  slug: string;
}): Collection {
  return {
    slug: file.slug,
    name: file.data.name,
    description: file.data.description,
    order: file.data.order,
    content: file.content,
    contentHtml: file.contentHtml,
  };
}

/**
 * Get all collections
 */
export function getAllCollections(): Collection[] {
  const files = getAllMarkdownFiles<CollectionFrontmatter>(COLLECTIONS_DIR);
  return files.map(markdownToCollection).sort((a, b) => a.order - b.order);
}

/**
 * Get a single collection by slug
 */
export function getCollectionBySlug(slug: string): Collection | null {
  try {
    const file = getMarkdownFile<CollectionFrontmatter>(COLLECTIONS_DIR, slug);
    return markdownToCollection(file);
  } catch (error) {
    return null;
  }
}
