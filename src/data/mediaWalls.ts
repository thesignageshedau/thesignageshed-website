// Media wall prices, sizes, downloads and the quote estimate. Fabric sock and frame walls only.
// Prices come from the customer Price List tab of the Media Walls spreadsheet (+30%, rounded up to
// the next $5). Prices include everything except delivery (not registered for GST).

export const QUOTE_EMAIL = "infothesignageshed@gmail.com";
// FormSubmit (https://formsubmit.co), activated for https://thesignageshed.au/. The random alias
// delivers to QUOTE_EMAIL without putting the address in the form.
export const FORMSUBMIT_ID: string = "03cd0ec74efac66729aed8677b60d8e0";
export const FORMSUBMIT_ACTION = `https://formsubmit.co/${FORMSUBMIT_ID}`;
export const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`;

export const PRICE_NOTES = [
  "Prices include everything except delivery (we're not registered for GST)",
] as const;
export const TURNAROUND =
  "Usually dispatched within a few business days of artwork approval.";

export type WallSize = {
  id: string;
  label: string; // e.g. "2.4m × 2.2m"
  kit: { single: number; double: number }; // frame + printed fabric + carry bag
  fabric: { single: number; double: number }; // replacement printed fabric
  frameOnly: number;
};

export const SIZES: WallSize[] = [
  {
    id: "2.4x2.2",
    label: "2.4m × 2.2m",
    kit: { single: 505, double: 605 },
    fabric: { single: 285, double: 375 },
    frameOnly: 245,
  },
  {
    id: "3x2.2",
    label: "3m × 2.2m",
    kit: { single: 635, double: 760 },
    fabric: { single: 370, double: 485 },
    frameOnly: 285,
  },
  {
    id: "4x2.2",
    label: "4m × 2.2m",
    kit: { single: 800, double: 955 },
    fabric: { single: 475, double: 620 },
    frameOnly: 345,
  },
];
export const LED_PACK = 95; // clamp-on LED lights, pack of 2, fits any size
export const FROM_PRICE = Math.min(...SIZES.map((s) => s.kit.single));

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
  const dbl = c.sides === "double";
  const each =
    c.item === "kit"
      ? dbl
        ? s.kit.double
        : s.kit.single
      : c.item === "fabric"
        ? dbl
          ? s.fabric.double
          : s.fabric.single
        : s.frameOnly;
  const led = c.led === "yes" ? LED_PACK : 0;
  return { ok: true, each, led, qty, total: (each + led) * qty };
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
