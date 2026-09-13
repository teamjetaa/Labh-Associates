export const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Firm', href: '/about' },
      { label: 'Leadership & Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Compliance & Disclosures', href: '/compliance' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Project Finance', href: '/services/project-finance' },
      { label: 'Working Capital \u0026 Term Loan', href: '/services/working-capital' },
      { label: 'Builder Finance', href: '/services/builder-finance' },
      { label: 'MSME Loans', href: '/services/msme-loan' },
      { label: 'Machinery Loans', href: '/services/machinery-loan' },
      { label: 'Subsidy', href: '/services/subsidy' },
      { label: 'Property Loans', href: '/services/loan-against-property' },
      { label: 'Business Loan / Unsecured Loan', href: '/services/business-loan' },
      { label: 'Housing Loans', href: '/services/housing-loan' },
    ],
  },
  {
    label: 'Insights',
    href: '/case-studies',
    children: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Client Trust', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Financial Tools', href: '/resources' },
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];