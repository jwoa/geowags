// Product frontmatter structure
export type ProductFrontmatter = {
  name: string;
  slug: string;
  category: string;
  collection?: string;
  featured: boolean;
  new: boolean;
  active: boolean;
  images: {
    url: string;
    alt: string;
    primary: boolean;
  }[];
  specifications?: Record<string, string>;
  colors?: {
    name: string;
    hex: string;
  }[];
  sizes?: {
    name: string;
    dimensions?: string;
  }[];
  finishes?: string[];
};

// Category frontmatter structure
export type CategoryFrontmatter = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  order: number;
};

// Collection frontmatter structure
export type CollectionFrontmatter = {
  name: string;
  slug: string;
  description: string;
  order: number;
};

// Page frontmatter structure
export type PageFrontmatter = {
  title: string;
  description?: string;
  lastUpdated?: string;
};

// Full product with content
export type Product = {
  slug: string;
  name: string;
  category: string;
  collection?: string;
  featured: boolean;
  new: boolean;
  active: boolean;
  images: {
    url: string;
    alt: string;
    primary: boolean;
  }[];
  specifications: Record<string, string>;
  colors: {
    name: string;
    hex: string;
  }[];
  sizes: {
    name: string;
    dimensions?: string;
  }[];
  finishes: string[];
  description: string;
  descriptionHtml: string;
};

// Category with content
export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  order: number;
  content: string;
  contentHtml: string;
};

// Collection with content
export type Collection = {
  slug: string;
  name: string;
  description: string;
  order: number;
  content: string;
  contentHtml: string;
};

// Page with content
export type Page = {
  slug: string;
  title: string;
  description?: string;
  lastUpdated?: string;
  content: string;
  contentHtml: string;
};
