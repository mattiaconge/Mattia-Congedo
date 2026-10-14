"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image con fallback elegante: se la foto non si carica
 * mostra un fondo neutro con il monogramma del brand.
 */
export function FashionImage({ alt, className = "", ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex items-center justify-center bg-mist ${className}`}
      >
        <span className="font-serif text-3xl italic tracking-wide text-taupe/70">J·O</span>
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
