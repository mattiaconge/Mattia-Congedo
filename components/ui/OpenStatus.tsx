"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/data/store";

/** Badge "Aperto ora / Chiuso" aggiornato ogni minuto */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  if (!status) return null;
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${className}`}>
      <span className="relative flex h-2 w-2">
        {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? "bg-emerald-500" : "bg-taupe"}`} />
      </span>
      {status.label}
    </span>
  );
}
