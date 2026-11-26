// Size and option dropdowns for the general quote form (#/quote), built from each product page's own
// price data so the choices and prices always match. Prices shown are the 1-unit price; the estimate uses
// the quantity tiers.
import * as MW from "./mediaWalls";
import * as TC from "./tableCovers";
import * as PB from "./pullUpBanners";
import * as CF from "./corfluteSigns";
import * as AF from "./aFrames";
import { ACM_SIGNS, BANNERS, FLAGS, GAZEBOS, RECTANGLE_FLAGS, STRETCH_FABRIC, TABLE_TOP_BANNERS, UMBRELLAS, type GearProduct, gearEach } from "./eventGear";
import { PACKS } from "./packs";
import { LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS, PRINTED_VINYL, SAV_SIZE_MM, POSTERS, FOAM_PVC, WINDOW_CLINGS, X_BANNERS, FABRIC_CUBES, PRINTED_CHAIRS, ARCH_BANNERS } from "./newProducts";
import { priceCustom } from "./customSize";

export const OTHER = "other";
export const OTHER_LABEL = "Other / not sure";

export type SizeChoice = { id: string; label: string; group?: string | undefined; from: number | null };
export type OptionChoice = { id: string; label: string; price: number | null };
export type QuoteSpec = {
  sizeLabel: string;
  optionLabel: string;
  sizes: SizeChoice[];
  /** Options for a chosen size. An empty list hides the options dropdown. */
  options: (size: string) => OptionChoice[];
  /** Show "Other / not sure" in the dropdowns: only for products we can make to a custom size. */
  allowOther?: boolean;
  /** How the price reads, e.g. "each" or "for up to 5 signs". */
  priceNote: string;
  /** Exact published price each for this size, option and quantity (using that product's own quantity bands).
   * null = no published price, so we quote it. Corflute is priced separately (sides, thickness, flat bands). */
  unitPrice?: (size: string, option: string, qty: number) => number | null;
};

const minOf = (xs: (number | null | undefined)[]) => {
  const n = xs.filter((x): x is number => typeof x === "number");
  return n.length ? Math.min(...n) : null;
};

const mediaWalls: QuoteSpec = {
  sizeLabel: "Size",
  optionLabel: "What you need",
  priceNote: "each",
  sizes: MW.SIZES.map((s) => ({ id: s.id, label: s.label, from: minOf([s.kit.single, s.fabric.single]) })),
  options: (size) => {
    const s = MW.SIZES.find((x) => x.id === size);
    return [
      { id: "kit-single", label: "Complete kit, single sided print", price: s?.kit.single ?? null },
      { id: "kit-double", label: "Complete kit, double sided print", price: s?.kit.double ?? null },
      { id: "fabric-single", label: "Replacement fabric only, single sided", price: s?.fabric.single ?? null },
      { id: "fabric-double", label: "Replacement fabric only, double sided", price: s?.fabric.double ?? null },
    ];
  },
  unitPrice: (size, option, qty) => {
    const s = MW.SIZES.find((x) => x.id === size);
    const [item, sides] = option.split("-") as ["kit" | "fabric", "single" | "double"];
    if (!s || (item !== "kit" && item !== "fabric") || (sides !== "single" && sides !== "double")) return null;
    return MW.eachFor(s, item, sides, qty);
  },
};

const tcProducts = TC.PRODUCTS;
const tableCovers: QuoteSpec = {
  sizeLabel: "Style and size",
  optionLabel: "Sides or drop",
  priceNote: "each",
  sizes: tcProducts.flatMap((p) =>
    TC.sizesFor(p.id).map((s) => {
      const opts = TC.optionsFor(p.id, s.id);
      const prices = opts.length
        ? opts.map((o) => TC.priceFor({ product: p.id, size: s.id, option: o, custom: "", qty: "1" }))
        : [TC.priceFor({ product: p.id, size: s.id, option: "", custom: "", qty: "1" })];
      return { id: `${p.id}:${s.id}`, label: `${p.label}, ${s.label}`, group: p.label, from: minOf(prices) };
    }),
  ),
  options: (size) => {
    const [product, s] = size.split(":") as [TC.Product, string];
    if (!s) return [];
    return TC.optionsFor(product, s).map((o) => ({
      id: o,
      label: TC.OPTION_LABELS[o],
      price: TC.priceFor({ product, size: s, option: o, custom: "", qty: "1" }),
    }));
  },
  unitPrice: (size, option, qty) => {
    const [product, s] = size.split(":") as [TC.Product, string];
    if (!s || s === "custom") return null;
    const opts = TC.optionsFor(product, s);
    if (opts.length && !opts.includes(option as TC.Option)) return null;
    return TC.priceFor({ product, size: s, option: (opts.length ? option : "") as TC.Option | "", custom: "", qty: String(qty) });
  },
};

const pullUpBanners: QuoteSpec = {
  sizeLabel: "Size",
  optionLabel: "Stand",
  priceNote: "each",
  sizes: PB.SIZES.map((s) => ({
    id: s.id,
    label: s.label + (s.shoppingCentre ? " (Shopping Centre)" : ""),
    from: minOf([s.price.luxury, s.price.double]),
  })),
  options: (size) => {
    const s = PB.SIZES.find((x) => x.id === size);
    return PB.STANDS.map((st) => ({ id: st.id, label: st.label, price: s?.price[st.id] ?? null }));
  },
  unitPrice: (size, option, qty) => {
    const s = PB.SIZES.find((x) => x.id === size);
    if (!s || (option !== "luxury" && option !== "double")) return null;
    return PB.eachFor(s, option, qty);
  },
};

const corfluteSigns: QuoteSpec = {
  sizeLabel: "Size",
  optionLabel: "Orientation and sides",
  allowOther: true,
  priceNote: "for up to 5 signs",
  sizes: CF.SIZES.map((s) => ({
    id: s.id,
    label: s.label,
    from: minOf(CF.THICKNESSES.flatMap((t) => CF.SIDES.map((sd) => s.price[t.id][sd.id].upTo5))),
  })),
  options: (size) => {
    const s = CF.SIZES.find((x) => x.id === size);
    return CF.ORIENTATIONS.flatMap((o) =>
      CF.SIDES.map((sd) => ({
        id: `${o.toLowerCase()}-${sd.id}`,
        label: `${o}, ${sd.label.toLowerCase()}`,
        price: s?.price["5mm"][sd.id].upTo5 ?? null,
      })),
    );
  },
};

const aFrames: QuoteSpec = {
  sizeLabel: "A-frame",
  optionLabel: "Frame colour",
  priceNote: "each",
  sizes: AF.ITEMS.map((i) => ({
    id: i.id,
    label: i.label,
    group: AF.TYPES.find((t) => t.id === i.type)?.title,
    from: i.price[0],
  })),
  // No frame colour choice: it only applied to the 600 × 450mm frame, now removed.
  options: () => [],
  unitPrice: (size, _o, qty) => {
    const it = AF.ITEMS.find((i) => i.id === size);
    return it ? AF.eachFor(it, qty) : null;
  },
};

function gear(p: GearProduct, sizeLabel: string, allowOther = false): QuoteSpec {
  return {
    allowOther,
    sizeLabel,
    optionLabel: p.addon?.label ?? "Options",
    priceNote: "each",
    sizes: p.items.map((i) => ({
      id: i.id,
      label: i.label,
      group: p.groups.find((g) => g.id === i.group)?.title,
      from: i.price[0] ?? null,
    })),
    options: (size) => {
      const i = p.items.find((x) => x.id === size);
      if (!p.addon || !i?.priceWithAddon) return [];
      return [
        { id: "without", label: `Without ${p.addon.label.toLowerCase()}`, price: i.price[0] ?? null },
        { id: "with", label: `With ${p.addon.label.toLowerCase()}`, price: i.priceWithAddon[0] ?? null },
      ];
    },
    unitPrice: (size, option, qty) => {
      const i = p.items.find((x) => x.id === size);
      if (!i) return null;
      const hasAddon = !!p.addon && !!i.priceWithAddon;
      if (hasAddon && option !== "with" && option !== "without") return null;
      return gearEach(p, i, hasAddon && option === "with", qty) ?? null;
    },
  };
}

/** Fixed sizes and materials. No per-item price at any quantity: the form asks us to price the job. */
function printedVinyl(p: GearProduct): QuoteSpec {
  const sizes: SizeChoice[] = [];
  for (const item of p.items) {
    const prefix = `${item.group}-`;
    const id = item.id.startsWith(prefix) ? item.id.slice(prefix.length) : item.id;
    if (!sizes.some((s) => s.id === id)) sizes.push({ id, label: item.short, from: null });
  }
  return {
    allowOther: true,
    sizeLabel: "Size",
    optionLabel: "Material",
    priceNote: "each",
    sizes,
    options: () => p.groups.map((g) => ({ id: g.id, label: g.title, price: null })),
    unitPrice: (size, option, qty) => {
      if (option !== "economy") return null;
      const mm = SAV_SIZE_MM[size];
      if (!mm) return null;
      const r = priceCustom("sav", mm[0], mm[1], qty);
      return r.ok ? r.each : null;
    },
  };
}

export const QUOTE_SPECS: Record<string, QuoteSpec> = {
  "media-walls": mediaWalls,
  "table-covers": tableCovers,
  "pull-up-banners": pullUpBanners,
  "corflute-signs": corfluteSigns,
  "a-frames": aFrames,
  gazebos: gear(GAZEBOS, "Gazebo"),
  flags: gear(FLAGS, "Flag"),
  "market-umbrellas": gear(UMBRELLAS, "Umbrella"),
  banners: gear(BANNERS, "Banner type and size", true),
  "stretch-fabric-displays": gear(STRETCH_FABRIC, "Size and sides"),
  "table-top-banners": gear(TABLE_TOP_BANNERS, "Size"),
  "acm-signs": (() => {
    const base = gear(ACM_SIGNS, "Size and sides", true);
    return {
      ...base,
      options: (size: string) => {
        if (size === OTHER) {
          return [
            { id: "single", label: "Single sided", price: null },
            { id: "double", label: "Double sided", price: null },
          ];
        }
        return base.options(size);
      },
    };
  })(),
  "rectangle-flags": gear(RECTANGLE_FLAGS, "Flag size"),
  "lightbox-displays": gear(LIGHTBOX, "Size and sides"),
  "big-head-cutouts": gear(BIG_HEADS, "Size and material"),
  "seg-fabric-frames": gear(SEG_AFRAMES, "Length"),
  "crowd-barriers": gear(BARRIERS, "Frame or cover"),
  "selfie-frames": gear(SELFIE_FRAMES, "Size"),
  "car-magnets": gear(CAR_MAGNETS, "Size"),
  "business-cards": gear(BUSINESS_CARDS, "Card and quantity"),
  "printed-vinyl": printedVinyl(PRINTED_VINYL),
  "posters": gear(POSTERS, "Poster size"),
  "foam-pvc-signs": gear(FOAM_PVC, "Sign or counter card"),
  "window-clings": gear(WINDOW_CLINGS, "Size"),
  "x-banner-stands": gear(X_BANNERS, "Size"),
  "fabric-display-cubes": gear(FABRIC_CUBES, "Cube size"),
  "printed-chairs": gear(PRINTED_CHAIRS, "Chair style"),
  "arch-banners": gear(ARCH_BANNERS, "Size"),
  packs: gear(PACKS, "Pack"),
};

export const money = (n: number) =>
  `$${n.toLocaleString("en-AU", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** The $180 minimum applies to the whole order, not each product. */
export const MIN_ORDER = 180;
