// ==========================================================================
// CONFIGURAÇÃO DA LOJA
// Troque estes valores pelos dados reais da Moraes Pipas antes de publicar.
// ==========================================================================
const CONFIG = {
  // Número de WhatsApp no formato internacional, só dígitos (55 + DDD + número).
  // TODO: não encontramos o WhatsApp da loja — este é o telefone fixo informado,
  // (11) 5278-1005. Troque pelo número de WhatsApp real assim que possível.
  WHATSAPP: "551152781005",

  // Horário de funcionamento usado para o selo "Aberto agora".
  // TODO: só confirmamos o horário de fechamento (20h). O horário de abertura (8h)
  // é uma suposição — ajuste para o horário real da loja.
  OPEN_HOUR: 8,
  CLOSE_HOUR: 20,

  // Endereço exibido e usado no mapa / rota.
  // TODO: substituir pelo endereço real da loja.
  ADDRESS: "Endereço a confirmar — Moraes Pipas",

  // Link do perfil do Google para "Ver avaliações no Google".
  // TODO: trocar pelo link real do Google Meu Negócio da loja.
  GOOGLE_REVIEWS_URL: "https://www.google.com/search?q=Moraes+Pipas",

  // TODO: confirmar/trocar pelos perfis reais.
  INSTAGRAM_URL: "https://www.instagram.com/moraespipas",
  TIKTOK_URL: "https://www.tiktok.com/@moraespipas",
};

// ==========================================================================
// CATÁLOGO DE PRODUTOS (EXEMPLO)
// As imagens abaixo são só ícones/placeholders. Os itens de "Fumaça Colorida"
// e outros exemplos genéricos precisam ser substituídos pelos produtos reais
// vendidos pela loja.
// ==========================================================================
const CATALOG = [
  {
    id: "rojoes",
    name: "Rojões",
    products: [
      { name: "Rojão Simples", price: "R$ 3,50", desc: "Sobe com assobio e estampido sonoro.", icon: "🎇" },
      { name: "Rojão Duplo", price: "R$ 6,00", desc: "Dois estampidos em sequência.", icon: "🎇" },
    ],
  },
  {
    id: "bombinhas",
    name: "Bombinhas e Buscapés",
    products: [
      { name: "Bombinha (pacote c/ 10)", price: "R$ 8,00", desc: "Estouro seco tradicional.", icon: "💥" },
      { name: "Buscapé (pacote c/ 10)", price: "R$ 7,00", desc: "Rasteja no chão antes de estourar.", icon: "💥" },
    ],
  },
  {
    id: "baterias",
    name: "Baterias de Fogos",
    products: [
      { name: "Bateria 25 Tiros", price: "R$ 45,00", desc: "Sequência colorida automática.", icon: "🎆" },
      { name: "Bateria 50 Tiros", price: "R$ 85,00", desc: "Show maior para festas.", icon: "🎆" },
    ],
  },
  {
    id: "fontes",
    name: "Fontes e Chuveirinhos",
    products: [
      { name: "Fonte Luminosa P", price: "R$ 12,00", desc: "Jato de faíscas coloridas fixo no chão.", icon: "✨" },
      { name: "Chuveirinho", price: "R$ 5,00", desc: "Efeito de chuva de faíscas.", icon: "✨" },
    ],
  },
  {
    id: "foguetes",
    name: "Foguetes e Traças",
    products: [
      { name: "Foguete Tradicional", price: "R$ 4,00", desc: "Sobe alto com estampido no céu.", icon: "🚀" },
      { name: "Traça Colorida", price: "R$ 6,50", desc: "Se abre em grandes círculos no céu.", icon: "🚀" },
    ],
  },
  {
    id: "cha-revelacao",
    name: "Chá Revelação",
    products: [
      { name: "Vela de Fumaça Azul", price: "R$ 25,00", desc: "Fumaça colorida para revelar o sexo do bebê.", icon: "💙" },
      { name: "Vela de Fumaça Rosa", price: "R$ 25,00", desc: "Fumaça colorida para revelar o sexo do bebê.", icon: "💗" },
      { name: "Canhão de Confete Revelação", price: "R$ 35,00", desc: "Estoura confete azul ou rosa.", icon: "🎊" },
    ],
  },
  {
    id: "confetes",
    name: "Confetes e Serpentinas",
    products: [
      { name: "Canhão de Confete", price: "R$ 18,00", desc: "Confete colorido para festas e casamentos.", icon: "🎉" },
      { name: "Serpentina (pacote)", price: "R$ 10,00", desc: "Papel colorido para decoração e festa.", icon: "🎉" },
    ],
  },
  {
    id: "casamento",
    name: "Kits para Casamento",
    products: [
      { name: "Kit Sparkle para Saída dos Noivos", price: "R$ 60,00", desc: "Vareta de faísca fria, segura para ambientes fechados.", icon: "💍" },
      { name: "Kit Bexigas Metalizadas", price: "R$ 40,00", desc: "Conjunto de balões para decoração do evento.", icon: "💍" },
    ],
  },
  {
    id: "sinalizadores",
    name: "Sinalizadores e Tochas",
    products: [
      { name: "Sinalizador de Mão", price: "R$ 9,00", desc: "Ideal para fotos e vídeos de festa.", icon: "🕯️" },
      { name: "Tocha de Faísca Fria", price: "R$ 22,00", desc: "Usada em casamentos e formaturas, sem fumaça tóxica.", icon: "🕯️" },
    ],
  },
];

// ==========================================================================
// HELPERS
// ==========================================================================
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function buildWhatsappLink(message) {
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

// ==========================================================================
// TOPO: WhatsApp do menu, selo aberto/fechado, avaliação
// ==========================================================================
function setupNavWhatsapp() {
  const link = document.getElementById("navWhatsapp");
  link.href = buildWhatsappLink("Olá! Vim pelo site da Moraes Pipas e gostaria de mais informações.");
}

function setupFloatingWhatsapp() {
  const link = document.getElementById("floatingWhatsapp");
  link.href = buildWhatsappLink("Olá! Vim pelo site da Moraes Pipas e gostaria de mais informações.");
}

function setupOpenBadge() {
  const badge = document.getElementById("openBadge");
  const hour = new Date().getHours();
  const isOpen = hour >= CONFIG.OPEN_HOUR && hour < CONFIG.CLOSE_HOUR;

  badge.textContent = isOpen
    ? `Aberto agora · fecha às ${CONFIG.CLOSE_HOUR}h`
    : `Fechado agora · abre às ${CONFIG.OPEN_HOUR}h`;
  badge.classList.add(isOpen ? "open" : "closed");
}

function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// ==========================================================================
// CATÁLOGO
// ==========================================================================
function renderCategoryPills() {
  const wrap = document.getElementById("categoryPills");
  const allPill = el("button", "category-pill active", "Todos");
  allPill.dataset.category = "all";
  wrap.appendChild(allPill);

  CATALOG.forEach((cat) => {
    const pill = el("button", "category-pill", cat.name);
    pill.dataset.category = cat.id;
    wrap.appendChild(pill);
  });

  wrap.addEventListener("click", (event) => {
    const btn = event.target.closest(".category-pill");
    if (!btn) return;

    wrap.querySelectorAll(".category-pill").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");

    const categoryId = btn.dataset.category;
    document.querySelectorAll(".catalog-category").forEach((section) => {
      section.hidden = categoryId !== "all" && section.dataset.category !== categoryId;
    });

    document.getElementById("searchInput").value = "";
    filterProducts("");
  });
}

function renderCatalog() {
  const container = document.getElementById("catalogContainer");

  CATALOG.forEach((cat) => {
    const section = el("div", "catalog-category");
    section.dataset.category = cat.id;

    section.appendChild(el("h3", null, cat.name));

    const grid = el("div", "product-grid");
    cat.products.forEach((product) => {
      const card = el("div", "product-card");
      card.dataset.name = normalize(product.name);
      card.dataset.category = normalize(cat.name);

      const thumb = el("div", "product-thumb", product.icon);
      const body = el("div", "product-body");
      body.appendChild(el("h4", null, product.name));
      body.appendChild(el("p", "product-desc", product.desc));
      body.appendChild(el("span", "product-price", product.price));

      const orderBtn = el("a", "btn btn-whatsapp product-order-btn");
      orderBtn.href = buildWhatsappLink(`Olá! Gostaria de pedir: ${product.name} (${cat.name}).`);
      orderBtn.target = "_blank";
      orderBtn.rel = "noopener";
      orderBtn.appendChild(el("span", "ico-whatsapp"));
      orderBtn.appendChild(document.createTextNode(" Pedir"));
      body.appendChild(orderBtn);

      card.appendChild(thumb);
      card.appendChild(body);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

function filterProducts(term) {
  const query = normalize(term.trim());
  const cards = document.querySelectorAll(".product-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = !query || card.dataset.name.includes(query) || card.dataset.category.includes(query);
    card.style.display = matches ? "" : "none";
    if (matches) visibleCount += 1;
  });

  document.querySelectorAll(".catalog-category").forEach((section) => {
    const visibleInSection = section.querySelectorAll('.product-card:not([style*="display: none"])').length;
    if (query) section.hidden = visibleInSection === 0;
  });

  document.getElementById("emptyState").hidden = visibleCount !== 0;
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      document.querySelectorAll(".category-pill").forEach((p) => p.classList.remove("active"));
      document.querySelector('.category-pill[data-category="all"]').classList.add("active");
      document.querySelectorAll(".catalog-category").forEach((section) => (section.hidden = false));
    }
    filterProducts(input.value);
  });
}

// ==========================================================================
// FORMULÁRIO DE EVENTOS
// ==========================================================================
function setupEventForm() {
  const form = document.getElementById("eventForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = document.getElementById("eventType").value;
    const date = document.getElementById("eventDate").value;
    const name = document.getElementById("eventName").value;
    const details = document.getElementById("eventMessage").value;

    let message = `Olá! Gostaria de um orçamento para evento.\nTipo: ${type}\nNome: ${name}`;
    if (date) message += `\nData: ${date}`;
    if (details) message += `\nDetalhes: ${details}`;

    window.open(buildWhatsappLink(message), "_blank", "noopener");
  });
}

// ==========================================================================
// AVALIAÇÕES / LOCALIZAÇÃO
// ==========================================================================
function setupReviewsAndLocation() {
  document.getElementById("googleReviewsLink").href = CONFIG.GOOGLE_REVIEWS_URL;
  document.getElementById("instagramLink").href = CONFIG.INSTAGRAM_URL;
  document.getElementById("tiktokLink").href = CONFIG.TIKTOK_URL;

  document.getElementById("addressText").textContent = CONFIG.ADDRESS;

  const query = encodeURIComponent(CONFIG.ADDRESS);
  document.getElementById("mapFrame").src = `https://maps.google.com/maps?q=${query}&output=embed`;
  document.getElementById("routeLink").href = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

// ==========================================================================
// INIT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  setupNavWhatsapp();
  setupFloatingWhatsapp();
  setupOpenBadge();
  setupMobileMenu();

  renderCategoryPills();
  renderCatalog();
  setupSearch();

  setupEventForm();
  setupReviewsAndLocation();
});
