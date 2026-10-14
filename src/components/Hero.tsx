import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";
import { asset } from "../lib/asset";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-charcoal text-cream">
      <div className="mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="eyebrow mb-4">Printed signage &amp; event gear, Australia-wide</p>
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Signs that get
            <br />
            you seen.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">
            Media walls, pull up banners, flags, corflute signs, A-frames and gazebos, printed with
            your artwork. Prices online, quoted fast and delivered Australia-wide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/quote/" className="btn-rust" data-track="quote-hero">
              Get a quote
            </a>
            <a href="#signage" className="btn-ghost-light" data-track="signage-hero">
              See our signage
            </a>
          </div>
          <p className="mt-4 text-sm text-cream/85">
            No artwork? Send your logo and wording and we'll set it up.{" "}
            <a href="/artwork-help/" className="font-semibold text-rust-light underline underline-offset-4 hover:text-white">Artwork help</a>
          </p>
        </div>
        <div className="relative">
          <MockupImage
            mockup={MOCKUPS.v4Gazebo}
            eager
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 46vw, calc(100vw - 32px)"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg ring-1 ring-cream/10"
          />
          <img
            src={asset("images/badge-192.webp")}
            width={96} height={96}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute -bottom-5 -left-3 h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
          />
        </div>
      </div>
    </section>
  );
}
