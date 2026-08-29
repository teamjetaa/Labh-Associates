import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '@/mocks/navigation';
import ContactModal from './ContactModal';

/* ===== NAVBAR =====
 * Home page: transparent over hero → warm frosted glass on scroll
 * Other pages: always warm frosted glass (no dark hero behind)
 */

const serviceIcons: Record<string, string> = {
  'Project Finance': 'ri-funds-box-line',
  'Working Capital & Term Loan': 'ri-refresh-line',
  'Builder Finance': 'ri-building-line',
  'MSME Loans': 'ri-store-line',
  'Machinery Loans': 'ri-settings-3-line',
  'Subsidy': 'ri-coupon-2-line',
  'Property Loans': 'ri-home-2-line',
  'Business Loan / Unsecured Loan': 'ri-briefcase-line',
  'Housing Loans': 'ri-home-line',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  // On non-home pages, always show the scrolled/glass state
  const isGlass = !isHome || scrolled;

  const openContactModal = () => {
    setContactModalOpen(true);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handler = () => setContactModalOpen(true);
    window.addEventListener('openContactModal', handler);
    return () => window.removeEventListener('openContactModal', handler);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isGlass
            ? 'bg-[rgba(250,248,244,0.92)] backdrop-blur-lg shadow-[0_1px_0_#E8E0D4]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ===== LOGO ===== */}
            <Link to="/" className="shrink-0 group" aria-label="LABH Associates Home">
              <img
                src="https://storage.readdy-site.link/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/ea48ba08-f4a4-4412-be8e-55ac435860a0_compressed_New_Rebranded_Logo_Design__2_-removebg-preview.webp"
                alt="LABH Associates"
                className="h-12 md:h-16 w-auto object-contain shrink-0"
              />
            </Link>

            {/* ===== DESKTOP NAV ===== */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === link.label ? null : link.label)
                      }
                      className={`flex items-center gap-1 px-3 py-2 text-[14px] font-label whitespace-nowrap transition-colors duration-300 ${
                        isActive(link.href)
                          ? 'text-[#C9A84C]'
                          : isGlass
                            ? 'text-[#4A4540] hover:text-[#C9A84C]'
                            : 'text-[#F2EDE4]/70 hover:text-[#C9A84C]'
                      }`}
                    >
                      {link.label}
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i
                          className={`ri-arrow-down-s-line transition-transform text-xs ${
                            activeDropdown === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`relative px-3 py-2 text-[14px] font-label whitespace-nowrap transition-colors duration-300 group/nav ${
                        isActive(link.href)
                          ? 'text-[#C9A84C]'
                          : isGlass
                            ? 'text-[#4A4540] hover:text-[#C9A84C]'
                            : 'text-[#F2EDE4]/70 hover:text-[#C9A84C]'
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#C9A84C] transform scale-x-0 origin-left transition-transform duration-300 group-hover/nav:scale-x-100 ${
                        isActive(link.href) ? 'scale-x-100' : ''
                      }`} />
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                      {link.label === 'Services' ? (
                        /* ===== SERVICES MEGA DROPDOWN ===== */
                        <div className="w-[420px] bg-white rounded-[4px] shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-[#E8E0D4] py-5 px-5 animate-[dropdownIn_0.25s_ease-out]">
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-[3px] text-sm font-label transition-colors ${
                                  location.pathname === child.href
                                    ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.06)]'
                                    : 'text-[#4A4540] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.04)]'
                                }`}
                              >
                                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-base">
                                  <i className={serviceIcons[child.label] || 'ri-arrow-right-line'} />
                                </span>
                                <span className="truncate">{child.label}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-[#E8E0D4]">
                            <Link
                              to="/services"
                              className="flex items-center justify-center gap-1.5 text-[13px] font-medium font-label text-[#C9A84C] hover:text-[#A0522D] transition-colors"
                            >
                              View All Services
                              <span className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-arrow-right-line" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        /* ===== STANDARD DROPDOWN ===== */
                        <div className="w-56 bg-white rounded-lg shadow-xl border border-[#E8E0D4] py-2 z-50 animate-[dropdownIn_0.25s_ease-out]">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className={`block px-4 py-2.5 text-sm font-label transition-colors ${
                                location.pathname === child.href
                                  ? 'text-[#C9A84C] bg-gold/5'
                                  : 'text-[#4A4540] hover:text-[#C9A84C] hover:bg-gold/5'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* ===== CTA (desktop only) ===== */}
            <button
              onClick={openContactModal}
              className="hidden lg:inline-flex items-center px-5 py-2 text-[13px] font-medium font-label rounded-sm whitespace-nowrap transition-all duration-300 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1714]"
            >
              Get in Touch
            </button>

            {/* ===== MOBILE TOGGLE ===== */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="w-[22px] h-[22px] flex items-center justify-center relative">
                <span
                  className={`absolute w-[22px] h-[2px] transition-all duration-300 ${
                    isGlass && !mobileOpen ? 'bg-[#1A1714]' : 'bg-[#F2EDE4]'
                  } ${
                    mobileOpen ? 'bg-[#F2EDE4] rotate-45 top-1/2 -translate-y-1/2' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute w-[22px] h-[2px] transition-all duration-300 ${
                    isGlass && !mobileOpen ? 'bg-[#1A1714]' : 'bg-[#F2EDE4]'
                  } ${
                    mobileOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                  }`}
                />
                <span
                  className={`absolute w-[22px] h-[2px] transition-all duration-300 ${
                    isGlass && !mobileOpen ? 'bg-[#1A1714]' : 'bg-[#F2EDE4]'
                  } ${
                    mobileOpen ? 'bg-[#F2EDE4] -rotate-45 top-1/2 -translate-y-1/2' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-[#1A1714] flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-end px-4 h-16 shrink-0">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-2xl text-[#F2EDE4]" />
                </span>
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col items-center justify-center gap-5">
              {navLinks.map((link) => {
                const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                return (
                  <div key={link.label} className="w-full text-center">
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === link.label ? null : link.label)
                          }
                          className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 text-lg font-heading font-medium ${
                            isActive(link.href) ? 'text-[#C9A84C]' : 'text-[#F2EDE4]/80'
                          }`}
                        >
                          {link.label}
                          <span className="w-4 h-4 flex items-center justify-center">
                            <i
                              className={`ri-arrow-down-s-line transition-transform text-sm ${
                                activeDropdown === link.label ? 'rotate-180' : ''
                              }`}
                            />
                          </span>
                        </button>
                        {activeDropdown === link.label && (
                          <div className="space-y-1 pb-2">
                            {link.children!.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-3 py-2 text-sm font-label ${
                                  location.pathname === child.href
                                    ? 'text-[#C9A84C]'
                                    : 'text-[#F2EDE4]/50 hover:text-[#C9A84C]'
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 text-lg font-heading font-medium ${
                          isActive(link.href)
                            ? 'text-[#C9A84C]'
                            : 'text-[#F2EDE4]/80 hover:text-[#C9A84C]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <button
                onClick={openContactModal}
                className="mt-4 px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-sm font-medium font-label rounded-sm hover:bg-[#C9A84C] hover:text-[#1A1714] transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        )}
      </header>
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}