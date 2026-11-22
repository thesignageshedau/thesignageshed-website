import { useEffect, useState, type FormEvent } from "react";
import { FORMSUBMIT_AJAX, QUOTE_EMAIL } from "../data/mediaWalls";
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

export type FieldError = { id: string; message: string };
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// FormSubmit documents a 10MB total limit for all files in one submission, and
// requires enctype="multipart/form-data". It does not document a per-file limit,
// allowed types, or attachments on the AJAX/JSON endpoint.
// https://formsubmit.co/documentation
export const ARTWORK_MAX_BYTES = 10 * 1024 * 1024;
export const ARTWORK_ACCEPT =
  ".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg,.tif,.tiff,.psd,application/pdf,application/postscript,image/svg+xml,image/png,image/jpeg,image/tiff,image/vnd.adobe.photoshop";
const ARTWORK_EXT = /\.(pdf|ai|eps|svg|png|jpe?g|tiff?|psd)$/i;

function formatMb(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  const rounded = Math.round(mb * 10) / 10;
  // Don't display "10 MB" for a file that's just over the 10 MB limit.
  if (bytes > ARTWORK_MAX_BYTES && rounded <= 10) return mb.toFixed(2);
  return rounded.toFixed(1).replace(/\.0$/, "");
}

/** Sets a friendly custom error on the artwork file input, or clears it. */
export function applyArtworkFileValidity(el: HTMLInputElement) {
  const file = el.files?.[0];
  if (!file) {
    el.setCustomValidity("");
    return;
  }
  if (file.size > ARTWORK_MAX_BYTES) {
    el.setCustomValidity(
      `That file is ${formatMb(file.size)} MB. The most we can attach here is 10 MB. Add a link (Dropbox, Google Drive, WeTransfer) instead, or pick a smaller file.`,
    );
    return;
  }
  if (!ARTWORK_EXT.test(file.name)) {
    el.setCustomValidity("Please choose a PDF, AI, EPS, SVG, PNG, JPG, TIFF or PSD file.");
    return;
  }
  el.setCustomValidity("");
}

/** Plain-English name of a field: its label text (without "(optional)"/hints) or its group's aria-label. */
function fieldName(el: Field): string {
  const group = el.type === "radio" ? el.closest("[role=radiogroup]") : null;
  if (group) return group.getAttribute("aria-label") ?? "this";
  const lab = el.closest("label") ?? (el.id ? document.querySelector(`label[for="${el.id}"]`) : null);
  const text = lab ? [...lab.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ") : "";
  return text.replace(/\s+/g, " ").trim() || el.name;
}

function messageFor(el: Field): string {
  const name = fieldName(el);
  const v = el.validity;
  if (v.valueMissing) return el.tagName === "SELECT" || el.type === "radio" ? `Choose ${name.toLowerCase()}` : `Enter ${name.toLowerCase()}`;
  if (v.typeMismatch && el.type === "email") return "Enter a valid email address, like name@example.com";
  if (v.patternMismatch && el.name.endsWith("postcode")) return "Enter a 4 digit postcode";
  if (v.customError) return el.validationMessage;
  if (v.patternMismatch && el.type === "tel") return "Enter a phone number, like 0412 345 678";
  if (v.rangeUnderflow || v.rangeOverflow || v.stepMismatch || v.badInput) return `Enter a whole number for ${name.toLowerCase()}`;
  return el.validationMessage || `Check ${name.toLowerCase()}`;
}

/** Marks invalid fields (red border plus a message under them) and returns the list for the summary. */
export function validateForm(form: HTMLFormElement): FieldError[] {
  form.querySelectorAll("[data-error]").forEach((n) => n.removeAttribute("data-error"));
  form.querySelectorAll("[aria-invalid]").forEach((n) => n.removeAttribute("aria-invalid"));
  const errors: FieldError[] = [];
  const seen = new Set<string>();
  let i = 0;
  for (const el of [...form.elements] as Field[]) {
    if (!("validity" in el) || !el.willValidate || el.validity.valid || seen.has(el.name)) continue;
    seen.add(el.name);
    if (!el.id) el.id = `qf-${(i++).toString(36)}-${el.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
    const message = messageFor(el);
    const box = el.type === "radio" ? el.closest("[role=radiogroup]") : el.closest("label");
    (box ?? el).setAttribute("data-error", message);
    el.setAttribute("aria-invalid", "true");
    errors.push({ id: el.id, message });
  }
  return errors;
}

/** Error summary shown above the form after a failed submit; each item jumps to its field. */
export function ErrorSummary({ errors }: { errors: FieldError[] }) {
  if (!errors.length) return null;
  return (
    <div role="alert" tabIndex={-1} id="form-errors" className="rounded-lg border-2 border-red-700 bg-red-50 p-4 text-red-900">
      <p className="font-bold">
        {errors.length === 1 ? "1 thing to fix" : `${errors.length} things to fix`} before we can send your request:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {errors.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className="font-semibold underline underline-offset-2"
              onClick={(ev) => {
                ev.preventDefault();
                document.getElementById(e.id)?.focus();
              }}
            >
              {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sends the form in the background and goes to the thank-you page on success. */
export function useQuoteSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  function onInput(e: FormEvent<HTMLFormElement>) {
    const el = e.target as Field;
    if (el.type === "file") applyArtworkFileValidity(el as HTMLInputElement);
    // Show a file error as soon as a too-big or unsupported file is chosen.
    if (el.type === "file" && el.validity && !el.validity.valid) {
      if (!el.id) el.id = "quote-artwork-file";
      const message = messageFor(el);
      el.closest("label")?.setAttribute("data-error", message);
      el.setAttribute("aria-invalid", "true");
      setFieldErrors((xs) => [...xs.filter((x) => x.id !== el.id), { id: el.id, message }]);
      return;
    }
    // Clear a field's error as soon as it's fixed.
    if (!el.getAttribute?.("aria-invalid") || !el.validity?.valid) return;
    el.removeAttribute("aria-invalid");
    (el.type === "radio" ? el.closest("[role=radiogroup]") : el.closest("label"))?.removeAttribute("data-error");
    setFieldErrors((xs) => xs.filter((x) => x.id !== el.id && !(el.type === "radio" && x.message.startsWith("Choose"))));
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    form.querySelectorAll('input[type="file"]').forEach((n) => applyArtworkFileValidity(n as HTMLInputElement));
    const errs = validateForm(form);
    setFieldErrors(errs);
    if (errs.length) {
      requestAnimationFrame(() => {
        const box = document.getElementById("form-errors");
        box?.scrollIntoView({ block: "center" });
        box?.focus();
      });
      return;
    }
    setStatus("sending");
    setError("");
    const data = quotePayload(form);
    const file = (form.querySelector('input[type="file"][name="attachment"]') as HTMLInputElement | null)?.files?.[0] ?? null;
    try {
      // JSON AJAX cannot carry a file. FormSubmit's docs require multipart/form-data
      // for attachments (https://formsubmit.co/documentation). We still post to the
      // same AJAX endpoint so the thank-you page and error state stay as they are,
      // and we send the remapped quote fields, not the raw form.
      const res = await fetch(FORMSUBMIT_AJAX, file
        ? {
            method: "POST",
            headers: { Accept: "application/json" },
            body: quoteFormData(data, file),
          }
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          },
      );
      const body = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };
      if (res.ok && String(body.success) === "true") {
        goTo(QUOTE_THANKS_HREF);
        return;
      }
      throw new Error(
        body.message ||
          `The form service replied with an error (${res.status}).`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }
  return { status, error, onSubmit, onInput, fieldErrors };
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

/** State from a 4 digit Australian postcode (Australia Post ranges). Empty when the postcode isn't one we know. */
export function stateFromPostcode(pc: string): string {
  if (!/^[0-9]{4}$/.test(pc)) return "";
  const n = Number(pc);
  if ((n >= 200 && n <= 299) || (n >= 2600 && n <= 2618) || (n >= 2900 && n <= 2920)) return "ACT";
  if (n >= 800 && n <= 999) return "NT";
  if (n >= 1000 && n <= 2999) return "NSW";
  if ((n >= 3000 && n <= 3999) || (n >= 8000 && n <= 8999)) return "VIC";
  if ((n >= 4000 && n <= 4999) || (n >= 9000 && n <= 9999)) return "QLD";
  if (n >= 5000 && n <= 5999) return "SA";
  if (n >= 6000 && n <= 6999) return "WA";
  if (n >= 7000 && n <= 7999) return "TAS";
  return "";
}

/** Delivery postcode (all forms). The state is worked out from the postcode and sent as "Delivery state". */
export function DeliveryFields() {
  const [pc, setPc] = useState("");
  const state = stateFromPostcode(pc);
  const stateName = AU_STATES.find(([c]) => c === state)?.[1] ?? "";
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="mb-3 font-display text-xl tracking-wide">Delivery</legend>
      <p className="-mt-1 text-sm text-charcoal/80 sm:col-span-2">
        We deliver Australia-wide and quote freight from your postcode.{" "}
        <a className="font-semibold text-rust-dark underline" href="/delivery/">How delivery works</a>
      </p>
      <input type="hidden" name="Delivery state" value={state} />
      <label className={label}>
        Postcode
        <input
          name="Delivery postcode"
          value={pc}
          onChange={(e) => {
            const v = e.target.value.trim();
            setPc(v);
            e.target.setCustomValidity(
              /^[0-9]{4}$/.test(v) && !stateFromPostcode(v) ? "Enter a valid Australian postcode" : "",
            );
          }}
          required
          inputMode="numeric"
          autoComplete="postal-code"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="e.g. 2150"
          title="A 4 digit Australian postcode"
          className={input}
        />
        <span className="mt-1 block text-xs font-normal text-charcoal/70" aria-live="polite">
          {stateName ? `Delivering to ${stateName}.` : "Freight is quoted to this postcode."}
        </span>
      </label>
    </fieldset>
  );
}

function ArtworkFileField() {
  return (
    <label className={label}>
      Artwork file <span className="font-normal text-charcoal/70">(optional)</span>
      <input
        id="quote-artwork-file"
        name="attachment"
        type="file"
        accept={ARTWORK_ACCEPT}
        aria-describedby="quote-artwork-file-hint"
        className={`${input} file:mr-3 file:rounded-md file:border-0 file:bg-cream file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-charcoal`}
      />
      <span id="quote-artwork-file-hint" className="mt-1 block text-xs font-normal text-charcoal/70">
        PDF, AI, EPS, SVG, PNG, JPG, TIFF or PSD, up to 10 MB. Bigger files? Add a link (Dropbox, Google Drive,
        WeTransfer) in your message.
      </span>
    </label>
  );
}

/** Artwork status, optional file or link, and notes (all forms). */
export function ArtworkFields({ notesHint, checkHref = "/check-artwork/" }: { notesHint: string; checkHref?: string }) {
  return (
    <fieldset className="grid gap-4">
      <legend className="mb-3 font-display text-xl tracking-wide">Artwork</legend>
      <p className="-mt-1 text-sm text-charcoal/80">
        Not sure about bleed, resolution or file types?{" "}
        <a className="font-semibold text-rust-dark underline" href="/artwork-help/">Read our artwork help</a>
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
        <span className="mt-1 block text-xs font-normal text-charcoal/70">
          Print-ready means a finished file at the right size, with bleed, that we can print as is. Not there yet? We can set it up for you.
        </span>
      </div>
      <ArtworkFileField />
      <label className={label}>
        Artwork link <span className="font-normal text-charcoal/70">(optional)</span>
        <input name="Artwork link" type="url" placeholder="Google Drive, WeTransfer or Dropbox link" className={input} />
        <span className="mt-1 block text-xs font-normal text-charcoal/70">
          Prefer a link, or is the file over 10 MB? Paste it here. You can also reply to our quote email with your files,
          or email{" "}
          <a className="font-semibold text-rust-dark underline" href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </a>
          .{" "}
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
          No payment now. We'll reply by email with a quote including freight.
          Payment is due once your artwork is approved.
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
export const QUOTE_FORM_VERSION = "quote-v3";
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

export const MAX_QUOTE_ITEMS = 5;
/** Per-item labels repeated for items 2 to 5 as "Item N – <label>" (same meaning as item 1's labels). */
export const ITEM_FIELDS = [
  "Product code",
  "Product",
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
] as const;

/** Item 2 to 5 fields from their un-prefixed form values. */
function itemFieldsFrom(b: Record<string, string>): Record<string, string> {
  const take = (...keys: string[]) => {
    for (const k of keys) {
      const v = b[k]?.trim();
      delete b[k];
      if (v) return v;
    }
    return "";
  };
  const f: Record<string, string> = {};
  const code = take("Product code") || "other";
  f["Product code"] = code;
  const productRaw = take("Product");
  f["Product"] = PRODUCT_LABELS[code] ?? (productRaw || "N/A");
  f["Size"] = take("Size");
  f["Custom size (as entered)"] = take("Custom size");
  f["Size (mm)"] = take("Size (mm)") || sizeToMm(f["Custom size (as entered)"]) || sizeToMm(f["Size"]);
  f["Material"] = take("Banner material", "Material");
  f["Orientation"] = take("Orientation");
  f["Thickness"] = take("Thickness");
  f["Sides"] = take("Sides");
  f["Eyelets"] = take("Eyelets");
  f["Quantity"] = take("Quantity");
  f["Number of designs"] = take("Number of designs") || "1";
  f["Price shown"] = take("Price shown");
  f["Options"] = Object.entries(b)
    .filter(([, v]) => v)
    .map(([k, v]) => (k === "Options" ? v : `${k}: ${v}`))
    .join("; ");
  return f;
}

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
  "stretch-fabric-displays": "Stretch fabric displays",
  "table-top-banners": "Table-top banners",
  "acm-signs": "ACM signs",
  "rectangle-flags": "Rectangle flags",
  "lightbox-displays": "Lightbox displays",
  "big-head-cutouts": "Big head cutouts",
  "seg-fabric-frames": "SEG fabric frames",
  "crowd-barriers": "Crowd barrier frames and covers",
  "selfie-frames": "Selfie frames",
  "car-magnets": "Car magnets",
  "business-cards": "Business cards",
  "printed-vinyl": "Printed self-adhesive vinyl",
  packs: "Signage packs",
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

/** Multipart body for a quote that includes an artwork file. Existing email fields stay in order; the filename is appended last. */
export function quoteFormData(data: Record<string, string>, file: File): FormData {
  const body = new FormData();
  for (const [k, v] of Object.entries(data)) body.append(k, v);
  body.append("Artwork file", file.name);
  body.append("attachment", file, file.name);
  return body;
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
  // Items 2 to 5 on the general form: pull their "Item N – " fields out first, so item 1 works as before.
  const extraItems: Record<string, string>[] = [];
  for (let n = 2; n <= MAX_QUOTE_ITEMS; n++) {
    const pre = `Item ${n} – `;
    const bucket: Record<string, string> = {};
    for (const k of Object.keys(raw)) {
      if (k.startsWith(pre)) {
        bucket[k.slice(pre.length)] = raw[k]!;
        delete raw[k];
      }
    }
    if (Object.keys(bucket).length) extraItems.push(bucket);
  }
  const itemCount = take("Item count");
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
  const designs = take("Number of designs") || "1";
  const price = take("Price shown", "Estimate shown");
  const contact = { name: take("Name"), email: take("email", "Email"), phone: take("Phone"), business: take("Business") };
  const delivery = { suburb: take("Delivery suburb"), state: take("Delivery state"), postcode: take("Delivery postcode"), date: take("Needed by") };
  const artwork = { status: take("Artwork status"), link: take("Artwork link"), check: take("Artwork check") };
  const notes = take("Notes", "Message");
  const design = take("Design help needed");
  // Anything product specific that's left (stand, frame colour, LED lights, add-ons…) goes into Options.
  const extras = Object.entries(raw)
    .filter(([k, v]) => !k.startsWith("_") && k !== "attachment" && v)
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
  out["Item count"] = String(1 + extraItems.length);
  void itemCount;
  extraItems.forEach((b, i) => {
    const item = itemFieldsFrom(b);
    for (const k of ITEM_FIELDS) out[`Item ${i + 2} – ${k}`] = item[k] || "N/A";
  });
  if (extraItems.length) out._subject += ` + ${extraItems.length} more`;
  return out;
}

/** "How many designs?" (sent as "Number of designs" in the FormSubmit email). */
export function DesignsField({ prefix = "" }: { prefix?: string }) {
  return (
    <label className={label}>
      Number of different designs/artworks <span className="font-normal text-charcoal/70">(optional)</span>
      <input
        name={`${prefix}Number of designs`}
        type="number"
        inputMode="numeric"
        min={1}
        max={999}
        step={1}
        defaultValue={1}
        className={input}
      />
      <span className="mt-1 block text-xs font-normal text-charcoal/70">
        Same design on every item? Enter 1.
      </span>
    </label>
  );
}
