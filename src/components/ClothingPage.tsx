import QuoteCta from "./QuoteCta";
import TrustStrip from "./TrustStrip";
import MockupImage from "./MockupImage";
import { FaqList, QuoteButton, priceTd, scrollToId, td, th } from "./PriceParts";
import { quoteHref } from "../data/quoteProducts";
import { QUOTE_EMAIL } from "../data/mediaWalls";
import { eachText } from "../data/tiers";
import { homeSection } from "../lib/routes";
import {
  BANDS,
  PAGE,
  PRODUCTS,
  FROM_EACH_IN_TENS,
  CLOTHING_FROM_LINE,
  money,
  type ClothingProduct,
} from "../data/clothing";

const SITE = "https://thesignageshed.au";

function totalAt(p: ClothingProduct, qty: number) {
  const row = p.tiers.find(([q]) => q === qty);
  return row ? row[1] : 0;
}

function PriceCell({ total, qty }: { total: number; qty: number }) {
  return (
    <td className={priceTd}>
      <span className="block">{money(total)}</span>
      {qty > 1 && <span className="block text-xs font-semibold text-charcoal/70">{eachText(total, qty)}</span>}
    </td>
  );
}

export default function ClothingPage() {
  const url = `${SITE}/clothing/`;
  const units = PRODUCTS.flatMap((p) => p.tiers.map(([q, total]) => total / q));
  const extras = PRODUCTS.flatMap((p) => (p.extras ?? []).map((e) => e.total / 10));
  const low = FROM_EACH_IN_TENS;
  const high = Math.max(...units, ...extras);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom printed clothing",
    description: PAGE.description,
    image: `${SITE}/og/clothing.jpg`,
    url,
    brand: { "@type": "Brand", name: "The Signage Shed" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: low,
      highPrice: Math.round(high),
      offerCount: units.length + extras.length,
      availability: "https://schema.org/InStock",
      url,
      seller: { "@type": "Organization", name: "The Signage Shed" },
    },
  };

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
            <p className="eyebrow mt-8">{PAGE.eyebrow}</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{PAGE.heading}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">{PAGE.intro}</p>
            <p className="mt-4 max-w-xl text-lg font-semibold text-cream">
              {CLOTHING_FROM_LINE}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="btn-rust" onClick={() => scrollToId("prices")}>
                See prices
              </button>
              <a href={quoteHref("clothing")} className="btn-ghost-light">
                Get a quote
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/85">
              No artwork? Send your logo and wording and we'll set it up.{" "}
              <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">
                Artwork help
              </a>{" "}
              Have a file ready?{" "}
              <a href="/check-artwork/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">
                Check your artwork free
              </a>
              .
            </p>
          </div>
          <MockupImage
            mockup={PRODUCTS[0]!.mockup}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/3] w-full rounded-xl object-cover"
            eager
          />
        </div>
      </section>

      <section id="prices" aria-labelledby="clothing-prices" className="scroll-mt-20 py-14 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="clothing-prices" className="text-3xl sm:text-4xl">
            Prices
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">
            Line totals for one design. The price each is underneath. Swipe sideways on a small screen to see every quantity.
          </p>

          {PRODUCTS.map((p) => (
            <article key={p.id} id={p.id} className="mt-12 scroll-mt-24">
              <div className="grid items-start gap-6 md:grid-cols-[11rem_1fr]">
                <MockupImage
                  mockup={p.mockup}
                  sizes="(min-width: 768px) 176px, 40vw"
                  className="aspect-[4/3] w-full rounded-xl object-cover md:w-44"
                />
                <div>
                  <h3 className="font-slab text-2xl font-bold sm:text-3xl">{p.name}</h3>
                  <p className="mt-1 font-semibold text-rust-dark">{p.lead}</p>
                  <p className="mt-2 max-w-3xl leading-relaxed">{p.intro}</p>
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">
                Swipe sideways to see all prices →
              </p>
              <div className="relative mt-4 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
                <table className="w-full text-left">
                  <caption className="sr-only">{p.name} prices</caption>
                  <thead className="bg-charcoal text-cream">
                    <tr>
                      <th scope="col" className={th}>
                        Quantity
                      </th>
                      {BANDS.map((q) => (
                        <th key={q} scope="col" className={th}>
                          {q === 1 ? "1" : q}
                        </th>
                      ))}
                      <th scope="col" className={th}>
                        <span className="sr-only">Quote</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10">
                    <tr>
                      <th scope="row" className={`${td} min-w-[11rem] font-bold`}>
                        {p.short}
                        <span className="block text-xs font-normal text-charcoal/70">{p.includes}</span>
                      </th>
                      {BANDS.map((q) => (
                        <PriceCell key={q} total={totalAt(p, q)} qty={q} />
                      ))}
                      <td className={td}>
                        <QuoteButton label={p.name} href={quoteHref("clothing", p.id)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {p.extras && p.extras.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
                  <table className="w-full text-left">
                    <caption className="px-4 pt-3 text-left font-slab text-base font-bold">
                      Print options at 10
                    </caption>
                    <thead className="sr-only">
                      <tr>
                        <th scope="col">Print</th>
                        <th scope="col">Total for 10</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/10">
                      {p.extras.map((e) => (
                        <tr key={e.label}>
                          <th scope="row" className={`${td} font-bold`}>
                            {e.label}
                          </th>
                          <PriceCell total={e.total} qty={10} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <ul className="mt-4 max-w-3xl space-y-1 text-sm leading-relaxed">
                <li>
                  <span className="font-semibold">Colours. </span>
                  {p.colours}
                </li>
                <li>
                  <span className="font-semibold">Sizes. </span>
                  {p.sizes}
                </li>
                <li>
                  <span className="font-semibold">Print. </span>
                  {p.print}
                </li>
              </ul>
            </article>
          ))}

          <div className="mt-10 flex max-w-3xl flex-col gap-1.5 text-sm leading-relaxed">
            {PAGE.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip tone="dark" />

      <section id="artwork" aria-labelledby="clothing-artwork" className="scroll-mt-20 bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="clothing-artwork" className="text-3xl sm:text-4xl">
            Artwork
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">{PRODUCTS[0]!.artwork}</p>
          <p className="mt-3 max-w-3xl leading-relaxed">
            No artwork? Send your logo and wording and we'll set it up for you to approve. You can attach a file on the quote form, or paste a link.
          </p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-cream" aria-labelledby="clothing-related">
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6">
          <h2 id="clothing-related" className="text-xl">
            Related signage
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href="/packs/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">
                Signage packs
              </a>
            </li>
            <li>
              <a href="/car-magnets/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">
                Car magnets
              </a>
            </li>
            <li>
              <a href="/business-cards/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">
                Business cards
              </a>
            </li>
            <li>
              <a href="/pull-up-banners/" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">
                Pull up banners
              </a>
            </li>
          </ul>
        </div>
      </section>

      <QuoteCta slug="clothing" label="printed clothing" />

      <FaqList id="clothing-faq" title="Questions about clothing" faqs={PAGE.faqs} email={QUOTE_EMAIL} />
    </>
  );
}
