import { quoteHref } from "../data/quoteProducts";

/** Sticky "Get a quote" bar on mobile product pages. Hidden from md up (the header has the button). */
export default function QuoteBar({ slug, label }: { slug: string; label: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-4 border-rust bg-charcoal px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={quoteHref(slug)} className="btn-rust w-full" data-track={`quote-bar-${slug}`}>
        Get a quote<span className="sr-only"> for {label}</span>
      </a>
    </div>
  );
}
