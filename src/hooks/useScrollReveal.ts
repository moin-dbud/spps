import { useEffect } from 'react';

/**
 * Custom hook for high-performance scroll-triggered reveals using IntersectionObserver.
 * - Automatically respects `prefers-reduced-motion`
 * - Runs once per element to prevent unnecessary re-animations
 * - Clean teardown on route change or unmount
 */
export function useScrollReveal(dependencies: any[] = [], selector = '.reveal-on-scroll') {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}

