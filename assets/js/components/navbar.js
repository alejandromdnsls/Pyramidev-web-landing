/**
 * components/navbar.js
 * Comportamiento del navbar: scroll, menú móvil
 */

import { qs, addClass, removeClass, setAria, onEscape } from '../core/dom.js';

export const initNavbar = () => {
  const navbar = qs('.navbar');
  const toggle = qs('.navbar__toggle');
  const nav = qs('.navbar__nav');
  const overlay = qs('.navbar__overlay');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (!navbar || !toggle || !nav) return;

  // Estado del menú
  let isOpen = false;

  // Toggle menú móvil
  const toggleMenu = () => {
    isOpen = !isOpen;
    setAria(toggle, 'expanded', isOpen);
    setAria(nav, 'hidden', !isOpen);
    if (overlay) setAria(overlay, 'hidden', !isOpen);

    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    setAria(toggle, 'expanded', false);
    setAria(nav, 'hidden', true);
    if (overlay) setAria(overlay, 'hidden', true);
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Cerrar al hacer click en un link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con ESC
  onEscape(closeMenu);

  // Cambio de estado al hacer scroll
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      addClass(navbar, 'navbar--scrolled');
    } else {
      removeClass(navbar, 'navbar--scrolled');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cerrar menú en resize si se pasa a desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu();
      }
    }, 250);
  });
};

export default initNavbar;