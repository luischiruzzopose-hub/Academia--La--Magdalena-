# La Magdalena · Academia de Choferes — Sitio web

Sitio estático (HTML/CSS/JS, sin build ni dependencias).

## Estructura
```
index.html          → página principal (promo 4+1, clases, coche escuela, aprobados, contacto)
simulacro.html      → simulacro de examen teórico (30 preguntas, revisión, historial y ranking)
styles.css / script.js
assets/
  images/            foto del coche escuela, ícono
  images/aprobados/  fotos de alumnos aprobados
  images/simulacro/  señales de tránsito del simulacro
```

## Publicarlo gratis con GitHub Pages
1. Creá un repositorio vacío en https://github.com/new (por ejemplo `lamagdalena-web`).
2. Subí todo el contenido de esta carpeta (botón "uploading an existing file" o con git).
3. En el repositorio: **Settings → Pages** → rama `main`, carpeta `/ (root)` → Guardar.
4. En unos minutos queda online en `https://TU-USUARIO.github.io/lamagdalena-web/`

También se puede subir tal cual a Netlify (arrastrando la carpeta a https://app.netlify.com/drop).

## Editar el simulacro
Las preguntas están al final de `simulacro.html`, dentro del `<script>`. Cada pregunta tiene
`categoria`, `pregunta`, `imagen`, `opciones`, `correcta` (número de la opción, empezando en 0)
y `explicacion`. Las imágenes de señales van en `assets/images/simulacro/`.

## Contacto en el sitio
WhatsApp / teléfono: 095 380 690 (enlaces `https://wa.me/59895380690` y `tel:+59895380690`).
