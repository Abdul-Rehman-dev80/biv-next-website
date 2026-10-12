import type { CSSProperties } from "react";
import Link from "next/link";
import { BuildingScene } from "@/components/home/building-scene";
import { DiamondScene } from "@/components/home/diamond-scene";
import { HomeHero } from "@/components/home/hero";
import { Statement } from "@/components/home/statement";
import { StatsReveal } from "@/components/home/stats-reveal";
import { TestimonialTrack } from "@/components/home/testimonial-track";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { faqLinks } from "@/content/site";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BIV Reports | Strata Insurance Valuations & Reports",
  absoluteTitle: true,
  description:
    "Registered Valuers since 1984 providing building insurance valuations, sinking fund plans, WHS safety reports and asbestos reports for Australian strata schemes.",
  path: "/",
});

const featuredTestimonials = [0, 2, 5, 6, 12, 13, 14].map((i) => testimonials[i]);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <DiamondScene services={services} />
      <Statement />
      <BuildingScene />

      <section aria-labelledby="about-heading" className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">About us</p>
            <h2 id="about-heading" className="mt-2 text-3xl font-bold sm:text-5xl">
              Independent, qualified and easy to deal with
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate-700">
            <p data-reveal style={{ "--i": 1 } as CSSProperties}>
              We have been Registered Valuers since 1984. We regularly present expert evidence in both Federal and
              State courts, and our directors sit on government and industry committees advising on strata and other
              property matters.
            </p>
            <p data-reveal style={{ "--i": 2 } as CSSProperties}>
              We have inspected more than one in five strata schemes in New South Wales, and our reports are built to
              be accurate, practical and genuinely easy to read, with photos owners can follow.
            </p>
            <div data-reveal style={{ "--i": 3 } as CSSProperties} className="flex flex-wrap gap-3 pt-3">
              <ButtonLink href="/about-us/">More about us</ButtonLink>
              <ButtonLink href="/services/" variant="secondary">
                All services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <StatsReveal />
      <TestimonialTrack testimonials={featuredTestimonials} />

      <section aria-labelledby="faq-heading" className="border-b border-line bg-white py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div data-reveal>
            <h2 id="faq-heading" className="text-2xl font-bold sm:text-3xl">
              Questions before you order?
            </h2>
            <p className="mt-3 text-slate-600">Our FAQ pages answer what owners ask us most.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {faqLinks.map((link, i) => (
              <li key={link.href} data-reveal style={{ "--i": i } as CSSProperties}>
                <Link
                  href={link.href}
                  className="group flex min-h-14 items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-3 font-medium text-ink-900 transition-colors hover:border-brand-300"
                >
                  {link.label} FAQs
                  <ArrowRightIcon className="size-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
