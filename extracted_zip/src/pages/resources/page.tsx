import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import CalculatorTabs from './components/CalculatorTabs';

const toolLinks = [
  {
    icon: 'ri-percent-line',
    title: 'EMI Calculator',
    text: 'Work out the monthly EMI on any term loan, plus total interest and payment.',
    href: '/emi-calculator',
  },
  {
    icon: 'ri-briefcase-line',
    title: 'Talk to an Advisor',
    text: 'Get a structured proposal across multiple lenders for your exact requirement.',
    href: '/contact',
  },
];

/* ===== RESOURCES / TOOLS PAGE ===== */
export default function ResourcesPage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Practical Tools"
        title="Resources & Financial Tools"
        subtitle="Free, no-signup calculators to help you plan. Change any assumption and watch the numbers update instantly."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
      />

      {/* Calculators */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="reveal font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Plan your money in seconds
            </h2>
            <p className="reveal text-sm md:text-base text-[#4A4540] mt-3 max-w-xl mx-auto">
              Interactive estimates — for guidance only, not a formal offer.
            </p>
          </div>
          <CalculatorTabs />
        </div>
      </section>

      {/* More tools */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F2EDE4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {toolLinks.map((tool) => (
              <Link
                key={tool.title}
                to={tool.href}
                className="reveal glass-panel lift-glow rounded-2xl p-6 md:p-7 group block"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                  style={{ background: 'rgba(201,168,76,0.14)' }}
                >
                  <i className={`${tool.icon} text-xl text-[#C9A84C]`} />
                </div>
                <h3 className="font-heading text-lg text-[#1A1714] mb-2">{tool.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#4A4540] mb-4">{tool.text}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-label text-[#C9A84C]">
                  Open
                  <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                    <i className="ri-arrow-right-line" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need a number you can act on?"
        subtitle="These tools give estimates. For a structured proposal based on your actual financials, our advisors are one message away."
        primaryLabel="Get a Structured Proposal"
      />
    </main>
  );
}