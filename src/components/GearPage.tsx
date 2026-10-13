import QuoteCta from "./QuoteCta";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import { QUOTE_EMAIL } from "../data/mediaWalls";
import {
  PRICE_NOTES,
  fromPrice,
  money,
  type GearProduct,
} from "../data/eventGear";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { FaqList, QuoteButton, priceTd, scrollToId, td, th } from "./PriceParts";

// One page layout for the event gear products (gazebos, flags, market umbrellas).
export default function GearPage({ product: p }: { product: GearProduct }) {
  const mailSubject = encodeURIComponent(`Artwork template: ${p.teaserTitle}`);

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-20">
          <div>
            <a
              href={homeSection("top")}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
            >
              ← Back to The Signage Shed
            </a>
            <p className="eyebrow mt-8">{p.eyebrow}</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              {p.heading}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              {p.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-rust"
                onClick={() => scrollToId("prices")}
              >
                See prices
              </button>
              <a href={quoteHref(p.slug)} className="btn-ghost-light">
                Get a quote
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/85">
              No artwork? Send your logo and wording and we'll set it up.{" "}
              <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Artwork help</a>
            </p>
            <p className="mt-5 text-sm font-semibold text-cream/80">
              From {money(fromPrice(p))}
            </p>
          </div>
          <MockupImage
            mockup={p.hero}
            square
            eager
            sizes="(min-width: 768px) 448px, 100vw"
            className="mx-auto w-full max-w-md rounded-xl shadow-xl ring-4 ring-rust/70"
          />
        </div>
      </section>
      <section
        id="prices"
        aria-labelledby={`${p.slug}-prices`}
        className="scroll-mt-20 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id={`${p.slug}-prices`} className="text-3xl sm:text-4xl">
            Prices
          </h2>
          <p className="mt-2 max-w-3xl text-lg">
            Price each, in Australian dollars, by how many of the same item you
            order.
          </p>
          <p className="mt-4 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">Swipe sideways to see all prices →</p>
          <div className="relative mt-8 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
            <table className="w-full text-left">
              <caption className="sr-only">{p.teaserTitle} prices</caption>
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th scope="col" className={th}>
                    Option
                  </th>
                  {p.bands.map((b) => (
                    <th key={b.label} scope="col" className={th}>
                      <span className="whitespace-nowrap">{b.label}</span>
                      <span className="block whitespace-nowrap text-xs font-normal text-cream/75">
                        each
                      </span>
                    </th>
                  ))}
                  <th scope="col" className={th}>
                    <span className="sr-only">Quote</span>
                  </th>
                </tr>
              </thead>
              {p.groups.map((g) => (
                <tbody key={g.id} className="divide-y divide-charcoal/10">
                  <tr className="bg-cream">
                    <th
                      scope="colgroup"
                      colSpan={p.bands.length + 2}
                      className={`${td} font-slab text-lg font-bold`}
                    >
                      {g.title}
                    </th>
                  </tr>
                  {p.items
                    .filter((i) => i.group === g.id)
                    .map((i) => (
                      <tr key={i.id}>
                        <th
                          scope="row"
                          className={`${td} min-w-[11rem] font-bold`}
                        >
                          {i.short}
                          <span className="block text-xs font-normal text-charcoal/70">
                            {i.includes}
                          </span>
                        </th>
                        {i.price.map((v, n) => (
                          <td key={p.bands[n]!.label} className={priceTd}>
                            {money(v)}
                          </td>
                        ))}
                        <td className={td}>
                          <QuoteButton
                            label={i.label}
                            href={quoteHref(p.slug, i.id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {p.addon && (
              <p>
                <strong>{p.addon.note}</strong>
              </p>
            )}
            {p.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
            {PRICE_NOTES.map((n) => (
              <p key={n} className="font-semibold">
                {n}.
              </p>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip tone="dark" />

      <MockupGallery id={`${p.slug}-mockups`} items={p.gallery} exclude={p.hero.slug} />

      <section
        aria-labelledby={`${p.slug}-types`}
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id={`${p.slug}-types`} className="text-3xl sm:text-4xl">
            Choose your {p.noun}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {p.groups.map((g) => (
              <div
                key={g.id}
                className="rounded-xl border-2 border-charcoal/15 bg-white p-6"
              >
                <h3 className="font-slab text-xl font-bold">{g.title}</h3>
                <p className="mt-2 leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="artwork"
        aria-labelledby={`${p.slug}-artwork`}
        className="scroll-mt-20 bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id={`${p.slug}-artwork`} className="text-3xl sm:text-4xl">
            Artwork
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">{p.artwork}</p>
          <a
            className="btn-outline mt-6 inline-block"
            href={`mailto:${QUOTE_EMAIL}?subject=${mailSubject}`}
            data-track={`${p.eventName}-template-request`}
          >
            Email us for the artwork template
          </a>
        </div>
      </section>

      <QuoteCta slug={p.slug} label={p.noun} />

      <FaqList
        id={`${p.slug}-faq`}
        title={`${p.teaserTitle} FAQ`}
        faqs={p.faqs}
        email={QUOTE_EMAIL}
      />
    </>
  );
}
