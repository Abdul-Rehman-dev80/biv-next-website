import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ContactAside } from "@/components/sections/contact-aside";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Contact Us on ${site.phone.display}`,
  description: `Call ${site.phone.display} or send us a message about insurance valuations, sinking fund plans, WHS or asbestos reports for your strata property.`,
  path: "/contact-us/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk to a Registered Valuer"
        lead={`Send us a message using the form below, call ${site.phone.display}, or email ${site.email}.`}
        crumbs={[{ name: "Contact us", path: "/contact-us/" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="mb-8 text-2xl font-bold">Send us a message</h2>
            <EnquiryForm />
          </div>
          <ContactAside />
        </Container>
      </section>
    </>
  );
}
