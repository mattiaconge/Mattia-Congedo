"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { FashionImage } from "@/components/ui/FashionImage";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";
import { store, whatsappLink } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { panel, closePanel, cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useShop();
  const missing = Math.max(0, store.freeShippingThreshold - cartTotal);
  const progress = Math.min(100, (cartTotal / store.freeShippingThreshold) * 100);

  const orderMessage = [
    "Ciao Jackie O'! Vorrei ordinare:",
    ...cart.map((i) => {
      const p = getProductById(i.productId);
      return p ? `• ${p.name} — taglia ${i.size} × ${i.quantity} (${formatPrice(p.price * i.quantity)})` : "";
    }),
    `Totale: ${formatPrice(cartTotal)}`,
  ].join("\n");

  return (
    <Drawer
      open={panel === "cart"}
      onClose={closePanel}
      side="right"
      title={`Bag (${cartCount})`}
      footer={
        cart.length > 0 && (
          <div className="space-y-4 p-5 md:p-8">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.2em]">Totale</span>
              <span className="font-serif text-2xl">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-ink/50">IVA inclusa. Pagamento e consegna confermati dalla boutique.</p>
            <Link href="/checkout" onClick={closePanel} className="btn-primary w-full">
              Procedi all&apos;ordine
            </Link>
            <a href={whatsappLink(orderMessage)} target="_blank" rel="noreferrer" className="btn-outline w-full">
              <WhatsAppIcon className="h-4 w-4" />
              Ordine veloce su WhatsApp
            </a>
          </div>
        )
      }
    >
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
          <p className="font-serif text-3xl">La tua bag è vuota</p>
          <p className="text-sm text-ink/60">Scopri i nuovi arrivi e lasciati ispirare.</p>
          <Link href="/collezione" onClick={closePanel} className="btn-primary">
            Shop la collezione
          </Link>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-5 py-4 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.15em]">
              {missing > 0
                ? `Ti mancano ${formatPrice(missing)} per la spedizione gratuita`
                : "Hai diritto alla spedizione gratuita"}
            </p>
            <div className="mt-3 h-px w-full bg-line">
              <motion.div className="h-px bg-gold" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.7 }} />
            </div>
          </div>
          <ul className="divide-y divide-line">
            {cart.map((item) => {
              const p = getProductById(item.productId);
              if (!p) return null;
              return (
                <motion.li
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 px-5 py-6 md:px-8"
                >
                  <Link href={`/prodotto/${p.slug}`} onClick={closePanel} className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-mist">
                    <FashionImage src={p.images[0]} alt={p.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-[11px] uppercase tracking-[0.15em]">{p.name}</p>
                      <p className="text-xs">{formatPrice(p.price * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-xs text-ink/50">Taglia {item.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          aria-label="Diminuisci quantità"
                          className="p-2"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          aria-label="Aumenta quantità"
                          className="p-2"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        className="text-[10px] uppercase tracking-[0.2em] text-ink/50 underline-offset-4 hover:text-ink hover:underline"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </>
      )}
    </Drawer>
  );
}
