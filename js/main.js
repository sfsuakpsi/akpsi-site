// Nav scroll state — darkens pill when scrolled past hero
const navEl = document.querySelector('nav');
// home page uses .hero, inner pages use .page-hero — check both
const heroEl = document.querySelector('.hero') || document.querySelector('.page-hero');
function updateNav() {
  if (!navEl) return;
  const threshold = heroEl ? heroEl.offsetHeight * 0.75 : window.innerHeight * 0.6;
  navEl.classList.toggle('scrolled', window.scrollY > threshold);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile nav toggle (side panel + dimmed/blurred backdrop on body)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
function setNavOpen(open) {
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
}
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    setNavOpen(!navLinks.classList.contains('open'));
  });
  // tapping the dimmed backdrop (outside the panel) closes it
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || hamburger.contains(e.target)) return;
    setNavOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Brother filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.brother-card').forEach(card => {
      card.style.display =
        filter === 'all' || card.dataset.class === filter ? '' : 'none';
    });
  });
});

// Mark active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active-page');
  }
});
