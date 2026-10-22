import { REVIEWS } from "../data/reviews";

/** Customer reviews. Renders nothing until REVIEWS has real reviews in it. */
export default function Reviews() {
  if (REVIEWS.length === 0) return null;
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 border-y border-charcoal/10 bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id="reviews-heading" className="text-3xl sm:text-4xl">What our customers say</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.id}>
              <figure className="h-full rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <blockquote className="text-lg leading-relaxed">“{r.quote}”</blockquote>
                <figcaption className="mt-4 font-semibold text-rust-dark">
                  {r.name}
                  {r.source && <span className="font-normal text-charcoal/70"> · {r.source}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
