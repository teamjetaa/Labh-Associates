import { useEffect, useRef } from 'react';

/* ===== PAGE LOAD ENTRANCE =====
 * Wraps page content in a gentle fade-in + rise animation on mount.
 * Subtle and editorial — opacity 0→1 with a slight upward drift over 0.8s.
 */
export default function PageLoader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Small delay so the DOM is painted before the transition begins
    const timer = setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(14px)',
        transition: 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}