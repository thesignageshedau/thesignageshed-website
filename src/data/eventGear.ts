// Event gear: pop-up gazebos, teardrop and feather flags, and printed market umbrellas.
// Prices come from the Price List tab of each product's spreadsheet in Google Drive (01 Products):
// supplier cost inc GST x 1.3, rounded UP to the next $5 (quantity bands use the supplier price at the
// smallest quantity in the band). Generated from /workspace/es/np/wb/prices.json by /workspace/es/np/gen_ts.py.
// Prices include everything except delivery (not registered for GST).
import type { Mockup } from "./mockups";
import { MOCKUPS } from "./mockups";

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Minimum order $180 per product.",
] as const;

export type GearItem = {
  id: string;
  group: string;
  label: string; // full name, used in the quote form and email
  short: string; // row name inside its group in the price table
  includes: string;
  price: number[]; // price each per quantity band
  priceWithAddon?: number[]; // price each with the add-on, per band
};

export type GearFaq = { q: string; a: string };

export type GearProduct = {
  slug: string;
  eventName: string; // analytics prefix
  subject: string; // FormSubmit email subject
  noun: string; // "gazebo", "flag", "umbrella"
  pageTitle: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  teaserTitle: string;
  teaserText: string;
  groups: { id: string; title: string; text: string }[];
  bands: { label: string; min: number }[];
  items: GearItem[];
  addon?: { label: string; note: string };
  notes: string[];
  artwork: string;
  faqs: GearFaq[];
  hero: Mockup;
  gallery: Mockup[];
  notesHint: string;
};

const BANDS_2 = [
  { label: "1 to 4", min: 1 },
  { label: "5+", min: 5 },
];
const BANDS_3 = [
  { label: "1 to 4", min: 1 },
  { label: "5 to 9", min: 5 },
  { label: "10+", min: 10 },
];

const COMMON_FAQS: GearFaq[] = [
  { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
  { q: "How long does it take?", a: "Usually dispatched within a few business days of artwork approval. Tell us your needed-by date in the quote form and we'll let you know if it's tight." },
  { q: "How much is delivery?", a: "Delivery is quoted separately, based on your postcode. We'll include it in your quote. See our Delivery page for how it works." },
  { q: "How do I pay?", a: "Once you're happy with the quote, we send you an invoice or a secure payment link to pay by card." },
];

export const GAZEBOS: GearProduct = {
  slug: "gazebos",
  eventName: "gazebo",
  subject: "Pop up gazebo quote",
  noun: "gazebo",
  pageTitle: "Printed Gazebos Australia: Custom Pop Up Marquees | The Signage Shed",
  description: "Custom printed 3 × 3m and 6 × 3m pop up gazebos with your logo on the canopy and valances, plus an optional printed back wall. Prices online, delivered Australia-wide.",
  eyebrow: "Printed pop up gazebos, delivered Australia-wide",
  heading: "Branded gazebos for markets, sport and events",
  intro: "A black aluminium pop up frame with your artwork printed on the canopy and all four valances. Add a printed back wall to turn it into an instant branded stand.",
  teaserTitle: "Printed pop up gazebos",
  teaserText: "3 × 3m and 6 × 3m gazebos printed with your logo, with an optional printed back wall. Standard or luxury frame.",
  groups: [
    { id: "standard", title: "Standard frame", text: "45mm hexagonal aluminium legs, 3 year frame warranty. Light enough for one or two people to put up in about five minutes." },
    { id: "luxury", title: "Luxury frame", text: "Heavier 50mm hexagonal aluminium legs, 5 year frame warranty. Stiffer in a breeze and built for weekly use." },
  ],
  bands: BANDS_2,
  items: [
    { id: "standard-3x3-none", group: "standard", label: "Standard 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", price: [860, 820], priceWithAddon: [925, 880] },
    { id: "standard-3x3-single", group: "standard", label: "Standard 3 × 3m gazebo, with single sided back wall", short: "3 × 3m · Single sided back wall", includes: "Frame, printed canopy and 4 valances, plus a printed back wall", price: [1090, 1035], priceWithAddon: [1150, 1100] },
    { id: "standard-6x3-none", group: "standard", label: "Standard 6 × 3m gazebo, canopy only", short: "6 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", price: [1500, 1430], priceWithAddon: [1600, 1525] },
    { id: "luxury-3x3-none", group: "luxury", label: "Luxury 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", price: [1270, 1210], priceWithAddon: [1335, 1270] },
  ],
  addon: { label: "Heavy duty wheeled carry bag", note: "Heavy duty wheeled carry bag: $60 to $65 extra on a 3 × 3m, $95 to $100 extra on a 6 × 3m. Tick it in the quote form to see the price." },
  notes: [
    "Black frame (silver available, same price).",
    "Back wall: printed single sided, on one face.",
    "Sandbags, water bags, side walls and awnings available on request.",
  ],
  artwork: "Gazebo canopies are printed from a full-size template for the roof and valances. Ask for the template with your quote, or send us your logo and colours and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What's included?", a: "The pop up frame, the printed canopy (roof and all four valances) and, if you choose one, the printed back wall. The wheeled carry bag is an optional extra." },
    { q: "Standard or luxury frame?", a: "Both are aluminium and pop up the same way. The luxury frame has thicker 50mm legs and a 5 year warranty, so it's the pick for weekly markets, sporting clubs and windy sites." },
    { q: "Will it blow away?", a: "Always weigh down every leg with sandbags or water bags outdoors, and take the gazebo down in strong wind. We can add sandbags or water bags to your quote." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.gazebo3x3,
  gallery: [MOCKUPS.gazebo3x3, MOCKUPS.gazebo6x3],
  notesHint: "Event date, frame colour, side walls or weights, or design ideas",
};

export const FLAGS: GearProduct = {
  slug: "flags",
  eventName: "flag",
  subject: "Teardrop or feather flag quote",
  noun: "flag",
  pageTitle: "Teardrop and Feather Flags Australia: Custom Printed | The Signage Shed",
  description: "Medium teardrop (2.7m) and feather (3.0m) flags printed with your artwork, with a 10kg heavy duty square base. Prices online, delivered Australia-wide.",
  eyebrow: "Printed teardrop and feather flags, delivered Australia-wide",
  heading: "Teardrop and feather flags that get you seen",
  intro: "Tall printed flags for shopfronts, open homes, sport and events. Each one comes with its pole set and a 10kg heavy duty square base, so it works on paving, grass or indoors with no ground spikes.",
  teaserTitle: "Teardrop and feather flags",
  teaserText: "Medium teardrop and feather flags printed with your artwork, with a 10kg heavy duty base.",
  groups: [
    { id: "teardrop", title: "Teardrop flag, medium (2.7m tall)", text: "The rounded teardrop shape holds its form even with no wind, so your logo is always readable." },
    { id: "feather", title: "Feather flag, medium (3.0m tall)", text: "Taller and slimmer, with a long straight edge for a logo or a word that reads from a distance." },
  ],
  bands: BANDS_3,
  items: [
    { id: "teardrop-double", group: "teardrop", label: "Teardrop flag 2.7m, double sided", short: "2.7m · Double sided", includes: "Printed flag, pole set and 10kg square base", price: [275, 250, 235], priceWithAddon: [295, 270, 255] },
    { id: "teardrop-single", group: "teardrop", label: "Teardrop flag 2.7m, single sided", short: "2.7m · Single sided", includes: "Printed flag, pole set and 10kg square base", price: [215, 200, 185], priceWithAddon: [235, 220, 205] },
    { id: "feather-double", group: "feather", label: "Feather flag 3.0m, double sided", short: "3.0m · Double sided", includes: "Printed flag, pole set and 10kg square base", price: [295, 270, 250], priceWithAddon: [315, 290, 270] },
    { id: "feather-single", group: "feather", label: "Feather flag 3.0m, single sided", short: "3.0m · Single sided", includes: "Printed flag, pole set and 10kg square base", price: [230, 210, 200], priceWithAddon: [250, 230, 220] },
  ],
  addon: { label: "Carry bag", note: "Carry bag: $20 extra per flag." },
  notes: [
    "Double sided: two printed fabrics sewn back to back, so it reads correctly from both sides.",
    "Single sided: printed once, and your artwork shows mirrored on the back.",
    "Every flag includes a black pole set and a 10kg heavy duty square base.",
  ],
  artwork: "Flags are printed from the full-size template for that flag shape. Ask for the template with your quote, or send us your logo and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "Teardrop or feather?", a: "The teardrop keeps its shape in still air and suits a logo. The feather is taller and slimmer, which suits a word or short message that reads from the road." },
    { q: "Single or double sided?", a: "A single sided flag is printed once and shows a mirror image on the back. Double sided flags have two prints sewn back to back, so the text reads the right way from both sides." },
    { q: "What base comes with it?", a: "A 10kg heavy duty square base, so it stands on paving, concrete, grass or indoors. No ground spikes needed." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.flags,
  gallery: [MOCKUPS.flags],
  notesHint: "Where the flags will stand, colours or design ideas, anything we should know",
};

export const UMBRELLAS: GearProduct = {
  slug: "market-umbrellas",
  eventName: "umbrella",
  subject: "Printed market umbrella quote",
  noun: "umbrella",
  pageTitle: "Printed Market Umbrellas Australia: Your Logo | The Signage Shed",
  description: "2m × 2m square market umbrellas with your logo printed on all four panels and the valance. With a 10kg heavy duty base. Prices online, delivered Australia-wide.",
  eyebrow: "Printed market umbrellas, delivered Australia-wide",
  heading: "Printed market umbrellas with your logo on top",
  intro: "A 2m × 2m square umbrella printed on all four panels and the valance, on a heavy duty 45mm aluminium pole with an easy slider (no ropes or pulleys). Great for cafes, markets, fetes and real estate open homes.",
  teaserTitle: "Printed market umbrellas",
  teaserText: "2m × 2m square umbrellas printed on every panel, with a 10kg heavy duty base.",
  groups: [
    { id: "umbrella", title: "Printed market umbrella 2m × 2m", text: "Full colour canopy (270gsm polyester) on a 45mm aluminium pole with four height settings and a 12 month warranty on the frame and base." },
    { id: "canopy", title: "Replacement canopy", text: "A new printed canopy for one of our umbrella frames, for a rebrand or a worn canopy." },
  ],
  bands: BANDS_3,
  items: [
    { id: "umbrella-10kg", group: "umbrella", label: "Printed market umbrella 2m × 2m, with 10kg base", short: "With 10kg base", includes: "Umbrella, printed canopy and 10kg heavy duty base", price: [490, 465, 450] },
    { id: "canopy-only", group: "canopy", label: "Replacement printed canopy (2m × 2m)", short: "Replacement canopy", includes: "Printed canopy only, fits our umbrella frame", price: [245, 235, 225] },
  ],
  notes: [
    "Printed on all four canopy panels and the valance.",
    "A 20L water bag for windy spots can be added on request.",
  ],
  artwork: "Umbrella canopies are printed from a full-size template for the panels and valance. Ask for the template with your quote, or send us your logo and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What size is it?", a: "2m × 2m square, with a 220mm valance around the edge. The pole has four height settings." },
    { q: "Which base should I choose?", a: "The 10kg heavy duty base suits most sites. For windy spots, ask us to add a 20L water bag for extra weight." },
    { q: "Can it stay up in wind?", a: "Close the umbrella in strong wind. Like any market umbrella it can tip or be damaged in gusts." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.umbrella,
  gallery: [MOCKUPS.umbrella],
  notesHint: "Where it will be used, colours or design ideas, anything we should know",
};

const BANDS_BANNER = [
  { label: "1 to 4", min: 1 },
  { label: "5+", min: 5 },
];

// Vinyl, mesh and fabric mesh banners. Supplier price inc GST x 1.3, rounded UP to the next $5
// (checked 13 Oct 2026). 1 to 4 uses the supplier price at 2 banners; each product has a $180 minimum.
export const BANNERS: GearProduct = {
  slug: "banners",
  eventName: "banner",
  subject: "Vinyl or mesh banner quote",
  noun: "banner",
  pageTitle: "Vinyl and Mesh Banners Australia: Custom Printed | The Signage Shed",
  description: "Printed PVC vinyl banners, mesh vinyl banners and fabric mesh banners in popular sizes, finished with hemmed edges and eyelets. Prices online, delivered Australia-wide.",
  eyebrow: "Printed vinyl and mesh banners, delivered Australia-wide",
  heading: "Banners for fences, shopfronts and events",
  intro: "Full colour banners, finished and ready to hang. Choose solid PVC vinyl for the boldest colour, or mesh when the banner goes on a fence or anywhere wind can catch it.",
  teaserTitle: "Vinyl and mesh banners",
  teaserText: "PVC vinyl, mesh vinyl and fabric mesh banners, hemmed with eyelets and ready to hang.",
  groups: [
    { id: "pvc", title: "PVC vinyl banners", text: "Heavy 510gsm blockout vinyl printed single sided in full colour. Hemmed edges and clear rust-free eyelets every 1m. Add ropes if you want to tie it straight up." },
    { id: "mesh", title: "Mesh vinyl banners", text: "Perforated vinyl mesh that lets wind through, so it suits fences, scaffolding and building sites. Welded edges with eyelets." },
    { id: "fabric-mesh", title: "Fabric mesh banners", text: "Lightweight woven polyester mesh that folds without creasing and lets air through. Hemmed edges with stainless steel eyelets every 1m." },
  ],
  bands: BANDS_BANNER,
  items: [
    { id: "pvc-2000x1000", group: "pvc", label: "PVC vinyl banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and eyelets", price: [90, 70], priceWithAddon: [90, 75] },
    { id: "pvc-3000x1000", group: "pvc", label: "PVC vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and eyelets", price: [105, 95], priceWithAddon: [115, 100] },
    { id: "pvc-3000x1500", group: "pvc", label: "PVC vinyl banner 3000 × 1500mm", short: "3000 × 1500mm", includes: "Hemmed edges and eyelets", price: [145, 130], priceWithAddon: [155, 140] },
    { id: "mesh-3000x1000", group: "mesh", label: "Mesh vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Welded edges and eyelets", price: [110, 95] },
    { id: "mesh-2400x1800", group: "mesh", label: "Mesh vinyl banner 2400 × 1800mm", short: "2400 × 1800mm", includes: "Welded edges and eyelets", price: [140, 125] },
    { id: "fabric-2000x1000", group: "fabric-mesh", label: "Fabric mesh banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", price: [90, 75] },
    { id: "fabric-3000x1000", group: "fabric-mesh", label: "Fabric mesh banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", price: [110, 100] },
  ],
  addon: { label: "Ropes", note: "PVC vinyl banners: add ropes for up to $15 more each, depending on size. The quote form shows the exact price." },
  notes: [
    "Minimum order $180 per product.",
    "All banners are printed single sided in full colour.",
    "Need a different size? Choose \"Other\" in the quote form and tell us the width and height.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve. Keep text and logos at least 50mm in from the edges so the eyelets stay clear of them.",
  faqs: [
    { q: "Which banner should I choose?", a: "PVC vinyl gives the boldest colour and suits walls, shopfronts and indoor events. On a fence or anywhere windy, choose mesh vinyl or fabric mesh, as the holes let wind through so the banner and fence take less load." },
    { q: "What comes with the banner?", a: "Every banner is finished and ready to hang: PVC vinyl has hemmed edges and eyelets every 1m (ropes optional), mesh vinyl has welded edges and eyelets, and fabric mesh has hemmed edges and stainless steel eyelets. Cable ties or hooks to fix it up are not included." },
    { q: "Is there a minimum order?", a: "Yes. The minimum order is $180 per product, so your banners together come to at least $180. Order 5 or more of the same banner and the price per banner drops." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.bannerPvc,
  gallery: [MOCKUPS.bannerPvc, MOCKUPS.bannerMesh, MOCKUPS.bannerFabricMesh],
  notesHint: "Where it will hang (fence, wall, scaffold), colours or design ideas, anything we should know",
};

export const GEAR_PRODUCTS = [GAZEBOS, FLAGS, UMBRELLAS, BANNERS] as const;

/** Lowest single-item price on a product (used for "From $..." text). Replacement parts don't count. */
export const fromPrice = (p: GearProduct) =>
  Math.min(...p.items.filter((i) => !i.label.startsWith("Replacement")).map((i) => i.price[0]));

export type GearChoice = { item: string; addon: boolean; qty: string };

export function bandIndex(p: GearProduct, qty: number): number {
  let idx = 0;
  p.bands.forEach((b, n) => {
    if (qty >= b.min) idx = n;
  });
  return idx;
}

export type Estimate =
  | { ok: true; each: number; qty: number; total: number }
  | { ok: false; reason: string };

export function estimate(p: GearProduct, c: GearChoice): Estimate {
  const it = p.items.find((x) => x.id === c.item);
  if (!it) return { ok: false, reason: `Pick a ${p.noun}` };
  const qty = Math.floor(Number(c.qty));
  if (!Number.isFinite(qty) || qty < 1 || qty > 99)
    return { ok: false, reason: "Enter a quantity from 1 to 99" };
  const prices = c.addon && it.priceWithAddon ? it.priceWithAddon : it.price;
  const each = prices[bandIndex(p, qty)];
  if (each === undefined) return { ok: false, reason: "No price for that quantity" };
  return { ok: true, each, qty, total: each * qty };
}

export { money } from "./corfluteSigns";
