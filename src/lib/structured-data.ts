import { site } from "@/content/site";
import type { Faq } from "@/content/faqs";
import { absoluteUrl } from "./seo";

/**
 * Schema.org builders. Only facts published on the site are included: no
 * ratings, reviews or addresses, since none are verified for this domain.
 */
const organizationId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/og-image.jpg"),
    description: site.description,
    telephone: site.phone.e164,
    foundingDate: String(site.foundingYear),
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: "en-AU",
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [...faq.answer, ...(faq.list ?? [])].join(" "),
      },
    })),
  };
}
