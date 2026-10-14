// Table cover prices, sizes, downloads and the quote estimate.
// Prices come from the customer Price List tab of the Table Covers spreadsheet (+30%, rounded up to the
// next $5). Prices include everything except delivery (not registered for GST).
// Generated price data: /workspace/es/tc/build/tc_site_data.py (re-run if the spreadsheet changes).

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Minimum order $180 per product.",
] as const;
export const MATERIAL =
  "Full colour print on polyester fabric. Machine washable and reusable.";

export type ThrowSize = {
  id: string;
  label: string; // "6ft (1.8m) table"
  fits: string; // table top W × D
  fitted: { four: number; three: number };
  loose?: { four: number; three: number }; // loose throws: 6ft only
};
export const THROWS: ThrowSize[] = [
  {
    id: "6ft",
    label: "6ft (1.8m) table",
    fits: "1840 × 760mm",
    fitted: { four: 230, three: 220 },
    loose: { four: 225, three: 215 },
  },
  {
    id: "8ft",
    label: "8ft (2.4m) table",
    fits: "2450 × 760mm",
    fitted: { four: 260, three: 245 },
  },
];

export type RoundSize = {
  id: string;
  label: string;
  full: number | null;
  half: number;
};
export const ROUNDS: RoundSize[] = [
  { id: "1520", label: "1520mm round table", full: 240, half: 165 },
];

export type RunnerSize = { id: string; label: string; price: number };
export const RUNNERS: {
  front: RunnerSize[];
  side: RunnerSize[];
  frontCustom: number;
  sideCustom: number;
} = {
  front: [
    { id: "610x2006", label: "610 × 2006mm", price: 180 },
    { id: "914x2006", label: "914 × 2006mm", price: 180 },
  ],
  side: [],
  frontCustom: 180,
  sideCustom: 180,
};
export const RUNNER_CUSTOM = {
  front: "300 to 1830mm wide, 914 to 2160mm long",
  side: "1525 to 3250mm long, 250 to 400mm high",
};

export const FROM_PRICE = Math.min(
  ...THROWS.flatMap((t) => [
    t.fitted.four,
    t.fitted.three,
    ...(t.loose ? [t.loose.four, t.loose.three] : []),
  ]),
  ...ROUNDS.flatMap((r) => (r.full ? [r.full, r.half] : [r.half])),
  ...RUNNERS.front.map((r) => r.price),
  ...RUNNERS.side.map((r) => r.price),
  RUNNERS.frontCustom,
  RUNNERS.sideCustom,
);

// ---- quote form choices and the live estimate
export type Product =
  "fitted" | "loose" | "round" | "runner-front" | "runner-side";
export const PRODUCTS: { id: Product; label: string }[] = [
  { id: "fitted", label: "Fitted table throw" },
  { id: "loose", label: "Loose table throw" },
  { id: "round", label: "Round table throw" },
  { id: "runner-front", label: "Table runner, front drop" },
];
export type Option = "four" | "three" | "full" | "half";
export const OPTION_LABELS: Record<Option, string> = {
  four: "4 sided",
  three: "3 sided, open back",
  full: "Full drop (to the floor)",
  half: "Half drop",
};

export type QuoteChoice = {
  product: Product;
  size: string;
  option: Option | "";
  custom: string;
  qty: string;
};

export function sizesFor(p: Product): { id: string; label: string }[] {
  if (p === "fitted" || p === "loose")
    return THROWS.filter((t) => t[p]).map((t) => ({ id: t.id, label: t.label }));
  if (p === "round")
    return ROUNDS.map((r) => ({
      id: r.id,
      label: r.label + (r.full ? "" : " (half drop only)"),
    }));
  const list = p === "runner-front" ? RUNNERS.front : RUNNERS.side;
  return [
    ...list.map((r) => ({ id: r.id, label: r.label })),
    { id: "custom", label: "Custom size" },
  ];
}

/** Sides (throws) or drop (round throws) on offer. Runners have none: the style sets the drop. */
export function optionsFor(p: Product, size: string): Option[] {
  if (p === "fitted" || p === "loose") return ["four", "three"];
  if (p === "round")
    return ROUNDS.find((r) => r.id === size)?.full === null
      ? ["half"]
      : ["full", "half"];
  return [];
}

export function priceFor(c: QuoteChoice): number | null {
  if (c.product === "fitted" || c.product === "loose") {
    const t = THROWS.find((x) => x.id === c.size);
    if (!t || (c.option !== "four" && c.option !== "three")) return null;
    return t[c.product]?.[c.option] ?? null;
  }
  if (c.product === "round") {
    const r = ROUNDS.find((x) => x.id === c.size);
    if (!r) return null;
    if (c.option === "half") return r.half;
    if (c.option === "full") return r.full;
    return null;
  }
  const front = c.product === "runner-front";
  if (c.size === "custom")
    return front ? RUNNERS.frontCustom : RUNNERS.sideCustom;
  return (
    (front ? RUNNERS.front : RUNNERS.side).find((x) => x.id === c.size)
      ?.price ?? null
  );
}

/** Keep size and sides/drop valid when the product or size changes. */
export function normalise(c: QuoteChoice): QuoteChoice {
  const sizes = sizesFor(c.product);
  const size = sizes.some((s) => s.id === c.size) ? c.size : "";
  const opts = optionsFor(c.product, size);
  const option: Option | "" =
    opts.length === 0
      ? ""
      : opts.includes(c.option as Option)
        ? c.option
        : opts[0]!;
  return { ...c, size, option, custom: size === "custom" ? c.custom : "" };
}

export type Estimate =
  | { ok: true; each: number; qty: number; total: number }
  | { ok: false; reason: string };
export function estimate(c: QuoteChoice): Estimate {
  if (!c.size) return { ok: false, reason: "Pick a size" };
  const each = priceFor(c);
  if (each === null)
    return {
      ok: false,
      reason: optionsFor(c.product, c.size).length
        ? "Pick the sides or drop"
        : "Pick a size",
    };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  return { ok: true, each, qty, total: each * qty };
}

// ---- artwork guides and templates (public/downloads/table-covers)
const D = "downloads/table-covers/";
export type Download = {
  label: string;
  guide: string;
  template: string | null;
};
const pair = (slug: string, label: string, template = true): Download => ({
  label,
  guide: `${D}${slug}-artwork-guide.pdf`,
  template: template ? `${D}${slug}-artwork-template.pdf` : null,
});
const throwDownloads = (style: "fitted" | "loose") =>
  THROWS.filter((t) => t[style]).flatMap((t) => [
    pair(`${style}-throw-${t.id}-4-sided`, `${t.label}, 4 sided`),
    pair(`${style}-throw-${t.id}-3-sided`, `${t.label}, 3 sided`),
  ]);
export const DOWNLOAD_GROUPS: { title: string; items: Download[] }[] = [
  { title: "Fitted table throws", items: throwDownloads("fitted") },
  { title: "Loose table throws", items: throwDownloads("loose") },
  {
    title: "Round table throws",
    items: ROUNDS.flatMap((r) => [
      ...(r.full
        ? [pair(`round-throw-${r.id}mm-full-drop`, `${r.label}, full drop`)]
        : []),
      pair(`round-throw-${r.id}mm-half-drop`, `${r.label}, half drop`),
    ]),
  },
  {
    title: "Table runners",
    items: [
      ...RUNNERS.front.map((r) =>
        pair(`runner-front-drop-${r.id}mm`, `Front drop, ${r.label}`),
      ),
      pair(
        "runner-custom-size",
        "Custom size (template made to your size on request)",
        false,
      ),
    ],
  },
];
