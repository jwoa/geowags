import type {
  Product,
  Category,
  Collection,
  ProductImage,
  ProductColor,
  ProductSize,
  ProductFinish,
  ContactSubmission,
  Inspiration,
} from "@prisma/client";

// ===== PRODUCT TYPES =====

export type ProductWithRelations = Product & {
  category: Category;
  collection: Collection | null;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  finishes: ProductFinish[];
};

export type ProductCardData = Pick<
  Product,
  "id" | "name" | "slug" | "isFeatured" | "isNew"
> & {
  category: Pick<Category, "name" | "slug">;
  images: Pick<ProductImage, "url" | "alt" | "isPrimary">[];
};

// ===== FILTER TYPES =====

export type ProductFilters = {
  category?: string;
  collection?: string;
  colors?: string[];
  sizes?: string[];
  finishes?: string[];
  search?: string;
};

export type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

// ===== FORM TYPES =====

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
};

// ===== NAVIGATION TYPES =====

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

// ===== API RESPONSE TYPES =====

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ===== RE-EXPORTS =====

export type {
  Product,
  Category,
  Collection,
  ProductImage,
  ProductColor,
  ProductSize,
  ProductFinish,
  ContactSubmission,
  Inspiration,
};

