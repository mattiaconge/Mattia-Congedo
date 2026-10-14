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
npm run build      # esporta il sito statico nella cartella out/
```

Il progetto usa `output: "export"`: `out/` contiene HTML/CSS/JS statici, caricabili su qualsiasi hosting statico. Per pubblicarlo in una sottocartella (es. GitHub Pages) impostare `BASE_PATH=/nome-repo` prima della build.

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

## Anteprima in un solo file

```bash
npm run preview:build   # crea preview/dist/jackie-o-anteprima.html
```

Un unico file HTML con tutto il sito navigabile (home, collezione con filtri, schede prodotto, vista rapida,
wishlist, bag, ordine in 3 passaggi): si apre con un doppio clic, senza server e senza pubblicare nulla.
Usa gli stessi componenti del sito Next.js, con un router a hash (`preview/`).

## Da personalizzare prima della pubblicazione

- **`lib/data/store.ts`**: contatti reali della boutique (Via Fiume 4). Gli **orari** sono discordanti tra le fonti online: confermarli.
- **`lib/data/products.ts`**: articoli e prezzi reali presi da jackieoshop.it (da ricontrollare); taglie e descrizioni indicative.
- **Immagini**: ancora foto Unsplash dimostrative (`lib/data/*.ts`): sostituirle con le foto reali dei capi e della boutique. Se un'immagine non si carica viene mostrato un fondo neutro con monogramma.
- **Newsletter** (`components/layout/Footer.tsx`): la form valida l'email ma non invia dati; collegarla a Mailchimp / Brevo / Klaviyo.
- **Instagram**: il feed è statico. Per il feed live usare la Instagram Graph API (token lato server) e sostituire `instagramPosts`.
- **Checkout**: `/checkout` raccoglie i dati e invia l'ordine precompilato via WhatsApp o email; per il pagamento online collegare Stripe / PayPal.
- **Testi legali** in `app/assistenza/page.tsx`.
