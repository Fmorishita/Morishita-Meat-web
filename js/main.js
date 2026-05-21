/* ============================================================
   MORISHITA MEAT — main.js (núcleo compartido)
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Supabase ---------- */
  const SUPABASE_URL      = 'https://ajoxbzmenrrpqxxzjyhf.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqb3hiem1lbnJycHF4eHpqeWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNDMzMzAsImV4cCI6MjA5NDkxOTMzMH0.tsrS7f_WomK3I_YQfpZLeNfWD7wzTPHBCvdpX7kZcRs';

  let db = null;
  try {
    if (window.supabase) db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) { console.warn('Supabase no disponible:', err); }

  /* ---------- Helpers globales ---------- */
  const CART_KEY = 'mm_cart';

  const formatPrice = (n) =>
    '$' + Number(n).toLocaleString('es-MX') + ' MXN';

  const getCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  };
  const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

  const updateCartCount = () => {
    const total = getCart().reduce((s, it) => s + (it.qty || 1), 0);
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = total;
      el.hidden = total === 0;
    });
  };

  const addToCart = (item) => {
    const cart = getCart();
    const key = `${item.id}__${item.peso}`;
    const existing = cart.find(it => `${it.id}__${it.peso}` === key);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    saveCart(cart);
    updateCartCount();
    toast(`Añadido: ${item.nombre} · ${item.peso}`);
  };

  let toastTimer;
  const toast = (msg) => {
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    if (!t || !m) return;
    m.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2800);
  };

  // Exponer API mínima para coleccion.js / producto.js
  window.MM = { formatPrice, getCart, addToCart, updateCartCount, toast, db };

  /* ---------- Año dinámico ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scroll + burger ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = nav.querySelector('.nav__burger');
    burger?.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__menu a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger?.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Carrito (placeholder visual) ---------- */
  updateCartCount();
  document.querySelectorAll('[data-cart-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cart = getCart();
      if (!cart.length) { toast('Tu carrito está vacío'); return; }
      const total = cart.reduce((s, it) => s + it.precio * it.qty, 0);
      toast(`${cart.reduce((s,it)=>s+it.qty,0)} artículo(s) · ${formatPrice(total)} — checkout próximamente`);
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Carrusel horizontal (BMS) ---------- */
  const scroller = document.getElementById('bmsScroll');
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!scroller) return;
      const dir = Number(btn.dataset.scroll);
      scroller.scrollBy({ left: dir * (scroller.clientWidth * 0.8), behavior: 'smooth' });
    });
  });

  /* ---------- Video placeholder ---------- */
  document.querySelector('.videoblock__play')?.addEventListener('click', () => {
    toast('Video próximamente');
  });

  /* ---------- Newsletter → Supabase ---------- */
  const nlForm = document.getElementById('newsletterForm');
  nlForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (new FormData(nlForm).get('email') || '').toString().trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast('Ingresa un correo válido'); return;
    }
    const btn = nlForm.querySelector('button');
    if (btn) { btn.disabled = true; }
    if (db) {
      try {
        await db.from('contactos').insert({
          nombre: 'Newsletter',
          telefono: '-',
          tipo: 'consumidor',
          mensaje: `Suscripción boletín: ${email}`
        });
      } catch (err) { console.warn('No se guardó la suscripción:', err); }
    }
    toast('¡Gracias! Estás en el círculo íntimo.');
    nlForm.reset();
    if (btn) { btn.disabled = false; }
  });
})();
