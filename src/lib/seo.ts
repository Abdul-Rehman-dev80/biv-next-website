import type { Metadata } from "next";
import { site } from "@/content/site";

/** Absolute URL on the production domain for a site path such as "/about-us/". */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Pages such as the thank-you page should not be indexed. */
  noIndex?: boolean;
  /** Use the title as-is instead of applying the "| Valuation Certificates" template. */
  absoluteTitle?: boolean;
};

/** Per-page metadata with a self-referencing canonical and matching social tags. */
export function pageMetadata({ title, description, path, noIndex, absoluteTitle }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title: socialTitle,
      description,
      images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
