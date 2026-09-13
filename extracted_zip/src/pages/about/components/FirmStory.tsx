/* ===== FIRM STORY + JOURNEY TIMELINE =====
 * Company description followed by a visual path timeline
 * Desktop: alternating left/right cards with central path
 * Mobile: single column with left-aligned path nodes
 */

const timelineMilestones = [
  {
    year: '2012',
    title: '"Inovic Financial Solutions" Begins',
    description: 'We embarked on a journey to redefine financial solutions, laying the foundation for Inovic Financial Solutions — the seed of what would grow into a trusted name in project finance.',
    highlight: false,
  },
  {
    year: '2013',
    title: 'Pharmaceutical Project — ₹38 Cr',
    description: 'Proudly supported a major pharmaceutical project with funding of ₹38 Crore, contributing to the growth of India\'s healthcare manufacturing sector.',
    highlight: true,
  },
  {
    year: '2014',
    title: '"Labh Associates" Is Born',
    description: 'The inception of "Labh Associates" as a new associate concern marked our formal entry into comprehensive financial advisory, strengthening our commitment to tailored solutions.',
    highlight: false,
  },
  {
    year: '2015',
    title: 'Startup Funding — ₹48 Cr',
    description: 'Facilitated a startup project with ₹48 Crore funding, fostering innovation and supporting the next generation of Indian entrepreneurs.',
    highlight: true,
  },
  {
    year: '2016',
    title: 'Builder Finance — ₹80 Cr',
    description: 'Deepened our commitment to the real estate sector with ₹80 Crore in builder funding, establishing Labh as a go-to partner for construction and development finance.',
    highlight: false,
  },
  {
    year: '2017',
    title: 'Expansion: Baroda, Surat & Mumbai',
    description: 'A milestone year — expanded our presence with associates in Baroda, Surat, and Mumbai, bringing personalized financial advisory closer to Gujarat and Maharashtra businesses.',
    highlight: false,
  },
  {
    year: '2018',
    title: 'Retail & Personal Lending Launch',
    description: 'Diversified our portfolio by launching Retail Loans, Business Loans, Housing Loans, and Personal Loans — making comprehensive financing accessible to individuals and businesses alike.',
    highlight: false,
  },
  {
    year: '2020',
    title: 'Business Growth Consulting Division',
    description: 'Recognizing the need for holistic business solutions, we launched a dedicated Business Growth Consulting division, offering strategic insights beyond financing.',
    highlight: false,
  },
  {
    year: '2022',
    title: '₹1000Cr+ Assets · 500+ Clients',
    description: 'A landmark achievement — surpassed ₹1000+ Crore in assets managed, serving over 500 clients. A testament to trust, persistence, and execution.',
    highlight: true,
  },
];

export default function FirmStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-6 mb-16 md:mb-20">
        <p className="reveal text-[#4A4540] leading-relaxed text-sm md:text-base">
          Labh Associates is a distinguished project finance consultant with a noteworthy presence in Gujarat and Mumbai for over 15 years. With an extensive network and solid partnerships with banks and Non-Banking Financial Companies (NBFCs), Labh Associates specializes in providing financial solutions for new industrial projects and expansions.
        </p>

        <p className="reveal text-[#4A4540] leading-relaxed text-sm md:text-base">
          Whether it&apos;s a startup venture seeking initial capital or an established industrial unit planning to expand its operations, Labh Associates possesses the expertise to navigate the complex world of project finance. Our commitment to delivering exceptional service, along with our in-depth knowledge and strong connections in the finance industry, makes us a trusted partner for businesses looking to secure funding for their projects.
        </p>

        <p className="reveal text-[#4A4540] leading-relaxed text-sm md:text-base">
          Our team at Labh Associates understands the intricacies of project finance and possesses a deep knowledge of the local business landscape. We have a proven track record of successfully structuring and securing funding for a wide range of industrial ventures, ensuring that our clients receive tailored financial solutions that align with their specific needs and goals.
        </p>

        {/* Pull Quote */}
        <div className="reveal my-10 md:my-14">
          <div className="mx-auto mb-6" style={{ width: '96px', height: '1px', backgroundColor: 'rgba(201,168,76,0.4)' }} />
          <blockquote className="text-center text-xl md:text-2xl font-heading italic text-[#C9A84C] leading-snug px-4">
            Think Money, Think Labh
          </blockquote>
          <div className="mx-auto mt-6" style={{ width: '96px', height: '1px', backgroundColor: 'rgba(201,168,76,0.4)' }} />
        </div>

        <p className="reveal text-[#4A4540] leading-relaxed text-sm md:text-base">
          From a single advisory desk in 2012 to managing over ₹1000+ Crore in assets across 500+ clients, our journey has been one of steady growth, deep relationships, and unwavering client focus. Every milestone reflects our belief that financial advisory isn&apos;t just about numbers — it&apos;s about enabling dreams and empowering progress.
        </p>
      </div>

      {/* ===== VISUAL JOURNEY TIMELINE ===== */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-bold font-heading text-[#1A1714]">Our Journey</h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Central path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2"
            style={{ backgroundColor: 'rgba(201,168,76,0.18)' }}
          />

          {/* Animated dashes overlay — gives the path a "moving journey" feel */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background: 'repeating-linear-gradient(to bottom, #C9A84C 0px, #C9A84C 6px, transparent 6px, transparent 18px)',
                backgroundSize: '100% 24px',
              }}
            />
          </div>

          <div className="space-y-0">
            {timelineMilestones.map((milestone, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={milestone.year} className="reveal relative flex items-start py-6">
                  {/* Left column */}
                  <div className="w-1/2 pr-10 flex justify-end">
                    {isLeft ? (
                      <div className="group max-w-sm w-full">
                        <TimelineCard milestone={milestone} side="left" />
                      </div>
                    ) : (
                      <div className="max-w-sm w-full" />
                    )}
                  </div>

                  {/* Center node on path */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                    <div
                      className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                        milestone.highlight
                          ? 'w-5 h-5 bg-[#C9A84C] ring-4 ring-[rgba(201,168,76,0.15)]'
                          : 'w-3.5 h-3.5 bg-[#E8E0D4] ring-2 ring-white'
                      }`}
                    >
                      {milestone.highlight && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="w-1/2 pl-10">
                    {!isLeft ? (
                      <div className="group max-w-sm w-full">
                        <TimelineCard milestone={milestone} side="right" />
                      </div>
                    ) : (
                      <div className="max-w-sm w-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* End marker */}
          <div className="relative flex justify-center pb-4">
            <div className="w-2 h-2 rounded-full bg-[#C9A84C] ring-4 ring-[rgba(201,168,76,0.2)]" />
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-4 top-0 bottom-0 w-px" style={{ backgroundColor: 'rgba(201,168,76,0.18)' }} />

          <div className="space-y-0">
            {timelineMilestones.map((milestone) => (
              <div key={milestone.year} className="reveal relative flex items-start gap-5 pl-4 py-5">
                {/* Node on path */}
                <div className="absolute left-4 top-6 transform -translate-x-1/2 z-10">
                  <div
                    className={`rounded-full transition-all ${
                      milestone.highlight
                        ? 'w-4 h-4 bg-[#C9A84C] ring-3 ring-[rgba(201,168,76,0.15)]'
                        : 'w-3 h-3 bg-[#E8E0D4] ring-2 ring-white'
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 pl-6">
                  <span className="inline-block text-xs font-bold font-label text-[#C9A84C] uppercase tracking-[0.1em] mb-1">
                    {milestone.year}
                  </span>
                  <h3 className="text-base font-bold font-heading text-[#1A1714] leading-snug mb-1.5">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* End marker */}
          <div className="relative flex justify-center pb-4 pl-4">
            <div className="w-2 h-2 rounded-full bg-[#C9A84C] ring-3 ring-[rgba(201,168,76,0.2)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== TIMELINE CARD ===== */
function TimelineCard({ milestone, side }: { milestone: typeof timelineMilestones[number]; side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  return (
    <div
      className={`bg-white rounded-[4px] border border-[#E8E0D4] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/40 ${
        isLeft ? 'text-right' : 'text-left'
      }`}
    >
      <span className={`inline-block text-xs font-bold font-label text-[#C9A84C] uppercase tracking-[0.1em] mb-1.5 ${
        milestone.highlight ? 'bg-[rgba(201,168,76,0.08)] px-2.5 py-0.5 rounded-sm' : ''
      }`}>
        {milestone.year}
      </span>
      <h3 className="text-base font-bold font-heading text-[#1A1714] leading-snug mb-1.5">
        {milestone.title}
      </h3>
      <p className="text-sm text-[#4A4540] leading-relaxed">
        {milestone.description}
      </p>
    </div>
  );
}