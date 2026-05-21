/* ============================================================
   MORISHITA MEAT — main.js
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Supabase ---------- */
  // Credenciales públicas (anon key — seguras en frontend con RLS activo)
  const SUPABASE_URL      = 'https://ajoxbzmenrrpqxxzjyhf.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqb3hiem1lbnJycHF4eHpqeWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNDMzMzAsImV4cCI6MjA5NDkxOTMzMH0.tsrS7f_WomK3I_YQfpZLeNfWD7wzTPHBCvdpX7kZcRs';

  let db = null;
  try {
    if (SUPABASE_URL !== 'SUPABASE_URL_PLACEHOLDER' && window.supabase) {
      db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  } catch (err) {
    console.warn('Supabase no disponible:', err);
  }

  /* ---------- Año dinámico ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scroll shrink ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const burger = document.querySelector('.nav__burger');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  // cerrar al hacer click en un link
  document.querySelectorAll('.nav__menu a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---------- Reveal on scroll ---------- */
  const revealSelectors = [
    '.section__head',
    '.card',
    '.about__copy',
    '.about__visual',
    '.chefs__card',
    '.contact__copy',
    '.contact__form'
  ];
  const els = document.querySelectorAll(revealSelectors.join(','));
  els.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));

  /* ---------- Formulario de contacto ---------- */
  const form   = document.getElementById('contactForm');
  const note   = document.getElementById('formNote');
  const submit = form?.querySelector('[type="submit"]');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data     = new FormData(form);
    const nombre   = (data.get('nombre')   || '').toString().trim();
    const telefono = (data.get('telefono') || '').toString().trim();
    const tipo     = (data.get('tipo')     || '').toString();
    const mensaje  = (data.get('mensaje')  || '').toString().trim();

    if (!nombre || !telefono) {
      showNote('Por favor completa nombre y teléfono.', 'error');
      return;
    }

    // Deshabilitar botón mientras procesa
    if (submit) { submit.disabled = true; submit.textContent = 'Enviando…'; }

    // 1 — Guardar en Supabase
    if (db) {
      try {
        const { error } = await db.from('contactos').insert({
          nombre,
          telefono,
          tipo,
          mensaje: mensaje || null
        });
        if (error) console.warn('Supabase insert error:', error.message);
      } catch (err) {
        console.warn('Error al guardar contacto:', err);
      }
    }

    // 2 — Abrir WhatsApp con mensaje pre-llenado
    const tipoLabel = tipo === 'chef' ? 'Chef / Restaurante' : 'Consumidor final';
    const text =
      `Hola Morishita Meat, soy ${nombre} (${tipoLabel}).%0A` +
      `Teléfono: ${telefono}%0A` +
      (mensaje ? `Me interesa: ${mensaje}` : 'Me gustaría conocer disponibilidad y precios.');

    // TODO: reemplazar 5210000000000 por el número real cuando lo tengamos
    const whatsappURL = `https://wa.me/5210000000000?text=${text}`;
    window.open(whatsappURL, '_blank', 'noopener');

    showNote('¡Mensaje enviado! Abrimos WhatsApp para continuar.', 'ok');
    form.reset();

    if (submit) { submit.disabled = false; submit.textContent = 'Enviar solicitud'; }
  });

  function showNote(msg, kind) {
    if (!note) return;
    note.textContent = msg;
    note.hidden = false;
    note.style.color = kind === 'error' ? '#e88' : '';
  }
})();
