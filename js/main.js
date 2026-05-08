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
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
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

  // Contact form — submission handler (placeholder; routes to mailto for now)
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(contactForm);
      const subject = encodeURIComponent('Quote Request — ' + (data.get('name') || 'Website'));
      const body = encodeURIComponent(
        'Name: ' + (data.get('name') || '') + '\n' +
        'Company: ' + (data.get('company') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Interest: ' + (data.get('interest') || '') + '\n\n' +
        'Message:\n' + (data.get('message') || '')
      );
      window.location.href = 'mailto:info@titanpressurecontrol.com?subject=' + subject + '&body=' + body;
    });
  }

})();
