import type { CSSProperties } from "react";
import { Pinned } from "@/components/motion/pinned";
import { Container } from "@/components/ui/container";
import { IsoBuilding } from "./iso-building";

const steps = [
  {
    title: "We inspect the property",
    text: "A site visit to every building and ancillary improvement, photographing each one and its surrounds.",
  },
  {
    title: "We measure what it would take to rebuild",
    text: "The type and quantity of materials, the standard of finishes, access and location all go into the cost.",
  },
  {
    title: "A Registered Valuer certifies it",
    text: "Demolition, professional and council fees, escalation and GST are itemised, as the legislation requires.",
  },
  {
    title: "Your report arrives in days",
    text: "Most reports are delivered within 3 to 7 business days, as a PDF and in print.",
  },
];

/**
 * Pinned scene: an exploded building assembles floor by floor while the
 * valuation steps light up one at a time beside it.
 */
export function BuildingScene() {
  return (
    <Pinned
      length={3.4}
      aria-labelledby="process-heading"
      className="bg-ink-950 text-white"
      stageClassName="flex items-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(50rem_30rem_at_75%_40%,rgb(79_105_184/0.35),transparent),radial-gradient(30rem_20rem_at_10%_100%,rgb(231_199_51/0.12),transparent)]"
      />
      <Container className="relative grid h-full items-center gap-6 py-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold tracking-wide text-gold-400 uppercase">How a valuation comes together</p>
          <h2 id="process-heading" className="mt-2 text-2xl font-bold text-white sm:text-4xl">
            From site inspection to certificate of value
          </h2>
          <ol className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
            {steps.map((step, i) => {
              const a = 0.15 + i * 0.18;
              return (
                <li
                  key={step.title}
                  className="seg flex gap-4"
                  style={{ "--a": a, "--b": a + 0.12, opacity: "calc(0.3 + var(--t) * 0.7)" } as CSSProperties}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1 ring-white/30"
                    style={{
                      background: "rgb(231 199 51 / var(--t))",
                      color: "color-mix(in srgb, #0a1024 calc(var(--t) * 100%), #fff)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white sm:text-lg">{step.title}</h3>
                    <p className="mt-1 hidden text-slate-300 sm:block">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="seg order-1 lg:order-2" style={{ "--a": 0.05, "--b": 0.8 } as CSSProperties}>
          <IsoBuilding className="mx-auto h-[34svh] w-auto max-w-full sm:h-[44svh] lg:h-[72svh]" />
        </div>
      </Container>
    </Pinned>
  );
}
