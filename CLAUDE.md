# CLAUDE.md

Este archivo da contexto a Claude Code cuando trabaje en este proyecto.

## Proyecto
Sitio web de **Morishita Meat** — carnicería premium 100% digital con dos canales: B2C (consumidor final) y B2B (chefs/restaurantes). Marca hermana de Morishita Japanese Cuisine.

## Stack
HTML + CSS + JS vanilla. Sin frameworks, sin build step. Fonts vía Google Fonts.

## Convenciones de código
- **CSS**: BEM-ish (`.bloque__elemento--modificador`). Variables en `:root`. Mobile-first solo donde aplica; el resto, media queries `max-width`.
- **JS**: vanilla ES6+, sin dependencias. Todo envuelto en IIFE.
- **HTML**: semántico (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`). Atributos ARIA donde tenga sentido.
- **Idioma**: español (México). Mantener voz directa, sobria, sin tecnicismos innecesarios.

## Identidad visual
- Paleta: negro carbón + dorado champagne + bordeaux. NO cambiar sin discutir.
- Tipos: Cormorant Garamond (display), Shippori Mincho (kanji/japonés), Inter (UI).
- Carácter: lujo oscuro, refinado, con guiño japonés (kanji 肉, romaji 森下).

## Qué evitar
- No introducir frameworks pesados (React, Vue, etc.) salvo que se acuerde explícitamente.
- No usar emojis decorativos en la UI (rompe el tono de marca).
- No usar fuentes genéricas (Arial, Inter como display, Roboto…).
- No agregar carruseles ni sliders pesados — la marca pide quietud, no movimiento constante.

## Tareas pendientes prioritarias
Ver sección "Para Claude Code" del README.md. Los tres top:
1. Reemplazar placeholders de contacto (WhatsApp, IG, email).
2. Sustituir gradientes de productos por fotos reales.
3. Añadir favicon + meta tags OG/Twitter.

## Cómo testear cambios
Abrir `index.html` directamente en el navegador, o servir con `python3 -m http.server 8000`. Revisar en mobile (DevTools) además de desktop.
