import { useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import { caseStudies } from '@/mocks/caseStudies';

/* ===== CASE STUDIES / RESULTS PAGE ===== */
export default function CaseStudiesPage() {
  useScrollReveal();
  const [activeTag, setActiveTag] = useState('All');
  const [openId, setOpenId] = useState<number | null>(null);

  const tags = ['All', ...Array.from(new Set(caseStudies.flatMap((c) => c.tags)))];
  const filtered =
    activeTag === 'All' ? caseStudies : caseStudies.filter((c) => c.tags.includes(activeTag));

  const summaryStats = [
    { value: '\u20b91,000 Cr+', label: 'Capital arranged' },
    { value: '500+', label: 'Facilities structured' },
    { value: '96 days', label: 'Fastest close' },
    { value: '4.8 / 5', label: 'Avg. client rating' },
  ];

  return (
    <main role="main">
      <PageHero
        eyebrow="Evidence of Outcomes"
        title="Case Studies & Results"
        subtitle="Real mandates, real numbers. A selection of transactions where structured, independent advice made a measurable difference to our clients."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]}
      />

      {/* Summary band */}
      <section className="py-14 md:py-16" style={{ backgroundColor: '#2C2825' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {summaryStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-heading italic text-[#C9A84C] leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-label uppercase tracking-[0.1em] mt-2 text-[11px] md:text-xs"
                  style={{ color: 'rgba(242,237,228,0.6)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Filter chips */}
          <div className="reveal flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-[13px] font-label whitespace-nowrap border transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-[#C9A84C] text-[#2C2825] border-[#C9A84C]'
                    : 'bg-white/60 text-[#4A4540] border-[#E8E0D4] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((cs) => {
              const isOpen = openId === cs.id;
              return (
                <article key={cs.id} className="glass-panel lift-glow rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(26,23,20,0.78) 0%, transparent 65%)' }}
                    />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-label font-medium"
                      style={{ background: 'rgba(201,168,76,0.92)', color: '#2C2825' }}
                    >
                      {cs.sector}
                    </span>
                    <span className="absolute bottom-4 left-4 text-[11px] font-label text-[#F2EDE4]/80 tracking-wide">
                      {cs.location} &middot; {cs.year}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-7">
                    <h3 className="font-heading text-lg md:text-xl text-[#1A1714] leading-snug mb-3">
                      {cs.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A4540]">{cs.summary}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: '1px solid rgba(201,168,76,0.18)' }}>
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-heading text-base md:text-lg text-[#C9A84C] leading-none">
                            {m.value}
                          </div>
                          <div className="text-[11px] font-label text-[#8C8480] mt-1.5 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expand */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : cs.id)}
                      className="mt-6 inline-flex items-center text-[13px] font-medium font-label text-[#C9A84C] hover:text-[#A0522D] transition-colors group/btn"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? 'Hide the details' : 'Read the story'}
                      <span
                        className={`w-4 h-4 flex items-center justify-center ml-1.5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'group-hover/btn:translate-x-1'
                        }`}
                      >
                        <i className={isOpen ? 'ri-arrow-up-line' : 'ri-arrow-right-line'} />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-5 mt-5 space-y-4" style={{ borderTop: '1px solid rgba(201,168,76,0.18)' }}>
                          <div>
                            <h4 className="text-[11px] font-label font-medium uppercase tracking-[0.12em] text-[#C9A84C] mb-1.5">
                              The Challenge
                            </h4>
                            <p className="text-sm leading-relaxed text-[#4A4540]">{cs.challenge}</p>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-label font-medium uppercase tracking-[0.12em] text-[#C9A84C] mb-1.5">
                              Our Approach
                            </h4>
                            <p className="text-sm leading-relaxed text-[#4A4540]">{cs.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        title="Facing a challenge like one of these?"
        subtitle="Every mandate starts with a conversation. Tell us what you are trying to fund and we will show you the realistic path forward."
        primaryLabel="Discuss Your Requirement"
      />
    </main>
  );
}