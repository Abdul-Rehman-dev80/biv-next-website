"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives every scroll effect on the page from one passive scroll listener.
 *
 * - `[data-scroll="pin"]`: a tall section with a sticky child. `--p` goes from
 *   0 to 1 while the sticky child is pinned.
 * - `[data-scroll="view"]`: `--p` goes from 0 (element top enters at the bottom
 *   of the viewport) to 1 (element bottom leaves at the top).
 * - `[data-scroll="exit"]`: for sections that start on screen (a hero). `--p`
 *   goes from 0 at the starting scroll position to 1 once it has scrolled away.
 * - `[data-reveal]` (and each child of `[data-reveal-children]`): gets
 *   `data-revealed` the first time it scrolls into view; CSS handles the
 *   transition.
 * - `<html>` gets `--page-p`, the scroll position of the whole page.
 *
 * Components stay server-rendered and style themselves with `var(--p)`. With
 * reduced motion (or without JavaScript) CSS shows every effect's end state.
 */
export function ScrollDriver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame = 0;
    let cleanup = () => {};

    const start = () => {
      cleanup();
      const reveals = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-children] > *"),
      );
      if (!motion.matches) {
        reveals.forEach((el) => el.setAttribute("data-revealed", ""));
        cleanup = () => {};
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      reveals.forEach((el) => io.observe(el));

      const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"), (el) => ({
        el,
        pinned: el.dataset.scroll === "pin" ? (el.firstElementChild as HTMLElement | null) : null,
        stickyTop: 0,
        docTop: 0,
      }));
      const measure = () => {
        for (const s of scenes) {
          if (s.pinned) s.stickyTop = parseFloat(getComputedStyle(s.pinned).top) || 0;
          s.docTop = s.el.getBoundingClientRect().top + window.scrollY;
        }
      };
      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        for (const { el, pinned, stickyTop, docTop } of scenes) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -vh || rect.top > vh * 2) continue;
          let p: number;
          if (pinned) {
            const travel = rect.height - pinned.offsetHeight;
            p = travel > 0 ? (stickyTop - rect.top) / travel : 1;
          } else if (el.dataset.scroll === "exit") {
            p = (docTop - rect.top) / rect.height;
          } else {
            p = (vh - rect.top) / (vh + rect.height);
          }
          el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
        }
        const max = root.scrollHeight - vh;
        root.style.setProperty("--page-p", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      const onResize = () => {
        measure();
        onScroll();
      };
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      cleanup = () => {
        io.disconnect();
        cancelAnimationFrame(frame);
        frame = 0;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    };

    start();
    motion.addEventListener("change", start);
    return () => {
      motion.removeEventListener("change", start);
      cleanup();
    };
  }, [pathname]);

  return null;
}
