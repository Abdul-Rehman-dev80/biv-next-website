import type { Faq } from "@/content/faqs";
import { ChevronDownIcon } from "@/components/ui/icons";

/** Native <details> accordions: keyboard and screen-reader friendly with no JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div data-reveal-children className="divide-y divide-line rounded-card border border-line bg-white shadow-card">
      {faqs.map((faq, i) => (
        <details key={faq.question} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-5 py-5 sm:px-7 [&::-webkit-details-marker]:hidden">
            <h2 className="text-lg font-semibold sm:text-xl">
              <span className="mr-3 text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {faq.question}
            </h2>
            <ChevronDownIcon className="mt-1 size-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
          </summary>
          <div className="prose-site px-5 pb-6 sm:px-7 sm:pl-[4.25rem]">
            {faq.answer.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {faq.list && (
              <ul>
                {faq.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {faq.table && (
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-paper text-ink-900">
                    <tr>
                      {faq.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {faq.table.rows.map(([type, freq]) => (
                      <tr key={type}>
                        <th scope="row" className="px-4 py-3 font-normal text-slate-700">
                          {type}
                        </th>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-ink-900">{freq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
