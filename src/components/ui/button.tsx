import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[0_8px_20px_-8px_rgb(52_71_138/0.6)] hover:bg-brand-800 focus-visible:outline-brand-700",
  secondary: "bg-white text-ink-900 ring-1 ring-line ring-inset hover:bg-paper hover:ring-slate-300",
  ghost: "text-brand-700 hover:bg-brand-50",
  light: "bg-white text-ink-900 hover:bg-brand-50 focus-visible:outline-white",
  "outline-light": "bg-white/5 text-white ring-1 ring-white/35 ring-inset hover:bg-white/15 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
