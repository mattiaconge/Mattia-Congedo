# Jackie O' Padova — Boutique & E-commerce

Sito vetrina / e-commerce per la boutique di abbigliamento **Jackie O' Padova**: estetica editoriale e minimal (ispirazione Zara / Ssense / Jacquemus), mobile first.

## Stack

- **Next.js 16** (App Router) + **React 19** + TypeScript
- **Tailwind CSS 4** (design token in `app/globals.css`)
- **Framer Motion** per transizioni, carosello hero, drawer e reveal on scroll
- **lucide-react** per le icone (icone social in `components/ui/SocialIcons.tsx`)
- Font: **Cormorant Garamond** (titoli) + **Inter** (testo) via `next/font`

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Struttura

```
app/
  page.tsx                 Home: Hero, Nuovi Arrivi, Style Guide, Trend, Boutique
  collezione/              Catalogo con filtri per categoria (?categoria=abiti) e ordinamento
  prodotto/[slug]/         Scheda prodotto (pagine statiche generate)
  wishlist/                Preferiti
  assistenza/              Spedizioni, resi, guida taglie, FAQ, testi legali
components/
  layout/                  Header sticky, menu laterale, ricerca, bag, footer
  home/                    Sezioni della homepage
  product/                 ProductCard (hover + Quick Add), CollectionView, ProductDetail
  ui/                      Drawer, Reveal, FashionImage (con fallback), SectionHeading, icone
context/ShopContext.tsx    Bag + wishlist (persistite in localStorage) e stato dei pannelli
lib/data/                  Mock data: prodotti, categorie, dati boutique, hero, trend
```

## Da personalizzare prima della pubblicazione

- **`lib/data/store.ts`**: indirizzo, telefono, numero WhatsApp, email, orari e link social sono **segnaposto**.
- **Immagini**: foto Unsplash dimostrative (`lib/data/*.ts`); sostituirle con shooting/lookbook della boutique. Se un'immagine non si carica viene mostrato un fondo neutro con monogramma.
- **Newsletter** (`components/layout/Footer.tsx`): la form valida l'email ma non invia dati; collegarla a Mailchimp / Brevo / Klaviyo.
- **Instagram**: il feed è statico. Per il feed live usare la Instagram Graph API (token lato server) e sostituire `instagramPosts`.
- **Checkout**: la bag genera un ordine precompilato via WhatsApp; il checkout online (es. Shopify Storefront API, Stripe) è predisposto come "presto disponibile".
- **Testi legali** in `app/assistenza/page.tsx`.
