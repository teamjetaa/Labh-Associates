import { Link } from 'react-router-dom';
import { useMarketQuotes } from '@/hooks/useMarketQuotes';

/* ===== HERO SECTION =====
 * Full-viewport, warm charcoal gradient bg
 * Two-column: 55% text + 45% abstract CSS visual
 */
export default function HeroSection() {
  const { items: tickerItems } = useMarketQuotes();

  const trustStats = [
    { number: '15+', label: 'Years of expertise' },
    { number: '500+', label: 'Clients served' },
    { number: '₹1000Cr+', label: 'Assets advised' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        minHeight: '640px',
        background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
        backgroundSize: '200% 200%',
        animation: 'heroGradient 18s ease infinite',
      }}
    >
      {/* Faint gold circular arc — decorative texture */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 168, 76, 0.06)',
          top: '50%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 168, 76, 0.04)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-28 pb-16 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ===== LEFT COLUMN: Text ===== */}
          <div className="lg:pr-4">
            {/* Main Headline */}
            <h1 className="reveal font-heading font-bold leading-[1.1] text-[#F2EDE4]">
              <span style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>Strategic</span>
              <br />
              <span
                className="relative inline-block italic font-medium"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
              >
                Clarity
                <span
                  className="absolute left-0 bottom-[-6px] w-full"
                  style={{ height: '2px', backgroundColor: '#C9A84C' }}
                />
              </span>
              <span className="inline">. </span>
              <span style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>Lasting Results.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="reveal mt-6 font-body font-light leading-relaxed max-w-[480px]"
              style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: 'rgba(242, 237, 228, 0.75)',
                lineHeight: '1.8',
              }}
            >
              We partner with ambitious businesses across India to navigate complex financial decisions — with independence, expertise, and integrity.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/services"
                className="inline-flex items-center px-7 py-3.5 bg-[#C9A84C] text-[#2C2825] text-[14px] font-label font-medium rounded-sm hover:scale-[1.02] hover:brightness-105 transition-all duration-200 whitespace-nowrap"
              >
                Explore Our Services
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#F2EDE4] text-[14px] font-label font-medium group/arrow transition-colors duration-200 whitespace-nowrap"
              >
                Our Story
                <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/arrow:translate-x-1">
                  <i className="ri-arrow-right-line" style={{ fontSize: '16px' }} />
                </span>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="reveal mt-10 md:mt-12">
              {/* Thin gold line */}
              <div style={{ height: '1px', backgroundColor: 'rgba(201, 168, 76, 0.2)', marginBottom: '1.5rem' }} />
              <div className="flex flex-wrap items-start gap-6 md:gap-10">
                {trustStats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    {i > 0 && (
                      <div className="hidden md:block" style={{ width: '1px', height: '48px', backgroundColor: 'rgba(201, 168, 76, 0.15)' }} />
                    )}
                    <div>
                      <div
                        className="font-heading italic text-[#C9A84C] leading-none"
                        style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}
                      >
                        {stat.number}
                      </div>
                      <div
                        className="font-label font-light uppercase tracking-wider mt-1 leading-tight"
                        style={{
                          fontSize: 'clamp(10px, 1vw, 12px)',
                          color: 'rgba(242, 237, 228, 0.6)',
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: Abstract CSS Visual ===== */}
          <div className="reveal hidden lg:flex items-center justify-center lg:justify-end">
            <div
              className="relative"
              style={{
                animation: 'floatVisual 6s ease-in-out infinite',
                width: 'clamp(320px, 38vw, 440px)',
                height: 'clamp(380px, 42vw, 500px)',
              }}
            >
              {/* Main rectangle — slightly lighter than bg */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: 'rgba(61, 53, 48, 0.4)',
                  border: '1px solid rgba(201, 168, 76, 0.12)',
                  borderRadius: '2px',
                }}
              />

              {/* Gold line 1 — diagonal */}
              <div
                className="absolute"
                style={{
                  top: '15%',
                  left: '10%',
                  width: '70%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.35)',
                  transform: 'rotate(22deg)',
                  transformOrigin: 'left center',
                }}
              />

              {/* Gold line 2 — horizontal */}
              <div
                className="absolute"
                style={{
                  top: '55%',
                  left: '8%',
                  width: '60%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.25)',
                }}
              />

              {/* Gold line 3 — vertical accent */}
              <div
                className="absolute"
                style={{
                  top: '20%',
                  right: '20%',
                  width: '1px',
                  height: '55%',
                  backgroundColor: 'rgba(201, 168, 76, 0.2)',
                }}
              />

              {/* Gold line 4 — shorter diagonal */}
              <div
                className="absolute"
                style={{
                  top: '60%',
                  left: '55%',
                  width: '35%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.3)',
                  transform: 'rotate(-15deg)',
                  transformOrigin: 'left center',
                }}
              />

              {/* Filled gold circle at an intersection */}
              <div
                className="absolute"
                style={{
                  top: 'calc(15% + (70% * sin(22deg)) / 2)',
                  left: 'calc(10% + (70% * cos(22deg)) / 2)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#C9A84C',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Large hollow circle arc (3/4 visible) */}
              <div
                className="absolute"
                style={{
                  top: '25%',
                  right: '8%',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 168, 76, 0.15)',
                  clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)',
                }}
              />

              {/* Data dots along line 2 */}
              <div
                className="absolute"
                style={{
                  top: '53.5%',
                  left: '25%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 168, 76, 0.5)',
                }}
              />
              <div
                className="absolute"
                style={{
                  top: '53.5%',
                  left: '40%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 168, 76, 0.5)',
                }}
              />
              <div
                className="absolute"
                style={{
                  top: '53.5%',
                  left: '55%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 168, 76, 0.5)',
                }}
              />

              {/* Small gold square */}
              <div
                className="absolute"
                style={{
                  bottom: '18%',
                  right: '18%',
                  width: '14px',
                  height: '14px',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
        style={{ animation: 'bounceChevron 2s ease infinite' }}
      >
        <span className="w-6 h-6 flex items-center justify-center text-[#F2EDE4]/30">
          <i className="ri-arrow-down-s-line" style={{ fontSize: '22px' }} />
        </span>
      </div>

      {/* ===== SCROLLING MARKET TICKER STRIP ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(201, 168, 76, 0.18)',
          background: 'rgba(26, 23, 20, 0.55)',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="ticker-track py-2.5">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span
                className="font-label text-[11px] tracking-wide whitespace-nowrap px-4"
                style={{ color: item.positive ? '#C9A84C' : 'rgba(242,237,228,0.6)' }}
              >
                {item.label}
              </span>
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.35)' }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}