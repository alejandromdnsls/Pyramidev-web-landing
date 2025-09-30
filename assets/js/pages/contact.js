/**
 * pages/contact.js
 * Manejo del formulario de contacto con EmailJS
 */

import { qs } from '../core/dom.js';

export const initContact = async () => {
  const form = qs('#contactForm');
  if (!form) return;

  const statusEl = qs('#formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Cargar configuración de EmailJS
  let config = null;
  try {
    const response = await fetch('/forms/emailjs.config.json');
    config = await response.json();

    // Inicializar EmailJS
    if (window.emailjs && config.publicKey) {
      emailjs.init(config.publicKey);
    }
  } catch (error) {
    console.warn('EmailJS config not found. Form will use fallback method.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-spam: verificar honeypot
    const formData = new FormData(form);
    const honeypot = formData.get('company');
    if (honeypot) {
      // Bot detectado, no hacer nada
      return;
    }

    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Limpiar mensaje anterior
    statusEl.textContent = '';
    statusEl.className = 'form__status';

    try {
      if (window.emailjs && config) {
        // Enviar con EmailJS
        const templateParams = Object.fromEntries(formData);
        delete templateParams.company; // Eliminar honeypot

        await emailjs.send(
          config.serviceId,
          config.templateId,
          templateParams
        );

        // Éxito
        statusEl.textContent = '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos muy pronto.';
        statusEl.className = 'form__status form__status--success';
        form.reset();
      } else {
        // Fallback: mostrar mensaje de instrucción
        statusEl.textContent = 'Por favor configura EmailJS o usa un servicio alternativo. Ve el README para más información.';
        statusEl.className = 'form__status form__status--error';
      }
    } catch (error) {
      console.error('Error sending email:', error);
      statusEl.textContent = 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbenos a hola@pyramidev.com.mx';
      statusEl.className = 'form__status form__status--error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });

  // Validación en tiempo real
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (input.name === 'company') return; // Skip honeypot

    input.addEventListener('blur', () => {
      const parent = input.closest('.form__group');
      if (!parent) return;

      if (input.validity.valid) {
        parent.classList.remove('form__group--error');
      } else {
        parent.classList.add('form__group--error');
      }
    });
  });
};

export default initContact;