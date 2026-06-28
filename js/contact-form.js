/* ============================================================
   Mons Crochet — Contact Form Validation
   ============================================================ */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    // Name validation
    const name = document.getElementById('contactName');
    if (!name.value.trim()) {
      document.getElementById('contactNameError').textContent = 'Please enter your name';
      isValid = false;
    } else if (name.value.trim().length < 2) {
      document.getElementById('contactNameError').textContent = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const email = document.getElementById('contactEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      document.getElementById('contactEmailError').textContent = 'Please enter your email';
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      document.getElementById('contactEmailError').textContent = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation (optional)
    const phone = document.getElementById('contactPhone');
    if (phone.value.trim()) {
      const phoneRegex = /^[+]?[\d\s-]{8,15}$/;
      if (!phoneRegex.test(phone.value)) {
        document.getElementById('contactPhoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
      }
    }

    // Message validation
    const message = document.getElementById('contactMessage');
    if (!message.value.trim()) {
      document.getElementById('contactMessageError').textContent = 'Please enter your message';
      isValid = false;
    } else if (message.value.trim().length < 10) {
      document.getElementById('contactMessageError').textContent = 'Message must be at least 10 characters';
      isValid = false;
    }

    if (isValid) {
      // Show success message
      const successMsg = document.getElementById('contactSuccess');
      if (successMsg) {
        successMsg.style.display = 'block';
      }

      // Reset form
      form.reset();

      // Hide success after 5 seconds
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 5000);
    }
  });
}
