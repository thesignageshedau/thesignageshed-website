// Artwork specs for the "Check your artwork" tool. Numbers come from our artwork guide PDFs
// (public/downloads/*/…-artwork-guide.pdf). All sizes in mm.

export type ArtworkSpec = {
  id: string;
  product: string; // quote product slug
  label: string;
  quoteSize?: string; // size id on the quote form, when the form has this size
  finished: [number, number]; // finished (trimmed / visible) width × height
  bleed: [number, number]; // bleed on each side: [left/right, top/bottom]
  safe: { top: number; right: number; bottom: number; left: number }; // from the finished edge
  round?: { safeDiameter: number }; // round throws: finished edge and safe area are circles
  templateScale: 1 | 0.1; // our templates are full size or 10% scale
  minPpi: number;
  goodPpi: number;
  maxPages: number;
  note?: string;
  guide: string;
};

const D = "downloads/";
const uniform = (n: number) => ({ top: n, right: n, bottom: n, left: n });

export const ARTWORK_PRODUCTS: { slug: string; label: string }[] = [
  { slug: "pull-up-banners", label: "Pull up banners" },
  { slug: "media-walls", label: "Media walls" },
  { slug: "corflute-signs", label: "Corflute signs" },
  { slug: "a-frames", label: "A-frames" },
  { slug: "table-covers", label: "Table covers" },
];

const pub = (slug: string, size: string, w: number, label: string, two: boolean): ArtworkSpec => ({
  id: `pub-${slug}`,
  product: "pull-up-banners",
  label,
  quoteSize: size,
  finished: [w, 2000],
  bleed: [20, 20],
  safe: { top: 40, right: 40, bottom: 100, left: 40 },
  templateScale: 1,
  minPpi: 130,
  goodPpi: 150,
  maxPages: two ? 2 : 1,
  note: "Keep the bottom 100 mm to background only: it sits low, near the base.",
  guide: `${D}pull-up-banners/${slug}-artwork-guide.pdf`,
});

const mw = (slug: string, size: string, label: string, w: number, h: number, bx: number, by: number): ArtworkSpec => ({
  id: `mw-${slug}`,
  product: "media-walls",
  label,
  quoteSize: size,
  finished: [w, h],
  bleed: [bx, by],
  safe: uniform(30),
  templateScale: 0.1,
  minPpi: 130,
  goodPpi: 150,
  maxPages: 2,
  note: "Single sided walls need one page. Double sided walls can have a second page for the back.",
  guide: `${D}media-walls/media-wall-${slug}-artwork-guide.pdf`,
});

const cf = (w: number, h: number): ArtworkSpec => ({
  id: `cf-${w}x${h}`,
  product: "corflute-signs",
  label: `Corflute sign ${w} × ${h}mm`,
  quoteSize: `${w}x${h}`,
  finished: [w, h],
  bleed: [1, 1],
  safe: uniform(20),
  templateScale: 1,
  minPpi: 130,
  goodPpi: 150,
  maxPages: 2,
  note: "For double sided signs, page 1 is the front and page 2 the back.",
  guide: `${D}corflute-signs/corflute-sign-${w}x${h}mm-artwork-guide.pdf`,
});

const af = (id: string, slug: string, label: string, size: string, w: number, h: number, bleed: number, safe: ArtworkSpec["safe"]): ArtworkSpec => ({
  id: `af-${id}`,
  product: "a-frames",
  label,
  quoteSize: size,
  finished: [w, h],
  bleed: [bleed, bleed],
  safe,
  templateScale: 1,
  minPpi: 130,
  goodPpi: 150,
  maxPages: 2,
  note: "Page 1 is the front and page 2 the back. One page means the same design both sides.",
  guide: `${D}a-frames/${slug}-artwork-guide.pdf`,
});

const tc = (id: string, slug: string, label: string, size: string | undefined, w: number, h: number, safe: number, round?: number): ArtworkSpec => ({
  id: `tc-${id}`,
  product: "table-covers",
  label,
  quoteSize: size,
  finished: [w, h],
  bleed: [27, 27],
  safe: uniform(safe),
  ...(round ? { round: { safeDiameter: round } } : {}),
  templateScale: 0.1,
  minPpi: 130,
  goodPpi: 150,
  maxPages: 1,
  note: round
    ? "Keep logos and text inside the table top circle. The drop gathers into folds."
    : "Keep text and logos away from the fold lines where the cover bends over the table edge (shown on our template).",
  guide: `${D}table-covers/${slug}-artwork-guide.pdf`,
});

export const ARTWORK_SPECS: ArtworkSpec[] = [
  pub("luxury-850x2000mm", "850x2000", 850, "Luxury pull up banner 850 × 2000mm", false),
  pub("luxury-1200x2000mm", "1200x2000", 1200, "Luxury pull up banner 1200 × 2000mm", false),
  pub("double-sided-850x2000mm", "850x2000", 850, "Double sided pull up banner 850 × 2000mm", true),
  pub("double-sided-1200x2000mm", "1200x2000", 1200, "Double sided pull up banner 1200 × 2000mm", true),
  mw("2-4m-x-2-2m", "2.4x2.2", "Media wall 2.4m × 2.2m", 2440, 2245, 52, 52),
  mw("3m-x-2-2m", "3x2.2", "Media wall 3m × 2.2m", 2940, 2245, 52, 52),
  mw("4m-x-2-2m", "4x2.2", "Media wall 4m × 2.2m", 4000, 2254, 69, 70),
  cf(600, 450),
  cf(600, 900),
  cf(900, 1200),
  af("printed", "printed-a-frame-600x900mm", "Printed aluminium A-frame 600 × 900mm", "printed-600x900", 600, 900, 10, uniform(30)),
  af("insert", "insert-a-frame-600x900mm", "Insert A-frame 600 × 900mm (insert)", "insert-600x900", 600, 900, 1, uniform(20)),
  af("folding", "folding-corflute-a-frame-600x950mm", "Folding corflute A-frame 600 × 950mm (face)", "folding-600x950", 600, 960.3, 5, uniform(10)),
  tc("fitted-6-3", "fitted-throw-6ft-3-sided", "Fitted table throw 6ft, 3 sided", "fitted:6ft", 3200, 1500, 40),
  tc("fitted-6-4", "fitted-throw-6ft-4-sided", "Fitted table throw 6ft, 4 sided", "fitted:6ft", 3214, 2134, 40),
  tc("fitted-8-3", "fitted-throw-8ft-3-sided", "Fitted table throw 8ft, 3 sided", "fitted:8ft", 3822, 1540, 40),
  tc("fitted-8-4", "fitted-throw-8ft-4-sided", "Fitted table throw 8ft, 4 sided", "fitted:8ft", 3822, 2134, 40),
  tc("loose-6-3", "loose-throw-6ft-3-sided", "Loose table throw 6ft, 3 sided", "loose:6ft", 3200, 1500, 100),
  tc("loose-6-4", "loose-throw-6ft-4-sided", "Loose table throw 6ft, 4 sided", "loose:6ft", 3214, 2134, 100),
  tc("round-full", "round-throw-1520mm-full-drop", "Round table throw 1520mm, full drop", "round:1520", 3048, 3048, 0, 1520),
  tc("round-half", "round-throw-1520mm-half-drop", "Round table throw 1520mm, half drop", "round:1520", 2286, 2286, 0, 1520),
  tc("runner-610", "runner-front-drop-610x2006mm", "Table runner, front drop 610 × 2006mm", "runner-front:610x2006", 610, 2006, 40),
  tc("runner-914", "runner-front-drop-914x2006mm", "Table runner, front drop 914 × 2006mm", "runner-front:914x2006", 914, 2006, 40),
];

/** Artwork size including bleed. */
export const artSize = (s: ArtworkSpec): [number, number] => [s.finished[0] + 2 * s.bleed[0], s.finished[1] + 2 * s.bleed[1]];
