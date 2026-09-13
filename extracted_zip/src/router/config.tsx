import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AboutPage from "../pages/about/page";
import TeamPage from "../pages/team/page";
import CareersPage from "../pages/careers/page";
import CompliancePage from "../pages/compliance/page";
import ServicesPage from "../pages/services/page";
import ServiceDetailPage from "../pages/services/ServiceDetailPage";
import CaseStudiesPage from "../pages/case-studies/page";
import TestimonialsPage from "../pages/testimonials/page";
import FaqPage from "../pages/faq/page";
import ResourcesPage from "../pages/resources/page";
import EMICalculatorPage from "../pages/emi-calculator/page";
import ContactPage from "../pages/contact/page";
import TermsPage from "../pages/terms/page";
import PrivacyPage from "../pages/privacy/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/team", element: <TeamPage /> },
  { path: "/careers", element: <CareersPage /> },
  { path: "/compliance", element: <CompliancePage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/services/:slug", element: <ServiceDetailPage /> },
  { path: "/case-studies", element: <CaseStudiesPage /> },
  { path: "/testimonials", element: <TestimonialsPage /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "/resources", element: <ResourcesPage /> },
  { path: "/emi-calculator", element: <EMICalculatorPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;