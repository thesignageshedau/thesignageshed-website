import { FROM_PRICE, PRICE_NOTES, money } from "../data/aFrames";
import { A_FRAMES_HREF } from "../lib/routes";
import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";

// Home page card linking to the A-frame signs for your shopfront page.
export default function AFramesTeaser() {
  return (
    <section
      id="a-frames"
      aria-labelledby="af-teaser-heading"
      className="scroll-mt-20 bg-cream-light pb-16 sm:pb-20"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border-4 border-charcoal bg-cream shadow-md">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border-2 border-rust/70"
          />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-10">
            <div>
              <span className="inline-block rounded bg-rust-dark px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-white">
                New: printed A-frames
              </span>
              <h2 id="af-teaser-heading" className="mt-4 text-3xl sm:text-4xl">
                A-frame signs for your shopfront
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                Printed aluminium, insert, real estate and folding corflute
                A-frames, printed on both sides with your artwork. Replacement
                inserts available.
              </p>
              <p className="mt-4 font-slab text-2xl font-bold">
                From {money(FROM_PRICE)}{" "}
                <span className="text-base font-normal text-charcoal/80">
                  · {PRICE_NOTES.join(" · ")}
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={A_FRAMES_HREF}
                  className="btn-rust"
                  data-track="a-frames-teaser"
                >
                  See sizes and prices
                </a>
              </div>
            </div>
            <MockupImage
              mockup={MOCKUPS.aframeInsert}
              square
              sizes="(min-width: 768px) 384px, 320px"
              className="mx-auto w-full max-w-xs md:max-w-sm rounded-xl ring-2 ring-rust/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
