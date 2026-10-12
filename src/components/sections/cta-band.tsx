import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhoneIcon } from "@/components/ui/icons";

export function CtaBand({
  title = "Ready for a report you can rely on?",
  text = "Tell us about the property and the reports you need, and we'll come back to you with a quote.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_24rem_at_100%_0%,rgb(79_105_184/0.45),transparent),radial-gradient(30rem_20rem_at_0%_100%,rgb(231_199_51/0.18),transparent)]"
          />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-slate-300">{text}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <ButtonLink href="/quote-request/" variant="light" size="lg">
              Request a quote
            </ButtonLink>
            <a
              href={site.phone.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-white ring-1 ring-white/30 ring-inset transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="size-5" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
