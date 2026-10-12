import type { CSSProperties, ReactNode } from "react";
import { DIAMONDS, diamondPath } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** How far each diamond drifts (in % of its own size) as the hero scrolls away. */
const drift: Record<string, [number, number]> = {
  blue: [0, -60],
  green: [-60, 0],
  yellow: [60, 0],
  red: [0, 60],
};

/**
 * Header band for inner pages: breadcrumbs, eyebrow, H1 and lead paragraph,
 * with the BIV diamonds drifting apart as the page scrolls. An optional
 * `mark` (a service's diamond) sits above the text, outside the entrance
 * animation so a view transition can land it in place.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  mark,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  mark?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section data-scroll="exit" className="relative isolate overflow-hidden bg-ink-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_28rem_at_85%_0%,rgb(79_105_184/0.45),transparent),radial-gradient(36rem_20rem_at_0%_120%,rgb(231_199_51/0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[4%] -z-10 hidden size-[26rem] -translate-y-1/2 xl:block"
      >
        {DIAMONDS.map((d) => (
          <svg
            key={d.key}
            viewBox={`${d.cx - 22} ${d.cy - 22} 44 44`}
            className="absolute size-[44%]"
            style={
              {
                left: `${d.cx}%`,
                top: `${d.cy}%`,
                translate: `calc(-50% + var(--p) * ${drift[d.key][0]}%) calc(-50% + var(--p) * ${drift[d.key][1]}%)`,
              } as CSSProperties
            }
          >
            <path d={diamondPath(d.cx, d.cy)} fill={d.fill} opacity="0.9" />
          </svg>
        ))}
      </div>
      <Container className="py-12 sm:py-16 lg:py-24">
        <Breadcrumbs items={crumbs} inverted />
        {mark && <div className="mt-8">{mark}</div>}
        <div className={cn("max-w-3xl motion-safe:animate-rise", mark ? "mt-5" : "mt-8")}>
          {eyebrow && <p className="text-sm font-semibold tracking-wide text-gold-400 uppercase">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-5 text-lg leading-relaxed text-slate-300 sm:text-xl">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
