/**
 * components/modal.js
 * Modal/lightbox accesible para portfolio
 */

import { qs, setAria, trapFocus, onEscape, focusElement } from '../core/dom.js';

let activeModal = null;
let removeFocusTrap = null;
let removeEscapeHandler = null;

export const openModal = (modalId) => {
  const modal = qs(`#${modalId}`);
  if (!modal) return;

  activeModal = modal;

  setAria(modal, 'hidden', false);
  document.body.style.overflow = 'hidden';

  // Trap focus dentro del modal
  removeFocusTrap = trapFocus(modal);

  // Cerrar con ESC
  removeEscapeHandler = onEscape(() => closeModal());

  // Focus en el botón de cerrar
  const closeBtn = qs('.modal__close', modal);
  if (closeBtn) {
    setTimeout(() => focusElement(closeBtn), 100);
  }
};

export const closeModal = () => {
  if (!activeModal) return;

  setAria(activeModal, 'hidden', true);
  document.body.style.overflow = '';

  // Limpiar event listeners
  if (removeFocusTrap) removeFocusTrap();
  if (removeEscapeHandler) removeEscapeHandler();

  activeModal = null;
};

export const initModal = () => {
  // Botones de cierre
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Overlay de cierre
  const overlays = document.querySelectorAll('.modal__overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', closeModal);
  });

  // Botones que abren modales
  const openBtns = document.querySelectorAll('[data-modal-open]');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal-open');
      openModal(modalId);
    });
  });
};

export default initModal;