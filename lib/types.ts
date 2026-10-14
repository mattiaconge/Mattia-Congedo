export type CategorySlug =
  | "abiti"
  | "capispalla"
  | "maglieria"
  | "accessori"
  | "borse"
  | "scarpe";

export type ProductTag = "Nuovo" | "Bestseller" | "Ultimi pezzi" | "Esclusiva";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  /** [principale, hover] */
  images: [string, string];
  colors: ProductColor[];
  sizes: string[];
  tag?: ProductTag;
  isNew: boolean;
  description: string;
  details: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  label: string;
  image: string;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}
