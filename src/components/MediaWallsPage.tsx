import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import QuoteLink from "./QuoteLink";
import { useState, type ReactNode } from "react";
import {
  DOWNLOADS,
  LED_PACK,
  PRICE_NOTES,
  QUOTE_EMAIL,
  SIZES,
  TURNAROUND,
  aud,
  type QuoteChoice,
} from "../data/mediaWalls";
import { asset } from "../lib/asset";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { MOCKUPS } from "../data/mockups";
import MediaWallQuoteForm from "./MediaWallQuoteForm";

const included = [
  {
    title: "Frame",
    text: "A lightweight aluminium tube frame that pushes together without tools, with two feet to stand it up.",
  },
  {
    title: "Printed fabric",
    text: "A fabric sock printed edge to edge with your artwork. It pulls over the frame and zips closed at the bottom, so it sits smooth and crease-free.",
  },
  {
    title: "Carry bag",
    text: "A padded bag that holds the frame and fabric, so it's easy to take to the next event.",
  },
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Can you help with the artwork?",
    a: (
      <>
        Yes. If you have print-ready artwork, use the artwork guide and template
        for your size below. If not, choose "Yes" for design help in the quote
        form and send us your logo and brand details. We'll set the artwork up
        for you and include any design time in your quote.
      </>
    ),
  },
  {
    q: "Will I see a proof before it's printed?",
    a: (
      <>
        Always. We send you a digital proof of how your artwork sits on the
        wall, and nothing is printed until you approve it in writing.
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
        Delivery is quoted separately, based on your postcode and the size of
        the wall. We'll include it in your quote.
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
  {
    q: "Single or double-sided?",
    a: (
      <>
        Single-sided walls are printed on the front with a plain back.
        Double-sided walls are printed on both sides, which suits walls that can
        be seen from behind, like a stand in the middle of a room.
      </>
    ),
  },
  {
    q: "Do the prices include GST?",
    a: <>Prices are final, no GST added.</>,
  },
  {
    q: "Can I reuse the frame with a new print?",
    a: (
      <>
        Yes. Order a replacement printed fabric for your size and use it on the
        same frame.
      </>
    ),
  },
];

const scrollToId = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

const Check = () => (
  <svg
    viewBox="0 0 20 20"
    className="mt-1 h-4 w-4 shrink-0 fill-rust"
    aria-hidden
  >
    <path d="M7.6 14.2 3.4 10l1.4-1.4 2.8 2.8 7.6-7.6 1.4 1.4z" />
  </svg>
);

export default function MediaWallsPage() {
  const [sides, setSides] = useState<"single" | "double">("single");
  const [choice, setChoice] = useState<QuoteChoice>({
    item: "kit",
    size: "",
    sides: "single",
    led: "no",
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
              className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
            >
              ← Back to The Signage Shed
            </a>
            <p className="eyebrow mt-8">Printed media walls, delivered Australia-wide</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Media walls for events, launches and shopfronts
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Fabric sock and frame media walls, printed with your artwork.
              Three sizes from 2.4m to 4m wide, all 2.2m tall, single or
              double-sided, with optional LED lights. Quick to set up, light to
              carry.
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
              From {aud(SIZES[0]!.kit.single)} · {PRICE_NOTES.join(" · ")}
            </p>
          </div>
          <MockupImage
            mockup={MOCKUPS.mediaWallSingle}
            square
            eager
            sizes="(min-width: 768px) 448px, 100vw"
            className="mx-auto w-full max-w-md rounded-xl shadow-xl ring-4 ring-rust/70"
          />
        </div>
      </section>
      <TrustStrip tone="dark" />

      {/* Mockups */}
      <MockupGallery
        id="mockups"
        exclude={MOCKUPS.mediaWallSingle.slug}
        heading="Single sided, double sided or LED backlit"
        items={[MOCKUPS.mediaWallSingle, MOCKUPS.mediaWallDouble, MOCKUPS.mediaWallLed]}
      />

      {/* Prices */}
      <section
        id="prices"
        aria-labelledby="prices-heading"
        className="scroll-mt-20 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="prices-heading" className="text-3xl sm:text-4xl">
                Prices
              </h2>
              <p className="mt-2 max-w-2xl text-lg">
                Fabric sock and frame media walls, 2.2m tall. Prices are per
                wall in Australian dollars and include printing your artwork.
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Print"
              className="inline-flex rounded-lg border-2 border-charcoal bg-white p-1"
            >
              {(["single", "double"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={sides === s}
                  onClick={() => setSides(s)}
                  className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${sides === s ? "bg-charcoal text-cream" : "text-charcoal hover:bg-cream"}`}
                >
                  {s === "single" ? "Single-sided" : "Double-sided"}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">Swipe sideways to see all prices →</p>
          <div className="relative mt-6 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
            <table className="w-full text-left">
              <caption className="sr-only">
                Media wall prices,{" "}
                {sides === "single" ? "single-sided" : "double-sided"} print
              </caption>
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 sm:px-4 font-slab text-sm font-bold sm:text-base"
                  >
                    <span className="sm:hidden">Size</span>
                    <span className="hidden sm:inline">Size (W × H)</span>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 sm:px-4 font-slab text-sm font-bold sm:text-base"
                  >
                    Complete kit
                    <span className="hidden text-xs font-normal text-cream/75 sm:block">
                      frame, print, bag
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 sm:px-4 font-slab text-sm font-bold sm:text-base"
                  >
                    <span className="sm:hidden">Print only</span>
                    <span className="hidden sm:inline">Replacement print</span>
                    <span className="hidden text-xs font-normal text-cream/75 sm:block">
                      fabric only
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="hidden px-2 py-3 sm:table-cell sm:px-4"
                  >
                    <span className="sr-only">Quote</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {SIZES.map((s) => (
                  <tr key={s.id} className="odd:bg-cream-light/60">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-2 py-3 sm:px-4 font-bold"
                    >
                      {s.label}
                    </th>
                    <td className="px-2 py-3 font-bold text-rust-dark sm:px-4 sm:text-lg">
                      {aud(s.kit[sides])}
                    </td>
                    <td className="px-2 py-3 sm:px-4">
                      {aud(s.fabric[sides])}
                    </td>
                    <td className="hidden px-2 py-3 text-right sm:table-cell sm:px-4">
                      <a
                        href={quoteHref("media-walls", s.id)}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap rounded-md border-2 border-charcoal px-3 text-sm font-bold hover:bg-charcoal hover:text-cream"
                      >
                        Quote<span className="sr-only"> for {s.label}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              <strong>Add-on:</strong> clamp-on LED lights, pack of 2,{" "}
              {aud(LED_PACK)} per wall (fits any size).
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

      {/* What's included */}
      <section
        aria-labelledby="included-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="included-heading" className="text-3xl sm:text-4xl">
            What's included
          </h2>
          <p className="mt-2 text-lg">Every complete kit comes with:</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {included.map((i) => (
              <div
                key={i.title}
                className="rounded-xl border-2 border-charcoal/15 bg-white p-6"
              >
                <h3 className="flex gap-2 font-slab text-xl font-bold">
                  <Check />
                  {i.title}
                </h3>
                <p className="mt-2 leading-relaxed">{i.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm">
            Standard fabric sock. For indoor use.
          </p>
        </div>
      </section>

      {/* Artwork */}
      <section
        id="artwork"
        aria-labelledby="artwork-heading"
        className="scroll-mt-20 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="artwork-heading" className="text-3xl sm:text-4xl">
            Artwork guides and templates
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">
            Each guide covers the artwork size, bleed, safe area and file setup
            for that wall. The template is a 10% scale PDF you can design on.
            Send a print-ready PDF with your quote request, or ask us for design
            help.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOWNLOADS.map((d) => (
              <li
                key={d.label}
                className="rounded-xl border-2 border-charcoal/15 bg-white p-5"
              >
                <p className="font-slab text-lg font-bold">
                  {d.label} media wall
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
                  <a
                    href={asset(d.guide)}
                    download
                    className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                    data-track={`media-wall-guide-${d.label}`}
                  >
                    Artwork guide (PDF)
                  </a>
                  <a
                    href={asset(d.template)}
                    download
                    className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                    data-track={`media-wall-template-${d.label}`}
                  >
                    Artwork template (PDF)
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="scroll-mt-20 bg-cream py-14 sm:py-16"
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
          <QuoteLink slug="media-walls" />
          <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
            <div className="mb-6"><TrustStrip /></div>
            <MediaWallQuoteForm choice={choice} setChoice={setChoice} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="mw-faq-heading" className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="mw-faq-heading" className="text-3xl sm:text-4xl">
            Media wall FAQ
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
