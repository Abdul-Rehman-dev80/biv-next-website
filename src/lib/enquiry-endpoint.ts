/**
 * Where the enquiry form posts. Defaults to the PHP handler shipped in
 * public/api/ for cPanel hosting; override at build time if the form is served
 * by another backend.
 */
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry.php";
