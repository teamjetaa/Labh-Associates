import useScrollReveal from '@/hooks/useScrollReveal';
import useCountUp from '@/hooks/useCountUp';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import { testimonials, credentials } from '@/mocks/testimonials';

interface StatProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function Stat({ target, prefix = '', suffix = '', label }: StatProps) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-heading italic text-[#C9A84C] leading-none"
        style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)' }}
      >
        {prefix}
        {value}
        {suffix}
      </div>
      <div
        className="font-label uppercase tracking-[0.1em] mt-2 text-[11px] md:text-xs"
        style={{ color: 'rgba(242,237,228,0.6)' }}
      >
        {label}
      </div>
    </div>
  );
}

/* ===== TESTIMONIALS / TRUST PAGE ===== */
export default function TestimonialsPage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Client Trust"
        title="What Our Clients Say"
        subtitle="Trust is earned one honest conversation at a time. These are the words of the founders, promoters and finance leaders we work with every day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]}
      />

      {/* Animated trust stats */}
      <section className="py-14 md:py-16" style={{ backgroundColor: '#2C2825' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat target={500} suffix="+" label="Client relationships" />
            <Stat target={12} suffix="+" label="Years of advisory" />
            <Stat target={1000} prefix="" suffix="+ Crore" label="Capital advised" />
            <Stat target={98} suffix="%" label="Would refer us" />
          </div>
        </div>
      </section>

      {/* Testimonial grid */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="reveal inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              In Their Words
            </span>
            <h2
              className="reveal font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              Relationships built on results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.id} className="reveal glass-panel lift-glow rounded-2xl p-6 md:p-7 flex flex-col">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="w-4 h-4 flex items-center justify-center text-[#C9A84C]">
                      <i className="ri-star-fill" style={{ fontSize: '15px' }} />
                    </span>
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="font-heading text-[15px] md:text-base leading-relaxed text-[#1A1714] italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                {/* Author */}
                <figcaption className="mt-6 pt-5 flex items-center gap-3.5" style={{ borderTop: '1px solid rgba(201,168,76,0.2)' }}>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-[#2C2825]"
                    style={{ background: 'linear-gradient(145deg,#E8D5A3,#C9A84C)' }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-label font-semibold text-sm text-[#1A1714]">{t.name}</div>
                  </div>
                </figcaption>
                <span
                  className="self-start mt-4 text-[10px] font-label uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.12)', color: '#A0522D' }}
                >
                  {t.context}
                </span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F2EDE4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="reveal inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              Why Clients Trust Us
            </span>
            <h2
              className="reveal font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              Credentials that matter
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {credentials.map((c) => (
              <div key={c.title} className="reveal glass-panel-tint lift-glow rounded-2xl p-6 text-center">
                <div
                  className="w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4"
                  style={{ background: 'rgba(201,168,76,0.14)' }}
                >
                  <i className={`${c.icon} text-2xl text-[#C9A84C]`} />
                </div>
                <h3 className="font-heading text-base text-[#1A1714] mb-2">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#4A4540]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Join the clients who refer us"
        subtitle="Nine out of ten clients come to us through a referral. Find out why with a free, no-obligation consultation."
        primaryLabel="Book a Free Consultation"
      />
    </main>
  );
}