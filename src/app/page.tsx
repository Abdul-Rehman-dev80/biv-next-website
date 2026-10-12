import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, CheckIcon, ClockIcon, DocumentIcon, ShieldIcon } from "@/components/ui/icons";
import { faqLinks, site } from "@/content/site";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Valuation Certificates | Strata Insurance Valuations & Reports",
  absoluteTitle: true,
  description:
    "Registered Valuers since 1984 providing building insurance valuations, sinking fund plans, WHS safety reports and asbestos reports for Australian strata schemes.",
  path: "/",
});

const proofPoints = [
  { icon: ShieldIcon, title: "Registered Valuers", text: "Registered since 1984, with $5 million professional indemnity cover." },
  { icon: ClockIcon, title: "Fast turnaround", text: "Most reports delivered within 3 to 7 business days." },
  { icon: DocumentIcon, title: "Easy-to-read reports", text: "Plain-English findings, with photos, that owners can act on." },
];

const featuredTestimonials = [testimonials[0], testimonials[5], testimonials[9]];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_30rem_at_10%_0%,rgb(18_178_148/0.35),transparent),radial-gradient(40rem_30rem_at_100%_100%,rgb(245_192_74/0.14),transparent)]"
        />
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-28">
          <div className="motion-safe:animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-brand-200 ring-1 ring-white/15">
              <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
              Strata property specialists since {site.foundingYear}
            </p>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Insurance valuations and strata reports, <span className="text-brand-300">done properly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Registered Valuers preparing certificates of value, capital works and sinking fund plans, safety
              reports and asbestos reports that help owners corporations stay insured, funded and compliant.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote-request/" size="lg" variant="light">
                Request a quote
              </ButtonLink>
              <ButtonLink
                href="/services/"
                size="lg"
                className="bg-transparent text-white shadow-none ring-1 ring-white/30 ring-inset hover:bg-white/10"
              >
                Explore our services
                <ArrowRightIcon className="size-5" />
              </ButtonLink>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {["Prepared by Registered Valuers", "$5M professional indemnity", "Strata schemes Australia-wide", "We beat any comparable quote"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckIcon className="size-4 shrink-0 text-brand-300" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-800 shadow-2xl ring-1 ring-white/10 lg:aspect-[4/4.4]">
              <Image
                src="/images/strata-apartment-building.jpg"
                alt="Modern multi-storey strata apartment building with balconies and landscaped frontage"
                fill
                priority
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 max-w-64 rounded-2xl bg-white p-5 shadow-lift sm:left-8">
              <p className="text-3xl font-bold text-ink-900">$11bn+</p>
              <p className="mt-1 text-sm leading-snug text-slate-600">of property assessed for insurance in 2014 alone</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-heading" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Four reports every strata scheme relies on"
            lead="Each report is prepared after a site inspection and written so owners, committees and strata managers can understand it and act on it."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-heading" className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              id="about-heading"
              eyebrow="About us"
              title="Four decades of valuing Australian property"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Since {site.foundingYear} we have valued an extraordinary range of property, from due diligence on some of
                the largest transactions in Australia to the smallest suburban cottage. We regularly present expert evidence
                in both Federal and State courts.
              </p>
              <p>
                Strata is where we do our best work. We have inspected more than one in five strata schemes in New South
                Wales, and our reports are built to be accurate, practical and genuinely easy to read.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about-us/" variant="primary">
                More about us
              </ButtonLink>
              <ButtonLink href="/testimonials/" variant="secondary">
                Read client feedback
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-4">
            {proofPoints.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-5 rounded-card border border-line bg-white p-6 shadow-card">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="testimonials-heading" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="testimonials-heading"
              eyebrow="Client feedback"
              title="Trusted by strata managers across the country"
            />
            <Link
              href="/testimonials/"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline"
            >
              All testimonials
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredTestimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="border-y border-line bg-paper py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 id="faq-heading" className="text-2xl font-bold sm:text-3xl">
              Questions before you order?
            </h2>
            <p className="mt-3 text-slate-600">Our FAQ pages answer what owners ask us most.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {faqLinks.map((link) => (
              <li key={link.href}>
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
