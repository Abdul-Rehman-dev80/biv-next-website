import "server-only";
import { site } from "@/content/site";
import type { SendEnquiry } from "./mailer";
import type { RateLimiter } from "./rate-limit";
import { GENERIC_ERROR, type EnquiryFieldErrors, type EnquiryState } from "./state";
import { HONEYPOT_FIELD, STARTED_AT_FIELD, enquirySchema, type EnquiryInput } from "./schema";

export type { EnquiryFieldErrors, EnquiryState } from "./state";


/** Anything faster than this from first interaction to submit is treated as a bot. */
export const MIN_FILL_MS = 3000;
const MAX_FIELD_CHARS = 5000;

type Deps = {
  clientKey: string;
  now: number;
  rateLimit: RateLimiter;
  send: SendEnquiry;
};

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.slice(0, MAX_FIELD_CHARS) : "");

/** Validates and sends an enquiry. Pure apart from the injected dependencies, so it is unit-tested directly. */
export async function processEnquiry(form: FormData, { clientKey, now, rateLimit, send }: Deps): Promise<EnquiryState> {
  // Honeypot: real visitors never see this field. Report success so bots move on.
  if (text(form.get(HONEYPOT_FIELD)).trim() !== "") return { status: "success" };

  const startedAt = Number(text(form.get(STARTED_AT_FIELD)));
  if (startedAt > 0 && now - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "Please take a moment to check your details, then send again." };
  }

  if (!(await rateLimit(clientKey, now))) {
    return {
      status: "error",
      message: `Too many requests. Please wait a few minutes, or call us on ${site.phone.display}.`,
    };
  }

  const parsed = enquirySchema.safeParse({
    services: form.getAll("services").map(text).slice(0, 20),
    name: text(form.get("name")),
    phone: text(form.get("phone")),
    email: text(form.get("email")),
    address: text(form.get("address")),
    lots: text(form.get("lots")),
    instructions: text(form.get("instructions")),
    strataPlan: text(form.get("strataPlan")),
    managerName: text(form.get("managerName")),
    managerCompany: text(form.get("managerCompany")),
    preference: text(form.get("preference")) || undefined,
  });

  if (!parsed.success) {
    const errors: EnquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof EnquiryInput | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", errors };
  }

  return (await send(parsed.data)) ? { status: "success" } : { status: "error", message: GENERIC_ERROR };
}
