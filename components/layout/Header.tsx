"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { store } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";

export const navLinks = [
  { href: "/#nuovi-arrivi", label: "Nuovi Arrivi" },
  { href: "/collezione", label: "Collezione" },
  { href: "/#trend", label: "Trend" },
  { href: "/#boutique", label: "Info & Contatti" },
];

const iconClass = "h-5 w-5";

export function Header() {
  const { cartCount, wishlist, openPanel } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-[10px] uppercase tracking-[0.25em] text-paper md:text-[11px]">
        Spedizione gratuita sopra {formatPrice(store.freeShippingThreshold)} · Resi entro 14 giorni
      </div>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
          scrolled ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-8">
          {/* Sinistra */}
          <div className="flex items-center gap-1 md:gap-6">
            <button onClick={() => openPanel("menu")} aria-label="Apri menu" className="-ml-2 p-2">
              <Menu className={iconClass} strokeWidth={1.25} />
            </button>
            <button onClick={() => openPanel("search")} aria-label="Cerca" className="p-2 md:hidden">
              <Search className={iconClass} strokeWidth={1.25} />
            </button>
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Principale">
              {navLinks.slice(0, 2).map((l) => (
                <Link key={l.href} href={l.href} className="link-underline text-[11px] uppercase tracking-[0.2em]">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logo */}
          <Link href="/" aria-label="Jackie O' Padova — Home" className="text-center leading-none">
            <span className="block font-serif text-2xl tracking-[0.12em] md:text-[2rem]">JACKIE O&apos;</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.55em] text-taupe md:text-[10px]">Padova</span>
          </Link>

          {/* Destra */}
          <div className="flex items-center justify-end gap-1 md:gap-6">
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Secondaria">
              {navLinks.slice(2).map((l) => (
                <Link key={l.href} href={l.href} className="link-underline text-[11px] uppercase tracking-[0.2em]">
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={() => openPanel("search")}
              className="hidden items-center gap-2 border-b border-ink/30 pb-1 text-[11px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:border-ink hover:text-ink md:flex"
            >
              <Search className="h-4 w-4" strokeWidth={1.25} />
              Cerca
            </button>
            <Link href="/wishlist" aria-label={`Wishlist (${wishlist.length})`} className="relative p-2">
              <Heart className={iconClass} strokeWidth={1.25} />
              {wishlist.length > 0 && <Badge count={wishlist.length} />}
            </Link>
            <button onClick={() => openPanel("cart")} aria-label={`Bag (${cartCount})`} className="relative -mr-2 p-2">
              <ShoppingBag className={iconClass} strokeWidth={1.25} />
              {cartCount > 0 && <Badge count={cartCount} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] font-medium text-paper">
      {count}
    </span>
  );
}
