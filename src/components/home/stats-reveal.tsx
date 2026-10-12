import Image from "next/image";
import type { CSSProperties } from "react";
import { Pinned } from "@/components/motion/pinned";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

type Stat = { label: string; text?: string; value?: number; prefix?: string; suffix?: string };

const stats: Stat[] = [
  { text: String(site.foundingYear), label: "Valuing Australian property since" },
  { value: 11, prefix: "$", suffix: "bn+", label: "of property assessed for insurance in 2014 alone" },
  { value: 5, prefix: "$", suffix: "M", label: "professional indemnity cover" },
  { text: "3–7", label: "business days to deliver most reports" },
];

/**
 * Pinned scene: a framed photo opens out to fill the screen, then the key
 * figures rise into place over it.
 */
export function StatsReveal() {
  return (
    <Pinned length={2.6} aria-labelledby="stats-heading" className="bg-white" stageClassName="flex items-center">
      <div
        className="seg absolute inset-0 overflow-hidden bg-ink-950"
        style={
          {
            "--a": 0,
            "--b": 0.45,
            clipPath:
              "inset(calc((1 - var(--t)) * 18%) calc((1 - var(--t)) * 22%) round calc((1 - var(--t)) * 2rem))",
          } as CSSProperties
        }
      >
        <Image
          src="/images/strata-apartment-building.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[30%_35%]"
          style={{ transform: "scale(calc(1.35 - var(--p) * 0.2))" }}
        />
        <div
          className="seg absolute inset-0 bg-ink-950"
          style={{ "--a": 0.3, "--b": 0.55, opacity: "calc(0.15 + var(--t) * 0.7)" } as CSSProperties}
        />
      </div>
      <Container className="relative">
        <div className="seg" style={{ "--a": 0.4, "--b": 0.6, opacity: "var(--t)" } as CSSProperties}>
          <p className="text-sm font-semibold tracking-wide text-gold-400 uppercase">By the numbers</p>
          <h2 id="stats-heading" className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-5xl">
            Strata specialists, trusted for four decades
          </h2>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:mt-16 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const a = 0.5 + i * 0.07;
            return (
              <div
                key={stat.label}
                className="seg flex flex-col border-t border-white/25 pt-5"
                style={
                  { "--a": a, "--b": a + 0.18, opacity: "var(--t)", translate: "0 calc((1 - var(--t)) * 40px)" } as CSSProperties
                }
              >
                <dt className="mt-2 text-sm leading-snug text-slate-200 sm:text-base">{stat.label}</dt>
                <dd className="order-first text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  {stat.value === undefined ? (
                    stat.text
                  ) : (
                    <>
                      <span aria-hidden="true">
                        {stat.prefix}
                        <span className="scrub-num tabular-nums" style={{ "--to": stat.value } as CSSProperties} />
                        {stat.suffix}
                      </span>
                      <span className="sr-only">{`${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`}</span>
                    </>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </Pinned>
  );
}
