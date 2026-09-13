import useScrollReveal from '@/hooks/useScrollReveal';
import PageHero from '@/components/feature/PageHero';
import FirmStory from './components/FirmStory';
import LeadershipTeam from './components/LeadershipTeam';
import CoreValues from './components/CoreValues';
import ContactSection from './components/ContactSection';

/* ===== ABOUT PAGE ===== */
export default function AboutPage() {
  useScrollReveal();

  return (
    <main role="main">
      <PageHero
        eyebrow="Who We Are"
        title="Our Firm"
        subtitle="A legacy of trust in project finance since 2012 — from Gujarat to Mumbai, over a decade of empowering businesses with tailored financial solutions."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <FirmStory />
      <LeadershipTeam />
      <CoreValues />
      <ContactSection />
    </main>
  );
}