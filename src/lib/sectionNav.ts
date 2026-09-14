/*
 * Section navigation map.
 *
 * The site groups pages into top-level "sections" (one per navbar dropdown).
 * Inside a section:
 *   1. an inner page should always be able to return to that section's
 *      list / landing page first (not to whichever inner page was viewed
 *      before), and
 *   2. moving between two inner pages of the SAME section should replace the
 *      current history entry instead of stacking a new one — so Back reliably
 *      lands on the section list rather than retracing every page browsed.
 *
 * Adding a new section later only means adding one entry here; the Back
 * button, footer and navbar all read from this single source.
 */

interface SectionDef {
  /** The section's list / landing page. */
  list: string;
  /** Fixed inner-page paths that belong to this section. */
  members: string[];
  /** Optional dynamic detail-route prefix, e.g. '/services/' for '/services/:slug'. */
  detailPrefix?: string;
}

const SECTION_DEFS: SectionDef[] = [
  // About: Leadership & Team, Careers & Compliance return to Our Firm.
  { list: '/about', members: ['/team', '/careers', '/compliance'] },
  // Services: every /services/:slug detail returns to the /services list.
  { list: '/services', members: [], detailPrefix: '/services/' },
  // Insights: Client Trust & FAQ return to the Case Studies list.
  { list: '/case-studies', members: ['/testimonials', '/faq'] },
  // Resources: EMI Calculator & Contact return to the Financial Tools list.
  { list: '/resources', members: ['/emi-calculator', '/contact'] },
];

/*
 * Pages whose Back always returns to the homepage:
 *   - Leaf pages outside any section (legal pages) have no deeper level to
 *     climb to.
 *   - The All Services list itself is a top-level destination, so Back goes
 *     straight Home rather than retracing whichever page was viewed before.
 */
const HOME_TARGET_PAGES = ['/terms', '/privacy', '/services'];

function isMember(pathname: string, def: SectionDef): boolean {
  if (def.members.includes(pathname)) return true;
  if (def.detailPrefix && pathname.startsWith(def.detailPrefix)) return true;
  return false;
}

/*
 * Returns the section list page an inner page belongs to, or null when the
 * path is a section list itself, a top-level page, or outside any section.
 */
export function getSectionList(pathname: string): string | null {
  const def = SECTION_DEFS.find((d) => isMember(pathname, d));
  return def ? def.list : null;
}

/*
 * The page Back should return to for a given path, or null when Back should
 * fall through to the normal one-page-back history behavior.
 *   - Section inner pages → their section list.
 *   - Leaf pages with no section (legal pages) → the homepage.
 */
export function getBackTarget(pathname: string): string | null {
  if (HOME_TARGET_PAGES.includes(pathname)) return '/';
  return getSectionList(pathname);
}

/*
 * True when both paths are inner pages of the SAME section. Used to decide
 * whether a link click should replace the current history entry.
 */
export function isSameSection(from: string, to: string): boolean {
  const fromList = getSectionList(from);
  if (!fromList) return false;
  return fromList === getSectionList(to);
}