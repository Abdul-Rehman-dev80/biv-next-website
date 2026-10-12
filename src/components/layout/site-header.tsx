import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { PhoneIcon } from "@/components/ui/icons";
import { Logo } from "./logo";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.name}, home`} className="shrink-0 rounded-lg">
          <Logo />
        </Link>
        <SiteNav items={mainNav} phone={site.phone}>
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-900 hover:text-brand-700 xl:inline-flex"
          >
            <PhoneIcon className="size-4 text-brand-700" />
            {site.phone.display}
          </a>
        </SiteNav>
      </Container>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-(--page-p) bg-gradient-to-r from-diamond-blue via-diamond-green to-diamond-red"
      />
    </header>
  );
}
