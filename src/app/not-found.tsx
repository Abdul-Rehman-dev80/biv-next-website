import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { faqLinks, serviceLinks } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="max-w-3xl py-24 sm:py-32">
      <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mt-5 text-lg text-slate-700">
        The link may be out of date, or the address may have a typo. These pages might help:
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">Services</h2>
          <ul className="mt-3 space-y-2">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-700 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">FAQs</h2>
          <ul className="mt-3 space-y-2">
            {faqLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-700 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/contact-us/" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
