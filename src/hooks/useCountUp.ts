import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  duration?: number;
  threshold?: number;
  start?: number;
}

/*
 * useCountUp
 * Animates a number from `start` to `target` when the returned ref
 * scrolls into view. Respects prefers-reduced-motion by jumping
 * straight to the final value.
 */
export default function useCountUp(target: number, options: CountUpOptions = {}) {
  const { duration = 1600, threshold = 0.4, start = 0 } = options;
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;

          const startTime = performance.now();
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setValue(Math.floor(start + easeOutCubic(progress) * (target - start)));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold, start]);

  return { ref, value };
}