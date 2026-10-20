import { FROM_PRICE, money } from "../data/corfluteSigns";
import { CORFLUTE_SIGNS_HREF } from "../lib/routes";
import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";

// Home page card linking to the Corflute signs page.
export default function CorfluteSignsTeaser() {
  return (
    <section
      id="corflute-signs"
      aria-labelledby="cf-teaser-heading"
      className="scroll-mt-20 bg-cream-light pb-16 sm:pb-20 md:pb-10"
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
                New: printed corflute signs
              </span>
              <h2 id="cf-teaser-heading" className="mt-4 text-3xl sm:text-4xl">
                Corflute signs, printed your way
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                Premium 5mm corflute in 3 standard sizes, portrait or landscape, single or
                double sided. Up to 5 signs is one flat price, and the price per
                sign drops on bigger runs.
              </p>
              <p className="mt-4 font-slab text-2xl font-bold">
                From {money(FROM_PRICE)} for up to 5 signs{" "}
                <span className="text-base font-normal text-charcoal/80">
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CORFLUTE_SIGNS_HREF}
                  className="btn-rust"
                  data-track="corflute-signs-teaser"
                >
                  See corflute sign sizes and prices
                </a>
              </div>
            </div>
            <MockupImage
              mockup={MOCKUPS.v4Corflute}
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
