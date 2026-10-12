import Link from "next/link";
import type { CSSProperties } from "react";
import { diamondPath, DIAMONDS } from "@/components/layout/logo";
import { Pinned } from "@/components/motion/pinned";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { serviceDiamond, type Service } from "@/content/services";
import { DiamondStage } from "./diamond-stage";

const fills = Object.fromEntries(DIAMONDS.map((d) => [d.key, d.fill]));
const slotOf = Object.fromEntries(DIAMONDS.map((d) => [d.key, d]));

/**
 * The BIV mark breaks apart: each diamond flies from the logo cluster to the
 * service it stands for, then that service's card fades in.
 */
export function DiamondScene({ services }: { services: Service[] }) {
  return (
    <Pinned length={3.2} aria-labelledby="services-heading" className="bg-white" stageClassName="flex flex-col">
      <Container className="pt-10 sm:pt-14">
        <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">What we do</p>
        <h2 id="services-heading" className="mt-2 max-w-3xl text-3xl font-bold sm:text-5xl">
          Four diamonds. Four reports every strata scheme relies on.
        </h2>
      </Container>

      <Container className="relative flex flex-1 items-center pb-8">
        <DiamondStage className="seg relative w-full" style={{ "--a": 0.12, "--b": 0.55 } as CSSProperties}>
          {/* The logo cluster the diamonds start from. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 sm:size-56 lg:size-64"
          >
            {DIAMONDS.map((d) => (
              <span
                key={d.key}
                data-diamond-slot={d.key}
                className="absolute size-[44%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${d.cx}%`, top: `${d.cy}%` }}
              />
            ))}
          </div>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {services.map((service, i) => {
              const key = serviceDiamond[service.slug];
              const start = 0.5 + i * 0.07;
              return (
                <li key={service.slug} className="relative">
                  <div data-diamond-home={key} className="size-14 sm:size-20">
                    <svg
                      viewBox={`${slotOf[key].cx - 22} ${slotOf[key].cy - 22} 44 44`}
                      aria-hidden="true"
                      className="size-full will-change-transform"
                      style={{
                        transform:
                          "translate3d(calc((1 - var(--t)) * var(--dx, 0px)), calc((1 - var(--t)) * var(--dy, 0px)), 0) scale(calc(var(--ds, 1) + (1 - var(--ds, 1)) * var(--t)))",
                      }}
                    >
                      <path d={diamondPath(slotOf[key].cx, slotOf[key].cy)} fill={fills[key]} />
                    </svg>
                  </div>
                  <div
                    className="seg opacity-(--t) transition-opacity focus-within:opacity-100!"
                    style={{ "--a": start, "--b": start + 0.2, translate: "0 calc((1 - var(--t)) * 24px)" } as CSSProperties}
                  >
                    <h3 className="mt-4 text-lg font-semibold sm:text-xl">
                      <Link
                        href={`/services/${service.slug}/`}
                        className="after:absolute after:inset-0 after:content-[''] hover:text-brand-700"
                      >
                        {service.shortName}
                      </Link>
                    </h3>
                    <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-slate-600 sm:block">{service.summary}</p>
                    <span
                      aria-hidden="true"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                    >
                      Learn more
                      <ArrowRightIcon className="size-4" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </DiamondStage>
      </Container>
    </Pinned>
  );
}
