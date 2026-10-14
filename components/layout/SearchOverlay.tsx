"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { FashionImage } from "@/components/ui/FashionImage";
import { useShop } from "@/context/ShopContext";
import { categories } from "@/lib/data/categories";
import { searchProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

export function SearchOverlay() {
  const { panel, closePanel } = useShop();
  const open = panel === "search";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchProducts(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      // attende la fine dell'animazione d'ingresso
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Ricerca"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto max-w-[1600px] px-4 pb-16 md:px-8">
            <div className="flex h-16 items-center justify-end md:h-20">
              <button onClick={closePanel} aria-label="Chiudi ricerca" className="-mr-2 p-2">
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            <label className="flex items-center gap-4 border-b border-ink pb-3">
              <Search className="h-6 w-6 shrink-0" strokeWidth={1} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca abiti, Vicolo, raffia…"
                className="w-full bg-transparent font-serif text-3xl outline-none placeholder:text-ink/30 md:text-5xl"
                aria-label="Cerca prodotti"
              />
            </label>

            {!query && (
              <div className="mt-10">
                <p className="eyebrow mb-4">Ricerche suggerite</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setQuery(c.name.toLowerCase())}
                      className="border border-line px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-ink"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="mt-10">
                <p className="eyebrow mb-6">
                  {results.length} {results.length === 1 ? "risultato" : "risultati"}
                </p>
                {results.length === 0 ? (
                  <p className="text-sm text-ink/60">Nessun prodotto trovato. Prova con un&apos;altra parola.</p>
                ) : (
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link href={`/prodotto/${p.slug}`} onClick={closePanel} className="group block">
                          <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                            <FashionImage
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="(min-width:1024px) 16vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-3 text-[11px] uppercase tracking-[0.15em]">{p.name}</p>
                          <p className="mt-1 text-xs text-ink/60">{formatPrice(p.price)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
