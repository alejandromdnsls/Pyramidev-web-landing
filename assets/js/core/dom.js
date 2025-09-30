/**
 * core/dom.js
 * Helpers para manipulación del DOM y accesibilidad
 */

export const qs = (selector, parent = document) => parent.querySelector(selector);
export const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

export const addClass = (el, className) => el?.classList.add(className);
export const removeClass = (el, className) => el?.classList.remove(className);
export const toggleClass = (el, className) => el?.classList.toggle(className);
export const hasClass = (el, className) => el?.classList.contains(className);

export const setAttr = (el, attr, value) => el?.setAttribute(attr, value);
export const getAttr = (el, attr) => el?.getAttribute(attr);
export const removeAttr = (el, attr) => el?.removeAttribute(attr);

export const setAria = (el, attr, value) => setAttr(el, `aria-${attr}`, value);
export const getAria = (el, attr) => getAttr(el, `aria-${attr}`);

export const show = (el) => {
  if (el) el.style.display = '';
};

export const hide = (el) => {
  if (el) el.style.display = 'none';
};

export const focusElement = (el) => {
  if (el && typeof el.focus === 'function') {
    el.focus();
  }
};

export const trapFocus = (el) => {
  const focusableElements = qsa(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    el
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTab = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  el.addEventListener('keydown', handleTab);
  return () => el.removeEventListener('keydown', handleTab);
};

export const onEscape = (callback) => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') callback(e);
  };

  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
};