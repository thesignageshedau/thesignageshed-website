import { LAST_UPDATED, type LegalDoc } from "../data/legal";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <a href="/" className="text-sm font-semibold text-rust-dark underline underline-offset-4 hover:text-rust-deeper">
          ← Back to The Signage Shed
        </a>
        <div className="rule mb-4 mt-8" />
        <h1 className="text-4xl sm:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal/70">Last updated {LAST_UPDATED}</p>
        <p className="mt-6 text-lg leading-relaxed">{doc.intro}</p>
        <div className="mt-8 space-y-4">
          {doc.sections.map((s) => (
            <section key={s.heading} className="rounded-xl border border-charcoal/15 bg-white p-6 sm:p-7">
              <h2 className="font-slab text-xl font-bold tracking-normal sm:text-2xl">{s.heading}</h2>
              <div className="legal-body mt-3 space-y-3 leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
