const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// Portfolio category filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

// Reveal sections when they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact form opens WhatsApp with a prepared enquiry message
const form = document.getElementById('contactForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    'Hello ARPIT Constructions, I would like to discuss a project.',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Project type: ${data.get('project')}`,
    `Location: ${data.get('location') || 'Not specified'}`,
    `Details: ${data.get('message') || 'I would like to discuss the requirements.'}`
  ].join('\n');
  // Replace this demo number with the business WhatsApp number before publishing.
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
document.getElementById('year').textContent = new Date().getFullYear();
