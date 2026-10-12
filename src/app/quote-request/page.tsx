import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ContactAside } from "@/components/sections/contact-aside";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { turnaround } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote for Your Strata Report",
  description:
    "Request a quote for a building insurance valuation, capital works or sinking fund plan, WHS safety report or asbestos report. Tell us about the property and we'll reply promptly.",
  path: "/quote-request/",
});

export default function QuoteRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us about the job"
        lead="Choose the services you need, add the property details, and we'll prepare a quotation for the property listed."
        crumbs={[{ name: "Request a quote", path: "/quote-request/" }]}
      >
        <p className="mt-4 text-slate-600">{turnaround.text}</p>
      </PageHero>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="mb-8 text-2xl font-bold">Job description</h2>
            <EnquiryForm />
          </div>
          <ContactAside />
        </Container>
      </section>
    </>
  );
}
