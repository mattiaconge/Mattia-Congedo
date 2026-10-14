"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { FashionImage } from "@/components/ui/FashionImage";
import { useShop } from "@/context/ShopContext";
import { getCategory } from "@/lib/data/categories";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width:1024px) 25vw, 50vw",
}: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = isWishlisted(product.id);
  const href = `/prodotto/${product.slug}`;
  const oneSize = product.sizes.length === 1;

  const quickAdd = (size: string) => {
    addToCart(product.id, size, false);
    setQuickOpen(false);
  };

  return (
    <article className="group" onMouseLeave={() => setQuickOpen(false)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-mist">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <FashionImage
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.04] lg:group-hover:opacity-0"
          />
          <FashionImage
            src={product.images[1]}
            alt=""
            fill
            sizes={sizes}
            className="hidden object-cover opacity-0 transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100 lg:block"
          />
        </Link>

        {product.tag && (
          <span className="pointer-events-none absolute left-3 top-3 bg-paper/90 px-2 py-1 text-[9px] uppercase tracking-[0.2em]">
            {product.tag}
          </span>
        )}

        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
          aria-pressed={wished}
          className="absolute right-2 top-2 p-2"
        >
          <Heart className={`h-[18px] w-[18px] transition-colors ${wished ? "fill-ink" : ""}`} strokeWidth={1.25} />
        </motion.button>

        <button
          onClick={() => openQuickView(product.id)}
          aria-label={`Vista rapida: ${product.name}`}
          className="absolute right-2 top-11 p-2 transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
        >
          <Eye className="h-[18px] w-[18px]" strokeWidth={1.25} />
        </button>

        {/* Quick Add */}
        <div
          className={`absolute inset-x-2 bottom-2 bg-paper/95 backdrop-blur transition-all duration-500 ${
            quickOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          }`}
        >
          {oneSize ? (
            <button
              onClick={() => quickAdd(product.sizes[0])}
              className="w-full py-3 text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
            >
              Aggiungi alla bag
            </button>
          ) : (
            <div className="p-2">
              <p className="pb-2 text-center text-[9px] uppercase tracking-[0.2em] text-ink/50">Quick add · Seleziona taglia</p>
              <div className="flex flex-wrap justify-center gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => quickAdd(s)}
                    className="min-w-9 border border-line px-2 py-1.5 text-[10px] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pulsante "+" per touch screen, dove non esiste hover */}
        <button
          onClick={() => setQuickOpen((v) => !v)}
          aria-label="Aggiunta rapida"
          aria-expanded={quickOpen}
          className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-paper/95 transition-opacity lg:hidden ${
            quickOpen ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <Plus className="h-4 w-4" strokeWidth={1.25} />
        </button>
      </div>

      <Link href={href} className="block pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[11px] uppercase leading-snug tracking-[0.12em]">{product.name}</h3>
          <div className="shrink-0 text-right text-xs">
            {product.compareAtPrice && (
              <span className="mr-1.5 text-ink/40 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.15em] text-ink/50">{product.brand ?? getCategory(product.category)?.name}</p>
          <div className="flex gap-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-2.5 w-2.5 rounded-full border border-ink/15"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
