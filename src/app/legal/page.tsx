import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Legal, Disclaimer and Privacy",
  description: `Website disclaimer, privacy statement and external links policy for ${site.name}, operated by ${site.legalName}.`,
  path: "/legal/",
});

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer and privacy"
        lead={`How ${site.legalName} provides this website, and how we handle the information you give us.`}
        crumbs={[{ name: "Legal", path: "/legal/" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose-site">
            <h2 id="disclaimer" className="mt-0">Disclaimer</h2>
            <p>
              The information on this website is general information only. It is provided by {site.legalName}, and while we
              work to keep it current and correct, we make no representations or warranties of any kind, express or implied,
              about the completeness, accuracy, reliability, suitability or availability of the website or the information,
              products, services or related graphics on it, for any purpose. Any reliance you place on that information is
              strictly at your own risk.
            </p>
            <p>
              We make every effort to keep the website running smoothly. However, we take no responsibility for, and will not
              be liable for, the website being temporarily unavailable because of technical issues beyond our control.
            </p>

            <h2 id="privacy">Privacy</h2>
            <p>
              This statement explains how {site.legalName} uses and protects any information you give us when you use this
              website. We are committed to protecting your privacy. If we ask for information that identifies you, it will
              only be used in line with this statement.
            </p>
            <p>
              When you send an enquiry or quote request, we use the details you provide (such as your name, phone number,
              email address and the property address) only to respond to your enquiry and to prepare and deliver the services
              you ask for. This website does not use analytics, advertising or tracking cookies.
            </p>
            <p>
              We may update this statement from time to time by changing this page, so please check it occasionally to make
              sure you are happy with any changes.
            </p>

            <h2 id="links">Links to other websites</h2>
            <p>
              This website may link to other websites that are not under our control, and we have no control over their
              nature, content or availability. Including a link does not necessarily imply a recommendation or endorse the
              views expressed on that site.
            </p>
            <p>
              Once you leave our website through such a link, we cannot be responsible for the protection and privacy of any
              information you provide, and those sites are not covered by this privacy statement. Please take care and read
              the privacy statement that applies to the website in question.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
