import { brands } from "@/lib/data/products";

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <section aria-label="I nostri brand" className="overflow-hidden border-y border-line py-6 md:py-8">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-14 pr-14 hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-24 md:pr-24">
        {[...row, ...row].map((b, i) => (
          <span key={i} className="whitespace-nowrap font-serif text-3xl italic text-ink/70 md:text-5xl">
            {b}
            <span className="ml-14 not-italic text-gold md:ml-24">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
