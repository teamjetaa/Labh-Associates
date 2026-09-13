import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import MatrixRain from './MatrixRain';
import BackButton from './BackButton';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/*
 * PageHero
 * Shared inner-page header with the same dark gradient, faint Matrix
 * data-stream backdrop, gold rules and motion language used across
 * the whole site — keeps every page consistent.
 */
export default function PageHero({ eyebrow, title, subtitle, crumbs, children }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 55%, #2C2825 100%)',
        backgroundSize: '200% 200%',
        animation: 'heroGradient 16s ease infinite',
      }}
    >
      {/* Faint data-stream backdrop */}
      <div className="absolute inset-0" style={{ opacity: 0.9 }}>
        <MatrixRain variant="back" edgeFade />
      </div>

      {/* Decorative arcs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '620px',
          height: '620px',
          border: '1px solid rgba(201, 168, 76, 0.06)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '420px',
          height: '420px',
          border: '1px solid rgba(201, 168, 76, 0.04)',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Soft readability vignette — a gentle dark halo behind the
          headline so the crisper streaks never compete with the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 68% 56% at 50% 40%, rgba(26,23,20,0.60) 0%, rgba(26,23,20,0.34) 46%, rgba(26,23,20,0.12) 100%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-16 md:pb-20 text-center">
        {/* Back */}
        <div className="reveal mb-5 flex justify-start">
          <BackButton />
        </div>

        {/* Breadcrumb */}
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="reveal mb-5">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-[12px] font-label text-[#F2EDE4]/50">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-[#C9A84C] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#C9A84C]">{crumb.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span className="w-3 h-3 flex items-center justify-center text-[#F2EDE4]/25">
                      <i className="ri-arrow-right-s-line" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="reveal inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.18em] mb-4">
            {eyebrow}
          </span>
        )}

        <h1
          className="reveal font-heading font-bold text-[#F2EDE4] leading-[1.1]"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
        >
          {title}
        </h1>

        <div className="reveal mx-auto mt-5" style={{ width: '52px', height: '2px', backgroundColor: '#C9A84C' }} />

        {subtitle && (
          <p className="reveal font-body font-light text-[#F2EDE4]/70 mt-5 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            {subtitle}
          </p>
        )}

        {children && <div className="reveal mt-8">{children}</div>}
      </div>

      {/* Blend into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(250,248,244,0.9))' }}
      />
    </section>
  );
}