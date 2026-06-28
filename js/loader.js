/* ============================================================
   Mons Crochet — Page Loader & Toast
   ============================================================ */

export function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Dynamically inject the premium custom preloader animation HTML
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-visual">
        <svg class="yarn-svg" viewBox="0 0 200 200" width="120" height="120">
          <defs>
            <radialGradient id="yarnGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ffb3c6" />
              <stop offset="50%" stop-color="#ff85a2" />
              <stop offset="100%" stop-color="#d62246" />
            </radialGradient>
            <linearGradient id="hookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f4ebe1" />
              <stop offset="100%" stop-color="#d6c5b3" />
            </linearGradient>
          </defs>
          <!-- Pulsing halo glow behind yarn -->
          <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(255, 133, 162, 0.25)" stroke-width="6" class="loader-glow-ring" />
          <!-- The Yarn Ball -->
          <circle cx="100" cy="100" r="45" fill="url(#yarnGrad)" class="yarn-ball-main" />
          <!-- Wrapping Threads/Lines on Yarn Ball -->
          <path d="M 65,100 A 35,35 0 0,1 135,100" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-dasharray="4,4" class="yarn-thread-1" />
          <path d="M 100,65 A 35,35 0 0,1 100,135" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" class="yarn-thread-2" />
          <path d="M 75,75 A 35,35 0 0,1 125,125" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" class="yarn-thread-3" />
          <path d="M 75,125 A 35,35 0 0,1 125,75" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-dasharray="6,3" class="yarn-thread-4" />
          <!-- Animated Loose Thread -->
          <path d="M 100,145 C 90,170 120,180 150,170 C 180,160 190,130 170,110 C 160,100 145,105 140,115 C 135,125 150,140 160,135" fill="none" stroke="#d62246" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="yarn-loose-thread" />
          <!-- Crochet Hook Needle -->
          <g class="crochet-hook">
            <path d="M 50,70 L 140,160 C 145,165 150,163 152,160 L 155,157 C 158,155 160,150 155,145 L 65,55 Z" fill="url(#hookGrad)" />
            <!-- The Hook tip -->
            <path d="M 46,66 C 42,62 38,62 36,66 C 34,70 38,76 42,76 C 46,76 48,72 46,66 Z" fill="url(#hookGrad)" />
          </g>
        </svg>
      </div>
      <div class="loader-brand">
        <span class="brand-letter">M</span>
        <span class="brand-letter">o</span>
        <span class="brand-letter">n</span>
        <span class="brand-letter">s</span>
        <span class="brand-space">&nbsp;</span>
        <span class="brand-letter">C</span>
        <span class="brand-letter">r</span>
        <span class="brand-letter">o</span>
        <span class="brand-letter">c</span>
        <span class="brand-letter">h</span>
        <span class="brand-letter">e</span>
        <span class="brand-letter">t</span>
      </div>
      <p class="loader-subtitle">Handmade With Love</p>
    </div>
  `;

  // Hide loader after page load (with a small timeout to let the beautiful intro play)
  const hideLoader = () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2200);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  // Fallback: hide after 4.5 seconds even if load doesn't fire
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 4500);
}

export function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
