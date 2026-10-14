import type { Metadata } from "next";
import { SizeGuideTable } from "@/components/product/SizeGuide";
import { brands } from "@/lib/data/products";
import { store } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Assistenza",
  description: "Ordini, spedizioni, guida alle taglie, FAQ e contatti di Jackie O' Padova.",
};

const termsUrl = `${store.website}/content/termini-e-condizioni`;

const faqs = [
  {
    q: "Come posso sapere se una taglia è disponibile?",
    a: `Scrivici su WhatsApp al ${store.whatsappDisplay} indicando il capo e la taglia: ti rispondiamo con la disponibilità aggiornata.`,
  },
  {
    q: "Quanto costa la spedizione?",
    a: `La spedizione è gratuita per tutti gli ordini superiori a ${formatPrice(store.freeShippingThreshold)}. Per gli altri casi trovi tutti i dettagli nei Termini e Condizioni.`,
  },
  {
    q: "Posso vedere e provare i capi in negozio?",
    a: `Certo, ti aspettiamo in boutique in ${store.address.street}, ${store.address.city}.`,
  },
  {
    q: "Quali marchi trovo da Jackie O'?",
    a: `Tra i marchi che selezioniamo: ${brands.join(", ")}.`,
  },
];

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-12 md:pt-20">
      <p className="eyebrow mb-3">Assistenza clienti</p>
      <h1 className="font-serif text-5xl md:text-7xl">Come possiamo aiutarti?</h1>

      <Block id="ordini" title="Ordini & spedizioni">
        <p>
          Aggiungi i capi alla bag e invia la richiesta d&apos;ordine via WhatsApp o email: la boutique ti contatta per
          confermare disponibilità, pagamento e consegna. Spedizione gratuita per ordini superiori a{" "}
          {formatPrice(store.freeShippingThreshold)}.
        </p>
      </Block>

      <Block id="taglie" title="Guida alle taglie">
        <SizeGuideTable />
      </Block>

      <Block id="faq" title="FAQ">
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm">
                {f.q}
                <span className="ml-4 text-lg font-light transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Block>

      <Block id="contatti" title="Contatti">
        <ul className="space-y-1">
          <li>{store.name} — {store.legalName}</li>
          <li>{store.address.street}, {store.address.city}</li>
          <li>Tel. {store.phone} · WhatsApp {store.whatsappDisplay}</li>
          <li>Email <a href={`mailto:${store.email}`} className="underline underline-offset-4">{store.email}</a></li>
        </ul>
      </Block>

      <Block id="termini" title="Termini e condizioni">
        <p>
          Le condizioni di vendita, i resi e i diritti di recesso sono disponibili nei{" "}
          <a href={termsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">Termini e Condizioni ufficiali</a>.
        </p>
      </Block>
      <Block id="privacy" title="Privacy">
        <p>
          Questo sito usa solo lo storage locale del browser per ricordare bag, wishlist e capi visti. Informativa privacy
          completa da inserire.
        </p>
      </Block>
    </section>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mt-16 scroll-mt-28 border-t border-line pt-10">
      <h2 className="mb-5 font-serif text-3xl md:text-4xl">{title}</h2>
      <div className="text-sm leading-relaxed text-ink/70">{children}</div>
    </div>
  );
}
