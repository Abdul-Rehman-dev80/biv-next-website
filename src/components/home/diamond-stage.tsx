"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Measures, for each diamond in the scene, the offset and scale from its
 * resting place to its slot in the logo cluster, and hands them to CSS as
 * --dx/--dy/--ds. Scrolling then only interpolates in CSS.
 */
export function DiamondStage(props: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = () => {
      for (const home of root.querySelectorAll<HTMLElement>("[data-diamond-home]")) {
        const key = home.dataset.diamondHome!;
        const slot = root.querySelector<HTMLElement>(`[data-diamond-slot="${key}"]`);
        const gem = home.firstElementChild as HTMLElement | null;
        if (!slot || !gem) continue;
        const a = home.getBoundingClientRect();
        const b = slot.getBoundingClientRect();
        gem.style.setProperty("--dx", `${b.left + b.width / 2 - (a.left + a.width / 2)}px`);
        gem.style.setProperty("--dy", `${b.top + b.height / 2 - (a.top + a.height / 2)}px`);
        gem.style.setProperty("--ds", (b.width / a.width).toFixed(3));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return <div ref={ref} {...props} />;
}
