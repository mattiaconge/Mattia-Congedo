import type { NextConfig } from "next";

// Il sito viene esportato come HTML statico (cartella `out/`), pubblicabile
// su GitHub Pages o qualsiasi hosting statico. Per GitHub Pages il sito vive
// sotto /<nome-repo>, impostato tramite la variabile BASE_PATH.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
