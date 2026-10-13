import CorflutePrices from "./CorflutePrices";
import QuoteCta from "./QuoteCta";
import ArtworkCheckLink from "./ArtworkCheckLink";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import { type ReactNode } from "react";
import { QUOTE_EMAIL, TURNAROUND } from "../data/mediaWalls";
import {
  DOWNLOADS,
  EXTRA_DESIGN,
  EYELET_EACH,
  FROM_PRICE,
  MATERIAL,
  PRICE_NOTES,
  SIZES,
  money,
  type Thickness,
} from "../data/corfluteSigns";
import { homeSection } from "../lib/routes";
import MockupImage from "./MockupImage";
import MockupGallery from "./MockupGallery";
import { MOCKUPS } from "../data/mockups";
import {
  DownloadGroup,
  FaqList,
  scrollToId,
} from "./PriceParts";

const types = [
  {
    title: "Premium 5mm corflute",
    text: "Australian-made corrugated plastic: light, waterproof and stiff enough for wind and rain. Printed in full colour, portrait or landscape.",
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
        The price you see is the price you pay,
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

export default function CorfluteSignsPage() {

  const thick: Thickness = "5mm";


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
            <p className="eyebrow mt-8">Printed corflute signs, delivered Australia-wide</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Corflute signs for events, sites and sales
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Tough, light, weatherproof signs in 3 standard sizes, printed on
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
              <a href={quoteHref("corflute-signs")} className="btn-ghost-light">
                Get a quote
              </a>
            </div>
            <p className="mt-5 text-sm font-semibold text-cream/80">
              From {money(FROM_PRICE)} for up to 5 signs ·
            </p>
          </div>
          <MockupImage
            mockup={MOCKUPS.corfluteShopfront}
            square
            eager
            sizes="(min-width: 768px) 448px, 100vw"
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
          <p className="mt-2 max-w-3xl text-lg">
            Per sign and in total, in Australian dollars. Choose your size,
            sides and how many you need.
          </p>
          <CorflutePrices thick={thick} />
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

      <TrustStrip tone="dark" />

      {/* Mockups */}
      <MockupGallery
        id="mockups"
        exclude={MOCKUPS.corfluteShopfront.slug}
        items={[MOCKUPS.corfluteShopfront, MOCKUPS.corfluteFence]}
      />

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
            Prices include printing your artwork on 5mm corflute. Stakes
            and frames aren't included. Eyelets and extra designs are optional
            extras.
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
            Each guide shows the artwork size, bleed and safe area, and where
            eyelets go. The templates are full size (100% scale) PDFs you can
            design on, with a front and a back page for double sided signs. Send
            a print-ready PDF with your quote request, or ask us for design
            help.
          </p>
          <ArtworkCheckLink product="corflute-signs" />
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

      <QuoteCta slug={"corflute-signs"} label={"corflute signs"} />

      <FaqList
        id="cf-faq-heading"
        title="Corflute sign FAQ"
        faqs={faqs}
        email={QUOTE_EMAIL}
      />
    </>
  );
}
