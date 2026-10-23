// Quantity tier pricing. Each tier is [quantity, our total price for that quantity, 1 design, freight extra].
// Between tiers, the per-unit price of the tier at or below the chosen quantity applies, but a line never
// costs more than the next tier's total (so ordering fewer never costs more than ordering more).
export type Tier = [qty: number, total: number];

const round2 = (n: number) => Math.round(n * 100) / 100;

export function tierTotal(tiers: Tier[], qty: number): number {
  let i = 0;
  tiers.forEach(([q], n) => {
    if (qty >= q) i = n;
  });
  const [q, total] = tiers[i]!;
  let v = (total / q) * qty;
  const next = tiers[i + 1];
  if (next && v > next[1]) v = next[1];
  return round2(v);
}

/** Price each at this quantity (the line total divided by the quantity). */
export const tierEach = (tiers: Tier[], qty: number) => tierTotal(tiers, qty) / qty;

/** Price each at each band's smallest quantity, for price tables. */
export const tierBands = (tiers: Tier[], mins: number[]) => mins.map((m) => round2(tierEach(tiers, m)));

export const DESIGN_NOTE = "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.";
export const MIN_NOTE = "Minimum order $180 (excl. freight).";
