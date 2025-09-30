# Pyramidev - Sitio Web Corporativo

Sitio web estático para Pyramidev, empresa de desarrollo de software, cloud y DevOps.

## 🚀 Características

- **HTML semántico** con accesibilidad WCAG AA
- **CSS modular** con arquitectura ITCSS + BEM + Scopes
- **JavaScript vanilla modular** (ES6+)
- **SEO optimizado** (meta tags, sitemap, robots.txt)
- **Responsive design** mobile-first
- **Sin dependencias pesadas** (solo EmailJS para formularios)
- **Performance optimizado** para GitHub Pages

## 📁 Estructura del proyecto

```
/
├── index.html              # Página principal
├── about.html              # Nosotros
├── services.html           # Servicios
├── portfolio.html          # Portafolio
├── contact.html            # Contacto
├── privacy.html            # Política de privacidad
├── terms.html              # Términos y condiciones
├── sitemap.xml             # Sitemap para SEO
├── robots.txt              # Robots para crawlers
├── /assets
│   ├── /css                # Estilos (ITCSS)
│   │   ├── 01-settings/    # Tokens, variables
│   │   ├── 02-tools/       # Mixins
│   │   ├── 03-generic/     # Normalize
│   │   ├── 04-elements/    # Base elements
│   │   ├── 05-objects/     # Layout objects
│   │   ├── 06-components/  # Componentes UI
│   │   ├── 07-utilities/   # Utilidades
│   │   └── main.css        # Entry point
│   ├── /js                 # JavaScript modular
│   │   ├── core/           # Helpers DOM, router
│   │   ├── components/     # Navbar, accordion, modal, etc.
│   │   ├── pages/          # Lógica por página
│   │   └── app.js          # Bootstrap
│   └── /img                # Imágenes y SVG
│       ├── logo.svg
│       ├── favicon.svg
│       ├── hero.webp
│       └── tech/           # Logos de tecnologías
└── /forms
    └── emailjs.config.json # Config EmailJS
```

## 🎨 Paleta de colores

```css
--c-primary: #001032      /* Azul oscuro */
--c-secondary: #00B3FA    /* Azul brillante */
--c-accent: #00CAFF       /* Azul claro */
--c-cta: #FF7A00          /* Naranja (CTAs) */
--c-success: #00E676      /* Verde */
--c-error: #FF4D4F        /* Rojo */
```

## ⚙️ Configuración

### 1. Configurar EmailJS (formulario de contacto)

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea un template con las variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{company_name}}`, `{{message}}`
4. Edita `/forms/emailjs.config.json`:

```json
{
  "publicKey": "TU_PUBLIC_KEY",
  "serviceId": "tu_service_id",
  "templateId": "tu_template_id"
}
```

### 2. Alternativa: Formspree (sin JavaScript)

Si prefieres Formspree, edita [contact.html](contact.html):

```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
  <!-- ... campos del formulario ... -->
</form>
```

Y elimina la referencia a EmailJS.

## 🌐 Despliegue en GitHub Pages

### Opción A: Desde rama `main`

1. Ve a **Settings** → **Pages**
2. En "Source", selecciona **Deploy from a branch**
3. Elige `main` y carpeta `/ (root)`
4. Guarda y espera 1-2 minutos

### Opción B: Desde rama `gh-pages`

```bash
# Crear y cambiar a rama gh-pages
git checkout -b gh-pages

# Push a GitHub
git push origin gh-pages

# En Settings → Pages, selecciona la rama gh-pages
```

### Configurar dominio personalizado (opcional)

1. En **Settings** → **Pages**, agrega tu dominio en "Custom domain"
2. Crea un archivo `CNAME` en la raíz:
   ```
   www.pyramidev.com.mx.mx
   ```
3. Configura DNS en tu proveedor:
   ```
   CNAME  www  tu-usuario.github.io
   ```

## 🔧 Desarrollo local

Para probar localmente, necesitas un servidor web (los módulos ES6 requieren HTTP):

### Opción 1: Python
```bash
python3 -m http.server 8000
# Abre http://localhost:8000
```

### Opción 2: Node.js (http-server)
```bash
npx http-server -p 8000
```

### Opción 3: VS Code Live Server
Instala la extensión "Live Server" y abre con "Go Live".

## 🖼️ Reemplazar imágenes

1. **Hero image**: Reemplaza `/assets/img/hero.webp` con tu imagen (formato WebP, 1000x800px recomendado)
2. **Portafolio**: Agrega imágenes en `/assets/img/portfolio/` (formato JPG/WebP)
3. **Logos clientes**: Crea SVG en `/assets/img/clients/`

### Optimizar imágenes

Usa herramientas como:
- [Squoosh](https://squoosh.app/) (WebP, AVIF)
- [TinyPNG](https://tinypng.com/) (PNG, JPG)

## ♿ Accesibilidad

El sitio cumple con **WCAG 2.1 AA**:

- Navegación por teclado completa
- Contraste de colores validado (ratio 4.5:1+)
- Atributos ARIA en componentes interactivos
- Focus visible en elementos interactivos
- Etiquetas semánticas HTML5

### Validar accesibilidad

- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Lighthouse (Chrome DevTools)

## 🚀 Performance

### Optimizaciones aplicadas

- Imágenes lazy loading (`loading="lazy"`)
- CSS crítico inline (opcional)
- JavaScript modular (carga bajo demanda)
- SVG en lugar de iconos pesados
- Sin dependencias de frameworks

### Auditar performance

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://tu-sitio.github.io --view
```

**Objetivo**: 90+ en Performance, Accessibility, SEO

## 📱 Responsive

Breakpoints:

```css
--viewport-sm: 640px
--viewport-md: 768px
--viewport-lg: 1024px
--viewport-xl: 1280px
```

Mobile-first: estilos base para móvil, `@media (min-width)` para desktop.

## 🎨 Personalización

### Cambiar colores

Edita [/assets/css/01-settings/_tokens.css](assets/css/01-settings/_tokens.css):

```css
:root {
  --c-primary: #TU_COLOR;
  --c-secondary: #TU_COLOR;
  /* ... */
}
```

### Agregar componentes

1. Crea `/assets/css/06-components/_tu-componente.css`
2. Importa en [main.css](assets/css/main.css):
   ```css
   @import '06-components/_tu-componente.css';
   ```

### Agregar páginas

1. Crea `nueva-pagina.html` (usa una existente como template)
2. Agrega scope: `<body class="scope-nueva-pagina">`
3. Agrega estilos específicos en `07-utilities/_scopes.css`
4. Actualiza [sitemap.xml](sitemap.xml)

## 🐛 Troubleshooting

### El formulario no envía emails

- Verifica que [emailjs.config.json](forms/emailjs.config.json) tenga las credenciales correctas
- Revisa la consola del navegador para errores
- Asegúrate de que EmailJS esté configurado correctamente

### Los módulos JS no cargan

- Verifica que estés usando un servidor HTTP (no `file://`)
- Revisa la consola para errores de CORS
- Asegúrate de que las rutas de importación sean correctas

### El sitio no se ve en GitHub Pages

- Espera 1-2 minutos después del push
- Verifica que la rama y carpeta estén correctamente configuradas en Settings → Pages
- Revisa que no haya errores en Actions (si usas workflows)

## 📄 Licencia

Este proyecto es propiedad de Pyramidev. Todos los derechos reservados.

## 📞 Soporte

Para preguntas o soporte, contacta a:
- **Email**: hola@pyramidev.com.mx
- **Website**: [https://pyramidev.com.mx](https://pyramidev.com.mx)

---

**¡Listo para producción!** 🎉

Última actualización: Enero 2025