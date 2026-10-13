import { GEAR_PRODUCTS, fromPrice, money } from "../data/eventGear";
import { GEAR_HREFS } from "../lib/routes";
import MockupImage from "./MockupImage";

// Home page card for the event gear pages: gazebos, flags and market umbrellas.
export default function EventGearTeaser() {
  return (
    <section
      id="event-gear"
      aria-labelledby="eg-teaser-heading"
      className="scroll-mt-20 bg-cream-light pb-16 sm:pb-20"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border-4 border-charcoal bg-cream shadow-md">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border-2 border-rust/70"
          />
          <div className="relative p-6 sm:p-10">
            <span className="inline-block rounded bg-rust-dark px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-white">
              New: outdoor event gear
            </span>
            <h2 id="eg-teaser-heading" className="mt-4 text-3xl sm:text-4xl">
              Gazebos, flags, umbrellas and banners
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {GEAR_PRODUCTS.map((p) => (
                <a
                  key={p.slug}
                  href={GEAR_HREFS[p.slug as keyof typeof GEAR_HREFS]}
                  className="group block overflow-hidden rounded-xl border-2 border-charcoal/15 bg-white hover:border-rust"
                  data-track={`${p.eventName}-teaser`}
                >
                  <MockupImage
                    mockup={p.hero}
                    square
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="aspect-square h-auto w-full object-cover"
                  />
                  <span className="block p-4">
                    <span className="block font-slab text-xl font-bold group-hover:underline">
                      {p.teaserTitle}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed">
                      {p.teaserText}
                    </span>
                    <span className="mt-2 block font-bold text-rust-dark">
                      From {money(fromPrice(p))}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
