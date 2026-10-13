// Corflute sign prices, sizes, extras, downloads and the quote estimate. Premium (Australian-made) corflute, 5mm or 3mm.
// Prices come from the customer Price List tab of the Corflute Sign spreadsheet (+30%). Bundle prices (up to 5 signs,
// 6 to 10 signs) are flat prices rounded up to the next $5. Per-sign prices from 11 signs are rounded up per sign
// (under $20 to the next 50c, then to the next $1). Prices include everything except delivery (not registered for GST).

export const PRICE_NOTES = [
  "Prices include everything except delivery (we're not registered for GST)",
] as const;
export const MATERIAL =
  "Printed in full colour on premium Australian-made 5mm corflute, built for outdoor use.";

export type Thickness = "5mm" | "3mm";
export const THICKNESSES: { id: Thickness; label: string; short: string }[] = [
  { id: "5mm", label: "5mm", short: "5mm" },
];

export type Sides = "single" | "double";
export const SIDES: { id: Sides; label: string }[] = [
  { id: "single", label: "Single sided" },
  { id: "double", label: "Double sided" },
];

/** Bundle columns are flat prices for the whole order; tier columns are per sign. */
export type Prices = {
  upTo5: number; // flat price for 1 to 5 signs
  upTo10: number; // flat price for 6 to 10 signs
  from11: number; // per sign, 11 to 19
  from20: number; // per sign, 20 to 49
  from50: number; // per sign, 50 to 99
  from100: number; // per sign, 100+
};
export type CorfluteSize = {
  id: string;
  label: string; // "600 × 900mm"
  orientation: "Portrait" | "Landscape";
  price: Record<Thickness, Record<Sides, Prices>>;
};

const p = (
  upTo5: number,
  upTo10: number,
  from11: number,
  from20: number,
  from50: number,
  from100: number,
): Prices => ({ upTo5, upTo10, from11, from20, from50, from100 });

export const SIZES: CorfluteSize[] = [
  {
    id: "600x450",
    label: "600 × 450mm",
    orientation: "Landscape",
    price: {
      "5mm": {
        single: p(180, 180, 18, 12, 8.5, 7.5),
        double: p(180, 220, 22, 17, 13, 11.5),
      },
      "3mm": {
        single: p(180, 180, 18, 10, 7.5, 6.5),
        double: p(180, 190, 19, 14.5, 11.5, 10),
      },
    },
  },
  {
    id: "600x900",
    label: "600 × 900mm",
    orientation: "Portrait",
    price: {
      "5mm": {
        single: p(180, 235, 24, 18, 14.5, 12.5),
        double: p(230, 340, 34, 27, 23, 20),
      },
      "3mm": {
        single: p(180, 200, 20, 15.5, 12, 10.5),
        double: p(195, 290, 29, 24, 19.5, 17),
      },
    },
  },
  {
    id: "900x1200",
    label: "900 × 1200mm",
    orientation: "Portrait",
    price: {
      "5mm": {
        single: p(235, 355, 36, 30, 25, 22),
        double: p(340, 540, 54, 47, 40, 36),
      },
      "3mm": {
        single: p(200, 305, 31, 26, 21, 18.5),
        double: p(290, 465, 47, 40, 34, 31),
      },
    },
  },
];

export const COLUMNS: {
  key: keyof Prices;
  label: string;
  note: string;
  flat: boolean;
}[] = [
  { key: "upTo5", label: "1 to 5 signs", note: "flat price", flat: true },
  { key: "upTo10", label: "6 to 10 signs", note: "flat price", flat: true },
  { key: "from11", label: "11 to 19", note: "per sign", flat: false },
  { key: "from20", label: "20 to 49", note: "per sign", flat: false },
  { key: "from50", label: "50 to 99", note: "per sign", flat: false },
  { key: "from100", label: "100+", note: "per sign", flat: false },
];

/** Smallest order price (a flat bundle of up to 5 signs). */
export const FROM_PRICE = Math.min(
  ...SIZES.flatMap((s) =>
    THICKNESSES.flatMap((t) => [
      s.price[t.id].single.upTo5,
      s.price[t.id].double.upTo5,
    ]),
  ),
);

// ---- extras
export const EYELET_EACH = 0.5; // per eyelet, per sign
export const EXTRA_DESIGN = 9; // per extra artwork in the same order
export type Eyelets = "none" | "4corners" | "2top" | "2sides" | "custom";
export const EYELETS: { id: Eyelets; label: string; count: number }[] = [
  { id: "none", label: "No eyelets", count: 0 },
  { id: "4corners", label: "4 eyelets, one in each corner", count: 4 },
  { id: "2top", label: "2 eyelets, top corners", count: 2 },
  { id: "custom", label: "Other positions (tell us in the notes)", count: 0 },
];

// Every size can be printed portrait or landscape (same price); the quote form asks which.
export const ORIENTATIONS = ["Portrait", "Landscape"] as const;

// ---- quote form choices and the live estimate
export type QuoteChoice = {
  size: string; // a SIZES id
  thickness: Thickness;
  sides: Sides;
  eyelets: Eyelets;
  designs: string;
  qty: string;
};
export function normalise(c: QuoteChoice): QuoteChoice {
  return { ...c, size: SIZES.some((s) => s.id === c.size) ? c.size : "" };
}

/** Which price applies to an order of qty signs. */
export function bandFor(qty: number): (typeof COLUMNS)[number] {
  if (qty <= 5) return COLUMNS[0];
  if (qty <= 10) return COLUMNS[1];
  if (qty <= 19) return COLUMNS[2];
  if (qty <= 49) return COLUMNS[3];
  if (qty <= 99) return COLUMNS[4];
  return COLUMNS[5];
}

export type Estimate =
  | {
      ok: true;
      qty: number;
      band: string;
      signs: number; // price of the signs (bundle or qty × per sign)
      eyelets: number;
      designs: number;
      total: number;
      perSign?: number;
    }
  | { ok: false; reason: string };
export function estimate(c: QuoteChoice): Estimate {
  const s = SIZES.find((x) => x.id === c.size);
  if (!s) return { ok: false, reason: "Pick a size" };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 999)
    return { ok: false, reason: "Enter a quantity from 1 to 999" };
  const designs = Math.floor(Number(c.designs || "1"));
  if (!Number.isFinite(designs) || designs < 1 || designs > qty)
    return {
      ok: false,
      reason: "Enter a number of designs from 1 up to the number of signs",
    };
  const col = bandFor(qty);
  const price = s.price[c.thickness][c.sides][col.key];
  const signs = col.flat ? price : price * qty;
  const count = EYELETS.find((e) => e.id === c.eyelets)?.count ?? 0;
  const eyelets = round2(count * EYELET_EACH * qty);
  const extra = (designs - 1) * EXTRA_DESIGN;
  return {
    ok: true,
    qty,
    band: col.flat ? `${col.label} (flat price)` : `${col.label} signs`,
    signs,
    eyelets,
    designs: extra,
    total: round2(signs + eyelets + extra),
    perSign: col.flat ? undefined : price,
  };
}
const round2 = (n: number) => Math.round(n * 100) / 100;

// ---- artwork guides and templates (public/downloads/corflute-signs)
const D = "downloads/corflute-signs/";
export type Download = { label: string; guide: string; template: string };
export const DOWNLOADS: Download[] = SIZES.map((s) => ({
  label: s.label,
  guide: `${D}corflute-sign-${s.id}mm-artwork-guide.pdf`,
  template: `${D}corflute-sign-${s.id}mm-artwork-template.pdf`,
}));

/** Dollars, with cents only when there are some: $180, $8.50, $1,234.50. */
export const money = (n: number) =>
  `$${n.toLocaleString("en-AU", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
