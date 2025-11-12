// Small helpers for UX
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ensure Home link reliably scrolls to absolute top
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#top"]');
    if (a) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Add contact info into footer
  const footerWrap = document.querySelector('.site-footer .container');
  if (footerWrap && !footerWrap.querySelector('.footer-links')) {
    const ICON_MAIL = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.3 5.02L18.8 6H4.2ZM20 7.44l-7.77 5.35a1 1 0 0 1-1.13 0L3 7.44V17.5c0 .276.224.5.5.5h15a.5.5 0 0 0 .5-.5V7.44Z"/></svg>';
    const ICON_GITHUB = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.478 2 12.005c0 4.425 2.865 8.178 6.839 9.504.5.092.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.252-4.555-1.112-4.555-4.948 0-1.092.39-1.986 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.507.338 1.908-1.295 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.027 1.594 1.027 2.686 0 3.845-2.339 4.693-4.566 4.941.359.31.679.92.679 1.855 0 1.338-.012 2.417-.012 2.746 0 .268.18.58.688.481A10.01 10.01 0 0 0 22 12.005C22 6.478 17.523 2 12 2z" clip-rule="evenodd"/></svg>';
    const ICON_LINKEDIN = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.329-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.603 0 4.268 2.372 4.268 5.457v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.994 20.452H3.677V9h3.317v11.452z"/></svg>';

    const links = document.createElement('div');
    links.className = 'footer-links';
    links.innerHTML = `
      <a href="mailto:ponthea@zahraii.com">${ICON_MAIL} Email</a>
      <a href="https://github.com/pontheazahraii" target="_blank" rel="noopener">${ICON_GITHUB} GitHub</a>
      <a href="https://www.linkedin.com/in/pontheazahraii/" target="_blank" rel="noopener">${ICON_LINKEDIN} LinkedIn</a>
    `;
    footerWrap.appendChild(links);
  }

  // Active section highlighting in nav
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = navLinks
    .map(a => ({ id: decodeURIComponent(a.getAttribute('href').slice(1)), el: null, link: a }))
    .map(obj => ({ ...obj, el: document.getElementById(obj.id) }))
    .filter(obj => obj.el);

  const visible = new Map(); // id -> intersectionRatio
  function updateActive() {
    // Choose section with highest visibility
    let bestId = null, bestRatio = 0;
    for (const [id, ratio] of visible.entries()) {
      if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
    }
    // If none visible (edge cases), choose first when near top
    if (!bestId) {
      bestId = (window.scrollY < 40) ? 'top' : sections[0]?.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', decodeURIComponent(a.getAttribute('href').slice(1)) === bestId));
  }

  // Observe sections; adjust rootMargin to account for sticky header
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        visible.set(id, entry.intersectionRatio);
      } else {
        visible.delete(id);
      }
    });
    updateActive();
  }, { root: null, rootMargin: '-64px 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  // Include #top sentinel and content sections
  const sentinel = document.getElementById('top');
  if (sentinel) io.observe(sentinel);
  sections.forEach(s => io.observe(s.el));
});
