/* ============================================================
   GUEST.JS — Interactions communes du portail voyageurs
   (header au scroll + reveal progressif)
   ============================================================ */

(function () {
  'use strict';

  /* ── Header : classe "scrolled" au défilement ── */
  function initHeaderScroll() {
    const header = document.querySelector('.guest-header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal au scroll ── */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const revealAll = () => targets.forEach(el => el.classList.add('visible'));

    /* Si pas d'IntersectionObserver ou animations réduites → tout afficher */
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -10% 0px'
    });

    targets.forEach(el => observer.observe(el));

    /* Filet de sécurité : si pour une raison quelconque un élément n'a pas
       été révélé après 1,5 s (ex. capture, navigateur exotique), on l'affiche. */
    setTimeout(revealAll, 1500);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initReveal();
  });
})();
