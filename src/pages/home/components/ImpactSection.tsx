import { useEffect, useRef, useState } from 'react';

/* ===== IMPACT / NUMBERS SECTION =====
 * Full-width warm charcoal band with countup stats
 */

const stats = [
  { target: 15, suffix: '+', label: 'Years Active', subnote: 'Since 2012' },
  { target: 500, suffix: '+', label: 'Client Relationships', subnote: 'Across India' },
  { target: 1000, suffix: 'Cr+', label: 'Capital Advised', subnote: 'And growing' },
  { target: 4, suffix: '', label: 'Places of Presence', subnote: 'Gujarat, Rajasthan, Mumbai & Delhi' },
];

function AnimatedStat({ target, suffix, label, subnote }: typeof stats[0]) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1500;
            const startTime = performance.now();

            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easeOutCubic(progress);
              setCount(Math.floor(easedProgress * target));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div
        className="font-heading italic text-[#C9A84C] leading-none"
        style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
      >
        {count}{suffix}
      </div>
      <div
        className="font-label font-light uppercase tracking-[0.1em] mt-2 leading-tight"
        style={{
          fontSize: 'clamp(11px, 1vw, 13px)',
          color: 'rgba(242, 237, 228, 0.65)',
        }}
      >
        {label}
      </div>
      <div
        className="font-label font-light mt-1 leading-tight"
        style={{
          fontSize: 'clamp(10px, 0.9vw, 11px)',
          color: 'rgba(242, 237, 228, 0.35)',
        }}
      >
        {subnote}
      </div>
    </div>
  );
}

export default function ImpactSection() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: '#2C2825' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex justify-center items-center">
              {/* Vertical gold divider between items (hidden on mobile col 2) */}
              {i > 0 && (
                <div
                  className="hidden lg:block absolute"
                  style={{
                    left: `${(i / 4) * 100}%`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              <div className="flex items-center gap-0 w-full justify-center">
                {i > 0 && (
                  <div
                    className="hidden lg:block self-stretch mr-6"
                    style={{
                      width: '1px',
                      backgroundColor: 'rgba(201, 168, 76, 0.2)',
                    }}
                  />
                )}
                <AnimatedStat {...stat} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}