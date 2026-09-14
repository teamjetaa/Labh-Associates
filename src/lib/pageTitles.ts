import { services } from '@/mocks/services';

/* ===== PAGE TITLES =====
 * Centralized resolver that maps the current route to a human-friendly
 * browser tab title. Keeping it in one place means every page — including
 * each dynamic service page — stays in sync automatically.
 */

const BRAND = 'LABH Associates';

// Titles WITHOUT the brand suffix (the brand is appended automatically).
// The home title is the exception: it already includes the brand for SEO.
const staticTitles: Record<string, string> = {
  '/': 'LABH Associates | Financial Advisory & Business Loans',
  '/about': 'About Our Firm',
  '/team': 'Leadership & Team',
  '/careers': 'Careers',
  '/compliance': 'Compliance & Disclosures',
  '/services': 'Our Services',
  '/case-studies': 'Case Studies',
  '/testimonials': 'Client Trust & Testimonials',
  '/faq': 'Frequently Asked Questions',
  '/resources': 'Financial Resources & Tools',
  '/emi-calculator': 'EMI Calculator',
  '/contact': 'Contact Us',
  '/terms': 'Terms & Conditions',
  '/privacy': 'Privacy Policy',
};

export function getPageTitle(pathname: string): string {
  // Normalize a trailing slash (e.g. "/about/" -> "/about") without
  // touching the root path.
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

  // Dynamic service pages resolve to the actual service name.
  if (path.startsWith('/services/')) {
    const slug = path.slice('/services/'.length);
    const service = services.find((s) => s.slug === slug);
    return service ? `${service.title} | ${BRAND}` : `Our Services | ${BRAND}`;
  }

  const base = staticTitles[path];
  if (base === undefined) {
    return `Page Not Found | ${BRAND}`;
  }

  // Home already carries the brand.
  if (path === '/') {
    return base;
  }

  return `${base} | ${BRAND}`;
}