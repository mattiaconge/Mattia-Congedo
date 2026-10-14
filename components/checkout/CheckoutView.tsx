"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MapPin, Truck } from "lucide-react";
import { FashionImage } from "@/components/ui/FashionImage";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";
import { store, whatsappLink } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";

type Delivery = "spedizione" | "ritiro";

interface FormState {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  cap: string;
  citta: string;
  note: string;
}

const steps = ["Dati", "Consegna", "Riepilogo"];

const emptyForm: FormState = { nome: "", cognome: "", email: "", telefono: "", indirizzo: "", cap: "", citta: "", note: "" };

/**
 * Checkout "assistito": raccoglie i dati e invia l'ordine precompilato
 * via WhatsApp o email. Il pagamento viene concordato con la boutique.
 * Per un pagamento online collegare qui Stripe / PayPal / Shopify.
 */
export function CheckoutView() {
  const { cart, cartTotal, clearCart } = useShop();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState<Delivery>("spedizione");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const freeShipping = cartTotal >= store.freeShippingThreshold;

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (current: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (current === 0) {
      if (!form.nome.trim()) e.nome = "Inserisci il nome";
      if (!form.cognome.trim()) e.cognome = "Inserisci il cognome";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email non valida";
      if (form.telefono.replace(/\D/g, "").length < 8) e.telefono = "Numero non valido";
    }
    if (current === 1 && delivery === "spedizione") {
      if (!form.indirizzo.trim()) e.indirizzo = "Inserisci l'indirizzo";
      if (!/^\d{5}$/.test(form.cap)) e.cap = "CAP di 5 cifre";
      if (!form.citta.trim()) e.citta = "Inserisci la città";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, steps.length - 1));

  const orderText = [
    `Ciao Jackie O'! Vorrei fare un ordine:`,
    ...cart.map((i) => {
      const p = getProductById(i.productId);
      return p ? `• ${p.name} — taglia ${i.size} × ${i.quantity} = ${formatPrice(p.price * i.quantity)}` : "";
    }),
    `Totale articoli: ${formatPrice(cartTotal)}`,
    "",
    `Nome: ${form.nome} ${form.cognome}`,
    `Email: ${form.email} · Tel: ${form.telefono}`,
    delivery === "ritiro"
      ? `Consegna: ritiro in boutique (${store.address.street}, Padova)`
      : `Consegna: spedizione a ${form.indirizzo}, ${form.cap} ${form.citta}${freeShipping ? " (spedizione gratuita)" : ""}`,
    form.note ? `Note: ${form.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const complete = () => {
    setSent(true);
    clearCart();
  };

  if (sent) {
    return (
      <Centered>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="h-7 w-7" />
        </motion.div>
        <h1 className="font-serif text-4xl md:text-5xl">Grazie, {form.nome}!</h1>
        <p className="mt-4 max-w-md text-sm text-ink/60">
          La tua richiesta d&apos;ordine è pronta. La boutique ti risponderà per confermare disponibilità, pagamento e consegna.
        </p>
        <Link href="/collezione" className="btn-primary mt-10">Continua lo shopping</Link>
      </Centered>
    );
  }

  if (cart.length === 0) {
    return (
      <Centered>
        <h1 className="font-serif text-4xl md:text-5xl">La tua bag è vuota</h1>
        <p className="mt-4 text-sm text-ink/60">Aggiungi qualche capo per procedere con l&apos;ordine.</p>
        <Link href="/collezione" className="btn-primary mt-10">Shop la collezione</Link>
      </Centered>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-12 md:px-8 md:pt-16">
      <h1 className="font-serif text-5xl md:text-6xl">Il tuo ordine</h1>

      {/* Stepper */}
      <ol className="mt-10 flex items-center gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-3">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors ${
                i <= step ? "border-ink bg-ink text-paper" : "border-line text-ink/40"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </button>
            <span className={`text-[11px] uppercase tracking-[0.2em] ${i <= step ? "" : "text-ink/40"}`}>{s}</span>
            {i < steps.length - 1 && (
              <span className="relative h-px flex-1 bg-line">
                <motion.span className="absolute inset-y-0 left-0 bg-ink" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome" value={form.nome} onChange={set("nome")} error={errors.nome} autoComplete="given-name" />
                  <Field label="Cognome" value={form.cognome} onChange={set("cognome")} error={errors.cognome} autoComplete="family-name" />
                  <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                  <Field label="Telefono" type="tel" value={form.telefono} onChange={set("telefono")} error={errors.telefono} autoComplete="tel" />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <DeliveryOption
                      active={delivery === "spedizione"}
                      onClick={() => setDelivery("spedizione")}
                      icon={<Truck className="h-5 w-5" strokeWidth={1.25} />}
                      title="Spedizione a domicilio"
                      text={freeShipping ? "Gratuita per il tuo ordine" : `Gratuita sopra ${formatPrice(store.freeShippingThreshold)}`}
                    />
                    <DeliveryOption
                      active={delivery === "ritiro"}
                      onClick={() => setDelivery("ritiro")}
                      icon={<MapPin className="h-5 w-5" strokeWidth={1.25} />}
                      title="Ritiro in boutique"
                      text={`${store.address.street}, Padova`}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {delivery === "spedizione" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 pt-2 sm:grid-cols-[1fr_120px_1fr]">
                          <div className="sm:col-span-3">
                            <Field label="Indirizzo e numero civico" value={form.indirizzo} onChange={set("indirizzo")} error={errors.indirizzo} autoComplete="street-address" />
                          </div>
                          <Field label="CAP" value={form.cap} onChange={set("cap")} error={errors.cap} autoComplete="postal-code" inputMode="numeric" />
                          <div className="sm:col-span-2">
                            <Field label="Città" value={form.citta} onChange={set("citta")} error={errors.citta} autoComplete="address-level2" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <label className="block">
                    <span className="mb-2 block text-[11px] uppercase tracking-[0.2em]">Note (facoltative)</span>
                    <textarea value={form.note} onChange={set("note")} rows={3} className="w-full border border-line p-3 text-sm outline-none focus:border-ink" placeholder="Es. confezione regalo, orario preferito…" />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <SummaryRow title="Contatti" onEdit={() => setStep(0)}>
                    {form.nome} {form.cognome}
                    <br />
                    {form.email} · {form.telefono}
                  </SummaryRow>
                  <SummaryRow title="Consegna" onEdit={() => setStep(1)}>
                    {delivery === "ritiro" ? `Ritiro in boutique — ${store.address.street}, ${store.address.city}` : `${form.indirizzo}, ${form.cap} ${form.citta}`}
                  </SummaryRow>
                  <p className="bg-mist p-4 text-xs leading-relaxed text-ink/70">
                    Invia la richiesta: la boutique ti contatterà per confermare la disponibilità dei capi e concordare il pagamento.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a href={whatsappLink(orderText)} target="_blank" rel="noreferrer" onClick={complete} className="btn-primary flex-1">
                      <WhatsAppIcon className="h-4 w-4" /> Invia su WhatsApp
                    </a>
                    <a
                      href={`mailto:${store.email}?subject=${encodeURIComponent(`Ordine da ${form.nome} ${form.cognome}`)}&body=${encodeURIComponent(orderText)}`}
                      onClick={complete}
                      className="btn-outline flex-1"
                    >
                      <Mail className="h-4 w-4" strokeWidth={1.25} /> Invia via email
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="text-[11px] uppercase tracking-[0.2em] text-ink/60 hover:text-ink">
                ← Indietro
              </button>
            ) : (
              <span />
            )}
            {step < steps.length - 1 && (
              <button onClick={next} className="btn-primary">
                Continua
              </button>
            )}
          </div>
        </div>

        {/* Riepilogo carrello */}
        <aside className="h-fit border border-line p-6 lg:sticky lg:top-28">
          <p className="mb-5 text-[11px] uppercase tracking-[0.2em]">Riepilogo</p>
          <ul className="space-y-4">
            {cart.map((i) => {
              const p = getProductById(i.productId);
              if (!p) return null;
              return (
                <li key={`${i.productId}-${i.size}`} className="flex gap-3">
                  <span className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-mist">
                    <FashionImage src={p.images[0]} alt={p.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-paper">{i.quantity}</span>
                  </span>
                  <div className="flex-1 text-xs">
                    <p className="uppercase tracking-[0.1em]">{p.name}</p>
                    <p className="text-ink/50">Taglia {i.size}</p>
                  </div>
                  <p className="text-xs">{formatPrice(p.price * i.quantity)}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 space-y-2 border-t border-line pt-4 text-xs">
            <div className="flex justify-between"><span>Subtotale</span><span>{formatPrice(cartTotal)}</span></div>
            <div className="flex justify-between">
              <span>Consegna</span>
              <span>{delivery === "ritiro" ? "Ritiro in boutique" : freeShipping ? "Gratuita" : "Da concordare"}</span>
            </div>
            <div className="flex items-baseline justify-between pt-2">
              <span className="uppercase tracking-[0.2em]">Totale</span>
              <span className="font-serif text-2xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">{children}</section>;
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Field({ label, error, ...props }: FieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[11px] uppercase tracking-[0.2em]">{label}</label>
      <input
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full border-b bg-transparent py-2 text-sm outline-none transition-colors focus:border-ink ${error ? "border-red-400" : "border-ink/30"}`}
      />
      {error && <span id={`${id}-err`} className="mt-1 block text-[11px] text-red-700">{error}</span>}
    </div>
  );
}

function DeliveryOption({ active, onClick, icon, title, text }: { active: boolean; onClick: () => void; icon: ReactNode; title: string; text: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-start gap-3 border p-4 text-left transition-colors ${active ? "border-ink" : "border-line hover:border-ink/50"}`}
    >
      <span className="mt-0.5">{icon}</span>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.15em]">{title}</span>
        <span className="mt-1 block text-xs text-ink/55">{text}</span>
      </span>
      <span className={`ml-auto mt-0.5 h-4 w-4 shrink-0 rounded-full border ${active ? "border-[5px] border-ink" : "border-line"}`} />
    </button>
  );
}

function SummaryRow({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-5">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em]">{title}</p>
        <p className="text-sm text-ink/70">{children}</p>
      </div>
      <button onClick={onEdit} className="self-start text-[10px] uppercase tracking-[0.2em] text-ink/50 underline underline-offset-4">
        Modifica
      </button>
    </div>
  );
}
