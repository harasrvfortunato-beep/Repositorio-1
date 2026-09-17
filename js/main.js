import { Logo3DCard } from './logo-card.js';

const WHATSAPP_NUMBER = '5511959134861';
const WHATSAPP_MESSAGES = {
  'ola-geral': 'Olá! Conheci a LeadUp pelo site e gostaria de saber mais sobre Web Design e Tráfego Pago.',
  'comecar-agora': 'Olá! Conheci a LeadUp pelo site e gostaria de saber mais sobre Web Design e Tráfego Pago.',
  'comecar-projeto': 'Olá! Quero começar um projeto com a LeadUp.',
  'web-design': 'Olá! Tenho interesse no serviço de Web Design da LeadUp.',
  'trafego-pago': 'Olá! Tenho interesse no serviço de Tráfego Pago da LeadUp.',
};

function whatsappUrl(key, customMessage) {
  const text = customMessage || WHATSAPP_MESSAGES[key] || WHATSAPP_MESSAGES['ola-geral'];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function wireWhatsappLinks() {
  document.querySelectorAll('.whatsapp-link').forEach((el) => {
    const key = el.dataset.waMsg || 'ola-geral';
    el.setAttribute('href', whatsappUrl(key));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ---------------------------------------------------------------------- */
/* Header / mobile nav                                                    */
/* ---------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => spy.observe(section));
  }
}

/* ---------------------------------------------------------------------- */
/* Scroll reveal                                                          */
/* ---------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------- */
/* Portfolio                                                               */
/* ---------------------------------------------------------------------- */
const PORTFOLIO_ITEMS = [
  {
    title: 'Instituto Vitalità',
    category: 'Site institucional',
    description: 'Presença digital para clínica de estética, com foco em credibilidade e agendamento simplificado.',
    gradient: ['#16213a', '#0a0d16'],
  },
  {
    title: 'Órbita Imóveis',
    category: 'Landing Page',
    description: 'Página de captura para lançamento imobiliário, construída para maximizar geração de leads.',
    gradient: ['#132540', '#0a0d16'],
  },
  {
    title: 'Nortessa Store',
    category: 'E-commerce',
    description: 'Loja virtual com identidade visual própria e jornada de compra otimizada para conversão.',
    gradient: ['#0f1f38', '#0a0d16'],
  },
  {
    title: 'Studio Marcatto',
    category: 'Web Design',
    description: 'Redesign completo de site institucional para estúdio de arquitetura, com foco em portfólio visual.',
    gradient: ['#14223c', '#0a0d16'],
  },
  {
    title: 'Grupo Avante',
    category: 'Tráfego Pago',
    description: 'Estruturação de campanhas de anúncios para geração constante de oportunidades comerciais.',
    gradient: ['#102542', '#0a0d16'],
  },
  {
    title: 'Clínica Bemvida',
    category: 'Site institucional',
    description: 'Site institucional responsivo com integração direta ao atendimento via WhatsApp.',
    gradient: ['#17233d', '#0a0d16'],
  },
];

function categoryIcon() {
  return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.4">
    <rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>`;
}

function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_ITEMS.map(
    (item, i) => `
    <article class="portfolio-card reveal" data-index="${i}" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="portfolio-thumb" style="--thumb-a:${item.gradient[0]};--thumb-b:${item.gradient[1]}">
        <span class="portfolio-category-tag">${item.category}</span>
        <div class="portfolio-thumb-frame">${categoryIcon()}</div>
      </div>
      <div class="portfolio-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>`
  ).join('');

  document.querySelectorAll('.portfolio-card').forEach((card) => {
    card.addEventListener('click', () => openPortfolioModal(Number(card.dataset.index)));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPortfolioModal(Number(card.dataset.index));
      }
    });
  });

  initReveal();
}

function initPortfolioModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true">
      <button type="button" class="modal-close" aria-label="Fechar">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <p class="modal-tag" id="modal-tag"></p>
      <h3 id="modal-title"></h3>
      <p id="modal-desc"></p>
    </div>`;
  document.body.appendChild(overlay);

  const close = () => overlay.classList.remove('is-open');
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.__openPortfolioModal = (index) => {
    const item = PORTFOLIO_ITEMS[index];
    if (!item) return;
    overlay.querySelector('#modal-tag').textContent = item.category;
    overlay.querySelector('#modal-title').textContent = item.title;
    overlay.querySelector('#modal-desc').textContent = item.description;
    overlay.classList.add('is-open');
  };
}

function openPortfolioModal(index) {
  if (window.__openPortfolioModal) window.__openPortfolioModal(index);
}

/* ---------------------------------------------------------------------- */
/* Contact form                                                           */
/* ---------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = (data.get('nome') || '').toString().trim();
    const whatsapp = (data.get('whatsapp') || '').toString().trim();
    const empresa = (data.get('empresa') || '').toString().trim();
    const servico = (data.get('servico') || '').toString().trim();
    const mensagem = (data.get('mensagem') || '').toString().trim();

    const lines = [
      'Olá! Vim pelo site da LeadUp e gostaria de iniciar uma conversa.',
      `Nome: ${nome}`,
      empresa ? `Empresa: ${empresa}` : null,
      `WhatsApp: ${whatsapp}`,
      `Serviço de interesse: ${servico}`,
      `Mensagem: ${mensagem}`,
    ].filter(Boolean);

    window.open(whatsappUrl('form', lines.join('\n')), '_blank', 'noopener,noreferrer');
    note.textContent = 'Mensagem preparada! Abrindo o WhatsApp para você finalizar o contato.';
    form.reset();
  });
}

/* ---------------------------------------------------------------------- */
/* 3D logo — intro + hero                                                 */
/* ---------------------------------------------------------------------- */
const INTRO_SEEN_KEY = 'leadup_intro_seen';

function showSite() {
  document.getElementById('intro').classList.add('is-hidden');
  const site = document.getElementById('site');
  site.hidden = false;
  document.body.style.overflow = '';
}

function initHeroLogo() {
  const stage = document.getElementById('hero-stage');
  const card = document.getElementById('hero-card');
  if (!stage || !card) return;
  const viewer = new Logo3DCard(stage, card, { autoIdle: true });
  viewer.options.onClick = () => viewer.snapToFront();
}

function initIntro() {
  const intro = document.getElementById('intro');
  const stage = document.getElementById('intro-stage');
  const card = document.getElementById('intro-card');
  const enterBtn = document.getElementById('intro-enter');
  const skipBtn = document.getElementById('intro-skip');

  if (sessionStorage.getItem(INTRO_SEEN_KEY) === '1') {
    intro.hidden = true;
    intro.style.display = 'none';
    showSite();
    initHeroLogo();
    return;
  }

  document.body.style.overflow = 'hidden';

  let entered = false;
  const viewer = new Logo3DCard(stage, card, { autoIdle: true });

  const exitIntro = (animated) => {
    if (entered) return;
    entered = true;
    const proceed = () => {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
      showSite();
      viewer.dispose();
      initHeroLogo();
    };
    if (animated) {
      intro.style.pointerEvents = 'none';
      viewer.playEnterTransition().then(proceed, proceed);
    } else {
      proceed();
    }
  };

  viewer.options.onClick = () => exitIntro(true);
  enterBtn.addEventListener('click', () => exitIntro(true));
  skipBtn.addEventListener('click', () => exitIntro(false));
}

/* ---------------------------------------------------------------------- */
/* Boot                                                                    */
/* ---------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  wireWhatsappLinks();
  initHeader();
  renderPortfolio();
  initPortfolioModal();
  initContactForm();
  initFooterYear();
  initReveal();
  initIntro();
});
