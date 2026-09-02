import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '@/mocks/services';

/* ===== SERVICES PAGE =====
 * Card grid with inline expand/collapse for extended information.
 * "Learn More" opens the card to reveal full description + features.
 */
export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* ===== PAGE HEADER ===== */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
          backgroundSize: '200% 200%',
          animation: 'heroGradient 15s ease infinite',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <p className="text-[#C9A84C] text-[11px] font-label uppercase tracking-[0.15em] mb-4">
            What We Offer
          </p>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#F2EDE4]">
            Our Services
          </h1>
          <div className="w-12 h-[2px] bg-[#C9A84C] mx-auto mt-5" />
          <p className="text-[#8C8480] mt-5 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Comprehensive financial solutions tailored to your business and personal needs
          </p>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => {
              const isOpen = expandedId === service.id;

              return (
                <article
                  key={service.id}
                  className={`group bg-white border border-[#E8E0D4] rounded-[4px] transition-all duration-500 ${
                    isOpen ? 'shadow-[0_16px_48px_rgba(0,0,0,0.08)]' : 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  {/* Gold top border — slides in on hover */}
                  <div className="h-[2px] bg-[#C9A84C] rounded-t-[4px] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="p-6 md:p-8">
                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-md bg-[rgba(201,168,76,0.08)] mb-5">
                      <i className={`${service.icon} text-2xl text-[#C9A84C]`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-heading text-[#1A1714] mb-3">
                      {service.title}
                    </h3>

                    {/* Short description — always visible */}
                    <p className="text-sm leading-relaxed text-[#4A4540] mb-5">
                      {service.shortDesc}
                    </p>

                    {/* Learn More / Close button */}
                    <button
                      onClick={() => toggle(service.id)}
                      className="inline-flex items-center text-[13px] font-medium font-label text-[#C9A84C] hover:text-[#A0522D] transition-colors group/btn"
                      aria-expanded={isOpen}
                      aria-controls={`service-details-${service.id}`}
                    >
                      {isOpen ? 'Show Less' : 'Learn More'}
                      <span className={`w-4 h-4 flex items-center justify-center ml-1 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'group-hover/btn:translate-x-1'
                      }`}>
                        <i className={`${isOpen ? 'ri-arrow-up-line' : 'ri-arrow-right-line'}`} />
                      </span>
                    </button>
                  </div>

                  {/* Expanded content — smooth grid trick for height animation */}
                  <div
                    id={`service-details-${service.id}`}
                    className="grid transition-all duration-500"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        {/* Top gold accent line */}
                        <div className="w-full h-[1px] bg-[#C9A84C]/20 mb-6" />

                        {/* Full description */}
                        <p className="text-sm leading-[1.85] text-[#4A4540] mb-6">
                          {service.description}
                        </p>

                        {/* Features list */}
                        <h4 className="text-[11px] font-label font-medium uppercase tracking-[0.12em] text-[#8C8480] mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2.5 mb-7">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A4540]">
                              <span className="w-4 h-4 flex items-center justify-center mt-0.5 text-[#C9A84C] shrink-0">
                                <i className="ri-check-line" />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <button
                          onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
                          className="inline-flex items-center px-5 py-2.5 text-[13px] font-medium font-label rounded-[2px] transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
                          style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                        >
                          Apply for {service.title}
                          <span className="w-4 h-4 flex items-center justify-center ml-1.5">
                            <i className="ri-arrow-right-line" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24 bg-[#F2EDE4]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-[#1A1714]">
            Need a Custom Financial Solution?
          </h2>
          <div className="w-12 h-[2px] bg-[#C9A84C] mx-auto mt-5" />
          <p className="text-[#4A4540] mt-5 text-sm md:text-base leading-relaxed">
            Our experts will analyze your requirements and recommend the best financing options for your situation.
          </p>
          <div className="mt-8">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openContactModal'))}
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold font-label rounded-[2px] hover:scale-[1.02] hover:brightness-110 transition-all whitespace-nowrap"
              style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
            >
              Get a Free Consultation
              <span className="w-4 h-4 flex items-center justify-center ml-2">
                <i className="ri-arrow-right-line" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}