import { useState } from "react";
import ProductSeo, { SEO_SLUGS } from "./ProductSeo";
import QuoteCta from "./QuoteCta";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import { QUOTE_EMAIL } from "../data/mediaWalls";
import {
  PRICE_NOTES,
  fromPrice,
  money,
  type GearItem,
  type GearProduct,
} from "../data/eventGear";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MeshBannerInfo from "./MeshBannerInfo";
import MockupGallery from "./MockupGallery";
import { FaqList, QuoteButton, priceTd, scrollToId, td, th } from "./PriceParts";
import CustomSizeQuote from "./CustomSizeQuote";

// Natural next items for some event gear pages, shown under the hero buttons.
const PAIRS: Record<string, { lead: string; links: { href: string; text: string }[] }> = {
  gazebos: { lead: "Setting up a stall? Add", links: [{ href: "/market-umbrellas/", text: "printed market umbrellas" }, { href: "/rectangle-flags/", text: "rectangle flags" }] },
  flags: { lead: "Want a classic flag shape? See our", links: [{ href: "/rectangle-flags/", text: "rectangle flags" }] },
  "rectangle-flags": { lead: "Shade for your stall:", links: [{ href: "/market-umbrellas/", text: "printed market umbrellas" }] },
  "market-umbrellas": { lead: "Bigger setup? See our", links: [{ href: "/gazebos/", text: "printed gazebos" }] },
};

// One page layout for the event gear products (gazebos, flags, market umbrellas).
const quoteSizeId = (i: GearItem) => {
  const prefix = `${i.group}-`;
  return i.id.startsWith(prefix) ? i.id.slice(prefix.length) : i.id;
};

/** Notes already on the product shouldn't be repeated from the shared PRICE_NOTES list. */
const normNote = (s: string) => s.replace(/\.+$/, "").trim().toLowerCase();
const extraPriceNotes = (notes: readonly string[]) => {
  const seen = new Set(notes.map(normNote));
  return PRICE_NOTES.filter((n) => !seen.has(normNote(n)));
};

/** Sizes and materials with one from-price. No per-size prices. */
function QuoteOnlyPanel({ p }: { p: GearProduct }) {
  const sizes = p.items.filter((i) => i.group === p.groups[0]?.id);
  return (
    <section id="sizes" aria-labelledby={`${p.slug}-sizes`} className="scroll-mt-20 py-14 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id={`${p.slug}-sizes`} className="text-3xl sm:text-4xl">
          Sizes and materials
        </h2>
        <p className="mt-2 max-w-3xl text-lg">Fixed sizes, from A4 to 1200 × 2400mm.</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Available sizes">
          {sizes.map((i) => (
            <li key={i.id} className="rounded-full border-2 border-charcoal/15 bg-white px-3 py-1.5 text-sm font-semibold">
              {i.short}
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {p.groups.map((g) => (
            <li key={g.id} className="rounded-xl border-2 border-charcoal/15 bg-white p-5">
              <h3 className="font-slab text-lg font-bold">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{g.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed">
          {p.fromPerM2 ? (
            <>
              <span className="font-bold">{p.fromPerM2Lead ?? `From $${p.fromPerM2} per m².`}</span>{" "}
              Enter a size below for an instant price on economy white vinyl, or tell us if you need premium or laminate and we'll confirm it in your quote.
            </>
          ) : (
            <>
              <span className="font-bold">From {money(fromPrice(p))}.</span> Every vinyl job is priced on quote, so send us your sizes and quantities and we'll email you a quote with freight included.
            </>
          )}
        </p>
        {p.customKinds ? (
          <CustomSizeQuote
            kinds={p.customKinds}
            defaultKind={p.customKinds[0]?.kind}
            intro={p.customIntro}
            finishing={p.customFinishing}
            quoteSlug={p.slug}
          />
        ) : (
          <a href={quoteHref(p.slug)} className="btn-rust mt-6 inline-block">
            Get a quote
          </a>
        )}
      </div>
    </section>
  );
}

export default function GearPage({ product: p }: { product: GearProduct }) {
  const mailSubject = encodeURIComponent(`Artwork template: ${p.teaserTitle}`);
  const [material, setMaterial] = useState(p.groups[0]?.id ?? "");
  const activeGroup = p.groups.find((g) => g.id === material) ?? p.groups[0];

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
                onClick={() => scrollToId(p.quoteOnly ? "sizes" : "prices")}
              >
                {p.quoteOnly ? "See sizes" : "See prices"}
              </button>
              <a href={quoteHref(p.slug)} className="btn-ghost-light">
                Get a quote
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/85">
              No artwork? Send your logo and wording and we'll set it up.{" "}
              <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Artwork help</a>
            {" "}
              Have a file ready? <a href="/check-artwork/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Check your artwork free</a> or read our{" "}
              <a href="/guides/print-ready-artwork/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">print-ready artwork guide</a>.
            </p>
            {PAIRS[p.slug] && (
              <p className="mt-3 text-sm text-cream/85">
                {PAIRS[p.slug]!.lead}{" "}
                {PAIRS[p.slug]!.links.map((l, n) => (
                  <span key={l.href}>
                    {n > 0 && " and "}
                    <a href={l.href} className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">{l.text}</a>
                  </span>
                ))}
                .
              </p>
            )}
            {p.fromPerM2 ? (
              <>
                <p className="mt-5 text-sm font-semibold text-cream/80">
                  {p.fromPerM2Lead ?? `From $${p.fromPerM2} per m²`}
                </p>
              </>
            ) : (
              <p className="mt-5 text-sm font-semibold text-cream/80">
                From {money(fromPrice(p))}
              </p>
            )}
          </div>
          <MockupImage
            mockup={p.hero}
            square
            eager
            sizes="(min-width: 768px) 448px, calc(100vw - 32px)"
            className="mx-auto w-full max-w-md rounded-xl shadow-xl ring-4 ring-rust/70"
          />
        </div>
      </section>
      {p.quoteOnly ? (
        <QuoteOnlyPanel p={p} />
      ) : (
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
            {p.bands.length > 1
              ? "Price each, in Australian dollars, by how many of the same item you order."
              : "Price each, in Australian dollars."}
          </p>
          {p.singlePriceNote && <p className="mt-3 max-w-3xl">{p.singlePriceNote}</p>}
          {p.materialTabs && activeGroup && (
            <>
              <div role="tablist" aria-label="Material" className="mt-6 flex flex-wrap gap-2">
                {p.groups.map((g) => {
                  const on = g.id === activeGroup.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      role="tab"
                      id={`${p.slug}-tab-${g.id}`}
                      aria-selected={on}
                      aria-controls={`${p.slug}-prices-${g.id}`}
                      onClick={() => setMaterial(g.id)}
                      className={`min-h-11 rounded-full border-2 px-4 text-sm font-bold ${on ? "border-charcoal bg-charcoal text-cream" : "border-charcoal/20 bg-white hover:border-charcoal"}`}
                    >
                      {g.title}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed">{activeGroup.text}</p>
            </>
          )}
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
              {p.groups.map((g) => {
                const on = !p.materialTabs || g.id === activeGroup?.id;
                return (
                <tbody
                  key={g.id}
                  id={`${p.slug}-prices-${g.id}`}
                  role={p.materialTabs ? "tabpanel" : undefined}
                  aria-labelledby={p.materialTabs ? `${p.slug}-tab-${g.id}` : undefined}
                  hidden={p.materialTabs ? !on : undefined}
                  className={`${on ? "" : "hidden "}divide-y divide-charcoal/10`}
                >
                  {!p.materialTabs && (
                  <tr className="bg-cream">
                    <th
                      scope="colgroup"
                      colSpan={p.bands.length + 2}
                      className={`${td} font-slab text-lg font-bold`}
                    >
                      {g.title}
                    </th>
                  </tr>
                  )}
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
                            href={quoteHref(p.slug, p.materialTabs ? quoteSizeId(i) : i.id, p.materialTabs ? { option: i.group } : {})}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
                );
              })}
            </table>
          </div>
          <div className="mt-6 flex max-w-3xl flex-col gap-1.5 text-sm leading-relaxed">
            {p.addon && (
              <p>
                <strong>{p.addon.note}</strong>
              </p>
            )}
            {p.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
            {extraPriceNotes(p.notes).map((n) => (
              <p key={n} className="font-semibold">
                {n.replace(/\.$/, "")}.
              </p>
            ))}
          </div>
          {p.customKinds && (
            <CustomSizeQuote
              kinds={p.customKinds}
              defaultKind={p.customKinds[0]?.kind}
              intro={p.customIntro}
              finishing={p.customFinishing}
              quoteSlug={p.slug}
            />
          )}
        </div>
      </section>
      )}

      <TrustStrip tone="dark" />
      {p.slug === "banners" && <MeshBannerInfo />}

      <MockupGallery id={`${p.slug}-mockups`} heading={p.galleryHeading} items={p.gallery} exclude={p.galleryIncludesHero ? undefined : p.hero.slug} />
      {p.sizeFinish && (
        <MockupGallery id="size-finish" heading="Size and finish" compact note="Example images. Your print uses your artwork." items={p.sizeFinish} />
      )}

      {!p.quoteOnly && (
      <section
        aria-labelledby={`${p.slug}-types`}
        className="bg-sage-light py-14 sm:py-16"
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
      )}

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

      {(SEO_SLUGS as readonly string[]).includes(p.slug) && <ProductSeo slug={p.slug as (typeof SEO_SLUGS)[number]} />}

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
