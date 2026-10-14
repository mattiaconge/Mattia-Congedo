import type { Category, CategorySlug } from "@/lib/types";
import { unsplash } from "@/lib/format";

// Categorie del catalogo reale di jackieoshop.it.
// Le immagini sono FOTO DIMOSTRATIVE (Unsplash): da sostituire con quelle della boutique.
export const categories: Category[] = [
  {
    slug: "abiti-e-tute",
    name: "Abiti e tute",
    tagline: "Dal giorno alla sera, con leggerezza",
    label: "Must have",
    image: unsplash("1595777457583-95e059d581b8"),
  },
  {
    slug: "capi-spalla",
    name: "Capi spalla",
    tagline: "Piumini, cappotti e gilet di stagione",
    label: "Nuova stagione",
    image: unsplash("1539533018447-63fcce2678e3"),
  },
  {
    slug: "giacche-e-blazer",
    name: "Giacche e Blazer",
    tagline: "Il tailoring che cambia ogni look",
    label: "Iconici",
    image: unsplash("1591047139829-d91aecb6caea"),
  },
  {
    slug: "tailleur",
    name: "Tailleur",
    tagline: "Coordinati con carattere",
    label: "Power dressing",
    image: unsplash("1487222477894-8943e31ef7b2"),
  },
  {
    slug: "maglieria",
    name: "Maglieria",
    tagline: "Righe, trecce e texture morbide",
    label: "Soft touch",
    image: unsplash("1434389677669-e08b4cac3105"),
  },
  {
    slug: "jeans",
    name: "Jeans",
    tagline: "Il denim giusto per ogni silhouette",
    label: "Everyday",
    image: unsplash("1541099649105-f69ad21f3246"),
  },
  {
    slug: "gonne",
    name: "Gonne",
    tagline: "Mini, midi, portafoglio e scozzesi",
    label: "Femminile",
    image: unsplash("1583496661160-fb5886a0aaaa"),
  },
  {
    slug: "accessori",
    name: "Accessori",
    tagline: "Borse in raffia e dettagli che fanno la differenza",
    label: "Finishing touch",
    image: unsplash("1584917865442-de89df76afd3"),
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const isCategorySlug = (value: string): value is CategorySlug =>
  categories.some((c) => c.slug === value);
