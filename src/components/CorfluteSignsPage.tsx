import { useState, type ReactNode } from "react";
import { QUOTE_EMAIL, TURNAROUND } from "../data/mediaWalls";
import {
  COLUMNS,
  DOWNLOADS,
  EXTRA_DESIGN,
  EYELET_EACH,
  FROM_PRICE,
  MATERIAL,
  PRICE_NOTES,
  SIDES,
  SIZES,
  THICKNESSES,
  money,
  normalise,
  type QuoteChoice,
  type Sides,
  type Thickness,
} from "../data/corfluteSigns";
import { homeSection } from "../lib/routes";
import CorfluteArt from "./CorfluteArt";
import CorfluteQuoteForm from "./CorfluteQuoteForm";
import {
  DownloadGroup,
  FaqList,
  QuoteButton,
  priceTd,
  scrollToId,
  td,
  th,
} from "./PriceParts";

const types = [
  {
    title: "Premium corflute, 5mm or 3mm",
    text: "Australian-made corrugated plastic: light and waterproof. 5mm is our standard, stiff enough for wind and rain. 3mm is lighter and costs less on most sizes, for short-term signs. Printed in full colour.",
  },
  {
    title: "Single or double sided",
    text: "Print one side for walls, fences and windows, or both sides for signs people see from two directions, like stakes and roadsides.",
  },
  {
    title: "Bundle pricing",
    text: "Up to 5 signs, or 6 to 10 signs, is one flat price for the whole bundle. From 11 signs you pay per sign, and the price per sign drops as you order more.",
  },
];

// Worked example for the flat bundle explanation (uses the smallest size).
const ex = SIZES[0];
const exBundle = ex.price["5mm"].single.upTo5;

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "How does the bundle price work?",
    a: (
      <>
        Orders of up to 5 signs, and orders of 6 to 10 signs, are a flat price
        for the whole bundle, not a price per sign. For example, 1, 3 or 5
        single sided {ex.label} signs are {money(exBundle)} in total. From 11
        signs the price is per sign, and it gets cheaper at 20, 50 and 100
        signs. Each design in a bundle can be the same or different (see extra
        designs below).
      </>
    ),
  },
  {
    q: "5mm or 3mm?",
    a: (
      <>
        5mm is our standard: it's noticeably stiffer, so it stays flat in the
        wind and lasts longer outdoors. Choose it for signs on stakes, fences
        and building sites, or anything that needs to last. 3mm is lighter and a
        little cheaper on bigger runs, and suits short-term and indoor signs,
        like events, open homes, sales and directions.
      </>
    ),
  },
  {
    q: "Are stakes or frames included?",
    a: (
      <>
        No. Prices are for the printed corflute sign only. Stakes, frames and
        cable ties aren't included. Add eyelets if you want to fix the sign to a
        fence or wall with cable ties or rope.
      </>
    ),
  },
  {
    q: "What are eyelets and what do they cost?",
    a: (
      <>
        Eyelets are clear 25mm reinforced holes for cable ties, rope or hooks.
        They're {money(EYELET_EACH)} per eyelet per sign:{" "}
        {money(EYELET_EACH * 4)} a sign for one in each corner, or{" "}
        {money(EYELET_EACH * 2)} a sign for 2. Need them somewhere else? Choose
        "Other positions" and tell us where.
      </>
    ),
  },
  {
    q: "Can I have different designs in one order?",
    a: (
      <>
        Yes. One design is included in the price, and each extra design is{" "}
        {money(EXTRA_DESIGN)}. For example, 10 signs with 3 different designs
        adds {money(EXTRA_DESIGN * 2)}.
      </>
    ),
  },
  {
    q: "Which way do the flutes run?",
    a: (
      <>
        Corflute has hollow channels (flutes) running through it. If you're
        pushing the sign onto stakes, the flutes need to run up and down. Tell
        us in the notes how you'll mount your signs and we'll print them the
        right way.
      </>
    ),
  },
  {
    q: "Can you do custom sizes or shapes?",
    a: (
      <>
        Our standard sizes are listed above. For a custom size or a cut-out
        shape, email us or mention it in the quote form notes and we'll quote it
        for you.
      </>
    ),
  },
  {
    q: "Will I see a proof before it's printed?",
    a: (
      <>
        Always. We send you a digital proof of every design, and nothing is
        printed until you approve it in writing.
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
        There's nothing to pay online. Once you're happy with the quote and the
        order is confirmed, we email you an invoice to pay by bank transfer.
      </>
    ),
  },
];

export default function CorfluteSignsPage() {
  const [choice, setChoice] = useState<QuoteChoice>({
    size: "",
    thickness: "5mm",
    sides: "single",
    eyelets: "none",
    designs: "1",
    qty: "5",
  });

  const [thick, setThick] = useState<Thickness>("5mm");

  function quoteFor(sides: Sides, size: string) {
    setChoice(normalise({ ...choice, thickness: thick, sides, size }));
    scrollToId("quote");
  }

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
            <p className="eyebrow mt-8">Printed corflute signs</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Corflute signs for events, sites and sales
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Tough, light, weatherproof signs in 5 standard sizes, printed on
              one side or both. Bundle pricing makes small runs simple: up to 5
              signs is one flat price. {MATERIAL}
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
              From {money(FROM_PRICE)} for up to 5 signs ·{" "}
              {PRICE_NOTES.join(" · ")}
            </p>
          </div>
          <CorfluteArt className="mx-auto w-full max-w-md drop-shadow-xl" />
        </div>
      </section>

      {/* Types */}
      <section
        aria-labelledby="types-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="types-heading" className="text-3xl sm:text-4xl">
            Premium corflute signs
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
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
            Prices include printing your artwork on 5mm or 3mm corflute. Stakes
            and frames aren't included. Eyelets and extra designs are optional
            extras.
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
            In Australian dollars, for printed corflute signs. Choose a
            thickness to see its prices.{" "}
            <strong>{PRICE_NOTES.join(". ")}.</strong>
          </p>
          <div className="mt-6 max-w-3xl rounded-xl border-2 border-rust bg-cream px-5 py-4">
            <p className="font-slab text-lg font-bold">
              Bundle prices are flat prices
            </p>
            <p className="mt-1 leading-relaxed">
              The <strong>1 to 5 signs</strong> and{" "}
              <strong>6 to 10 signs</strong> prices are one flat price for the
              whole order, not a price per sign. For example, 1, 3 or 5 single
              sided {ex.label} signs are {money(exBundle)} in total. From 11
              signs you pay the price shown <strong>per sign</strong>.
            </p>
          </div>
          <div
            role="radiogroup"
            aria-label="Corflute thickness"
            className="mt-8 inline-flex rounded-lg border-2 border-charcoal bg-white p-1"
          >
            {THICKNESSES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={thick === t.id}
                onClick={() => setThick(t.id)}
                className={`rounded-md px-3 py-2 font-slab font-bold sm:px-5 ${
                  thick === t.id
                    ? "bg-charcoal text-cream"
                    : "text-charcoal hover:bg-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {SIDES.map((side) => (
            <div key={side.id} className="mt-8">
              <h3 className="font-slab text-2xl font-bold">
                {side.label}, {thick} corflute
              </h3>
              <div className="relative mt-3 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    {side.label} {thick} corflute sign prices
                  </caption>
                  <thead className="bg-charcoal text-cream">
                    <tr>
                      <th scope="col" className={th}>
                        Size (W × H)
                      </th>
                      {COLUMNS.map((c) => (
                        <th key={c.key} scope="col" className={th}>
                          <span className="whitespace-nowrap">{c.label}</span>
                          <span className="block whitespace-nowrap text-xs font-normal text-cream/75">
                            {c.flat ? "flat price, total" : "per sign"}
                          </span>
                        </th>
                      ))}
                      <th scope="col" className={th}>
                        <span className="sr-only">Quote</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10">
                    {SIZES.map((s) => (
                      <tr key={s.id} className="odd:bg-cream-light/60">
                        <th
                          scope="row"
                          className={`${td} whitespace-nowrap font-bold`}
                        >
                          {s.label}
                          <span className="block text-xs font-normal text-charcoal/70">
                            {s.orientation}
                          </span>
                        </th>
                        {COLUMNS.map((c) => (
                          <td key={c.key} className={priceTd}>
                            {money(s.price[thick][side.id][c.key])}
                          </td>
                        ))}
                        <td className={td}>
                          <QuoteButton
                            label={`${side.label} ${thick} ${s.label}`}
                            onClick={() => quoteFor(side.id, s.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              <strong>Eyelets:</strong> {money(EYELET_EACH)} per eyelet, per
              sign ({money(EYELET_EACH * 4)} a sign for 4 corners).
            </p>
            <p>
              <strong>Extra designs:</strong> {money(EXTRA_DESIGN)} each (one
              design included).
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
            Each guide shows the artwork size, bleed and safe area, and where
            eyelets go. The templates are full size (100% scale) PDFs you can
            design on, with a front and a back page for double sided signs. Send
            a print-ready PDF with your quote request, or ask us for design
            help.
          </p>
          <div className="mt-6 space-y-3">
            <DownloadGroup
              title="Corflute sign sizes"
              items={DOWNLOADS}
              track="corflute"
              open
            />
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
          <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
            <CorfluteQuoteForm choice={choice} setChoice={setChoice} />
          </div>
        </div>
      </section>

      <FaqList
        id="cf-faq-heading"
        title="Corflute sign FAQ"
        faqs={faqs}
        email={QUOTE_EMAIL}
      />
    </>
  );
}
