# Labh Associates Website Rebuild

## 1. Project Description
Rebuild & modernize the Labh Associates corporate website (https://labhassociates.org/) — an independent project finance consulting firm based in Gujarat and Mumbai with 12+ years of experience. The website is a digital presence to showcase services, team, insights, results and trust signals, and to generate qualified client inquiries.

## 2. Design System
- **Style:** Premium, layered, glassmorphic depth built on a warm editorial palette.
- **Palette (preserved exactly — no new hues):**
  - Primary / Gold: `#C9A84C`
  - Accent: `#E8D5A3` (light gold) + `#A0522D` (sienna)
  - Secondary / Charcoal: `#2C2825` / `#3D3530`
  - Background: `#FAF8F4` (cream), Surface: `#FFFFFF`
  - Text: `#1A1714`
- **Fonts:** Playfair Display (headings) + DM Sans (body).
- **Depth:** Glassmorphism panels (blur + 1px light border + soft multi-layer shadows), floating/overlapping cards, gold rules, restrained gradients.
- **Motion:** Sections fade/slide up on scroll, parallax backgrounds, count-up statistics, Matrix-style financial data-stream hero, market ticker strip, hover lift + accent glow, scroll progress bar. All motion respects `prefers-reduced-motion`.

## 3. Page Structure
- `/` — Home (logo hero, data-stream hero + ticker, services, impact, about, partners, CTA)
- `/about` — About / Our Firm
- `/team` — Leadership & Team
- `/careers` — Careers
- `/compliance` — Legal / Compliance & Disclosures
- `/services` — Services Overview
- `/services/:slug` — Individual Service Detail (9 services)
- `/case-studies` — Case Studies / Results
- `/testimonials` — Testimonials / Trust
- `/faq` — FAQ
- `/resources` — Resources / Financial Tools (compound interest, CAGR, retirement, loan eligibility)
- `/emi-calculator` — EMI Calculator
- `/contact` — Contact + Schedule a Consultation
- `/terms`, `/privacy` — Legal
- `*` — Not Found

## 4. Core Features
- [x] Glassmorphic sticky navigation with mega-menus, scroll progress bar, mobile panel
- [x] Matrix-style financial data-stream hero (layered, pausable, reduced-motion safe) + market ticker
- [x] Scroll reveal, parallax, count-up statistics across the site
- [x] Services grid + detail pages
- [x] Team / Leadership showcase
- [x] Case Studies, Testimonials
- [x] FAQ with category tabs + accordion
- [x] Interactive financial calculators (resources) + EMI calculator
- [x] Careers with open roles
- [x] Contact page (form + map) and Schedule-a-Consultation CTA
- [x] Compliance & Disclosures page
- [x] Trust-forward footer with credentials, security signals and disclosures link

## 5. Data Model Design
No database required for this static informational website. All content managed via mock data files under `src/mocks/`.

## 6. Backend / Third-party Integration Plan
- No backend required for the initial build
- Contact form uses Readdy's built-in form system (`https://readdy.ai/api/form/daj4k23oh653ivfvokj0`)
- Google Maps embed for the office location

## 7. Development Phase Plan

### Phase 1: Foundation & Home Page
- [x] Project structure, styles, shared components, complete homepage

### Phase 2: Inner Pages
- [x] About, Services, Team, EMI Calculator, Contact

### Phase 3: Revamp — Depth, Motion & Expansion
- [x] Global glassmorphism design system + motion utilities (`src/index.css`)
- [x] Matrix-style hero, ticker, scroll progress, parallax, count-up hooks
- [x] New pages: Case Studies, Testimonials, FAQ, Resources/Tools, Careers, Team, Contact, Compliance
- [x] Navigation, footer and router wired up

### Phase 4: Polish & Finalize
- [ ] Ongoing animation tuning, responsive checks, SEO meta tags, build verification