"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FashionImage } from "@/components/ui/FashionImage";
import { heroSlides } from "@/lib/data/store";

const INTERVAL = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const slide = heroSlides[index];

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduce, next]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Collezioni in evidenza"
      className="relative h-[calc(100svh-6rem)] min-h-[560px] w-full overflow-hidden bg-ink md:h-[calc(100svh-7rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.2, ease: "linear" }}
          >
            <FashionImage
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-top"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-ink/5" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-16 text-paper md:px-8 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-paper/80">{slide.eyebrow}</p>
            <h1 className="font-serif text-6xl font-light leading-[0.95] md:text-8xl lg:text-[8.5rem]">{slide.title}</h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/85 md:text-base">{slide.subtitle}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={slide.cta.href} className="btn-light">
                {slide.cta.label}
              </Link>
              <Link href={slide.secondary.href} className="btn-ghost-light">
                {slide.secondary.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicatori */}
        <div className="absolute bottom-6 right-4 flex items-center gap-3 md:bottom-10 md:right-8">
          <span className="text-[10px] tabular-nums tracking-[0.2em] text-paper/80">
            {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Vai alla slide ${i + 1}`}
              aria-current={i === index}
              className="relative h-px w-8 overflow-hidden bg-paper/30 md:w-12"
            >
              {i === index && (
                <motion.span
                  key={`${s.id}-${paused}`}
                  className="absolute inset-y-0 left-0 bg-paper"
                  initial={{ width: paused || reduce ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
