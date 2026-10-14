"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";
import type { Product } from "@/lib/types";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { recentlyViewed } = useShop();
  const items = recentlyViewed
    .filter((id) => id !== excludeId)
    .map(getProductById)
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-24 md:px-8">
      <h2 className="mb-10 font-serif text-3xl md:text-5xl">Visti di recente</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
