/* ============================================================
   Mons Crochet — Wishlist Module (localStorage & Drawer)
   ============================================================ */

import { showToast } from './loader.js';
import { PRODUCTS } from './products-db.js';

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

  // Update heart buttons active state
  buttons.forEach(btn => {
    const id = btn.dataset.productId || btn.closest('.product-card')?.dataset.productId;
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

  // Update header wishlist count badge
  const wishlistCount = document.getElementById('wishlistCount');
  if (wishlistCount) {
    wishlistCount.textContent = list.length;
    wishlistCount.classList.toggle('visible', list.length > 0);
  }

  // Update wishlist drawer body
  renderWishlistDrawerItems();
}

function renderWishlistDrawerItems() {
  const list = getWishlist();
  const wishlistItems = document.getElementById('wishlistItems');
  const wishlistEmpty = document.getElementById('wishlistEmpty');

  if (!wishlistItems) return;

  if (list.length === 0) {
    wishlistItems.innerHTML = '';
    if (wishlistEmpty) wishlistEmpty.style.display = 'flex';
    return;
  }

  if (wishlistEmpty) wishlistEmpty.style.display = 'none';

  wishlistItems.innerHTML = list
    .map(id => {
      const item = PRODUCTS[id];
      if (!item) return '';
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-img" style="cursor:pointer;" onclick="window.location.href='product.html?id=${item.id}'">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name" style="cursor:pointer;" onclick="window.location.href='product.html?id=${item.id}'">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
            <div style="display:flex; gap: 8px; margin-top: 6px;">
              <button class="btn btn-primary btn-sm add-to-cart-btn" 
                data-product-id="${item.id}" 
                data-name="${item.name}" 
                data-price="${item.price}" 
                data-image="${item.image}" 
                style="padding: 4px 8px; font-size: 11px;">
                + Cart
              </button>
              <button class="cart-item-remove wishlist-item-remove" data-id="${item.id}" style="margin: 0; padding: 4px 8px; font-size: 11px;">
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Attach wishlist item remove handlers
  wishlistItems.querySelectorAll('.wishlist-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleWishlist(btn.dataset.id);
    });
  });
}

export function initWishlist() {
  // 1. Inject the Wishlist Toggle Button in Header if not present
  const cartToggle = document.getElementById('cartToggle');
  if (cartToggle && !document.getElementById('wishlistToggle')) {
    const wishlistBtnHTML = `
      <button class="header-wishlist" id="wishlistToggle" aria-label="Open Wishlist" style="margin-right: var(--space-2);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="wishlist-count" id="wishlistCount">0</span>
      </button>
    `;
    cartToggle.insertAdjacentHTML('beforebegin', wishlistBtnHTML);
  }

  // 2. Inject Wishlist Drawer Markup if not present
  if (!document.getElementById('wishlistDrawer')) {
    const wishlistDrawerHTML = `
      <!-- ========== WISHLIST DRAWER ========== -->
      <div class="cart-drawer-overlay" id="wishlistOverlay"></div>
      <div class="cart-drawer" id="wishlistDrawer">
        <div class="cart-drawer-header">
          <h4>Your Wishlist</h4>
          <button class="cart-drawer-close" id="wishlistClose" aria-label="Close wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-drawer-body" id="wishlistBody">
          <div class="cart-drawer-empty" id="wishlistEmpty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="opacity: 0.3; margin-bottom: 1rem;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <p>Your wishlist is empty</p>
            <a href="shop.html" class="btn btn-primary btn-sm" style="margin-top: 1rem;">Browse Products</a>
          </div>
          <div id="wishlistItems" class="cart-items"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', wishlistDrawerHTML);
  }

  // Initialize UI state
  updateWishlistUI();

  // 3. Setup toggle event listeners
  const wishlistToggle = document.getElementById('wishlistToggle');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistOverlay = document.getElementById('wishlistOverlay');
  const wishlistClose = document.getElementById('wishlistClose');

  function openWishlist() {
    // Close cart drawer if open
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');

    wishlistDrawer?.classList.add('open');
    wishlistOverlay?.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeWishlist() {
    wishlistDrawer?.classList.remove('open');
    wishlistOverlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  wishlistToggle?.addEventListener('click', openWishlist);
  wishlistClose?.addEventListener('click', closeWishlist);
  wishlistOverlay?.addEventListener('click', closeWishlist);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wishlistDrawer?.classList.contains('open')) {
      closeWishlist();
    }
  });

  // 4. Global click delegation for add-to-wishlist buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (btn) {
      e.preventDefault();
      const id = btn.dataset.productId || btn.closest('.product-card')?.dataset.productId;
      if (id) {
        toggleWishlist(id);
      }
    }
  });
}
