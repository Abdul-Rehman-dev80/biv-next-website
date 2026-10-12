import { z } from "zod";

// Zod otherwise probes for eval support, which the Content-Security-Policy blocks.
z.config({ jitless: true });

/**
 * Enquiry form contract, shared by the browser (instant feedback) and the
 * server action (authoritative validation, since client checks can be bypassed).
 */
export const ENQUIRY_SERVICES = [
  "Building Insurance Valuation (Aust. wide)",
  "External Combustible Cladding Clearance Certificates",
  "10 Year Capital Works Fund Plan (NSW)",
  "WHS (Safety) Report (NSW, QLD, SA, ACT, WA)",
  "10 Year Sinking Fund Plan (ACT, QLD, SA)",
  "OHS (Safety) Report (VIC)",
  "10 Year Reserve Plan (WA)",
  "Common Property Life Cycle Maintenance Report",
  "10 Year Maintenance Fund Plan (VIC)",
  "Asbestos Report (Register + Management Plan)",
] as const;

export const CONTACT_PREFERENCES = ["Call back", "Email back"] as const;

export const LIMITS = {
  name: 100,
  phone: 30,
  email: 254,
  address: 200,
  lots: 6,
  instructions: 2000,
  shortText: 100,
} as const;

/** Collapses runs of whitespace and trims, so "  a   b " becomes "a b". */
const singleLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const optionalLine = (max: number) => singleLine(max).optional().default("");

export const enquirySchema = z.object({
  services: z
    .array(z.enum(ENQUIRY_SERVICES))
    .min(1, "Please choose at least one service.")
    .max(ENQUIRY_SERVICES.length),
  name: singleLine(LIMITS.name).pipe(z.string().min(2, "Please enter your name.")),
  phone: singleLine(LIMITS.phone).pipe(
    z
      .string()
      .min(1, "Please enter a phone number.")
      .regex(/^\+?[0-9 ()-]{8,}$/, "Please enter a valid phone number."),
  ),
  email: singleLine(LIMITS.email).pipe(z.email("Please enter a valid email address.")),
  address: singleLine(LIMITS.address).pipe(z.string().min(5, "Please enter the property address.")),
  lots: singleLine(LIMITS.lots).pipe(
    z
      .string()
      .regex(/^\d*$/, "Please enter a whole number.")
      .refine((v) => v === "" || Number(v) > 0, "Please enter a whole number above zero."),
  ),
  instructions: z
    .string()
    .transform((v) => v.replace(/\r\n?/g, "\n").trim())
    .pipe(z.string().max(LIMITS.instructions, `Please keep this under ${LIMITS.instructions} characters.`))
    .optional()
    .default(""),
  strataPlan: optionalLine(LIMITS.shortText),
  managerName: optionalLine(LIMITS.shortText),
  managerCompany: optionalLine(LIMITS.shortText),
  preference: z.enum(CONTACT_PREFERENCES, "Please choose how we should reply."),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Names of the anti-spam fields the server checks. */
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";
