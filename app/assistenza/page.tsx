import type { Metadata } from "next";
import { store } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Assistenza",
  description: "Spedizioni, resi, FAQ e guida alle taglie di Jackie O' Padova.",
};

const faqs = [
  {
    q: "Posso ritirare il mio ordine in boutique?",
    a: "Certo. Scegli il ritiro in negozio: ti avviseremo via WhatsApp quando il tuo ordine sarà pronto, senza costi aggiuntivi.",
  },
  {
    q: "Posso prenotare un capo e provarlo in negozio?",
    a: "Sì, scrivici su WhatsApp indicando il capo e la taglia: lo mettiamo da parte per 48 ore.",
  },
  {
    q: "Offrite un servizio di personal shopping?",
    a: "Sì, su appuntamento. Ti aiutiamo a costruire look e guardaroba di stagione in base al tuo stile e alle tue occasioni.",
  },
  {
    q: "Quali metodi di pagamento accettate?",
    a: "In boutique accettiamo contanti, carte di credito e debito e pagamenti contactless. Per gli ordini a distanza concordiamo il pagamento via link sicuro.",
  },
];

const sizeGuide = [
  ["XS", "38", "80–84", "62–66", "86–90"],
  ["S", "40", "84–88", "66–70", "90–94"],
  ["M", "42", "88–92", "70–74", "94–98"],
  ["L", "44", "92–96", "74–78", "98–102"],
  ["XL", "46", "96–100", "78–82", "102–106"],
];

export default function SupportPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-12 md:pt-20">
      <p className="eyebrow mb-3">Assistenza clienti</p>
      <h1 className="font-serif text-5xl md:text-7xl">Come possiamo aiutarti?</h1>

      <Block id="spedizioni" title="Spedizioni">
        <p>
          Spediamo in tutta Italia con corriere espresso in 24/48 ore lavorative. La spedizione è gratuita per ordini superiori a{" "}
          {formatPrice(store.freeShippingThreshold)}; al di sotto il costo è di {formatPrice(7.9)}.
        </p>
      </Block>

      <Block id="resi" title="Resi e cambi">
        <p>
          Hai 14 giorni dalla consegna per richiedere un reso o un cambio. I capi devono essere integri, non indossati e con
          etichette. Puoi effettuare il cambio direttamente in boutique a Padova.
        </p>
      </Block>

      <Block id="taglie" title="Guida alle taglie">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-xs">
            <thead>
              <tr className="border-b border-ink text-[10px] uppercase tracking-[0.2em]">
                {["Taglia", "IT", "Seno (cm)", "Vita (cm)", "Fianchi (cm)"].map((h) => (
                  <th key={h} className="py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, i) => (
                    <td key={i} className="py-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block id="faq" title="FAQ">
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm">
                {f.q}
                <span className="ml-4 text-lg font-light transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* Testi legali: da sostituire con quelli forniti dal consulente/legale del negozio */}
      <Block id="privacy" title="Privacy Policy">
        <p>Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR). Testo in fase di redazione.</p>
      </Block>
      <Block id="cookie" title="Cookie Policy">
        <p>Questo sito utilizza esclusivamente cookie tecnici e lo storage locale del browser per ricordare bag e wishlist. Testo completo in fase di redazione.</p>
      </Block>
      <Block id="termini" title="Termini di vendita">
        <p>Condizioni generali di vendita. Testo in fase di redazione.</p>
      </Block>
    </section>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28 border-t border-line pt-10 mt-16">
      <h2 className="mb-5 font-serif text-3xl md:text-4xl">{title}</h2>
      <div className="text-sm leading-relaxed text-ink/70">{children}</div>
    </div>
  );
}
