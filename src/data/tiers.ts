// Quantity tier pricing. Each tier is [quantity, our total price for that quantity, 1 design, freight extra].
// Between tiers, the whole-dollar unit price of the tier at or below the chosen quantity applies, but a line never
// costs more than any larger quantity we price (so ordering fewer never costs more than ordering more).
export type Tier = [qty: number, total: number];

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Whole-dollar unit price of the tier at or below this quantity (the published price-table figure). */
export function tierUnit(tiers: Tier[], qty: number): number {
  let i = 0;
  tiers.forEach(([q], n) => {
    if (qty >= q) i = n;
  });
  const [q, total] = tiers[i]!;
  return Math.ceil(round2(total / q) - 1e-9);
}

/** Smallest raw total at this quantity or any larger one up to `horizon` (the last band start). Raw totals past the
 * last band rise with quantity, so this makes every line total non-decreasing and never above a larger order's. */
export function cappedTotal(raw: (qty: number) => number, qty: number, horizon: number): number {
  let v = raw(qty);
  for (let q = qty + 1; q <= horizon; q++) v = Math.min(v, raw(q));
  return round2(v);
}

export const tierTotal = (tiers: Tier[], qty: number) =>
  cappedTotal((q) => tierUnit(tiers, q) * q, qty, tiers[tiers.length - 1]![0]);

/** Price each at this quantity: the (whole-dollar) line total divided by the quantity. Can have cents where the
 * line is capped at a larger order's total; show it with eachText. */
export const tierEach = (tiers: Tier[], qty: number) => tierTotal(tiers, qty) / qty;

/** Price each at each band's smallest quantity, for price tables. */
export const tierBands = (tiers: Tier[], mins: number[]) => mins.map((m) => tierUnit(tiers, m));

/** "$32 each" when the total divides evenly, otherwise "about $39 each" (rounded to a whole dollar). */
export function eachText(total: number, qty: number): string {
  const e = total / qty;
  const whole = Math.abs(e - Math.round(e)) < 1e-6;
  return `${whole ? "" : "about "}$${Math.round(e).toLocaleString("en-AU")} each`;
}

export const DESIGN_NOTE = "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.";
export const MIN_NOTE = "Minimum order $180 (excl. freight).";
