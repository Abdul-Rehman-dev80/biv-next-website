/**
 * Every indexable URL on the site. These match the existing site's URLs exactly
 * (including trailing slashes) and feed the sitemap and route tests.
 */
export const indexableRoutes = [
  { path: "/", priority: 1 },
  { path: "/about-us/", priority: 0.7 },
  { path: "/services/", priority: 0.9 },
  { path: "/services/biv/", priority: 0.9 },
  { path: "/services/sfp/", priority: 0.9 },
  { path: "/services/whs/", priority: 0.9 },
  { path: "/services/asb/", priority: 0.9 },
  { path: "/testimonials/", priority: 0.6 },
  { path: "/building-insurance-valuation/", priority: 0.7 },
  { path: "/sinking-fund-plans/", priority: 0.7 },
  { path: "/work-health-and-safety/", priority: 0.7 },
  { path: "/asbestos-reports/", priority: 0.7 },
  { path: "/contact-us/", priority: 0.6 },
  { path: "/quote-request/", priority: 0.8 },
  { path: "/legal/", priority: 0.2 },
] as const;
