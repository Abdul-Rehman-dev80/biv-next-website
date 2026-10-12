import { ViewTransition, type ReactNode } from "react";
import { serviceDiamond, type ServiceSlug } from "@/content/services";

/**
 * Gives a service's diamond a shared identity across pages, so on navigation
 * the diamond the visitor clicked morphs into the one on the service page.
 * Each name may appear only once per page, so wrap one element per service.
 */
export function ServiceMark({ slug, children }: { slug: ServiceSlug; children: ReactNode }) {
  return (
    <ViewTransition name={`diamond-${serviceDiamond[slug]}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
