// Pull up banner prices, sizes, downloads and the quote estimate. Luxury and Double Sided stands only.
// Prices come from the customer Price List tab of the Pull Up Banners spreadsheet (+30%, rounded up to
// the next $5). Prices are final, no GST added. Delivery is quoted separately.

export const PRICE_NOTES = [
  "Prices are final, no GST added",
  "Delivery quoted separately",
] as const;
export const MATERIAL =
  "Full colour print on tear-resistant, low-curl blockout PVC. Carry bag included.";

export type Stand = "luxury" | "double";
export const STANDS: { id: Stand; label: string; short: string }[] = [
  { id: "luxury", label: "Luxury pull up banner", short: "Luxury" },
  { id: "double", label: "Double sided pull up banner", short: "Double sided" },
];

export type BannerSize = {
  id: string;
  label: string; // "850 × 2000mm"
  width: 850 | 1200;
  visible: { luxury: string; double: string }; // visible graphic W × H in mm
  shoppingCentre: boolean;
  price: { luxury: number; double: number };
};

// Shopping Centre sizes stand no more than 1400mm tall including the base.
export const SIZES: BannerSize[] = [
  {
    id: "850x2000",
    label: "850 × 2000mm",
    width: 850,
    visible: { luxury: "850 × 2000mm", double: "850 × 2000mm" },
    shoppingCentre: false,
    price: { luxury: 195, double: 285 },
  },
  {
    id: "1200x2000",
    label: "1200 × 2000mm",
    width: 1200,
    visible: { luxury: "1200 × 2000mm", double: "1200 × 2000mm" },
    shoppingCentre: false,
    price: { luxury: 260, double: 385 },
  },
];

export const FROM_PRICE = Math.min(
  ...SIZES.flatMap((s) => [s.price.luxury, s.price.double]),
);

// ---- quote form choices and the live estimate
export type Base = "silver" | "black";
export const BASE_LABELS: Record<Base, string> = {
  silver: "Silver",
  black: "Black",
};
/** Black bases are only made for the 850mm wide Luxury stand. Same price as silver. */
export function basesFor(stand: Stand, size: string): Base[] {
  const s = SIZES.find((x) => x.id === size);
  return stand === "luxury" && s?.width === 850
    ? ["silver", "black"]
    : ["silver"];
}

export type QuoteChoice = {
  stand: Stand;
  size: string; // a SIZES id
  base: Base;
  qty: string;
};

/** Keep the base colour valid when the stand or size changes. */
export function normalise(c: QuoteChoice): QuoteChoice {
  const size = SIZES.some((s) => s.id === c.size) ? c.size : "";
  const bases = basesFor(c.stand, size);
  return { ...c, size, base: bases.includes(c.base) ? c.base : "silver" };
}

export type Estimate =
  | { ok: true; each: number; qty: number; total: number }
  | { ok: false; reason: string };
export function estimate(c: QuoteChoice): Estimate {
  const s = SIZES.find((x) => x.id === c.size);
  if (!s) return { ok: false, reason: "Pick a size" };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  const each = s.price[c.stand];
  return { ok: true, each, qty, total: each * qty };
}

// ---- artwork guides and templates (public/downloads/pull-up-banners)
const D = "downloads/pull-up-banners/";
const slug = (s: BannerSize) =>
  s.shoppingCentre
    ? `${s.width}mm-shopping-centre`
    : `${s.id}mm`; // 850x2000mm
export type Download = { label: string; guide: string; template: string };
export const DOWNLOAD_GROUPS: { title: string; items: Download[] }[] = [
  { stand: "luxury" as const, prefix: "luxury", title: "Luxury pull up banners" },
  {
    stand: "double" as const,
    prefix: "double-sided",
    title: "Double sided pull up banners",
  },
].map((g) => ({
  title: g.title,
  items: SIZES.map((s) => ({
    label: s.shoppingCentre
      ? `${s.label} (${s.visible[g.stand]} visible)`
      : s.label,
    guide: `${D}${g.prefix}-${slug(s)}-artwork-guide.pdf`,
    template: `${D}${g.prefix}-${slug(s)}-artwork-template.pdf`,
  })),
}));
