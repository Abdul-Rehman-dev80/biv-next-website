import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceIcon } from "@/components/sections/service-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "@/components/ui/icons";
import { getService, services, turnaround } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

// Only the four known services exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}/`;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.headline}
        lead={service.lead}
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: service.name, path },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/quote-request/" size="lg">
            Request a quote
          </ButtonLink>
          <ButtonLink href={service.faqHref} size="lg" variant="secondary">
            Read the FAQs
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <article className="prose-site min-w-0">
            <div className="not-prose rounded-card border border-brand-200 bg-brand-50/60 p-6 sm:p-8">
              <h2 className="mt-0 text-2xl font-semibold">{service.why.heading}</h2>
              {service.why.paragraphs?.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-slate-700">
                  {p}
                </p>
              ))}
            </div>

            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} rel="noopener noreferrer" target="_blank">
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section>
              <h2>{service.process.heading}</h2>
              <p>{service.process.intro}</p>
              <ol className="not-prose mt-6 list-none space-y-4 pl-0">
                {service.process.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 leading-relaxed text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>Further services</h2>
              <p>
                Alongside this report we also prepare{" "}
                {others.map((s, i) => (
                  <span key={s.slug}>
                    <Link href={`/services/${s.slug}/`}>{s.shortName.toLowerCase()}</Link>
                    {i < others.length - 2 ? ", " : i === others.length - 2 ? " and " : ""}
                  </span>
                ))}
                , as well as common property repair and maintenance reports.
              </p>
            </section>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Service summary">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <ServiceIcon name={service.icon} />
              <h2 className="mt-4 text-lg font-semibold">At a glance</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {service.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-ink-900 p-6 text-slate-300">
              <ClockIcon className="size-6 text-brand-300" />
              <h2 className="mt-3 text-lg font-semibold text-white">{turnaround.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed">{turnaround.text}</p>
              <ButtonLink href="/quote-request/" variant="light" className="mt-5 w-full">
                Request a quote
              </ButtonLink>
            </div>
            <Link
              href={service.faqHref}
              className="group flex items-center justify-between gap-3 rounded-card border border-line bg-white p-5 font-semibold text-ink-900 hover:border-brand-300"
            >
              {service.faqLabel}
              <ArrowRightIcon className="size-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1" />
            </Link>
          </aside>
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={serviceSchema({ name: service.name, description: service.metaDescription, path })} />
    </>
  );
}
