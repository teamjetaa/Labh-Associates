/* ===== TESTIMONIALS =====
 * 3-card row (desktop), scroll-snap on mobile
 * Gold left border always visible, decorative quote mark
 */
const testimonials = [
  {
    quote: 'LABH Associates helped us structure a ₹120Cr project finance facility in under 3 months. Exceptional expertise.',
    name: 'Rajesh Mehta',
    title: 'MD, Mehta Infrastructure, Gujarat',
  },
  {
    quote: 'Their independent advice saved us from a costly error. They think long-term, not transactional.',
    name: 'Priya Shah',
    title: 'CFO, Suryodaya Renewables, Mumbai',
  },
  {
    quote: 'A rare firm that truly acts in the client\'s interest. We\'ve worked with them for over 9 years.',
    name: 'Amit Patel',
    title: 'Director, Patel Exports Pvt. Ltd.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#FAF8F4' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="reveal font-heading font-bold text-[#1A1714] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
          >
            Trusted by Our Clients
          </h2>
          <div className="reveal mx-auto mt-4" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
        </div>

        {/* Cards — desktop grid, mobile horizontal scroll */}
        <div
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="reveal relative shrink-0 w-[85vw] md:w-auto snap-center bg-white rounded-[4px] p-6 md:p-7"
              style={{
                border: '1px solid #E8E0D4',
                borderLeft: '3px solid #C9A84C',
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 right-5 font-heading text-[#C9A84C] select-none pointer-events-none leading-none"
                style={{ fontSize: '64px', opacity: 0.12 }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="font-body font-light text-[15px] text-[#4A4540] italic leading-relaxed mb-5 pr-4">
                {t.quote}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(201, 168, 76, 0.2)', margin: '1rem 0' }} />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Attribution */}
              <div className="font-label font-medium text-[14px] text-[#1A1714]">
                {t.name}
              </div>
              <div className="font-label font-light text-[13px] text-[#8C8480] mt-0.5">
                {t.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}