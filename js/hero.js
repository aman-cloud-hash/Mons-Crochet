/* ============================================================
   Mons Crochet — Hero Parallax Module
   ============================================================ */

export function initHero() {
  const parallaxEl = document.querySelector('.hero-parallax');
  if (!parallaxEl) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrollY < heroHeight) {
      const offset = scrollY * 0.35;
      parallaxEl.style.transform = `translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}
