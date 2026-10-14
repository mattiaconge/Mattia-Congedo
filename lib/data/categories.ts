import type { Category, CategorySlug } from "@/lib/types";
import { unsplash } from "@/lib/format";

export const categories: Category[] = [
  {
    slug: "abiti",
    name: "Abiti",
    tagline: "Silhouette fluide per ogni occasione",
    label: "Must have",
    image: unsplash("1595777457583-95e059d581b8"),
  },
  {
    slug: "capispalla",
    name: "Capispalla",
    tagline: "Cappotti sartoriali e trench iconici",
    label: "Nuova stagione",
    image: unsplash("1539533018447-63fcce2678e3"),
  },
  {
    slug: "maglieria",
    name: "Maglieria",
    tagline: "Cashmere, merino e texture morbide",
    label: "Soft touch",
    image: unsplash("1434389677669-e08b4cac3105"),
  },
  {
    slug: "accessori",
    name: "Accessori",
    tagline: "Il dettaglio che fa la differenza",
    label: "Finishing touch",
    image: unsplash("1535632066927-ab7c9ab60908"),
  },
  {
    slug: "borse",
    name: "Borse",
    tagline: "Pelli pregiate, linee essenziali",
    label: "It-bag",
    image: unsplash("1584917865442-de89df76afd3"),
  },
  {
    slug: "scarpe",
    name: "Scarpe",
    tagline: "Dal mocassino al tacco scultura",
    label: "Step in",
    image: unsplash("1543163521-1bf539c55dd2"),
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const isCategorySlug = (value: string): value is CategorySlug =>
  categories.some((c) => c.slug === value);
