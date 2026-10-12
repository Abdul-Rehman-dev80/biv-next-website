import Link from "next/link";
import { Pinned } from "@/components/motion/pinned";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, QuoteIcon } from "@/components/ui/icons";
import type { Testimonial } from "@/content/testimonials";

/** Pinned scene: client quotes slide past horizontally as the page scrolls down. */
export function TestimonialTrack({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Pinned
      length={1 + testimonials.length * 0.35}
      aria-labelledby="testimonials-heading"
      className="bg-paper"
      stageClassName="flex flex-col justify-center gap-8 sm:gap-12"
    >
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">Client feedback</p>
          <h2 id="testimonials-heading" className="mt-2 max-w-2xl text-3xl font-bold sm:text-5xl">
            Trusted by strata managers across the country
          </h2>
        </div>
        <Link
          href="/testimonials/"
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-700 hover:underline"
        >
          All testimonials
          <ArrowRightIcon className="size-4" />
        </Link>
      </Container>
      <ul className="h-track gap-5 px-4 sm:gap-6 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {testimonials.map(({ quote, name, role, organisation }) => (
          <li key={name} className="w-[82vw] shrink-0 sm:w-[30rem]">
            <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
              <QuoteIcon className="size-8 text-brand-500" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700 sm:text-lg">
                <p>{quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <span className="block font-semibold text-ink-900">{name}</span>
                <span className="block text-sm text-slate-600">{[role, organisation].filter(Boolean).join(", ")}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Pinned>
  );
}
