// Gera imagens placeholder (SVG) no clima do haras em public/images.
// Uso: node scripts/gerar-placeholders.mjs
// Substitua esses arquivos pelas fotos reais quando tiver (pode ser .jpg/.webp,
// basta atualizar o caminho em src/data/*.ts).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(out, { recursive: true });

const palettes = {
  manha: { sky1: "#e9e4d0", sky2: "#c9d3b4", sun: "#f3e3a8", h1: "#9aa77a", h2: "#6f7d4f", h3: "#4a5634", ground: "#b99c6b", ink: "#2c2419" },
  tarde: { sky1: "#efe2c4", sky2: "#d7c79a", sun: "#f1d58a", h1: "#a3a06a", h2: "#737a48", h3: "#4d5530", ground: "#a8875a", ink: "#2a2117" },
  por: { sky1: "#f2c79a", sky2: "#d98f63", sun: "#f8dd9c", h1: "#8e6b4c", h2: "#5f4a36", h3: "#3b2f24", ground: "#6d5238", ink: "#1f1812" },
  sombra: { sky1: "#dfe3d3", sky2: "#aebb98", sun: "#eef0dc", h1: "#7f8f63", h2: "#57663f", h3: "#36422a", ground: "#8a7556", ink: "#232019" },
  areia: { sky1: "#f4ede0", sky2: "#e7dcc6", sun: "#efe2c4", h1: "#dccdb0", h2: "#cdb993", h3: "#b9a17a", ground: "#c9b08a", ink: "#3a2c1f" },
};

const tree = (x, y, s, c) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="0" width="12" height="60" fill="${c}"/><ellipse cx="0" cy="-20" rx="46" ry="58" fill="${c}"/><ellipse cx="-26" cy="4" rx="30" ry="34" fill="${c}"/><ellipse cx="28" cy="0" rx="32" ry="36" fill="${c}"/></g>`;

// Cavalo estilizado, olhando para a direita. Origem nas patas.
const horse = (x, y, s, c, rider = false, flip = false) => `
<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="${c}">
  <ellipse cx="0" cy="-150" rx="115" ry="52"/>
  <path d="M70 -185 C 100 -230 120 -270 150 -300 L 190 -290 C 205 -270 210 -255 200 -240 L 160 -235 C 145 -205 130 -175 110 -140 Z"/>
  <path d="M150 -300 C 170 -318 200 -312 215 -296 L 232 -262 C 236 -250 226 -242 214 -246 L 186 -258 Z"/>
  <path d="M158 -306 L 164 -334 L 176 -308 Z"/>
  <path d="M135 -290 C 110 -270 90 -230 72 -196 L 86 -190 C 104 -226 124 -262 146 -282 Z" opacity=".75"/>
  <path d="M-110 -165 C -150 -150 -170 -100 -160 -40 C -150 -80 -140 -120 -105 -135 Z"/>
  <rect x="-95" y="-130" width="20" height="130" rx="8"/>
  <rect x="-60" y="-125" width="20" height="125" rx="8"/>
  <rect x="55" y="-125" width="20" height="125" rx="8"/>
  <rect x="85" y="-130" width="20" height="130" rx="8"/>
  ${rider ? `<path d="M-30 -200 C -35 -250 -20 -290 5 -300 C 30 -290 40 -250 35 -200 Z"/><circle cx="5" cy="-322" r="22"/><path d="M-22 -334 L 32 -334 L 24 -346 L -14 -346 Z"/><path d="M-5 -205 L 25 -205 L 30 -140 L 15 -140 Z"/>` : ""}
</g>`;

const sheep = (x, y, s, c) => `
<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
  <ellipse cx="0" cy="-80" rx="80" ry="50"/><circle cx="-50" cy="-100" r="34"/><circle cx="10" cy="-122" r="36"/><circle cx="55" cy="-100" r="32"/>
  <ellipse cx="95" cy="-100" rx="28" ry="22"/><rect x="-50" y="-50" width="14" height="50" rx="6"/><rect x="-15" y="-50" width="14" height="50" rx="6"/><rect x="25" y="-50" width="14" height="50" rx="6"/><rect x="55" y="-50" width="14" height="50" rx="6"/>
</g>`;

const hen = (x, y, s, c) => `
<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">
  <ellipse cx="0" cy="-70" rx="60" ry="45"/><path d="M-50 -90 C -90 -150 -100 -80 -60 -55 Z"/><circle cx="45" cy="-120" r="24"/>
  <path d="M40 -145 C 45 -165 60 -160 58 -142 Z"/><path d="M66 -122 L 84 -115 L 66 -110 Z"/><rect x="-10" y="-30" width="6" height="30"/><rect x="12" y="-30" width="6" height="30"/>
</g>`;

const scene = ({ w = 1200, h = 800, p, subject = "", title = "", sunX = 0.75, trees = true }) => {
  const P = palettes[p];
  const t = trees
    ? [tree(w * 0.08, h * 0.62, 1.3, P.h3), tree(w * 0.2, h * 0.6, 1, P.h2), tree(w * 0.9, h * 0.6, 1.4, P.h3), tree(w * 0.78, h * 0.63, 0.9, P.h2), tree(w * 0.36, h * 0.58, 0.6, P.h2)].join("")
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky1}"/><stop offset="1" stop-color="${P.sky2}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#s)"/>
<circle cx="${w * sunX}" cy="${h * 0.3}" r="${h * 0.11}" fill="${P.sun}"/>
<path d="M0 ${h * 0.55} C ${w * 0.25} ${h * 0.45} ${w * 0.5} ${h * 0.6} ${w} ${h * 0.5} L ${w} ${h} L 0 ${h} Z" fill="${P.h1}"/>
<path d="M0 ${h * 0.65} C ${w * 0.3} ${h * 0.58} ${w * 0.6} ${h * 0.7} ${w} ${h * 0.62} L ${w} ${h} L 0 ${h} Z" fill="${P.h2}"/>
${t}
<path d="M0 ${h * 0.8} C ${w * 0.3} ${h * 0.74} ${w * 0.7} ${h * 0.84} ${w} ${h * 0.78} L ${w} ${h} L 0 ${h} Z" fill="${P.h3}"/>
<path d="M${w * 0.42} ${h} C ${w * 0.47} ${h * 0.9} ${w * 0.5} ${h * 0.84} ${w * 0.55} ${h * 0.79} L ${w * 0.6} ${h * 0.79} C ${w * 0.6} ${h * 0.86} ${w * 0.64} ${h * 0.93} ${w * 0.72} ${h} Z" fill="${P.ground}" opacity=".8"/>
${subject}
</svg>`;
};

// Produto: fundo areia com um objeto simples ao centro.
const product = (shape, bg = "#efe6d4", ink = "#6b4a2e", accent = "#c9a45c") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img">
<rect width="800" height="800" fill="${bg}"/><circle cx="400" cy="400" r="260" fill="#fff" opacity=".35"/>
<ellipse cx="400" cy="640" rx="200" ry="22" fill="${ink}" opacity=".15"/>
${shape(ink, accent)}
</svg>`;

const shapes = {
  cabresto: (i, a) => `<g fill="none" stroke="${i}" stroke-width="26" stroke-linecap="round"><path d="M280 260 C 280 420 330 560 400 600 C 470 560 520 420 520 260"/><path d="M280 330 L 520 330"/><path d="M320 480 L 480 480"/></g><circle cx="400" cy="600" r="26" fill="${a}"/><circle cx="280" cy="330" r="18" fill="${a}"/><circle cx="520" cy="330" r="18" fill="${a}"/>`,
  sela: (i, a) => `<path d="M200 430 C 260 330 330 360 400 380 C 470 360 540 330 600 430 C 560 470 480 480 400 470 C 320 480 240 470 200 430 Z" fill="${i}"/><path d="M330 470 L 320 600 L 360 600 L 370 470 Z" fill="${i}" opacity=".8"/><circle cx="340" cy="615" r="22" fill="none" stroke="${a}" stroke-width="10"/><path d="M300 400 C 350 380 450 380 500 400" stroke="${a}" stroke-width="8" fill="none"/>`,
  pote: (i, a) => `<rect x="290" y="330" width="220" height="280" rx="40" fill="${a}"/><rect x="280" y="270" width="240" height="70" rx="14" fill="${i}"/><rect x="320" y="420" width="160" height="100" rx="10" fill="#fff" opacity=".8"/><rect x="345" y="450" width="110" height="12" rx="6" fill="${i}"/><rect x="365" y="478" width="70" height="10" rx="5" fill="${i}" opacity=".6"/>`,
  queijo: (i, a) => `<path d="M220 520 L 580 520 L 580 420 L 260 330 Z" fill="${a}"/><path d="M220 520 L 260 330 L 260 420 Z" fill="${i}" opacity=".25"/><circle cx="360" cy="450" r="22" fill="${i}" opacity=".25"/><circle cx="480" cy="480" r="16" fill="${i}" opacity=".25"/><circle cx="520" cy="440" r="12" fill="${i}" opacity=".25"/>`,
  caneca: (i, a) => `<rect x="280" y="300" width="220" height="300" rx="30" fill="${i}"/><path d="M500 360 C 600 360 600 520 500 520" fill="none" stroke="${i}" stroke-width="30"/><text x="390" y="470" text-anchor="middle" font-family="Georgia,serif" font-size="70" font-weight="700" fill="${a}">RV</text>`,
  bone: (i, a) => `<path d="M230 470 C 230 330 330 270 420 270 C 520 270 580 350 580 470 Z" fill="${i}"/><path d="M230 470 C 380 450 520 470 660 520 C 560 540 420 520 230 500 Z" fill="${i}" opacity=".85"/><circle cx="410" cy="272" r="14" fill="${a}"/><text x="410" y="420" text-anchor="middle" font-family="Georgia,serif" font-size="56" font-weight="700" fill="${a}">RV</text>`,
};

const files = {
  "hero.svg": scene({ w: 1600, h: 1000, p: "tarde", title: "Cavalo com cavaleiro em trilha", subject: horse(820, 900, 1.25, "#2a2117", true) }),
  "og-cover.svg": scene({ w: 1200, h: 630, p: "tarde", subject: horse(620, 580, 0.9, "#2a2117", true) }),
  "escolha-passeios.svg": scene({ p: "manha", subject: horse(560, 740, 1.05, "#2c2419", true) }),
  "escolha-produtos.svg": product(shapes.sela, "#e9dcc3"),
  "escolha-animais.svg": scene({ p: "sombra", subject: horse(420, 740, 0.9, "#232019") + horse(820, 750, 0.6, "#3a3226", false, true) }),
  "passeio-guiado.svg": scene({ p: "manha", subject: horse(460, 740, 0.9, "#2c2419", true) + horse(800, 720, 0.7, "#3b3124", true) }),
  "passeio-por-do-sol.svg": scene({ p: "por", sunX: 0.5, subject: horse(600, 740, 1, "#1f1812", true) }),
  "passeio-infantil.svg": scene({ p: "areia", subject: horse(600, 740, 0.7, "#5a4330", true) }),
  "como-chegar.svg": scene({ p: "sombra", title: "Estrada de terra até o haras" }),
  "produto-cabresto.svg": product(shapes.cabresto),
  "produto-sela.svg": product(shapes.sela, "#e6d9c0"),
  "produto-doce-de-leite.svg": product(shapes.pote, "#f1e7d2", "#5b3a22", "#b98a4a"),
  "produto-queijo.svg": product(shapes.queijo, "#eee4cc", "#6b4a2e", "#e2c173"),
  "produto-caneca.svg": product(shapes.caneca, "#e4e6d6", "#3f4a2c", "#d8b86a"),
  "produto-bone.svg": product(shapes.bone, "#ece3d0", "#4a5634", "#d8b86a"),
};

const animais = [
  ["trovao", (p) => horse(600, 740, 1.05, palettes[p].ink)],
  ["estrela", (p) => horse(600, 740, 1.05, "#5b3f28")],
  ["cigano", (p) => horse(600, 740, 1.05, palettes[p].ink, false, true)],
  ["pipoca", (p) => horse(600, 740, 0.7, "#6b4a2e")],
  ["mel", (p) => horse(600, 740, 0.65, "#8a6440", false, true)],
  ["lua", (p) => sheep(520, 740, 1.4, "#f5f0e6") + hen(860, 760, 0.9, palettes[p].ink)],
];
const views = ["manha", "tarde", "por"];
for (const [nome, subj] of animais) {
  views.forEach((p, i) => {
    files[`animal-${nome}-${i + 1}.svg`] = scene({ p, subject: subj(p), sunX: [0.75, 0.25, 0.5][i] });
  });
}

for (const [name, svg] of Object.entries(files)) writeFileSync(join(out, name), svg.trim() + "\n");
console.log(`${Object.keys(files).length} imagens geradas em public/images`);
