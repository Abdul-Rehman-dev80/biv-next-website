import Image from "next/image";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Our Registered Valuers",
  description:
    "Valuing Australian property since 1983. Meet the independent Registered Valuers, asbestos and WHS specialists behind our strata insurance valuations and compliance reports.",
  path: "/about-us/",
});

const values = [
  {
    title: "Innovative",
    text: "Our long and unusual breadth of experience gives us a strong, original foundation for solving the challenges the property industry faces today. We deliver creative, relevant results, stay accountable throughout and take responsibility for the outcome.",
  },
  {
    title: "Vigilant",
    text: "Every week we review court decisions on negligence, work health and safety, asbestos and related topics, along with legislative changes that affect property. We follow proposed reforms closely, and have instigated some of them.",
  },
  {
    title: "Professional",
    text: "We have been Registered Valuers since 1984, are licensed real estate agents, and are qualified asbestos and work health and safety specialists. Our directors sit on government and industry committees advising on strata and other property matters, and we abide by our institutes' codes of professional conduct and ethics.",
  },
  {
    title: "Independent",
    text: "Our job is to give independent professional advice. We have no ties to maintenance companies, and neither our recommendations nor our work depend on referrals to them. Think of us as independent auditors who make practical recommendations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Valuing Australian property since ${site.foundingYear}`}
        lead="Independent Registered Valuers and safety specialists who know strata property inside out, and who write reports people can actually read."
        crumbs={[{ name: "About us", path: "/about-us/" }]}
      />

      <section aria-labelledby="history-heading" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading id="history-heading" eyebrow="Our history" title="Forty years of experience, from cottages to landmark deals" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Since {site.foundingYear} we have valued a remarkably wide variety of property, from due diligence on some of
                the largest property transactions in Australia to the smallest suburban cottage.
              </p>
              <p>
                We are experienced expert witnesses in both the Federal and State court systems, and strata property is our
                particular strength: we have inspected a substantial share of the strata schemes in New South Wales.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-800 shadow-lift">
            <Image
              src="/images/strata-apartment-building.jpg"
              alt="Contemporary strata apartment complex with glass balconies and street-front landscaping"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading id="values-heading" eyebrow="Our values" title="How we work" align="center" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="rounded-card border border-line bg-white p-7 shadow-card">
                <span className="text-sm font-bold text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-700">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Vision and mission" className="py-16 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-ink-900 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white">Our vision</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              That our clients hold the most accurate and practical property reports available, in a format that is easy to
              read, backed by thoroughly researched advice that is simply the best on the market.
            </p>
          </div>
          <div className="rounded-card bg-brand-700 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-50">
              It starts with our clients: making their work easier and more enjoyable, and working alongside them to reach a
              positive, rewarding outcome.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
