import { unsplash } from "@/lib/format";

/**
 * Dati della boutique.
 * ⚠️ Indirizzo, telefono, WhatsApp, email e handle social sono SEGNAPOSTO:
 * sostituirli con i dati reali del negozio prima della pubblicazione.
 */
export const store = {
  name: "Jackie O' Padova",
  address: {
    street: "Via San Fermo, 00",
    city: "35137 Padova (PD)",
  },
  mapsQuery: "Jackie O' Padova",
  phone: "+39 049 000 0000",
  /** Solo cifre, con prefisso internazionale, per i link wa.me */
  whatsapp: "390000000000",
  email: "info@jackieopadova.it",
  instagram: { handle: "@jackieo_padova", url: "https://www.instagram.com/" },
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
  hours: [
    { days: "Lunedì", time: "15:30 – 19:30" },
    { days: "Martedì – Sabato", time: "10:00 – 13:00 · 15:30 – 19:30" },
    { days: "Domenica", time: "Chiuso" },
  ],
  freeShippingThreshold: 150,
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
    eyebrow: "Capispalla",
    title: "Tailoring Moderno",
    subtitle: "Cappotti sartoriali e trench iconici per la stagione fredda.",
    image: unsplash("1487222477894-8943e31ef7b2", 2000),
    cta: { label: "Shop Capispalla", href: "/collezione?categoria=capispalla" },
    secondary: { label: "Nuovi Arrivi", href: "/#nuovi-arrivi" },
  },
  {
    id: "h3",
    eyebrow: "Evening edit",
    title: "After Dark",
    subtitle: "Raso, plissé e dettagli dorati per le sere che contano.",
    image: unsplash("1509631179647-0177331693ae", 2000),
    cta: { label: "Shop Abiti", href: "/collezione?categoria=abiti" },
    secondary: { label: "Sfoglia i Trend", href: "/#trend" },
  },
];

export const trendStories = [
  {
    id: "quiet-luxury",
    number: "01",
    title: "Quiet Luxury",
    kicker: "Trend della stagione",
    text: "Cashmere, lana e pelle in una palette di avorio, cammello e tortora. Il lusso non si mostra: si percepisce nei materiali e nei tagli perfetti.",
    image: unsplash("1503342217505-b0a15ec3261c", 1400),
    productIds: ["p02", "p03", "p04"],
  },
  {
    id: "after-dark",
    number: "02",
    title: "Black Tie Contemporaneo",
    kicker: "Style guide",
    text: "Il nero totale si fa scultoreo: plissé in movimento, vernice lucida e un tocco d'oro. Per serate in cui ogni dettaglio conta.",
    image: unsplash("1539109136881-3be0616acf4b", 1400),
    productIds: ["p08", "p05", "p06"],
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
