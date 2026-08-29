import useScrollReveal from '@/hooks/useScrollReveal';
import LogoHeroSection from './components/LogoHeroSection';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ImpactSection from './components/ImpactSection';
import AboutSection from './components/AboutSection';
import PartnersSection from './components/PartnersSection';
import CTASection from './components/CTASection';

/* ===== HOME PAGE =====
 * LABH Associates — Warm editorial premium homepage
 */
export default function HomePage() {
  useScrollReveal();

  return (
    <main role="main" className="section-flow">
      <div className="section-wrapper">
        <LogoHeroSection />
      </div>
      <div className="section-wrapper">
        <HeroSection />
      </div>
      <div className="section-wrapper">
        <ServicesSection />
        <div className="section-blend-top" style={{ background: 'linear-gradient(to bottom, #FAF8F4, transparent 100%)' }} />
      </div>
      <div className="section-wrapper">
        <div className="section-blend-bottom" style={{ background: 'linear-gradient(to top, #2C2825, transparent 100%)' }} />
        <ImpactSection />
      </div>
      <div className="section-wrapper">
        <div className="section-blend-top" style={{ background: 'linear-gradient(to bottom, #2C2825, transparent 100%)' }} />
        <AboutSection />
        <div className="section-blend-bottom" style={{ background: 'linear-gradient(to top, #F2EDE4, transparent 100%)' }} />
      </div>
      <div className="section-wrapper">
        <div className="section-blend-top" style={{ background: 'linear-gradient(to bottom, #F2EDE4, transparent 100%)' }} />
        <PartnersSection />
      </div>
      <div className="section-wrapper">
        <CTASection />
      </div>
    </main>
  );
}