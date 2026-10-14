import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}

export function SectionHeading({ eyebrow, title, link }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-serif text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      </div>
      {link && (
        <Link href={link.href} className="link-underline group inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] md:self-auto">
          {link.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
