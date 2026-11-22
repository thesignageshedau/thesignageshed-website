import ProductSeo from "./ProductSeo";
import CorflutePrices from "./CorflutePrices";
import QuoteCta from "./QuoteCta";
import ArtworkCheckLink from "./ArtworkCheckLink";
import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";
import { type ReactNode, useState } from "react";
import { QUOTE_EMAIL, TURNAROUND } from "../data/mediaWalls";
import {
  DOWNLOADS,
  EXTRA_DESIGN,
  EYELET_EACH,
  FROM_PRICE,
  MATERIAL,
  PRICE_NOTES,
  SIZES,
  THICKNESSES,
  money,
  type Thickness,
} from "../data/corfluteSigns";
import { FROM_PER_M2, MIN_NOTE } from "../data/customSize";
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
];

export default function CorfluteSignsPage() {

  const [thick, setThick] = useState<Thickness>("5mm");

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
              Custom corflute signs for events, sites and sales
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/90">
              Tough, light, weatherproof signs in standard or custom sizes, printed on
              one side or both, in 5mm or 3mm. Bundle pricing makes small runs simple: up to 5
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
            <p className="mt-4 text-sm text-cream/85">
              No artwork? Send your logo and wording and we'll set it up.{" "}
              <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Artwork help</a>
            </p>
            <p className="mt-5 text-sm font-semibold text-cream/80">
              Custom sizes from ${FROM_PER_M2["corflute-5mm-single"]} per m². Standard sizes start at {money(FROM_PRICE)} for up to 5 signs.
            </p>
            <p className="mt-1 text-sm text-cream/80">{MIN_NOTE}</p>
          </div>
          <MockupImage
            mockup={MOCKUPS.v4Corflute}
            square
            eager
            sizes="(min-width: 768px) 448px, calc(100vw - 32px)"
            className="mx-auto aspect-square w-full max-w-md rounded-xl object-cover shadow-xl ring-4 ring-rust/70"
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
            thickness, sides and how many you need.
          </p>
          <div role="tablist" aria-label="Thickness" className="mt-6 flex flex-wrap gap-2">
            {THICKNESSES.map((thk) => {
              const on = thk.id === thick;
              return (
                <button
                  key={thk.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setThick(thk.id)}
                  className={`min-h-11 rounded-full border-2 px-4 text-sm font-bold ${on ? "border-charcoal bg-charcoal text-cream" : "border-charcoal/20 bg-white hover:border-charcoal"}`}
                >
                  {thk.label}
                </button>
              );
            })}
          </div>
          <CorflutePrices thick={thick} />
          <div className="mt-6 flex max-w-3xl flex-col gap-1.5 text-sm leading-relaxed">
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
                {n.replace(/\.$/, "")}.
              </p>
            ))}
            <p>{TURNAROUND}</p>
          </div>
        </div>
      </section>

      <TrustStrip tone="dark" />


      <MockupGallery id="mockups" heading="On a fence or fixed to a wall" items={[MOCKUPS.v4CorfluteWall]} />

      <MockupGallery id="size-finish" heading="Size and finish" compact note="Example images. Your print uses your artwork." items={[MOCKUPS.v4CorfluteScale, MOCKUPS.v4CorfluteEdge]} />

      {/* Types */}
      <section
        aria-labelledby="types-heading"
        className="bg-sage-light py-14 sm:py-16"
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

      <ProductSeo slug="corflute-signs" />

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
