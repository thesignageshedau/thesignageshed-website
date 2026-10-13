import { useEffect, useState } from "react";
import { QUOTE_PRODUCTS } from "../data/quoteProducts";
import { OTHER, OTHER_LABEL, QUOTE_SPECS, money, type SizeChoice } from "../data/quoteOptions";
import * as CF from "../data/corfluteSigns";
import * as PB from "../data/pullUpBanners";
import { corflutePrice } from "./CorflutePrices";
import { DesignsField, input, label } from "./QuoteFormParts";

// One product line on the quote form. Item 1 uses the plain field names (the original 28-label email);
// items 2 to 5 prefix every field name with "Item N – " (see quotePayload and docs/quote-email-format.md).

export { MAX_QUOTE_ITEMS as MAX_ITEMS } from "./QuoteFormParts";
const UNITS = ["mm", "cm", "m"] as const;
type Unit = (typeof UNITS)[number];
const UNIT_MM: Record<Unit, number> = { mm: 1, cm: 10, m: 1000 };
const BANNER_MATERIALS = ["PVC vinyl", "Mesh vinyl", "Fabric mesh"];
const THICKNESS_CHOICES: CF.Thickness[] = ["5mm", "3mm"];

/** Sizes where we ask for a custom width and height: "Custom size" on banners and corflute, and custom table runners. */
const isCustomSize = (product: string, size: string) =>
  size === OTHER || (product === "table-covers" && size === "runner-front:custom");
const tidy = (n: number) => String(Math.round(n * 100) / 100);


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


export function itemPrefix(n: number) {
  return n === 1 ? "" : `Item ${n} – `;
}

function searchParams() {
  return new URLSearchParams(window.location.search);
}
export function productFromUrl() {
  const slug = searchParams().get("product") ?? "";
  return QUOTE_PRODUCTS.some((p) => p.slug === slug) ? slug : "";
}
export function sizeFromUrl(product: string) {
  const size = searchParams().get("size") ?? "";
  return QUOTE_SPECS[product]?.sizes.some((s) => s.id === size) || (size === OTHER && QUOTE_SPECS[product]?.allowOther)
    ? size
    : "";
}

export default function QuoteItem({
  n,
  fromUrl = false,
  onRemove,
  onChange,
}: {
  n: number;
  fromUrl?: boolean;
  onRemove?: () => void;
  onChange?: (product: string, size: string) => void;
}) {
  const p = itemPrefix(n);
  const [product, setProductState] = useState(() => (fromUrl ? productFromUrl() : ""));
  const [size, setSize] = useState(() => (fromUrl ? sizeFromUrl(productFromUrl()) : ""));
  const [option, setOption] = useState("");
  const [thickness, setThickness] = useState<CF.Thickness>("5mm");
  const [sides, setSides] = useState<CF.Sides | "">("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<Unit>("mm");
  const [qtyText, setQtyText] = useState("1");
  const setProduct = (slug: string, presetSize = "") => {
    setProductState(slug);
    setSize(presetSize);
    setOption("");
    setSides("");
  };
  useEffect(() => {
    if (!fromUrl) return;
    const onNav = () => {
      const slug = productFromUrl();
      setProduct(slug, sizeFromUrl(slug));
    };
    window.addEventListener("hashchange", onNav);
    return () => window.removeEventListener("hashchange", onNav);
  }, [fromUrl]);
  useEffect(() => onChange?.(product, size), [product, size]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const qty = Math.floor(Number(qtyText));
  const cfPrice = cfSize && sides && qty >= 1 && qty <= 999 ? corflutePrice(cfSize.id, thickness, sides, qty) : null;
  const w = parseFloat(width);
  const h = parseFloat(height);
  const hasWH = custom && w > 0 && h > 0;
  const customText = hasWH ? `${tidy(w)} x ${tidy(h)} ${unit}` : "";
  const sizeMm = hasWH ? `${Math.round(w * UNIT_MM[unit])} x ${Math.round(h * UNIT_MM[unit])}` : "";
  const priceText =
    cfPrice != null
      ? `${money(cfPrice.each)} each, ${money(cfPrice.total)} total for ${qty} ${qty === 1 ? "sign" : "signs"}.`
      : optionChoice?.price != null
        ? `${money(optionChoice.price)} ${spec!.priceNote}.`
        : sizeChoice?.from != null && !custom
          ? `From ${money(sizeChoice.from)} ${spec!.priceNote}.`
          : "";

  return (
    <div className="rounded-xl border-2 border-charcoal/10 p-4 sm:p-5" data-item={n}>
      {n > 1 && <input type="hidden" name={`${p}Product code`} value={product || "other"} />}
            {spec && size && (
              <input type="hidden" name={`${p}Size`} value={size === OTHER ? "Custom size" : (sizeChoice?.label ?? "")} />
            )}
            {customText && <input type="hidden" name={`${p}Custom size`} value={customText} />}
            {sizeMm && <input type="hidden" name={`${p}Size (mm)`} value={sizeMm} />}
            {options.length > 0 && option && (
              <input
                type="hidden"
                name={`${p}Options`}
                value={`${spec!.optionLabel}: ${option === OTHER ? OTHER_LABEL : (optionChoice?.label ?? "")}`}
              />
            )}
            {priceText && <input type="hidden" name={`${p}Price shown`} value={priceText} />}
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="mb-3 flex w-full items-center justify-between gap-3 font-display text-xl tracking-wide">
                {n === 1 ? "What you need" : `Item ${n}`}
                {onRemove && (
                  <button type="button" onClick={onRemove} className="min-h-11 font-sans text-sm font-semibold text-rust-dark underline underline-offset-4">
                    Remove<span className="sr-only"> item {n}</span>
                  </button>
                )}
              </legend>
              <label className={`${label} sm:col-span-2`}>
                Product
                <select
                  name={`${p}Product`}
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
                    name={`${p}Size or option`}
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
                  <select name={`${p}Banner material`} required defaultValue="" className={input}>
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
                      <select name={`${p}Orientation`} required defaultValue={cfSize?.orientation ?? ""} key={size} className={input}>
                        {CF.ORIENTATIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  <Radios
                    name={`${p}Thickness`}
                    legend="Thickness"
                    choices={THICKNESS_CHOICES.map((t) => ({ value: t, label: t }))}
                    value={thickness}
                    onChange={setThickness}
                  />
                  <Radios
                    name={`${p}Sides`}
                    legend="Sides"
                    choices={CF.SIDES.map((sd) => ({ value: sd.id, label: sd.label }))}
                    value={sides}
                    onChange={setSides}
                  />
                  <label className={label}>
                    Eyelets
                    <select name={`${p}Eyelets`} required defaultValue={CF.EYELETS[0]!.label} className={input}>
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

              {product === "pull-up-banners" && size && (option === "luxury" || option === "double") && (
                <label className={`${label} sm:col-span-2`}>
                  Base colour
                  <select name={`${p}Base colour`} required key={`${size}-${option}`} className={input}>
                    {PB.basesFor(option, size).map((b) => (
                      <option key={b}>{PB.BASE_LABELS[b]}</option>
                    ))}
                  </select>
                  <span className="mt-1 block text-xs font-normal text-charcoal/70">
                    The colour of the metal stand at the bottom. Same price either way.
                    {PB.basesFor(option, size).length < 2 ? " Black is only made for 850mm Luxury stands." : ""}
                  </span>
                </label>
              )}

              {priceText && (
                <p className="text-sm font-semibold text-rust-dark sm:col-span-2" aria-live="polite">
                  {priceText}{" "}
                  <span className="font-normal text-charcoal/70">Prices include everything except delivery (we're not registered for GST).</span>
                </p>
              )}

              <label className={label}>
                Quantity
                <input
                  name={`${p}Quantity`}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={9999}
                  step={1}
                  required
                  value={qtyText}
                  onChange={(e) => setQtyText(e.target.value)}
                  className={input}
                />
              </label>
              <DesignsField prefix={p} />
            </fieldset>
    </div>
  );
}
