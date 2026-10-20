import { FROM_PRICE } from "../data/pullUpBanners";
import { aud } from "../data/mediaWalls";
import { PULL_UP_BANNERS_HREF } from "../lib/routes";
import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";

// Home page card linking to the Pull Up Banners page.
export default function PullUpBannersTeaser() {
  return (
    <section
      id="pull-up-banners"
      aria-labelledby="pu-teaser-heading"
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
                New: printed pull up banners
              </span>
              <h2 id="pu-teaser-heading" className="mt-4 text-3xl sm:text-4xl">
                Pull up banners, printed with your brand
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                Luxury and double sided pull up banners, 850mm or 1200mm wide.
                Your banner printed and fitted, with
                a carry bag.
              </p>
              <p className="mt-4 font-slab text-2xl font-bold">
                From {aud(FROM_PRICE)}{" "}
                <span className="text-base font-normal text-charcoal/80">
                </span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PULL_UP_BANNERS_HREF}
                  className="btn-rust"
                  data-track="pull-up-banners-teaser"
                >
                  See sizes and prices
                </a>
              </div>
            </div>
            <MockupImage
              mockup={MOCKUPS.v4PullUp}
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
