import { Link } from 'react-router-dom';
import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CTABand from '@/components/feature/CTABand';
import { teamMembers } from '@/mocks/team';

const approach = [
  {
    icon: 'ri-search-eye-line',
    title: 'Diagnose First',
    text: 'Every engagement starts with a clear-eyed look at your numbers, your objectives and your constraints — never a product pitch.',
  },
  {
    icon: 'ri-route-line',
    title: 'Design the Structure',
    text: 'We map the right facility, lender mix and terms to your cash flow, then build the case lenders actually want to read.',
  },
  {
    icon: 'ri-hand-coin-line',
    title: 'Negotiate Hard',
    text: 'We run a competitive process on your behalf and negotiate rate, tenure and conditions in your favour.',
  },
  {
    icon: 'ri-anchor-line',
    title: 'Stay With You',
    text: 'Our work continues past disbursement — through reviews, renewals and the next phase of your growth.',
  },
];

const values = [
  { title: 'Integrity', text: 'We say what we mean and recommend only what we would do ourselves.' },
  { title: 'Independence', text: 'No product sales, no lender commissions steering our advice.' },
  { title: 'Transparency', text: 'Clear scope and fees agreed upfront, with no hidden charges.' },
  { title: 'Client-Centricity', text: 'Your outcome is the only benchmark that matters to us.' },
];

/* ===== TEAM / LEADERSHIP PAGE ===== */
export default function TeamPage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Leadership & Team"
        title="The People Behind the Firm"
        subtitle="Independent advice is only as good as the people giving it. Meet the advisor who leads every mandate — and the values the whole team works by."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership & Team' }]}
      />

      {/* Founder feature */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24">
          {teamMembers.map((member, i) => (
            <div key={member.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Photo */}
              <div className={`reveal lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative float-layer rounded-2xl overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at LABH Associates`}
                    title={`${member.name} — ${member.role}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(26,23,20,0.45) 0%, transparent 45%)' }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="glass-dark rounded-xl px-4 py-3">
                      <div className="font-heading text-[#F2EDE4] text-lg">{member.name}</div>
                      <div className="text-[11px] font-label uppercase tracking-[0.14em] text-[#C9A84C] mt-0.5">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="reveal lg:col-span-7">
                <span className="inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
                  {member.eyebrow}
                </span>
                <h2
                  className="font-heading font-bold text-[#1A1714] leading-tight"
                  style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
                >
                  {member.name}
                </h2>
                <div className="mt-5" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
                <p className="font-body font-light text-[15px] md:text-base text-[#4A4540] leading-relaxed mt-6">
                  {member.bio}
                </p>
                <p className="font-body font-light text-[15px] md:text-base text-[#4A4540] leading-relaxed mt-4">
                  {member.extendedBio}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-label px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(201,168,76,0.12)', color: '#A0522D' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-medium font-label text-[#C9A84C] hover:text-[#A0522D] transition-colors whitespace-nowrap"
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-linkedin-fill" />
                    </span>
                    Connect on LinkedIn
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[14px] font-medium font-label text-[#4A4540] hover:text-[#C9A84C] transition-colors whitespace-nowrap"
                  >
                    Book a conversation
                    <span className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-line" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our approach */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#2C2825' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="reveal inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              How We Work
            </span>
            <h2
              className="reveal font-heading font-bold text-[#F2EDE4] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              Our approach, in four steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {approach.map((step, i) => (
              <div key={step.title} className="reveal glass-dark lift-glow rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="w-11 h-11 flex items-center justify-center rounded-full"
                    style={{ background: 'rgba(201,168,76,0.15)' }}
                  >
                    <i className={`${step.icon} text-xl text-[#C9A84C]`} />
                  </span>
                  <span className="font-heading italic text-3xl text-[#C9A84C]/30">0{i + 1}</span>
                </div>
                <h3 className="font-heading text-base text-[#F2EDE4] mb-2">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#F2EDE4]/55">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#F2EDE4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2
              className="reveal font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              The values we hire and work by
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {values.map((v) => (
              <div key={v.title} className="reveal glass-panel lift-glow rounded-2xl p-6">
                <div className="mb-3" style={{ width: '32px', height: '2px', backgroundColor: '#C9A84C' }} />
                <h3 className="font-heading text-lg text-[#1A1714] mb-2">{v.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#4A4540]">{v.text}</p>
              </div>
            ))}
          </div>
          <p className="reveal text-center text-sm text-[#8C8480] mt-10">
            We are growing. See our{' '}
            <Link to="/careers" className="text-[#C9A84C] hover:underline">
              open roles
            </Link>
            .
          </p>
        </div>
      </section>

      <CTABand
        title="Want to work with a team that has your back?"
        subtitle="Start with a free, no-obligation conversation with our founding advisor."
        primaryLabel="Book a Conversation"
      />
    </main>
  );
}