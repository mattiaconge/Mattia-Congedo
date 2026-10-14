"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Drawer } from "@/components/ui/Drawer";
import { useShop } from "@/context/ShopContext";
import { categories, getCategory, isCategorySlug } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import type { CategorySlug } from "@/lib/types";

type Filter = CategorySlug | "tutti";
type Sort = "rilevanza" | "novita" | "prezzo-asc" | "prezzo-desc";

const sortLabels: Record<Sort, string> = {
  rilevanza: "Rilevanza",
  novita: "Novità",
  "prezzo-asc": "Prezzo crescente",
  "prezzo-desc": "Prezzo decrescente",
};

const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 10) * 10;
const allBrands = Array.from(new Set(products.flatMap((p) => (p.brand ? [p.brand] : []))));
const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes))).filter((s) => s !== "TU");

export function CollectionView() {
  const router = useRouter();
  const param = useSearchParams().get("categoria") ?? "";
  const initialCategory: Filter = isCategorySlug(param) ? param : "tutti";
  const { panel, openPanel, closePanel } = useShop();

  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [sort, setSort] = useState<Sort>("rilevanza");
  const [columns, setColumns] = useState<2 | 4>(4);
  const [brandsSel, setBrandsSel] = useState<string[]>([]);
  const [sizesSel, setSizesSel] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [onlyNew, setOnlyNew] = useState(false);

  // Allinea lo stato quando l'URL cambia (es. link dal menu laterale)
  useEffect(() => setFilter(initialCategory), [initialCategory]);

  const selectFilter = (value: Filter) => {
    setFilter(value);
    router.replace(value === "tutti" ? "/collezione" : `/collezione?categoria=${value}`, { scroll: false });
  };

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const resetFilters = () => {
    setBrandsSel([]);
    setSizesSel([]);
    setMaxPrice(MAX_PRICE);
    setOnlyNew(false);
  };

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (filter === "tutti" || p.category === filter) &&
        (brandsSel.length === 0 || (p.brand && brandsSel.includes(p.brand))) &&
        (sizesSel.length === 0 || p.sizes.some((s) => sizesSel.includes(s))) &&
        p.price <= maxPrice &&
        (!onlyNew || p.isNew),
    );
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
  }, [filter, sort, brandsSel, sizesSel, maxPrice, onlyNew]);

  const activeChips = [
    ...brandsSel.map((b) => ({ label: b, remove: () => toggle(brandsSel, setBrandsSel, b) })),
    ...sizesSel.map((s) => ({ label: `Taglia ${s}`, remove: () => toggle(sizesSel, setSizesSel, s) })),
    ...(maxPrice < MAX_PRICE ? [{ label: `Fino a ${formatPrice(maxPrice)}`, remove: () => setMaxPrice(MAX_PRICE) }] : []),
    ...(onlyNew ? [{ label: "Solo novità", remove: () => setOnlyNew(false) }] : []),
  ];

  const category = filter === "tutti" ? undefined : getCategory(filter);
  const countFor = (slug: Filter) =>
    slug === "tutti" ? products.length : products.filter((p) => p.category === slug).length;

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-8 pt-12 md:px-8 md:pt-20">
      <p className="eyebrow mb-3">Collezione</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl">{category?.name ?? "Tutti i capi"}</h1>
          <p className="mt-3 text-sm text-ink/60">{category?.tagline ?? "Le novità della boutique, in un unico posto."}</p>
        </motion.div>
      </AnimatePresence>

      {/* Barra categorie + filtri */}
      <div className="sticky top-16 z-30 -mx-4 mt-10 border-y border-line bg-paper/95 px-4 backdrop-blur md:top-20 md:-mx-8 md:px-8">
        <div className="flex items-center justify-between gap-6 py-3">
          <div className="-my-3 flex gap-6 overflow-x-auto py-3 [scrollbar-width:none]">
            {(["tutti", ...categories.map((c) => c.slug)] as Filter[]).map((slug) => (
              <button
                key={slug}
                onClick={() => selectFilter(slug)}
                className={`relative shrink-0 pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  filter === slug ? "text-ink" : "text-ink/45 hover:text-ink"
                }`}
              >
                {slug === "tutti" ? "Tutti" : getCategory(slug)?.name}
                <sup className="ml-0.5 text-[8px] text-ink/40">{countFor(slug)}</sup>
                {filter === slug && (
                  <motion.span layoutId="cat-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-ink" />
                )}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <button
              onClick={() => openPanel("filters")}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} />
              <span className="hidden sm:inline">Filtri</span>
              {activeChips.length > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] text-paper">
                  {activeChips.length}
                </span>
              )}
            </button>
            <div className="hidden gap-2 lg:flex" aria-label="Densità griglia">
              {([2, 4] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setColumns(n)}
                  aria-pressed={columns === n}
                  aria-label={`${n} colonne`}
                  className={`text-[11px] tracking-[0.2em] ${columns === n ? "text-ink" : "text-ink/35"}`}
                >
                  {n === 2 ? "▮▮" : "▮▮▮▮"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-6 flex flex-wrap items-center gap-2">
        <p className="mr-2 text-[11px] uppercase tracking-[0.2em] text-ink/45">{visible.length} articoli</p>
        <AnimatePresence>
          {activeChips.map((c) => (
            <motion.button
              key={c.label}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={c.remove}
              className="flex items-center gap-1.5 border border-ink px-3 py-1 text-[10px] uppercase tracking-[0.15em]"
            >
              {c.label} <X className="h-3 w-3" />
            </motion.button>
          ))}
        </AnimatePresence>
        {activeChips.length > 1 && (
          <button onClick={resetFilters} className="text-[10px] uppercase tracking-[0.15em] text-ink/50 underline underline-offset-4">
            Azzera tutto
          </button>
        )}
      </div>

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
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
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
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <p className="font-serif text-3xl">Nessun capo con questi filtri</p>
          <button onClick={resetFilters} className="btn-outline">Azzera i filtri</button>
        </div>
      )}

      <Drawer
        open={panel === "filters"}
        onClose={closePanel}
        side="right"
        title="Filtra e ordina"
        footer={
          <div className="flex gap-3 p-5 md:p-8">
            <button onClick={resetFilters} className="btn-outline flex-1 px-4">Azzera</button>
            <button onClick={closePanel} className="btn-primary flex-1 px-4">Mostra {visible.length}</button>
          </div>
        }
      >
        <div className="space-y-10 px-5 py-8 md:px-8">
          <FilterGroup title="Ordina per">
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(sortLabels) as Sort[]).map((s) => (
                <Chip key={s} active={sort === s} onClick={() => setSort(s)}>{sortLabels[s]}</Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Brand">
            <div className="flex flex-wrap gap-2">
              {allBrands.map((b) => (
                <Chip key={b} active={brandsSel.includes(b)} onClick={() => toggle(brandsSel, setBrandsSel, b)}>{b}</Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title={`Prezzo massimo · ${formatPrice(maxPrice)}`}>
            <input
              type="range"
              min={30}
              max={MAX_PRICE}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-ink"
              aria-label="Prezzo massimo"
            />
            <div className="mt-1 flex justify-between text-[10px] text-ink/45">
              <span>{formatPrice(30)}</span>
              <span>{formatPrice(MAX_PRICE)}</span>
            </div>
          </FilterGroup>

          <FilterGroup title="Taglia">
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <Chip key={s} active={sizesSel.includes(s)} onClick={() => toggle(sizesSel, setSizesSel, s)}>{s}</Chip>
              ))}
            </div>
          </FilterGroup>

          <label className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.2em]">
            Solo novità
            <span className={`relative h-6 w-11 rounded-full transition-colors ${onlyNew ? "bg-ink" : "bg-line"}`}>
              <input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} className="sr-only" />
              <span className={`absolute top-1 h-4 w-4 rounded-full bg-paper transition-all ${onlyNew ? "left-6" : "left-1"}`} />
            </span>
          </label>
        </div>
      </Drawer>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[11px] uppercase tracking-[0.2em]">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
