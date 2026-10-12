import { describe, expect, it } from "vitest";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";
import { faqPages } from "@/content/faqs";

describe("seo helpers", () => {
  it("builds canonical URLs on the target domain with trailing slashes", () => {
    expect(absoluteUrl("/services/biv/")).toBe("https://www.biv.com.au/services/biv/");
    const meta = pageMetadata({ title: "T", description: "D", path: "/about-us/" });
    expect(meta.alternates?.canonical).toBe("https://www.biv.com.au/about-us/");
    expect(meta.openGraph?.url).toBe("https://www.biv.com.au/about-us/");
  });

  it("marks noIndex pages", () => {
    expect(pageMetadata({ title: "T", description: "D", path: "/x/", noIndex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
  });

  it("builds FAQPage data from the visible questions", () => {
    const data = faqSchema(faqPages.biv.faqs);
    expect(data.mainEntity).toHaveLength(faqPages.biv.faqs.length);
    expect(data.mainEntity[0].name).toBe(faqPages.biv.faqs[0].question);
  });
});
