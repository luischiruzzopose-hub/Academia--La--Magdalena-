# La Magdalena · Academia de Choferes — Sitio web

Sitio estático (HTML/CSS/JS, sin build ni dependencias).

## Estructura
```
index.html          → página principal (promo 4+1, clases, coche escuela, aprobados, contacto)
simulacro.html      → simulacro de examen teórico (30 preguntas, revisión, historial y ranking)
styles.css / script.js
assets/
  images/            coche escuela, certificado ANDIPEC (cédula oculta), imagen para redes (og), ícono
  images/aprobados/  fotos de alumnos aprobados
  images/simulacro/  señales de tránsito del simulacro
```

## Datos pendientes del cliente (están marcados en index.html con comentarios)
- **Precios**: buscá `<!-- PRECIO:` en index.html y reemplazá "Consultar" por el precio.
- **Foto del instructor**: guardala como `assets/images/instructor.jpg` y seguí el comentario `FOTO DEL INSTRUCTOR`.
- **Ubicación / Instagram**: buscá `<!-- UBICACIÓN` y `<!-- INSTAGRAM` en la sección de contacto.
- **Testimonios**: la sección `#testimonios` está preparada pero oculta (`hidden`). Activala solo con opiniones reales.

## Publicar en Vercel
Subí el contenido de esta carpeta al repositorio conectado a Vercel (reemplazando los archivos anteriores) y Vercel lo publica solo.
