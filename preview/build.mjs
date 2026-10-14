// Genera un'anteprima del sito in UN SOLO file HTML (CSS e JS incorporati),
// apribile con un doppio clic senza server: `npm run preview:build`.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "preview", "dist");
mkdirSync(dist, { recursive: true });

const shim = (f) => join(root, "preview", "shims", f);

const js = await build({
  entryPoints: [join(root, "preview", "main.tsx")],
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: {
    "next/link": shim("next-link.tsx"),
    "next/image": shim("next-image.tsx"),
    "next/navigation": shim("next-navigation.ts"),
  },
  logLevel: "warning",
  logOverride: { "unsupported-directive": "silent" },
});

const cssFile = join(dist, "preview.css");
execFileSync(
  join(root, "node_modules", ".bin", "tailwindcss"),
  ["-i", join(root, "app", "globals.css"), "-o", cssFile, "--minify"],
  { cwd: root, stdio: "inherit" },
);
const css = readFileSync(cssFile, "utf8");
const script = js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

const html = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Jackie O' Padova</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>:root{--font-cormorant:"Cormorant Garamond";--font-inter:"Inter"}</style>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${script}</script>
</body>
</html>`;

const out = join(dist, "jackie-o-anteprima.html");
writeFileSync(out, html);
console.log(`Anteprima creata: ${out} (${Math.round(html.length / 1024)} KB)`);
