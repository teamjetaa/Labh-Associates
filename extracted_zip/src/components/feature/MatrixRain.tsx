import { useEffect, useRef } from 'react';

/*
 * ===== MATRIX-STYLE FINANCIAL DATA STREAM =====
 * Canvas-based falling-column animation adapted for finance:
 * numerals, currency symbols, +/- signs, percentages and short
 * ticker fragments. Built ONLY from the brand palette
 * (gold #C9A84C / light-gold #E8D5A3 on warm charcoal).
 *
 * Performance & a11y:
 *  - rAF loop is throttled to ~30fps
 *  - paused via IntersectionObserver when out of viewport
 *  - paused when the tab is hidden
 *  - renders a single static frame under prefers-reduced-motion
 *  - devicePixelRatio capped at 2
 *  - glow (canvas shadow) is drawn in a single dedicated pass so
 *    the expensive shadow render path is toggled twice per frame
 *    instead of hundreds of times
 *  - font is parsed once per resize, never per frame
 *  - resize is coalesced into one rAF and column count is capped,
 *    avoiding repeated large canvas reallocations
 */

type Variant = 'back' | 'front' | 'ambient';

interface MatrixRainProps {
  variant?: Variant;
  className?: string;
  /** Multiplies the variant's base fall speed (per-section boost). */
  speedScale?: number;
  /** Multiplies the variant's base glyph opacity (per-section boost). */
  opacityScale?: number;
  /** Multiplies the number of columns — higher = richer/denser stream. */
  densityScale?: number;
  /**
   * Softens the bottom edge: glyphs dissolve into a fade instead of
   * clipping abruptly at the section boundary. Used on heroes.
   */
  edgeFade?: boolean;
}

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

const GLYPHS = '0123456789$€£¥+-%';

const FRAGMENTS = [
  '+2.4%', '-1.1%', '$98.4K', '€1.2M', '+18%', '-0.6%',
  '¥740K', '₹4.2L', '+6.8%', '-3.2%', '$1.4B', '€86K',
  '+0.9%', '-2.7%', '₹12.5Cr', '+24%',
];

// Hoisted so we never rebuild these strings each frame.
const COLOR_GOLD = '#C9A84C';
const COLOR_LIGHT_GOLD = '#E8D5A3';
const HEAD_SHADOW = 'rgba(201, 168, 76, 0.85)';

// Hard cap so an ultrawide viewport can never spawn a huge column set.
const MAX_COLUMNS = 220;

/*
 * Tuning — calibrated for LABH's brand: restrained, editorial, premium.
 *   back    — farthest layer: sparse, slow, dim (parallax depth)
 *   front   — nearest layer: quicker + brighter head glyphs, but kept
 *             sparse enough that headlines/CTAs always stay dominant
 *   ambient — single faint layer for section backdrops (logo hero,
 *             stat bands, footer) where legibility comes first
 *
 * FALL_SPEED is intentionally shared across every variant so the
 * stream moves at a consistent pace everywhere on the site.
 *
 * TRAIL LENGTH is deliberately kept tight. Because the streams move
 * fast, long tails smear together into a muddy blur — a short tail
 * keeps each column reading as a clean, premium streak with a crisp
 * leading glyph while the faintest couple of chars fade out.
 */
const FALL_SPEED = 1.8;

const CONFIG: Record<Variant, {
  fontSize: number;
  speed: number;
  opacity: number;
  trail: number;
  gap: number;
  fragmentChance: number;
  glow: number;
}> = {
  back: { fontSize: 20, speed: FALL_SPEED, opacity: 0.12, trail: 9, gap: 42, fragmentChance: 0.05, glow: 5 },
  front: { fontSize: 13, speed: FALL_SPEED, opacity: 0.24, trail: 7, gap: 21, fragmentChance: 0.1, glow: 9 },
  ambient: { fontSize: 16, speed: FALL_SPEED, opacity: 0.08, trail: 8, gap: 50, fragmentChance: 0.03, glow: 7 },
};

function randomChar(fragmentChance: number) {
  if (Math.random() < fragmentChance) {
    return FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
  }
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function MatrixRain({ variant = 'front', className = '', speedScale = 1, opacityScale = 1, densityScale = 1, edgeFade = false }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cfg = CONFIG[variant];
    const speed = cfg.speed * speedScale;
    const opacity = cfg.opacity * opacityScale;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let columns: Column[] = [];
    let rafId: number | null = null;
    let resizeRafId: number | null = null;
    let last = 0;

    const makeColumn = (x: number): Column => ({
      x,
      y: -Math.random() * height * 0.8,
      speed: speed * (0.55 + Math.random() * 0.9),
      chars: Array.from({ length: cfg.trail }, () => randomChar(cfg.fragmentChance)),
    });

    const buildColumns = () => {
      const spacing = cfg.gap / densityScale;
      const count = Math.min(MAX_COLUMNS, Math.max(1, Math.floor(width / spacing)));
      columns = Array.from({ length: count }, (_, i) => makeColumn(i * spacing + spacing / 2));
    };

    // Font never changes between frames — parse it once (after any
    // canvas resize, which resets all context state).
    const setFont = () => {
      ctx.font = `${cfg.fontSize}px "DM Sans", system-ui, monospace`;
      ctx.textAlign = 'center';
    };

    const drawStatic = () => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0;
      columns.forEach((col) => {
        for (let i = 0; i < col.chars.length; i += 2) {
          ctx.globalAlpha = opacity * (0.35 + Math.random() * 0.55);
          ctx.fillStyle = Math.random() < 0.28 ? COLOR_GOLD : COLOR_LIGHT_GOLD;
          ctx.fillText(col.chars[i], col.x, Math.random() * height);
        }
      });
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const fontSize = cfg.fontSize;
      const trailLen = cfg.trail;

      // ----- Pass 1: trailing glyphs, shadow OFF for the whole pass -----
      // Advance positions, recycle finished columns, paint the trail.
      ctx.shadowBlur = 0;
      for (let c = 0; c < columns.length; c += 1) {
        const col = columns[c];
        col.y += col.speed;
        const headY = col.y;

        for (let i = 1; i < col.chars.length; i += 1) {
          const y = headY - i * fontSize;
          if (y < -fontSize || y > height + fontSize) continue;
          ctx.globalAlpha = opacity * (1 - i / trailLen);
          ctx.fillStyle = i % 5 === 0 ? COLOR_GOLD : COLOR_LIGHT_GOLD;
          ctx.fillText(col.chars[i], col.x, y);
        }

        if (Math.random() < 0.02) {
          col.chars[Math.floor(Math.random() * col.chars.length)] = randomChar(cfg.fragmentChance);
        }

        if (headY - trailLen * fontSize > height) {
          columns[c] = makeColumn(col.x);
        }
      }

      // ----- Pass 2: glowing head glyphs, shadow set exactly once -----
      ctx.shadowColor = HEAD_SHADOW;
      ctx.shadowBlur = cfg.glow;
      ctx.fillStyle = COLOR_GOLD;
      ctx.globalAlpha = opacity;
      for (let c = 0; c < columns.length; c += 1) {
        const col = columns[c];
        const headY = col.y;
        if (headY < -fontSize || headY > height + fontSize) continue;
        ctx.fillText(col.chars[0], col.x, headY);
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (now - last < 33) return;
      last = now;
      draw();
    };

    const start = () => {
      if (rafId === null) rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setFont();
      buildColumns();
      if (reduce) drawStatic();
    };

    // Coalesce rapid resize events into a single rebuild per frame so
    // we don't repeatedly reallocate the canvas backing store.
    const scheduleResize = () => {
      if (resizeRafId !== null) return;
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;
        resize();
      });
    };

    resize();
    window.addEventListener('resize', scheduleResize);

    if (!reduce) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !document.hidden) start();
            else stop();
          });
        },
        { threshold: 0 }
      );
      observer.observe(canvas);

      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        stop();
        if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('resize', scheduleResize);
      };
    }

    return () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      window.removeEventListener('resize', scheduleResize);
    };
  }, [variant, speedScale, opacityScale, densityScale]);

  // Soft vertical mask so streaks dissolve near the bottom edge
  // rather than stopping dead at the section boundary.
  const fadeMask = edgeFade
    ? {
        WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)',
      }
    : undefined;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={fadeMask}
    />
  );
}