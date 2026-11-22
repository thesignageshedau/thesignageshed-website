import { type Tier, tierEach } from "./tiers";
// Media wall prices, sizes, downloads and the quote estimate. Fabric sock and frame walls only.
// Checked 8 Nov 2026. Straight premium 250gsm fabric, zipper, no lighting. Sell prices are the
// regular pickup price ÷ 0.75, rounded UP to the next $5. An amount already a multiple of $5
// stays as it is. Sale prices are ignored. Kit quantity breaks use that rule on each tier total,
// not the qty-1 price multiplied out. Prices include everything except delivery.

export const QUOTE_EMAIL = "infothesignageshed@gmail.com";
// FormSubmit (https://formsubmit.co), activated for https://thesignageshed.au/. The random alias
// delivers to QUOTE_EMAIL without putting the address in the form.
export const FORMSUBMIT_ID: string = "03cd0ec74efac66729aed8677b60d8e0";
export const FORMSUBMIT_ACTION = `https://formsubmit.co/${FORMSUBMIT_ID}`;
export const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`;

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Minimum order $180 (excl. freight).",
  "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.",
] as const;
export const TURNAROUND =
  "We dispatch within 3 days of artwork approval, depending on order size.";

export type WallSize = {
  id: string;
  label: string; // e.g. "2.4m × 2.2m"
  kit: { single: number; double: number }; // frame + printed fabric + carry bag
  fabric: { single: number; double: number }; // replacement printed fabric
  frameOnly: number;
  /** Quantity tiers (our total for that quantity) for a complete kit. Qty 1 matches kit.single / kit.double. */
  kitSingleTiers?: Tier[];
  kitDoubleTiers?: Tier[];
};

export const SIZES: WallSize[] = [
  {
    id: "2.4x2.2",
    label: "2.4m × 2.2m",
    kit: { single: 520, double: 625 },
    kitSingleTiers: [[1, 520], [2, 1036], [3, 1536], [5, 2465]],
    kitDoubleTiers: [[1, 625], [2, 1246], [3, 1845], [5, 2960]],
    fabric: { single: 290, double: 385 },
    frameOnly: 250,
  },
  {
    id: "3x2.2",
    label: "3m × 2.2m",
    kit: { single: 650, double: 775 },
    kitSingleTiers: [[1, 650], [2, 1296], [3, 1926], [5, 3085]],
    kitDoubleTiers: [[1, 775], [2, 1550], [3, 2307], [5, 3695]],
    fabric: { single: 380, double: 500 },
    frameOnly: 295,
  },
  {
    id: "4x2.2",
    label: "4m × 2.2m",
    kit: { single: 820, double: 980 },
    kitSingleTiers: [[1, 820], [2, 1640], [5, 3905]],
    kitDoubleTiers: [[1, 980], [2, 1956], [5, 4660]],
    fabric: { single: 490, double: 635 },
    frameOnly: 355,
  },
];
export const LED_PACK = 100; // clamp-on LED lights, pack of 2, fits any size
export const FROM_PRICE = Math.min(...SIZES.map((s) => s.kit.single));
/** Price each at a quantity: exact tiers where we have them. */
export function eachFor(s: WallSize, item: "kit" | "fabric", sides: "single" | "double", qty: number): number {
  const tiers = item === "kit" ? (sides === "single" ? s.kitSingleTiers : s.kitDoubleTiers) : undefined;
  if (tiers) return tierEach(tiers, qty);
  return s[item][sides];
}

// ---- quote form choices and the live estimate
export type Item = "kit" | "fabric" | "frame";
export const ITEMS: { id: Item; label: string }[] = [
  { id: "kit", label: "Complete kit (frame, printed fabric, carry bag)" },
  { id: "fabric", label: "Replacement printed fabric only" },
];

export type QuoteChoice = {
  item: Item;
  size: string; // a SIZES id
  sides: "single" | "double";
  led: "no" | "yes";
  qty: string;
};

export type Estimate =
  | { ok: true; each: number; led: number; qty: number; total: number }
  | { ok: false; reason: string };

export function estimate(c: QuoteChoice): Estimate {
  const s = SIZES.find((x) => x.id === c.size);
  if (!s) return { ok: false, reason: "Pick a size" };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  const each = c.item === "frame" ? s.frameOnly : eachFor(s, c.item, c.sides, qty);
  const led = c.led === "yes" ? LED_PACK : 0;
  return { ok: true, each, led, qty, total: Math.round((each + led) * qty * 100) / 100 };
}

export const aud = (n: number) => `$${n.toLocaleString("en-AU")}`;

// ---- artwork guides and templates (public/downloads/media-walls)
const D = "downloads/media-walls/";
export const DOWNLOADS = SIZES.map((s) => {
  const slug = s.label.replace(" × ", "-x-").replace(/\./g, "-").toLowerCase(); // 2.4m × 2.2m -> 2-4m-x-2-2m
  return {
    label: s.label,
    guide: `${D}media-wall-${slug}-artwork-guide.pdf`,
    template: `${D}media-wall-${slug}-artwork-template.pdf`,
  };
});
