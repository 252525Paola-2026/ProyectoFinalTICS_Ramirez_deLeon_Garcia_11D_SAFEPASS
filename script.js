// =========================================================
// SAFEPASS — script.js
// =========================================================

// ---------------------------------------------------------
// Enlace del podcast en YouTube.
// Aún no está disponible: NO se ha inventado ningún enlace.
// Cuando exista, reemplaza la cadena vacía por la URL de
// inserción (embed), por ejemplo:
// const YOUTUBE_PODCAST_URL = 'https://www.youtube.com/embed/VIDEO_ID';
// ---------------------------------------------------------
const YOUTUBE_PODCAST_URL = ''; // [ENLACE YOUTUBE PODCAST PENDIENTE]

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Insertar video de YouTube del podcast (si ya existe enlace) ---------- */
  const youtubeEmbed = document.getElementById('youtubeEmbed');
  const youtubePlaceholder = document.getElementById('youtubePlaceholder');

  if (youtubeEmbed && YOUTUBE_PODCAST_URL) {
    const iframe = document.createElement('iframe');
    iframe.src = YOUTUBE_PODCAST_URL;
    iframe.title = 'Podcast del proyecto SAFEPASS';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    if (youtubePlaceholder) youtubePlaceholder.remove();
    youtubeEmbed.appendChild(iframe);
  }

  /* ---------- Menú hamburguesa (móvil) ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cierra el menú al elegir una sección (útil en móvil)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Barra de progreso de scroll ---------- */
  const progressRail = document.getElementById('progressRail');
  function updateProgress() {
    if (!progressRail) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressRail.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Revelado de secciones al hacer scroll ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .problem-statement, .solucion-grid, .benefit-grid, ' +
    '.aforo-inner, .connections, .video-frame, .team-grid, .ods-inner'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo directamente
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Fallback del video del prototipo ---------- */
  const video = document.getElementById('circuitVideo');
  const fallback = document.getElementById('videoFallback');

  if (video && fallback) {
    // Solo mostramos el respaldo si el archivo realmente falla al cargar
    // (por ejemplo, si no existe en recursos/). El evento "stalled" se
    // eliminó porque se dispara con frecuencia incluso cuando el video
    // es válido, ocultándolo de forma incorrecta.
    video.addEventListener('error', () => {
      video.style.display = 'none';
      fallback.hidden = false;
    });
  }

  /* ---------- Resaltar enlace de navegación activo ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.style.color = '');
          link.style.color = 'var(--purple-deep)';
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(s => navObserver.observe(s));
  }

});
