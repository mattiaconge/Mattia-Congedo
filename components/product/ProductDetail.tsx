"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Truck } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useShop } from "@/context/ShopContext";
import { getCategory } from "@/lib/data/categories";
import { store } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { markViewed } = useShop();
  const [openAccordion, setOpenAccordion] = useState<string | null>("dettagli");
  const category = getCategory(product.category);

  useEffect(() => markViewed(product.id), [product.id, markViewed]);

  const accordions = [
    {
      id: "dettagli",
      title: "Dettagli",
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
          Spedizione gratuita per ordini superiori a {formatPrice(store.freeShippingThreshold)}. Per tempi di consegna, resi e
          cambi consulta i{" "}
          <a href={`${store.website}/content/termini-e-condizioni`} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            Termini e Condizioni
          </a>{" "}
          o scrivici su WhatsApp.
        </p>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-[1600px] md:px-8 md:pt-8">
      <nav className="hidden px-4 pb-6 text-[10px] uppercase tracking-[0.2em] text-ink/45 md:block md:px-0" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/collezione?categoria=${product.category}`} className="hover:text-ink">{category?.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="px-4 pb-8 md:px-0 lg:sticky lg:top-28 lg:self-start">
          {/* key: azzera taglia/colore quando si passa a un altro prodotto */}
          <PurchasePanel key={product.id} product={product} />

          <ul className="mt-8 space-y-3 text-xs text-ink/70">
            <li className="flex items-center gap-3"><Truck className="h-4 w-4" strokeWidth={1.25} /> Spedizione gratuita sopra {formatPrice(store.freeShippingThreshold)}</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4" strokeWidth={1.25} /> Boutique in {store.address.street}, Padova</li>
            <li className="flex items-center gap-3"><WhatsAppIcon className="h-4 w-4" /> Assistenza ordini su WhatsApp {store.whatsappDisplay}</li>
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
