import "server-only";
import nodemailer from "nodemailer";
import type { Enquiry } from "./schema";

export type SendEnquiry = (enquiry: Enquiry) => Promise<boolean>;

/** Plain-text email body. Values are already validated and normalised by the schema. */
export function formatEnquiryEmail(e: Enquiry): { subject: string; text: string } {
  const dash = (v: string) => (v === "" ? "-" : v);
  const text = [
    "New enquiry from biv.com.au",
    "",
    "Services:",
    ...e.services.map((s) => `  - ${s}`),
    "",
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email}`,
    `Property address: ${e.address}`,
    `Number of lots: ${dash(e.lots)}`,
    `Preferred reply: ${e.preference}`,
    "",
    `Strata plan no: ${dash(e.strataPlan)}`,
    `Strata manager: ${dash(e.managerName)}`,
    `Strata management company: ${dash(e.managerCompany)}`,
    "",
    "Special instructions:",
    dash(e.instructions),
  ].join("\n");
  return { subject: `Quote request: ${e.address.slice(0, 80)}`, text };
}

/**
 * Sends enquiries over SMTP using the credentials in the environment
 * (see .env.example). If anything is missing, sending fails and the visitor
 * is told so; it never reports success without delivering.
 */
export function createMailer(env: NodeJS.ProcessEnv = process.env): SendEnquiry {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TLS, ENQUIRY_TO, ENQUIRY_FROM } = env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO || !ENQUIRY_FROM) {
    return async () => {
      console.error("enquiry: SMTP is not configured; see .env.example");
      return false;
    };
  }

  const port = Number(SMTP_PORT) || 465;
  // "implicit" (port 465) or "starttls" (587). "none" exists only for the local test mail sink.
  const tls = SMTP_TLS === "none" || SMTP_TLS === "starttls" || SMTP_TLS === "implicit" ? SMTP_TLS : port === 465 ? "implicit" : "starttls";
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: tls === "implicit",
    requireTLS: tls === "starttls",
    ignoreTLS: tls === "none",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return async (enquiry) => {
    const { subject, text } = formatEnquiryEmail(enquiry);
    try {
      await transport.sendMail({
        from: { name: "BIV Reports website", address: ENQUIRY_FROM },
        to: ENQUIRY_TO,
        replyTo: { name: enquiry.name, address: enquiry.email },
        subject,
        text,
      });
      return true;
    } catch (error) {
      // Log the failure type only; never the enquiry contents.
      console.error("enquiry: SMTP send failed:", error instanceof Error ? error.name : "unknown error");
      return false;
    }
  };
}
