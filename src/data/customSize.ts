// Instant custom-size pricing for products sold by area (banners, corflute, runners, ACM, SAV).
// Totals follow the same rule as listed sizes: supplier regular inc GST ÷ 0.75, rounded up to the
// next $5, then a whole-dollar unit × quantity, with a cap so a bigger area or quantity is never
// cheaper in total. The $180 minimum is a note only and is never added to a total.
import { cappedTotal } from "./tiers";
import { AREA_RATES, type AreaKind, type AreaPoint, type RateCard } from "./areaRates";

export type { AreaKind };

export type DimLimits = {
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  /** One side up to `long`, the other up to `short`, either way around. */
  sheet?: { long: number; short: number };
  /** Do not rotate the entered width and height to fit the limits. */
  noSwap?: boolean;
  widthLabel?: string;
  heightLabel?: string;
};

export const LIMITS: Record<AreaKind, DimLimits> = {
  pvc: { minW: 300, maxW: 10000, minH: 300, maxH: 2100 },
  mesh: { minW: 300, maxW: 10000, minH: 300, maxH: 2000 },
  fabric: { minW: 300, maxW: 10000, minH: 300, maxH: 2700 },
  "corflute-5mm-single": { minW: 150, maxW: 2400, minH: 150, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  "corflute-5mm-double": { minW: 150, maxW: 2400, minH: 150, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  "corflute-3mm-single": { minW: 150, maxW: 2400, minH: 150, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  "corflute-3mm-double": { minW: 150, maxW: 2400, minH: 150, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  "runner-front": { minW: 300, maxW: 1830, minH: 914, maxH: 2160, noSwap: true, widthLabel: "Width", heightLabel: "Drop (length)" },
  "runner-side": { minW: 1525, maxW: 3250, minH: 250, maxH: 400, noSwap: true, widthLabel: "Length", heightLabel: "Drop (height)" },
  "acm-single": { minW: 100, maxW: 2400, minH: 100, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  "acm-double": { minW: 100, maxW: 2400, minH: 100, maxH: 2400, sheet: { long: 2400, short: 1200 } },
  sav: { minW: 200, maxW: 5000, minH: 200, maxH: 5000, sheet: { long: 5000, short: 1300 } },
};

/** Volume "from $X per m²" headlines, taken from each rate card. */
export const FROM_PER_M2: Record<AreaKind, number> = Object.fromEntries(
  (Object.keys(AREA_RATES) as AreaKind[]).map((k) => [k, AREA_RATES[k].fromPerM2]),
) as Record<AreaKind, number>;

export const MIN_NOTE = "Minimum order $180 (excl. freight).";

export type ParseOk = { ok: true; mm: number; rounded: boolean };
export type ParseErr = { ok: false; reason: string };
export type DimsOk = { ok: true; widthMm: number; heightMm: number; areaM2: number; rounded: boolean; swapped: boolean };
export type PriceOk = {
  ok: true;
  widthMm: number;
  heightMm: number;
  areaM2: number;
  qty: number;
  total: number;
  each: number;
  rounded: boolean;
  swapped: boolean;
  matchedListed?: string;
};
export type PriceErr = { ok: false; reason: string };

const UNIT_MM: Record<string, number> = { mm: 1, cm: 10, m: 1000 };

/** Convert a typed width/height to millimetres. Rejects empty, non-numeric, zero and negative values. */
export function parseMm(raw: string, unit: string): ParseOk | ParseErr {
  const u = UNIT_MM[unit];
  if (!u) return { ok: false, reason: "Choose millimetres, centimetres or metres." };
  const t = raw.trim();
  if (!t) return { ok: false, reason: "Enter a size." };
  if (!/^-?\d+(\.\d+)?$/.test(t)) return { ok: false, reason: "Enter a number for the size." };
  const n = Number(t);
  if (!Number.isFinite(n) || n <= 0) return { ok: false, reason: "Enter a size greater than 0." };
  const mm = n * u;
  const rounded = Math.round(mm);
  if (rounded < 1) return { ok: false, reason: "Enter a size of at least 1 mm." };
  return { ok: true, mm: rounded, rounded: Math.abs(mm - rounded) > 1e-9 };
}

function inBox(w: number, h: number, lim: DimLimits): boolean {
  return w >= lim.minW && w <= lim.maxW && h >= lim.minH && h <= lim.maxH;
}

function inSheet(w: number, h: number, lim: DimLimits): boolean {
  if (!lim.sheet) return inBox(w, h, lim);
  if (Math.min(w, h) < Math.min(lim.minW, lim.minH)) return false;
  return Math.max(w, h) <= lim.sheet.long && Math.min(w, h) <= lim.sheet.short;
}

function rangeText(lim: DimLimits): string {
  if (lim.sheet) return `up to ${lim.sheet.long} × ${lim.sheet.short}mm`;
  const wLab = lim.widthLabel ?? "Width";
  const hLab = lim.heightLabel ?? "Height";
  return `${wLab.toLowerCase()} ${lim.minW}–${lim.maxW.toLocaleString("en-AU")}mm, ${hLab.toLowerCase()} ${lim.minH}–${lim.maxH.toLocaleString("en-AU")}mm`;
}

export function parseQty(raw: string, max = 999): { ok: true; qty: number } | ParseErr {
  const t = raw.trim();
  if (!t) return { ok: false, reason: "Enter a quantity." };
  if (!/^\d+$/.test(t)) return { ok: false, reason: `Enter a whole number of items from 1 to ${max}.` };
  const q = Number(t);
  if (!Number.isInteger(q) || q < 1 || q > max) return { ok: false, reason: `Enter a quantity from 1 to ${max}.` };
  return { ok: true, qty: q };
}

export function parseDims(kind: AreaKind, widthRaw: string, heightRaw: string, unit: string): DimsOk | PriceErr {
  const lim = LIMITS[kind];
  const w = parseMm(widthRaw, unit);
  if (!w.ok) return { ok: false, reason: `Width: ${w.reason}` };
  const h = parseMm(heightRaw, unit);
  if (!h.ok) return { ok: false, reason: `Height: ${h.reason}` };
  const rounded = w.rounded || h.rounded;
  if (lim.sheet) {
    if (inSheet(w.mm, h.mm, lim)) return { ok: true, widthMm: w.mm, heightMm: h.mm, areaM2: (w.mm * h.mm) / 1e6, rounded, swapped: false };
    return { ok: false, reason: `This size is larger than we can print in one piece (${rangeText(lim)}). Choose a smaller size, or tell us in the notes if you need it split.` };
  }
  if (inBox(w.mm, h.mm, lim)) return { ok: true, widthMm: w.mm, heightMm: h.mm, areaM2: (w.mm * h.mm) / 1e6, rounded, swapped: false };
  if (!lim.noSwap && inBox(h.mm, w.mm, lim)) {
    return { ok: true, widthMm: h.mm, heightMm: w.mm, areaM2: (w.mm * h.mm) / 1e6, rounded, swapped: true };
  }
  return { ok: false, reason: `That size is outside what we can print (${rangeText(lim)}).` };
}

const almost = (a: number, b: number) => Math.abs(a - b) <= 1;

function matchListed(card: RateCard, w: number, h: number): AreaPoint | undefined {
  return card.listed.find((p) => (almost(p.w, w) && almost(p.h, h)) || (p.swap !== false && almost(p.w, h) && almost(p.h, w)));
}

export const ceil5 = (n: number) => Math.ceil((n - 1e-9) / 5) * 5;

type Sized = { w?: number; h?: number; area: number; total: number };

/** Price at a width × height from the grid: exact match, else inverse-distance interpolation.
 * A size is never cheaper than a grid size that would fit inside it (bigger never cheaper). */
function idwTotal(pts: Sized[], widthMm: number, heightMm: number): number {
  const dist = (p: Sized) => {
    const w = p.w ?? 0;
    const h = p.h ?? 0;
    if (w && h) return Math.min(Math.hypot(w - widthMm, h - heightMm), Math.hypot(w - heightMm, h - widthMm));
    return Math.abs(p.area - (widthMm * heightMm) / 1e6) * 1000;
  };
  const exact = pts.find((p) => p.w && p.h && (almost(p.w, widthMm) && almost(p.h, heightMm) || almost(p.w, heightMm) && almost(p.h, widthMm)));
  if (exact) return exact.total;
  const scored = pts.map((p) => ({ p, d: dist(p) })).sort((a, b) => a.d - b.d);
  const k = scored.slice(0, 4);
  let num = 0;
  let den = 0;
  for (const s of k) {
    const wgt = 1 / (s.d * s.d + 1);
    num += wgt * s.p.total;
    den += wgt;
  }
  return ceil5(den ? num / den : scored[0]!.p.total);
}

/** Price at a width × height: exact grid match, else inverse-distance interpolation.
 * A size is never cheaper than a grid size (or sampled smaller size) that fits inside it. */
export function totalAtSize(points: Sized[], widthMm: number, heightMm: number): number {
  const pts = points.filter((p) => p.area > 0 && p.total > 0);
  if (!pts.length) return 0;
  const xs = new Set<number>([widthMm]);
  const ys = new Set<number>([heightMm]);
  for (const p of pts) {
    if (p.w) {
      if (p.w <= widthMm) xs.add(p.w);
      if (p.h && p.h <= widthMm) xs.add(p.h);
    }
    if (p.h) {
      if (p.h <= heightMm) ys.add(p.h);
      if (p.w && p.w <= heightMm) ys.add(p.w);
    }
  }
  let raw = 0;
  for (const x of xs) raw = Math.max(raw, idwTotal(pts, x, heightMm));
  for (const y of ys) raw = Math.max(raw, idwTotal(pts, widthMm, y));
  for (const p of pts) {
    if (!p.w || !p.h) {
      if (p.area <= (widthMm * heightMm) / 1e6 + 1e-12) raw = Math.max(raw, p.total);
      continue;
    }
    const fits = (p.w <= widthMm && p.h <= heightMm) || (p.w <= heightMm && p.h <= widthMm);
    if (fits) raw = Math.max(raw, p.total);
  }
  return raw;
}

function rawTotal(card: RateCard, widthMm: number, heightMm: number, qty: number): number {
  const bands = card.qtys;
  let i = 0;
  bands.forEach((q, n) => {
    if (qty >= q) i = n;
  });
  const q0 = bands[i]!;
  const t0 = totalAtSize(card.points[String(q0)] ?? [], widthMm, heightMm);
  if (qty === q0) return t0; // keep flat bundle totals (e.g. corflute 6–10) exact
  const unit = Math.ceil(t0 / q0 - 1e-9);
  return unit * qty;
}

/** Line total for a custom size. Listed sizes at the same width × height use the published price. */
export function priceCustom(kind: AreaKind, widthMm: number, heightMm: number, qty: number): PriceOk | PriceErr {
  if (!Number.isInteger(qty) || qty < 1 || qty > 9999) return { ok: false, reason: "Enter a quantity from 1 to 999." };
  const dims = parseDims(kind, String(widthMm), String(heightMm), "mm");
  if (!dims.ok) return dims;
  const card = AREA_RATES[kind];
  if (!card) return { ok: false, reason: "We'll quote this size." };
  const listed = matchListed(card, dims.widthMm, dims.heightMm);
  const area = dims.areaM2;
  const horizon = card.qtys[card.qtys.length - 1]!;
  const raw = (q: number) => {
    if (listed) {
      const exact = listed.totals.find(([n]) => n === q);
      if (exact) return exact[1];
      let i = 0;
      listed.totals.forEach(([n], k) => {
        if (q >= n) i = k;
      });
      const [q0, t0] = listed.totals[i]!;
      const unit = Math.ceil(t0 / q0 - 1e-9);
      return unit * q;
    }
    return rawTotal(card, dims.widthMm, dims.heightMm, q);
  };
  const listedHorizon = listed ? listed.totals[listed.totals.length - 1]![0] : horizon;
  const total = cappedTotal(raw, qty, Math.max(horizon, listedHorizon));
  return {
    ok: true,
    widthMm: dims.widthMm,
    heightMm: dims.heightMm,
    areaM2: area,
    qty,
    total,
    each: total / qty,
    rounded: dims.rounded,
    swapped: dims.swapped,
    ...(listed?.id ? { matchedListed: listed.id } : {}),
  };
}

export function priceFromInputs(kind: AreaKind, widthRaw: string, heightRaw: string, unit: string, qtyRaw: string): PriceOk | PriceErr {
  const q = parseQty(qtyRaw);
  if (!q.ok) return q;
  const dims = parseDims(kind, widthRaw, heightRaw, unit);
  if (!dims.ok) return dims;
  return priceCustom(kind, dims.widthMm, dims.heightMm, q.qty);
}

export function kindForCorflute(thick: "5mm" | "3mm", sides: "single" | "double"): AreaKind {
  return `corflute-${thick}-${sides}`;
}

export function kindForBanner(material: string): AreaKind | null {
  const m = material.toLowerCase();
  if (m.includes("mesh")) return "mesh";
  if (m.includes("fabric")) return "fabric";
  if (m.includes("pvc") || m.includes("vinyl")) return "pvc";
  return null;
}

export function kindForAcm(sides: "single" | "double"): AreaKind {
  return sides === "double" ? "acm-double" : "acm-single";
}

export function sizeLabel(w: number, h: number): string {
  return `${w} × ${h}mm`;
}
