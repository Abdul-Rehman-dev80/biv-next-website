"use client";

import Link from "next/link";
import { useLayoutEffect, type ComponentProps } from "react";

let morphPending = false;

/** A link to a service page whose diamond morphs across (see ServiceMark). */
export function ServiceLink(props: Omit<ComponentProps<typeof Link>, "onNavigate">) {
  return (
    <Link
      {...props}
      onNavigate={() => {
        morphPending = true;
      }}
    />
  );
}

/**
 * React only pairs view-transition elements that are on screen, but Next
 * renders the new page at the old scroll position and scrolls to the top
 * afterwards. Jumping to the top in the same commit puts the service page's
 * diamond on screen in time, so diamonds clicked further down still morph.
 */
export function MorphScrollReset() {
  useLayoutEffect(() => {
    if (!morphPending) return;
    morphPending = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
