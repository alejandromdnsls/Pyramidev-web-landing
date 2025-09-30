/**
 * core/router.js
 * Detecta la página actual y marca el link activo en navbar
 */

import { qsa, addClass } from './dom.js';

export const initRouter = () => {
  const currentPath = window.location.pathname;
  const navLinks = qsa('.navbar__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Marca como activo el link que coincide con la página actual
    if (
      (currentPath === '/' && href === 'index.html') ||
      (currentPath === '/index.html' && href === 'index.html') ||
      currentPath.endsWith(href)
    ) {
      addClass(link, 'navbar__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

export default initRouter;