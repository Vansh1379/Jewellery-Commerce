export type Product = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
};

// shared/types.ts

// Database model types matching Prisma schema
export interface User {
  id: number;
  email: string;
  password: string;
}

export interface HomePage {
  id: number;
  banner1?: string;
  banner2?: string;
}

export interface AboutPage {
  id: number;
  Banner: string;
  title: string;
  description1: string;
  description2?: string;
  description3?: string;
  whatWeDoTitle: string;
  whatWeDoDescription1: string;
  whatWeDoDescription2: string;
  img: string;
}

// Frontend component types (transformed from database types)
export interface ProductDisplay {
  id: string; // Converted to string for frontend use
  name: string;
  category?: string;
  imageUrl?: string;
}

export interface HomeBanner {
  banner1: string | null;
  banner2: string | null;
}

// Form data types for admin panel
export interface ProductFormData {
  name: string;
  catageory: string; // Matching schema field name
  image?: File;
}

export interface AboutPageFormData {
  title: string;
  description1: string;
  description2?: string;
  description3?: string;
  whatWeDoTitle: string;
  whatWeDoDescription1: string;
  whatWeDoDescription2: string;
  Banner?: File; // For image upload
  img?: File; // For additional image upload
}

export interface HomePageFormData {
  banner1?: File;
  banner2?: File;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductsResponse {
  products?: Product[];
  data?: Product[];
}

// Admin panel types
export type ActiveSection =
  | "dashboard"
  | "products"
  | "addProduct"
  | "homeBanners"
  | "aboutPage";

// Sidebar props interface
export interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

// Header props interface
export interface HeaderProps {
  activeSection: ActiveSection;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Dashboard statistics
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  recentProducts: ProductDisplay[];
}

// API input types for creating/updating
export interface CreateProductInput {
  name?: string;
  img: string;
  catageory?: string;
}

export interface UpdateProductInput {
  name?: string;
  img?: string;
  catageory?: string;
}

export interface CreateAboutPageInput {
  Banner: string;
  title: string;
  description1: string;
  description2?: string;
  description3?: string;
  whatWeDoTitle: string;
  whatWeDoDescription1: string;
  whatWeDoDescription2: string;
  img: string;
}

export interface UpdateAboutPageInput {
  Banner?: string;
  title?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  whatWeDoTitle?: string;
  whatWeDoDescription1?: string;
  whatWeDoDescription2?: string;
  img?: string;
}

export interface CreateHomePageInput {
  banner1?: string;
  banner2?: string;
}

export interface UpdateHomePageInput {
  banner1?: string;
  banner2?: string;
}
