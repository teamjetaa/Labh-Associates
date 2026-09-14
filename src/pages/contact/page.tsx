import { useState, useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import CustomSelect from '@/components/base/CustomSelect';

const FORM_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '4e7c6588-ca29-4cfd-8a3a-d41b3d3dc5ff';

const serviceOptions = [
  { value: 'project-finance', label: 'Project Finance' },
  { value: 'working-capital', label: 'Working Capital & Term Loan' },
  { value: 'builder-finance', label: 'Builder Finance' },
  { value: 'msme-loan', label: 'MSME Loan' },
  { value: 'machinery-loan', label: 'Machinery Loan' },
  { value: 'subsidy', label: 'Subsidy' },
  { value: 'loan-against-property', label: 'Loan Against Property' },
  { value: 'business-loan', label: 'Business Loan / Unsecured Loan' },
  { value: 'housing-loan', label: 'Housing Loan' },
  { value: 'careers', label: 'Careers / Application' },
  { value: 'other', label: 'Other' },
];

const contactDetails = [
  {
    icon: 'ri-phone-line',
    label: 'Phone',
    value: '+91 99099 06867',
    href: 'tel:+919909906867',
  },
  {
    icon: 'ri-mail-line',
    label: 'Email',
    value: 'tushar.barot@labhassociates.org',
    href: 'mailto:tushar.barot@labhassociates.org',
  },
  {
    icon: 'ri-map-pin-line',
    label: 'Office',
    value: 'A 302, Titanium Heights, Opp. Vodafone House, Corporate Road, Prahaladnagar, Ahmedabad \u2013 380015',
  },
  {
    icon: 'ri-time-line',
    label: 'Office Hours',
    value: 'Monday \u2013 Saturday, 10:00 AM \u2013 7:00 PM IST',
  },
];

/* ===== CONTACT PAGE ===== */
export default function ContactPage() {
  useScrollReveal();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [service, setService] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypotVal = ((formData.get('contact_alt') as string) || '').trim();
    if (honeypotVal) {
      setFormStatus('sent');
      form.reset();
      setService('');
      return;
    }
    formData.delete('contact_alt');

    setFormStatus('sending');

    try {
      const params = new URLSearchParams();
      params.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });

      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const responseText = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      if (response.ok && parsed?.success) {
        setFormStatus('sent');
        form.reset();
        setService('');
      } else {
        const serverMsg = parsed?.message || 'Something went wrong. Please try again.';
        setFormError(serverMsg);
        setFormStatus('error');
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setFormStatus('error');
    }
  };

  return (
    <main role="main">
      <PageHero
        eyebrow="Get in Touch"
        title="Let&rsquo;s Talk About Your Requirement"
        subtitle="Tell us what you are trying to fund, refinance or plan. You will hear back from a real advisor — usually within one business day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-16 md:py-24" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: details + map */}
            <div className="reveal lg:col-span-5 space-y-8">
              <div className="glass-panel-tint rounded-2xl p-6 md:p-8">
                <h2 className="font-heading text-2xl text-[#1A1714] mb-2">Reach Us Directly</h2>
                <div className="mb-6" style={{ width: '40px', height: '2px', backgroundColor: '#C9A84C' }} />
                <div className="space-y-5">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <span
                        className="w-11 h-11 flex items-center justify-center shrink-0 rounded-full"
                        style={{ background: 'rgba(201,168,76,0.14)' }}
                      >
                        <i className={`${item.icon} text-lg text-[#C9A84C]`} />
                      </span>
                      <div>
                        <div className="text-[11px] font-label font-semibold uppercase tracking-wider text-[#8C8480] mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-[#1A1714] hover:text-[#C9A84C] transition-colors leading-relaxed"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#4A4540] leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden float-layer" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                <iframe
                  title="LABH Associates office location in Ahmedabad"
                  src="https://www.google.com/maps?q=A%20302%2C%20Titanium%20Heights%2C%20Corporate%20Road%2C%20Prahaladnagar%2C%20Ahmedabad%20380015&output=embed"
                  className="w-full"
                  style={{ height: '280px', border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal lg:col-span-7">
              <div className="glass-panel rounded-2xl p-6 md:p-9">
                <span className="inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
                  Schedule a Consultation
                </span>
                <h2 className="font-heading text-2xl md:text-3xl text-[#1A1714] mb-2">
                  Send us a message
                </h2>
                <p className="text-sm text-[#4A4540] mb-7">
                  The first consultation is free and carries no obligation.
                </p>

                {formStatus === 'sent' ? (
                  <div className="text-center py-10">
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4"
                      style={{ backgroundColor: '#C9A84C', color: '#F2EDE4' }}
                    >
                      <i className="ri-check-line text-2xl" />
                    </div>
                    <h3 className="font-heading text-xl text-[#1A1714] mb-2">Thank You!</h3>
                    <p className="text-sm text-[#4A4540] mb-6">
                      Your message is with us. We will respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus('idle');
                        setFormError('');
                      }}
                      className="px-6 py-2.5 text-sm font-semibold font-label rounded-md whitespace-nowrap"
                      style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    data-readdy-form=""
                    id="contact-page-form"
                    className="space-y-5"
                    noValidate
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="contact_alt"
                      className="honeypot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      readOnly
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cp-name" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="cp-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="cp-email" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                          Email *
                        </label>
                        <input
                          id="cp-email"
                          name="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="cp-phone" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                          Phone
                        </label>
                        <input
                          id="cp-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 ..."
                          className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="cp-service" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                          Service of Interest
                        </label>
                        <CustomSelect
                          id="cp-service"
                          name="service"
                          options={serviceOptions}
                          value={service}
                          onChange={(val) => setService(val)}
                          placeholder="Select a service"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cp-message" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                        How can we help? *
                      </label>
                      <textarea
                        id="cp-message"
                        name="message"
                        rows={5}
                        required
                        maxLength={500}
                        placeholder="Tell us briefly about your requirement..."
                        className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors resize-none bg-white"
                      />
                      <p className="text-xs text-[#8C8480] mt-1">Maximum 500 characters</p>
                    </div>

                    {formStatus === 'error' && formError && (
                      <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="btn-sheen inline-flex items-center px-8 py-3.5 text-sm font-semibold font-label rounded-md transition-all hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
                      style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                    >
                      {formStatus === 'sending' ? 'Sending...' : 'Schedule a Consultation'}
                    </button>

                    <p className="text-xs text-[#8C8480]">
                      By submitting, you agree to our{' '}
                      <a href="/privacy" className="text-[#C9A84C] hover:underline">
                        privacy policy
                      </a>
                      . We never share your details.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}