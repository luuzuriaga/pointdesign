"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM ha terminado su transición de ruta
    const timeoutId = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealActive');
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Buscar todos los elementos con la clase 'reveal'
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

