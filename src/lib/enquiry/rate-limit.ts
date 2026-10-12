import "server-only";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Fixed-window rate limiter backed by small files in the OS temp directory.
 * Files (rather than memory) are used because cPanel's Passenger can run
 * several Node processes for one app; all of them share this directory.
 * IP addresses are stored only as salted hashes.
 */
export type RateLimiter = (key: string, now: number) => Promise<boolean>;

export function createFileRateLimiter({
  limit,
  windowMs,
  dir = path.join(process.env.ENQUIRY_RATE_LIMIT_DIR || tmpdir(), "vc-enquiry-rl"),
}: {
  limit: number;
  windowMs: number;
  dir?: string;
}): RateLimiter {
  return async (key, now) => {
    try {
      await mkdir(dir, { recursive: true, mode: 0o700 });
      const file = path.join(dir, `${createHash("sha256").update(`vc|${key}`).digest("hex")}.json`);
      const previous: unknown = JSON.parse(await readFile(file, "utf8").catch(() => "[]"));
      const hits = (Array.isArray(previous) ? previous : []).filter(
        (t): t is number => typeof t === "number" && t > now - windowMs,
      );
      if (hits.length >= limit) return false;
      hits.push(now);
      await writeFile(file, JSON.stringify(hits), { mode: 0o600 });
      return true;
    } catch {
      // Fail open: never block a genuine enquiry because the disk is unavailable.
      return true;
    }
  };
}
