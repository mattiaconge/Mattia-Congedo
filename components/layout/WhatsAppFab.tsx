"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { whatsappLink } from "@/lib/data/store";

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink("Ciao Jackie O'! Vorrei qualche informazione.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrivici su WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-ink pl-4 pr-4 text-paper shadow-lg transition-all duration-500 hover:gap-3 hover:pr-6 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.2em] transition-all duration-500 group-hover:max-w-40">
        Scrivici
      </span>
    </motion.a>
  );
}
