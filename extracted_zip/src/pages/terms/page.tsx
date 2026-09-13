import { Link } from 'react-router-dom';
import BackButton from '@/components/feature/BackButton';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: `Welcome to the website of LABH Associates. These Terms and Conditions govern your use of our website and the services offered herein. By accessing or using this website, you agree to be bound by these terms. If you do not agree with any part of these terms, please refrain from using our website.`,
    },
    {
      title: '2. Use of the Website',
      content: `This website is provided for informational purposes and to facilitate engagement with our financial advisory services. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. You must not misuse our site by knowingly introducing viruses, trojans, worms, or other malicious or technologically harmful material.`,
    },
    {
      title: '3. Financial Advisory Disclaimer',
      content: `The content on this website is for general informational purposes only and does not constitute professional financial, legal, or investment advice. While we strive to ensure the accuracy and timeliness of the information presented, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Any reliance you place on such information is strictly at your own risk. For personalized financial advice, please contact us directly to schedule a consultation.`,
    },
    {
      title: '4. No Guarantee of Loan Approval',
      content: `LABH Associates acts as an independent financial intermediary and advisory firm. We facilitate connections between clients and financial institutions. We do not guarantee loan approvals, interest rates, or specific terms from any lending institution. Final lending decisions, terms, and conditions are at the sole discretion of the respective banks and financial institutions.`,
    },
    {
      title: '5. Intellectual Property',
      content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of LABH Associates or its content suppliers and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any material on this site without our prior written consent.`,
    },
    {
      title: '6. Client Confidentiality',
      content: `We respect your privacy and are committed to protecting any personal or financial information you share with us. All client information collected through this website or during consultations is handled in accordance with our Privacy Policy. We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services or comply with legal obligations.`,
    },
    {
      title: '7. Limitation of Liability',
      content: `To the fullest extent permitted by applicable law, LABH Associates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of this website or our services.`,
    },
    {
      title: '8. Third-Party Links',
      content: `This website may contain links to third-party websites that are not owned or controlled by LABH Associates. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and conditions and privacy policies of any third-party sites you visit.`,
    },
    {
      title: '9. Governing Law',
      content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Ahmedabad, Gujarat.`,
    },
    {
      title: '10. Changes to These Terms',
      content: `We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes your acceptance of the revised terms. We encourage you to review this page periodically.`,
    },
    {
      title: '11. Contact Us',
      content: `If you have any questions or concerns about these Terms and Conditions, please contact us:

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
          <div className="mb-5 flex justify-start">
            <BackButton />
          </div>
          <div className="mb-4">
            <span className="text-xs font-semibold font-label uppercase tracking-[0.15em] text-[#C9A84C]">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-[#F2EDE4] mb-4">Terms &amp; Conditions</h1>
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