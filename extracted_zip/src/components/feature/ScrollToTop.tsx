import { useEffect, useState } from 'react';

/* ===== SCROLL TO TOP ===== */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-all duration-300 hover:brightness-110 hover:scale-105 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <span className="w-5 h-5 flex items-center justify-center">
        <i className="ri-arrow-up-line" />
      </span>
    </button>
  );
}