import { useEffect, useState, type FormEvent } from "react";
import { FORMSUBMIT_AJAX, QUOTE_EMAIL } from "../data/mediaWalls";
import { trackEvent } from "../lib/analytics";
import {
  PRIVACY_HREF,
  QUOTE_THANKS_HREF,
  absoluteUrl,
  goTo,
} from "../lib/routes";

// Shared pieces of the corflute and A-frame quote forms. Same FormSubmit pattern as the other forms:
// background post with JavaScript, normal post (with FormSubmit's own redirect to the thank-you page) without it.

export const label = "block text-sm font-bold";
export const input =
  "mt-1 block w-full rounded-md border-2 border-charcoal/25 bg-white px-3 py-2.5 text-base text-charcoal focus:border-rust-dark focus:outline-none disabled:bg-cream-light disabled:text-charcoal/60";

/** Sends the form in the background and goes to the thank-you page on success. */
export function useQuoteSubmit(eventName: string, describe: () => string) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
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
        trackEvent(`${eventName}-quote-sent`, describe());
        goTo(QUOTE_THANKS_HREF);
        return;
      }
      throw new Error(
        body.message ||
          `The form service replied with an error (${res.status}).`,
      );
    } catch (err) {
      trackEvent(`${eventName}-quote-error`);
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }
  return { status, error, onSubmit };
}

/** Hidden FormSubmit settings plus the spam honeypot. */
export function FormSubmitHidden({ subject }: { subject: string }) {
  const [next, setNext] = useState("");
  useEffect(() => setNext(absoluteUrl(QUOTE_THANKS_HREF)), []);
  return (
    <>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={next} />
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
    </>
  );
}

export function DeliveryArtworkFields({ notesHint }: { notesHint: string }) {
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }, []);
  return (
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
          placeholder={notesHint}
        />
      </label>
    </fieldset>
  );
}

export function YourDetailsFields() {
  return (
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
        <input name="Business" autoComplete="organization" className={input} />
      </label>
    </fieldset>
  );
}

export function SubmitArea({
  status,
  error,
  subject,
}: {
  status: "idle" | "sending" | "error";
  error: string;
  subject: string;
}) {
  return (
    <>
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
              href={`mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(subject)}`}
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
    </>
  );
}

// Order the fields appear in the quote email (FormSubmit's table follows the order we send).
const EMAIL_ORDER = [
  "Name", "email", "Phone", "Business",
  "Product", "Includes", "Size", "Options", "Size details", "Price shown", "Size or option", "Custom size", "Thickness",
  "Printing", "Eyelets", "Frame colour", "Carry handle", "Base colour",
  "Sides or drop", "What you need", "Print", "LED lights",
  "Quantity", "Number of designs", "Estimate shown",
  "Artwork ready", "Artwork link", "Artwork check", "Design help needed",
  "Needed by", "Delivery suburb", "Delivery state", "Delivery postcode",
  "Message", "Notes",
];

/** Builds a tidy FormSubmit payload: logical field order, blanks dropped, subject with name and product, reply-to the customer. */
export function quotePayload(form: HTMLFormElement): Record<string, string> {
  const raw: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === "string") raw[k] = v.trim();
  });
  const out: Record<string, string> = {};
  const name = raw["Name"] || "Customer";
  const product = raw["Product"] || "General enquiry";
  out._subject = `New quote request – ${name} – ${product}`;
  out._template = "table";
  out._captcha = "false";
  if (raw.email) out._replyto = raw.email;
  if (raw._next) out._next = raw._next;
  out._honey = raw._honey ?? "";
  const keys = [
    ...EMAIL_ORDER.filter((k) => k in raw),
    ...Object.keys(raw).filter((k) => !k.startsWith("_") && !EMAIL_ORDER.includes(k)),
  ];
  for (const k of keys) if (raw[k]) out[k] = raw[k];
  return out;
}

/** "How many designs?" (sent as "Number of designs" in the FormSubmit email). */
export function DesignsField() {
  return (
    <label className={label}>
      How many designs?
      <input
        name="Number of designs"
        type="number"
        inputMode="numeric"
        min={1}
        max={999}
        step={1}
        required
        defaultValue={1}
        className={input}
      />
      <span className="mt-1 block text-xs font-normal text-charcoal/70">
        Different artworks across your order.
      </span>
    </label>
  );
}
