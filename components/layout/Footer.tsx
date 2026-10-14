"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { store, whatsappLink } from "@/lib/data/store";

const columns = [
  {
    title: "Assistenza",
    links: [
      { label: "Spedizioni", href: "/assistenza#spedizioni" },
      { label: "Ordini via WhatsApp", href: "/assistenza#ordini" },
      { label: "FAQ", href: "/assistenza#faq" },
      { label: "Guida alle taglie", href: "/assistenza#taglie" },
    ],
  },
  {
    title: "Boutique",
    links: [
      { label: "Chi siamo", href: "/#boutique" },
      { label: "Orari & indirizzo", href: "/#boutique" },
      { label: "Nuovi arrivi", href: "/#nuovi-arrivi" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Legale",
    links: [
      { label: "Termini e condizioni", href: "/assistenza#termini" },
      { label: "Privacy Policy", href: "/assistenza#privacy" },
      { label: "Contatti", href: "/assistenza#contatti" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    // TODO: collegare a un servizio newsletter (Mailchimp, Brevo, Klaviyo…)
    setStatus("done");
    setEmail("");
  };

  return (
    <footer className="mt-24 bg-ink text-paper md:mt-32">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_2fr]">
          {/* Newsletter */}
          <div>
            <p className="eyebrow mb-4 text-paper/50!">Newsletter</p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              Rimani aggiornata sui nuovi arrivi e promozioni esclusive
            </h2>
            {status === "done" ? (
              <p className="mt-8 text-sm text-gold">Grazie! Ti abbiamo iscritta alla newsletter.</p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8" noValidate>
                <div className="flex items-center border-b border-paper/40 focus-within:border-paper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Il tuo indirizzo email"
                    aria-label="Indirizzo email"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-paper/40"
                  />
                  <button type="submit" aria-label="Iscriviti" className="p-2">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                  </button>
                </div>
                {status === "error" && <p className="mt-2 text-xs text-red-300">Inserisci un indirizzo email valido.</p>}
                <p className="mt-4 text-[11px] text-paper/40">
                  Iscrivendoti accetti la nostra <Link href="/assistenza#privacy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>

          {/* Link */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-paper/50">{col.title}</p>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-paper/80 transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-8 border-t border-paper/15 pt-8 md:flex-row md:items-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-paper/40">
            © {new Date().getFullYear()} {store.name} · {store.legalName} · {store.address.street}, {store.address.city}
          </p>
          <div className="flex items-center gap-5">
            <a href={store.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon className="h-5 w-5" /></a>
            <a href={store.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon className="h-5 w-5" /></a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <p aria-hidden="true" className="select-none overflow-hidden whitespace-nowrap text-center font-serif text-[18vw] leading-[0.8] text-paper/[0.06]">
        JACKIE O&apos;
      </p>
    </footer>
  );
}
