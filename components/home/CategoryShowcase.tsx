import Link from "next/link";
import { FashionImage } from "@/components/ui/FashionImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/data/categories";

// Composizione "da rivista": blocchi di dimensioni diverse su griglia a 12 colonne
const layout = [
  "lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]",
  "lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]",
  "lg:col-span-4 aspect-[4/5]",
  "lg:col-span-4 aspect-[4/5] lg:mt-16",
  "lg:col-span-4 aspect-[4/5]",
];

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-24 md:px-8 md:pt-40">
      <Reveal>
        <SectionHeading eyebrow="Shop by category" title="Style Guide" />
      </Reveal>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-12">
        {categories.map((c, i) => (
          <Reveal
            key={c.slug}
            delay={(i % 3) * 0.08}
            className={`${i === 0 ? "col-span-2" : ""} ${layout[i]} relative`}
          >
            <Link href={`/collezione?categoria=${c.slug}`} className="group absolute inset-0 block overflow-hidden bg-mist">
              <FashionImage
                src={c.image}
                alt={c.name}
                fill
                sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 40vw, 50vw"}
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-80" />
              <span className="absolute left-3 top-3 border border-paper/70 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-paper md:left-5 md:top-5">
                {c.label}
              </span>
              <div className="absolute bottom-0 left-0 p-4 text-paper md:p-7">
                <p className="text-[10px] tracking-[0.3em] text-paper/70">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`font-serif leading-none ${i === 0 ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl"}`}>{c.name}</h3>
                <p className="mt-2 hidden max-w-xs text-xs text-paper/80 md:block">{c.tagline}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
