import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { Container } from "@/components/ui/container";
import { turnaround, services } from "@/content/services";
import { servicesTestimonial } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Strata Reports & Valuation Services",
  description:
    "Building insurance valuations, capital works and sinking fund plans, WHS safety reports and asbestos registers for strata and community schemes, all from one team of Registered Valuers.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Every report your strata scheme needs, from one specialist team"
        lead="We inspect, assess and report on strata, community and stand-alone properties throughout Australia. Order one report or several, and we'll coordinate the inspections."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />
      <section aria-label="Services" className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} headingLevel={2} />
            ))}
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{turnaround.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">{turnaround.text}</p>
            </div>
            <TestimonialCard testimonial={servicesTestimonial} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
