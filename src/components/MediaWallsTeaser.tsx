import { FROM_PRICE, aud } from "../data/mediaWalls";
import { MEDIA_WALLS_HREF } from "../lib/routes";
import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";

// Home page card linking to the Media Walls page.
export default function MediaWallsTeaser() {
  return (
    <section
      id="media-walls"
      aria-labelledby="mw-teaser-heading"
      className="scroll-mt-20 bg-cream-light pb-16 sm:pb-20 md:pb-10"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border-4 border-charcoal bg-charcoal text-cream shadow-md">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border-2 border-rust/70"
          />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:gap-10">
            <div>
              <span className="inline-block rounded bg-rust-dark px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-white">
                New: printed media walls
              </span>
              <h2 id="mw-teaser-heading" className="mt-4 text-3xl sm:text-4xl">
                Media walls, printed with your artwork
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-cream/90">
                Fabric sock and frame walls from 2.4m to 4m wide, single or
                double-sided, with optional LED lights. Each kit comes with the
                frame, your printed fabric and a carry bag.
              </p>
              <p className="mt-4 font-slab text-2xl font-bold">
                From {aud(FROM_PRICE)}{" "}
                <span className="text-base font-normal text-cream/80">
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={MEDIA_WALLS_HREF}
                  className="btn-rust"
                  data-track="media-walls-teaser"
                >
                  See sizes and prices
                </a>
              </div>
            </div>
            <MockupImage
              mockup={MOCKUPS.v4MediaWall}
              square
              eager
              sizes="(min-width: 768px) 384px, 320px"
              className="mx-auto w-full max-w-xs md:max-w-sm rounded-xl ring-2 ring-rust/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
