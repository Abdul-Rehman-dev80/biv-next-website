import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. Home is added automatically. */
export function Breadcrumbs({ items, inverted = false }: { items: Crumb[]; inverted?: boolean }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${inverted ? "text-slate-300" : "text-slate-600"}`}>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={`font-medium ${inverted ? "text-white" : "text-ink-900"}`}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className={`rounded hover:underline ${inverted ? "hover:text-white" : "hover:text-brand-700"}`}>
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true" className={inverted ? "text-slate-500" : "text-slate-400"}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
