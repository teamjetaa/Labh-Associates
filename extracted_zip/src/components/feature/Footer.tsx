import { Link } from 'react-router-dom';
import MatrixRain from '@/components/feature/MatrixRain';

/* ===== FOOTER =====
 * Warm charcoal base with gold accents, expanded sitemap and a
 * trust-signal strip (credentials, confidentiality, compliance link).
 */

const columns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Our Firm', href: '/about' },
      { label: 'Leadership & Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Compliance & Disclosures', href: '/compliance' },
    ],
  },
  {
    heading: 'Insights',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Client Trust', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Project Finance', href: '/services/project-finance' },
      { label: 'Working Capital', href: '/services/working-capital' },
      { label: 'MSME Loans', href: '/services/msme-loan' },
      { label: 'Builder Finance', href: '/services/builder-finance' },
      { label: 'Machinery Loans', href: '/services/machinery-loan' },
      { label: 'View All Services', href: '/services' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { label: 'Financial Resources', href: '/resources' },
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

const trustBadges = [
  { icon: 'ri-shield-check-line', label: 'Client Confidentiality' },
  { icon: 'ri-award-line', label: '12+ Years Advisory' },
  { icon: 'ri-hand-coin-line', label: 'Commission-Free Advice' },
  { icon: 'ri-lock-2-line', label: 'Secure & Compliant' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="relative overflow-hidden" style={{ backgroundColor: '#2C2825' }}>
      {/* Gold top border */}
      <div style={{ height: '1px', backgroundColor: 'rgba(201, 168, 76, 0.25)' }} />

      {/* Faint financial data stream backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }}>
        <MatrixRain variant="ambient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block shrink-0">
              <img
                src="https://storage.readdy-site.link/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/368d6aa3-c72f-449a-811f-48c340432b43_compressed_New-Rebranded-Logo-Design.webp"
                alt="LABH Associates"
                className="h-20 md:h-24 w-auto object-contain shrink-0"
              />
            </Link>
            <p className="text-sm text-[#F2EDE4]/50 leading-relaxed max-w-xs">
              Independent financial advisory partnering for your success since 2012. Built on
              integrity, expertise, and long-term relationships across India.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://m.facebook.com/p/Labh-Associates-100066607406846/', icon: 'ri-facebook-fill', label: 'Facebook' },
                { href: 'https://www.instagram.com/labh_associates_/', icon: 'ri-instagram-line', label: 'Instagram' },
                { href: 'https://www.linkedin.com/company/labh-associates/', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                { href: 'https://youtube.com/@LabhAssociates', icon: 'ri-youtube-fill', label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2EDE4]/5 text-[#F2EDE4]/50 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                  aria-label={social.label}
                >
                  <i className={social.icon} style={{ fontSize: '14px' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h5 className="text-xs font-label font-medium uppercase tracking-[0.15em] text-[#C9A84C] mb-4">
                {col.heading}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#F2EDE4]/60 hover:text-[#C9A84C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact line */}
        <div className="mt-10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-5" style={{ borderTop: '1px solid rgba(201, 168, 76, 0.12)' }}>
          <a
            href="tel:+919909906867"
            className="flex items-center gap-2.5 text-sm text-[#F2EDE4]/60 hover:text-[#C9A84C] transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[#C9A84C]" style={{ fontSize: '15px' }}>
              <i className="ri-phone-line" />
            </span>
            +91 99099 06867
          </a>
          <a
            href="mailto:tushar.barot@labhassociates.org"
            className="flex items-center gap-2.5 text-sm text-[#F2EDE4]/60 hover:text-[#C9A84C] transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[#C9A84C]" style={{ fontSize: '15px' }}>
              <i className="ri-mail-line" />
            </span>
            tushar.barot@labhassociates.org
          </a>
          <div className="flex items-start gap-2.5 text-sm text-[#F2EDE4]/60">
            <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]" style={{ fontSize: '15px' }}>
              <i className="ri-map-pin-line" />
            </span>
            <span className="leading-relaxed">
              A 302, Titanium Heights, Corporate Road, Prahaladnagar, Ahmedabad &ndash; 380015
            </span>
          </div>
        </div>

        {/* Trust signals strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 rounded-lg px-3.5 py-3"
              style={{
                background: 'rgba(242, 237, 228, 0.04)',
                border: '1px solid rgba(201, 168, 76, 0.12)',
              }}
            >
              <span className="w-6 h-6 flex items-center justify-center shrink-0 text-[#C9A84C]" style={{ fontSize: '18px' }}>
                <i className={badge.icon} />
              </span>
              <span className="text-[11px] font-label text-[#F2EDE4]/60 leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(201, 168, 76, 0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#F2EDE4]/40 font-label">
            &copy; {new Date().getFullYear()} LABH Associates. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/compliance" className="text-xs text-[#F2EDE4]/40 hover:text-[#C9A84C] transition-colors">
              Compliance &amp; Disclosures
            </Link>
            <span className="text-xs text-[#F2EDE4]/20">&middot;</span>
            <Link to="/terms" className="text-xs text-[#F2EDE4]/40 hover:text-[#C9A84C] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-xs text-[#F2EDE4]/20">&middot;</span>
            <Link to="/privacy" className="text-xs text-[#F2EDE4]/40 hover:text-[#C9A84C] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}