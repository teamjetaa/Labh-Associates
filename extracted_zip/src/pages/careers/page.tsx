import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import CvSubmitSection from '@/pages/careers/components/CvSubmitSection';
import { cultureValues, perks } from '@/mocks/careers';

/* ===== CAREERS PAGE ===== */
export default function CareersPage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Join the Team"
        title="Build Your Career With Us"
        subtitle="We are a small, founder-led advisory firm that puts real deals in your hands early. If you want to learn finance by doing it, not reading about it, this is the place."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
      />

      {/* Culture */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="reveal inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              Life at LABH
            </span>
            <h2
              className="reveal font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              A culture built on trust and growth
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {cultureValues.map((v) => (
              <div key={v.title} className="reveal glass-panel lift-glow rounded-2xl p-6 text-center">
                <div
                  className="w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4"
                  style={{ background: 'rgba(201,168,76,0.14)' }}
                >
                  <i className={`${v.icon} text-2xl text-[#C9A84C]`} />
                </div>
                <h3 className="font-heading text-base text-[#1A1714] mb-2">{v.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#4A4540]">{v.text}</p>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div className="reveal mt-12 glass-panel-tint rounded-2xl p-6 md:p-9">
            <h3 className="font-heading text-xl text-[#1A1714] mb-5 text-center">What you get</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0 text-[#C9A84C]">
                    <i className="ri-check-line" />
                  </span>
                  <span className="text-sm text-[#4A4540]">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CvSubmitSection />

      <CTABand
        title="Interested in joining LABH Associates?"
        subtitle="Tell us a little about yourself and the kind of role you are looking for. We read every application."
        primaryLabel="Get in Touch"
      />
    </main>
  );
}