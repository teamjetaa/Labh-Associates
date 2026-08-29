import { useEffect, useRef, useState } from 'react';

/* ===== LOGO HERO SECTION =====
 * First section of the homepage. Logo centered on dark background
 * with subtle entrance animation, parallax scroll effect, and
 * fade-out/fade-in on scroll past/return.
 * Part of normal page scroll flow.
 */
const LOGO_URL = 'https://static.readdy.ai/image/974299cffe9876a3fb6c0bb49a2389bc/e2221d0330eb03ff6dd3fb77a5a8002b.png';

export default function LogoHeroSection() {
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Fade + parallax on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollProgress = -rect.top / sectionHeight;

      // Fade only the content based on scroll progress
      // Background stays solid — never reveals the light page bg underneath
      let contentOpacity = 1;
      if (scrollProgress > 0) {
        contentOpacity = Math.max(0, 1 - scrollProgress * 1.6);
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = String(contentOpacity);
      }

      if (scrollProgress >= -0.5 && scrollProgress <= 1.5) {
        const offset = rect.top * 0.25;
        const glowOffset = rect.top * 0.15;
        const particleOffset = rect.top * 0.35;

        if (logoRef.current) {
          logoRef.current.style.transform = `translateY(${offset}px)`;
        }
        if (glowRef.current) {
          glowRef.current.style.transform = `translateY(${glowOffset}px) scale(${1 + scrollProgress * 0.1})`;
        }
        if (particlesRef.current) {
          particlesRef.current.style.transform = `translateY(${particleOffset}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dark background layer — stays solid, never fades */}
      <div
        className="absolute inset-0"
        style={{ background: '#1A1714' }}
      />

      {/* Ambient gold particles — parallax layer */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
        style={{ transition: 'none' }}
      >
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
        <div className="particle p6" />
      </div>

      {/* Content wrapper — fades on scroll */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center will-change-[opacity]"
        style={{ transition: 'none' }}
      >
        {/* Glow behind logo — parallax layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          style={{ transition: 'none' }}
        >
          <div
            style={{
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201, 168, 76, 0.10) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* Logo — parallax layer */}
        <div
          ref={logoRef}
          className={`relative z-10 flex flex-col items-center will-change-transform ${
            entered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            transition: 'opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img
            src={LOGO_URL}
            alt="LABH Associates"
            className="w-[300px] md:w-[420px] lg:w-[500px] h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
            entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span
            className="text-[10px] font-label uppercase tracking-[0.2em]"
            style={{ color: 'rgba(201, 168, 76, 0.5)' }}
          >
            Scroll to explore
          </span>
          <span
            className="w-5 h-5 flex items-center justify-center"
            style={{ animation: 'bounceChevron 2s ease infinite', color: 'rgba(201, 168, 76, 0.6)' }}
          >
            <i className="ri-arrow-down-s-line" style={{ fontSize: '20px' }} />
          </span>
        </div>
      </div>

      {/* Gradient blend into hero section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #2C2825 85%, #2C2825 100%)',
        }}
      />
    </section>
  );
}