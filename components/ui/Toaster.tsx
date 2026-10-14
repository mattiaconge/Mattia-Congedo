"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { FashionImage } from "@/components/ui/FashionImage";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";

export function Toaster() {
  const { toasts, openPanel } = useShop();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[60] flex flex-col items-center gap-2 px-4 md:left-auto md:right-8 md:items-end">
      <AnimatePresence>
        {toasts.map((t) => {
          const p = t.productId ? getProductById(t.productId) : undefined;
          const isCart = t.message.includes("bag");
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-auto flex w-full max-w-sm items-center gap-3 bg-ink p-3 text-paper shadow-xl"
              role="status"
            >
              {p ? (
                <span className="relative aspect-[3/4] w-10 shrink-0 overflow-hidden bg-mist">
                  <FashionImage src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ) : (
                <Check className="h-4 w-4" />
              )}
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em]">{t.message}</p>
                {p && <p className="mt-0.5 text-xs text-paper/60">{p.name}</p>}
              </div>
              {isCart && (
                <button onClick={() => openPanel("cart")} className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
                  Vedi bag
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
