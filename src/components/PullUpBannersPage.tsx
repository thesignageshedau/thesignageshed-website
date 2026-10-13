import ArtworkCheckLink from "./ArtworkCheckLink";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import QuoteLink from "./QuoteLink";
import { useState, type ReactNode } from "react";
import { QUOTE_EMAIL, TURNAROUND, aud } from "../data/mediaWalls";
import {
  DOWNLOAD_GROUPS,
  FROM_PRICE,
  MATERIAL,
  PRICE_NOTES,
  SIZES,
  type QuoteChoice,
} from "../data/pullUpBanners";
import { asset } from "../lib/asset";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { MOCKUPS } from "../data/mockups";
import PullUpBannerQuoteForm from "./PullUpBannerQuoteForm";

const types = [
  {
    title: "Luxury pull up banner",
    text: "Our heavier-duty single sided stand with a solid aluminium base and a 3 year warranty. 850mm wide in a silver or black base, or 1200mm wide in silver.",
  },
  {
    title: "Double sided pull up banner",
    text: "Two printed banners, one rolling out of each side of the base, so it works in the middle of a room or a walkway. Silver base, 3 year warranty.",
  },
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Luxury or double sided?",
    a: (
      <>
        A Luxury stand has one printed banner, so it suits a spot against a wall
        or at the back of your stand. A double sided stand has a banner on each
        side, so people see your message from both directions. That suits the
        middle of a room, a walkway or a shopfront.
      </>
    ),
  },
  {
    q: "Which size do I need?",
    a: (
      <>
        850 × 2000mm is the standard size and fits most spaces. 1200mm wide gives
        you more room for your message. Both are 2000mm tall.
      </>
    ),
  },
  {
    q: "Can you help with the artwork?",
    a: (
      <>
        Yes. If you have print-ready artwork, use the artwork guide and template
        for your stand and size below. If not, choose "Yes" for design help in
        the quote form and send us your logo and brand details. We'll set the
        artwork up for you and include any design time in your quote.
      </>
    ),
  },
  {
    q: "Will I see a proof before it's printed?",
    a: (
      <>
        Always. We send you a digital proof showing how your artwork sits on the
        banner, and nothing is printed until you approve it in writing.
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
    q: "How do I pay?",
    a: (
      <>
        Once you're happy with the quote, we send you an invoice or a secure payment link to pay by card.
      </>
    ),
  },
  {
    q: "Can I use it outside?",
    a: (
      <>
        Pull up banners are made for indoor use. Outside, the banner catches the
        wind like a sail and can tip over, so keep it under cover.
      </>
    ),
  },
  {
    q: "Do the prices include GST?",
    a: <>Prices are final, no GST added.</>,
  },
];

const scrollToId = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

const th = "px-2 py-3 font-slab text-sm font-bold sm:px-4 sm:text-base";
const td = "px-2 py-3 sm:px-4";
const priceTd = "px-2 py-3 font-bold text-rust-dark sm:px-4 sm:text-lg";

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

export default function PullUpBannersPage() {
  const [choice, setChoice] = useState<QuoteChoice>({
    stand: "luxury",
    size: "",
    base: "silver",
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
            <p className="eyebrow mt-8">Printed pull up banners, delivered Australia-wide</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Pull up banners for expos, shopfronts and events
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Luxury and double sided pull up banners, printed with your
              artwork. 850mm or 1200mm wide, 2000mm tall. Quick to set up, light to carry. {MATERIAL}
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
              From {aud(FROM_PRICE)} · {PRICE_NOTES.join(" · ")}
            </p>
          </div>
          <MockupImage
            mockup={MOCKUPS.pullUpLuxury}
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
        exclude={MOCKUPS.pullUpLuxury.slug}
        items={[MOCKUPS.pullUpLuxury, MOCKUPS.pullUpDouble]}
      />

      {/* Types */}
      <section
        aria-labelledby="types-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="types-heading" className="text-3xl sm:text-4xl">
            Choose your stand
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
            Every stand comes with your printed banner fitted and a carry bag.
            Printed in full colour on tear-resistant, low-curl blockout PVC.
            Price per stand, including printing your artwork.
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
          <p className="mt-2 max-w-2xl text-lg">
            Every size, per stand in Australian dollars, including the stand,
            printing your artwork and a carry bag.{" "}
            <strong>{PRICE_NOTES.join(". ")}.</strong>
          </p>
          <p className="mt-4 text-sm font-semibold text-charcoal/70 sm:hidden" aria-hidden="true">Swipe sideways to see all prices →</p>
          <div className="relative mt-8 overflow-x-auto rounded-xl border-2 border-charcoal/15 bg-white">
            <table className="w-full text-left">
              <caption className="sr-only">Pull up banner prices</caption>
              <thead className="bg-charcoal text-cream">
                <tr>
                  <th scope="col" className={th}>
                    <span className="sm:hidden">Size</span>
                    <span className="hidden sm:inline">Size (W × H)</span>
                  </th>
                  <th scope="col" className={th}>
                    Luxury
                    <span className="block text-xs font-normal text-cream/75">
                      single sided
                    </span>
                  </th>
                  <th scope="col" className={th}>
                    Double sided
                    <span className="block text-xs font-normal text-cream/75">
                      two banners
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {SIZES.map((s) => (
                  <tr key={s.id} className="odd:bg-cream-light/60">
                    <th scope="row" className={`${td} font-bold`}>
                      {s.label}
                      {s.shoppingCentre && (
                        <span className="block text-xs font-normal text-charcoal/70">
                          1400mm max height incl. base
                        </span>
                      )}
                    </th>
                    {(["luxury", "double"] as const).map((st) => (
                      <td key={st} className={priceTd}>
                        <span className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                          {aud(s.price[st])}
                          <QuoteButton
                            label={`${st === "luxury" ? "Luxury" : "Double sided"} ${s.label}`}
                            href={quoteHref("pull-up-banners", s.id)}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <p>
              <strong>Base colour:</strong> 850mm Luxury stands come in silver or
              black (same price). 1200mm Luxury and all double sided stands are
              silver.
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
            Each guide shows the artwork size, bleed, safe area and the base zone
            to keep text out of. The templates are full size (100% scale) PDFs
            you can design on; double sided templates have a front and a back
            page. Send a print-ready PDF with your quote request, or ask us for
            design help.
          </p>
          <ArtworkCheckLink product="pull-up-banners" />
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
                          data-track={`pull-up-banner-guide-${g.title} ${d.label}`}
                        >
                          Artwork guide (PDF)
                        </a>
                        <a
                          href={asset(d.template)}
                          download
                          className="inline-flex min-h-11 items-center text-rust-dark underline underline-offset-4 hover:text-rust-deeper"
                          data-track={`pull-up-banner-template-${g.title} ${d.label}`}
                        >
                          Artwork template (PDF)
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
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
          <QuoteLink slug="pull-up-banners" />
          <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
            <div className="mb-6"><TrustStrip /></div>
            <PullUpBannerQuoteForm choice={choice} setChoice={setChoice} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="pu-faq-heading"
        className="bg-cream py-14 sm:py-16"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="pu-faq-heading" className="text-3xl sm:text-4xl">
            Pull up banner FAQ
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
