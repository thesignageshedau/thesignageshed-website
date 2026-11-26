// Printed clothing: t-shirts, hoodies, trucker caps and tote bags.
// Prices: supplier regular price inc GST ÷ 0.7, rounded up to the next $5 (source prices checked 23 Nov 2026,
// /workspace/pricing/es-clothing-2026-11-23.csv; repriced 26 Nov 2026).
// Line totals are stored; unit copy uses eachText. Freight is quoted separately.
import { DESIGN_NOTE, eachText, type Tier } from "./tiers";
import { MOCKUPS, type Mockup } from "./mockups";

export const CLOTHING_HREF = "/clothing/";
export const CLOTHING_SLUG = "clothing";

/** Quantity columns on the price table. */
export const BANDS = [1, 3, 5, 10, 20, 50, 100] as const;

export type ClothingProduct = {
  id: string;
  name: string;
  short: string;
  lead: string; // "From $41 each in 10s"
  intro: string;
  includes: string;
  colours: string;
  sizes: string;
  print: string;
  artwork: string;
  mockup: Mockup;
  /** Hero config: one design, standard print. Tiers are [qty, our line total]. */
  tiers: Tier[];
  /** Extra print options at qty 10 (line totals). */
  extras?: { label: string; total: number }[];
};

const from10 = (tiers: Tier[]) => {
  const t = tiers.find(([q]) => q === 10)!;
  return eachText(t[1], 10);
};

export const T_SHIRTS: ClothingProduct = {
  id: "t-shirts",
  name: "T-shirts",
  short: "T-shirt",
  lead: "",
  intro: "A regular-fit mid-weight cotton tee, printed in full colour on the front, back or chest.",
  includes: "Printed cotton t-shirt, one design",
  colours: "Black, White, Navy, Grey Marle, Autumn, Berry, Bright Royal, Carolina Blue, Coal, Lemonade, Mineral, Pine Green, Pink and Sand. Colour does not change the price. Autumn, Berry, Lemonade, Mineral, Pine Green, Pink and Sand are not made in 4XL.",
  sizes: "XS to 4XL. Size does not change the price.",
  print: "Full front or full back up to 300 × 400mm. Left or right chest, or a small upper-back print, up to 100 × 100mm. No sleeve print.",
  artwork: "A vector PDF is best (AI or EPS is fine too). PNG or TIFF at 300 DPI with a transparent background also works. We can't print from JPG, WebP or Word or PowerPoint files.",
  mockup: MOCKUPS.v4ClothingTee,
  tiers: [[1, 175], [3, 175], [5, 230], [10, 410], [20, 740], [50, 1685], [100, 3185]],
  extras: [
    { label: "Left chest, right chest, or small upper back only", total: 365 },
    { label: "Full front or full back only", total: 410 },
    { label: "Left chest and small upper back", total: 495 },
    { label: "Full front and small upper back, or left chest and full back", total: 515 },
    { label: "Full front and full back", total: 535 },
  ],
};

export const HOODIES: ClothingProduct = {
  id: "hoodies",
  name: "Hoodies",
  short: "Hoodie",
  lead: "",
  intro: "A relaxed mid-weight fleece pullover hoodie with a kangaroo pocket, printed in full colour on the front, back or chest.",
  includes: "Printed fleece hoodie, one design",
  colours: "Black, Charity Pink, Ink Blue, Cobalt, Chestnut, Pine Green, Cypress, Bone and Liberty. Colour does not change the price. 4XL is available in Black only.",
  sizes: "XS to 4XL in Black; XS to 3XL in the other colours. Size does not change the price.",
  print: "Full front up to 300 × 250mm, full back up to 300 × 400mm, or a left or right chest print up to 100 × 100mm. No sleeve or upper-back print.",
  artwork: T_SHIRTS.artwork,
  mockup: MOCKUPS.v4ClothingHoodie,
  tiers: [[1, 175], [3, 400], [5, 585], [10, 1025], [20, 1870], [50, 4255], [100, 8040]],
  extras: [
    { label: "Left or right chest only", total: 975 },
    { label: "Full front or full back only", total: 1025 },
    { label: "Left chest and full back", total: 1155 },
    { label: "Full front and full back", total: 1210 },
  ],
};

export const CAPS: ClothingProduct = {
  id: "trucker-caps",
  name: "Trucker caps",
  short: "Trucker cap",
  lead: "",
  intro: "A snapback trucker cap, printed in full colour on the front panel. One size fits all.",
  includes: "Printed trucker cap, front print, one design",
  colours: "Black, Bone, Navy, Liberty, Walnut, Cypress, Khaki, Forest Green, Ecru, White, Fire and Sunset. Colour does not change the price.",
  sizes: "One size, with an adjustable snapback.",
  print: "Front panel only, from 30 × 10mm up to 90 × 45mm. We don't print on the sides, mesh or peak.",
  artwork: T_SHIRTS.artwork,
  mockup: MOCKUPS.v4ClothingCap,
  tiers: [[1, 175], [3, 175], [5, 185], [10, 325], [20, 585], [50, 1330], [100, 2515]],
};

export const TOTES: ClothingProduct = {
  id: "tote-bags",
  name: "Tote bags",
  short: "Tote bag",
  lead: "",
  intro: "A heavyweight cotton canvas tote, printed on one side or both, about 420 × 420mm with a 95mm gusset and long shoulder straps.",
  includes: "Printed canvas tote, one design",
  colours: "Cream, Black, Bone, Navy, Pink, Army, Walnut, Khaki, Coal and Petrol Blue. Colour does not change the price.",
  sizes: "One size: 420 × 420mm bag, 95mm gusset, 720mm straps.",
  print: "Front only, or front and back, up to 300 × 260mm. We don't print on the straps.",
  artwork: T_SHIRTS.artwork,
  mockup: MOCKUPS.v4ClothingTote,
  tiers: [[1, 175], [3, 175], [5, 215], [10, 375], [20, 685], [50, 1555], [100, 2930]],
  extras: [{ label: "Double sided, at 10", total: 430 }],
};

export const PRODUCTS = [T_SHIRTS, HOODIES, CAPS, TOTES];

for (const p of PRODUCTS) {
  p.lead = `From ${from10(p.tiers)} in 10s`;
}

/** 1 to 3 tees or totes, 1 hoodie or 1 to 4 caps: the single-piece price (same for every product). */
const SMALL_RUN = T_SHIRTS.tiers[0]![1];
const eachIn10 = (p: ClothingProduct) => from10(p.tiers).replace(/ each$/, "");

export const PAGE = {
  slug: CLOTHING_SLUG,
  pageTitle: "Printed Clothing Australia: Tees, Hoodies & Caps | The Signage Shed",
  description:
    `Custom printed t-shirts, hoodies, trucker caps and tote bags, full colour, delivered Australia-wide. T-shirts from ${eachIn10(T_SHIRTS)} each in 10s, caps from ${eachIn10(CAPS)} each in 10s.`,
  eyebrow: "Printed clothing, delivered Australia-wide",
  heading: "Tees, hoodies, caps and totes with your artwork",
  intro:
    "Full-colour prints on t-shirts, pullover hoodies, snapback trucker caps and canvas tote bags. Send your logo or a print-ready file, approve a digital proof, and we print it.",
  notes: [
    "Prices include everything except delivery.",
    DESIGN_NOTE,
    `1 to 3 t-shirts or totes, 1 hoodie, or 1 to 4 caps, come to $${SMALL_RUN} for the lot.`,
    "Colour and size do not change the price.",
  ],
  faqs: [
    { q: "What's included?", a: "The printed garment or bag, in the colour and size you choose, with your artwork in one print design. Freight is quoted separately." },
    { q: "Can I order just one?", a: `Yes, you can order a single piece. A small run of 1 to 3 t-shirts or totes, 1 hoodie, or 1 to 4 caps, is $${SMALL_RUN} for the lot.` },
    { q: "Does colour or size change the price?", a: "No. The tables are for one design; a second design costs a little more, and your quote confirms it." },
    { q: "Can you print front and back?", a: "Yes on t-shirts, hoodies and tote bags. Caps are printed on the front panel only. The extras table at 10 shows those prices." },
    { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
    { q: "How long does it take?", a: "We'll confirm turnaround in your quote. Need it by a date? Put it in the Notes box on the quote form." },
    { q: "How much is delivery?", a: "Freight depends on the size and weight of the order. We quote it to your postcode and include it on your quote." },
    { q: "What artwork do you need?", a: "A vector PDF is best. We also accept AI, EPS, or a PNG or TIFF at 300 DPI with a transparent background. We can't print from JPG, WebP, Word or PowerPoint files. No artwork? Send your logo and wording and we'll set it up for you to approve." },
  ],
};

export const money = (n: number) =>
  `$${n.toLocaleString("en-AU", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** Lowest advertised unit on the page: the cheapest price each at 10. */
export const FROM_EACH_IN_TENS = Math.min(...PRODUCTS.map((p) => p.tiers.find(([q]) => q === 10)![1] / 10));
/** The same figure as display text, with cents when there are some ("$32.50"). */
export const FROM_EACH_IN_TENS_TEXT = money(FROM_EACH_IN_TENS);
/** Shared copy for meta descriptions and the clothing hero. */
export const CLOTHING_FROM_LINE = `T-shirts from ${eachIn10(T_SHIRTS)} each in 10s, caps from ${eachIn10(CAPS)} each in 10s.`;
