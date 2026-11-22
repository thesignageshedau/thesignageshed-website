import { useState } from "react";
import { SIDES, SIZES, money, signsTotal, type Sides, type Thickness } from "../data/corfluteSigns";
import { eachText } from "../data/tiers";
import { quoteHref } from "../data/quoteProducts";
import { FROM_PER_M2, MIN_NOTE, kindForCorflute, priceFromInputs, sizeLabel } from "../data/customSize";

const EXAMPLES = [1, 5, 10, 20, 50, 100];
const UNITS = ["mm", "cm", "m"] as const;
type Unit = (typeof UNITS)[number];
const CUSTOM = "custom";

/** Price for qty signs: one consistent "each" and "total", whichever band applies. */
export function corflutePrice(sizeId: string, thick: Thickness, sides: Sides, qty: number) {
  const total = signsTotal(sizeId, thick, sides, qty);
  return { each: total / qty, total };
}

const pill = (on: boolean) =>
  `min-h-11 rounded-md px-3 py-2 font-slab font-bold ${on ? "bg-charcoal text-cream" : "bg-white text-charcoal hover:bg-cream"}`;

/** Corflute prices on a phone-friendly card: pick size, sides and quantity, see the price per sign and the total. */
export default function CorflutePrices({ thick }: { thick: Thickness }) {
  const [size, setSize] = useState(SIZES[1]!.id);
  const [sides, setSides] = useState<Sides>("single");
  const [qtyText, setQtyText] = useState("10");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<Unit>("mm");
  const custom = size === CUSTOM;
  const qty = Math.min(999, Math.max(1, Math.floor(Number(qtyText)) || 1));
  const listed = !custom && SIZES.some((s) => s.id === size) ? corflutePrice(size, thick, sides, qty) : null;
  const customRes = custom ? priceFromInputs(kindForCorflute(thick, sides), width, height, unit, qtyText) : null;
  const now = customRes?.ok ? { each: customRes.each, total: customRes.total } : listed;
  const label = custom ? (customRes?.ok ? sizeLabel(customRes.widthMm, customRes.heightMm) : "custom size") : SIZES.find((s) => s.id === size)!.label;
  return (
    <div className="mt-8 max-w-2xl rounded-2xl border-2 border-charcoal/15 bg-white p-4 sm:p-6" data-noanim>
      <p className="text-sm font-bold">Size (W × H, portrait or landscape)</p>
      <div role="radiogroup" aria-label="Size" className="mt-2 grid grid-cols-2 gap-2 rounded-lg border-2 border-charcoal p-1 sm:grid-cols-4">
        {SIZES.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={size === s.id} onClick={() => setSize(s.id)} className={`${pill(size === s.id)} text-sm sm:text-base`}>
            {s.label}
          </button>
        ))}
        <button type="button" role="radio" aria-checked={custom} onClick={() => setSize(CUSTOM)} className={`${pill(custom)} text-sm sm:text-base`}>
          Custom size
        </button>
      </div>
      {custom && (
        <>
          <p className="mt-3 text-sm">
            <span className="font-semibold">From ${FROM_PER_M2[kindForCorflute(thick, sides)]} per m².</span> {MIN_NOTE}
          </p>
          <div className="mt-3 grid grid-cols-[1fr_1fr_5.5rem] gap-3">
            <label className="block text-xs font-bold">
              Width
              <input type="number" inputMode="decimal" min={0.01} step="any" value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none" />
            </label>
            <label className="block text-xs font-bold">
              Height
              <input type="number" inputMode="decimal" min={0.01} step="any" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none" />
            </label>
            <label className="block text-xs font-bold">
              Units
              <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="mt-1 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none">
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold">Printed</p>
          <div role="radiogroup" aria-label="Printed sides" className="mt-2 grid grid-cols-2 gap-2 rounded-lg border-2 border-charcoal p-1">
            {SIDES.map((sd) => (
              <button key={sd.id} type="button" role="radio" aria-checked={sides === sd.id} onClick={() => setSides(sd.id)} className={`${pill(sides === sd.id)} text-sm`}>
                {sd.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm font-bold">
          How many signs?
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={qtyText}
            onChange={(e) => setQtyText(e.target.value)}
            className="mt-2 block w-full rounded-md border-2 border-charcoal/25 px-3 py-2.5 text-base focus:border-rust-dark focus:outline-none"
          />
        </label>
      </div>
      <p className="mt-5 rounded-lg bg-cream px-4 py-3" aria-live="polite" data-custom-estimate={custom ? "1" : undefined}>
        {custom && customRes && !customRes.ok ? (
          <span className="font-semibold">{customRes.reason}</span>
        ) : now ? (
          <>
            <span className="block text-sm">{qty} × {label}, {sides === "single" ? "single" : "double"} sided, {thick}</span>
            <span className="font-slab text-2xl font-bold text-rust-dark">{eachText(now.total, qty)}</span>
            <span className="font-semibold"> · {money(now.total)} total</span>
          </>
        ) : (
          <span className="text-sm">Enter a width and height to see a price.</span>
        )}
      </p>
      {!custom && (
      <table className="mt-5 w-full text-left text-sm sm:text-base">
        <caption className="sr-only">{label} {sides} sided corflute prices by quantity</caption>
        <thead>
          <tr className="border-b-2 border-charcoal/15">
            <th scope="col" className="py-2 font-slab">Signs</th>
            <th scope="col" className="py-2 font-slab">Each</th>
            <th scope="col" className="py-2 text-right font-slab">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10">
          {EXAMPLES.map((n) => {
            const r = corflutePrice(size, thick, sides, n);
            return (
              <tr key={n}>
                <th scope="row" className="py-2 font-semibold">{n}</th>
                <td className="py-2 font-bold text-rust-dark">{eachText(r.total, n).replace(/ each$/, "")}</td>
                <td className="py-2 text-right">{money(r.total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      )}
      <p className="mt-3 text-sm text-charcoal/80">
        {custom
          ? "Freight is quoted separately. Eyelets and extra designs are added in your quote."
          : "Up to 5 signs is one price, and so is 6 to 10, so ordering 5 or 10 gets you the best price per sign. From 11 signs the price per sign drops as you order more."}
      </p>
      {(!custom || now) && (
        <a
          href={custom && customRes?.ok ? quoteHref("corflute-signs", "other", { sides, qty, width: customRes.widthMm, height: customRes.heightMm, thickness: thick }) : quoteHref("corflute-signs", size, { sides, qty })}
          className="btn-rust mt-5 inline-block"
        >
          Get a quote for {label} signs
        </a>
      )}
    </div>
  );
}
