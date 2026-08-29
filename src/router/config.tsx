import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AboutPage from "../pages/about/page";
import ServicesPage from "../pages/services/page";
import ServiceDetailPage from "../pages/services/ServiceDetailPage";
import BlogPage from "../pages/blog/page";
import EMICalculatorPage from "../pages/emi-calculator/page";
import TermsPage from "../pages/terms/page";
import PrivacyPage from "../pages/privacy/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/services/:slug", element: <ServiceDetailPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/emi-calculator", element: <EMICalculatorPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;