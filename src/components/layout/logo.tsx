import { cn } from "@/lib/cn";

/** The four BIV diamonds: blue (top), green (left), yellow (right) and red (bottom). */
export const DIAMONDS = [
  { key: "blue", fill: "#3f56a2", cx: 50, cy: 26 },
  { key: "green", fill: "#599b51", cx: 26, cy: 50 },
  { key: "yellow", fill: "#e7c733", cx: 74, cy: 50 },
  { key: "red", fill: "#cc222e", cx: 50, cy: 74 },
] as const;

export const diamondPath = (cx: number, cy: number, d = 22) =>
  `M${cx} ${cy - d}L${cx + d} ${cy}L${cx} ${cy + d}L${cx - d} ${cy}Z`;

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={cn("size-10", className)}>
      {DIAMONDS.map((d) => (
        <path key={d.key} d={diamondPath(d.cx, d.cy)} fill={d.fill} />
      ))}
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-11" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.6rem] font-semibold tracking-[0.28em]",
            inverted ? "text-white" : "text-brand-600",
          )}
        >
          BIV
        </span>{" "}
        <span
          className={cn(
            "mt-0.5 font-serif text-[0.68rem] font-semibold tracking-[0.42em] uppercase",
            inverted ? "text-brand-200" : "text-brand-600",
          )}
        >
          Reports
        </span>
      </span>
    </span>
  );
}
