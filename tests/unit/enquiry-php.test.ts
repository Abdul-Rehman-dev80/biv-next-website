/**
 * Integration tests for public/api/enquiry.php, run against PHP's built-in
 * server with ENQUIRY_DRY_RUN=1 so no email is sent. Skipped when the php CLI
 * is not installed.
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ENQUIRY_SERVICES } from "@/lib/enquiry-schema";

const hasPhp = spawnSync("php", ["-v"]).status === 0;
const PORT = 8789;
const BASE = `http://127.0.0.1:${PORT}`;
const ORIGIN = "https://valuationcertificates.com.au";

const valid = {
  services: [ENQUIRY_SERVICES[0], ENQUIRY_SERVICES[3]],
  name: "Jane Citizen",
  phone: "02 9999 0000",
  email: "jane@example.com",
  address: "1 Example Street, Sydney NSW 2000",
  lots: "12",
  instructions: "Please call first.",
  preference: "Call back",
  website: "",
  startedAt: String(Date.now() - 60_000),
};

describe.skipIf(!hasPhp)("enquiry.php", () => {
  let server: ChildProcess;
  let tmp: string;

  beforeAll(async () => {
    tmp = mkdtempSync(path.join(tmpdir(), "vc-php-"));
    server = spawn("php", ["-S", `127.0.0.1:${PORT}`, "-t", path.resolve("public")], {
      env: {
        ...process.env,
        ENQUIRY_TO: "enquiries@example.com",
        ENQUIRY_FROM: "no-reply@example.com",
        ENQUIRY_ALLOWED_ORIGINS: ORIGIN,
        ENQUIRY_DRY_RUN: "1",
        TMPDIR: tmp,
      },
      stdio: "ignore",
    });
    for (let i = 0; i < 50; i++) {
      const up = await fetch(`${BASE}/api/enquiry.php`).then(() => true, () => false);
      if (up) return;
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error("php server did not start");
  });

  afterAll(() => {
    server?.kill();
    rmSync(tmp, { recursive: true, force: true });
  });

  const post = (body: unknown, headers: Record<string, string> = {}) =>
    fetch(`${BASE}/api/enquiry.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: ORIGIN,
        ...headers,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
      redirect: "manual",
    });

  it("rejects GET requests", async () => {
    const res = await fetch(`${BASE}/api/enquiry.php`, { headers: { Accept: "application/json" } });
    expect(res.status).toBe(405);
  });

  it("accepts a valid JSON enquiry", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejects requests from other origins", async () => {
    const res = await post(valid, { Origin: "https://evil.example" });
    expect(res.status).toBe(403);
  });

  it("returns field errors for invalid input without echoing internals", async () => {
    const res = await post({ ...valid, email: "nope", services: ["Free money"], preference: "" });
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(Object.keys(body.errors).sort()).toEqual(["email", "preference", "services"]);
  });

  it("rejects oversized fields", async () => {
    const res = await post({ ...valid, instructions: "x".repeat(2500) });
    expect(res.status).toBe(422);
  });

  it("rejects bodies over the size limit", async () => {
    const res = await post({ ...valid, instructions: "x".repeat(40_000) });
    expect(res.status).toBe(413);
  });

  it("silently drops honeypot submissions", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
  });

  it("rejects submissions made too quickly", async () => {
    const res = await post({ ...valid, startedAt: String(Date.now()) });
    expect(res.status).toBe(400);
  });

  it("handles a no-JavaScript form post with a redirect to the thank-you page", async () => {
    const form = new URLSearchParams();
    for (const s of valid.services) form.append("services", s);
    for (const [k, v] of Object.entries(valid)) if (k !== "services") form.append(k, String(v));
    form.set("startedAt", "");
    const res = await fetch(`${BASE}/api/enquiry.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Origin: ORIGIN },
      body: form.toString(),
      redirect: "manual",
    });
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/thank-you/");
  });

  it("escapes user input in the no-JavaScript error page", async () => {
    const form = new URLSearchParams({ name: "<script>alert(1)</script>", preference: "x" });
    const res = await fetch(`${BASE}/api/enquiry.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Origin: ORIGIN },
      body: form.toString(),
    });
    expect(res.status).toBe(422);
    expect(await res.text()).not.toContain("<script>alert(1)</script>");
  });

  it("rate limits repeated submissions from one address", async () => {
    // Earlier tests in this file already used part of the allowance.
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(valid)).status);
    expect(statuses).toContain(429);
  });
});
