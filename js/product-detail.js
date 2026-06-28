/* ============================================================
   Mons Crochet — Product Detail Module
   ============================================================ */

import { showToast } from './loader.js';

const PRODUCTS = {
  '1': { id: '1', name: 'Rose Bouquet — Dusty Pink', category: 'Bouquets', price: 1299, desc: 'Beautiful, long-lasting pink crochet roses. Hand-knitted with high-quality yarn. Perfect for gifting.', image: 'assets/images/prod-rose-bouquet.png' },
  '2': { id: '2', name: 'Sunflower in Ceramic Vase', category: 'Flowers', price: 899, desc: 'A bright, handcrafted crochet sunflower in a small vase. A cute decor piece for desks and shelves.', image: 'assets/images/prod-sunflower.png' },
  '3': { id: '3', name: 'Teddy Bear Keychain', category: 'Keychains', price: 399, desc: 'Adorable handmade crochet teddy bear keychain. Soft, lightweight, and perfect to hang on bags.', image: 'assets/images/prod-bear-keychain.png' },
  '4': { id: '4', name: 'Tulip Collection — Pastel', category: 'Flowers', price: 1599, desc: 'A gorgeous set of colorful crochet tulips. Perfect home decor that stays fresh forever.', image: 'assets/images/prod-tulip-set.png' },
  '5': { id: '5', name: 'Storage Basket — Natural', category: 'Home Decor', price: 799, desc: 'Handmade crochet storage basket. Useful for organizing cosmetics, keys, and daily items.', image: 'assets/images/prod-basket.png' },
  '6': { id: '6', name: 'Flower Coasters Set of 4', category: 'Home Decor', price: 499, desc: 'Set of 4 handmade crochet coasters. Soft, absorbable, and protects tables beautifully.', image: 'assets/images/prod-coasters.png' },
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const product = PRODUCTS[id];

  if (!product) {
    window.location.href = '404.html';
    return;
  }

  // Populate Details
  document.title = `${product.name} — Mons Crochet`;
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;

  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  const categoryEl = document.getElementById('productCategory');
  if (categoryEl) categoryEl.textContent = product.category;

  const nameEl = document.getElementById('productName');
  if (nameEl) nameEl.textContent = product.name;

  const priceEl = document.getElementById('productPrice');
  if (priceEl) priceEl.textContent = `₹${product.price.toLocaleString('en-IN')}`;

  const descEl = document.getElementById('productDesc');
  if (descEl) descEl.textContent = product.desc;

  // Build Thumbnails (Just use the main product image and some duplicates for layout variety)
  const thumbsContainer = document.getElementById('productThumbnails');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = `
      <div class="product-thumbnail active"><img src="${product.image}" alt="${product.name} Thumb 1"></div>
      <div class="product-thumbnail"><img src="${product.image}" alt="${product.name} Thumb 2" style="filter: brightness(0.95)"></div>
      <div class="product-thumbnail"><img src="${product.image}" alt="${product.name} Thumb 3" style="filter: sepia(0.1) brightness(0.95)"></div>
    `;

    const thumbs = thumbsContainer.querySelectorAll('.product-thumbnail');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImage) {
          mainImage.src = thumb.querySelector('img').src;
        }
      });
    });
  }

  // Option Pills Selection
  const optionPills = document.querySelectorAll('.product-option-pill');
  optionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.parentElement;
      parent.querySelectorAll('.product-option-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Action Buttons
  const cartBtn = document.getElementById('addToCartMainBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      // Dispatch custom event or call window functions to trigger the cart logic
      const cartEvent = new CustomEvent('add-to-cart', {
        detail: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      });
      document.dispatchEvent(cartEvent);
    });
  }

  const buyBtn = document.getElementById('buyNowBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const cartEvent = new CustomEvent('add-to-cart', {
        detail: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      });
      document.dispatchEvent(cartEvent);
      // Open Cart Drawer
      const cartDrawer = document.getElementById('cartDrawer');
      const cartOverlay = document.getElementById('cartOverlay');
      cartDrawer?.classList.add('open');
      cartOverlay?.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  }

  // Populate Related Products
  const relatedContainer = document.getElementById('relatedProductsGrid');
  if (relatedContainer) {
    const relatedList = Object.values(PRODUCTS).filter(p => p.id !== product.id).slice(0, 3);
    relatedContainer.innerHTML = relatedList.map(p => `
      <div class="product-card">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-card-actions">
            <button class="action-btn wishlist-btn" data-product-id="${p.id}" aria-label="Add to Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button class="action-btn quick-view-btn" data-product-id="${p.id}" aria-label="Quick View">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${p.category}</span>
          <h4 class="product-card-name">${p.name}</h4>
          <div class="product-card-price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="product-card-btns">
            <a href="product.html?id=${p.id}" class="btn btn-primary btn-sm">Buy Now</a>
            <button class="btn btn-secondary btn-sm add-to-cart-btn" data-product-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');
  }
});
