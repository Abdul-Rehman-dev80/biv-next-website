import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import { createMailer, formatEnquiryEmail } from "@/lib/enquiry/mailer";
import { MIN_FILL_MS, processEnquiry } from "@/lib/enquiry/process";
import { createFileRateLimiter } from "@/lib/enquiry/rate-limit";
import { ENQUIRY_SERVICES, enquirySchema } from "@/lib/enquiry/schema";

const NOW = 1_800_000_000_000;

function formData(overrides: Record<string, string | string[]> = {}) {
  const values: Record<string, string | string[]> = {
    services: [ENQUIRY_SERVICES[0], ENQUIRY_SERVICES[3]],
    name: "Jane Citizen",
    phone: "02 9999 0000",
    email: "jane@example.com",
    address: "1 Example Street, Sydney NSW 2000",
    lots: "12",
    instructions: "Please call first.",
    preference: "Call back",
    website: "",
    startedAt: String(NOW - 60_000),
    ...overrides,
  };
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) for (const item of [v].flat()) fd.append(k, item);
  return fd;
}

const allow = async () => true;

describe("processEnquiry", () => {
  it("sends a valid enquiry and reports success", async () => {
    const send = vi.fn<(enquiry: unknown) => Promise<boolean>>(async () => true);
    const result = await processEnquiry(formData(), { clientKey: "1.2.3.4", now: NOW, rateLimit: allow, send });
    expect(result).toEqual({ status: "success" });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0]).toMatchObject({ name: "Jane Citizen", services: [ENQUIRY_SERVICES[0], ENQUIRY_SERVICES[3]] });
  });

  it("reports failure honestly when the email cannot be sent", async () => {
    const result = await processEnquiry(formData(), { clientKey: "k", now: NOW, rateLimit: allow, send: async () => false });
    expect(result.status).toBe("error");
  });

  it("returns field errors and sends nothing for invalid input", async () => {
    const send = vi.fn(async () => true);
    const result = await processEnquiry(formData({ email: "nope", services: ["Free money"], preference: "" }), {
      clientKey: "k",
      now: NOW,
      rateLimit: allow,
      send,
    });
    expect(result.status).toBe("error");
    if (result.status === "error") expect(Object.keys(result.errors ?? {}).sort()).toEqual(["email", "preference", "services"]);
    expect(send).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const send = vi.fn(async () => true);
    const result = await processEnquiry(formData({ website: "http://spam.example" }), { clientKey: "k", now: NOW, rateLimit: allow, send });
    expect(result).toEqual({ status: "success" });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects submissions made too quickly", async () => {
    const send = vi.fn(async () => true);
    const result = await processEnquiry(formData({ startedAt: String(NOW - MIN_FILL_MS + 500) }), {
      clientKey: "k",
      now: NOW,
      rateLimit: allow,
      send,
    });
    expect(result.status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });

  it("stops when the rate limit is exceeded", async () => {
    const send = vi.fn(async () => true);
    const result = await processEnquiry(formData(), { clientKey: "k", now: NOW, rateLimit: async () => false, send });
    expect(result.status).toBe("error");
    expect(send).not.toHaveBeenCalled();
  });
});

describe("createFileRateLimiter", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "vc-rl-test-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  it("allows up to the limit per key within the window, then resets", async () => {
    const limiter = createFileRateLimiter({ limit: 2, windowMs: 1000, dir });
    expect(await limiter("a", 0)).toBe(true);
    expect(await limiter("a", 10)).toBe(true);
    expect(await limiter("a", 20)).toBe(false);
    expect(await limiter("b", 20)).toBe(true);
    expect(await limiter("a", 1500)).toBe(true);
  });
});

describe("mailer", () => {
  it("formats a plain-text email with every field", () => {
    const enquiry = enquirySchema.parse({
      services: [ENQUIRY_SERVICES[0]],
      name: "Jane",
      phone: "02 9999 0000",
      email: "jane@example.com",
      address: "1 Example Street, Sydney",
      lots: "",
      preference: "Email back",
    });
    const { subject, text } = formatEnquiryEmail(enquiry);
    expect(subject).toBe("Quote request: 1 Example Street, Sydney");
    expect(text).toContain("Number of lots: -");
    expect(text).toContain(`  - ${ENQUIRY_SERVICES[0]}`);
  });

  it("refuses to pretend success when SMTP is not configured", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const send = createMailer({ NODE_ENV: "production" } as NodeJS.ProcessEnv);
    expect(await send({} as never)).toBe(false);
    error.mockRestore();
  });
});
