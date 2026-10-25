import type { ReactNode } from "react";
import { asset } from "../lib/asset";

// Shared pieces for the corflute and A-frame pages (same look as the pull up banners page).

export const scrollToId = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export const th = "px-2 py-3 font-slab text-sm font-bold sm:px-4 sm:text-base";
export const td = "px-2 py-3 sm:px-4";
export const priceTd =
  "whitespace-nowrap px-2 py-3 font-bold text-rust-dark sm:px-4 sm:text-lg";

export function QuoteButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap rounded-md border-2 border-charcoal px-3 text-sm font-bold hover:bg-charcoal hover:text-cream"
    >
      Quote<span className="sr-only"> for {label}</span>
    </a>
  );
}

export type DownloadItem = { label: string; guide: string; template: string };

export function DownloadGroup({
  title,
  items,
  track,
  open = false,
}: {
  title: string;
  items: DownloadItem[];
  track: string;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="group rounded-xl border-2 border-charcoal/15 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-slab text-lg font-bold [&::-webkit-details-marker]:hidden">
        {title}
        <span className="flex items-center gap-3 text-sm font-normal text-charcoal/70">
          {items.length} {items.length === 1 ? "size" : "sizes"}
          <span
            aria-hidden
            className="text-2xl leading-none text-rust transition-transform group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <ul className="divide-y divide-charcoal/10 border-t border-charcoal/10">
        {items.map((d) => (
          <li
            key={d.guide}
            className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-semibold">{d.label}</span>
            <span className="flex flex-wrap gap-x-5 text-sm font-semibold">
              <a
                href={asset(d.guide)}
                download
                className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                data-track={`${track}-guide-${title} ${d.label}`}
              >
                Artwork guide (PDF)
              </a>
              <a
                href={asset(d.template)}
                download
                className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                data-track={`${track}-template-${title} ${d.label}`}
              >
                Artwork template (PDF)
              </a>
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function FaqList({
  id,
  title,
  faqs,
  email,
}: {
  id: string;
  title: string;
  faqs: { q: string; a: ReactNode }[];
  email: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id={id} className="text-3xl sm:text-4xl">
          {title}
        </h2>
        <div data-faq className="mt-8 divide-y divide-charcoal/15 rounded-xl border border-charcoal/15 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="text-2xl leading-none text-rust transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6">
          Something else? Email{" "}
          <a
            className="font-semibold text-rust-dark underline underline-offset-2"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/** Quantity price breaks for tiered items: price each at each quantity, 1 design. */
export function TierTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; tiers: [number, number][] }[];
}) {
  const qtys = [...new Set(rows.flatMap((r) => r.tiers.map(([q]) => q)))].sort((a, b) => a - b);
  const fmt = (n: number) =>
    `$${n.toLocaleString("en-AU", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;
  return (
    <div className="mt-8" data-tier-table>
      <h3 className="font-slab text-xl font-bold">{title}</h3>
      <p className="mt-1 text-sm text-charcoal/80">Price each at that quantity. The more you order, the lower the price each.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-charcoal text-cream">
            <tr>
              <th scope="col" className={th}>Item</th>
              {qtys.map((q) => (
                <th key={q} scope="col" className={th}>{q}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {rows.map((r) => (
              <tr key={r.label} className="odd:bg-cream-light/60">
                <th scope="row" className={`${td} font-bold`}>{r.label}</th>
                {qtys.map((q) => {
                  const t = r.tiers.find(([x]) => x === q);
                  return (
                    <td key={q} className={priceTd}>
                      {t ? fmt(Math.round((t[1] / t[0]) * 100) / 100) : "–"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
