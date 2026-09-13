import { Link } from 'react-router-dom';

/* ===== SERVICES SNAPSHOT =====
 * 2x2 grid, sharp 4px radius cards, gold top-border on hover
 */
const services = [
  {
    slug: 'project-finance',
    title: 'Project Finance',
    description: 'End-to-end financial structuring for infrastructure, energy, and industrial projects. From feasibility to financial close.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="9" height="9" rx="1.5" />
        <rect x="15" y="4" width="9" height="9" rx="1.5" />
        <rect x="4" y="15" width="9" height="9" rx="1.5" />
        <rect x="15" y="15" width="9" height="9" rx="1.5" />
        <line x1="8.5" y1="8.5" x2="8.5" y2="8.5" strokeWidth="2" strokeLinecap="round" />
        <line x1="19.5" y1="8.5" x2="19.5" y2="8.5" strokeWidth="2" strokeLinecap="round" />
        <line x1="8.5" y1="19.5" x2="8.5" y2="19.5" strokeWidth="2" strokeLinecap="round" />
        <line x1="19.5" y1="19.5" x2="19.5" y2="19.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'debt-syndication',
    title: 'Debt Syndication',
    description: 'Strategic debt raising from banks, NBFCs, and institutions. Optimal terms, competitive rates, streamlined execution.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3.5" />
        <circle cx="20" cy="8" r="3.5" />
        <circle cx="14" cy="20" r="3.5" />
        <line x1="10.2" y1="10.2" x2="12.5" y2="17.5" />
        <line x1="17.8" y1="10.2" x2="15.5" y2="17.5" />
        <line x1="12.5" y1="17.5" x2="15.5" y2="17.5" />
      </svg>
    ),
  },
  {
    slug: 'corporate-advisory',
    title: 'Corporate Advisory',
    description: 'M&A advisory, restructuring, valuation, and strategic capital planning for growing businesses and enterprises.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="20" height="16" rx="2.5" />
        <path d="M9 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <circle cx="14" cy="16" r="3" />
        <path d="M14 19v3" />
        <path d="M10 22h8" />
      </svg>
    ),
  },
  {
    slug: 'investment-advisory',
    title: 'Investment Advisory',
    description: 'Data-driven portfolio strategy, risk assessment, and asset allocation for individuals, families, and institutions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 22 11 14 15 18 25 6" />
        <polyline points="19 6 25 6 25 12" />
        <line x1="3" y1="24" x2="25" y2="24" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="reveal">
            <span className="inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              What We Do
            </span>
          </div>
          <h2 className="reveal font-heading font-bold text-[#1A1714] leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
            Our Areas of Expertise
          </h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="reveal group block glass-panel lift-glow rounded-2xl p-7 md:p-8 relative overflow-hidden"
            >
              {/* Top border accent — appears on hover */}
              <div
                className="absolute top-0 left-0 right-0 transition-all duration-300"
                style={{ height: '2px', backgroundColor: '#C9A84C', opacity: 0 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
              />

              {/* Icon */}
              <div className="mb-5">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl text-[#1A1714] mb-2.5">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body font-light text-[14px] text-[#8C8480] leading-relaxed">
                {service.description}
              </p>

              {/* Learn more — appears on hover */}
              <div className="flex items-center gap-1.5 mt-4 text-[13px] font-label text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                  <i className="ri-arrow-right-line" style={{ fontSize: '14px' }} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[14px] font-medium font-label text-[#C9A84C] group/arrow transition-colors"
          >
            View all services
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/arrow:translate-x-1">
              <i className="ri-arrow-right-line" style={{ fontSize: '16px' }} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}