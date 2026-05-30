/* =========================================================================
   TITAN PRESSURE CONTROL — Main JavaScript
   ========================================================================= */

(function() {
  'use strict';

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navToggle.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Set the active nav link based on current page
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Lightweight scroll-reveal: add 'reveal' class to elements with [data-reveal]
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealElements.forEach(el => observer.observe(el));
    }
  }

  // Contact form — Formspree submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      contactForm.querySelectorAll('.field-error').forEach(el => el.remove());
      contactForm.querySelectorAll('.form-field.has-error').forEach(el => el.classList.remove('has-error'));
      const existingBanner = contactForm.querySelector('.form-error-banner');
      if (existingBanner) existingBanner.remove();

      // Validate required fields
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const phone = contactForm.querySelector('#phone');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      function showFieldError(field, message) {
        field.closest('.form-field').classList.add('has-error');
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = message;
        field.closest('.form-field').appendChild(err);
        valid = false;
      }

      if (!name.value.trim()) showFieldError(name, 'Name is required.');
      if (!email.value.trim()) {
        showFieldError(email, 'Email is required.');
      } else if (!emailPattern.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address.');
      }
      if (!phone.value.trim()) showFieldError(phone, 'Phone number is required.');

      if (!valid) return;

      // Submit to Formspree
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('https://formspree.io/f/mnjrrleb', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function(res) {
          if (res.ok) {
            const wrapper = contactForm.closest('.contact-form');
            wrapper.innerHTML =
              '<div class="form-success">' +
              '<span class="eyebrow">Received</span>' +
              '<hr class="red-rule">' +
              '<h3>Request submitted.</h3>' +
              '<p>We\'ll be in touch within one business day.<br>' +
              'For urgent needs, call <a href="tel:4325635500" style="color:var(--titan-red);font-weight:600;">432-563-5500</a>.</p>' +
              '</div>';
          } else {
            return res.json().then(function(data) {
              throw new Error((data.errors || []).map(function(err) { return err.message; }).join(', ') || 'Submission failed.');
            });
          }
        })
        .catch(function() {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          const banner = document.createElement('div');
          banner.className = 'form-error-banner';
          banner.textContent = 'Something went wrong. Please try again or call us at 432-563-5500.';
          submitBtn.insertAdjacentElement('beforebegin', banner);
        });
    });
  }

})();
