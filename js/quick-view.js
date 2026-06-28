/* ============================================================
   Mons Crochet — Quick View Module
   ============================================================ */

const PRODUCTS = {
  '1': { id: '1', name: 'Rose Bouquet — Dusty Pink', category: 'Bouquets', price: '₹1,299', desc: 'A beautiful handcrafted bouquet of six dusty pink crochet roses with green leaves. Each petal is individually shaped and assembled. Perfect as a lasting gift or home decoration.', image: 'assets/images/prod-rose-bouquet.png' },
  '2': { id: '2', name: 'Sunflower in Ceramic Vase', category: 'Flowers', price: '₹899', desc: 'A cheerful handcrafted sunflower in a minimalist ceramic vase. The bright yellow petals bring warmth to any desk or shelf. A perfect companion that never wilts.', image: 'assets/images/prod-sunflower.png' },
  '3': { id: '3', name: 'Teddy Bear Keychain', category: 'Keychains', price: '₹399', desc: 'Adorable mini crocheted teddy bear keychain in dusty rose. About 3 inches tall with tiny bead eyes and a stitched nose. A perfect tiny companion for your keys or bag.', image: 'assets/images/prod-bear-keychain.png' },
  '4': { id: '4', name: 'Tulip Collection — Pastel', category: 'Flowers', price: '₹1,599', desc: 'A vibrant set of pastel crocheted tulips in pink, purple, yellow, and white, arranged in a glass vase. Brings eternal springtime to your home.', image: 'assets/images/prod-tulip-set.png' },
  '5': { id: '5', name: 'Storage Basket — Natural', category: 'Home Decor', price: '₹799', desc: 'Sturdy handcrafted crochet basket in natural cream and caramel tones. Perfect for organising small items, holding plants, or displaying on shelves.', image: 'assets/images/prod-basket.png' },
  '6': { id: '6', name: 'Flower Coasters Set of 4', category: 'Home Decor', price: '₹499', desc: 'Elegant mandala-pattern crocheted coasters in soft pastel tones. Set of 4 matching coasters to protect tables beautifully.', image: 'assets/images/prod-coasters.png' },
};

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
    document.getElementById('quickViewPrice').textContent = product.price;
    document.getElementById('quickViewBuyBtn').href = `product.html?id=${product.id}`;

    // Set up add to cart button
    const cartBtn = document.getElementById('quickViewCartBtn');
    cartBtn.dataset.productId = product.id;
    cartBtn.dataset.name = product.name;
    cartBtn.dataset.price = product.price.replace(/[₹,]/g, '');
    cartBtn.dataset.image = product.image;
    cartBtn.className = 'btn btn-secondary add-to-cart-btn';

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
