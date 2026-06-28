/* ============================================================
   Mons Crochet — Page Loader & Toast
   ============================================================ */

export function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Hide loader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  });

  // Fallback: hide after 3 seconds even if load doesn't fire
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);
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
