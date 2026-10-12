import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client Testimonials from Strata Managers",
  description:
    "What strata managers, real estate agents and owners corporation secretaries say about our insurance valuations, sinking fund plans and compliance reports.",
  path: "/testimonials/",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="In our clients' words"
        lead="Feedback from strata managers, agents and owners who rely on our valuations and reports, from Sydney to the Far South Coast and regional New South Wales."
        crumbs={[{ name: "Testimonials", path: "/testimonials/" }]}
      />
      <section aria-label="Testimonials" className="py-16 sm:py-24">
        <Container>
          <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
            {testimonials.map((t) => (
              <TestimonialCard key={`${t.name}-${t.organisation}`} testimonial={t} className="mb-5 h-auto break-inside-avoid" />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Join the strata managers who rely on us" />
    </>
  );
}
