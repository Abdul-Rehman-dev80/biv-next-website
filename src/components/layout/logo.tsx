import { cn } from "@/lib/cn";

/** Brand mark: a certificate seal formed from a roofline and a tick. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={cn("size-10", className)}>
      <defs>
        <linearGradient id="vc-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#12b294" />
          <stop offset="1" stopColor="#0b7263" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#vc-mark)" />
      <path d="M9 19.5 20 10l11 9.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14.5 23.5 4 4 7.5-8" fill="none" stroke="#f5c04a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.05rem] font-bold tracking-tight", inverted ? "text-white" : "text-ink-900")}>
          Valuation
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase",
            inverted ? "text-brand-300" : "text-brand-700",
          )}
        >
          Certificates
        </span>
      </span>
    </span>
  );
}
