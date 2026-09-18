// Header background on scroll
const header = document.getElementById('header');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 10);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal-on-scroll animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach((el) => observer.observe(el));
