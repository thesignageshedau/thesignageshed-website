import TrustStrip from "./TrustStrip";
import { useEffect, useState } from "react";
import { FORMSUBMIT_ACTION } from "../data/mediaWalls";
import { QUOTE_PRODUCTS } from "../data/quoteProducts";
import { OTHER, OTHER_LABEL, QUOTE_SPECS, money, type SizeChoice } from "../data/quoteOptions";
import * as CF from "../data/corfluteSigns";
import {
  ArtworkFields,
  DeliveryFields,
  DesignsField,
  FormSubmitHidden,
  SubmitArea,
  input,
  label,
  useQuoteSubmit,
} from "./QuoteFormParts";

const SUBJECT = "Quote request (website)";
const UNITS = ["mm", "cm", "m"] as const;
type Unit = (typeof UNITS)[number];
const UNIT_MM: Record<Unit, number> = { mm: 1, cm: 10, m: 1000 };
const BANNER_MATERIALS = ["PVC vinyl", "Mesh vinyl", "Fabric mesh"];
const THICKNESS_CHOICES: CF.Thickness[] = ["5mm", "3mm"];

/** Sizes where we ask for a custom width and height: "Custom size" on banners and corflute, and custom table runners. */
const isCustomSize = (product: string, size: string) =>
  size === OTHER || (product === "table-covers" && size === "runner-front:custom");
const tidy = (n: number) => String(Math.round(n * 100) / 100);

function hashParams() {
  return new URLSearchParams(window.location.hash.split("?")[1] ?? "");
}
function productFromHash() {
  const slug = hashParams().get("product") ?? "";
  return QUOTE_PRODUCTS.some((p) => p.slug === slug) ? slug : "";
}
function sizeFromHash(product: string) {
  const size = hashParams().get("size") ?? "";
  return QUOTE_SPECS[product]?.sizes.some((s) => s.id === size) || (size === OTHER && QUOTE_SPECS[product]?.allowOther)
    ? size
    : "";
}

function Radios<T extends string>({
  name,
  legend,
  choices,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  choices: { value: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={legend} className={label}>
      {legend}
      <div className="mt-1 flex flex-wrap gap-x-5 font-normal">
        {choices.map((c) => (
          <label key={c.value} className="flex min-h-11 items-center gap-2 text-base">
            <input
              type="radio"
              name={name}
              value={c.label}
              checked={value === c.value}
              onChange={() => onChange(c.value)}
              required
              className="h-5 w-5 accent-rust-dark"
            />
            {c.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function QuotePage() {
  const [artworkNote] = useState(() => (hashParams().get("artwork") ?? "").slice(0, 300));
  const [product, setProductState] = useState(productFromHash);
  const [size, setSize] = useState(() => sizeFromHash(productFromHash()));
  const [option, setOption] = useState("");
  const [thickness, setThickness] = useState<CF.Thickness>("5mm");
  const [sides, setSides] = useState<CF.Sides | "">("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<Unit>("mm");
  const setProduct = (slug: string, presetSize = "") => {
    setProductState(slug);
    setSize(presetSize);
    setOption("");
    setSides("");
  };
  useEffect(() => {
    const onHash = () => {
      const slug = productFromHash();
      setProduct(slug, sizeFromHash(slug));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const chosen = QUOTE_PRODUCTS.find((p) => p.slug === product);
  const spec = QUOTE_SPECS[product];
  const corflute = product === "corflute-signs";
  const custom = !!spec && !!size && isCustomSize(product, size);
  // Corflute asks orientation, thickness, sides and eyelets as separate questions.
  const options = spec && size && !custom && !corflute ? spec.options(size) : [];
  const sizeChoice = spec?.sizes.find((s) => s.id === size);
  const optionChoice = options.find((o) => o.id === option);
  const groups: [string, SizeChoice[]][] = [];
  for (const s of spec?.sizes ?? []) {
    const last = groups[groups.length - 1];
    if (last && last[0] === (s.group ?? "")) last[1].push(s);
    else groups.push([s.group ?? "", [s]]);
  }
  const cfSize = corflute ? CF.SIZES.find((x) => x.id === size) : undefined;
  const cfPrice = cfSize && sides ? cfSize.price[thickness][sides].upTo5 : null;
  const w = parseFloat(width);
  const h = parseFloat(height);
  const hasWH = custom && w > 0 && h > 0;
  const customText = hasWH ? `${tidy(w)} x ${tidy(h)} ${unit}` : "";
  const sizeMm = hasWH ? `${Math.round(w * UNIT_MM[unit])} x ${Math.round(h * UNIT_MM[unit])}` : "";
  const priceText =
    cfPrice != null
      ? `${money(cfPrice)} ${spec!.priceNote}.`
      : optionChoice?.price != null
        ? `${money(optionChoice.price)} ${spec!.priceNote}.`
        : sizeChoice?.from != null && !custom
          ? `From ${money(sizeChoice.from)} ${spec!.priceNote}.`
          : "";
  const { status, error, onSubmit } = useQuoteSubmit("general", () => `General quote: ${chosen?.label ?? "none"}`);
  const checkHref = `#/check-artwork${product ? `?product=${product}${size ? `&size=${encodeURIComponent(size)}` : ""}` : ""}`;

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
            data-form="general"
            data-product-code={product || "other"}
            className="space-y-6"
          >
            <FormSubmitHidden subject={SUBJECT} />
            {spec && size && (
              <input type="hidden" name="Size" value={size === OTHER ? "Custom size" : (sizeChoice?.label ?? "")} />
            )}
            {customText && <input type="hidden" name="Custom size" value={customText} />}
            {sizeMm && <input type="hidden" name="Size (mm)" value={sizeMm} />}
            {options.length > 0 && option && (
              <input
                type="hidden"
                name="Options"
                value={`${spec!.optionLabel}: ${option === OTHER ? OTHER_LABEL : (optionChoice?.label ?? "")}`}
              />
            )}
            {priceText && <input type="hidden" name="Price shown" value={priceText} />}
            {artworkNote && <input type="hidden" name="Artwork check" value={artworkNote} />}
            {artworkNote && (
              <p className="rounded-md border-2 border-charcoal/15 bg-cream px-4 py-3 text-sm">
                <span className="font-bold">Artwork check:</span> {artworkNote}. We'll include this with your request.
                Reply to our quote email with the file attached.
              </p>
            )}

            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 font-display text-xl tracking-wide">What you need</legend>
              <label className={`${label} sm:col-span-2`}>
                Product
                <select
                  name="Product"
                  required
                  className={input}
                  value={chosen?.label ?? ""}
                  onChange={(e) => setProduct(QUOTE_PRODUCTS.find((p) => p.label === e.target.value)?.slug ?? "")}
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

              {spec && (
                <label className={`${label} sm:col-span-2`}>
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
                    {spec.allowOther && <option value={OTHER}>Custom size</option>}
                  </select>
                </label>
              )}

              {!spec && product && (
                <label className={`${label} sm:col-span-2`}>
                  What you need
                  <input
                    name="Size or option"
                    required
                    maxLength={200}
                    placeholder={chosen?.optionHint ?? "e.g. size, style, single or double sided"}
                    className={input}
                  />
                </label>
              )}

              {custom && (
                <div className="sm:col-span-2">
                  <p className={label}>Custom size (finished size, width × height)</p>
                  <div className="mt-1 grid grid-cols-[1fr_1fr_5.5rem] gap-3">
                    <label className="block text-xs font-semibold text-charcoal/80">
                      Width
                      <input
                        type="number"
                        inputMode="decimal"
                        min={0.01}
                        step="any"
                        required
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className={input}
                      />
                    </label>
                    <label className="block text-xs font-semibold text-charcoal/80">
                      Height
                      <input
                        type="number"
                        inputMode="decimal"
                        min={0.01}
                        step="any"
                        required
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={input}
                      />
                    </label>
                    <label className="block text-xs font-semibold text-charcoal/80">
                      Units
                      <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className={input}>
                        {UNITS.map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-charcoal/70">
                    {sizeMm ? `That's ${sizeMm.replace(" x ", " × ")} mm. ` : ""}We'll confirm what's possible in your quote.
                  </p>
                </div>
              )}

              {product === "banners" && custom && (
                <label className={label}>
                  Banner material
                  <select name="Banner material" required defaultValue="" className={input}>
                    <option value="" disabled>
                      Choose a material
                    </option>
                    {BANNER_MATERIALS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </label>
              )}

              {corflute && size && (
                <>
                  {!custom && (
                    <label className={label}>
                      Orientation
                      <select name="Orientation" required defaultValue={cfSize?.orientation ?? ""} key={size} className={input}>
                        {CF.ORIENTATIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  <Radios
                    name="Thickness"
                    legend="Thickness"
                    choices={THICKNESS_CHOICES.map((t) => ({ value: t, label: t }))}
                    value={thickness}
                    onChange={setThickness}
                  />
                  <Radios
                    name="Sides"
                    legend="Sides"
                    choices={CF.SIDES.map((sd) => ({ value: sd.id, label: sd.label }))}
                    value={sides}
                    onChange={setSides}
                  />
                  <label className={label}>
                    Eyelets
                    <select name="Eyelets" required defaultValue={CF.EYELETS[0]!.label} className={input}>
                      {CF.EYELETS.map((e) => (
                        <option key={e.id} value={e.label}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {options.length > 0 && (
                <label className={`${label} sm:col-span-2`}>
                  {spec!.optionLabel}
                  <select required className={input} value={option} onChange={(e) => setOption(e.target.value)}>
                    <option value="" disabled>
                      Choose an option
                    </option>
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {priceText && (
                <p className="text-sm font-semibold text-rust-dark sm:col-span-2" aria-live="polite">
                  {priceText}{" "}
                  <span className="font-normal text-charcoal/70">Prices are final, no GST added. Delivery quoted separately.</span>
                </p>
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
            </fieldset>

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
