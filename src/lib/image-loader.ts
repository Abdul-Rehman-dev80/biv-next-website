import { IMAGE_WIDTHS } from "./image-widths.mjs";

/**
 * next/image loader for the static export. Local images under /images/ map to
 * the pre-generated WebP variants; anything else is returned unchanged.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (!src.startsWith("/images/") || src.startsWith("/images/_opt/")) return src;
  const best = IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  const name = src.slice("/images/".length).replace(/\.[^.]+$/, "");
  return `/images/_opt/${name}-${best}.webp`;
}
