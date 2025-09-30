/**
 * components/filters.js
 * Sistema de filtros para portfolio (sin dependencias)
 */

import { qsa, addClass, removeClass } from '../core/dom.js';

export const initFilters = () => {
  const filterBtns = qsa('[data-filter]');
  const items = qsa('[data-category]');

  if (filterBtns.length === 0 || items.length === 0) return;

  const filterItems = (category) => {
    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (category === 'all' || itemCategory === category) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.3s ease';
      } else {
        item.style.display = 'none';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Actualizar estado activo
      filterBtns.forEach(b => {
        removeClass(b, 'btn--primary');
        addClass(b, 'btn--outline');
      });

      removeClass(btn, 'btn--outline');
      addClass(btn, 'btn--primary');

      // Filtrar items
      filterItems(category);
    });
  });
};

export default initFilters;