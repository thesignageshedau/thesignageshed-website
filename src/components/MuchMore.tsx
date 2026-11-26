/** Short note that we print more than the listed products. The link goes to the quote form. */
export const MUCH_MORE_NAV = "…and much more";

export default function MuchMore({ className = "mt-6 max-w-3xl text-lg leading-relaxed" }: { className?: string }) {
  return (
    <p className={className} data-much-more>
      …and much more. Can't see what you need? We print plenty more,{" "}
      <a href="/quote/" className="font-semibold underline underline-offset-4 hover:text-rust">
        just ask for a quote
      </a>
      .
    </p>
  );
}
