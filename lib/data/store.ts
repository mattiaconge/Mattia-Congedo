import { unsplash } from "@/lib/format";

/**
 * Dati reali della boutique (fonti: jackieoshop.it, Instagram @jackie_o_padova, Facebook).
 * ⚠️ Gli ORARI sono discordanti tra le fonti online (Cylex 08/2025, Nuova Opinione):
 * qui sono riportati quelli più recenti, da confermare con il negozio.
 */
export const store = {
  name: "Jackie O' Padova",
  legalName: "NEW MODA srl",
  address: {
    street: "Via Fiume, 4",
    city: "35139 Padova (PD)",
  },
  mapsQuery: "Jackie O', Via Fiume 4, 35139 Padova",
  phone: "049 876 0470",
  /** Solo cifre, con prefisso internazionale, per i link wa.me */
  whatsapp: "393480569100",
  whatsappDisplay: "348 056 9100",
  email: "shop@jackie-o.it",
  website: "https://www.jackieoshop.it",
  instagram: { handle: "@jackie_o_padova", url: "https://www.instagram.com/jackie_o_padova/" },
  facebook: "https://www.facebook.com/Jackieopadova/",
  /** Orari per giorno della settimana (0 = domenica), fasce "HH:MM-HH:MM" */
  schedule: {
    0: ["15:30-19:30"],
    1: ["15:00-19:30"],
    2: ["09:30-19:30"],
    3: ["09:30-19:30"],
    4: ["09:30-19:30"],
    5: ["09:30-19:30"],
    6: ["09:30-19:30"],
  } as Record<number, string[]>,
  hours: [
    { days: "Lunedì", time: "15:00 – 19:30" },
    { days: "Martedì – Sabato", time: "09:30 – 19:30" },
    { days: "Domenica", time: "15:30 – 19:30" },
  ],
  freeShippingThreshold: 90,
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${store.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(store.mapsQuery)}&output=embed`;

export const heroSlides = [
  {
    id: "h1",
    eyebrow: "Autunno / Inverno",
    title: "La Nuova Collezione",
    subtitle: "Linee pulite, materiali preziosi, nuance che parlano sottovoce.",
    image: unsplash("1515886657613-9f3515b0c78f", 2000),
    cta: { label: "Scopri la Nuova Collezione", href: "/collezione" },
    secondary: { label: "Sfoglia i Trend", href: "/#trend" },
  },
  {
    id: "h2",
    eyebrow: "Capi spalla & Blazer",
    title: "Tailoring Moderno",
    subtitle: "Giacche, piumini e tailleur per la stagione fredda.",
    image: unsplash("1487222477894-8943e31ef7b2", 2000),
    cta: { label: "Shop Capi spalla", href: "/collezione?categoria=capi-spalla" },
    secondary: { label: "Nuovi Arrivi", href: "/#nuovi-arrivi" },
  },
  {
    id: "h3",
    eyebrow: "Vicolo · Have One · Kaos",
    title: "I Nostri Brand",
    subtitle: "Le collezioni dei marchi che selezioniamo per te, stagione dopo stagione.",
    image: unsplash("1509631179647-0177331693ae", 2000),
    cta: { label: "Shop Abiti e tute", href: "/collezione?categoria=abiti-e-tute" },
    secondary: { label: "Sfoglia i Trend", href: "/#trend" },
  },
];

export const trendStories = [
  {
    id: "quiet-luxury",
    number: "01",
    title: "Quiet Luxury",
    kicker: "Trend della stagione",
    text: "Maglieria morbida, capi spalla essenziali e una palette di avorio, cammello e tortora. Il lusso non si mostra: si percepisce nei tagli e negli abbinamenti.",
    image: unsplash("1503342217505-b0a15ec3261c", 1400),
    productIds: ["p03", "p09", "p07"],
  },
  {
    id: "after-dark",
    number: "02",
    title: "Power Dressing",
    kicker: "Style guide",
    text: "Il tailleur rosso, la giacca strutturata e il denim giusto: il guardaroba di chi vuole lasciare il segno, dall'ufficio all'aperitivo.",
    image: unsplash("1539109136881-3be0616acf4b", 1400),
    productIds: ["p01", "p02", "p08"],
  },
];

export const boutiqueImage = unsplash("1441984904996-e0b6ba687e04", 1400);

export const instagramPosts = [
  unsplash("1469334031218-e382a71b716b", 600),
  unsplash("1483985988355-763728e1935b", 600),
  unsplash("1496747611176-843222e1e57c", 600),
  unsplash("1485968579580-b6d095142e6e", 600),
  unsplash("1529139574466-a303027c1d8b", 600),
  unsplash("1490481651871-ab68de25d43d", 600),
];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Stato apertura in tempo reale (ora locale del visitatore, pensata per Padova) */
export function getOpenStatus(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = store.schedule[now.getDay()] ?? [];
  for (const slot of today) {
    const [open, close] = slot.split("-");
    if (minutes >= toMinutes(open) && minutes < toMinutes(close)) {
      return { open: true, label: `Aperto ora · chiude alle ${close}` };
    }
    if (minutes < toMinutes(open)) {
      return { open: false, label: `Chiuso · apre oggi alle ${open}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const day = (now.getDay() + i) % 7;
    const first = store.schedule[day]?.[0];
    if (first) {
      const names = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
      return { open: false, label: `Chiuso · apre ${i === 1 ? "domani" : names[day]} alle ${first.split("-")[0]}` };
    }
  }
  return { open: false, label: "Chiuso" };
}
