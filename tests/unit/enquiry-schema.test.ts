import { describe, expect, it } from "vitest";
import { ENQUIRY_SERVICES, enquirySchema } from "@/lib/enquiry/schema";

const valid = {
  services: [ENQUIRY_SERVICES[0]],
  name: "  Jane   Citizen ",
  phone: "02 9999 0000",
  email: "jane@example.com",
  address: "1 Example Street, Sydney NSW 2000",
  lots: "12",
  instructions: "Line one\r\nLine two",
  preference: "Email back",
};

describe("enquirySchema", () => {
  it("accepts a valid enquiry and normalises whitespace", () => {
    const result = enquirySchema.parse(valid);
    expect(result.name).toBe("Jane Citizen");
    expect(result.instructions).toBe("Line one\nLine two");
    expect(result.strataPlan).toBe("");
  });

  it("requires at least one service from the list", () => {
    expect(enquirySchema.safeParse({ ...valid, services: [] }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, services: ["Something else"] }).success).toBe(false);
  });

  it.each([
    ["email", "not-an-email"],
    ["phone", "abc"],
    ["phone", "123"],
    ["name", " "],
    ["address", "1 St"],
    ["lots", "12a"],
    ["lots", "0"],
    ["preference", "Carrier pigeon"],
  ])("rejects an invalid %s (%s)", (field, value) => {
    const result = enquirySchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].path[0]).toBe(field);
  });

  it("enforces length limits", () => {
    expect(enquirySchema.safeParse({ ...valid, name: "a".repeat(101) }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, instructions: "a".repeat(2001) }).success).toBe(false);
  });

  it("collapses newlines in single-line fields so they cannot inject headers", () => {
    const result = enquirySchema.parse({ ...valid, name: "Jane\r\nBcc: x@example.com" });
    expect(result.name).not.toMatch(/[\r\n]/);
  });
});
