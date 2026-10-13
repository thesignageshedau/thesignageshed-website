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
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={asset("images/logo-sign-480.webp")}
            srcSet={`${asset("images/logo-sign-480.webp")} 480w, ${asset("images/logo-sign-960.webp")} 960w`}
            sizes="(min-width: 768px) 440px, 80vw"
            width={480} height={300}
            alt="The Signage Shed hanging sign logo"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-auto w-full max-w-[300px] md:max-w-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
