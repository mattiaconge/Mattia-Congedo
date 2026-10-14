"use client";

import { useRef, useState, type MouseEvent } from "react";
import { FashionImage } from "@/components/ui/FashionImage";

interface ProductGalleryProps {
  images: string[];
  name: string;
  compact?: boolean;
}

/**
 * Galleria prodotto: swipe con indicatori su mobile,
 * immagine principale con zoom che segue il mouse + miniature su desktop.
 */
export function ProductGallery({ images, name, compact = false }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    setActive(i);
    trackRef.current?.scrollTo({ left: i * (trackRef.current?.clientWidth ?? 0), behavior: "smooth" });
  };

  return (
    <div className="md:flex md:gap-3">
      {/* Miniature (desktop) */}
      <div className={`hidden flex-col gap-2 md:flex ${compact ? "w-14" : "w-20"}`}>
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => goTo(i)}
            aria-label={`Mostra immagine ${i + 1}`}
            className={`relative aspect-[3/4] w-full overflow-hidden bg-mist transition-opacity ${active === i ? "opacity-100 ring-1 ring-ink" : "opacity-50 hover:opacity-100"}`}
          >
            <FashionImage src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:overflow-hidden"
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-mist md:cursor-zoom-in"
              onMouseMove={onMove}
              onMouseLeave={() => setZoom(null)}
            >
              <FashionImage
                src={src}
                alt={i === 0 ? name : `${name} — vista ${i + 1}`}
                fill
                priority={i === 0}
                sizes={compact ? "(min-width:768px) 40vw, 100vw" : "(min-width:1024px) 50vw, 100vw"}
                className="object-cover transition-transform duration-300 ease-out"
                style={
                  zoom && active === i
                    ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {/* Indicatori (mobile) */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Immagine ${i + 1}`}
              className={`h-1 rounded-full transition-all ${active === i ? "w-6 bg-ink" : "w-2 bg-ink/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
