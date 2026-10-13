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

export const AU_STATES = [
  ["NSW", "New South Wales"],
  ["VIC", "Victoria"],
  ["QLD", "Queensland"],
  ["WA", "Western Australia"],
  ["SA", "South Australia"],
  ["TAS", "Tasmania"],
  ["ACT", "Australian Capital Territory"],
  ["NT", "Northern Territory"],
] as const;
export const ARTWORK_STATUS = ["Print-ready files", "Need help with design", "Not sure"] as const;

/** Delivery suburb, state, postcode and date (all forms). */
export function DeliveryFields() {
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }, []);
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="mb-3 font-display text-xl tracking-wide">Delivery</legend>
      <p className="-mt-1 text-sm text-charcoal/80 sm:col-span-2">
        We deliver Australia-wide and quote freight from your postcode.{" "}
        <a className="font-semibold text-rust-dark underline" href="#/delivery">How delivery works</a>
      </p>
      <label className={label}>
        Delivery suburb
        <input name="Delivery suburb" required autoComplete="address-level2" placeholder="e.g. Parramatta" maxLength={80} className={input} />
      </label>
      <label className={label}>
        State
        <select name="Delivery state" required defaultValue="" className={input}>
          <option value="" disabled>
            Choose a state
          </option>
          {AU_STATES.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label className={label}>
        Postcode
        <input
          name="Delivery postcode"
          required
          inputMode="numeric"
          autoComplete="postal-code"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="e.g. 2150"
          title="A 4 digit Australian postcode"
          className={input}
        />
      </label>
      <label className={label}>
        Date needed by <span className="font-normal text-charcoal/70">(optional)</span>
        <input name="Needed by" type="date" min={today || undefined} className={input} />
      </label>
    </fieldset>
  );
}

/** Artwork status, link and notes (all forms). Files can't go through the form, so we ask for a link or a reply. */
export function ArtworkFields({ notesHint, checkHref = "#/check-artwork" }: { notesHint: string; checkHref?: string }) {
  return (
    <fieldset className="grid gap-4">
      <legend className="mb-3 font-display text-xl tracking-wide">Artwork</legend>
      <p className="-mt-1 text-sm text-charcoal/80">
        Not sure about bleed, resolution or file types?{" "}
        <a className="font-semibold text-rust-dark underline" href="#/artwork-help">Read our artwork help</a>
      </p>
      <div role="radiogroup" aria-label="Artwork status" className={label}>
        Artwork status
        <div className="mt-1 flex flex-wrap gap-x-6 font-normal">
          {ARTWORK_STATUS.map((v, i) => (
            <label key={v} className="flex min-h-11 items-center gap-2 text-base">
              <input type="radio" name="Artwork status" value={v} required={i === 0} className="h-5 w-5 accent-rust-dark" />
              {v}
            </label>
          ))}
        </div>
      </div>
      <label className={label}>
        Artwork link <span className="font-normal text-charcoal/70">(optional)</span>
        <input name="Artwork link" type="url" placeholder="Google Drive, WeTransfer or Dropbox link" className={input} />
        <span className="mt-1 block text-xs font-normal text-charcoal/70">
          Files can't be attached to this form. Paste a link, or reply to our quote email with your files attached (or
          email{" "}
          <a className="font-semibold text-rust-dark underline" href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </a>
          ).{" "}
          <a className="font-semibold text-rust-dark underline" href={checkHref}>
            Check your artwork first
          </a>
          .
        </span>
      </label>
      <label className={label}>
        Notes <span className="font-normal text-charcoal/70">(optional)</span>
        <textarea name="Notes" rows={4} maxLength={3000} className={input} placeholder={notesHint} />
      </label>
    </fieldset>
  );
}

/** Delivery then artwork (kept for the product page forms). */
export function DeliveryArtworkFields({ notesHint, checkHref }: { notesHint: string; checkHref?: string }) {
  return (
    <>
      <DeliveryFields />
      <ArtworkFields notesHint={notesHint} {...(checkHref ? { checkHref } : {})} />
    </>
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

// The quote email is read by people and by our quoting bot, so every form sends the same labels in the
// same order, with "N/A" for anything that doesn't apply. Change these labels only together with the bot.
export const QUOTE_FORM_VERSION = "quote-v2";
export const EMAIL_FIELDS = [
  "Form version",
  "Product code",
  "Product",
  "Item",
  "Size",
  "Custom size (as entered)",
  "Size (mm)",
  "Material",
  "Orientation",
  "Thickness",
  "Sides",
  "Eyelets",
  "Options",
  "Quantity",
  "Number of designs",
  "Price shown",
  "Name",
  "Email",
  "Phone",
  "Business",
  "Delivery suburb",
  "Delivery state",
  "Delivery postcode",
  "Needed by",
  "Artwork status",
  "Artwork link",
  "Artwork check",
  "Notes",
] as const;

const PRODUCT_LABELS: Record<string, string> = {
  "media-walls": "Media walls",
  "table-covers": "Table covers",
  "pull-up-banners": "Pull up banners",
  "corflute-signs": "Corflute signs",
  "a-frames": "A-frames",
  banners: "Vinyl and mesh banners",
  gazebos: "Gazebos",
  flags: "Teardrop and feather flags",
  "market-umbrellas": "Market umbrellas",
  other: "Something else or a mix",
};

const UNIT_MM: Record<string, number> = { mm: 1, cm: 10, m: 1000 };
const num = (s: string) => Math.round(parseFloat(s) * 100) / 100;

/** "850 × 2000mm", "2.4m × 2.2m", "1000 x 1800" (mm assumed) → "850 x 2000". Empty when there's no size in the text. */
export function sizeToMm(text: string, fallbackUnit = "mm"): string {
  const m = text.match(/(\d+(?:\.\d+)?)\s*(mm|cm|m)?\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*(mm|cm|m)?/);
  if (!m) return "";
  const u2 = m[4] ?? m[2] ?? fallbackUnit;
  const u1 = m[2] ?? u2;
  const w = num(m[1]!) * (UNIT_MM[u1] ?? 1);
  const h = num(m[3]!) * (UNIT_MM[u2] ?? 1);
  return `${Math.round(w)} x ${Math.round(h)}`;
}

/** Builds the FormSubmit payload: the fixed EMAIL_FIELDS in order (N/A when blank), subject with name and product, reply-to the customer. */
export function quotePayload(form: HTMLFormElement): Record<string, string> {
  const raw: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === "string") raw[k] = v.trim();
  });
  const take = (...keys: string[]) => {
    for (const k of keys) {
      const v = raw[k];
      delete raw[k];
      if (v) return v;
    }
    return "";
  };
  const code = form.dataset.productCode || take("Product code") || "other";
  const general = form.dataset.form === "general";
  const productRaw = take("Product");
  const f: Record<string, string> = {};
  f["Form version"] = QUOTE_FORM_VERSION;
  f["Product code"] = code;
  f["Product"] = PRODUCT_LABELS[code] ?? (productRaw || "General enquiry");
  f["Item"] = general ? "" : productRaw;
  f["Size"] = take("Size");
  f["Custom size (as entered)"] = take("Custom size");
  const mm = take("Size (mm)");
  f["Size (mm)"] = mm || sizeToMm(f["Custom size (as entered)"]) || sizeToMm(f["Size"]) || sizeToMm(f["Item"]);
  f["Material"] = take("Banner material", "Material");
  f["Orientation"] = take("Orientation");
  f["Thickness"] = take("Thickness");
  f["Sides"] = take("Sides", "Printing", "Print");
  f["Eyelets"] = take("Eyelets");
  const quantity = take("Quantity");
  const designs = take("Number of designs");
  const price = take("Price shown", "Estimate shown");
  const contact = { name: take("Name"), email: take("email", "Email"), phone: take("Phone"), business: take("Business") };
  const delivery = { suburb: take("Delivery suburb"), state: take("Delivery state"), postcode: take("Delivery postcode"), date: take("Needed by") };
  const artwork = { status: take("Artwork status"), link: take("Artwork link"), check: take("Artwork check") };
  const notes = take("Notes", "Message");
  const design = take("Design help needed");
  // Anything product specific that's left (stand, frame colour, LED lights, add-ons…) goes into Options.
  const extras = Object.entries(raw)
    .filter(([k, v]) => !k.startsWith("_") && v)
    .map(([k, v]) => (k === "Options" ? v : `${k}: ${v}`));
  if (design && design !== "No") extras.push(`Design help needed: ${design}`);
  f["Options"] = extras.join("; ");
  f["Quantity"] = quantity;
  f["Number of designs"] = designs;
  f["Price shown"] = price;
  f["Name"] = contact.name;
  f["Email"] = contact.email;
  f["Phone"] = contact.phone;
  f["Business"] = contact.business;
  f["Delivery suburb"] = delivery.suburb;
  f["Delivery state"] = delivery.state;
  f["Delivery postcode"] = delivery.postcode;
  f["Needed by"] = delivery.date;
  f["Artwork status"] = artwork.status;
  f["Artwork link"] = artwork.link;
  f["Artwork check"] = artwork.check;
  f["Notes"] = notes;

  const out: Record<string, string> = {};
  out._subject = `New quote request – ${contact.name || "Customer"} – ${f["Item"] || f["Product"]}`;
  out._template = "table";
  out._captcha = "false";
  if (contact.email) out._replyto = contact.email;
  if (raw._next) out._next = raw._next;
  out._honey = raw._honey ?? "";
  for (const k of EMAIL_FIELDS) out[k] = f[k] || "N/A";
  return out;
}

/** "How many designs?" (sent as "Number of designs" in the FormSubmit email). */
export function DesignsField() {
  return (
    <label className={label}>
      Number of different designs/artworks
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
