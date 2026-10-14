import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FashionImage } from "@/components/ui/FashionImage";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { boutiqueImage, instagramPosts, mapsEmbedUrl, store, whatsappLink } from "@/lib/data/store";

export function BoutiqueSection() {
  return (
    <section id="boutique" className="mx-auto max-w-[1600px] scroll-mt-28 px-4 pt-24 md:px-8 md:pt-40">
      {/* Storia & concept */}
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <p className="eyebrow mb-4">La boutique</p>
          <h2 className="font-serif text-5xl leading-[1.02] md:text-7xl">
            Jackie O&apos;,
            <br />
            <em className="font-light">nel cuore di Padova</em>
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink/70 md:text-base">
            <p>
              Ispirata all&apos;eleganza senza tempo di un&apos;icona, Jackie O&apos; è una boutique nata dalla passione per
              la moda che sa essere ricercata e, allo stesso tempo, da vivere ogni giorno.
            </p>
            <p>
              Selezioniamo collezioni e capi di tendenza stagione dopo stagione, con un occhio attento ai materiali, alla
              vestibilità e ai dettagli. Ma soprattutto crediamo nella cura del cliente: un consiglio sincero, un abbinamento
              pensato per te, il piacere di sentirsi a casa.
            </p>
          </div>
          <a href={whatsappLink("Ciao Jackie O'! Vorrei qualche informazione.")} target="_blank" rel="noreferrer" className="btn-primary mt-10">
            <WhatsAppIcon className="h-4 w-4" />
            Scrivici su WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden bg-mist md:col-span-6 md:col-start-7 md:aspect-auto md:min-h-[640px]">
          <FashionImage src={boutiqueImage} alt="Interno della boutique Jackie O' Padova" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </Reveal>
      </div>

      {/* Info & mappa */}
      <div className="mt-20 grid border border-line md:mt-32 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-10 p-6 md:p-12">
          <h3 className="font-serif text-3xl md:text-4xl">Vieni a trovarci</h3>
          <InfoRow icon={<MapPin className="h-4 w-4" strokeWidth={1.25} />} title="Indirizzo">
            {store.address.street}
            <br />
            {store.address.city}
          </InfoRow>
          <InfoRow icon={<Clock className="h-4 w-4" strokeWidth={1.25} />} title="Orari di apertura">
            <dl className="space-y-1.5">
              {store.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <dt>{h.days}</dt>
                  <dd className="text-right text-ink/60">{h.time}</dd>
                </div>
              ))}
            </dl>
          </InfoRow>
          <InfoRow icon={<Phone className="h-4 w-4" strokeWidth={1.25} />} title="Contatti">
            <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="link-underline">{store.phone}</a>
            <br />
            <a href={`mailto:${store.email}`} className="link-underline inline-flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.25} />
              {store.email}
            </a>
          </InfoRow>
        </Reveal>
        <div className="relative min-h-[360px] border-t border-line bg-mist lg:border-l lg:border-t-0">
          <iframe
            title="Mappa boutique Jackie O' Padova"
            src={mapsEmbedUrl}
            className="absolute inset-0 h-full w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Instagram feed */}
      <div className="mt-20 md:mt-32">
        <Reveal className="mb-8 flex flex-col items-center gap-3 text-center">
          <InstagramIcon className="h-6 w-6" />
          <p className="font-serif text-3xl md:text-4xl">Seguici su Instagram</p>
          <a href={store.instagram.url} target="_blank" rel="noreferrer" className="link-underline text-[11px] uppercase tracking-[0.25em]">
            {store.instagram.handle}
          </a>
        </Reveal>
        {/* Feed statico: per il feed live collegare la Instagram Graph API (vedi README) */}
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-2">
          {instagramPosts.map((src, i) => (
            <a
              key={src}
              href={store.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden bg-mist"
              aria-label={`Post Instagram ${i + 1}`}
            >
              <FashionImage src={src} alt="" fill sizes="(min-width:768px) 16vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-paper opacity-0 transition-all duration-500 group-hover:bg-ink/30 group-hover:opacity-100">
                <InstagramIcon className="h-6 w-6" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 text-taupe">{icon}</span>
      <div className="flex-1 text-sm leading-relaxed">
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em]">{title}</p>
        {children}
      </div>
    </div>
  );
}
