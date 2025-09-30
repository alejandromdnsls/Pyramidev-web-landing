/**
 * components/accordion.js
 * Acordeones accesibles para FAQ
 */

import { qsa, setAria } from '../core/dom.js';

export const initAccordion = () => {
  const accordions = qsa('.accordion');

  accordions.forEach(accordion => {
    const items = qsa('.accordion__item', accordion);

    items.forEach((item, index) => {
      const header = item.querySelector('.accordion__header');
      const content = item.querySelector('.accordion__content');

      if (!header || !content) return;

      // IDs únicos para accesibilidad
      const headerId = `accordion-header-${index}`;
      const contentId = `accordion-content-${index}`;

      header.id = headerId;
      content.id = contentId;

      header.setAttribute('aria-controls', contentId);
      content.setAttribute('aria-labelledby', headerId);

      // Estado inicial: cerrado
      setAria(header, 'expanded', false);
      setAria(content, 'hidden', true);

      // Toggle al hacer click
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        setAria(header, 'expanded', !isExpanded);
        setAria(content, 'hidden', isExpanded);
      });
    });
  });
};

export default initAccordion;