import { useState, useEffect } from 'react';

const CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(CONSENT_KEY);
    if (!hasConsent) {
      // Small delay so it doesn't pop immediately on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[160] px-4 py-3 md:py-4"
      style={{
        backgroundColor: '#2C2825',
        borderTop: '1px solid rgba(201, 168, 76, 0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-[#F2EDE4]/60 leading-relaxed max-w-2xl">
          We use cookies to enhance your browsing experience, analyze site traffic, and improve our services.
          By continuing to use this site, you consent to our use of cookies in accordance with our{' '}
          <a
            href="/privacy"
            className="underline hover:text-[#C9A84C] transition-colors"
          >
            Privacy Policy
          </a>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 text-xs font-semibold font-label rounded-sm transition-all whitespace-nowrap"
          style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}