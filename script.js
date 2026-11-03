/* =============================================
   SCRIPT — Leonardo Cruz · Portfólio de Dublagem
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── Elements ── */
  const header   = document.getElementById('header');
  const toggle   = document.getElementById('navToggle');
  const menu     = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  /* ══════════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════════ */
  function openMenu() {
    toggle.classList.add('open');
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on link click
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ══════════════════════════════════════════
     HEADER — scroll background
     ══════════════════════════════════════════ */
  function updateHeader() {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ══════════════════════════════════════════
     ACTIVE NAV LINK — scroll spy
     ══════════════════════════════════════════ */
  function highlightNav() {
    const scrollY = window.scrollY + 140;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ══════════════════════════════════════════
     SCROLL REVEAL — fade-in on viewport entry
     ══════════════════════════════════════════ */
  const revealElements = document.querySelectorAll(
    '.char-card, .section__title, .section__subtitle'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
});
