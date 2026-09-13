import { useState, useRef } from 'react';

/* ===== CTA BANNER =====
 * Soft cream bg, centered, generous padding
 * Large heading, sub-text, form connected to Readdy Form API, thin gold rule
 */
export default function CTASection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypotVal = (formData.get('phone_alt') as string || '').trim();
    if (honeypotVal) {
      setFormStatus('sent');
      form.reset();
      return;
    }
    formData.delete('phone_alt');

    setFormStatus('sending');

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d9d3f9l64bc39gr2pqvg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const responseText = await response.text();
      let parsed;
      try { parsed = JSON.parse(responseText); } catch { parsed = null; }

      if (response.ok && parsed?.code === 'OK') {
        setFormStatus('sent');
        form.reset();
      } else {
        const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || 'Something went wrong. Please try again.';
        if (serverMsg.toLowerCase().includes('spam') || serverMsg.toLowerCase().includes('form data is spam')) {
          setFormError('Something went wrong. Please try again.');
        } else {
          setFormError(serverMsg);
        }
        setFormStatus('error');
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setFormStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F2EDE4' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        {/* Heading */}
        <h2
          className="reveal font-heading font-bold text-[#1A1714] leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
        >
          Ready to bring clarity to your financial future?
        </h2>

        {/* Sub-text */}
        <p className="reveal font-body font-light text-[#4A4540] mt-5 leading-relaxed max-w-xl mx-auto" style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}>
          Let&apos;s start a conversation. No obligations, no sales pitch — just honest advisory.
        </p>

        {/* Success state */}
        {formStatus === 'sent' ? (
          <div className="reveal mt-8 max-w-sm mx-auto">
            <div className="p-6 rounded-sm text-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3" style={{ backgroundColor: '#C9A84C', color: '#F2EDE4' }}>
                <i className="ri-check-line text-xl" />
              </div>
              <h4 className="text-lg font-bold font-heading text-[#1A1714] mb-1">Thank You!</h4>
              <p className="text-sm text-[#4A4540]">We&apos;ll get back to you within 24 business hours.</p>
              <button
                onClick={() => { setFormStatus('idle'); setFormError(''); }}
                className="mt-4 text-sm font-semibold font-label text-[#C9A84C] hover:underline whitespace-nowrap"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            data-readdy-form=""
            className="reveal mt-8 max-w-md mx-auto space-y-4"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              name="phone_alt"
              className="honeypot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              readOnly
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <label htmlFor="cta-name" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                  Name *
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors bg-white"
                />
              </div>
              <div className="text-left">
                <label htmlFor="cta-email" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                  Email *
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors bg-white"
                />
              </div>
            </div>

            <div className="text-left">
              <label htmlFor="cta-message" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                How can we help?
              </label>
              <textarea
                id="cta-message"
                name="message"
                rows={3}
                maxLength={500}
                placeholder="Tell us briefly about your needs..."
                className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors resize-none bg-white"
              />
              <p className="text-xs text-[#8C8480] mt-1">Maximum 500 characters</p>
            </div>

            {formStatus === 'error' && formError && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-2.5 text-left">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="inline-flex items-center px-10 py-3.5 text-[14px] font-label font-medium rounded-sm hover:scale-[1.02] hover:brightness-105 transition-all duration-200 whitespace-nowrap disabled:opacity-60"
              style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Start a Conversation'}
            </button>

            <p className="text-xs text-[#8C8480]">We respond within 24 business hours</p>
          </form>
        )}

        {/* Gold rule */}
        <div className="reveal mx-auto mt-10" style={{ width: '200px', height: '1px', backgroundColor: 'rgba(201, 168, 76, 0.3)' }} />
      </div>
    </section>
  );
}