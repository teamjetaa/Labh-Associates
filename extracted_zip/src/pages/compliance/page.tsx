import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';

const sections = [
  {
    icon: 'ri-user-star-line',
    title: 'Our Role & Independence',
    body: [
      'LABH Associates is an independent financial advisory and arrangement firm. We are not a bank, NBFC or deposit-taking institution, and we do not lend money ourselves.',
      'We do not sell financial products and we do not accept commissions from lenders that could influence our recommendations. Our advice is given on a fee-for-service basis and is aligned solely with the client\u2019s interest.',
    ],
  },
  {
    icon: 'ri-money-rupee-circle-line',
    title: 'Fees, Charges & Transparency',
    body: [
      'All advisory fees are agreed with the client in writing before an engagement begins. We do not levy hidden charges at any stage of the process.',
      'Any statutory, processing or third-party charges levied by a lender are communicated to the client and are payable directly to that institution.',
    ],
  },
  {
    icon: 'ri-lock-2-line',
    title: 'Confidentiality & Data Protection',
    body: [
      'Client information is treated as strictly confidential. Financial statements, KYC documents and business data are shared with lenders only as required to process a mandate, and only with the client\u2019s knowledge.',
      'We apply reasonable technical and organisational safeguards to protect the data entrusted to us.',
    ],
  },
  {
    icon: 'ri-file-shield-2-line',
    title: 'Important Disclosures',
    body: [
      'Sanction of any facility is at the sole discretion of the lending institution and is subject to their credit policy, documentation and regulatory requirements. Facilitation of an application does not guarantee approval.',
      'Figures, timelines and illustrations shown on this website — including case studies and calculator outputs — are indicative, based on past engagements or assumptions, and should not be relied upon as a commitment or a guarantee of future outcomes.',
    ],
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'Grievance Redressal',
    body: [
      'If you have a concern about our services, please write to tushar.barot@labhassociates.org with the subject line \u201cGrievance\u201d. We aim to acknowledge every grievance within two business days and resolve it promptly.',
      'Where a matter relates to a specific lender\u2019s product or decision, we will assist you in escalating it through that institution\u2019s official grievance channel.',
    ],
  },
  {
    icon: 'ri-alarm-warning-line',
    title: 'Protect Yourself From Fraud',
    body: [
      'LABH Associates never asks for payments to personal bank accounts, and never requests OTPs, passwords or card details over phone, email or messaging apps.',
      'If you receive any suspicious communication claiming to be from us, please verify it by calling our official number +91 99099 06867 before acting on it.',
    ],
  },
];

/* ===== LEGAL / COMPLIANCE & DISCLOSURES PAGE ===== */
export default function CompliancePage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Regulatory Transparency"
        title="Compliance & Disclosures"
        subtitle="Clear, honest information about our role, our fees and how we handle your data. Transparency is part of the service, not a footnote."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Compliance & Disclosures' }]}
      />

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="reveal glass-panel lift-glow rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span
                    className="w-12 h-12 flex items-center justify-center shrink-0 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.14)' }}
                  >
                    <i className={`${section.icon} text-xl text-[#C9A84C]`} />
                  </span>
                  <div>
                    <h2 className="font-heading text-lg md:text-xl text-[#1A1714] mb-3">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.body.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed text-[#4A4540]">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="reveal text-xs text-[#8C8480] mt-10 text-center">
            This page is provided for general information and does not constitute legal, tax or
            investment advice. Last updated September 2026.
          </p>
        </div>
      </section>

      <CTABand
        title="Questions about how we work?"
        subtitle="We are happy to walk you through our role, our fees and our process before you engage us."
        primaryLabel="Ask Us Anything"
      />
    </main>
  );
}