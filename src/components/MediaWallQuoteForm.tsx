import { useEffect, useState, type FormEvent } from "react";
import {
  FORMSUBMIT_ACTION,
  FORMSUBMIT_AJAX,
  ITEMS,
  LED_PACK,
  QUOTE_EMAIL,
  SIZES,
  aud,
  estimate,
  type QuoteChoice,
} from "../data/mediaWalls";
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
  "mt-1 block w-full rounded-md border-2 border-charcoal/25 bg-white px-3 py-2.5 text-base text-charcoal focus:border-rust-dark focus:outline-none";
const SUBJECT = "Media wall quote request (website)";

// Sends to FormSubmit (formsubmit.co), which emails the request to us as a table. With JavaScript
// it posts in the background and then shows the thank-you page; without it, the form posts
// normally and FormSubmit sends the visitor to the thank-you page itself (_next).
export default function MediaWallQuoteForm({ choice, setChoice }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [today, setToday] = useState("");
  const [next, setNext] = useState("");
  const est = estimate(choice);
  const set = <K extends keyof QuoteChoice>(k: K, v: QuoteChoice[K]) =>
    setChoice({ ...choice, [k]: v });
  const size = SIZES.find((s) => s.id === choice.size);
  const sidesApply = choice.item !== "frame";

  useEffect(() => {
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
    setNext(absoluteUrl(QUOTE_THANKS_HREF));
  }, []);

  const estimateText = est.ok
    ? `${aud(est.total)} (${est.qty} × ${aud(est.each + est.led)}${est.led ? ` incl. LED lights ${aud(est.led)}` : ""}). Estimate only, excludes delivery. Prices are final, no GST added.`
    : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(form).entries());
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
          "media-wall-quote-sent",
          `Media wall quote: ${size?.label ?? ""} × ${choice.qty}`,
        );
        goTo(QUOTE_THANKS_HREF);
        return;
      }
      throw new Error(
        body.message ||
          `The form service replied with an error (${res.status}).`,
      );
    } catch (err) {
      trackEvent("media-wall-quote-error");
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  return (
    <form
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate={false}
    >
      <input type="hidden" name="_subject" value={SUBJECT} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={next} />
      <input
        type="hidden"
        name="Product"
        value="Straight stretch fabric media wall (standard fabric)"
      />
      <input
        type="hidden"
        name="What you need"
        value={ITEMS.find((i) => i.id === choice.item)?.label ?? ""}
      />
      <input
        type="hidden"
        name="Print"
        value={
          sidesApply
            ? choice.sides === "double"
              ? "Double-sided"
              : "Single-sided"
            : "No print (frame only)"
        }
      />
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
          Your wall
        </legend>
        <label className={`${label} sm:col-span-2`}>
          What you need
          <select
            className={input}
            value={choice.item}
            onChange={(e) => set("item", e.target.value as QuoteChoice["item"])}
          >
            {ITEMS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Size (width × height)
          <select
            name="Size"
            className={input}
            value={size?.label ?? ""}
            required
            onChange={(e) =>
              set(
                "size",
                SIZES.find((s) => s.label === e.target.value)?.id ?? "",
              )
            }
          >
            <option value="" disabled>
              Choose a size
            </option>
            {SIZES.map((s) => (
              <option key={s.id} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Print
          <select
            className={input}
            disabled={!sidesApply}
            value={sidesApply ? choice.sides : "n/a"}
            onChange={(e) =>
              set("sides", e.target.value as QuoteChoice["sides"])
            }
          >
            {sidesApply ? (
              <>
                <option value="single">Single-sided</option>
                <option value="double">Double-sided</option>
              </>
            ) : (
              <option value="n/a">No print (frame only)</option>
            )}
          </select>
        </label>
        <label className={label}>
          Clamp-on LED lights (pack of 2, +{aud(LED_PACK)} per wall)
          <select
            name="LED lights"
            className={input}
            value={choice.led}
            onChange={(e) => set("led", e.target.value as QuoteChoice["led"])}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
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
            onChange={(e) => set("qty", e.target.value)}
          />
        </label>
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
              {est.qty} × {aud(est.each)}
              {est.led ? ` + LED lights ${aud(est.led)}` : ""} each. Estimate
              only: excludes delivery. Prices are final, no GST added. We'll
              confirm the price in your quote.
            </p>
          </>
        ) : (
          <p className="mt-1">{est.reason} to see an estimate.</p>
        )}
      </div>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Delivery and artwork
        </legend>
        <label className={label}>
          Delivery postcode
          <input
            name="Delivery postcode"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            placeholder="e.g. 2000"
            className={input}
            title="A 4-digit Australian postcode"
          />
        </label>
        <label className={label}>
          Needed by
          <input
            name="Needed by"
            type="date"
            min={today || undefined}
            className={input}
          />
        </label>
        <label className={label}>
          Do you need design help?
          <select name="Design help needed" className={input} defaultValue="No">
            <option>No</option>
            <option>Yes</option>
          </select>
        </label>
        <label className={label}>
          Artwork link{" "}
          <span className="font-normal text-charcoal/70">(optional)</span>
          <input
            name="Artwork link"
            type="url"
            placeholder="Google Drive, WeTransfer or Dropbox link"
            className={input}
          />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Notes <span className="font-normal text-charcoal/70">(optional)</span>
          <textarea
            name="Notes"
            rows={4}
            className={input}
            placeholder="Event, colours, anything we should know"
          />
        </label>
      </fieldset>

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
              href={`mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent("Media wall quote")}`}
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
