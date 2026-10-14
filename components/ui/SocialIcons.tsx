import type { SVGProps } from "react";

// lucide-react non include più le icone dei brand: SVG minimali inline.
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const InstagramIcon = (props: IconProps) => (
  <svg {...base} {...props} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const FacebookIcon = (props: IconProps) => (
  <svg {...base} {...props} aria-hidden="true">
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

export const TikTokIcon = (props: IconProps) => (
  <svg {...base} {...props} aria-hidden="true">
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3a5 5 0 0 0 5 5" />
  </svg>
);

export const WhatsAppIcon = (props: IconProps) => (
  <svg {...base} {...props} aria-hidden="true">
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4Z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.8-2.8l.8-1-1-2Z" />
  </svg>
);
