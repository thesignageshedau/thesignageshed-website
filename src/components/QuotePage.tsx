import TrustStrip from "./TrustStrip";
import { useEffect, useState } from "react";
import { FORMSUBMIT_ACTION, QUOTE_EMAIL } from "../data/mediaWalls";
import { QUOTE_PRODUCTS } from "../data/quoteProducts";
import { OTHER, OTHER_LABEL, QUOTE_SPECS, money, type SizeChoice } from "../data/quoteOptions";
import {
  FormSubmitHidden,
  SubmitArea,
  input,
  label,
  useQuoteSubmit, DesignsField } from "./QuoteFormParts";

const SUBJECT = "Quote request (website)";
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

function hashParams() {
  return new URLSearchParams(window.location.hash.split("?")[1] ?? "");
}
function productFromHash() {
  const slug = hashParams().get("product") ?? "";
  return QUOTE_PRODUCTS.some((p) => p.slug === slug) ? slug : "";
}
function sizeFromHash(product: string) {
  const size = hashParams().get("size") ?? "";
  return QUOTE_SPECS[product]?.sizes.some((s) => s.id === size) ? size : "";
}

export default function QuotePage() {
  const [artworkNote] = useState(() => (hashParams().get("artwork") ?? "").slice(0, 300));
  const [product, setProductState] = useState(productFromHash);
  const [size, setSize] = useState(() => sizeFromHash(productFromHash()));
  const [option, setOption] = useState("");
  const setProduct = (slug: string, presetSize = "") => {
    setProductState(slug);
    setSize(presetSize);
    setOption("");
  };
  const [today, setToday] = useState("");
  useEffect(() => {
    const onHash = () => {
      const slug = productFromHash();
      setProduct(slug, sizeFromHash(slug));
    };
    window.addEventListener("hashchange", onHash);
    const d = new Date();
    setToday(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const chosen = QUOTE_PRODUCTS.find((p) => p.slug === product);
  const spec = QUOTE_SPECS[product];
  const options = spec && size && size !== OTHER ? spec.options(size) : [];
  const sizeChoice = spec?.sizes.find((s) => s.id === size);
  const optionChoice = options.find((o) => o.id === option);
  const groups: [string, SizeChoice[]][] = [];
  for (const s of spec?.sizes ?? []) {
    const last = groups[groups.length - 1];
    if (last && last[0] === (s.group ?? "")) last[1].push(s);
    else groups.push([s.group ?? "", [s]]);
  }
  const priceText = optionChoice?.price != null
    ? `${money(optionChoice.price)} ${spec!.priceNote}.`
    : sizeChoice?.from != null
      ? `From ${money(sizeChoice.from)} ${spec!.priceNote}.`
      : "";
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
        <div className="mt-6"><TrustStrip /></div>
        <div className="mt-8 rounded-2xl border-2 border-charcoal/15 bg-white p-5 sm:p-8">
          <form
            action={FORMSUBMIT_ACTION}
            method="POST"
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <FormSubmitHidden subject={SUBJECT} />
            {spec && <input type="hidden" name="Size" value={size === OTHER ? OTHER_LABEL : (sizeChoice?.label ?? "")} />}
            {options.length > 0 && (
              <input type="hidden" name="Options" value={option === OTHER ? OTHER_LABEL : (optionChoice?.label ?? "")} />
            )}
            {priceText && <input type="hidden" name="Price shown" value={priceText} />}
            {artworkNote && <input type="hidden" name="Artwork check" value={artworkNote} />}
            {artworkNote && (
              <p className="rounded-md border-2 border-charcoal/15 bg-cream px-4 py-3 text-sm sm:col-span-2">
                <span className="font-bold">Artwork check:</span> {artworkNote}. We'll include this with your request. Reply to our quote email with the file attached.
              </p>
            )}
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
              {spec ? (
                <>
                  <label className={label}>
                    {spec.sizeLabel}
                    <select
                      required
                      className={input}
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                        setOption("");
                      }}
                    >
                      <option value="" disabled>
                        Choose {spec.sizeLabel.toLowerCase()}
                      </option>
                      {groups.map(([g, list]) =>
                        g ? (
                          <optgroup key={g} label={g}>
                            {list.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.label}
                              </option>
                            ))}
                          </optgroup>
                        ) : (
                          list.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.label}
                            </option>
                          ))
                        ),
                      )}
                      {spec.allowOther && <option value={OTHER}>{OTHER_LABEL}</option>}
                    </select>
                  </label>
                  {options.length > 0 && (
                    <label className={label}>
                      {spec.optionLabel}
                      <select
                        required
                        className={input}
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                      >
                        <option value="" disabled>
                          Choose an option
                        </option>
                        {options.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                        {spec.allowOther && <option value={OTHER}>{OTHER_LABEL}</option>}
                      </select>
                    </label>
                  )}
                  {priceText && (
                    <p className="text-sm font-semibold text-rust-dark sm:col-span-2" aria-live="polite">
                      {priceText}{" "}
                      <span className="font-normal text-charcoal/70">
                        Prices are final, no GST added. Delivery quoted separately.
                      </span>
                    </p>
                  )}
                </>
              ) : null}
              {(!spec || size === OTHER || option === OTHER) && (
                <label className={label}>
                  {spec ? "Tell us the size or option" : "Size or option"}
                  <input
                    name="Size details"
                    required
                    maxLength={200}
                    placeholder={chosen?.optionHint ?? "e.g. size, style, single or double sided"}
                    className={input}
                  />
                </label>
              )}
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
              <DesignsField />
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
                  after you send this form.{" "}
                  <a className="font-semibold text-rust-dark underline" href={`#/check-artwork${product ? `?product=${product}${size ? `&size=${encodeURIComponent(size)}` : ""}` : ""}`}>
                    Check your artwork first
                  </a>
                  .
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
