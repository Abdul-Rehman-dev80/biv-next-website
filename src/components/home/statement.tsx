import { Pinned } from "@/components/motion/pinned";
import { WordReveal } from "@/components/motion/word-reveal";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

/** A large statement whose words light up as it scrolls through. */
export function Statement() {
  return (
    <Pinned length={2.2} aria-label="About BIV Reports" className="bg-ink-950" stageClassName="flex items-center">
      <Container>
        <p className="text-sm font-semibold tracking-wide text-gold-400 uppercase">Since {site.foundingYear}</p>
        <WordReveal
          className="mt-6 max-w-5xl text-3xl leading-[1.15] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          text="We have valued everything from some of Australia's largest property transactions to the smallest suburban cottage. Strata is where we do our best work."
        />
      </Container>
    </Pinned>
  );
}
