import { Link } from 'react-router-dom';

/* ===== FOOTER =====
 * Warm charcoal background, gold top border, 3-column layout
 */
export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Terms \u0026 Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer role="contentinfo" style={{ backgroundColor: '#2C2825' }}>
      {/* Gold top border */}
      <div style={{ height: '1px', backgroundColor: 'rgba(201, 168, 76, 0.25)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="inline-block shrink-0">
              <img
                src="https://storage.readdy-site.link/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/368d6aa3-c72f-449a-811f-48c340432b43_compressed_New-Rebranded-Logo-Design.webp"
                alt="LABH Associates"
                className="h-20 md:h-24 w-auto object-contain shrink-0"
              />
            </Link>
            <p className="text-sm text-[#F2EDE4]/50 leading-relaxed">
              Partnering for your financial success since 2012. Independent advisory built on integrity, expertise, and long-term partnerships.
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

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-label font-medium uppercase tracking-[0.15em] text-[#C9A84C] mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
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

          {/* Contact Info */}
          <div>
            <h5 className="text-xs font-label font-medium uppercase tracking-[0.15em] text-[#C9A84C] mb-4">
              Contact
            </h5>
            <div className="space-y-2.5">
              <a
                href="tel:+919909906867"
                className="flex items-center gap-2.5 text-sm text-[#F2EDE4]/60 hover:text-[#C9A84C] transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#C9A84C]" style={{ fontSize: '14px' }}>
                  <i className="ri-phone-line" />
                </span>
                +91 99099 06867
              </a>
              <a
                href="mailto:tushar.barot@labhassociates.org"
                className="flex items-center gap-2.5 text-sm text-[#F2EDE4]/60 hover:text-[#C9A84C] transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#C9A84C]" style={{ fontSize: '14px' }}>
                  <i className="ri-mail-line" />
                </span>
                tushar.barot@labhassociates.org
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[#F2EDE4]/60">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A84C]" style={{ fontSize: '14px' }}>
                  <i className="ri-map-pin-line" />
                </span>
                <span className="leading-relaxed">
                  A 302, Titanium Heights, Opp. Vodafone House,<br />
                  Corporate Road, Prahaladnagar,<br />
                  Ahmedabad - 380015
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(201, 168, 76, 0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#F2EDE4]/40 font-label">
            &copy; {new Date().getFullYear()} LABH Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/terms"
              className="text-xs text-[#F2EDE4]/40 hover:text-[#C9A84C] transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-xs text-[#F2EDE4]/20">&middot;</span>
            <Link
              to="/privacy"
              className="text-xs text-[#F2EDE4]/40 hover:text-[#C9A84C] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}