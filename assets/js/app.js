/**
 * app.js
 * Bootstrap de la aplicación - inicializa todos los módulos
 */

import initRouter from './core/router.js';
import initNavbar from './components/navbar.js';
import initAccordion from './components/accordion.js';
import initModal from './components/modal.js';
import initFilters from './components/filters.js';
import initThemeToggle from './components/theme-toggle.js';
import initHome from './pages/home.js';
import initContact from './pages/contact.js';

// Detectar página actual
const isPage = (name) => {
  const path = window.location.pathname;
  return path === `/${name}.html` || path === `/${name}` || (name === 'index' && path === '/');
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Core
  initRouter();

  // Componentes globales
  initThemeToggle(); // Inicializar primero para evitar flash
  initNavbar();
  initAccordion();
  initModal();

  // Inicialización específica por página
  if (isPage('index') || isPage('')) {
    initHome();
  }

  if (isPage('contact')) {
    initContact();
  }

  if (isPage('portfolio')) {
    initFilters();
  }

  // Scroll suave para anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = 80;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('✅ Pyramidev - Site initialized');
});