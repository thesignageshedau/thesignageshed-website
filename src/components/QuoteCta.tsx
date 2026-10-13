import TrustStrip from "./TrustStrip";
import { quoteHref } from "../data/quoteProducts";

/** End-of-page call to action: one clear button to the quote form, pre-filled with this product. */
export default function QuoteCta({ slug, label }: { slug: string; label: string }) {
  return (
    <section id="quote" aria-labelledby={`${slug}-quote`} className="scroll-mt-20 bg-cream py-12 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 id={`${slug}-quote`} className="text-3xl sm:text-4xl">
          Get a price for your {label}
        </h2>
        <p className="mt-2 text-lg leading-relaxed">
          We email you a quote with delivery included, usually within one business day. Add other products to the same
          request.
        </p>
        <a href={quoteHref(slug)} className="btn-rust mt-6 inline-block" data-track={`${slug}-quote-cta`}>
          Get a quote
        </a>
        <div className="mt-6">
          <TrustStrip />
        </div>
      </div>
    </section>
  );
}
