// Gera uma prévia do site em um único arquivo HTML (JS, CSS e imagens embutidos).
// Uso: npm run build:preview  →  dist-preview/haras-preview.html
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist-preview");
const assetsDir = join(dist, "assets");
const files = readdirSync(assetsDir);
const read = (f) => readFileSync(join(assetsDir, f), "utf8");
const css = files.filter((f) => f.endsWith(".css")).map(read).join("\n");
const js = files.filter((f) => f.endsWith(".js")).map(read).join("\n").replace(/<\/script/gi, "<\\/script");

const imgDir = join(root, "public", "images");
const images = Object.fromEntries(
  readdirSync(imgDir)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => [`/images/${f}`, `data:image/svg+xml;charset=utf-8,${encodeURIComponent(readFileSync(join(imgDir, f), "utf8"))}`]),
);

const html = `<title>Haras RV Fortunato</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${css}</style>
<div id="root"></div>
<script>window.__ASSETS__ = ${JSON.stringify(images)};</script>
<script type="module">${js}</script>
`;
const out = join(dist, "haras-preview.html");
writeFileSync(out, html);
console.log(`Prévia gerada: ${out} (${(html.length / 1024).toFixed(0)} KB)`);
