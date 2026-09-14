import { BrowserRouter, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoutes } from './router';
import { recordNavigation } from '@/lib/navHistory';
import { getPageTitle } from '@/lib/pageTitles';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import CustomCursor from '@/components/feature/CustomCursor';
import PageLoader from '@/components/feature/PageLoader';
import WhatsAppButton from '@/components/feature/WhatsAppButton';
import CookieConsent from '@/components/feature/CookieConsent';

function AppContent() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isHome = location.pathname === '/';

  // Track in-app history depth so the Back button can reliably return one
  // page (instead of always falling back to the homepage).
  useEffect(() => {
    recordNavigation(navigationType);
  }, [navigationType, location.key]);

  // Take scroll handling away from the browser, otherwise it restores the
  // previous scroll position (e.g. the footer) on back/forward navigation.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Reset scroll position whenever the route changes, so every internal
  // navigation (footer services, navbar, cards, etc.) opens at the top.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  // Keep the browser tab title in sync with the page you're on.
  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#FAF8F4' }}>
      <CustomCursor />
      <Navbar />
      <div className={`flex-1 ${isHome ? '' : 'pt-16 md:pt-20'}`}>
        <PageLoader key={location.pathname}>
          <AppRoutes />
        </PageLoader>
      </div>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppContent />
    </BrowserRouter>
  );
}