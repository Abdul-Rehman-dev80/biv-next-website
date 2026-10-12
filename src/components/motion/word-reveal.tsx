import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/cn";

/** Text whose words light up one by one with the enclosing scene's `--p`. */
export function WordReveal({ text, as: Tag = "p", className }: { text: string; as?: ElementType; className?: string }) {
  const words = text.split(" ");
  return (
    <Tag className={cn("words", className)} style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
