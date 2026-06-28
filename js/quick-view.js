/* ============================================================
   Mons Crochet — Quick View Module
   ============================================================ */

import { PRODUCTS } from './products-db.js';

export function initQuickView() {
  const modal = document.getElementById('quickViewModal');
  const overlay = document.getElementById('quickViewOverlay');
  const closeBtn = document.getElementById('quickViewClose');

  if (!modal) return;

  function openQuickView(productId) {
    const product = PRODUCTS[productId];
    if (!product) return;

    document.getElementById('quickViewImg').src = product.image;
    document.getElementById('quickViewImg').alt = product.name;
    document.getElementById('quickViewCategory').textContent = product.category;
    document.getElementById('quickViewName').textContent = product.name;
    document.getElementById('quickViewDesc').textContent = product.desc;
    document.getElementById('quickViewPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    
    // Set up Buy Now button
    const buyBtn = document.getElementById('quickViewBuyBtn');
    if (buyBtn) {
      buyBtn.dataset.productId = product.id;
    }

    // Set up add to cart button
    const cartBtn = document.getElementById('quickViewCartBtn');
    if (cartBtn) {
      cartBtn.dataset.productId = product.id;
      cartBtn.dataset.name = product.name;
      cartBtn.dataset.price = product.price;
      cartBtn.dataset.image = product.image;
      cartBtn.className = 'btn btn-secondary add-to-cart-btn';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeQuickView() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  // Event delegation for quick view buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-view-btn');
    if (btn) {
      e.preventDefault();
      openQuickView(btn.dataset.productId);
    }
  });

  closeBtn?.addEventListener('click', closeQuickView);
  overlay?.addEventListener('click', closeQuickView);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeQuickView();
    }
  });
}
