import { type Tier, tierEach } from "./tiers";
// Media wall prices, sizes, downloads and the quote estimate. Fabric sock and frame walls only.
// Checked 8 Nov 2026. Straight premium 250gsm fabric, zipper, no lighting. Sell prices are the
// regular pickup price ÷ 0.65, rounded UP to the next $5. An amount already a multiple of $5
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
    kit: { single: 600, double: 720 },
    kitSingleTiers: [[1, 600], [2, 1195], [3, 1775], [5, 2845]],
    kitDoubleTiers: [[1, 720], [2, 1435], [3, 2130], [5, 3415]],
    fabric: { single: 335, double: 445 },
    frameOnly: 290,
  },
  {
    id: "3x2.2",
    label: "3m × 2.2m",
    kit: { single: 750, double: 895 },
    kitSingleTiers: [[1, 750], [2, 1495], [3, 2220], [5, 3560]],
    kitDoubleTiers: [[1, 895], [2, 1790], [3, 2660], [5, 4265]],
    fabric: { single: 440, double: 575 },
    frameOnly: 340,
  },
  {
    id: "4x2.2",
    label: "4m × 2.2m",
    kit: { single: 945, double: 1130 },
    kitSingleTiers: [[1, 945], [2, 1890], [5, 4505]],
    kitDoubleTiers: [[1, 1130], [2, 2255], [5, 5375]],
    fabric: { single: 565, double: 735 },
    frameOnly: 410,
  },
];
export const LED_PACK = 110; // clamp-on LED lights, pack of 2, fits any size
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
