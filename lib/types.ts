export type CategorySlug =
  | "abiti-e-tute"
  | "capi-spalla"
  | "giacche-e-blazer"
  | "tailleur"
  | "maglieria"
  | "jeans"
  | "gonne"
  | "accessori";

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
  /** Marchio, solo quando è noto dal nome del prodotto */
  brand?: string;
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
