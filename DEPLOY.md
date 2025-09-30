# 🚀 Guía de Despliegue Rápido - GitHub Pages

## Paso 1: Subir el código a GitHub

```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit: Pyramidev website"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/pyramidev-web.git
git branch -M main
git push -u origin main
```

## Paso 2: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click en **Save**
6. Espera 1-2 minutos

Tu sitio estará disponible en: `https://TU_USUARIO.github.io/pyramidev-web/`

## Paso 3: Configurar EmailJS (Formulario de Contacto)

### Opción A: EmailJS (recomendado)

1. Crea cuenta en [EmailJS](https://www.emailjs.com/)
2. Ve a **Email Services** → **Add New Service**
3. Conecta tu email (Gmail, Outlook, etc.)
4. Ve a **Email Templates** → **Create New Template**
5. Configura el template con estas variables:

```
Asunto: Nuevo contacto desde Pyramidev

Hola,

Has recibido un nuevo mensaje desde el sitio web:

Nombre: {{name}}
Email: {{email}}
Teléfono: {{phone}}
Empresa: {{company_name}}

Mensaje:
{{message}}
```

6. Copia tu **Public Key**, **Service ID** y **Template ID**
7. Edita `/forms/emailjs.config.json`:

```json
{
  "publicKey": "TU_PUBLIC_KEY",
  "serviceId": "tu_service_id",
  "templateId": "tu_template_id"
}
```

8. **IMPORTANTE**: Agrega `/forms/emailjs.config.json` a `.gitignore` (ya está incluido)
9. Commit y push:

```bash
git add forms/emailjs.config.json
git commit -m "Add EmailJS config"
git push
```

### Opción B: Formspree (más simple, sin JS)

1. Regístrate en [Formspree](https://formspree.io/)
2. Crea un nuevo formulario y copia el endpoint
3. Edita `contact.html`, línea del `<form>`:

```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST" class="form">
```

4. Elimina el script de EmailJS:

```html
<!-- Elimina esta línea -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

5. Comenta la llamada a `initContact()` en `assets/js/app.js`

## Paso 4: Reemplazar Imágenes Placeholder

### Hero Image

Reemplaza `/assets/img/hero.webp` con tu imagen:

```bash
# Convierte a WebP (opcional, pero recomendado)
# Usa https://squoosh.app/ o herramientas CLI
```

Dimensiones recomendadas: **1000x800px**, formato **WebP**

### Imágenes de Portafolio

Reemplaza las 6 imágenes en `/assets/img/portfolio/`:
- `project-1.jpg` hasta `project-6.jpg`
- Dimensiones: **600x400px**
- Formato: **JPG** o **WebP**

```bash
# Optimizar imágenes antes de subir
# Usa TinyPNG, Squoosh, o ImageOptim
```

## Paso 5: Personalizar Contenido

### Textos y Datos de Contacto

Busca y reemplaza en todos los archivos HTML:

- `hola@pyramidev.com.mx` → Tu email
- `+52 (55) 2190 2339` → Tu teléfono
- `Ciudad de México, México` → Tu ubicación
- URLs de redes sociales en el footer

### Meta Tags (SEO)

Edita en cada página HTML:

```html
<meta name="description" content="TU DESCRIPCIÓN">
<meta property="og:title" content="TU TÍTULO">
<meta property="og:url" content="TU_URL">
```

### Sitemap

Edita `sitemap.xml` y reemplaza `https://pyramidev.com.mx` con tu URL:

```xml
<loc>https://TU_DOMINIO.com/</loc>
```

## Paso 6: Dominio Personalizado (Opcional)

### Si tienes un dominio propio:

1. En **Settings** → **Pages**, agrega tu dominio en **Custom domain**
2. Crea archivo `CNAME` en la raíz del proyecto:

```
www.pyramidev.com.mx.mx
```

3. Configura DNS en tu proveedor:

```
Tipo    Nombre    Valor
A       @         185.199.108.153
A       @         185.199.109.153
A       @         185.199.110.153
A       @         185.199.111.153
CNAME   www       TU_USUARIO.github.io
```

4. Espera 24-48 horas para propagación DNS

## Paso 7: Verificar Despliegue

### Checklist post-despliegue:

- [ ] El sitio carga correctamente en `https://TU_USUARIO.github.io/REPO`
- [ ] Todas las páginas funcionan (index, about, services, portfolio, contact)
- [ ] El menú móvil abre/cierra correctamente
- [ ] El formulario de contacto envía emails
- [ ] Las imágenes cargan (o muestran placeholders)
- [ ] FAQ acordeones abren/cierran
- [ ] Modales de portafolio funcionan
- [ ] Navegación por teclado funciona (Tab, Enter, Escape)

### Pruebas de Performance y SEO:

```bash
# Lighthouse CLI (opcional)
npm install -g lighthouse
lighthouse https://TU_SITIO.github.io --view
```

O usa **Chrome DevTools** → **Lighthouse** → **Generate Report**

**Objetivo**: 90+ en Performance, Accessibility, SEO

## Paso 8: Mantenimiento

### Actualizar contenido:

```bash
# Edita archivos HTML, CSS o JS
git add .
git commit -m "Update: descripción de cambios"
git push

# GitHub Pages se actualiza automáticamente en 1-2 minutos
```

### Agregar nuevo proyecto al portafolio:

1. Agrega imagen en `/assets/img/portfolio/`
2. Edita `portfolio.html`:

```html
<article class="card card--portfolio" data-category="WEB_O_MOBILE_O_CLOUD">
  <div class="card__image">
    <img src="/assets/img/portfolio/nuevo-proyecto.jpg" alt="Descripción">
  </div>
  <div class="card__content">
    <h3 class="card__title">Título del Proyecto</h3>
    <p class="card__description">Descripción breve...</p>
    <div class="card__tags">
      <span class="card__tag">React</span>
      <span class="card__tag">Node.js</span>
    </div>
  </div>
</article>
```

3. Commit y push

## Troubleshooting

### Error: "Page build failed"

- Revisa que no haya errores de sintaxis HTML
- Asegúrate de que todos los archivos CSS y JS existen
- Revisa **Actions** en GitHub para ver el error específico

### Formulario no envía

- Verifica credenciales en `emailjs.config.json`
- Revisa consola del navegador (F12) para errores
- Prueba con Formspree como alternativa

### CSS/JS no cargan

- Verifica que las rutas empiecen con `/` (absoluta) o `./` (relativa)
- Asegúrate de que `main.css` importe todos los parciales
- Revisa la pestaña **Network** en DevTools

## Recursos Útiles

- [GitHub Pages Docs](https://docs.github.com/pages)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Web.dev (Performance)](https://web.dev/)
- [WAVE (Accesibilidad)](https://wave.webaim.org/)

---

**¿Necesitas ayuda?** Contacta a hola@pyramidev.com.mx

¡Tu sitio está listo para producción! 🎉