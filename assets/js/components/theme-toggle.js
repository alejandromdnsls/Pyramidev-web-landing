/**
 * components/theme-toggle.js
 * Componente para cambiar entre modo claro y oscuro
 */

export const initThemeToggle = () => {
  // Obtener tema guardado o usar preferencia del sistema
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Aplicar tema
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Actualizar botón
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  };

  // Alternar tema
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Inicializar tema
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Evento del botón
  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
  }

  // Escuchar cambios en preferencias del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
};

export default initThemeToggle;