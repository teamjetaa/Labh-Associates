import { useState, useRef } from 'react';

/* ===== CONTACT SECTION =====
 * Split layout: contact info left, form right
 * Submits to Readdy Form API
 */
export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypotVal = (formData.get('website_alt') as string || '').trim();
    if (honeypotVal) {
      setFormStatus('sent');
      form.reset();
      return;
    }
    formData.delete('website_alt');

    setFormStatus('sending');

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d9d37v2lh2lp4rjvt1s0', {
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
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="reveal space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1A1714] mb-4">Get In Touch</h2>
              <div style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-phone-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Phone</div>
                  <a href="tel:+919909906867" className="text-sm md:text-base text-[#1A1714] hover:text-[#C9A84C] transition-colors">
                    +91 99099 06867
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-mail-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Email</div>
                  <a href="mailto:tushar.barot@labhassociates.org" className="text-sm md:text-base text-[#1A1714] hover:text-[#C9A84C] transition-colors">
                    tushar.barot@labhassociates.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-map-pin-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Gujarat Office</div>
                  <p className="text-sm text-[#4A4540] leading-relaxed">
                    A 302, Titanium Heights, Opp. Vodafone House,<br />
                    Corporate Road, Prahaladnagar,<br />
                    Ahmedabad - 380015
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-time-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Office Hours</div>
                  <p className="text-sm text-[#4A4540]">
                    Monday &ndash; Saturday, 10:00 AM &ndash; 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="reveal">
            {formStatus === 'sent' ? (
              <div className="bg-white rounded-md p-8 md:p-10 text-center border border-[#E8E0D4]">
                <div className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                  <i className="ri-check-line text-2xl" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#1A1714] mb-2">Message Sent!</h3>
                <p className="text-sm text-[#4A4540] mb-6">Thank you for reaching out. We will respond within 24 business hours.</p>
                <button
                  onClick={() => { setFormStatus('idle'); setFormError(''); }}
                  className="px-6 py-2.5 text-sm font-semibold font-label rounded-sm transition-all whitespace-nowrap"
                  style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                data-readdy-form=""
                className="bg-white rounded-md p-6 md:p-8 border border-[#E8E0D4] space-y-5"
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website_alt"
                  className="honeypot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 ..."
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] focus:border-[#C9A84C] transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="wealth-management">Wealth Management</option>
                      <option value="corporate-finance">Corporate Finance</option>
                      <option value="tax-compliance">Tax &amp; Compliance</option>
                      <option value="investment-advisory">Investment Advisory</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    maxLength={500}
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors resize-none"
                  />
                  <p className="text-xs text-[#8C8480] mt-1">Maximum 500 characters</p>
                </div>

                {formStatus === 'error' && formError && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-2.5">
                    {formError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full sm:w-auto px-8 py-3 text-sm font-semibold font-label rounded-sm transition-all disabled:opacity-60 whitespace-nowrap"
                  style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-[#8C8480]">We respond within 24 business hours</p>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="reveal mt-12 md:mt-16 rounded-md h-64 md:h-72 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '#2C2825' }}>
          <span className="w-12 h-12 flex items-center justify-center rounded-full mb-3" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
            <i className="ri-map-pin-line text-xl" />
          </span>
          <h3 className="text-[#F2EDE4] font-heading text-lg font-semibold">Our Office</h3>
          <p className="text-[#8C8480] text-sm mt-1">Ahmedabad, Gujarat</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=A+302,+Titanium+Heights,+Opp+Vodafone+House,+Corporate+Road,+Prahaladnagar,+Ahmedabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 px-5 py-2 text-sm font-semibold font-label rounded-sm transition-all whitespace-nowrap"
            style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
          >
            View on Map
            <span className="w-4 h-4 flex items-center justify-center ml-1">
              <i className="ri-arrow-right-up-line" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}