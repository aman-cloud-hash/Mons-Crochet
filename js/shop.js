import { initAnimations } from './animations.js';

const PRODUCTS = [
  { id: '1', name: 'Rose Bouquet — Dusty Pink', category: 'Bouquets', price: 1299, desc: 'A beautiful handcrafted bouquet of six dusty pink crochet roses.', image: 'assets/images/prod-rose-bouquet.png', label: 'New' },
  { id: '2', name: 'Sunflower in Ceramic Vase', category: 'Flowers', price: 899, desc: 'A cheerful handcrafted sunflower in a minimalist ceramic vase.', image: 'assets/images/prod-sunflower.png', label: '' },
  { id: '3', name: 'Teddy Bear Keychain', category: 'Keychains', price: 399, desc: 'Adorable mini crocheted teddy bear keychain in dusty rose.', image: 'assets/images/prod-bear-keychain.png', label: 'Popular' },
  { id: '4', name: 'Tulip Collection — Pastel', category: 'Flowers', price: 1599, desc: 'A vibrant set of pastel crocheted tulips in a glass vase.', image: 'assets/images/prod-tulip-set.png', label: '' },
  { id: '5', name: 'Storage Basket — Natural', category: 'Home Decor', price: 799, desc: 'Sturdy handcrafted crochet basket in natural tones.', image: 'assets/images/prod-basket.png', label: '' },
  { id: '6', name: 'Flower Coasters Set of 4', category: 'Home Decor', price: 499, desc: 'Elegant mandala-pattern crocheted coasters in pastel tones.', image: 'assets/images/prod-coasters.png', label: 'Custom' },
];

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.querySelector('.products-grid');
  const sortSelect = document.getElementById('sortSelect');
  const countEl = document.querySelector('.shop-count');

  if (!productsGrid) return;

  // Read URL params
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') || 'all';

  // Render function
  function renderProducts(items) {
    if (items.length === 0) {
      productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-text-secondary);">No products found in this category.</div>';
      if (countEl) countEl.textContent = 'Showing 0 products';
      return;
    }

    productsGrid.innerHTML = items.map(p => `
      <div class="product-card animate-on-scroll" data-product-id="${p.id}">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.label ? `<span class="product-badge ${p.label === 'New' ? 'badge-new' : p.label === 'Popular' ? 'badge-sale' : 'badge-custom'}">${p.label}</span>` : ''}
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
          <p class="product-card-desc">${p.desc}</p>
          <div class="product-card-price">₹${p.price.toLocaleString('en-IN')}</div>
          <div class="product-card-btns">
            <a href="product.html?id=${p.id}" class="btn btn-primary btn-sm">Buy Now</a>
            <button class="btn btn-secondary btn-sm add-to-cart-btn" data-product-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');

    if (countEl) {
      countEl.textContent = `Showing ${items.length} product${items.length > 1 ? 's' : ''}`;
    }

    // Initialize animations for dynamically added elements
    initAnimations();
  }

  // Filter & Sort Logic
  function getFilteredAndSorted() {
    let result = [...PRODUCTS];

    // Filter by category
    if (activeCategory.toLowerCase() !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Sort
    const sortVal = sortSelect?.value || 'Featured';
    if (sortVal === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'Newest') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }

  function update() {
    const list = getFilteredAndSorted();
    renderProducts(list);
  }

  // Listeners
  sortSelect?.addEventListener('change', update);

  // Initial render
  update();
});
