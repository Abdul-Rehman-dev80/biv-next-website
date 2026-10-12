import Link from "next/link";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { faqPages } from "@/content/faqs";
import { getService, type ServiceSlug } from "@/content/services";
import { faqLinks } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";

export function faqPageMetadata(slug: ServiceSlug) {
  const page = faqPages[slug];
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });
}

export function FaqPageView({ slug }: { slug: ServiceSlug }) {
  const page = faqPages[slug];
  const service = getService(slug)!;
  const otherFaqs = faqLinks.filter((l) => l.href !== page.path);

  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title={page.title}
        lead={page.lead}
        crumbs={[{ name: `${service.name} FAQ`, path: page.path }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <FaqList faqs={page.faqs} />
          <aside data-reveal-children className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Related pages">
            <Link
              href={`/services/${slug}/`}
              className="group block rounded-card bg-ink-900 p-6 text-slate-300 transition-colors hover:bg-ink-800"
            >
              <span className="text-sm font-semibold tracking-wide text-brand-300 uppercase">The service</span>
              <span className="mt-2 block text-lg font-semibold text-white">{service.name}</span>
              <span className="mt-2 block text-sm leading-relaxed">{service.summary}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                View the service
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <nav aria-label="Other FAQs" className="rounded-card border border-line bg-white p-6">
              <h2 className="text-base font-semibold">Other FAQs</h2>
              <ul className="mt-3 space-y-1">
                {otherFaqs.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-10 items-center text-sm text-slate-700 hover:text-brand-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </section>
      <CtaBand title="Still have a question?" text="Call us or send a quote request, and a member of our team will get back to you." />
      <JsonLd data={faqSchema(page.faqs)} />
    </>
  );
}
