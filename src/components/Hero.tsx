import { asset } from "../lib/asset";
import { SHOP, SITE_COPY } from "../data/products";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-charcoal text-cream">
      <div className="mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="eyebrow mb-4">Spreadsheets &amp; templates for the sign trade</p>
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Price it right.<br />Quote it fast.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">
            We make {SITE_COPY.heroProducts} for sign shops,
            signwriters and small businesses in Australia. Set up for AU GST, ready to download straight away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-rust">See the products</a>
            <a href={SHOP.etsy} className="btn-ghost-light" target="_blank" rel="noopener" data-track="etsy-shop-hero">Visit our Etsy shop</a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={asset("images/logo-sign-480.webp")}
            srcSet={`${asset("images/logo-sign-480.webp")} 480w, ${asset("images/logo-sign-960.webp")} 960w`}
            sizes="(min-width: 768px) 440px, 80vw"
            width={480} height={300}
            alt="The Signage Shed hanging sign logo"
            fetchPriority="high"
            className="h-auto w-full max-w-[300px] md:max-w-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
