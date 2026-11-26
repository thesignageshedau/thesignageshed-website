import { type Tier, cappedTotal, tierEach } from "./tiers";
// A-frame prices, sizes, downloads and the quote estimate. Printed aluminium and Insert A-frames
// (plus replacement inserts) and Folding corflute A-frames. Prices come from the customer Price List tab of the
// A-Frame spreadsheet, re-checked 21 Nov 2026: supplier regular price inc GST ÷ 0.7 (repriced 26 Nov 2026), with each quantity tier's
// total rounded up to the next $5. Prices include everything except delivery (not registered for GST).

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.",
] as const;

/** Price each: 1, 2, 3 to 4, 5 to 9, 10 to 19, 20 to 49, 50+. */
export type Tiers = [number, number, number, number, number, number, number];
export const QTY_COLUMNS = ["1", "2", "3 to 4", "5 to 9", "10 to 19", "20 to 49", "50+"] as const;
const COLUMN_MINS = [1, 2, 3, 5, 10, 20, 50];

export type FrameType = "printed" | "insert" | "folding";
export type AFrameItem = {
  id: string;
  type: FrameType;
  label: string; // shown in tables and the quote form
  size: string;
  includes: string;
  replacement?: boolean; // a replacement insert pair, no frame
  price: Tiers;
  /** Quantity tiers (our total per quantity). When set, the estimate uses these exactly. */
  tiers?: Tier[];
};

export const TYPES: {
  id: FrameType;
  title: string;
  short: string;
  text: string;
}[] = [
  {
    id: "printed",
    title: "Printed aluminium A-frame",
    short: "Printed aluminium",
    text: "Our sturdiest sandwich board. Both faces are rigid aluminium composite panels, printed in full colour and gloss laminated, so they wipe clean and handle the weather.",
  },
  {
    id: "insert",
    title: "Insert A-frame",
    short: "Insert",
    text: "A strong frame with printed 5mm corflute inserts that slide in from the top. Change your message in seconds and re-order just the inserts.",
  },
  {
    id: "folding",
    title: "Folding corflute A-frame",
    short: "Folding corflute",
    text: "Light and budget friendly: the whole A-frame is printed corflute and folds flat. Great for events, markets and short promotions.",
  },
];

export const ITEMS: AFrameItem[] = [
  {
    id: "printed-600x900",
    type: "printed",
    label: "Printed aluminium A-frame 600 × 900mm",
    size: "600 × 900mm",
    includes: "Frame with 2 printed faces, gloss laminated",
    tiers: [[1, 275], [2, 550], [3, 816], [5, 1270], [10, 2400], [20, 4800], [50, 12000]],
    price: [275, 275, 272, 254, 240, 240, 240],
  },
  {
    id: "printed-900x1200",
    type: "printed",
    label: "Printed aluminium A-frame 900 × 1200mm",
    size: "900 × 1200mm",
    includes: "Frame with 2 printed faces, gloss laminated",
    tiers: [[1, 475], [2, 946], [3, 1395], [5, 2175], [10, 4110], [20, 8220], [50, 20550]],
    price: [475, 473, 465, 435, 411, 411, 411],
  },
  {
    id: "insert-600x900",
    type: "insert",
    label: "Insert A-frame 600 × 900mm",
    size: "600 × 900mm",
    includes: "Frame plus 2 printed corflute inserts (one each side)",
    tiers: [[1, 190], [2, 380], [3, 555], [5, 860], [10, 1610], [20, 3060]],
    price: [190, 190, 185, 172, 161, 153, 153],
  },
  {
    id: "insert-600x900-inserts",
    type: "insert",
    label: "Replacement inserts for 600 × 900mm Insert A-frame (pair)",
    size: "600 × 900mm",
    includes: "Inserts only, no frame: 2 printed inserts to suit your frame",
    replacement: true,
    tiers: [[1, 130], [2, 130], [3, 132], [5, 165], [10, 220], [20, 320], [50, 650]],
    price: [130, 65, 44, 33, 22, 16, 13],
  },
  {
    id: "folding-600x950",
    type: "folding",
    label: "Folding corflute A-frame 600 × 950mm",
    size: "600 × 950mm",
    includes: "Printed front and back, with legs, no metal frame",
    tiers: [[1, 110], [2, 220], [3, 300], [5, 335], [10, 460], [20, 700], [50, 1350]],
    price: [110, 110, 100, 67, 46, 35, 27],
  },
  {
    id: "folding-600x700",
    type: "folding",
    label: "Folding corflute A-frame 600 × 700mm",
    size: "600 × 700mm",
    includes: "Printed front and back, with legs, no metal frame",
    tiers: [[1, 110], [2, 220], [3, 300], [5, 335], [10, 460], [20, 700], [50, 1350]],
    price: [110, 110, 100, 67, 46, 35, 27],
  },
  {
    id: "folding-630x800",
    type: "folding",
    label: "Folding corflute A-frame 630 × 800mm",
    size: "630 × 800mm",
    includes: "Printed front and back, with legs, no metal frame",
    tiers: [[1, 160], [2, 316], [3, 432], [5, 480], [10, 660], [20, 1000], [50, 1900]],
    price: [160, 158, 144, 96, 66, 50, 38],
  },
  {
    id: "folding-700x1100",
    type: "folding",
    label: "Folding corflute A-frame 700 × 1100mm",
    size: "700 × 1100mm",
    includes: "Printed front and back, with legs, no metal frame",
    tiers: [[1, 165], [2, 330], [3, 450], [5, 505], [10, 690], [20, 1060], [50, 2000]],
    price: [165, 165, 150, 101, 69, 53, 40],
  },
];

/** Cheapest complete A-frame (replacement inserts aren't an A-frame). */
export const FROM_PRICE = Math.min(
  ...ITEMS.filter((i) => !i.replacement).map((i) => i.price[0]),
);

export const FRAME_COLOURS = ["Black", "White", "Red"] as const;

// ---- quote form choices and the live estimate
export type QuoteChoice = {
  item: string; // an ITEMS id
  colour: (typeof FRAME_COLOURS)[number];
  handle: "Yes" | "No";
  qty: string;
};
export function normalise(c: QuoteChoice): QuoteChoice {
  return { ...c, item: ITEMS.some((i) => i.id === c.item) ? c.item : "" };
}
export function tierIndex(qty: number): number {
  let i = 0;
  COLUMN_MINS.forEach((m, n) => {
    if (qty >= m) i = n;
  });
  return i;
}
/** Price each at a quantity: exact tiers when the item has them, otherwise its column price. */
export const eachFor = (it: AFrameItem, qty: number) =>
  it.tiers ? tierEach(it.tiers, qty) : cappedTotal((q) => it.price[tierIndex(q)]! * q, qty, COLUMN_MINS[COLUMN_MINS.length - 1]!) / qty;
export type Estimate =
  | { ok: true; each: number; qty: number; total: number }
  | { ok: false; reason: string };
export function estimate(c: QuoteChoice): Estimate {
  const it = ITEMS.find((x) => x.id === c.item);
  if (!it) return { ok: false, reason: "Pick an A-frame" };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  const each = eachFor(it, qty);
  return { ok: true, each, qty, total: Math.round(each * qty * 100) / 100 };
}

// ---- artwork guides and templates (public/downloads/a-frames)
const D = "downloads/a-frames/";
export type Download = { label: string; guide: string; template: string };
const dl = (label: string, slug: string): Download => ({
  label,
  guide: `${D}${slug}-artwork-guide.pdf`,
  template: `${D}${slug}-artwork-template.pdf`,
});
export const DOWNLOAD_GROUPS: { title: string; items: Download[] }[] = [
  {
    title: "Printed aluminium A-frames",
    items: [
      dl("600 × 900mm", "printed-a-frame-600x900mm"),
    ],
  },
  {
    title: "Insert A-frames and replacement inserts",
    items: [
      dl("600 × 900mm insert", "insert-a-frame-600x900mm"),
    ],
  },
  {
    title: "Folding corflute A-frames",
    items: [
      dl("600 × 950mm", "folding-corflute-a-frame-600x950mm"),
    ],
  },
];
export { money } from "./corfluteSigns";
