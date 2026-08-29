import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: `LABH Associates respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website or engage with our services. By using our website, you consent to the practices described in this policy.`,
    },
    {
      title: '2. Information We Collect',
      content: `We may collect the following types of information:

Personal Identification Information: Name, email address, phone number, postal address, and other contact details you provide through our contact forms or during consultations.

Financial Information: Details related to your financial status, income, assets, liabilities, and credit history, collected solely for the purpose of evaluating and facilitating loan or financial advisory services.

Usage Data: Information about how you interact with our website, including IP address, browser type, pages visited, time spent on pages, and referral sources. This helps us improve our website and services.`,
    },
    {
      title: '3. How We Use Your Information',
      content: `We use the information we collect for the following purposes:

- To respond to your inquiries and provide financial advisory services
- To evaluate, process, and facilitate loan applications with partner financial institutions
- To communicate with you regarding your requests, applications, or ongoing engagements
- To improve our website, services, and client experience
- To comply with legal and regulatory requirements
- To send occasional updates or promotional communications (only with your consent)`,
    },
    {
      title: '4. Sharing Your Information',
      content: `We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:

- With banks and financial institutions to process your loan or financial service applications
- With professional advisors, auditors, or legal counsel as necessary for our operations
- When required by law, court order, or governmental authority
- In connection with a merger, acquisition, or sale of assets, subject to confidentiality obligations

All third parties with whom we share data are bound by confidentiality agreements and are permitted to use your information only for the specified purpose.`,
    },
    {
      title: '5. Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include secure servers, encryption where applicable, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
    },
    {
      title: '6. Data Retention',
      content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements. When your data is no longer needed, we will securely delete or anonymize it in accordance with applicable laws.`,
    },
    {
      title: '7. Cookies and Tracking',
      content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can set your browser to refuse all cookies or to alert you when cookies are being sent. However, some features of our website may not function properly without cookies.`,
    },
    {
      title: '8. Your Rights',
      content: `Depending on applicable law, you may have the following rights regarding your personal data:

- The right to access and obtain a copy of your personal data
- The right to request correction of inaccurate or incomplete data
- The right to request deletion of your personal data (subject to legal obligations)
- The right to object to or restrict certain processing activities
- The right to withdraw consent at any time (where processing is based on consent)

To exercise any of these rights, please contact us using the information provided below.`,
    },
    {
      title: '9. Third-Party Websites',
      content: `Our website may contain links to third-party websites, including partner banks and financial institutions. This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    },
    {
      title: '10. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
    },
    {
      title: '11. Contact Us',
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Email: tushar.barot@labhassociates.org
Phone: +91 99099 06867
Address: A 302, Titanium Heights, Opp. Vodafone House, Corporate Road, Prahaladnagar, Ahmedabad - 380015`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header */}
      <div className="bg-[#2C2825] pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="mb-4">
            <span className="text-xs font-semibold font-label uppercase tracking-[0.15em] text-[#C9A84C]">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-[#F2EDE4] mb-4">Privacy Policy</h1>
          <p className="text-sm text-[#F2EDE4]/50 leading-relaxed">
            Last updated: August 1, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold font-heading text-[#1A1714] mb-3">{section.title}</h2>
              <p className="text-sm text-[#4A4540] leading-relaxed whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-[#E8E0D4]">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-[#C9A84C] hover:text-[#1A1714] transition-colors"
          >
            <span className="w-4 h-4 flex items-center justify-center mr-1.5">
              <i className="ri-arrow-left-line" />
            </span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}