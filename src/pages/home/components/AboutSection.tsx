import { Link } from 'react-router-dom';

/* ===== ABOUT TEASER =====
 * Two-column: CSS abstract visual left, content right (reverses on mobile)
 */
const differentiators = [
  { title: 'Independent Advisory', description: 'No commissions, no conflicts.' },
  { title: 'Project Finance Specialists', description: 'Deep expertise across sectors.' },
  { title: 'Long-term Relationships', description: 'Clients average 15+ years with us.' },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F2EDE4' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ===== LEFT: CSS Visual ===== */}
          <div className="reveal order-2 lg:order-1 flex justify-center lg:justify-start">
            <div
              className="relative overflow-hidden"
              style={{
                width: 'clamp(260px, 30vw, 340px)',
                height: 'clamp(360px, 42vw, 460px)',
                animation: 'floatVisual 7s ease-in-out infinite',
              }}
            >
              {/* Main block */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#2C2825',
                  boxShadow: 'inset 0 40px 60px rgba(0,0,0,0.15)',
                }}
              />

              {/* Gold grid lines */}
              <div
                className="absolute"
                style={{
                  top: '20%',
                  left: '15%',
                  width: '60%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.3)',
                }}
              />
              <div
                className="absolute"
                style={{
                  top: '20%',
                  left: '45%',
                  width: '1px',
                  height: '50%',
                  backgroundColor: 'rgba(201, 168, 76, 0.25)',
                }}
              />
              <div
                className="absolute"
                style={{
                  bottom: '30%',
                  left: '20%',
                  width: '50%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.2)',
                }}
              />

              {/* Gold dots at intersections */}
              <div
                className="absolute rounded-full"
                style={{ top: '18.5%', left: '44%', width: '5px', height: '5px', backgroundColor: '#C9A84C' }}
              />
              <div
                className="absolute rounded-full"
                style={{ bottom: '28.5%', left: '44%', width: '5px', height: '5px', backgroundColor: '#C9A84C' }}
              />

              {/* Accent line — diagonal */}
              <div
                className="absolute"
                style={{
                  top: '40%',
                  right: '15%',
                  width: '40%',
                  height: '1px',
                  backgroundColor: 'rgba(201, 168, 76, 0.35)',
                  transform: 'rotate(-35deg)',
                  transformOrigin: 'right center',
                }}
              />

              {/* Small gold square accent */}
              <div
                className="absolute"
                style={{
                  bottom: '25%',
                  right: '18%',
                  width: '16px',
                  height: '16px',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                }}
              />

              {/* Est. label */}
              <div
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="font-label text-[11px] text-[#F2EDE4]/60 uppercase tracking-[0.12em]">
                  Est. 2003
                </div>
                <div className="font-label text-[10px] text-[#F2EDE4]/30 mt-1">
                  Gujarat & Mumbai
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: Content ===== */}
          <div className="reveal order-1 lg:order-2 space-y-6">
            {/* Eyebrow */}
            <span className="inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em]">
              About LABH Associates
            </span>

            {/* Headline */}
            <h2
              className="font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
            >
              Two decades of independent financial partnership.
            </h2>

            {/* Body */}
            <p className="font-body font-light text-[16px] text-[#4A4540] leading-relaxed">
              Founded in 2003 in Gujarat, we have grown into a trusted independent advisory firm with a strong presence across Gujarat and Mumbai. We serve a diverse national client base spanning infrastructure, manufacturing, real estate, and services.
            </p>
            <p className="font-body font-light text-[16px] text-[#4A4540] leading-relaxed">
              Our philosophy is simple: every recommendation we make is in your best interest. We do not sell products. We do not take commissions. We advise — and we partner in your long-term growth.
            </p>

            {/* Differentiators */}
            <div className="space-y-3 pt-2">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="flex items-start gap-4 pl-4"
                  style={{ borderLeft: '3px solid #C9A84C' }}
                >
                  <div>
                    <div className="font-label font-medium text-[14px] text-[#1A1714]">
                      {d.title}
                    </div>
                    <div className="font-body font-light text-[13px] text-[#8C8480] mt-0.5">
                      {d.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[14px] font-medium font-label text-[#C9A84C] group/arrow transition-colors"
              >
                Our full story
                <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/arrow:translate-x-1">
                  <i className="ri-arrow-right-line" style={{ fontSize: '16px' }} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}