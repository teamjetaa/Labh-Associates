import { useEffect, useRef } from 'react';

/*
 * Scroll Reveal Hook
 * Attaches IntersectionObserver to observe elements with .reveal class
 * Adds .visible when they enter viewport
 * Supports staggered delays via data-delay attribute on .reveal children
 */
export default function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Top-level .reveal: show immediately
            entry.target.classList.add('visible');

            // Stagger children: add delays to direct children
            const children = entry.target.querySelectorAll('.reveal-stagger > *');
            children.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
              child.classList.add('visible');
            });

            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
}