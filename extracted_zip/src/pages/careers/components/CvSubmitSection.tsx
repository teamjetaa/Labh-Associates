import { useState, useRef } from 'react';
import CustomSelect from '@/components/base/CustomSelect';

/* ===== CV SUBMISSION SECTION =====
 * Candidates submit their details + a link to their CV
 * Submits to Readdy Form API
 */

const roleOptions = [
  'Project Finance Associate',
  'Credit Analyst',
  'Relationship Manager',
  'Compliance Officer',
  'Accounts & Audit Executive',
  'Internship (Finance)',
  'Other',
].map((role) => ({ value: role, label: role }));

export default function CvSubmitSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [position, setPosition] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypotVal = (formData.get('company_alt') as string || '').trim();
    if (honeypotVal) {
      setFormStatus('sent');
      form.reset();
      setPosition('');
      return;
    }
    formData.delete('company_alt');

    setFormStatus('sending');

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/daj553rp14a1h3mr7bs0', {
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
        setPosition('');
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
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F2EDE4' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — copy */}
          <div className="reveal lg:col-span-5">
            <span className="inline-block text-[#C9A84C] text-[11px] font-label font-medium uppercase tracking-[0.15em] mb-3">
              Apply Now
            </span>
            <h2
              className="font-heading font-bold text-[#1A1714] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}
            >
              We are always looking for good people
            </h2>
            <div className="mt-5" style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }} />
            <p className="font-body text-[15px] md:text-base text-[#4A4540] leading-relaxed mt-6">
              Tell us a little about yourself and the kind of role you are looking for. Every
              application is read by our founding team &mdash; there are no gatekeepers here.
            </p>

            <ul className="mt-7 space-y-3.5">
              {[
                'Own real deals from your first year',
                'Mentorship directly from the founder',
                'A clear path from analyst to advisor',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0 text-[#C9A84C]">
                    <i className="ri-check-line" />
                  </span>
                  <span className="text-sm text-[#4A4540]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3.5">
              <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]">
                <i className="ri-mail-line" />
              </span>
              <div>
                <div className="text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-0.5">
                  Prefer email?
                </div>
                <a
                  href="mailto:tushar.barot@labhassociates.org"
                  className="text-sm text-[#1A1714] hover:text-[#C9A84C] transition-colors"
                >
                  tushar.barot@labhassociates.org
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal lg:col-span-7">
            {formStatus === 'sent' ? (
              <div className="bg-white rounded-2xl p-8 md:p-10 text-center border border-[#E8E0D4]">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}
                >
                  <i className="ri-check-line text-2xl" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#1A1714] mb-2">Application Received!</h3>
                <p className="text-sm text-[#4A4540] mb-6">
                  Thank you for your interest. Our team will review your details and reach out if there is a fit.
                </p>
                <button
                  onClick={() => { setFormStatus('idle'); setFormError(''); }}
                  className="px-6 py-2.5 text-sm font-semibold font-label rounded-md transition-all whitespace-nowrap"
                  style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                data-readdy-form=""
                id="careers-cv-form"
                className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E0D4] space-y-5"
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="company_alt"
                  className="honeypot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cv-name" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="cv-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="cv-email" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Email *
                    </label>
                    <input
                      id="cv-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cv-phone" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Phone
                    </label>
                    <input
                      id="cv-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 ..."
                      className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="cv-role" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                      Position of Interest *
                    </label>
                    <CustomSelect
                      id="cv-role"
                      name="position"
                      value={position}
                      onChange={setPosition}
                      options={roleOptions}
                      placeholder="Select a role"
                      ariaLabel="Position of interest"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cv-link" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                    Link to your CV / LinkedIn *
                  </label>
                  <input
                    id="cv-link"
                    name="cv_link"
                    type="url"
                    required
                    placeholder="https://drive.google.com/... or linkedin.com/in/..."
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors"
                  />
                  <p className="text-xs text-[#8C8480] mt-1">
                    Share a Google Drive, Dropbox or LinkedIn link so we can view your profile.
                  </p>
                </div>

                <div>
                  <label htmlFor="cv-message" className="block text-xs font-semibold font-label uppercase tracking-wider text-[#8C8480] mb-1.5">
                    Cover Note
                  </label>
                  <textarea
                    id="cv-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us why you would like to join the team..."
                    maxLength={500}
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-[#1A1714] placeholder:text-[#8C8480] focus:border-[#C9A84C] transition-colors resize-none"
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
                  className="btn-sheen w-full sm:w-auto px-8 py-3 text-sm font-semibold font-label rounded-md transition-all disabled:opacity-60 whitespace-nowrap"
                  style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
                >
                  {formStatus === 'sending' ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-xs text-[#8C8480]">We review every application within a week</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}