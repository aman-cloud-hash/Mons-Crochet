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

document.addEventListener('DOMContentLoaded', () => {
  // Initialize page loader first
  initLoader();

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
  if (document.querySelector('.quick-view-btn')) initQuickView();
});
