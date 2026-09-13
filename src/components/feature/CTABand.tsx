import { Link } from 'react-router-dom';

interface CTABandProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
}

/*
 * CTABand
 * Consistent one-primary-action closing section used across inner
 * pages. Glass panel, gold rule, primary CTA + direct call option.
 */
export default function CTABand({ title, subtitle, primaryLabel = 'Start a Conversation' }: CTABandProps) {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F2EDE4' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="glass-panel-tint lift-glow rounded-2xl px-6 py-12 md:px-12 md:py-14 text-center">
          <h2
            className="reveal font-heading font-bold text-[#1A1714] leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            {title}
          </h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
          {subtitle && (
            <p className="reveal font-body font-light text-[#4A4540] mt-4 leading-relaxed max-w-xl mx-auto text-sm md:text-base">
              {subtitle}
            </p>
          )}
          <div className="reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-sheen inline-flex items-center px-8 py-3.5 text-sm font-semibold font-label rounded-md transition-all hover:scale-[1.02] whitespace-nowrap"
              style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
            >
              {primaryLabel}
              <span className="w-4 h-4 flex items-center justify-center ml-2">
                <i className="ri-arrow-right-line" />
              </span>
            </Link>
            <a
              href="tel:+919909906867"
              className="inline-flex items-center gap-2 text-sm font-medium font-label text-[#4A4540] hover:text-[#C9A84C] transition-colors whitespace-nowrap"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-phone-line" />
              </span>
              +91 99099 06867
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}