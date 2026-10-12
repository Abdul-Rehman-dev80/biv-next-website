import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"section"> & {
  /** Scroll distance in viewport heights; the stage stays pinned for (length - 1) of them. */
  length?: number;
  stageClassName?: string;
};

/**
 * A section whose stage sticks below the header while the page scrolls past,
 * exposing scroll progress as `--p` (0 to 1). Without JavaScript or with
 * reduced motion it collapses to a normal section showing the end state.
 */
export function Pinned({ length = 3, className, stageClassName, style, children, ...props }: Props) {
  return (
    <section
      data-scroll="pin"
      className={cn("pin", className)}
      style={{ "--len": length, ...style } as CSSProperties}
      {...props}
    >
      <div className={cn("pin-stage", stageClassName)}>{children}</div>
    </section>
  );
}

/** Inline style for an element that animates over part of a scene (see `.seg`). */
export const seg = (a: number, b: number, extra?: CSSProperties) =>
  ({ "--a": a, "--b": b, ...extra }) as CSSProperties;
