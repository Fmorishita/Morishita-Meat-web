# Morishita Meat — Sitio Web

Sitio web profesional para **Morishita Meat**, carnicería premium 100% digital con dos canales:
- **B2C**: consumidor final con entrega a domicilio.
- **B2B**: chefs y restaurantes con precios preferenciales.

Marca hermana: **Morishita Japanese Cuisine** (omakase japonés).

---

## 📁 Estructura del proyecto

```
morishita-meat/
├── index.html              # Página única con todas las secciones
├── css/
│   └── styles.css          # Estilos (lujo oscuro, negro + dorado)
├── js/
│   └── main.js             # Nav, reveal on scroll, formulario
├── assets/
│   └── images/             # (vacío) → aquí van fotos reales de cortes
├── .gitignore
└── README.md
```

## 🎨 Sistema de diseño

- **Paleta**: negro carbón (`#0a0a0a`), dorado champagne (`#c9a24a`), bordeaux acento (`#5c1a1b`), bone (`#efe7d7`).
- **Tipografía**: Cormorant Garamond (display), Shippori Mincho (japonés), Inter (UI).
- Variables CSS centralizadas en `:root` dentro de `css/styles.css`.

## 🧩 Secciones

1. **Hero** — claim principal + 2 CTAs (Ver cortes / Soy chef).
2. **Marquee** — cinta horizontal con nombres de cortes.
3. **Productos** — 6 cortes destacados con descripción (Wagyu A5, Tomahawk, Ribeye, New York, Picaña, Short Rib).
4. **Nosotros** — historia, conexión con Morishita Japanese Cuisine.
5. **Chefs** — programa B2B con 4 beneficios.
6. **Contacto** — canales directos + formulario que abre WhatsApp.

## 🚀 Cómo verlo en local

Simplemente abre `index.html` en el navegador. O sirve con cualquier server:

```bash
# Con Python
python3 -m http.server 8000

# Con Node
npx serve .
```

---

# 🤖 Para Claude Code — Siguientes pasos

Este sitio está al **80%**. Lo que falta hacer (en orden recomendado):

## 1. Reemplazar placeholders críticos
- [ ] **WhatsApp**: en `js/main.js` línea con `5210000000000` → poner el número real con código de país.
- [ ] **Tarjetas de contacto en `index.html`**: reemplazar `+52 000 000 0000`, `@morishitameat`, `hola@morishitameat.com` y poner los `href` correctos (`https://wa.me/...`, `https://instagram.com/...`, `mailto:...`).
- [ ] **Ubicación**: el footer dice "Ensenada, BC" — confirmar si esta es la zona de cobertura o ajustar.

## 2. Imágenes reales
Las cards de productos usan gradientes radiales como placeholder. Hay que reemplazar por fotos reales:
- [ ] Conseguir 6 fotos de cortes (cuadradas o 4:3) y guardarlas en `assets/images/` con nombres: `wagyu.jpg`, `tomahawk.jpg`, `ribeye.jpg`, `newyork.jpg`, `picana.jpg`, `shortrib.jpg`.
- [ ] En `css/styles.css`, cambiar cada bloque `.card__media--XXX::after` para usar:
  ```css
  .card__media--wagyu::after {
    background: url('../assets/images/wagyu.jpg') center/cover no-repeat;
  }
  ```
- [ ] Considerar foto/render para el bloque "Nosotros" (`.about__visual`) en lugar del kanji.
- [ ] Agregar `<meta property="og:image">` para previews al compartir.

## 3. SEO y metadata
- [ ] Añadir favicon (`favicon.ico` + `apple-touch-icon.png`).
- [ ] Añadir Open Graph + Twitter Card tags en `<head>`.
- [ ] Añadir `schema.org` JSON-LD (LocalBusiness o FoodEstablishment).
- [ ] Crear `sitemap.xml` y `robots.txt`.

## 4. Funcionalidad
- [ ] **Formulario**: actualmente abre WhatsApp. Si se quiere envío por email, integrar [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/) o un backend propio.
- [ ] **Catálogo extendido**: si crece el catálogo, considerar separar a `productos.html` y/o usar un CMS headless (Sanity, Contentful) o un JSON simple.
- [ ] **Carrito / pedidos online**: si más adelante se quiere e-commerce, evaluar Shopify (con tema custom) o Snipcart sobre este HTML.

## 5. Performance y accesibilidad
- [ ] Optimizar imágenes (WebP + lazy loading: `loading="lazy"`).
- [ ] Auditar con Lighthouse (objetivo: 95+ en todas las categorías).
- [ ] Verificar contraste de texto sobre fondos oscuros (especialmente `--muted` sobre `--ink-2`).
- [ ] Probar navegación por teclado y screen readers.

## 6. Deploy
Opciones recomendadas (de más fácil a más completa):

1. **Netlify** — drag & drop la carpeta o conectar repo Git. Dominio gratis tipo `morishita-meat.netlify.app` o conectar dominio propio.
2. **Vercel** — similar a Netlify.
3. **Cloudflare Pages** — gratis, CDN global, conectar dominio.
4. **GitHub Pages** — gratis si el repo es público.

Pasos típicos:
```bash
git init
git add .
git commit -m "Initial: Morishita Meat website"
git remote add origin <tu-repo>
git push -u origin main
```
Luego conectar el repo en Netlify/Vercel/Cloudflare.

## 7. Dominio
- Comprar `morishitameat.com` (o `.mx`) en Namecheap, Cloudflare Registrar o Google Domains.
- Apuntar DNS al servicio de hosting elegido.

---

## 💡 Notas de diseño / decisiones

- El sitio se diseñó como **single-page** porque el contenido aún es acotado. Cuando crezca, se puede romper en multi-page sin tocar mucho el CSS.
- Las animaciones son **CSS puro** (no librerías) para mantener el sitio ligero.
- El `<form>` no envía a ningún backend: abre WhatsApp con el mensaje pre-llenado. Es lo más eficiente para un negocio chico, evita perder leads en bandejas de email.
- El kanji **肉** ("carne") aparece como elemento decorativo en hero y sección "Nosotros" para reforzar identidad japonesa.

## 📞 Contacto del proyecto
Reemplazar con datos reales del dueño del negocio.
