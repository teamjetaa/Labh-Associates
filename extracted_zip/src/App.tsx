import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './router';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import CustomCursor from '@/components/feature/CustomCursor';
import PageLoader from '@/components/feature/PageLoader';
import WhatsAppButton from '@/components/feature/WhatsAppButton';
import CookieConsent from '@/components/feature/CookieConsent';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

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