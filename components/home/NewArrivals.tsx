import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { FashionImage } from "@/components/ui/FashionImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getNewArrivals } from "@/lib/data/products";
import { unsplash } from "@/lib/format";

export function NewArrivals() {
  const items = getNewArrivals();
  const [first, second, ...rest] = items;

  return (
    <section id="nuovi-arrivi" className="mx-auto max-w-[1600px] scroll-mt-28 px-4 pt-20 md:px-8 md:pt-32">
      <Reveal>
        <SectionHeading
          eyebrow="In evidenza"
          title="Nuovi Arrivi"
          link={{ href: "/collezione", label: "Vedi tutto" }}
        />
      </Reveal>

      {/* Griglia asimmetrica: un blocco editoriale 2×2 tra le card prodotto */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4 lg:gap-y-14">
        {[first, second].map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProductCard product={p} priority={i === 0} />
          </Reveal>
        ))}

        <Reveal className="col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <Link href="/collezione" className="group relative block aspect-[4/5] h-full w-full overflow-hidden bg-mist lg:aspect-auto">
            <FashionImage
              src={unsplash("1469334031218-e382a71b716b", 1600)}
              alt="Lookbook nuova collezione"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-paper md:p-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-paper/80">Lookbook · Vol. 01</p>
              <p className="font-serif text-4xl leading-none md:text-6xl">
                Essenziale,
                <br />
                <em className="font-light">mai banale.</em>
              </p>
              <span className="link-underline mt-6 inline-block text-[11px] uppercase tracking-[0.2em]">Scopri il lookbook</span>
            </div>
          </Link>
        </Reveal>

        {rest.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.08}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
