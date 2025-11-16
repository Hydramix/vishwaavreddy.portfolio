// script.js - interactions: mobile nav, smooth scroll, certificate modal, contact form demo
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
  });

  // Set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scrolling for nav links (scrolls, not jump)
  document.querySelectorAll('.nav-link, .hero-actions a, .logo').forEach(link => {
    link.addEventListener('click', function (e) {
      // if link is internal anchor
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        const nav = document.getElementById('mainNav');
        if (window.innerWidth < 1000 && nav) nav.style.display = 'none';
      }
    });
  });

  // Certificate modal logic
  const certModal = document.getElementById('certModal');
  const certImg = document.getElementById('certImg');
  const certClose = document.getElementById('certClose');

  function openCert(src) {
    certImg.src = src;
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus on close button for accessibility
    certClose.focus();
  }
  function closeCert() {
    certModal.setAttribute('aria-hidden', 'true');
    certImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cert-clickable').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-src') || el.querySelector('img').src;
      openCert(src);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = el.getAttribute('data-src') || el.querySelector('img').src;
        openCert(src);
      }
    });
  });

  certClose.addEventListener('click', closeCert);
  certModal.addEventListener('click', (e) => {
    // close if clicking backdrop
    if (e.target === certModal) closeCert();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.getAttribute('aria-hidden') === 'false') {
      closeCert();
    }
  });

  // Contact form demo behaviour
  const sendBtn = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');
  const formStatus = document.getElementById('formStatus');

  function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.style.color = '#ff8a8a';
        formStatus.textContent = 'Please fill all fields.';
        return;
      }
      if (!validateEmail(email)) {
        formStatus.style.color = '#ff8a8a';
        formStatus.textContent = 'Please enter a valid email.';
        return;
      }

      // Open mail client (demo). For production, integrate EmailJS / Netlify Forms etc.
      const subject = encodeURIComponent(`Website contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:vishwaavreddy@gmail.com?subject=${subject}&body=${body}`;

      formStatus.style.color = '#a6f6ee';
      formStatus.textContent = 'Opening your mail client...';
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      formStatus.textContent = '';
    });
  }
});
