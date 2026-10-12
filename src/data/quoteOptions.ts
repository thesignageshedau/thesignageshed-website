// Size and option dropdowns for the general quote form (#/quote), built from each product page's own
// price data so the choices and prices always match. Prices shown are the smallest-quantity price.
import * as MW from "./mediaWalls";
import * as TC from "./tableCovers";
import * as PB from "./pullUpBanners";
import * as CF from "./corfluteSigns";
import * as AF from "./aFrames";
import { FLAGS, GAZEBOS, UMBRELLAS, type GearProduct } from "./eventGear";

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
  /** How the price reads, e.g. "each" or "for up to 5 signs". */
  priceNote: string;
};

const minOf = (xs: (number | null | undefined)[]) => {
  const n = xs.filter((x): x is number => typeof x === "number");
  return n.length ? Math.min(...n) : null;
};

const mediaWalls: QuoteSpec = {
  sizeLabel: "Size",
  optionLabel: "What you need",
  priceNote: "each",
  sizes: MW.SIZES.map((s) => ({ id: s.id, label: s.label, from: minOf([s.kit.single, s.fabric.single, s.frameOnly]) })),
  options: (size) => {
    const s = MW.SIZES.find((x) => x.id === size);
    return [
      { id: "kit-single", label: "Complete kit, single sided print", price: s?.kit.single ?? null },
      { id: "kit-double", label: "Complete kit, double sided print", price: s?.kit.double ?? null },
      { id: "fabric-single", label: "Replacement fabric only, single sided", price: s?.fabric.single ?? null },
      { id: "fabric-double", label: "Replacement fabric only, double sided", price: s?.fabric.double ?? null },
      { id: "frame", label: "Frame only (no print)", price: s?.frameOnly ?? null },
    ];
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
};

const corfluteSigns: QuoteSpec = {
  sizeLabel: "Size",
  optionLabel: "Thickness and printing",
  priceNote: "for up to 5 signs",
  sizes: CF.SIZES.map((s) => ({
    id: s.id,
    label: `${s.label} (${s.orientation.toLowerCase()})`,
    from: minOf(CF.THICKNESSES.flatMap((t) => CF.SIDES.map((sd) => s.price[t.id][sd.id].upTo5))),
  })),
  options: (size) => {
    const s = CF.SIZES.find((x) => x.id === size);
    return CF.THICKNESSES.flatMap((t) =>
      CF.SIDES.map((sd) => ({
        id: `${t.id}-${sd.id}`,
        label: `${t.short}, ${sd.label.toLowerCase()}`,
        price: s?.price[t.id][sd.id].upTo5 ?? null,
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
  options: (size) => {
    const i = AF.ITEMS.find((x) => x.id === size);
    if (!i || i.type !== "real-estate" || i.replacement) return [];
    return AF.FRAME_COLOURS.map((c) => ({ id: c.toLowerCase(), label: c, price: i.price[0] }));
  },
};

function gear(p: GearProduct, sizeLabel: string): QuoteSpec {
  return {
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
};

export const money = (n: number) =>
  `$${n.toLocaleString("en-AU", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}`;
