import { useState } from "react";
import { eachText } from "../data/tiers";
import {
  FROM_PER_M2,
  LIMITS,
  MIN_NOTE,
  priceFromInputs,
  sizeLabel,
  type AreaKind,
} from "../data/customSize";
import { money } from "../data/eventGear";
import { quoteHref } from "../data/quoteProducts";

const UNITS = ["mm", "cm", "m"] as const;
type Unit = (typeof UNITS)[number];

export type KindChoice = { kind: AreaKind; label: string };

/** Instant custom-size price box used on banners, corflute, runners, ACM and printed vinyl. */
export default function CustomSizeQuote({
  kinds,
  defaultKind,
  heading = "Custom size",
  intro,
  quoteSlug,
  quoteExtra,
  quoteSize,
  finishing,
}: {
  kinds: KindChoice[];
  defaultKind?: AreaKind;
  heading?: string;
  intro?: string;
  quoteSlug: string;
  quoteExtra?: Record<string, string>;
  quoteSize?: (kind: AreaKind) => string;
  finishing?: string;
}) {
  const [kind, setKind] = useState<AreaKind>(defaultKind ?? kinds[0]!.kind);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<Unit>("mm");
  const [qtyText, setQtyText] = useState("1");
  const lim = LIMITS[kind];
  const from = FROM_PER_M2[kind] ?? 0;
  const result = width || height || qtyText !== "1" ? priceFromInputs(kind, width, height, unit, qtyText) : null;
  const ok = result?.ok === true ? result : null;
  const err = result && !result.ok ? result.reason : "";
  const wLabel = lim.widthLabel ?? "Width";
  const hLabel = lim.heightLabel ?? "Height";

  return (
    <div className="mt-8 max-w-2xl rounded-2xl border-2 border-charcoal/15 bg-white p-4 sm:p-6" data-custom-size={kind} data-noanim>
      <h3 className="font-slab text-xl font-bold">{heading}</h3>
      {intro && <p className="mt-2 text-sm leading-relaxed">{intro}</p>}
      <p className="mt-2 text-sm">
        <span className="font-semibold">From ${from} per m².</span> {MIN_NOTE}
      </p>
      {kinds.length > 1 && (
        <div role="radiogroup" aria-label="Material" className="mt-4 flex flex-wrap gap-2">
          {kinds.map((k) => {
            const on = k.kind === kind;
            return (
              <button
                key={k.kind}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setKind(k.kind)}
                className={`min-h-11 rounded-full border-2 px-4 text-sm font-bold ${on ? "border-charcoal bg-charcoal text-cream" : "border-charcoal/20 bg-white hover:border-charcoal"}`}
              >
                {k.label}
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-4 grid grid-cols-[1fr_1fr_5.5rem] gap-3">
        <label className="block text-sm font-bold">
          {wLabel}
          <input
            type="number"
            inputMode="decimal"
            min={0.01}
            step="any"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none"
          />
        </label>
        <label className="block text-sm font-bold">
          {hLabel}
          <input
            type="number"
            inputMode="decimal"
            min={0.01}
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none"
          />
        </label>
        <label className="block text-sm font-bold">
          Units
          <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none">
            {UNITS.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold">
        Quantity
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={999}
          value={qtyText}
          onChange={(e) => setQtyText(e.target.value)}
          className="mt-1 block w-40 rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none"
        />
      </label>
      <div className="mt-5 rounded-lg bg-cream px-4 py-3" aria-live="polite" data-custom-estimate>
        {ok ? (
          <>
            <p className="text-sm">
              {ok.qty} × {sizeLabel(ok.widthMm, ok.heightMm)}
              {ok.swapped ? " (priced with the sides swapped to fit)" : ""}
              {ok.rounded ? ", rounded to the nearest millimetre" : ""}
            </p>
            <p>
              <span className="font-slab text-2xl font-bold text-rust-dark">{eachText(ok.total, ok.qty)}</span>
              <span className="font-semibold"> · {money(ok.total)} total</span>
            </p>
            {finishing && <p className="mt-1 text-xs text-charcoal/75">{finishing}</p>}
            <p className="mt-1 text-xs text-charcoal/75">{MIN_NOTE} Freight is quoted separately.</p>
            <a
              href={quoteHref(quoteSlug, quoteSize?.(kind) ?? (kind.startsWith("runner-") ? `${kind}:custom` : "other"), { ...quoteExtra, width: String(ok.widthMm), height: String(ok.heightMm), qty: String(ok.qty), ...(kind === "pvc" ? { material: "PVC vinyl" } : kind === "mesh" ? { material: "Mesh vinyl" } : kind === "fabric" ? { material: "Fabric" } : kind === "acm-double" ? { option: "double" } : kind === "acm-single" ? { option: "single" } : {}) })}
              className="btn-rust mt-4 inline-block"
            >
              Get a quote
            </a>
          </>
        ) : err ? (
          <p className="font-semibold">{err}</p>
        ) : (
          <p className="text-sm">Enter a width, height and quantity to see a price.</p>
        )}
      </div>
    </div>
  );
}
