/**
 * Business and brand details used across the site. Everything here is either
 * taken from the client's existing site (biv.com.au) or is a brand decision for
 * valuationcertificates.com.au. Change values here rather than in components.
 */
export const site = {
  name: "Valuation Certificates",
  /** Legal entity that provides the services (from the existing site's footer and legal page). */
  legalName: "BIV Reports Pty Limited",
  url: "https://valuationcertificates.com.au",
  locale: "en_AU",
  tagline: "Insurance valuations and strata compliance reports, done properly.",
  description:
    "Registered Valuers preparing building insurance valuations, capital works and sinking fund plans, WHS safety reports and asbestos reports for strata and community schemes across Australia.",
  phone: { display: "1300 107 280", href: "tel:1300107280", e164: "+611300107280" },
  /**
   * Public enquiry address. The existing site publishes biv@biv.com.au; swap this
   * for a valuationcertificates.com.au mailbox once one exists.
   */
  email: "biv@biv.com.au",
  foundingYear: 1983,
  copyrightStartYear: 2008,
  areaServed: "Australia",
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const serviceLinks: NavLink[] = [
  {
    label: "Building Insurance Valuation",
    href: "/services/biv/",
    description: "Certificates of value for the full replacement cost of your building.",
  },
  {
    label: "Capital Works or Sinking Fund Plan",
    href: "/services/sfp/",
    description: "10 and 15 year forecasts that set the right annual contribution.",
  },
  {
    label: "Work Health and Safety",
    href: "/services/whs/",
    description: "Practical hazard inspections with a risk rating for every item.",
  },
  {
    label: "Asbestos Report",
    href: "/services/asb/",
    description: "An asbestos register and management plan in one report.",
  },
];

export const faqLinks: NavLink[] = [
  { label: "Building Insurance Valuation", href: "/building-insurance-valuation/" },
  { label: "Capital Works or Sinking Fund Plans", href: "/sinking-fund-plans/" },
  { label: "Work Health and Safety", href: "/work-health-and-safety/" },
  { label: "Asbestos Reports", href: "/asbestos-reports/" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us/" },
  { label: "Services", children: [{ label: "All services", href: "/services/" }, ...serviceLinks] },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "FAQ", children: faqLinks },
  { label: "Contact us", href: "/contact-us/" },
];
