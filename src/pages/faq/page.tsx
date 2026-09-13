import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import { faqCategories } from '@/mocks/faq';

/* ===== FAQ PAGE ===== */
export default function FaqPage() {
  useScrollReveal();
  const [activeCat, setActiveCat] = useState(faqCategories[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const active = faqCategories.find((c) => c.id === activeCat) ?? faqCategories[0];

  return (
    <main role="main">
      <PageHero
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        subtitle="Clear, straight answers about how we work, what we do, and what you can expect. If your question is not here, just ask."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Segmented category control */}
          <div className="reveal flex justify-center mb-10 md:mb-14">
            <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-full border border-[#E8E0D4] bg-white/70 backdrop-blur">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCat(cat.id);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-[13px] font-label whitespace-nowrap transition-all duration-300 ${
                    activeCat === cat.id
                      ? 'bg-[#C9A84C] text-[#2C2825]'
                      : 'text-[#4A4540] hover:text-[#C9A84C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {active.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="glass-panel rounded-xl overflow-hidden lift-glow">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-[15px] md:text-base text-[#1A1714] leading-snug">
                      {item.q}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center shrink-0 text-[#C9A84C] transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      <i className="ri-add-line text-lg" />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-6 pb-5 text-sm leading-relaxed text-[#4A4540]">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still curious */}
          <div className="reveal mt-10 text-center">
            <p className="text-sm text-[#4A4540] mb-3">Still have a question we have not answered?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[14px] font-medium font-label text-[#C9A84C] hover:text-[#A0522D] transition-colors group/arrow whitespace-nowrap"
            >
              Send us your question
              <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover/arrow:translate-x-1">
                <i className="ri-arrow-right-line" style={{ fontSize: '16px' }} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        title="Have a specific situation in mind?"
        subtitle="Every financing need is different. Tell us about yours and we will give you an honest, no-obligation opinion."
        primaryLabel="Ask an Advisor"
      />
    </main>
  );
}