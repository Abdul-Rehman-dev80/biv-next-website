import { site } from "@/content/site";
import { MailIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";

export function ContactAside() {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Other ways to reach us">
      <div className="rounded-card bg-ink-900 p-7 text-slate-300">
        <h2 className="text-lg font-semibold text-white">Prefer to talk?</h2>
        <p className="mt-2 text-sm leading-relaxed">Call us during business hours, or email your instructions and plans.</p>
        <ul className="mt-6 space-y-4">
          <li>
            <a href={site.phone.href} className="group flex items-center gap-3 font-semibold text-white">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-brand-700">
                <PhoneIcon className="size-5" />
              </span>
              {site.phone.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="group flex items-center gap-3 break-all text-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-brand-700">
                <MailIcon className="size-5" />
              </span>
              {site.email}
            </a>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 rounded-card border border-line bg-white p-6">
        <ShieldIcon className="size-6 shrink-0 text-brand-700" />
        <p className="text-sm leading-relaxed text-slate-700">
          We respect your privacy and keep all client communications strictly confidential.
        </p>
      </div>
    </aside>
  );
}
