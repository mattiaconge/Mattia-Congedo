"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Drawer } from "@/components/ui/Drawer";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useShop } from "@/context/ShopContext";
import { categories } from "@/lib/data/categories";
import { store, whatsappLink } from "@/lib/data/store";
import { navLinks } from "./Header";

export function SideMenu() {
  const { panel, closePanel } = useShop();

  return (
    <Drawer
      open={panel === "menu"}
      onClose={closePanel}
      side="left"
      title="Menu"
      footer={
        <div className="flex items-center gap-6 px-5 py-5 text-[11px] uppercase tracking-[0.2em] md:px-8">
          <a href={store.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <InstagramIcon className="h-4 w-4" /> Instagram
          </a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      }
    >
      <nav className="px-5 py-8 md:px-8" aria-label="Menu laterale">
        <ul className="space-y-1">
          {navLinks.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
            >
              <Link href={l.href} onClick={closePanel} className="block py-2 font-serif text-4xl transition-colors hover:text-taupe">
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <p className="eyebrow mb-4 mt-12">Categorie</p>
        <ul className="grid grid-cols-2 gap-y-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/collezione?categoria=${c.slug}`}
                onClick={closePanel}
                className="link-underline text-xs uppercase tracking-[0.2em]"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="eyebrow mb-4 mt-12">Assistenza</p>
        <ul className="space-y-3 text-xs uppercase tracking-[0.2em]">
          <li><Link href="/wishlist" onClick={closePanel} className="link-underline">Wishlist</Link></li>
          <li><Link href="/assistenza" onClick={closePanel} className="link-underline">Spedizioni, resi & FAQ</Link></li>
        </ul>
      </nav>
    </Drawer>
  );
}
