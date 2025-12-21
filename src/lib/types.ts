// ===== BASE TYPES =====

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  specifications: string | null;
  categoryId: string;
  collectionId: string | null;
  isFeatured: boolean;
  isNew: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isFeatured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductImage = {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: Date;
};

export type ProductColor = {
  id: string;
  productId: string;
  name: string;
  hexCode: string | null;
  image: string | null;
};

export type ProductSize = {
  id: string;
  productId: string;
  name: string;
  dimensions: string | null;
};

export type ProductFinish = {
  id: string;
  productId: string;
  name: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Inspiration = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image: string;
  tags: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
