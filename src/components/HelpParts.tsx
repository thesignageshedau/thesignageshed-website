import type { ReactNode } from "react";
import { homeSection } from "../lib/routes";

export const helpLink = "font-semibold text-rust-dark underline underline-offset-2";

/** Dark intro band shared by the help pages. */
export function HelpHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="bg-charcoal text-cream">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6 md:py-16">
        <a href={homeSection("top")} className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white">
          ← Back to The Signage Shed
        </a>
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">{children}</div>
      </div>
    </section>
  );
}

/** One titled block of help copy. */
export function HelpSection({ id, title, children, aside }: { id: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-20 py-10 sm:py-12">
      <div className={`mx-auto max-w-site px-4 sm:px-6 ${aside ? "grid gap-8 md:grid-cols-[1fr_320px] md:items-start" : ""}`}>
        <div className="max-w-3xl">
          <div className="rule mb-4" />
          <h2 id={`${id}-h`} className="text-3xl sm:text-4xl">{title}</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}

/** FAQ list in the same markup as the main FAQ, so FaqSchema picks it up. */
export function HelpFaq({ faqs }: { faqs: { q: string; a: ReactNode }[] }) {
  return (
    <section id="faq" className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 className="text-3xl sm:text-4xl">Questions</h2>
        <div data-faq className="mt-8 divide-y divide-charcoal/15 rounded-xl border border-charcoal/15 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-2xl leading-none text-rust transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HelpCta({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-charcoal py-14 text-cream sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        <div className="mt-6 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
