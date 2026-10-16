import { HelpCta, HelpHero, HelpSection } from "./HelpParts";
import { GUIDES } from "../data/guides";

export function GuidesIndex() {
  return (
    <>
      <HelpHero eyebrow="Guides" title="Buying guides">
        <p>Short, plain-English guides to help you choose the right sign and get your artwork ready.</p>
      </HelpHero>
      <section className="py-12 sm:py-16">
        <ul className="mx-auto grid max-w-site gap-6 px-4 sm:px-6 md:grid-cols-3">
          {GUIDES.map((g) => (
            <li key={g.slug} className="rounded-xl border border-charcoal/15 bg-white p-6">
              <h2 className="text-2xl leading-snug"><a href={`/guides/${g.slug}/`} className="hover:underline decoration-rust decoration-2 underline-offset-4">{g.title}</a></h2>
              <p className="mt-3 leading-relaxed">{g.summary}</p>
              <a href={`/guides/${g.slug}/`} className="mt-4 inline-flex min-h-11 items-center font-semibold text-rust-dark underline underline-offset-2">Read the guide</a>
            </li>
          ))}
        </ul>
      </section>
      <HelpCta title="Ready for a price?">
        <a href="/quote/" className="btn-rust" data-track="guides-quote">Get a quote</a>
        <a href="/faq/" className="btn-ghost-light">Common questions</a>
      </HelpCta>
    </>
  );
}

export function GuidePage({ slug }: { slug: string }) {
  const g = GUIDES.find((x) => x.slug === slug)!;
  return (
    <>
      <HelpHero eyebrow="Buying guide" title={g.title}>
        <p>{g.summary}</p>
      </HelpHero>
      {g.sections.map((s) => (
        <HelpSection key={s.id} id={s.id} title={s.title}>{s.body}</HelpSection>
      ))}
      <HelpCta title="Get a price for your job">
        <a href="/quote/" className="btn-rust" data-track={`guide-${g.slug}-quote`}>Get a quote</a>
        <a href="/guides/" className="btn-ghost-light">More guides</a>
      </HelpCta>
    </>
  );
}
