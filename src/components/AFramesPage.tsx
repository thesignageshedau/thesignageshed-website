import { quoteHref } from "../data/quoteProducts";
import QuoteLink from "./QuoteLink";
import { useState, type ReactNode } from "react";
import { QUOTE_EMAIL, TURNAROUND } from "../data/mediaWalls";
import {
  DOWNLOAD_GROUPS,
  FROM_PRICE,
  ITEMS,
  PRICE_NOTES,
  QTY_COLUMNS,
  TYPES,
  money,
  type QuoteChoice,
} from "../data/aFrames";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { MOCKUPS } from "../data/mockups";
import AFrameQuoteForm from "./AFrameQuoteForm";
import {
  DownloadGroup,
  FaqList,
  QuoteButton,
  priceTd,
  scrollToId,
  td,
  th,
} from "./PriceParts";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Which A-frame should I choose?",
    a: (
      <>
        A printed aluminium A-frame is the most durable and looks the most
        premium, for a sign that lives outside your shop every day. An insert
        A-frame is great when your message changes, because you only re-order
        the inserts. The real estate A-frame is compact and ideal for open homes
        and directions. The folding corflute A-frame is the lightest and
        cheapest, for events and short promotions.
      </>
    ),
  },
  {
    q: "What do the quantity prices mean?",
    a: (
      <>
        The prices in the table are per A-frame (or per pair of replacement
        inserts). The more you order of the same item, the lower the price each.
        For example, 5 to 9 of the same A-frame are charged at the "5 to 9"
        price each.
      </>
    ),
  },
  {
    q: "Can I buy just the inserts?",
    a: (
      <>
        Yes. Replacement inserts for our Insert and Real estate A-frames are
        sold in pairs (a front and a back), so you can change your message
        without buying a new frame.
      </>
    ),
  },
  {
    q: "Are they printed on both sides?",
    a: (
      <>
        Yes. Every A-frame has a printed front and back. Use the same design on
        both sides, or send us a different design for each side.
      </>
    ),
  },
  {
    q: "What colour are the frames?",
    a: (
      <>
        The real estate A-frame comes in black, white or red. Choose your colour
        in the quote form. Ask us if you need a particular colour for another
        frame.
      </>
    ),
  },
  {
    q: "Will it blow over?",
    a: (
      <>
        A-frames are made for outdoor use, but any sign can move in strong wind.
        Bring it inside in bad weather, and use a weight or a chain on a windy
        corner.
      </>
    ),
  },
  {
    q: "Will I see a proof before it's printed?",
    a: (
      <>
        Always. We send you a digital proof, and nothing is printed until you
        approve it in writing.
      </>
    ),
  },
  {
    q: "How long does it take?",
    a: (
      <>
        {TURNAROUND} Tell us your needed-by date in the quote form and we'll let
        you know if it's tight.
      </>
    ),
  },
  {
    q: "How much is delivery?",
    a: (
      <>
        Delivery is quoted separately, based on your postcode. We'll include it
        in your quote.
      </>
    ),
  },
  {
    q: "Do your prices include GST?",
    a: (
      <>
        Prices are final, no GST added. The price you see is the price you pay,
        plus delivery.
      </>
    ),
  },
  {
    q: "How do I pay?",
    a: (
      <>
        Once you're happy with the quote, we send you an invoice or a secure payment link to pay by card.
      </>
    ),
  },
];

export default function AFramesPage() {
  const [choice, setChoice] = useState<QuoteChoice>({
    item: "",
    colour: "Black",
    handle: "Yes",
    qty: "1",
  });


  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-20">
          <div>
            <a
              href={homeSection("top")}
              className="text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
            >
              ← Back to The Signage Shed
            </a>
            <p className="eyebrow mt-8">Printed A-frame signs</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              A-frames that bring people through the door
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Double sided sandwich boards for shopfronts, cafes, open homes and
              events. Choose printed aluminium, a frame with swappable inserts,
              a compact real estate sign or a light folding corflute A-frame.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-rust"
                onClick={() => scrollToId("prices")}
              >
                See prices
              </button>
              <button
                type="button"
                className="btn-ghost-light"
                onClick={() => scrollToId("quote")}
              >
                Request a quote
              </button>
            </div>
            <p className="mt-5 text-sm font-semibold text-cream/80">
              From {money(FROM_PRICE)} · {PRICE_NOTES.join(" · ")}
            </p>
          </div>
          <MockupImage
            mockup={MOCKUPS.aframeAluminium}
            square
            eager
            sizes="(min-width: 768px) 448px, 100vw"
            className="mx-auto w-full max-w-md rounded-xl shadow-xl ring-4 ring-rust/70"
          />
        </div>
      </section>

      {/* Mockups */}
      <MockupGallery
        id="mockups"
        items={[MOCKUPS.aframeAluminium, MOCKUPS.aframeInsert, MOCKUPS.aframeRealEstate, MOCKUPS.aframeFolding]}
      />

      {/* Types */}
      <section
        aria-labelledby="types-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="types-heading" className="text-3xl sm:text-4xl">
            Choose your A-frame
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TYPES.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border-2 border-charcoal/15 bg-white p-6"
              >
                <h3 className="font-slab text-xl font-bold">{t.title}</h3>
                <p className="mt-2 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm">
            Every A-frame is printed on both sides with your artwork. Prices
            include the frame and printing, except replacement inserts, which
            are printed inserts only.
          </p>
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
          <p className="mt-2 max-w-3xl text-lg">
            Price each, in Australian dollars, by how many of the same item you
            order. <strong>{PRICE_NOTES.join(". ")}.</strong>
          </p>
          <p className="mt-4 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">Swipe sideways to see all prices →</p>
          <div className="relative mt-8 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
            <table className="w-full text-left">
              <caption className="sr-only">A-frame prices</caption>
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th scope="col" className={th}>
                    A-frame
                  </th>
                  {QTY_COLUMNS.map((c) => (
                    <th key={c} scope="col" className={th}>
                      <span className="whitespace-nowrap">{c}</span>
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
              {TYPES.map((t) => (
                <tbody key={t.id} className="divide-y divide-charcoal/10">
                  <tr className="bg-cream">
                    <th
                      scope="colgroup"
                      colSpan={QTY_COLUMNS.length + 2}
                      className={`${td} font-slab text-lg font-bold`}
                    >
                      {t.title}
                    </th>
                  </tr>
                  {ITEMS.filter((i) => i.type === t.id).map((i) => (
                    <tr key={i.id}>
                      <th
                        scope="row"
                        className={`${td} min-w-[11rem] font-bold`}
                      >
                        {i.replacement
                          ? "Replacement inserts (pair)"
                          : "A-frame"}{" "}
                        {i.size}
                        <span className="block text-xs font-normal text-charcoal/70">
                          {i.includes}
                        </span>
                      </th>
                      {i.price.map((p, n) => (
                        <td key={QTY_COLUMNS[n]} className={priceTd}>
                          {money(p)}
                        </td>
                      ))}
                      <td className={td}>
                        <QuoteButton
                          label={i.label}
                          href={quoteHref("a-frames", i.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              <strong>Real estate frame colour:</strong> black, white or red
              (same price).
            </p>
            <p>
              <strong>Folding corflute:</strong> carry handle cut-out optional
              (same price).
            </p>
            <p>
              <strong>Replacement inserts:</strong> small orders have a minimum
              charge, so the price per pair drops a lot from 5 pairs.
            </p>
            {PRICE_NOTES.map((n) => (
              <p key={n} className="font-semibold">
                {n}.
              </p>
            ))}
            <p>{TURNAROUND}</p>
          </div>
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
            Each guide shows the artwork size, bleed and safe area for that
            A-frame. The templates are full size (100% scale) PDFs with a front
            and a back page. Replacement inserts use the same guide and template
            as their A-frame. Send a print-ready PDF with your quote request, or
            ask us for design help.
          </p>
          <div className="mt-6 space-y-3">
            {DOWNLOAD_GROUPS.map((g) => (
              <DownloadGroup
                key={g.title}
                title={g.title}
                items={g.items}
                track="a-frame"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="scroll-mt-20 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="quote-heading" className="text-3xl sm:text-4xl">
            Request a quote
          </h2>
          <p className="mt-2 text-lg leading-relaxed">
            Tell us what you need and we'll email you a quote with delivery
            included, usually within one business day.
          </p>
          <QuoteLink slug="a-frames" />
          <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
            <AFrameQuoteForm choice={choice} setChoice={setChoice} />
          </div>
        </div>
      </section>

      <FaqList
        id="af-faq-heading"
        title="A-frame FAQ"
        faqs={faqs}
        email={QUOTE_EMAIL}
      />
    </>
  );
}
