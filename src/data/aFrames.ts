// A-frame prices, sizes, downloads and the quote estimate. Printed aluminium, Insert and Real Estate A-frames
// (plus replacement inserts) and Folding corflute A-frames. Prices come from the customer Price List tab of the
// A-Frame spreadsheet (+30% on the regular supplier price). Single prices are rounded up to the next $5; quantity
// prices are rounded up per item. Prices include everything except delivery (not registered for GST).

export const PRICE_NOTES = [
  "Prices include everything except delivery (we're not registered for GST)",
  "Minimum order $180 across your whole order. You can mix products to reach it.",
] as const;

/** Price each: 1, 2 to 4, 5 to 9, 10 to 19, 20+. */
export type Tiers = [number, number, number, number, number];
export const QTY_COLUMNS = [
  "1",
  "2 to 4",
  "5 to 9",
  "10 to 19",
  "20+",
] as const;

export type FrameType = "printed" | "insert" | "real-estate" | "folding";
export type AFrameItem = {
  id: string;
  type: FrameType;
  label: string; // shown in tables and the quote form
  size: string;
  includes: string;
  replacement?: boolean; // a replacement insert pair, no frame
  price: Tiers;
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
    id: "real-estate",
    title: "Real estate A-frame",
    short: "Real estate",
    text: "The classic compact 600 × 450mm sign for open homes, directions and footpaths. Black, white or red frame, with printed corflute inserts you can swap.",
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
    price: [255, 255, 235, 220, 220],
  },
  {
    id: "insert-600x900",
    type: "insert",
    label: "Insert A-frame 600 × 900mm",
    size: "600 × 900mm",
    includes: "Frame plus 2 printed corflute inserts (one each side)",
    price: [175, 172.5, 160, 150, 140],
  },
  {
    id: "insert-600x900-inserts",
    type: "insert",
    label: "Replacement inserts for 600 × 900mm Insert A-frame (pair)",
    size: "600 × 900mm",
    includes: "Inserts only, no frame: 2 printed inserts to suit your frame",
    replacement: true,
    price: [115, 60, 30, 20, 15],
  },
  {
    id: "real-estate-600x450",
    type: "real-estate",
    label: "Real estate A-frame 600 × 450mm",
    size: "600 × 450mm",
    includes: "Frame plus 2 printed corflute inserts (one each side), frame in black, white or red",
    price: [160, 160, 145, 140, 135],
  },
  {
    id: "real-estate-600x450-inserts",
    type: "real-estate",
    label: "Replacement inserts for Real estate A-frame (pair)",
    size: "600 × 450mm",
    includes: "Inserts only, no frame: 2 printed inserts to suit your frame",
    replacement: true,
    price: [145, 75, 30, 15, 10],
  },
  {
    id: "folding-600x950",
    type: "folding",
    label: "Folding corflute A-frame 600 × 950mm",
    size: "600 × 950mm",
    includes: "Printed front and back, with legs, no metal frame",
    price: [105, 105, 65, 45, 35],
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
  if (qty <= 1) return 0;
  if (qty <= 4) return 1;
  if (qty <= 9) return 2;
  if (qty <= 19) return 3;
  return 4;
}
export type Estimate =
  | { ok: true; each: number; qty: number; total: number }
  | { ok: false; reason: string };
export function estimate(c: QuoteChoice): Estimate {
  const it = ITEMS.find((x) => x.id === c.item);
  if (!it) return { ok: false, reason: "Pick an A-frame" };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  const each = it.price[tierIndex(qty)];
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
    title: "Real estate A-frame and replacement inserts",
    items: [dl("600 × 450mm insert", "real-estate-a-frame-600x450mm")],
  },
  {
    title: "Folding corflute A-frames",
    items: [
      dl("600 × 950mm", "folding-corflute-a-frame-600x950mm"),
    ],
  },
];
export { money } from "./corfluteSigns";
