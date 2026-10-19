import TrustStrip from "./TrustStrip";
import { useState } from "react";
import { FORMSUBMIT_ACTION } from "../data/mediaWalls";
import QuoteItem, { MAX_ITEMS } from "./QuoteItem";
import {
  ArtworkFields,
  DeliveryFields,
  ErrorSummary,
  FormSubmitHidden,
  SubmitArea,
  input,
  label,
  useQuoteSubmit,
} from "./QuoteFormParts";

const SUBJECT = "Quote request (website)";

export default function QuotePage() {
  const [artworkNote] = useState(() => (new URLSearchParams(window.location.search).get("artwork") ?? "").slice(0, 300));
  const [first, setFirst] = useState({ product: "", size: "" });
  // Stable keys so removing an item doesn't reset the others; numbering follows position.
  const [items, setItems] = useState<number[]>([1]);
  const [nextKey, setNextKey] = useState(2);
  const [estimates, setEstimates] = useState<Record<number, { v: number | null; product: string }>>({});
  const live = items.map((k) => estimates[k]);
  const priced = live.filter((x): x is { v: number; product: string } => typeof x?.v === "number");
  const unpriced = live.length - priced.length;
  // The $180 minimum applies per product: group lines of the same product, then raise each group to $180.
  const MIN_ORDER = 180;
  const groups = new Map<string, number>();
  for (const x of priced) groups.set(x.product, (groups.get(x.product) ?? 0) + x.v);
  const underMin = [...groups.values()].some((g) => g < MIN_ORDER);
  const total = Math.round([...groups.values()].reduce((a, g) => a + Math.max(g, MIN_ORDER), 0) * 100) / 100;
  const fmt = (n: number) => n.toLocaleString("en-AU", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const product = first.product;
  const size = first.size;
  const { status, error, onSubmit, onInput, fieldErrors } = useQuoteSubmit();
  const checkHref = `/check-artwork/${product ? `?product=${product}${size ? `&size=${encodeURIComponent(size)}` : ""}` : ""}`;

  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h1 className="text-4xl sm:text-5xl">Request a quote</h1>
        <p className="mt-3 text-lg leading-relaxed">
          Tell us what you need and we'll email you a quote with delivery included, usually within one business day. No
          payment now.
        </p>
        <div className="mt-6">
          <TrustStrip />
        </div>
        <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
          <form
            action={FORMSUBMIT_ACTION}
            method="POST"
            onSubmit={onSubmit}
            onInput={onInput}
            onChange={onInput}
            noValidate
            data-form="general"
            data-product-code={product || "other"}
            className="space-y-6"
          >
            <FormSubmitHidden subject={SUBJECT} />
            <ErrorSummary errors={fieldErrors} />
            {artworkNote && <input type="hidden" name="Artwork check" value={artworkNote} />}
            {artworkNote && (
              <p className="rounded-md border-2 border-charcoal/15 bg-cream px-4 py-3 text-sm">
                <span className="font-bold">Artwork check:</span> {artworkNote}. We'll include this with your request.
                Reply to our quote email with the file attached.
              </p>
            )}

            <input type="hidden" name="Item count" value={items.length} />
            <div className="space-y-4">
              {items.map((k, i) => (
                <QuoteItem
                  key={k}
                  n={i + 1}
                  fromUrl={i === 0}
                  onChange={i === 0 ? (product, size) => setFirst({ product, size }) : undefined}
                  onRemove={i > 0 ? () => setItems((xs) => xs.filter((x) => x !== k)) : undefined}
                  onEstimate={(v, product) => setEstimates((e) => (e[k]?.v === v && e[k]?.product === product ? e : { ...e, [k]: { v, product } }))}
                />
              ))}
              {items.length < MAX_ITEMS && (
                <button
                  type="button"
                  className="btn-outline w-full sm:w-auto"
                  onClick={() => {
                    setItems((xs) => [...xs, nextKey]);
                    setNextKey((x) => x + 1);
                  }}
                >
                  + Add another product
                </button>
              )}
              {priced.length > 0 && (
                <div className="rounded-lg bg-cream px-4 py-3" aria-live="polite" data-estimate>
                  <p>
                    <span className="font-bold">Estimated total:</span>{" "}
                    <span className="font-slab text-2xl font-bold text-rust-dark">${fmt(total)}</span>{" "}
                    <span className="text-sm">excl. delivery</span>
                  </p>
                  <p className="mt-1 text-xs text-charcoal/75">
                    From the prices on our product pages.
                    {underMin ? ` Our $${MIN_ORDER} minimum per product applies.` : ""}
                    {unpriced > 0 ? ` Plus ${unpriced} ${unpriced === 1 ? "item" : "items"} we'll price in your quote.` : ""} Extras like
                    eyelets or extra designs, and any quantity price breaks, are worked out in your quote.
                  </p>
                </div>
              )}
              <p className="text-xs text-charcoal/70">Up to {MAX_ITEMS} products in one request. Same delivery address for everything. Minimum order $180 per product, plus delivery.</p>
            </div>

            <DeliveryFields />
            <ArtworkFields notesHint="What it's for, colours, wording, anything we should know" checkHref={checkHref} />

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl tracking-wide">Your details</legend>
              <label className={label}>
                Name
                <input name="Name" required autoComplete="name" className={input} />
              </label>
              <label className={label}>
                Business <span className="font-normal text-charcoal/70">(optional)</span>
                <input name="Business" autoComplete="organization" className={input} />
              </label>
              <label className={label}>
                Email
                <input name="email" type="email" required autoComplete="email" className={input} />
              </label>
              <label className={label}>
                Phone <span className="font-normal text-charcoal/70">(optional)</span>
                <input
                  name="Phone"
                  type="tel"
                  autoComplete="tel"
                  pattern="[0-9 +()\-]{8,20}"
                  title="A phone number, e.g. 0412 345 678"
                  className={input}
                />
              </label>
            </fieldset>

            <SubmitArea status={status} error={error} subject={SUBJECT} />
          </form>
        </div>
      </div>
    </section>
  );
}
