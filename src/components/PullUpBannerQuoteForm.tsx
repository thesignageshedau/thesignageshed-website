import { useEffect, useState, type FormEvent } from "react";
import { quotePayload, DesignsField, DeliveryArtworkFields } from "./QuoteFormParts";
import {
  FORMSUBMIT_ACTION,
  FORMSUBMIT_AJAX,
  QUOTE_EMAIL,
  aud,
} from "../data/mediaWalls";
import {
  BASE_LABELS,
  SIZES,
  STANDS,
  basesFor,
  estimate,
  normalise,
  type Base,
  type QuoteChoice,
  type Stand,
} from "../data/pullUpBanners";
import { trackEvent } from "../lib/analytics";
import {
  PRIVACY_HREF,
  QUOTE_THANKS_HREF,
  absoluteUrl,
  goTo,
} from "../lib/routes";

type Props = { choice: QuoteChoice; setChoice: (c: QuoteChoice) => void };

const label = "block text-sm font-bold";
const input =
  "mt-1 block w-full rounded-md border-2 border-charcoal/25 bg-white px-3 py-2.5 text-base text-charcoal focus:border-rust-dark focus:outline-none disabled:bg-cream-light disabled:text-charcoal/60";
const SUBJECT = "Pull up banner quote";

// Same FormSubmit pattern as the media walls and table covers forms: background post with JavaScript, normal post
// (with FormSubmit's own redirect to the thank-you page) without it.
export default function PullUpBannerQuoteForm({ choice, setChoice }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [, setToday] = useState("");
  const [next, setNext] = useState("");
  const est = estimate(choice);
  const update = (patch: Partial<QuoteChoice>) =>
    setChoice(normalise({ ...choice, ...patch }));
  const bases = basesFor(choice.stand, choice.size);
  const standLabel = STANDS.find((s) => s.id === choice.stand)?.label ?? "";
  const size = SIZES.find((s) => s.id === choice.size);
  const sizeLabel = size
    ? size.shoppingCentre
      ? `${size.label} (${size.visible[choice.stand]} visible, 1400mm max height)`
      : size.label
    : "";

  useEffect(() => {
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
    setNext(absoluteUrl(QUOTE_THANKS_HREF));
  }, []);

  const estimateText = est.ok
    ? `${aud(est.total)} (${est.qty} × ${aud(est.each)}). Estimate only, excludes delivery. Prices are final, no GST added.`
    : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const data = quotePayload(form);
    try {
      const res = await fetch(FORMSUBMIT_AJAX, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };
      if (res.ok && String(body.success) === "true") {
        trackEvent(
          "pull-up-banner-quote-sent",
          `Pull up banner quote: ${standLabel} ${size?.label ?? ""} × ${choice.qty}`,
        );
        goTo(QUOTE_THANKS_HREF);
        return;
      }
      throw new Error(
        body.message ||
          `The form service replied with an error (${res.status}).`,
      );
    } catch (err) {
      trackEvent("pull-up-banner-quote-error");
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  return (
    <form
      data-product-code="pull-up-banners"
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="_subject" value={SUBJECT} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={next} />
      <input type="hidden" name="Product" value={standLabel} />
      <input type="hidden" name="Size" value={sizeLabel} />
      <input type="hidden" name="Base colour" value={BASE_LABELS[choice.base]} />
      <input
        type="hidden"
        name="Estimate shown"
        value={estimateText || "n/a"}
      />
      {/* Honeypot: people never see or fill this, spam bots do. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Leave this empty
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Your pull up banner
        </legend>
        <label className={`${label} sm:col-span-2`}>
          Stand
          <select
            className={input}
            value={choice.stand}
            onChange={(e) => update({ stand: e.target.value as Stand })}
          >
            {STANDS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Size
          <select
            className={input}
            value={choice.size}
            required
            onChange={(e) => update({ size: e.target.value })}
          >
            <option value="" disabled>
              Choose a size
            </option>
            {SIZES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shoppingCentre ? `${s.label} (1400mm max height)` : s.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Base colour
          <select
            className={input}
            disabled={bases.length < 2}
            value={choice.base}
            onChange={(e) => update({ base: e.target.value as Base })}
          >
            {bases.map((b) => (
              <option key={b} value={b}>
                {BASE_LABELS[b]}
              </option>
            ))}
          </select>
          {bases.length < 2 && choice.size && (
            <span className="mt-1 block text-xs font-normal text-charcoal/70">
              Black is only made for 850mm Luxury stands.
            </span>
          )}
        </label>
        <label className={label}>
          Quantity
          <input
            name="Quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={99}
            step={1}
            required
            className={input}
            value={choice.qty}
            onChange={(e) => update({ qty: e.target.value })}
          />
        </label>
        <DesignsField />
      </fieldset>

      <div
        aria-live="polite"
        className="rounded-xl border-2 border-rust bg-cream px-5 py-4"
      >
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-rust-dark">
          Estimated price
        </p>
        {est.ok ? (
          <>
            <p
              className="mt-1 font-display text-3xl tracking-wide"
              data-testid="estimate"
            >
              {aud(est.total)}
            </p>
            <p className="mt-1 text-sm">
              {est.qty} × {aud(est.each)} each. Estimate only: excludes
              delivery. Prices are final, no GST added. We'll confirm the price
              in your quote.
            </p>
          </>
        ) : (
          <p className="mt-1">{est.reason} to see an estimate.</p>
        )}
      </div>

      <DeliveryArtworkFields notesHint="Event, venue, colours, anything we should know" checkHref="/check-artwork/?product=pull-up-banners" />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Your details
        </legend>
        <label className={label}>
          Name
          <input name="Name" required autoComplete="name" className={input} />
        </label>
        <label className={label}>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={input}
          />
        </label>
        <label className={label}>
          Phone <span className="font-normal text-charcoal/70">(optional)</span>
          <input name="Phone" type="tel" autoComplete="tel" className={input} />
        </label>
        <label className={label}>
          Business{" "}
          <span className="font-normal text-charcoal/70">(optional)</span>
          <input
            name="Business"
            autoComplete="organization"
            className={input}
          />
        </label>
      </fieldset>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border-2 border-rust-dark bg-white p-4"
        >
          <p className="font-bold">Sorry, your request didn't send.</p>
          <p className="mt-1 text-sm">{error}</p>
          <p className="mt-1 text-sm">
            Please try again, or email the details to{" "}
            <a
              className="font-semibold text-rust-dark underline"
              href={`mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
            >
              {QUOTE_EMAIL}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          className="btn-rust disabled:opacity-60"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send quote request"}
        </button>
        <p className="text-sm text-charcoal/80">
          No payment now. We'll reply by email with a quote, and invoice you
          once the order is confirmed.
        </p>
      </div>
      <p className="text-xs text-charcoal/70">
        Your request is emailed to us through FormSubmit and used only to quote.
        See our{" "}
        <a href={PRIVACY_HREF} className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
