import Link from "next/link";
import { faqLinks, serviceLinks, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { Logo } from "./logo";

const companyLinks = [
  { label: "About us", href: "/about-us/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact us", href: "/contact-us/" },
  { label: "Request a quote", href: "/quote-request/" },
  { label: "Legal and privacy", href: "/legal/" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink-950 text-slate-300">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" aria-label={`${site.name}, home`} className="inline-block rounded-lg">
            <Logo inverted />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-slate-400">{site.description}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={site.phone.href} className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-brand-300">
                <PhoneIcon className="size-4 text-brand-400" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-brand-300">
                <MailIcon className="size-4 text-brand-400" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <FooterColumn title="Services" links={[{ label: "All services", href: "/services/" }, ...serviceLinks]} />
        <FooterColumn title="FAQ" links={faqLinks} />
        <FooterColumn title="Company" links={companyLinks} />
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightStartYear}–{new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Registered Valuers serving strata and community schemes across Australia.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={`Footer ${title.toLowerCase()}`}>
      <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-10 items-center text-sm hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
