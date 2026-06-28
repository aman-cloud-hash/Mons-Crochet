/* ============================================================
   Mons Crochet — Wishlist Module (localStorage)
   ============================================================ */

import { showToast } from './loader.js';

const WISHLIST_KEY = 'mons_crochet_wishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  updateWishlistUI();
}

function toggleWishlist(id) {
  let list = getWishlist();
  const index = list.indexOf(id);

  if (index > -1) {
    list.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    list.push(id);
    showToast('Added to wishlist ❤️');
  }

  saveWishlist(list);
}

function updateWishlistUI() {
  const list = getWishlist();
  const buttons = document.querySelectorAll('.wishlist-btn');

  buttons.forEach(btn => {
    const id = btn.dataset.productId;
    const isWished = list.includes(id);
    const svg = btn.querySelector('svg');

    if (isWished) {
      btn.classList.add('active');
      if (svg) {
        svg.setAttribute('fill', 'currentColor');
        svg.style.color = '#D89CA4';
      }
    } else {
      btn.classList.remove('active');
      if (svg) {
        svg.setAttribute('fill', 'none');
        svg.style.color = '';
      }
    }
  });
}

export function initWishlist() {
  updateWishlistUI();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (btn) {
      e.preventDefault();
      toggleWishlist(btn.dataset.productId);
    }
  });
}
