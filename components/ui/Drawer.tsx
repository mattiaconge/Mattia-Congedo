"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Drawer({ open, onClose, side, title, children, footer }: DrawerProps) {
  const offset = side === "left" ? "-100%" : "100%";
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.aside
            className={`absolute top-0 flex h-full w-full max-w-md flex-col bg-paper ${side === "left" ? "left-0" : "right-0"}`}
            initial={{ x: offset }}
            animate={{ x: 0 }}
            exit={{ x: offset }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 md:px-8">
              <span className="text-xs uppercase tracking-[0.25em]">{title}</span>
              <button onClick={onClose} aria-label="Chiudi" className="-mr-2 p-2">
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && <div className="shrink-0 border-t border-line">{footer}</div>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
