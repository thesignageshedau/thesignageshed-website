import { quoteHref } from "../data/quoteProducts";

/** "Get a quote" button that opens the general quote form with this product chosen. */
export default function QuoteLink({ slug }: { slug: string }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-3 text-base">
      <span>Need a mix of products, or an option not listed below?</span>
      <a href={quoteHref(slug)} className="btn-outline">
        Get a quote
      </a>
    </p>
  );
}
