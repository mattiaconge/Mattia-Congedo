"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, getCategory, isCategorySlug } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import type { CategorySlug } from "@/lib/types";

type Filter = CategorySlug | "tutti";
type Sort = "rilevanza" | "novita" | "prezzo-asc" | "prezzo-desc";

const sortLabels: Record<Sort, string> = {
  rilevanza: "Rilevanza",
  novita: "Novità",
  "prezzo-asc": "Prezzo crescente",
  "prezzo-desc": "Prezzo decrescente",
};

export function CollectionView() {
  const param = useSearchParams().get("categoria") ?? "";
  const initialCategory: Filter = isCategorySlug(param) ? param : "tutti";
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [sort, setSort] = useState<Sort>("rilevanza");
  const [columns, setColumns] = useState<2 | 4>(4);

  // Allinea lo stato quando l'URL cambia (es. link dal menu laterale)
  useEffect(() => setFilter(initialCategory), [initialCategory]);

  const selectFilter = (value: Filter) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "tutti") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", value);
    window.history.replaceState(null, "", url);
  };

  const visible = useMemo(() => {
    const list = filter === "tutti" ? [...products] : products.filter((p) => p.category === filter);
    switch (sort) {
      case "novita":
        return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      case "prezzo-asc":
        return list.sort((a, b) => a.price - b.price);
      case "prezzo-desc":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [filter, sort]);

  const category = filter === "tutti" ? undefined : getCategory(filter);

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-8 pt-12 md:px-8 md:pt-20">
      <p className="eyebrow mb-3">Collezione</p>
      <h1 className="font-serif text-5xl md:text-7xl">{category?.name ?? "Tutti i capi"}</h1>
      {category && <p className="mt-3 text-sm text-ink/60">{category.tagline}</p>}

      {/* Barra filtri */}
      <div className="sticky top-16 z-30 -mx-4 mt-10 border-y border-line bg-paper/95 px-4 backdrop-blur md:top-20 md:-mx-8 md:px-8">
        <div className="flex items-center justify-between gap-6 py-3">
          <div className="-my-3 flex gap-6 overflow-x-auto py-3 [scrollbar-width:none]">
            {(["tutti", ...categories.map((c) => c.slug)] as Filter[]).map((slug) => (
              <button
                key={slug}
                onClick={() => selectFilter(slug)}
                className={`shrink-0 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  filter === slug ? "text-ink underline underline-offset-8" : "text-ink/45 hover:text-ink"
                }`}
              >
                {slug === "tutti" ? "Tutti" : getCategory(slug)?.name}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
              <span className="hidden text-ink/45 sm:inline">Ordina</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer bg-transparent text-[11px] uppercase tracking-[0.15em] outline-none"
              >
                {(Object.keys(sortLabels) as Sort[]).map((s) => (
                  <option key={s} value={s}>
                    {sortLabels[s]}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden gap-2 lg:flex" aria-label="Densità griglia">
              {([2, 4] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setColumns(n)}
                  aria-pressed={columns === n}
                  className={`text-[11px] tracking-[0.2em] ${columns === n ? "text-ink" : "text-ink/35"}`}
                >
                  {n === 2 ? "▮▮" : "▮▮▮▮"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mb-6 mt-6 text-[11px] uppercase tracking-[0.2em] text-ink/45">{visible.length} articoli</p>

      <motion.ul
        layout
        className={`grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:gap-y-14 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-2"}`}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04 }}
            >
              <ProductCard
                product={p}
                priority={i < 4}
                sizes={columns === 4 ? "(min-width:1024px) 25vw, 50vw" : "50vw"}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="py-24 text-center text-sm text-ink/60">Nessun articolo in questa categoria al momento.</p>
      )}
    </section>
  );
}
