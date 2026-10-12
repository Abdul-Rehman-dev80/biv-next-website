"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NavItem, NavLink } from "@/content/site";
import { buttonClasses } from "@/components/ui/button";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Props = {
  items: NavItem[];
  phone: { display: string; href: string };
  children?: ReactNode;
};

const isGroup = (item: NavItem): item is { label: string; children: NavLink[] } => "children" in item;

export function SiteNav({ items, phone, children }: Props) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopRef = useRef<HTMLUListElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // Close menus after navigation. Adjusting state during render (rather than in
  // an effect) avoids an extra paint with the stale menu open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!openGroup) return;
    const onPointer = (e: PointerEvent) => {
      if (!desktopRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [openGroup]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      } else if (openGroup) {
        const trigger = desktopRef.current?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`);
        setOpenGroup(null);
        trigger?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, openGroup]);

  useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    mobilePanelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const groupActive = (links: NavLink[]) => links.some((l) => isActive(l.href));

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul ref={desktopRef} className="flex items-center gap-1">
          {items.map((item) =>
            isGroup(item) ? (
              <li
                key={item.label}
                className="relative"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenGroup(null);
                }}
              >
                <button
                  type="button"
                  data-group={item.label}
                  aria-expanded={openGroup === item.label}
                  aria-controls={`nav-${item.label}`}
                  onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-paper hover:text-ink-900",
                    groupActive(item.children) ? "text-brand-700" : "text-slate-700",
                  )}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={cn("size-4 transition-transform", openGroup === item.label && "rotate-180")}
                  />
                </button>
                <div
                  id={`nav-${item.label}`}
                  hidden={openGroup !== item.label}
                  className="absolute top-full left-1/2 z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-lift"
                >
                  <ul>
                    {item.children.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-paper aria-[current=page]:bg-brand-50"
                        >
                          <span className="block text-sm font-semibold text-ink-900">{link.label}</span>
                          {link.description && (
                            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-slate-600">
                              {link.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-paper hover:text-ink-900",
                    isActive(item.href) ? "text-brand-700" : "text-slate-700",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {children}
        <Link href="/quote-request/" className={buttonClasses("primary", "md", "max-sm:hidden")}>
          Request a quote
        </Link>
        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-paper lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={mobilePanelRef}
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-xl px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-line">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.label} className="py-3">
                  <p className="px-2 pb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">{item.label}</p>
                  <ul>
                    {item.children.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className="flex min-h-12 items-center rounded-lg px-2 text-base text-ink-900 hover:bg-paper aria-[current=page]:font-semibold aria-[current=page]:text-brand-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href} className="py-1">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-lg px-2 text-base font-medium text-ink-900 hover:bg-paper aria-[current=page]:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6 grid gap-3">
            <Link href="/quote-request/" className={buttonClasses("primary", "lg")}>
              Request a quote
            </Link>
            <a href={phone.href} className={buttonClasses("secondary", "lg")}>
              <PhoneIcon className="size-5 text-brand-700" />
              Call {phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
