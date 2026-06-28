/* ============================================================
   Mons Crochet — Main JS Entry Point
   ============================================================ */

import { initHeader } from './header.js';
import { initHero } from './hero.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initReviews } from './reviews.js';
import { initFaq } from './faq.js';
import { initCart } from './cart.js';
import { initWishlist } from './wishlist.js';
import { initQuickView } from './quick-view.js';
import { initContactForm } from './contact-form.js';
import { initLoader } from './loader.js';
import { initFloatingButtons } from './floating-buttons.js';
import { PRODUCTS } from './products-db.js';
import { showToast } from './loader.js';

// Initialize page loader immediately (so it loads before DOMContentLoaded finishes)
initLoader();

// Force page to start from the top hero section on refresh/load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  // Core modules
  initHeader();
  initAnimations();
  initFloatingButtons();
  initCart();
  initWishlist();

  // Page-specific modules (check if elements exist)
  if (document.querySelector('.hero')) initHero();
  if (document.querySelector('#galleryGrid')) initGallery();
  if (document.querySelector('#reviewsTrack')) initReviews();
  if (document.querySelector('#faqList')) initFaq();
  if (document.querySelector('#contactForm')) initContactForm();
  if (document.querySelector('.quick-view-btn') || document.getElementById('quickViewModal')) initQuickView();

  // Dynamically fix/align all phone and WhatsApp links to 8604600292
  initPhoneLinks();

  // ========== GLOBAL INTERACTIVE ANIMATIONS & HANDLERS ==========

  // 1. Entire Product Card Click (except buttons & links)
  document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.action-btn')) {
      return;
    }
    const card = e.target.closest('.product-card');
    if (card) {
      const id = card.dataset.productId;
      if (id) {
        window.location.href = `product.html?id=${id}`;
      }
    }
  });

  // 2. Buy Now Click Handler (Add to cart & redirect to checkout.html)
  document.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('#buyNowBtn') || 
                   e.target.closest('#quickViewBuyBtn') || 
                   e.target.closest('.buy-now-btn');
                    
    if (buyBtn) {
      e.preventDefault();
      
      let productId = buyBtn.dataset.productId;
      
      // Find from closest card
      if (!productId) {
        const card = buyBtn.closest('.product-card');
        productId = card?.dataset.productId;
      }
      
      // Find from URL if on product page
      if (!productId && window.location.pathname.includes('product.html')) {
        const params = new URLSearchParams(window.location.search);
        productId = params.get('id');
      }
      
      // Fallback
      if (!productId) productId = '1';
      
      const product = PRODUCTS[productId];
      if (product) {
        // Trigger add-to-cart custom event
        document.dispatchEvent(new CustomEvent('add-to-cart', {
          detail: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          }
        }));
      }
      
      // Redirect to checkout page
      window.location.href = 'checkout.html';
    }
  });

  // 3. Cart Drawer Proceed to Checkout Button Handler
  document.addEventListener('click', (e) => {
    const checkBtn = e.target.closest('#checkoutBtn');
    if (checkBtn) {
      e.preventDefault();
      window.location.href = 'checkout.html';
    }
  });

  // 4. Share Product Handler
  document.addEventListener('click', (e) => {
    const shareBtn = e.target.closest('.share-btn');
    if (shareBtn) {
      e.preventDefault();
      
      const card = shareBtn.closest('.product-card');
      let productId = shareBtn.dataset.productId || card?.dataset.productId;
      
      if (!productId && window.location.pathname.includes('product.html')) {
        const params = new URLSearchParams(window.location.search);
        productId = params.get('id');
      }
      
      if (!productId) productId = '1';
      
      const product = PRODUCTS[productId];
      if (product) {
        const shareUrl = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/product.html?id=${product.id}`;
        
        if (navigator.share) {
          navigator.share({
            title: product.name,
            text: `Check out this beautiful handcrafted crochet item: ${product.name}`,
            url: shareUrl
          }).catch(err => console.log('Share failed:', err));
        } else {
          navigator.clipboard.writeText(shareUrl)
            .then(() => showToast('Product link copied to clipboard!'))
            .catch(() => showToast('Failed to copy link.'));
        }
      }
    }
  });

  // 5. Page Exit Transitions
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const target = link.getAttribute('target');

    // Skip if it's external, hash-only, mailto/tel/whatsapp, or opens in new tab
    if (
      !href || 
      href.startsWith('#') || 
      href.startsWith('javascript:') || 
      href.startsWith('mailto:') || 
      href.startsWith('tel:') || 
      href.includes('wa.me') || 
      target === '_blank' ||
      e.metaKey || 
      e.ctrlKey
    ) {
      return;
    }

    e.preventDefault();
    const wrapper = document.querySelector('.page-wrapper');
    if (wrapper) {
      wrapper.classList.add('page-exit');
    }
    setTimeout(() => {
      window.location.href = href;
    }, 350);
  });

  // 6. Scroll Reveal Micro-Animations (Add class when visible)
  const revealElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .section-header, .feature-card, .category-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
});

// Helper function to update all call/WhatsApp links to correct phone number
function initPhoneLinks() {
  document.querySelectorAll('a').forEach(link => {
    let href = link.getAttribute('href');
    if (href) {
      if (href.includes('wa.me/') || href.includes('whatsapp.com')) {
        // Change any old numbers or placeholder numbers to the correct 8604600292
        href = href.replace(/919876543210/g, '918604600292')
                   .replace(/9876543210/g, '8604600292')
                   .replace(/919999999999/g, '918604600292');
        link.setAttribute('href', href);
      }
      if (href.includes('tel:')) {
        href = href.replace(/\+919876543210/g, '+918604600292')
                   .replace(/9876543210/g, '8604600292')
                   .replace(/\+919999999999/g, '+918604600292');
        link.setAttribute('href', href);
      }
    }
  });
}
