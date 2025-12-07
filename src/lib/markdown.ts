import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export type MarkdownFile<T = Record<string, any>> = {
  data: T;
  content: string;
  contentHtml: string;
  slug: string;
};

/**
 * Get all markdown files from a directory
 */
export function getAllMarkdownFiles<T = Record<string, any>>(
  directory: string
): MarkdownFile<T>[] {
  const fullPath = path.join(contentDirectory, directory);

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"));

  return markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getMarkdownFile<T>(directory, slug);
  });
}

/**
 * Get a single markdown file by slug
 */
export function getMarkdownFile<T = Record<string, any>>(
  directory: string,
  slug: string
): MarkdownFile<T> {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  return {
    data: data as T,
    content,
    contentHtml,
    slug,
  };
}

/**
 * Check if a markdown file exists
 */
export function markdownFileExists(directory: string, slug: string): boolean {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);
  return fs.existsSync(fullPath);
}

/**
 * Write a markdown file
 */
export function writeMarkdownFile<T = Record<string, any>>(
  directory: string,
  slug: string,
  data: T,
  content: string
): void {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);
  const directoryPath = path.join(contentDirectory, directory);

  // Ensure directory exists
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Create file with frontmatter
  const fileContent = matter.stringify(content, data as object);
  fs.writeFileSync(fullPath, fileContent, "utf8");
}

/**
 * Delete a markdown file
 */
export function deleteMarkdownFile(directory: string, slug: string): void {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
