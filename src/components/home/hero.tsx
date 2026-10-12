import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

const assurances = [
  "Prepared by Registered Valuers",
  "$5M professional indemnity",
  "Strata schemes Australia-wide",
  "We beat any comparable quote",
];

/**
 * Full-bleed photo hero. As it scrolls away the photo slowly zooms and the copy
 * drifts up and fades (`data-scroll="exit"`), handing over to the next scene.
 */
export function HomeHero() {
  return (
    <section
      data-scroll="exit"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-ink-950"
    >
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{ transform: "scale(calc(1.04 + var(--p) * 0.14)) translate3d(0, calc(var(--p) * 6%), 0)" }}
      >
        <Image
          src="/images/strata-apartment-building.jpg"
          alt="Modern multi-storey strata apartment building with balconies and landscaped frontage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_16_36/0.92)_0%,rgb(10_16_36/0.72)_45%,rgb(10_16_36/0.2)_100%),linear-gradient(0deg,rgb(10_16_36/0.85)_0%,transparent_45%)]"
      />
      <Container
        className="pt-24 pb-14 sm:pb-20 lg:pb-24"
        style={{
          transform: "translate3d(0, calc(var(--p) * -90px), 0)",
          opacity: "calc(1 - var(--p) * 1.6)",
        }}
      >
        <div className="max-w-3xl motion-safe:animate-rise">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-2 rotate-45 bg-diamond-blue" />
              <span className="size-2 rotate-45 bg-diamond-green" />
              <span className="size-2 rotate-45 bg-diamond-yellow" />
              <span className="size-2 rotate-45 bg-diamond-red" />
            </span>
            Valuing Australian property since {site.foundingYear}
          </p>
          <h1 id="hero-heading" className="mt-6 text-4xl font-bold text-white sm:text-6xl lg:text-7xl lg:leading-[1.02]">
            Know what your building is <span className="text-gold-400">really</span> worth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            Building insurance valuations, capital works and sinking fund plans, WHS safety reports and asbestos
            reports for strata and community schemes, prepared by Registered Valuers.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote-request/" size="lg" variant="light">
              Request a quote
            </ButtonLink>
            <ButtonLink href="/services/" size="lg" variant="outline-light">
              Explore our services
              <ArrowRightIcon className="size-5" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckIcon className="size-4 shrink-0 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <p
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs font-medium tracking-[0.3em] text-white/60 uppercase lg:block"
        style={{ opacity: "calc(1 - var(--p) * 4)" }}
      >
        Scroll
      </p>
    </section>
  );
}
