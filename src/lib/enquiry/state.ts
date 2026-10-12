import { site } from "@/content/site";
import type { EnquiryInput } from "./schema";

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

/** What the enquiry server action returns to the form. */
export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: EnquiryFieldErrors };

export const GENERIC_ERROR = `Sorry, we couldn't send your request just now. Please try again, or call us on ${site.phone.display}.`;
