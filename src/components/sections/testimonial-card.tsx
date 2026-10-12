import type { Testimonial } from "@/content/testimonials";
import { QuoteIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  const { quote, name, role, organisation } = testimonial;
  return (
    <figure className={cn("flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card sm:p-7", className)}>
      <QuoteIcon className="size-7 text-brand-500" />
      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <span className="block font-semibold text-ink-900">{name}</span>
        <span className="block text-sm text-slate-600">{[role, organisation].filter(Boolean).join(", ")}</span>
      </figcaption>
    </figure>
  );
}
