/* ===== CORE VALUES =====
 * 2x2 grid alternating backgrounds
 */
const values = [
  {
    title: 'Integrity',
    description: 'We act in your interest, always. No product commissions. No hidden fees. Just honest, transparent advice.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Expertise',
    description: 'Decades of specialized financial knowledge across project finance, debt syndication, and corporate advisory.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Client-First',
    description: 'Your goals define our strategy. Every recommendation is tailored to your unique situation and objectives.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11v2" />
      </svg>
    ),
  },
  {
    title: 'Long-term Thinking',
    description: 'We build relationships, not transactions. Our success is measured by the success of our clients over years.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="reveal text-3xl md:text-4xl font-bold font-heading text-[#1A1714]">Our Core Values</h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {values.map((value, idx) => (
            <div
              key={value.title}
              className={`reveal rounded-md p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                idx % 2 === 0 ? 'bg-cream' : 'bg-[#F0EDE8]'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-4">{value.icon}</div>
              <h3 className="text-lg md:text-xl font-bold font-heading text-[#1A1714] mb-2">{value.title}</h3>
              <p className="text-sm text-[#4A4540] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}