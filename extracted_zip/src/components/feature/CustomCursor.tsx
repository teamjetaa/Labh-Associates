import { useEffect, useRef } from 'react';

/* ===== WARM HALO CURSOR =====
 * Soft editorial glow that follows the mouse.
 * Two layers:
 *   - Outer halo: large (~120px) radial gradient, barely visible, slow follow
 *   - Inner glow: smaller (~40px) warm spot, tighter follow
 * Both expand slightly on interactive elements.
 * Hides on touch devices.
 */
export default function CustomCursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -200, y: -200 });
  const posRef = useRef({ x: -200, y: -200 });
  const glowPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.documentElement.classList.add('custom-cursor-active');

    const halo = haloRef.current;
    const glow = glowRef.current;
    if (!halo || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Outer halo — slow, lazy follow (lerp ~0.08)
      posRef.current.x += (mx - posRef.current.x) * 0.08;
      posRef.current.y += (my - posRef.current.y) * 0.08;

      // Inner glow — faster, tighter follow (lerp ~0.18)
      glowPosRef.current.x += (mx - glowPosRef.current.x) * 0.18;
      glowPosRef.current.y += (my - glowPosRef.current.y) * 0.18;

      halo.style.transform = `translate3d(${posRef.current.x - 60}px, ${posRef.current.y - 60}px, 0)`;
      glow.style.transform = `translate3d(${glowPosRef.current.x - 20}px, ${glowPosRef.current.y - 20}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      halo.style.opacity = '1';
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      halo.style.opacity = '0';
      glow.style.opacity = '0';
    };

    let hovered = false;
    const handleLinkHover = () => {
      hovered = true;
      halo.style.width = '160px';
      halo.style.height = '160px';
      halo.style.marginLeft = '-20px';
      halo.style.marginTop = '-20px';
      glow.style.width = '56px';
      glow.style.height = '56px';
      glow.style.marginLeft = '-8px';
      glow.style.marginTop = '-8px';
    };
    const handleLinkLeave = () => {
      hovered = false;
      halo.style.width = '120px';
      halo.style.height = '120px';
      halo.style.marginLeft = '0px';
      halo.style.marginTop = '0px';
      glow.style.width = '40px';
      glow.style.height = '40px';
      glow.style.marginLeft = '0px';
      glow.style.marginTop = '0px';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    const attachListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    attachListeners();

    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ambient halo */}
      <div
        ref={haloRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          top: 0,
          left: 0,
          opacity: 0,
          background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.05) 30%, rgba(201, 168, 76, 0.01) 60%, transparent 100%)',
          transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), margin 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
          filter: 'blur(4px)',
        }}
      />
      {/* Inner warm glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          top: 0,
          left: 0,
          opacity: 0,
          background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.45) 0%, rgba(201, 168, 76, 0.15) 40%, transparent 70%)',
          transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      />
    </>
  );
}