import Link from "next/link";
import { FashionImage } from "@/components/ui/FashionImage";
import { Reveal } from "@/components/ui/Reveal";
import { getProductById } from "@/lib/data/products";
import { trendStories } from "@/lib/data/store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function TrendEditorial() {
  return (
    <section id="trend" className="scroll-mt-28 pt-24 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <Reveal className="mb-14 text-center md:mb-24">
          <p className="eyebrow mb-4">Il magazine</p>
          <h2 className="font-serif text-5xl md:text-8xl">
            Trend <em className="font-light">&amp;</em> Ispirazioni
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-40">
          {trendStories.map((story, i) => {
            const shopTheLook = story.productIds
              .map(getProductById)
              .filter((p): p is Product => Boolean(p));
            const reversed = i % 2 === 1;

            return (
              <article key={story.id} className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                <Reveal className={`relative aspect-[3/4] overflow-hidden bg-mist md:col-span-7 ${reversed ? "md:order-2 md:col-start-6" : ""}`}>
                  <FashionImage
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width:768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>

                <Reveal
                  delay={0.15}
                  className={`md:col-span-4 ${reversed ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
                >
                  <p className="font-serif text-7xl text-gold/70 md:text-8xl">{story.number}</p>
                  <p className="eyebrow mb-3 mt-4">{story.kicker}</p>
                  <h3 className="font-serif text-4xl leading-tight md:text-5xl">{story.title}</h3>
                  <p className="mt-6 text-sm leading-relaxed text-ink/70">{story.text}</p>

                  <p className="mb-4 mt-10 text-[11px] uppercase tracking-[0.25em]">Shop the look</p>
                  <ul className="divide-y divide-line border-y border-line">
                    {shopTheLook.map((p) => (
                      <li key={p.id}>
                        <Link href={`/prodotto/${p.slug}`} className="group flex items-center gap-4 py-3">
                          <span className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-mist">
                            <FashionImage src={p.images[0]} alt={p.name} fill sizes="56px" className="object-cover" />
                          </span>
                          <span className="flex-1 text-[11px] uppercase tracking-[0.12em] transition-colors group-hover:text-taupe">
                            {p.name}
                          </span>
                          <span className="text-xs">{formatPrice(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>

      {/* Banner a tutta larghezza */}
      <Reveal className="mt-24 bg-mist md:mt-40">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4 py-20 text-center md:px-8 md:py-28">
          <p className="eyebrow mb-6">Personal shopping</p>
          <p className="max-w-3xl font-serif text-3xl leading-snug md:text-5xl">
            &ldquo;Lo stile non si compra: si costruisce, un capo alla volta. Noi siamo qui per aiutarti a trovarlo.&rdquo;
          </p>
          <Link href="/#boutique" className="btn-outline mt-10">
            Prenota una consulenza in boutique
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
