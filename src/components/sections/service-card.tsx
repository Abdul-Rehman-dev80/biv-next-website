import type { Service } from "@/content/services";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ServiceIcon } from "./service-icon";
import { ServiceLink } from "./service-link";
import { ServiceMark } from "./service-mark";

/** Whole card is one link; the heading text gives it its accessible name. */
export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ServiceLink
      href={`/services/${service.slug}/`}
      className="group relative flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7"
    >
      <ServiceMark slug={service.slug}>
        <ServiceIcon name={service.icon} className="self-start" />
      </ServiceMark>
      <Heading className="mt-5 text-xl font-semibold">{service.shortName}</Heading>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-600">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Learn more
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </ServiceLink>
  );
}
