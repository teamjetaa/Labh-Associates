import useScrollReveal from '@/hooks/useScrollReveal';
import AboutHero from './components/AboutHero';
import FirmStory from './components/FirmStory';
import LeadershipTeam from './components/LeadershipTeam';
import CoreValues from './components/CoreValues';
import ContactSection from './components/ContactSection';

/* ===== ABOUT PAGE ===== */
export default function AboutPage() {
  useScrollReveal();

  return (
    <main role="main">
      <AboutHero />
      <FirmStory />
      <LeadershipTeam />
      <CoreValues />
      <ContactSection />
    </main>
  );
}