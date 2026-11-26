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

/** True when the line total splits into an exact price each (to the cent). */
export function eachIsExact(total: number, qty: number): boolean {
  const cents = Math.round(total * 100);
  return qty > 0 && cents % qty === 0;
}

/** Exact price each: "$32 each" or "$22.50 each". When the total doesn't split evenly to the cent, show the exact
 * line instead ("$205 for 3") so we never print an approximate price. */
export function eachText(total: number, qty: number): string {
  if (!eachIsExact(total, qty)) return `$${total.toLocaleString("en-AU")} for ${qty}`;
  const cents = Math.round(total * 100) / qty;
  const e = cents / 100;
  const s = cents % 100 === 0 ? e.toLocaleString("en-AU") : e.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `$${s} each`;
}

export const DESIGN_NOTE = "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.";
