import { HelpCta, HelpHero, HelpSection } from "./HelpParts";
import MockupImage from "./MockupImage";
import { SEO_PAGES } from "../data/seoPages";
import { quoteHref } from "../data/quoteProducts";

const SITE = "https://thesignageshed.au";

/** Search-focused landing page: from price, short buying copy and a pre-filled quote button. */
export default function SeoProductPage({ slug }: { slug: string }) {
  const p = SEO_PAGES.find((x) => x.slug === slug)!;
  const href = quoteHref(p.quote.product, p.quote.size);
  const ld = p.from !== null && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.h1,
    description: p.description,
    brand: { "@type": "Brand", name: "The Signage Shed" },
    offers: { "@type": "Offer", priceCurrency: "AUD", price: p.from, availability: "https://schema.org/InStock", url: `${SITE}/${p.slug}/`, seller: { "@type": "Organization", name: "The Signage Shed" } },
  };
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <HelpHero eyebrow={p.eyebrow} title={p.h1}>
        <p>{p.intro}</p>
        <p className="mt-5 text-2xl font-bold text-cream">
          {p.from !== null ? <>From ${p.from} <span className="text-base font-normal text-cream/85">{p.fromNote}</span></> : "Price on quote"}
        </p>
        <p className="mt-1 text-base text-cream/85">Minimum order $180 (excl. freight). Delivered Australia-wide.</p>
        <a href={href} className="btn-rust mt-6 inline-block" data-track={`${p.slug}-hero-quote`}>Get a quote</a>
      </HelpHero>
      {p.image && (
        <div className="mx-auto max-w-site px-4 pt-10 sm:px-6">
          <div className="max-w-3xl overflow-hidden rounded-xl">
            <MockupImage mockup={p.image} sizes="(min-width: 840px) 768px, 100vw" className="h-auto w-full" eager />
          </div>
        </div>
      )}
      {p.sections.map((s) => (
        <HelpSection key={s.id} id={s.id} title={s.title}>{s.body}</HelpSection>
      ))}
      <section className="bg-cream" aria-labelledby={`${p.slug}-related`}>
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6">
          <h2 id={`${p.slug}-related`} className="text-xl">Related</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {p.related.map((l) => (
              <li key={l.href}><a href={l.href} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">{l.text}</a></li>
            ))}
          </ul>
        </div>
      </section>
      <HelpCta title={`Get a price for your ${p.quote.label}`}>
        <a href={href} className="btn-rust" data-track={`${p.slug}-quote`}>Get a quote</a>
        <a href="/faq/" className="btn-ghost-light">Common questions</a>
      </HelpCta>
    </>
  );
}
