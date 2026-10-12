import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

// Shown after a form submission when JavaScript is unavailable. Not indexed.
export const metadata = pageMetadata({
  title: "Thank You",
  description: "Your request has been sent.",
  path: "/thank-you/",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <Container className="max-w-2xl py-24 text-center sm:py-32">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-700 text-white">
        <CheckIcon className="size-8" />
      </span>
      <h1 className="mt-6 text-4xl font-bold">Thanks, your request is with us</h1>
      <p className="mt-4 text-lg text-slate-700">
        We&apos;ll be in touch using the contact method you chose. If it&apos;s urgent, call us on{" "}
        <a href={site.phone.href} className="font-semibold text-brand-700 underline underline-offset-4">
          {site.phone.display}
        </a>
        .
      </p>
      <ButtonLink href="/" variant="secondary" className="mt-8">
        Back to the home page
      </ButtonLink>
    </Container>
  );
}
