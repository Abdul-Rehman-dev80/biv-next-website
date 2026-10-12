# Valuation Certificates website

Marketing site for **valuationcertificates.com.au**: building insurance valuations, capital works and sinking fund plans, WHS safety reports and asbestos reports for strata schemes, provided by BIV Reports Pty Limited.

The site keeps every URL of the client's existing site (biv.com.au) and its business facts, with a new brand, freshly written copy and a modern build.

## Stack

- Next.js 16 (App Router, Server Components) with TypeScript in strict mode
- Tailwind CSS 4, with design tokens in `src/app/globals.css`
- React Hook Form and Zod for the enquiry form; a Server Action validates again on the server and sends email with Nodemailer over SMTP
- Vitest for unit tests and Playwright (with axe-core) for end-to-end tests
- Runs as a Node.js app on cPanel ("Setup Node.js App"), started by `server.js`

## Routes

All indexable pages are prerendered at build time. URLs match the existing site exactly, including the trailing slash.

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about-us/` | About us |
| `/services/` | Services overview |
| `/services/biv/` | Building Insurance Valuation |
| `/services/sfp/` | Capital Works or Sinking Fund Plan |
| `/services/whs/` | Work Health and Safety |
| `/services/asb/` | Asbestos Report |
| `/testimonials/` | Testimonials |
| `/building-insurance-valuation/` | FAQ: building insurance valuation |
| `/sinking-fund-plans/` | FAQ: capital works and sinking fund plans |
| `/work-health-and-safety/` | FAQ: work health and safety |
| `/asbestos-reports/` | FAQ: asbestos reports |
| `/contact-us/` | Contact us (with enquiry form) |
| `/quote-request/` | Request a quote (with enquiry form) |
| `/legal/` | Disclaimer, privacy and links |

Also generated: `/sitemap.xml`, `/robots.txt`, favicon and Apple touch icon, and a custom 404 page. Old WordPress URLs (`/wp-sitemap.xml`, `/feed/`) redirect permanently.

## Project layout

```
src/
  app/              routes, layout, sitemap, robots, error and 404 pages
  app/actions/      the enquiry Server Action
  components/       layout (header, nav, footer), sections, form and UI primitives
  content/          all copy and business details (site.ts, services.ts, faqs.ts, testimonials.ts)
  lib/              SEO and structured-data helpers; lib/enquiry/ holds validation, rate limiting and email
server.js           production entry point for cPanel/Passenger
tests/unit/         Vitest tests (schema, enquiry processing, SEO helpers)
tests/e2e/          Playwright tests and a local SMTP sink
```

To change wording, phone number, email or services, edit the files in `src/content/`; components don't hard-code business details.

## Local development

Requires Node.js 20.9 or later (22 LTS recommended).

```bash
npm install
cp .env.example .env.local   # add SMTP details to test real email
npm run dev                  # http://localhost:3000
```

Without SMTP settings the site works, but form submissions show an error rather than pretending to succeed.

## Checks and tests

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test            # Vitest unit tests
npm run build       # production build
npm run test:e2e    # Playwright, against the production build (run `npm run build` first)
npm run check       # lint + typecheck + unit tests + build
```

The end-to-end suite starts `server.js` and a small local SMTP sink, then checks every route (status, single H1, canonical URL, Open Graph URL, valid JSON-LD, no other domain in metadata, no horizontal overflow, no failed requests or console errors), unique titles and descriptions, WCAG 2.2 AA rules with axe, keyboard skip link, desktop dropdowns, the mobile menu, the 404 page, FAQ accordions, and the enquiry form (client validation, real email delivery, server rejection, network failure, and submission with JavaScript disabled). It runs on a desktop and a mobile viewport. Playwright needs Chromium: `npx playwright install chromium` if it isn't installed.

## Enquiry form and email

Both forms post to the `submitEnquiry` Server Action (`src/app/actions/enquiry.ts`), which:

- validates every field with the shared Zod schema (`src/lib/enquiry/schema.ts`): allowed services only, length limits, whitespace normalisation, valid email and phone;
- rejects cross-site submissions (Next.js checks the Origin header against the host for every Server Action);
- drops bot submissions via a hidden honeypot field and a minimum fill time;
- rate-limits each visitor IP (5 per 10 minutes by default) using files in the temp directory, which works across Passenger's processes on one server;
- sends a plain-text email with the visitor's address as Reply-To, and reports success only when the SMTP server accepts the message;
- logs failures without any personal details.

The form also works with JavaScript disabled: it posts to the same action and the page re-renders with the result.

### Environment variables

See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SMTP_HOST` | yes | SMTP server, e.g. `mail.valuationcertificates.com.au` |
| `SMTP_PORT` | no | `465` (implicit TLS, default) or `587` (STARTTLS) |
| `SMTP_USER`, `SMTP_PASS` | yes | SMTP mailbox login |
| `ENQUIRY_TO` | yes | Mailbox that receives enquiries |
| `ENQUIRY_FROM` | yes | Sender address; use the SMTP mailbox so SPF and DKIM align |
| `ENQUIRY_RATE_LIMIT_MAX` | no | Enquiries per IP per 10 minutes (default 5) |
| `ENQUIRY_RATE_LIMIT_DIR` | no | Where rate-limit counters are stored |

`SMTP_TLS=none` exists only for the local test mail sink; never use it in production.

## Deploying to cPanel

1. **Domain and email.** Point `valuationcertificates.com.au` at the cPanel account. Create the sending mailbox (e.g. `no-reply@`) and the receiving mailbox. In *Email Deliverability*, make sure SPF and DKIM are valid for the domain, and add a DMARC record if there isn't one.
2. **SSL.** Enable AutoSSL (or install a certificate) for the apex and `www`. In *Domains*, turn on *Force HTTPS Redirect*.
3. **Upload the code.** Clone the repository into a folder outside `public_html`, e.g. `/home/<user>/valuationcertificates` (cPanel's *Git Version Control* can do this).
4. **Create the app.** In *Setup Node.js App*: Node.js version 22 (or the newest 20.9+ offered), Application mode *Production*, Application root = that folder, Application URL = the domain, Application startup file = `server.js`. Add the environment variables from the table above.
5. **Install and build.** Click *Run NPM Install*. Then open the app's terminal (the command to enter the virtual environment is shown at the top of the app page) and run `npm run build`.
6. **Start.** Click *Restart*. Visit the site and send a test enquiry.

To deploy an update: pull the new code, run `npm install` (if dependencies changed) and `npm run build` in the app's environment, then restart the app.

To make `www.valuationcertificates.com.au` redirect to the apex domain, add a redirect in cPanel's *Redirects* (permanent, from `www.` to `https://valuationcertificates.com.au/`).

### What the server sets

Security headers for every response are configured in `next.config.ts`: Content-Security-Policy, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy and Cross-Origin-Opener-Policy. Next.js serves hashed build assets with long-lived immutable caching and optimises images on the fly (AVIF/WebP at responsive sizes, cached for 30 days).

## SEO

- Every page has its own title, meta description, canonical URL and Open Graph/Twitter tags (`src/lib/seo.ts`), all on `https://valuationcertificates.com.au`.
- Structured data: `ProfessionalService` and `WebSite` site-wide, `BreadcrumbList` on inner pages, `Service` on service pages and `FAQPage` on FAQ pages. Only facts published on the site are used: no ratings, reviews or street address.
- `sitemap.xml` lists the 15 indexable pages; `robots.txt` points to it.
- No analytics, tracking or cookies are used, so no cookie banner is needed. If analytics are added later, update the privacy section on `/legal/` and the CSP in `next.config.ts`.
