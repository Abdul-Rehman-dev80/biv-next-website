import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 4173);
const SMTP_PORT = 2525;
export const SMTP_SINK_FILE = ".e2e/smtp-sink.jsonl";

/**
 * End-to-end tests run against the production build (`npm run build` first),
 * started with server.js exactly as cPanel runs it. Email goes to a local SMTP
 * sink (tests/e2e/smtp-sink.mjs) so the full form path is exercised.
 */
export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "node tests/e2e/smtp-sink.mjs",
      env: { SMTP_SINK_PORT: String(SMTP_PORT), SMTP_SINK_FILE },
      port: SMTP_PORT,
      reuseExistingServer: false,
    },
    {
      command: "node server.js",
      env: {
        PORT: String(PORT),
        SMTP_HOST: "127.0.0.1",
        SMTP_PORT: String(SMTP_PORT),
        SMTP_TLS: "none",
        SMTP_USER: "test",
        SMTP_PASS: "test",
        ENQUIRY_TO: "enquiries@example.com",
        ENQUIRY_FROM: "no-reply@example.com",
        ENQUIRY_RATE_LIMIT_MAX: "1000",
        ENQUIRY_RATE_LIMIT_DIR: ".e2e/rate-limit",
      },
      url: `http://localhost:${PORT}/`,
      reuseExistingServer: false,
    },
  ],
});
