import type { CategorySlug, Product } from "@/lib/types";
import { unsplash } from "@/lib/format";

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41"];
const ONE_SIZE = ["TU"];

export const products: Product[] = [
  {
    id: "p01",
    slug: "abito-midi-in-raso-sabbia",
    name: "Abito midi in raso",
    category: "abiti",
    price: 189,
    images: [unsplash("1595777457583-95e059d581b8", 900), unsplash("1572804013309-59a88b7e92f1", 900)],
    colors: [
      { name: "Sabbia", hex: "#D8C7B0" },
      { name: "Nero", hex: "#111111" },
    ],
    sizes: CLOTHING_SIZES,
    tag: "Nuovo",
    isNew: true,
    description:
      "Abito midi dalla linea morbida in raso fluido, scollo a V e spalline sottili regolabili. Una silhouette che scivola sul corpo, pensata per passare dal giorno alla sera.",
    details: ["100% viscosa effetto raso", "Lunghezza midi", "Spalline regolabili", "Lavaggio a secco"],
  },
  {
    id: "p02",
    slug: "cappotto-sartoriale-in-lana-cammello",
    name: "Cappotto sartoriale in lana",
    category: "capispalla",
    price: 349,
    images: [unsplash("1539533018447-63fcce2678e3", 900), unsplash("1544022613-e87ca75a784a", 900)],
    colors: [
      { name: "Cammello", hex: "#B08D67" },
      { name: "Antracite", hex: "#3A3A3A" },
    ],
    sizes: CLOTHING_SIZES,
    tag: "Bestseller",
    isNew: true,
    description:
      "Cappotto doppiopetto dal taglio maschile, spalle strutturate e lunghezza sotto il ginocchio. Un investimento senza tempo per l'armadio di stagione.",
    details: ["80% lana vergine, 20% poliammide", "Fodera interna in cupro", "Bottoni in corno", "Made in Italy"],
  },
  {
    id: "p03",
    slug: "maglione-girocollo-in-cashmere",
    name: "Maglione girocollo in cashmere",
    category: "maglieria",
    price: 229,
    images: [unsplash("1434389677669-e08b4cac3105", 900), unsplash("1576566588028-4147f3842f27", 900)],
    colors: [
      { name: "Avorio", hex: "#EFE8DC" },
      { name: "Tortora", hex: "#A39383" },
      { name: "Nero", hex: "#111111" },
    ],
    sizes: CLOTHING_SIZES,
    tag: "Nuovo",
    isNew: true,
    description:
      "Girocollo in puro cashmere dalla vestibilità rilassata, con bordi a costine. Morbidezza assoluta e leggerezza in un capo essenziale.",
    details: ["100% cashmere", "Vestibilità oversize", "Lavaggio a mano a freddo"],
  },
  {
    id: "p04",
    slug: "borsa-a-spalla-in-pelle-liscia",
    name: "Borsa a spalla in pelle liscia",
    category: "borse",
    price: 279,
    images: [unsplash("1584917865442-de89df76afd3", 900), unsplash("1548036328-c9fa89d128fa", 900)],
    colors: [
      { name: "Nero", hex: "#111111" },
      { name: "Cuoio", hex: "#8B5A2B" },
    ],
    sizes: ONE_SIZE,
    tag: "Esclusiva",
    isNew: true,
    description:
      "Borsa a spalla dalla forma morbida in pelle liscia, chiusura magnetica e tracolla regolabile. Capiente quanto basta, elegante sempre.",
    details: ["100% pelle bovina", "Fodera in suede", "Tasca interna con zip", "30 × 22 × 10 cm"],
  },
  {
    id: "p05",
    slug: "decollete-a-punta-in-vernice",
    name: "Décolleté a punta in vernice",
    category: "scarpe",
    price: 159,
    images: [unsplash("1543163521-1bf539c55dd2", 900), unsplash("1515347619252-60a4bf4fff4f", 900)],
    colors: [
      { name: "Nero", hex: "#111111" },
      { name: "Nude", hex: "#D9B99B" },
    ],
    sizes: SHOE_SIZES,
    isNew: true,
    description:
      "Décolleté dalla punta affilata in pelle verniciata con tacco a stiletto da 9 cm. Il classico che slancia ogni look.",
    details: ["Tomaia in pelle verniciata", "Suola in cuoio", "Tacco 9 cm", "Made in Italy"],
  },
  {
    id: "p06",
    slug: "orecchini-pendenti-dorati",
    name: "Orecchini pendenti dorati",
    category: "accessori",
    price: 69,
    images: [unsplash("1535632066927-ab7c9ab60908", 900), unsplash("1611591437281-460bfbe1220a", 900)],
    colors: [{ name: "Oro", hex: "#B8975A" }],
    sizes: ONE_SIZE,
    tag: "Bestseller",
    isNew: true,
    description:
      "Orecchini pendenti dalla forma organica in ottone placcato oro. Leggeri, luminosi, perfetti per illuminare il viso.",
    details: ["Ottone placcato oro 18k", "Chiusura a perno", "Anallergici"],
  },
  {
    id: "p07",
    slug: "trench-classico-in-gabardine",
    name: "Trench classico in gabardine",
    category: "capispalla",
    price: 259,
    images: [unsplash("1591047139829-d91aecb6caea", 900), unsplash("1487222477894-8943e31ef7b2", 900)],
    colors: [{ name: "Beige", hex: "#CDB892" }],
    sizes: CLOTHING_SIZES,
    isNew: true,
    description:
      "L'iconico trench doppiopetto in gabardine di cotone, con cintura in vita e spalline. Un capo che attraversa le stagioni.",
    details: ["100% cotone gabardine", "Trattamento idrorepellente", "Cintura removibile"],
  },
  {
    id: "p08",
    slug: "abito-lungo-plisse-nero",
    name: "Abito lungo plissé",
    category: "abiti",
    price: 219,
    compareAtPrice: 279,
    images: [unsplash("1566174053879-31528523f8ae", 900), unsplash("1594633312681-425c7b97ccd1", 900)],
    colors: [{ name: "Nero", hex: "#111111" }],
    sizes: CLOTHING_SIZES,
    tag: "Ultimi pezzi",
    isNew: false,
    description:
      "Abito lungo con gonna plissé in movimento e corpino aderente. Un'eleganza scultorea per le occasioni speciali.",
    details: ["100% poliestere riciclato", "Zip invisibile sul retro", "Lunghezza alla caviglia"],
  },
  {
    id: "p09",
    slug: "cardigan-in-maglia-a-coste",
    name: "Cardigan in maglia a coste",
    category: "maglieria",
    price: 139,
    images: [unsplash("1620799140408-edc6dcb6d633", 900), unsplash("1434389677669-e08b4cac3105", 900)],
    colors: [
      { name: "Panna", hex: "#F3EDE2" },
      { name: "Grigio melange", hex: "#9A9A9A" },
    ],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description:
      "Cardigan corto in maglia a coste con bottoni gioiello. Da indossare da solo o come terza pelle sopra un abito.",
    details: ["70% lana merino, 30% cashmere", "Bottoni effetto perla", "Lavaggio a mano"],
  },
  {
    id: "p10",
    slug: "giacca-biker-in-pelle",
    name: "Giacca biker in pelle",
    category: "capispalla",
    price: 389,
    images: [unsplash("1551028719-00167b16eac5", 900), unsplash("1520975954732-35dd22299614", 900)],
    colors: [{ name: "Nero", hex: "#111111" }],
    sizes: CLOTHING_SIZES,
    tag: "Bestseller",
    isNew: true,
    description:
      "Giacca biker in morbida pelle d'agnello con zip asimmetrica e finiture metalliche brunite. Carattere rock con un'anima sartoriale.",
    details: ["100% pelle d'agnello", "Fodera in viscosa", "Zip metalliche"],
  },
  {
    id: "p11",
    slug: "mini-bag-con-manico-scultura",
    name: "Mini bag con manico scultura",
    category: "borse",
    price: 199,
    images: [unsplash("1590874103328-eac38a683ce7", 900), unsplash("1584917865442-de89df76afd3", 900)],
    colors: [
      { name: "Avorio", hex: "#EFE8DC" },
      { name: "Nero", hex: "#111111" },
    ],
    sizes: ONE_SIZE,
    isNew: false,
    description:
      "Mini bag strutturata con manico scultura dorato e tracolla removibile. Il punto luce di ogni outfit serale.",
    details: ["Pelle con grana saffiano", "Manico in metallo dorato", "20 × 14 × 7 cm"],
  },
  {
    id: "p12",
    slug: "sneaker-minimal-in-pelle-bianca",
    name: "Sneaker minimal in pelle",
    category: "scarpe",
    price: 179,
    images: [unsplash("1549298916-b41d501d3772", 900), unsplash("1515347619252-60a4bf4fff4f", 900)],
    colors: [{ name: "Bianco", hex: "#FFFFFF" }],
    sizes: SHOE_SIZES,
    isNew: false,
    description:
      "Sneaker dalla linea pulita in pelle liscia con suola in gomma a cassetta. Il comfort quotidiano diventa elegante.",
    details: ["Tomaia in pelle", "Soletta in memory foam", "Suola in gomma cucita"],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getNewArrivals = () => products.filter((p) => p.isNew);

export const getProductsByCategory = (category: CategorySlug) =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
        Number(a.category === product.category),
    )
    .slice(0, limit);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)),
  );
};
