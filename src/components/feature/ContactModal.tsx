import { useState, useRef, useEffect, useCallback } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Mount/unmount + animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Success state animation — trigger on sent, reset on idle
  useEffect(() => {
    if (formStatus === 'sent') {
      setSuccessVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSuccessVisible(true));
      });
    } else {
      setSuccessVisible(false);
    }
  }, [formStatus]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    // Wait for exit animation to finish before unmounting
    setTimeout(() => {
      setMounted(false);
      onClose();
    }, 350);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

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

      const response = await fetch('https://readdy.ai/api/form/d9mv2i4it35ii3jdlmi0', {
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

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Contact us"
    >
      {/* Backdrop — fade in/out */}
      <div
        className="absolute inset-0 bg-[#1A1714]/60 backdrop-blur-sm transition-all duration-[400ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Modal panel — scale + fade */}
      <div
        className="relative bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E0D4]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
          transition: 'opacity 350ms cubic-bezier(0.22, 1, 0.36, 1), transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: visible
            ? '0 24px 64px rgba(0,0,0,0.2)'
            : '0 0 0 rgba(0,0,0,0)',
          transitionProperty: 'opacity, transform, box-shadow',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#F2EDE4] text-[#4A4540] hover:bg-[#C9A84C] hover:text-white transition-all"
          aria-label="Close contact modal"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <i className="ri-close-line" />
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — Contact Info */}
          <div className="p-6 md:p-8 lg:p-10 bg-[#FAF8F4] border-r border-[#E8E0D4]">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#1A1714] mb-3">Get In Touch</h2>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#C9A84C' }} />
              <p className="text-sm text-[#8C8480] mt-3 leading-relaxed">
                Reach out for expert financial consulting. We respond within 24 business hours.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-phone-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Phone</div>
                  <a href="tel:+919909906867" className="text-sm text-[#1A1714] hover:text-[#C9A84C] transition-colors">
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
                  <a href="mailto:tushar.barot@labhassociates.org" className="text-sm text-[#1A1714] hover:text-[#C9A84C] transition-colors">
                    tushar.barot@labhassociates.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                  <i className="ri-map-pin-line" />
                </span>
                <div>
                  <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">Office</div>
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

            {/* Map CTA */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=A+302,+Titanium+Heights,+Opp+Vodafone+House,+Corporate+Road,+Prahaladnagar,+Ahmedabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-6 px-4 py-2 text-xs font-semibold font-label rounded-sm transition-all whitespace-nowrap"
              style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
            >
              <span className="w-4 h-4 flex items-center justify-center mr-1.5">
                <i className="ri-map-pin-line" />
              </span>
              View on Map
            </a>
          </div>

          {/* Right — Form */}
          <div className="p-6 md:p-8 lg:p-10">
            {formStatus === 'sent' ? (
              <div className="text-center py-8">
                {/* Check icon — bouncy scale + fade */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mx-auto"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    color: '#C9A84C',
                    opacity: successVisible ? 1 : 0,
                    transform: successVisible ? 'scale(1)' : 'scale(0.4)',
                    transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <i className="ri-check-line text-2xl" />
                </div>

                {/* Heading — fade up with slight delay */}
                <h3
                  className="text-xl font-bold font-heading text-[#1A1714] mb-2 mt-4"
                  style={{
                    opacity: successVisible ? 1 : 0,
                    transform: successVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
                  }}
                >
                  Message Sent!
                </h3>

                {/* Description — fade up with more delay */}
                <p
                  className="text-sm text-[#4A4540] mb-6"
                  style={{
                    opacity: successVisible ? 1 : 0,
                    transform: successVisible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 200ms',
                  }}
                >
                  Thank you for reaching out. We will respond within 24 business hours.
                </p>

                {/* Button — fade up last */}
                <button
                  onClick={() => { setFormStatus('idle'); setFormError(''); }}
                  className="px-6 py-2.5 text-sm font-semibold font-label rounded-sm transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: '#C9A84C',
                    color: '#2C2825',
                    opacity: successVisible ? 1 : 0,
                    transform: successVisible ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 300ms',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                data-readdy-form=""
                id="contact-modal-form"
                className="space-y-5"
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
                    <label htmlFor="modal-name" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="modal-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="modal-email"
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
                    <label htmlFor="modal-phone" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Phone
                    </label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 ..."
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-service" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Service of Interest
                    </label>
                    <select
                      id="modal-service"
                      name="service"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm text-[#1A1714] focus:border-[#C9A84C] transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="project-finance">Project Finance</option>
                      <option value="working-capital">Working Capital &amp; Term Loan</option>
                      <option value="builder-finance">Builder Finance</option>
                      <option value="msme-loan">MSME Loan</option>
                      <option value="machinery-loan">Machinery Loan</option>
                      <option value="subsidy">Subsidy</option>
                      <option value="loan-against-property">Loan Against Property</option>
                      <option value="business-loan">Business Loan / Unsecured Loan</option>
                      <option value="housing-loan">Housing Loan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-message" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="modal-message"
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
      </div>
    </div>
  );
}