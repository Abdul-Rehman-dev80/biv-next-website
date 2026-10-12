import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Header band for inner pages: breadcrumbs, eyebrow, H1 and lead paragraph. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgb(18_178_148/0.16),transparent),radial-gradient(40rem_20rem_at_0%_120%,rgb(245_192_74/0.12),transparent)]"
      />
      <Container className="py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl motion-safe:animate-rise">
          {eyebrow && <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 text-lg leading-relaxed text-slate-700 sm:text-xl">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
