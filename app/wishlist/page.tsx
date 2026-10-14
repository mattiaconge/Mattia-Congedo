"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const { wishlist } = useShop();
  const items = wishlist.map(getProductById).filter((p): p is Product => Boolean(p));

  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-12 md:px-8 md:pt-20">
      <p className="eyebrow mb-3">I tuoi preferiti</p>
      <h1 className="font-serif text-5xl md:text-7xl">Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-6 py-20">
          <p className="text-sm text-ink/60">Non hai ancora salvato nessun capo. Tocca il cuore su un prodotto per aggiungerlo qui.</p>
          <Link href="/collezione" className="btn-primary">
            Scopri la collezione
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
