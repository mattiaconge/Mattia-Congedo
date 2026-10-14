"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Truck, RotateCcw, Store } from "lucide-react";
import { FashionImage } from "@/components/ui/FashionImage";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useShop } from "@/context/ShopContext";
import { getCategory } from "@/lib/data/categories";
import { store, whatsappLink } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [color, setColor] = useState(product.colors[0]);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("dettagli");
  const wished = isWishlisted(product.id);
  const category = getCategory(product.category);

  const onAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart(product.id, size);
  };

  const accordions = [
    {
      id: "dettagli",
      title: "Composizione & dettagli",
      content: (
        <ul className="list-inside list-disc space-y-1">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "spedizione",
      title: "Spedizione & resi",
      content: (
        <p>
          Spedizione gratuita per ordini superiori a {formatPrice(store.freeShippingThreshold)}. Consegna in 24/48h in Italia.
          Reso o cambio gratuito entro 14 giorni, anche in boutique.
        </p>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-[1600px] md:px-8 md:pt-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Galleria: scroll orizzontale su mobile, colonna su desktop */}
        <div className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-2 md:overflow-visible">
          {product.images.map((src, i) => (
            <div key={src + i} className="relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-mist">
              <FashionImage
                src={src}
                alt={i === 0 ? product.name : `${product.name} — vista ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 30vw, (min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Info prodotto */}
        <div className="px-4 pb-8 md:px-0 lg:sticky lg:top-28 lg:self-start">
          <nav className="mb-6 text-[10px] uppercase tracking-[0.2em] text-ink/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/collezione?categoria=${product.category}`} className="hover:text-ink">{category?.name}</Link>
          </nav>

          {product.tag && <p className="eyebrow mb-3 text-gold">{product.tag}</p>}
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={wished ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
              aria-pressed={wished}
              className="mt-2 p-1"
            >
              <Heart className={`h-6 w-6 ${wished ? "fill-ink" : ""}`} strokeWidth={1.1} />
            </button>
          </div>
          <p className="mt-4 text-lg">
            {product.compareAtPrice && (
              <span className="mr-3 text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-ink/70">{product.description}</p>

          {/* Colore */}
          <div className="mt-8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em]">
              Colore: <span className="text-ink/60">{color.name}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  aria-pressed={color.name === c.name}
                  className={`h-7 w-7 rounded-full border p-0.5 ${color.name === c.name ? "border-ink" : "border-transparent"}`}
                >
                  <span className="block h-full w-full rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Taglia */}
          {!oneSize && (
            <div className="mt-8">
              <div className="mb-3 flex justify-between text-[11px] uppercase tracking-[0.2em]">
                <span>Taglia</span>
                <Link href="/assistenza#taglie" className="text-ink/50 underline underline-offset-4 hover:text-ink">
                  Guida alle taglie
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s}
                    className={`border py-3 text-xs transition-colors ${
                      size === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="mt-2 text-xs text-red-700">Seleziona una taglia per continuare.</p>}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <button onClick={onAdd} className="btn-primary w-full">
              Aggiungi alla bag
            </button>
            <a
              href={whatsappLink(`Ciao! Vorrei informazioni su "${product.name}" (colore ${color.name}${size ? `, taglia ${size}` : ""}).`)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chiedi disponibilità su WhatsApp
            </a>
          </div>

          <ul className="mt-8 space-y-3 text-xs text-ink/70">
            <li className="flex items-center gap-3"><Truck className="h-4 w-4" strokeWidth={1.25} /> Spedizione gratuita sopra {formatPrice(store.freeShippingThreshold)}</li>
            <li className="flex items-center gap-3"><RotateCcw className="h-4 w-4" strokeWidth={1.25} /> Resi e cambi entro 14 giorni</li>
            <li className="flex items-center gap-3"><Store className="h-4 w-4" strokeWidth={1.25} /> Ritiro gratuito in boutique a Padova</li>
          </ul>

          <div className="mt-10 border-t border-line">
            {accordions.map((a) => {
              const open = openAccordion === a.id;
              return (
                <div key={a.id} className="border-b border-line">
                  <button
                    onClick={() => setOpenAccordion(open ? null : a.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-4 text-[11px] uppercase tracking-[0.2em]"
                  >
                    {a.title}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.25} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 text-sm leading-relaxed text-ink/70">{a.content}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
