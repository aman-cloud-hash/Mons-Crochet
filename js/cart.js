/* ============================================================
   Mons Crochet — Cart Module (localStorage)
   ============================================================ */

import { showToast } from './loader.js';

const CART_KEY = 'mons_crochet_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  // Update cart count badge
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.classList.toggle('visible', count > 0);
  }

  // Update cart drawer contents
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '';
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  let total = 0;
  cartItems.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  if (cartTotal) {
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  // Attach remove handlers
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

function addToCart(id, name, price, image) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: Number(price), image, qty: 1 });
  }

  saveCart(cart);
  showToast(`${name} added to cart!`);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

export function initCart() {
  // Initialize UI on load
  updateCartUI();

  // Add to cart buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      const { productId, name, price, image } = btn.dataset;
      addToCart(productId, name, price, image);
    }
  });

  // Listen for custom add-to-cart event
  document.addEventListener('add-to-cart', (e) => {
    const { id, name, price, image } = e.detail;
    addToCart(id, name, price, image);
  });

  // Listen for custom cart-cleared event
  document.addEventListener('cart-cleared', () => {
    localStorage.removeItem(CART_KEY);
    updateCartUI();
  });

  // Cart drawer toggle
  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');

  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer?.classList.contains('open')) {
      closeCart();
    }
  });
}
