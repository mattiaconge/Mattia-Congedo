import type { CategorySlug, Product } from "@/lib/types";
import { unsplash } from "@/lib/format";

/**
 * Catalogo basato su articoli e prezzi reali di jackieoshop.it (rilevati da pagine indicizzate,
 * da ricontrollare: prezzi e disponibilità possono essere cambiati).
 * Le IMMAGINI sono foto dimostrative Unsplash: da sostituire con le foto dei capi reali.
 * Taglie e descrizioni sono indicative.
 */

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"];
const JEANS_SIZES = ["25", "26", "27", "28", "29", "30", "31"];
const ONE_SIZE = ["TU"];

const img = (a: string, b: string): [string, string] => [unsplash(a, 900), unsplash(b, 900)];

const askInStore = "Taglie e disponibilità aggiornate: chiedi in boutique o su WhatsApp";

export const products: Product[] = [
  {
    id: "p01",
    slug: "tailleur-vicolo-rosso",
    name: "Tailleur Vicolo Rosso",
    brand: "Vicolo",
    category: "tailleur",
    price: 181.5,
    images: img("1487222477894-8943e31ef7b2", "1539109136881-3be0616acf4b"),
    colors: [{ name: "Rosso", hex: "#A3222B" }],
    sizes: CLOTHING_SIZES,
    tag: "Nuovo",
    isNew: true,
    description:
      "Il coordinato che non passa inosservato: un rosso deciso per un look da ufficio, da cerimonia o da sera, da indossare completo o da spezzare con denim e maglieria.",
    details: ["Marchio: Vicolo", "Giacca e pantalone coordinati", askInStore],
  },
  {
    id: "p02",
    slug: "giacca-kaos",
    name: "Giacca Kaos",
    brand: "Kaos",
    category: "giacche-e-blazer",
    price: 149,
    images: img("1591047139829-d91aecb6caea", "1520975954732-35dd22299614"),
    colors: [{ name: "Come in foto", hex: "#C9B79C" }],
    sizes: CLOTHING_SIZES,
    tag: "Bestseller",
    isNew: true,
    description:
      "Una giacca dalla linea contemporanea firmata Kaos: il capo jolly da mettere sopra un abito, un jeans o un tailleur pantalone.",
    details: ["Marchio: Kaos", askInStore],
  },
  {
    id: "p03",
    slug: "piumino-smanicato",
    name: "Piumino Smanicato",
    category: "capi-spalla",
    price: 142,
    images: img("1544022613-e87ca75a784a", "1539533018447-63fcce2678e3"),
    colors: [{ name: "Come in foto", hex: "#2B2B2B" }],
    sizes: CLOTHING_SIZES,
    tag: "Nuovo",
    isNew: true,
    description:
      "Lo smanicato imbottito che aggiunge calore senza peso: perfetto sopra la maglieria o sotto il cappotto nelle giornate più fredde.",
    details: ["Senza maniche", askInStore],
  },
  {
    id: "p04",
    slug: "abito-vicolo",
    name: "Abito Vicolo",
    brand: "Vicolo",
    category: "abiti-e-tute",
    price: 99,
    images: img("1595777457583-95e059d581b8", "1572804013309-59a88b7e92f1"),
    colors: [{ name: "Come in foto", hex: "#D8C7B0" }],
    sizes: CLOTHING_SIZES,
    tag: "Nuovo",
    isNew: true,
    description:
      "Un abito Vicolo dalla silhouette femminile, facile da portare dal giorno alla sera cambiando solo scarpe e accessori.",
    details: ["Marchio: Vicolo", askInStore],
  },
  {
    id: "p05",
    slug: "maglione-righe",
    name: "Maglione Righe",
    category: "maglieria",
    price: 86,
    images: img("1576566588028-4147f3842f27", "1434389677669-e08b4cac3105"),
    colors: [{ name: "Righe", hex: "#E8E1D5" }],
    sizes: CLOTHING_SIZES,
    isNew: true,
    description: "Le righe sono un classico che non sbaglia mai: un maglione da abbinare a jeans, gonne e blazer.",
    details: ["Fantasia a righe", askInStore],
  },
  {
    id: "p06",
    slug: "pull-rigato",
    name: "Pull Rigato",
    category: "maglieria",
    price: 87.5,
    images: img("1620799140408-edc6dcb6d633", "1576566588028-4147f3842f27"),
    colors: [{ name: "Righe", hex: "#C9C3B8" }],
    sizes: CLOTHING_SIZES,
    isNew: true,
    description: "Un pull rigato dal mood rilassato, da portare morbido sopra il denim o dentro una gonna a vita alta.",
    details: ["Fantasia a righe", askInStore],
  },
  {
    id: "p07",
    slug: "borsa-raffia-con-catena",
    name: "Borsa Raffia con Catena",
    category: "accessori",
    price: 85,
    images: img("1590874103328-eac38a683ce7", "1584917865442-de89df76afd3"),
    colors: [{ name: "Naturale", hex: "#D6C29A" }],
    sizes: ONE_SIZE,
    tag: "Esclusiva",
    isNew: true,
    description: "La texture naturale della raffia incontra il dettaglio gioiello della catena: la borsa che illumina i look più semplici.",
    details: ["Raffia", "Tracolla a catena", askInStore],
  },
  {
    id: "p08",
    slug: "jeans-vicolo",
    name: "Jeans Vicolo",
    brand: "Vicolo",
    category: "jeans",
    price: 91.5,
    images: img("1541099649105-f69ad21f3246", "1582418702059-97ebafb35d09"),
    colors: [{ name: "Denim", hex: "#5B7391" }],
    sizes: JEANS_SIZES,
    isNew: true,
    description: "Il jeans Vicolo da avere nell'armadio: una base perfetta da vestire con blazer, maglieria o top.",
    details: ["Marchio: Vicolo", askInStore],
  },
  {
    id: "p09",
    slug: "maglione-lavorato",
    name: "Maglione Lavorato",
    category: "maglieria",
    price: 79.5,
    images: img("1434389677669-e08b4cac3105", "1620799140408-edc6dcb6d633"),
    colors: [{ name: "Come in foto", hex: "#EFE8DC" }],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description: "Lavorazioni in rilievo e una vestibilità avvolgente: il maglione che fa subito inverno.",
    details: ["Maglia lavorata", askInStore],
  },
  {
    id: "p10",
    slug: "minigonna-portafoglio",
    name: "Minigonna Portafoglio",
    category: "gonne",
    price: 69.5,
    images: img("1583496661160-fb5886a0aaaa", "1496747611176-843222e1e57c"),
    colors: [{ name: "Come in foto", hex: "#3A3A3A" }],
    sizes: CLOTHING_SIZES,
    tag: "Bestseller",
    isNew: false,
    description: "La linea a portafoglio slancia la figura: una mini da portare con stivali, mocassini o sneakers.",
    details: ["Chiusura a portafoglio", askInStore],
  },
  {
    id: "p11",
    slug: "gilet-in-maglia-fantasia",
    name: "Gilet in Maglia Fantasia",
    category: "maglieria",
    price: 67.5,
    images: img("1620799140408-edc6dcb6d633", "1434389677669-e08b4cac3105"),
    colors: [{ name: "Fantasia", hex: "#B9A58C" }],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description: "Il gilet in maglia è il layering della stagione: sopra una camicia bianca o direttamente sulla pelle.",
    details: ["Senza maniche", "Fantasia", askInStore],
  },
  {
    id: "p12",
    slug: "gonna-vicolo-bianca",
    name: "Gonna Vicolo Bianca",
    brand: "Vicolo",
    category: "gonne",
    price: 54,
    images: img("1572804013309-59a88b7e92f1", "1583496661160-fb5886a0aaaa"),
    colors: [{ name: "Bianco", hex: "#F7F5F0" }],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description: "Una gonna bianca luminosa firmata Vicolo, da abbinare a maglieria a contrasto o al denim.",
    details: ["Marchio: Vicolo", askInStore],
  },
  {
    id: "p13",
    slug: "gonna-scozzese",
    name: "Gonna Scozzese",
    category: "gonne",
    price: 54,
    images: img("1566174053879-31528523f8ae", "1572804013309-59a88b7e92f1"),
    colors: [{ name: "Scozzese", hex: "#7A2E2E" }],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description: "Il tartan torna protagonista: una gonna scozzese dal gusto college, con collant e mocassini.",
    details: ["Fantasia tartan", askInStore],
  },
  {
    id: "p14",
    slug: "top-ocra-vicolo",
    name: "Top Ocra Vicolo",
    brand: "Vicolo",
    category: "maglieria",
    price: 36.5,
    images: img("1529139574466-a303027c1d8b", "1503342217505-b0a15ec3261c"),
    colors: [{ name: "Ocra", hex: "#C8902E" }],
    sizes: CLOTHING_SIZES,
    isNew: false,
    description: "Un tocco di colore caldo: il top ocra Vicolo da indossare da solo o sotto blazer e cardigan.",
    details: ["Marchio: Vicolo", askInStore],
  },
  {
    id: "p15",
    slug: "pochette-in-raffia",
    name: "Pochette in Raffia",
    category: "accessori",
    price: 35,
    images: img("1548036328-c9fa89d128fa", "1590874103328-eac38a683ce7"),
    colors: [{ name: "Naturale", hex: "#D6C29A" }],
    sizes: ONE_SIZE,
    isNew: false,
    description: "Compatta e naturale: la pochette in raffia per cerimonie, aperitivi e serate d'estate.",
    details: ["Raffia", askInStore],
  },
];

export const brands = ["Vicolo", "Have One", "Susy Mix", "Kontatto", "Imperial", "Kaos"];

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
      p.category.replace(/-/g, " ").includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)),
  );
};
