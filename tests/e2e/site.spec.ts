import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { SMTP_SINK_FILE } from "../../playwright.config";
import { indexableRoutes } from "../../src/content/routes";

const DOMAIN = "https://www.biv.com.au";

test.describe("every indexable route", () => {
  for (const { path } of indexableRoutes) {
    test(`${path} renders with correct SEO and no errors`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => msg.type() === "error" && consoleErrors.push(msg.text()));
      const failed: string[] = [];
      // Next.js checks prefetch targets with HEAD requests that Chromium reports as aborted after a 200.
      page.on("requestfailed", (req) => req.method() !== "HEAD" && failed.push(`${req.failure()?.errorText} ${req.url()}`));
      page.on("response", (res) => res.status() >= 400 && failed.push(`${res.status()} ${res.url()}`));

      const res = await page.goto(path);
      expect(res?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${DOMAIN}${path}`);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${DOMAIN}${path}`);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length).toBeGreaterThan(50);

      // Metadata and structured data only point at the real domain.
      const head = await page.locator("head").innerHTML();
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const text of [head, ...ld]) {
        expect(text).not.toMatch(/valuationcertificates|supervals\.com\.au|strataproperty\.com\.au|localhost|vercel\.app/);
      }
      for (const json of ld) expect(() => JSON.parse(json)).not.toThrow();

      // No horizontal overflow at this viewport.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      // Below-the-fold images must load too.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState("networkidle");
      expect(failed).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }

  test("titles and descriptions are unique", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const { path } of indexableRoutes) {
      await page.goto(path);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(indexableRoutes.length);
    expect(descriptions.size).toBe(indexableRoutes.length);
  });
});

test.describe("accessibility", () => {
  for (const path of ["/", "/services/biv/", "/building-insurance-valuation/", "/quote-request/", "/testimonials/"]) {
    test(`${path} has no detectable WCAG A/AA violations`, async ({ page }) => {
      // Entrance animations fade text in; measure contrast at its final state.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    });
  }

  test("skip link moves focus to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });
});

test.describe("navigation", () => {
  test("desktop dropdown opens, navigates and closes with Escape", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop only");
    await page.goto("/");
    const services = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Services" });
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await expect(services).toBeFocused();
    await services.click();
    await page.getByRole("link", { name: /Asbestos Report/ }).first().click();
    await expect(page).toHaveURL(/\/services\/asb\/$/);
    await expect(services).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Testimonials" }).click();
    await expect(page).toHaveURL(/\/testimonials\/$/);
    await expect(menu).toBeHidden();
  });

  test("unknown URLs show the custom 404 page", async ({ page }) => {
    const res = await page.goto("/no-such-page/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn't find that page");
  });

  test("FAQ accordions toggle", async ({ page }) => {
    await page.goto("/sinking-fund-plans/");
    const second = page.locator("details").nth(1);
    await expect(second).not.toHaveAttribute("open");
    await second.locator("summary").click();
    await expect(second).toHaveAttribute("open", "");
  });
});

test.describe("enquiry form", () => {
  test("shows accessible validation errors", async ({ page }) => {
    await page.goto("/quote-request/");
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.getByText("Please choose at least one service.")).toBeVisible();
    const name = page.getByLabel("Your name");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    const describedBy = await name.getAttribute("aria-describedby");
    await expect(page.locator(`[id="${describedBy}"]`)).toHaveText("Please enter your name.");
  });

  async function fillValid(page: Page, name: string) {
    await page.getByLabel("Building Insurance Valuation (Aust. wide)").check();
    await page.getByLabel("Your name").fill(name);
    await page.getByLabel(/^Phone/).fill("02 9999 0000");
    await page.getByRole("textbox", { name: /^Email/ }).fill("jane@example.com");
    await page.getByLabel("Property address").fill("1 Example Street, Sydney NSW 2000");
    await page.getByLabel("Call back").check();
  }

  const sentMessages = () =>
    readFileSync(SMTP_SINK_FILE, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => (JSON.parse(line) as { message: string }).message);

  test("sends the email and shows success only after the server confirms", async ({ page }, info) => {
    const name = `Jane ${info.project.name} ${Date.now()}`;
    await page.goto("/quote-request/");
    await fillValid(page, name);
    await page.waitForTimeout(3200); // the server rejects forms completed implausibly fast
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.getByRole("status").filter({ hasText: "your request is with us" })).toBeVisible();
    expect(sentMessages().some((m) => m.includes(`Name: ${name}`))).toBe(true);
  });

  test("shows the server's message when it rejects a submission", async ({ page }) => {
    await page.goto("/contact-us/");
    await fillValid(page, "Too Quick");
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Please take a moment" })).toBeVisible();
    expect(sentMessages().some((m) => m.includes("Name: Too Quick"))).toBe(false);
  });

  test("shows a friendly error when the network fails", async ({ page }) => {
    await page.goto("/quote-request/");
    await fillValid(page, "Offline Person");
    await page.route("**/quote-request/", (route) =>
      route.request().method() === "POST" ? route.abort() : route.continue(),
    );
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "couldn't send your request" })).toBeVisible();
  });
});

test("the form works without JavaScript", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "one run is enough");
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  const name = `No JS ${Date.now()}`;
  await page.goto("/quote-request/");
  await fillNoJs(page, name);
  await page.getByRole("button", { name: "Send my request" }).click();
  await expect(page.getByText("your request is with us")).toBeVisible();
  expect(
    readFileSync(SMTP_SINK_FILE, "utf8").includes(`Name: ${name}`),
  ).toBe(true);
  await context.close();
});

async function fillNoJs(page: Page, name: string) {
  await page.getByLabel("Asbestos Report (Register + Management Plan)").check();
  await page.getByLabel("Your name").fill(name);
  await page.getByLabel(/^Phone/).fill("0400 000 000");
  await page.getByRole("textbox", { name: /^Email/ }).fill("nojs@example.com");
  await page.getByLabel("Property address").fill("2 Example Road, Wagga Wagga NSW");
  await page.getByText("Email back", { exact: true }).click();
}

test.describe("scroll effects", () => {
  const opacity = (page: Page, selector: string) =>
    page.locator(selector).first().evaluate((el) => Number(getComputedStyle(el).opacity));

  test("pinned scenes track scroll progress", async ({ page }) => {
    await page.goto("/");
    const scene = page.locator('[data-scroll="pin"]').first();
    const progress = () => scene.evaluate((el) => Number(getComputedStyle(el).getPropertyValue("--p")));
    expect(await progress()).toBe(0);
    // Service text starts hidden and fades in as the diamonds settle.
    expect(await opacity(page, "#services-heading ~ * li .seg, [data-diamond-home] + .seg")).toBeLessThan(0.1);
    const { top, height } = await scene.evaluate((el) => ({ top: el.getBoundingClientRect().top + scrollY, height: el.getBoundingClientRect().height }));
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top + height * 0.6);
    await expect.poll(progress).toBeGreaterThan(0.6);
    await expect.poll(() => opacity(page, "[data-diamond-home] + .seg")).toBeGreaterThan(0.9);
  });

  for (const mode of ["reduced motion", "no JavaScript"] as const) {
    test(`with ${mode}, every scene shows its end state`, async ({ browser }, info) => {
      test.skip(info.project.name !== "desktop", "one run is enough");
      const context = await browser.newContext(
        mode === "reduced motion" ? { reducedMotion: "reduce" } : { javaScriptEnabled: false },
      );
      const page = await context.newPage();
      await page.goto("/");
      await expect(page.locator("h1")).toBeVisible();
      for (const sel of ["[data-diamond-home] + .seg", "#stats-heading", ".words > span:last-child"]) {
        expect(await opacity(page, sel)).toBe(1);
      }
      // Pinned sections collapse instead of adding empty scroll distance.
      const extra = await page
        .locator(".pin")
        .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height - el.firstElementChild!.getBoundingClientRect().height));
      for (const px of extra) expect(px).toBeLessThan(2);
      await context.close();
    });
  }
});
