// Generates responsive WebP variants of every image in public/images so the
// static export can serve optimised images without a Next.js image server.
// Output: public/images/_opt/<name>-<width>.webp (git-ignored, rebuilt on build).
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS } from "../src/lib/image-widths.mjs";

const srcDir = path.resolve("public/images");
const outDir = path.join(srcDir, "_opt");
await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let written = 0;
for (const file of files) {
  const input = path.join(srcDir, file);
  const base = file.replace(/\.[^.]+$/, "");
  const srcTime = (await stat(input)).mtimeMs;
  for (const width of IMAGE_WIDTHS) {
    const output = path.join(outDir, `${base}-${width}.webp`);
    const existing = await stat(output).catch(() => null);
    if (existing && existing.mtimeMs >= srcTime) continue;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(output);
    written++;
  }
}
console.log(`optimize-images: ${files.length} source image(s), ${written} variant(s) written`);
