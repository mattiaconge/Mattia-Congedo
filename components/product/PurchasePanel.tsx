"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Ruler } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SizeGuideTable } from "@/components/product/SizeGuide";
import { useShop } from "@/context/ShopContext";
import { getCategory } from "@/lib/data/categories";
import { whatsappLink } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

interface PurchasePanelProps {
  product: Product;
  /** Nella vista rapida il titolo è più piccolo e c'è il link alla scheda completa */
  variant?: "page" | "quick";
}

export function PurchasePanel({ product, variant = "page" }: PurchasePanelProps) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [color, setColor] = useState(product.colors[0]);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.id);
  const category = getCategory(product.category);
  const quick = variant === "quick";

  const onAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart(product.id, size, !quick);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-ink/50">
        {product.brand ? `${product.brand} · ` : ""}
        {category?.name}
      </p>
      {product.tag && <p className="eyebrow mb-2 text-gold">{product.tag}</p>}
      <div className="flex items-start justify-between gap-4">
        <h1 className={`font-serif leading-tight ${quick ? "text-3xl" : "text-4xl md:text-5xl"}`}>{product.name}</h1>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
          aria-pressed={wished}
          className="mt-1 p-1"
        >
          <Heart className={`h-6 w-6 transition-colors ${wished ? "fill-ink" : ""}`} strokeWidth={1.1} />
        </motion.button>
      </div>
      <p className="mt-3 text-lg">
        {product.compareAtPrice && (
          <span className="mr-3 text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
        {formatPrice(product.price)}
      </p>
      {!quick && <p className="mt-6 text-sm leading-relaxed text-ink/70">{product.description}</p>}

      {/* Colore */}
      <div className="mt-7">
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
        <div className="mt-7">
          <div className="mb-3 flex justify-between text-[11px] uppercase tracking-[0.2em]">
            <span>
              Taglia{size && <span className="text-ink/60">: {size}</span>}
            </span>
            <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-1.5 text-ink/50 underline underline-offset-4 hover:text-ink">
              <Ruler className="h-3.5 w-3.5" strokeWidth={1.25} /> Guida alle taglie
            </button>
          </div>
          <motion.div
            className="grid grid-cols-5 gap-2 sm:grid-cols-7"
            animate={sizeError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                aria-pressed={size === s}
                className={`border py-3 text-xs transition-colors ${
                  size === s ? "border-ink bg-ink text-paper" : sizeError ? "border-red-300" : "border-line hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </motion.div>
          {sizeError && <p className="mt-2 text-xs text-red-700">Seleziona una taglia per continuare.</p>}
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3">
        <button onClick={onAdd} className="btn-primary relative w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "ok" : "add"}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {added ? "✓ Aggiunto alla bag" : "Aggiungi alla bag"}
            </motion.span>
          </AnimatePresence>
        </button>
        <a
          href={whatsappLink(`Ciao! Vorrei informazioni su "${product.name}" (colore ${color.name}${size ? `, taglia ${size}` : ""}). È disponibile?`)}
          target="_blank"
          rel="noreferrer"
          className="btn-outline w-full"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Chiedi disponibilità su WhatsApp
        </a>
        {quick && (
          <Link
            href={`/prodotto/${product.slug}`}
            onClick={() => openQuickView(null)}
            className="link-underline self-center pt-2 text-[11px] uppercase tracking-[0.2em]"
          >
            Vedi scheda completa
          </Link>
        )}
      </div>

      <Modal open={guideOpen} onClose={() => setGuideOpen(false)} title="Guida alle taglie">
        <div className="p-6 md:p-10">
          <p className="eyebrow mb-2">Trova la tua misura</p>
          <h2 className="mb-6 font-serif text-3xl">Guida alle taglie</h2>
          <SizeGuideTable />
        </div>
      </Modal>
    </div>
  );
}
