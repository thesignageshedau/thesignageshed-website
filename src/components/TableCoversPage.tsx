import { TierTable } from "./PriceParts";
import QuoteCta from "./QuoteCta";
import ArtworkCheckLink from "./ArtworkCheckLink";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import { type ReactNode } from "react";
import { QUOTE_EMAIL, TURNAROUND, aud } from "../data/mediaWalls";
import {
  DOWNLOAD_GROUPS,
  FROM_PRICE,
  MATERIAL,
  PRICE_NOTES,
  ROUNDS,
  RUNNERS,
  RUNNER_CUSTOM,
  THROWS,
} from "../data/tableCovers";
import { asset } from "../lib/asset";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { MOCKUPS } from "../data/mockups";

const types = [
  {
    title: "Fitted table throws",
    text: "Sewn down each corner so the cover sits neat and square over the table, like a box. The sharpest look for trade stands.",
  },
  {
    title: "Loose table throws",
    text: "A printed cloth that drapes over the table with soft corners. Quick to put on and easy to fold away.",
  },
  {
    title: "Round table throws",
    text: "One round piece of fabric for round tables, hanging to the floor (full drop) or about halfway down (half drop).",
  },
  {
    title: "Table runners",
    text: "A printed strip that runs over your own tablecloth. It hangs down the front of the table. Any size on request.",
  },
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What's the difference between fitted and loose throws?",
    a: (
      <>
        A fitted throw is sewn at each corner so it sits square and crisp on the
        table, with straight drops. A loose throw is a flat cloth that drapes
        over the table, so the corners fall into soft folds. Fitted looks
        sharper; loose is a little cheaper and more forgiving if your table
        isn't a standard size.
      </>
    ),
  },
  {
    q: "Should I get a 4 sided or 3 sided throw?",
    a: (
      <>
        A 4 sided throw covers the table all the way round. A 3 sided throw has
        an open back, so you can sit behind the table and reach storage
        underneath. That's handy at expos and markets where the back faces you,
        not the crowd.
      </>
    ),
  },
  {
    q: "Which size do I need?",
    a: (
      <>
        Measure your table top and match it to our sizes: 6ft tables are about 1840 × 760mm and 8ft about 2450 × 760mm, all
        around 740mm high. For round tables, measure the diameter. Not sure? Put
        your table measurements in the notes and we'll check.
      </>
    ),
  },
  {
    q: "Can you help with the artwork?",
    a: (
      <>
        Yes. If you have print-ready artwork, use the artwork guide and template
        for your product below. If not, choose "Yes" for design help in the
        quote form and send us your logo and brand details. We'll set the
        artwork up for you and include any design time in your quote.
      </>
    ),
  },
  {
    q: "Will I see a proof before it's printed?",
    a: (
      <>
        Always. We send you a digital proof showing how your artwork sits on the
        cover, and nothing is printed until you approve it in writing.
      </>
    ),
  },
  {
    q: "How long does it take?",
    a: (
      <>
        {TURNAROUND} Need it by a date? Put it in the Notes box on the quote form and
        we'll let you know if it's tight.
      </>
    ),
  },
  {
    q: "How much is delivery?",
    a: (
      <>
        Freight depends on the product's size and weight. We quote it to your
        postcode and include it on your quote.
      </>
    ),
  },
  {
    q: "How do I pay?",
    a: (
      <>
        Payment is due once your artwork is approved.
      </>
    ),
  },
  {
    q: "Can I wash it?",
    a: (
      <>
        Yes. The covers are printed polyester fabric, machine washable and
        reusable. Steam out any creases after transport, or iron on low with a
        cloth between the iron and the print.
      </>
    ),
  },
];

const scrollToId = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

const th = "px-2 py-3 font-slab text-sm font-bold sm:px-4 sm:text-base";
const td = "px-2 py-3 sm:px-4";
const priceTd = "px-2 py-3 font-bold text-rust-dark sm:px-4 sm:text-lg";
const quoteTh = "hidden px-2 py-3 sm:table-cell sm:px-4";
const quoteTd = "hidden px-2 py-3 text-right sm:table-cell sm:px-4";

function PriceTable({
  id,
  title,
  intro,
  head,
  children,
}: {
  id: string;
  title: string;
  intro: ReactNode;
  head: ReactNode;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h3 className="font-slab text-2xl font-bold">{title}</h3>
      <p className="mt-1">{intro}</p>
      <p className="mt-4 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">Swipe sideways to see all prices →</p>
      <div className="relative mt-4 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
        <table className="w-full text-left">
          <caption className="sr-only">{title} prices</caption>
          <thead className="bg-charcoal text-cream">{head}</thead>
          <tbody className="divide-y divide-charcoal/10">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function QuoteButton({
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

export default function TableCoversPage() {


  const throwTable = (style: "fitted" | "loose") => (
    <PriceTable
      id={`${style}-prices`}
      title={style === "fitted" ? "Fitted table throws" : "Loose table throws"}
      intro={
        style === "fitted"
          ? "Sewn corners for a square, tailored fit. Single-sided print."
          : "Drapes over the table with soft corners. Single-sided print."
      }
      head={
        <tr>
          <th scope="col" className={th}>
            Table size
          </th>
          <th scope="col" className={th}>
            4 sided
          </th>
          <th scope="col" className={th}>
            3 sided
            <span className="hidden text-xs font-normal text-cream/75 sm:block">
              open back
            </span>
          </th>
          <th scope="col" className={quoteTh}>
            <span className="sr-only">Quote</span>
          </th>
        </tr>
      }
    >
      {THROWS.filter((t) => t[style]).map((t) => (
        <tr key={t.id} className="odd:bg-cream-light/60">
          <th scope="row" className={`${td} font-bold`}>
            {t.label}
            <span className="block text-xs font-normal text-charcoal/70">
              fits about {t.fits}
            </span>
          </th>
          <td className={priceTd}>{aud(t[style]!.four)}</td>
          <td className={priceTd}>{aud(t[style]!.three)}</td>
          <td className={quoteTd}>
            <QuoteButton
              label={`${style} throw, ${t.label}`}
              href={quoteHref("table-covers", `${style}:${t.id}`)}
            />
          </td>
        </tr>
      ))}
    </PriceTable>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-20">
          <div>
            <a
              href={homeSection("top")}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
            >
              ← Back to The Signage Shed
            </a>
            <p className="eyebrow mt-8">Printed table covers, delivered Australia-wide</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Table covers for expos, markets and events
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Fitted and loose table throws, round throws and table runners,
              printed with your artwork. {MATERIAL}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-rust"
                onClick={() => scrollToId("prices")}
              >
                See prices
              </button>
              <a href={quoteHref("table-covers")} className="btn-ghost-light">
                Get a quote
              </a>
            </div>
            <p className="mt-4 text-sm text-cream/85">
              No artwork? Send your logo and wording and we'll set it up.{" "}
              <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Artwork help</a>
            </p>
            <p className="mt-5 text-sm font-semibold text-cream/80">
              From {aud(FROM_PRICE)}
            </p>
          </div>
          <MockupImage
            mockup={MOCKUPS.v4TableCover}
            square
            eager
            sizes="(min-width: 768px) 448px, calc(100vw - 32px)"
            className="mx-auto w-full max-w-md rounded-xl shadow-xl ring-4 ring-rust/70"
          />
        </div>
      </section>
      {/* Prices */}
      <section
        id="prices"
        aria-labelledby="prices-heading"
        className="scroll-mt-20 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="prices-heading" className="text-3xl sm:text-4xl">
            Prices
          </h2>
          <p className="mt-2 max-w-2xl text-lg">
            Every size and option, per item in Australian dollars, including
            printing your artwork.
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {throwTable("fitted")}
            {throwTable("loose")}
            <PriceTable
              id="round-prices"
              title="Round table throws"
              intro="Full drop falls to the floor; half drop hangs about halfway down."
              head={
                <tr>
                  <th scope="col" className={th}>
                    Table diameter
                  </th>
                  <th scope="col" className={th}>
                    Full drop
                  </th>
                  <th scope="col" className={th}>
                    Half drop
                  </th>
                  <th scope="col" className={quoteTh}>
                    <span className="sr-only">Quote</span>
                  </th>
                </tr>
              }
            >
              {ROUNDS.map((r) => (
                <tr key={r.id} className="odd:bg-cream-light/60">
                  <th
                    scope="row"
                    className={`${td} whitespace-nowrap font-bold`}
                  >
                    {r.id}mm
                  </th>
                  <td
                    className={
                      r.full ? priceTd : `${td} text-sm text-charcoal/70`
                    }
                  >
                    {r.full ? aud(r.full) : "Half drop only"}
                  </td>
                  <td className={priceTd}>{aud(r.half)}</td>
                  <td className={quoteTd}>
                    <QuoteButton
                      label={`round throw, ${r.label}`}
                      href={quoteHref("table-covers", `round:${r.id}`)}
                    />
                  </td>
                </tr>
              ))}
            </PriceTable>
            <PriceTable
              id="runner-prices"
              title="Table runners"
              intro="Every runner size is the same price, including custom sizes."
              head={
                <tr>
                  <th scope="col" className={th}>
                    Style
                  </th>
                  <th scope="col" className={th}>
                    Size (mm)
                  </th>
                  <th scope="col" className={th}>
                    Price
                  </th>
                  <th scope="col" className={quoteTh}>
                    <span className="sr-only">Quote</span>
                  </th>
                </tr>
              }
            >
              {(["front"] as const).flatMap((k) => [
                ...RUNNERS[k].map((r) => (
                  <tr key={`${k}-${r.id}`} className="odd:bg-cream-light/60">
                    <th
                      scope="row"
                      className={`${td} whitespace-nowrap font-bold`}
                    >
                      {k === "front" ? "Front drop" : "Side drop"}
                    </th>
                    <td className={`${td} whitespace-nowrap`}>
                      {r.label.replace("mm", "")}
                    </td>
                    <td className={priceTd}>{aud(r.price)}</td>
                    <td className={quoteTd}>
                      <QuoteButton
                        label={`${k} drop runner ${r.label}`}
                        href={quoteHref("table-covers", `${k === "front" ? "runner-front" : "runner-side"}:${r.id}`)}
                      />
                    </td>
                  </tr>
                )),
                <tr key={`${k}-custom`} className="odd:bg-cream-light/60">
                  <th
                    scope="row"
                    className={`${td} whitespace-nowrap font-bold`}
                  >
                    {k === "front" ? "Front drop" : "Side drop"}
                  </th>
                  <td className={`${td} text-sm`}>
                    Custom: {RUNNER_CUSTOM[k]}
                  </td>
                  <td className={priceTd}>
                    {aud(
                      k === "front" ? RUNNERS.frontCustom : RUNNERS.sideCustom,
                    )}
                  </td>
                  <td className={quoteTd}>
                    <QuoteButton
                      label={`custom ${k} drop runner`}
                      href={quoteHref("table-covers", `${k === "front" ? "runner-front" : "runner-side"}:${"custom"}`)}
                    />
                  </td>
                </tr>,
              ])}
            </PriceTable>
          </div>
          <TierTable title="Quantity prices" rows={THROWS.flatMap((t) => (t.fittedFourTiers ? [{ label: `Fitted throw, ${t.label}, 4 sided`, tiers: t.fittedFourTiers }] : []))} />
          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {PRICE_NOTES.map((n) => (
              <p key={n} className="font-semibold">
                {n}.
              </p>
            ))}
            <p>{TURNAROUND}</p>
          </div>
        </div>
      </section>

      <TrustStrip tone="dark" />


      <MockupGallery id="mockups" heading="Fitted cover or loose throw" items={[MOCKUPS.v4TableCover, MOCKUPS.v4TableThrow]} />

      <MockupGallery id="size-finish" heading="Size and finish" compact note="Example images. Your print uses your artwork." items={[MOCKUPS.v4FabricTexture]} />

      {/* Types */}
      <section
        aria-labelledby="types-heading"
        className="bg-sage-light py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="types-heading" className="text-3xl sm:text-4xl">
            Choose your cover
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((t) => (
              <div
                key={t.title}
                className="rounded-xl border-2 border-charcoal/15 bg-white p-6"
              >
                <h3 className="font-slab text-xl font-bold">{t.title}</h3>
                <p className="mt-2 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm">
            {MATERIAL} Hemmed edges. Price per item, including printing your
            artwork.
          </p>
        </div>
      </section>

      {/* Artwork */}
      <section
        id="artwork"
        aria-labelledby="artwork-heading"
        className="scroll-mt-20 bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="artwork-heading" className="text-3xl sm:text-4xl">
            Artwork guides and templates
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">
            Each guide shows the artwork size, bleed, safe area and where the
            folds fall. The templates are 10% scale PDFs you can design on. Send
            a print-ready PDF with your quote request, or ask us for design
            help.
          </p>
          <ArtworkCheckLink product="table-covers" />
          <div className="mt-6 space-y-3">
            {DOWNLOAD_GROUPS.map((g) => (
              <details
                key={g.title}
                className="group rounded-xl border-2 border-charcoal/15 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-slab text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {g.title}
                  <span className="flex items-center gap-3 text-sm font-normal text-charcoal/70">
                    {g.items.length} sizes
                    <span
                      aria-hidden
                      className="text-2xl leading-none text-rust transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <ul className="divide-y divide-charcoal/10 border-t border-charcoal/10">
                  {g.items.map((d) => (
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
                          data-track={`table-cover-guide-${d.label}`}
                        >
                          Artwork guide (PDF)
                        </a>
                        {d.template && (
                          <a
                            href={asset(d.template)}
                            download
                            className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                            data-track={`table-cover-template-${d.label}`}
                          >
                            Artwork template (PDF)
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteCta slug={"table-covers"} label={"table covers"} />

      {/* FAQ */}
      <section
        aria-labelledby="tc-faq-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="tc-faq-heading" className="text-3xl sm:text-4xl">
            Table cover FAQ
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
              href={`mailto:${QUOTE_EMAIL}`}
            >
              {QUOTE_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
