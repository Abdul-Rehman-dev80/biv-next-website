"use server";

import { headers } from "next/headers";
import { createMailer } from "@/lib/enquiry/mailer";
import { processEnquiry, type EnquiryState } from "@/lib/enquiry/process";
import { createFileRateLimiter } from "@/lib/enquiry/rate-limit";

// Five enquiries per address per 10 minutes; override with ENQUIRY_RATE_LIMIT_MAX.
const rateLimit = createFileRateLimiter({
  limit: Number(process.env.ENQUIRY_RATE_LIMIT_MAX) || 5,
  windowMs: 10 * 60 * 1000,
});
const send = createMailer();

/**
 * The client address as seen by the reverse proxy in front of Node (Apache on
 * cPanel). The proxy appends the real address to X-Forwarded-For, so the last
 * entry is the trustworthy one; earlier entries can be forged by the client.
 */
async function clientKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

// Next.js rejects Server Action requests whose Origin does not match the host,
// which provides the CSRF protection for this form.
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  return processEnquiry(form, { clientKey: await clientKey(), now: Date.now(), rateLimit, send });
}
