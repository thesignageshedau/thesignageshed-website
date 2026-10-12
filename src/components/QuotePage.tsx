import { useEffect, useState } from "react";
import { FORMSUBMIT_ACTION, QUOTE_EMAIL } from "../data/mediaWalls";
import { QUOTE_PRODUCTS } from "../data/quoteProducts";
import {
  FormSubmitHidden,
  SubmitArea,
  input,
  label,
  useQuoteSubmit,
} from "./QuoteFormParts";

const SUBJECT = "Quote request (website)";
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

function productFromHash() {
  const q = window.location.hash.split("?")[1] ?? "";
  const slug = new URLSearchParams(q).get("product") ?? "";
  return QUOTE_PRODUCTS.some((p) => p.slug === slug) ? slug : "";
}

export default function QuotePage() {
  const [product, setProduct] = useState(productFromHash);
  const [today, setToday] = useState("");
  useEffect(() => {
    const onHash = () => setProduct(productFromHash());
    window.addEventListener("hashchange", onHash);
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const chosen = QUOTE_PRODUCTS.find((p) => p.slug === product);
  const { status, error, onSubmit } = useQuoteSubmit(
    "general",
    () => `General quote: ${chosen?.label ?? "none"}`,
  );

  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h1 className="text-4xl sm:text-5xl">Request a quote</h1>
        <p className="mt-3 text-lg leading-relaxed">
          Tell us what you need and we'll email you a quote with delivery
          included, usually within one business day. No payment now.
        </p>
        <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
          <form
            action={FORMSUBMIT_ACTION}
            method="POST"
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <FormSubmitHidden subject={SUBJECT} />
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl tracking-wide">
                Your details
              </legend>
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

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl tracking-wide">
                What you need
              </legend>
              <label className={label}>
                Product
                <select
                  name="Product"
                  required
                  className={input}
                  value={chosen?.label ?? ""}
                  onChange={(e) =>
                    setProduct(
                      QUOTE_PRODUCTS.find((p) => p.label === e.target.value)?.slug ?? "",
                    )
                  }
                >
                  <option value="" disabled>
                    Choose a product
                  </option>
                  {QUOTE_PRODUCTS.map((p) => (
                    <option key={p.slug} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={label}>
                Size or option
                <input
                  name="Size or option"
                  required
                  maxLength={200}
                  placeholder={chosen?.optionHint ?? "e.g. size, style, single or double sided"}
                  className={input}
                />
              </label>
              <label className={label}>
                Quantity
                <input
                  name="Quantity"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={9999}
                  step={1}
                  required
                  defaultValue={1}
                  className={input}
                />
              </label>
              <label className={label}>
                Date needed by <span className="font-normal text-charcoal/70">(optional)</span>
                <input name="Needed by" type="date" min={today || undefined} className={input} />
              </label>
            </fieldset>

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl tracking-wide">
                Delivery
              </legend>
              <label className={label}>
                Delivery suburb
                <input
                  name="Delivery suburb"
                  required
                  autoComplete="address-level2"
                  placeholder="e.g. Parramatta"
                  className={input}
                />
              </label>
              <label className={label}>
                State
                <select name="Delivery state" required defaultValue="" className={input}>
                  <option value="" disabled>
                    Choose a state
                  </option>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className="grid gap-4">
              <legend className="mb-3 font-display text-xl tracking-wide">
                Artwork
              </legend>
              <div role="radiogroup" aria-label="Is your artwork ready?" className="text-sm font-bold">
                Is your artwork ready?
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 font-normal">
                  {["Yes", "Need design help", "Not sure"].map((v, i) => (
                    <label key={v} className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="Artwork ready"
                        value={v}
                        required={i === 0}
                        className="h-5 w-5 accent-rust-dark"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
              <label className={label}>
                Artwork link <span className="font-normal text-charcoal/70">(optional)</span>
                <input
                  name="Artwork link"
                  type="url"
                  placeholder="Google Drive, WeTransfer or Dropbox link"
                  className={input}
                />
                <span className="mt-1 block text-xs font-normal text-charcoal/70">
                  Files can't be attached here. Share a link, or email your artwork to{" "}
                  <a className="font-semibold text-rust-dark underline" href={`mailto:${QUOTE_EMAIL}`}>
                    {QUOTE_EMAIL}
                  </a>{" "}
                  after you send this form.
                </span>
              </label>
              <label className={label}>
                Message
                <textarea
                  name="Message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={3000}
                  className={input}
                  placeholder="What it's for, colours, wording, anything we should know"
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
