// Event gear: pop-up gazebos, teardrop and feather flags, and printed market umbrellas.
// Prices come from the Price List tab of each product's spreadsheet in Google Drive (01 Products):
// Easy Signs regular price inc GST ÷ 0.75, rounded UP to the next $5 (quantity tiers use the supplier total at the
// smallest quantity in the band). Re-checked 21 Nov 2026: /workspace/pricing/price-audit-2026-11-21.csv.
// Prices include everything except delivery (not registered for GST).
import type { Mockup } from "./mockups";
import { MOCKUPS } from "./mockups";
import { type Tier, cappedTotal, tierUnit } from "./tiers";

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Minimum order $180 (excl. freight).",
  "Prices are for 1 design. More designs cost a little more, and your quote confirms the price.",
] as const;

export type GearItem = {
  id: string;
  group: string;
  label: string; // full name, used in the quote form and email
  short: string; // row name inside its group in the price table
  includes: string;
  price: number[]; // price each per quantity band
  /** Quantity tiers (our total per quantity). When set, the estimate uses these exactly and price[] is derived. */
  tiers?: Tier[];
  priceWithAddon?: number[]; // price each with the add-on, per band
  accessory?: boolean; // an extra part sold on its own, left out of the "From" price
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
  galleryHeading?: string;
  /** Show the hero image in the gallery too (e.g. when the gallery lists every size). */
  galleryIncludesHero?: boolean;
  /** Smaller "Size and finish" photos (scale and close-ups). */
  sizeFinish?: Mockup[];
  notesHint: string;
  /** Price table shows one material group at a time, and each Quote link passes that group as the quote option. */
  materialTabs?: boolean;
  /** One line under the price intro, for products that publish a single-piece price only. */
  singlePriceNote?: string;
  /** No per-size price table. The page lists sizes and materials, and every quantity is priced on quote. Item prices are only the "From" figure. */
  quoteOnly?: boolean;
  /** Show a "from $X per m²" headline (custom-size products only). */
  fromPerM2?: number;
  fromPerM2Lead?: string;
  /** Kinds offered in the on-page custom-size calculator. */
  customKinds?: { kind: import("./customSize").AreaKind; label: string }[];
  customIntro?: string;
  customFinishing?: string;
};

const BANDS_3 = [
  { label: "1 to 4", min: 1 },
  { label: "5 to 9", min: 5 },
  { label: "10+", min: 10 },
];

const COMMON_FAQS: GearFaq[] = [
  { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
  { q: "How long does it take?", a: "We dispatch within 3 days of artwork approval, depending on order size. Need it by a date? Put it in the Notes box on the quote form and we'll let you know if it's tight." },
  { q: "How much is delivery?", a: "Freight depends on the product's size and weight. We quote it to your postcode and include it on your quote. See our Delivery page for how it works." },
  { q: "How do I pay?", a: "Payment is due once your artwork is approved." },
];

export const GAZEBOS: GearProduct = {
  slug: "gazebos",
  eventName: "gazebo",
  subject: "Pop up gazebo quote",
  noun: "gazebo",
  pageTitle: "Printed Pop Up Gazebos Australia | The Signage Shed",
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
  bands: [{ label: "1", min: 1 }, { label: "2", min: 2 }, { label: "3 to 4", min: 3 }, { label: "5+", min: 5 }],
  items: [
    { id: "standard-3x3-none", group: "standard", label: "Standard 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 880], [2, 1760], [3, 2616], [5, 4190]], price: [880, 880, 872, 838], priceWithAddon: [945, 945, 937, 901] },
    { id: "standard-3x3-single", group: "standard", label: "Standard 3 × 3m gazebo, with single sided back wall", short: "3 × 3m · Single sided back wall", includes: "Frame, printed canopy and 4 valances, plus a printed back wall", tiers: [[1, 1115], [2, 2230], [3, 3312], [5, 5310]], price: [1115, 1115, 1104, 1062], priceWithAddon: [1180, 1180, 1169, 1125] },
    { id: "standard-6x3-none", group: "standard", label: "Standard 6 × 3m gazebo, canopy only", short: "6 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 1540], [2, 3076], [3, 4572], [5, 7330]], price: [1540, 1538, 1524, 1466], priceWithAddon: [1640, 1640, 1624, 1563] },
    { id: "luxury-3x3-none", group: "luxury", label: "Luxury 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 1300], [2, 2600], [3, 3867], [5, 6200]], price: [1300, 1300, 1289, 1240], priceWithAddon: [1370, 1368, 1354, 1303] },
  ],
  addon: { label: "Heavy duty wheeled carry bag", note: "Heavy duty wheeled carry bag: $63 to $70 extra on a 3 × 3m, $97 to $102 extra on a 6 × 3m. Tick it in the quote form to see the price." },
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
  hero: MOCKUPS.v4Gazebo,
  gallery: [MOCKUPS.v4Gazebo3x3Wall, MOCKUPS.v4Gazebo6x3Wall],
  galleryHeading: "3 × 3m or 6 × 3m, with a printed back wall",
  notesHint: "Event date, frame colour, side walls or weights, or design ideas",
};

export const FLAGS: GearProduct = {
  slug: "flags",
  eventName: "flag",
  subject: "Teardrop or feather flag quote",
  noun: "flag",
  pageTitle: "Custom Feather & Teardrop Flags Australia | The Signage Shed",
  description: "Teardrop flags (2.3m to 3.7m) and feather flags (2.4m to 4.0m) printed with your artwork, with a 10kg heavy duty square base. Prices online, delivered Australia-wide.",
  eyebrow: "Printed teardrop and feather flags, delivered Australia-wide",
  heading: "Custom teardrop and feather flags that get you seen",
  intro: "Tall printed flags for shopfronts, sport and events, in three heights. Each teardrop and feather flag comes with its pole set and a 10kg heavy duty square base, so it works on paving, grass or indoors with no ground spikes.",
  teaserTitle: "Teardrop and feather flags",
  teaserText: "Teardrop and feather flags in three heights, with a 10kg heavy duty base",
  groups: [
    { id: "teardrop", title: "Teardrop flags (2.3m, 2.7m or 3.7m tall)", text: "The rounded teardrop shape holds its form even with no wind, so your logo is always readable." },
    { id: "feather", title: "Feather flags (2.4m, 3.0m or 4.0m tall)", text: "Taller and slimmer, with a long straight edge for a logo or a word that reads from a distance." },
  ],
  bands: [{ label: "1", min: 1 }, { label: "2", min: 2 }, { label: "3 to 4", min: 3 }, { label: "5 to 9", min: 5 }, { label: "10 to 19", min: 10 }, { label: "20+", min: 20 }],
  items: [
    { id: "teardrop-small-double", group: "teardrop", label: "Teardrop flag 2.3m, double sided", short: "2.3m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 250], [2, 496], [3, 732], [5, 1125], [10, 2100], [20, 4000]], price: [250, 248, 244, 225, 210, 200], priceWithAddon: [265, 265, 260, 242, 226, 215] },
    { id: "teardrop-small-single", group: "teardrop", label: "Teardrop flag 2.3m, single sided", short: "2.3m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 210], [2, 416], [3, 612], [5, 945], [10, 1770], [20, 3360]], price: [210, 208, 204, 189, 177, 168], priceWithAddon: [225, 225, 220, 205, 192, 183] },
    { id: "teardrop-double", group: "teardrop", label: "Teardrop flag 2.7m, double sided", short: "2.7m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 280], [2, 556], [3, 822], [5, 1270], [10, 2370], [20, 4520]], price: [280, 278, 274, 254, 237, 226], priceWithAddon: [295, 295, 290, 270, 253, 241] },
    { id: "teardrop-single", group: "teardrop", label: "Teardrop flag 2.7m, single sided", short: "2.7m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 220], [2, 440], [3, 651], [5, 1010], [10, 1900], [20, 3620]], price: [220, 220, 217, 202, 190, 181], priceWithAddon: [240, 240, 235, 219, 205, 196] },
    { id: "teardrop-large-double", group: "teardrop", label: "Teardrop flag 3.7m, double sided", short: "3.7m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 310], [2, 616], [3, 906], [5, 1405], [10, 2630], [20, 5000]], price: [310, 308, 302, 281, 263, 250], priceWithAddon: [325, 325, 320, 297, 279, 266] },
    { id: "teardrop-large-single", group: "teardrop", label: "Teardrop flag 3.7m, single sided", short: "3.7m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 250], [2, 500], [3, 735], [5, 1140], [10, 2140], [20, 4080]], price: [250, 250, 245, 228, 214, 204], priceWithAddon: [270, 268, 262, 244, 229, 219] },
    { id: "feather-small-double", group: "feather", label: "Feather flag 2.4m, double sided", short: "2.4m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 260], [2, 520], [3, 765], [5, 1185], [10, 2210], [20, 4200]], price: [260, 260, 255, 237, 221, 210], priceWithAddon: [280, 278, 274, 254, 237, 226] },
    { id: "feather-small-single", group: "feather", label: "Feather flag 2.4m, single sided", short: "2.4m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 215], [2, 430], [3, 630], [5, 975], [10, 1830], [20, 3480]], price: [215, 215, 210, 195, 183, 174], priceWithAddon: [235, 233, 227, 212, 198, 189] },
    { id: "feather-double", group: "feather", label: "Feather flag 3.0m, double sided", short: "3.0m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 305], [2, 606], [3, 891], [5, 1375], [10, 2570], [20, 4880]], price: [305, 303, 297, 275, 257, 244], priceWithAddon: [320, 320, 314, 291, 272, 259] },
    { id: "feather-single", group: "feather", label: "Feather flag 3.0m, single sided", short: "3.0m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 235], [2, 470], [3, 690], [5, 1070], [10, 2010], [20, 3820]], price: [235, 235, 230, 214, 201, 191], priceWithAddon: [255, 253, 247, 231, 216, 206] },
    { id: "feather-large-double", group: "feather", label: "Feather flag 4.0m, double sided", short: "4.0m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 340], [2, 676], [3, 990], [5, 1540], [10, 2880], [20, 5480]], price: [340, 338, 330, 308, 288, 274], priceWithAddon: [355, 355, 349, 324, 303, 289] },
    { id: "feather-large-single", group: "feather", label: "Feather flag 4.0m, single sided", short: "4.0m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 265], [2, 530], [3, 777], [5, 1205], [10, 2260], [20, 4320]], price: [265, 265, 259, 241, 226, 216], priceWithAddon: [285, 283, 277, 258, 242, 231] },
  ],
  addon: { label: "Carry bag", note: "Carry bag: $15 to $20 extra per teardrop or feather flag. Tick it in the quote form to see the price." },
  notes: [
    "Double sided: two printed fabrics sewn back to back, so it reads correctly from both sides.",
    "Single sided: printed once, and your artwork shows mirrored on the back.",
    "Every teardrop and feather flag includes a black pole set and a 10kg heavy duty square base.",
  ],
  artwork: "Flags are printed from the full-size template for that flag shape. Ask for the template with your quote, or send us your logo and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "Teardrop or feather?", a: "The teardrop keeps its shape in still air and suits a logo. The feather is taller and slimmer, which suits a word or short message that reads from the road." },
    { q: "Single or double sided?", a: "A single sided flag is printed once and shows a mirror image on the back. Double sided flags have two prints sewn back to back, so the text reads the right way from both sides." },
    { q: "What base comes with it?", a: "A 10kg heavy duty square base, so it stands on paving, concrete, grass or indoors. No ground spikes needed." },
    { q: "Which height should I choose?", a: "The middle height suits most shopfronts and events. Go small for footpaths and indoors, or large to be seen from the road or across a sports ground." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4Flags,
  gallery: [MOCKUPS.v4FlagsTeardrop, MOCKUPS.v4Flags, MOCKUPS.v4TeardropSizes, MOCKUPS.v4FeatherSizes],
  galleryHeading: "Teardrop or feather flags",
  notesHint: "Where the flags will stand, colours or design ideas, anything we should know",
};

export const UMBRELLAS: GearProduct = {
  slug: "market-umbrellas",
  eventName: "umbrella",
  subject: "Printed market umbrella quote",
  noun: "umbrella",
  pageTitle: "Printed Market Umbrellas Australia | The Signage Shed",
  description: "2m × 2m square market umbrellas with your logo printed on all four panels and the valance. With a 10kg heavy duty base. Prices online, delivered Australia-wide.",
  eyebrow: "Printed market umbrellas, delivered Australia-wide",
  heading: "Printed market umbrellas with your logo on top",
  intro: "A 2m × 2m square umbrella printed on all four panels and the valance, on a heavy duty 45mm aluminium pole with an easy slider (no ropes or pulleys). Great for cafes, markets and fetes.",
  teaserTitle: "Printed market umbrellas",
  teaserText: "2m × 2m square umbrellas printed on every panel, with a 10kg heavy duty base.",
  groups: [
    { id: "umbrella", title: "Printed market umbrella 2m × 2m", text: "Full colour canopy (270gsm polyester) on a 45mm aluminium pole with four height settings and a 12 month warranty on the frame and base." },
    { id: "canopy", title: "Replacement canopy", text: "A new printed canopy for one of our umbrella frames, for a rebrand or a worn canopy." },
    { id: "weights", title: "Extra bases and water bags", text: "Every umbrella already comes with a 10kg base. Add a spare base, or a 20L water bag (20kg when filled) for more weight." },
  ],
  bands: BANDS_3,
  items: [
    { id: "umbrella-10kg", group: "umbrella", label: "Printed market umbrella 2m × 2m, with 10kg base", short: "With 10kg base", includes: "Umbrella, printed canopy and 10kg heavy duty base", tiers: [[1, 505], [5, 2380], [10, 4580]], price: [505, 476, 458], priceWithAddon: [550, 518, 497] },
    { id: "canopy-only", group: "canopy", label: "Replacement printed canopy (2m × 2m)", short: "Replacement canopy", includes: "Printed canopy only, fits our umbrella frame", tiers: [[1, 250], [5, 1190], [10, 2300]], price: [250, 238, 230] },
    { id: "base-10kg", group: "weights", label: "Extra 10kg heavy duty umbrella base", short: "10kg heavy duty base", includes: "Base only, fits our umbrella pole", tiers: [[1, 135], [5, 635], [10, 1210]], price: [135, 127, 121], accessory: true },
    { id: "water-bag", group: "weights", label: "20L umbrella water bag", short: "20L water bag", includes: "Water bag only, 20kg when filled", tiers: [[1, 45], [5, 210], [10, 400]], price: [45, 42, 40], accessory: true },
  ],
  notes: [
    "Printed on all four canopy panels and the valance.",
  ],
  addon: { label: "Water bag", note: "Add a 20L water bag to an umbrella for $39 to $45 extra each. Tick it in the quote form to see the price." },
  artwork: "Umbrella canopies are printed from a full-size template for the panels and valance. Ask for the template with your quote, or send us your logo and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What size is it?", a: "2m × 2m square, with a 220mm valance around the edge. The pole has four height settings." },
    { q: "Which base should I choose?", a: "Every umbrella comes with a 10kg heavy duty base, which suits most sites. Add a 20L water bag (20kg when filled) for extra weight." },
    { q: "Can it stay up in wind?", a: "Close the umbrella in strong wind. Like any market umbrella it can tip or be damaged in gusts." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4Umbrella,
  gallery: [],
  notesHint: "Where it will be used, colours or design ideas, anything we should know",
};


// PVC vinyl, mesh vinyl and fabric banners. Quantity tiers: Easy Signs regular pick-up price inc GST ÷ 0.75, each tier
// total rounded UP to the next $5 (PVC and mesh 3000 × 1000 checked 23 Oct 2026; mesh 2400 × 1800 and fabric checked 3 Nov 2026,
// record /workspace/pricing/banners-fix-2026-11-03.csv). PVC 3000 × 1500 and the rope add-on re-checked 21 Nov 2026. The $180 minimum applies to the whole order.
export const BANNERS: GearProduct = {
  slug: "banners",
  eventName: "banner",
  subject: "Vinyl or mesh banner quote",
  noun: "banner",
  pageTitle: "Mesh Banners & Printed Banner Mesh Australia | The Signage Shed",
  description: "Printed PVC vinyl banners, mesh vinyl banners and fabric banners in popular sizes, finished with hemmed edges and eyelets. Prices online, delivered Australia-wide.",
  eyebrow: "Printed vinyl and mesh banners, delivered Australia-wide",
  heading: "Banners for fences, shopfronts and events",
  intro: "Full colour banners, finished and ready to hang. Choose solid PVC vinyl for the boldest colour, or mesh when the banner goes on a fence or anywhere wind can catch it.",
  teaserTitle: "Vinyl and mesh banners",
  teaserText: "PVC vinyl, mesh vinyl and fabric banners, hemmed with eyelets and ready to hang.",
  groups: [
    { id: "pvc", title: "PVC vinyl banners", text: "Heavy 510gsm blockout vinyl printed single sided in full colour. Hemmed edges and clear rust-free eyelets every 1m. Add ropes if you want to tie it straight up." },
    { id: "mesh", title: "Mesh vinyl banners", text: "Perforated vinyl mesh that lets wind through, so it suits fences, scaffolding and building sites. Welded edges with eyelets." },
    { id: "fabric", title: "Fabric banners", text: "Lightweight 120gsm polyester fabric that folds without creasing, so it packs away easily. Hemmed edges with stainless steel eyelets every 1m." },
  ],
  bands: [{ label: "1", min: 1 }, { label: "2", min: 2 }, { label: "3 to 4", min: 3 }, { label: "5 to 9", min: 5 }, { label: "10 to 19", min: 10 }, { label: "20 to 49", min: 20 }, { label: "50+", min: 50 }],
  items: [
    { id: "pvc-2000x1000", group: "pvc", label: "PVC vinyl banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 185], [2, 186], [3, 225], [5, 345], [10, 630], [20, 1200], [50, 2800]], price: [185, 93, 75, 69, 63, 60, 56], priceWithAddon: [185, 93, 80, 75, 69, 65, 61] },
    { id: "pvc-3000x1000", group: "pvc", label: "PVC vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 185], [2, 216], [3, 300], [5, 470], [10, 880], [20, 1660], [50, 3900]], price: [185, 108, 100, 94, 88, 83, 78], priceWithAddon: [185, 115, 109, 102, 95, 90, 85] },
    { id: "pvc-3000x1500", group: "pvc", label: "PVC vinyl banner 3000 × 1500mm", short: "3000 × 1500mm", includes: "Hemmed edges and eyelets", tiers: [[1, 185], [2, 296], [3, 420], [5, 660], [10, 1240], [20, 2340], [50, 5550]], price: [185, 148, 140, 132, 124, 117, 111], priceWithAddon: [185, 160, 152, 143, 135, 128, 121] },
    { id: "pvc-4000x1000", group: "pvc", label: "PVC vinyl banner 4000 × 1000mm", short: "4000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 185], [2, 286], [3, 405], [5, 640], [10, 1200], [20, 2280], [50, 5400]], price: [185, 143, 135, 128, 120, 114, 108], priceWithAddon: [185, 158, 149, 140, 132, 126, 119] },
    { id: "mesh-2400x1600", group: "mesh", label: "Mesh vinyl banner 2400 × 1600mm", short: "2400 × 1600mm", includes: "Welded edges and eyelets", tiers: [[1, 185], [2, 260], [3, 366], [4, 468], [5, 570], [10, 1060], [20, 1980], [50, 4650]], price: [185, 130, 122, 114, 106, 99, 93] },
    { id: "mesh-3000x1000", group: "mesh", label: "Mesh vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Welded edges and eyelets", tiers: [[1, 185], [2, 226], [3, 315], [5, 490], [10, 900], [20, 1700], [50, 4000]], price: [185, 113, 105, 98, 90, 85, 80] },
    { id: "mesh-2400x1800", group: "mesh", label: "Mesh vinyl banner 2400 × 1800mm", short: "2400 × 1800mm", includes: "Welded edges and eyelets", tiers: [[1, 185], [2, 280], [3, 402], [5, 620], [10, 1160], [20, 2180], [50, 5100]], price: [185, 140, 134, 124, 116, 109, 102] },
    { id: "mesh-3000x1600", group: "mesh", label: "Mesh vinyl banner 3000 × 1600mm", short: "3000 × 1600mm", includes: "Welded edges and eyelets", tiers: [[1, 185], [2, 306], [3, 435], [5, 680], [10, 1270], [20, 2400], [50, 5600]], price: [185, 153, 145, 136, 127, 120, 112] },
    { id: "fabric-2000x1000", group: "fabric", label: "Fabric banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 185], [2, 186], [3, 225], [5, 350], [10, 650], [20, 1240], [50, 2900]], price: [185, 93, 75, 70, 65, 62, 58] },
    { id: "fabric-3000x1000", group: "fabric", label: "Fabric banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 185], [2, 216], [3, 306], [5, 475], [10, 900], [20, 1700], [50, 4000]], price: [185, 108, 102, 95, 90, 85, 80] },
    { id: "fabric-3000x1500", group: "fabric", label: "Fabric banner 3000 × 1500mm", short: "3000 × 1500mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 185], [2, 276], [3, 390], [5, 615], [10, 1160], [20, 2200], [50, 5200]], price: [185, 138, 130, 123, 116, 110, 104] },
    { id: "fabric-4000x1000", group: "fabric", label: "Fabric banner 4000 × 1000mm", short: "4000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 185], [2, 270], [3, 381], [5, 600], [10, 1130], [20, 2160], [50, 5100]], price: [185, 135, 127, 120, 113, 108, 102] },
  ],
  addon: { label: "Ropes", note: "PVC vinyl banners: add ropes for $5 to $12 more each, depending on size. The quote form shows the exact price." },
  notes: [
    "All banners are printed single sided in full colour.",
    "Need a different size? Use the custom size box to get an instant price, or choose Custom size in the quote form.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve. Keep text and logos at least 50mm in from the edges so the eyelets stay clear of them.",
  faqs: [
    { q: "Which banner should I choose?", a: "PVC vinyl gives the boldest colour and suits walls, shopfronts and indoor events. On a fence or anywhere windy, choose mesh vinyl, as the holes let wind through so the banner and fence take less load." },
    { q: "What comes with the banner?", a: "Every banner is finished and ready to hang: PVC vinyl has hemmed edges and eyelets every 1m (ropes optional), mesh vinyl has welded edges and eyelets, and fabric banners have hemmed edges and stainless steel eyelets. Cable ties or hooks to fix it up are not included." },
    { q: "Is there a minimum order?", a: "Yes. Our minimum order is $180 for the whole order, and you can mix banners with other products to reach it. The more of the same banner you order, the lower the price each." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4MeshBanner,
  gallery: [MOCKUPS.v4PvcBanner, MOCKUPS.v4MeshBannerEvent, MOCKUPS.v4MeshBanner],
  galleryHeading: "PVC vinyl, mesh vinyl or fabric",
  sizeFinish: [MOCKUPS.v4BannerEyelet],
  notesHint: "Where it will hang (fence, wall, scaffold), colours or design ideas, anything we should know",
  fromPerM2: 22,
  fromPerM2Lead: "Printed vinyl banners from $22 per m². Mesh from $22, fabric from $20.",
  customKinds: [
    { kind: "pvc", label: "PVC vinyl" },
    { kind: "mesh", label: "Mesh vinyl" },
    { kind: "fabric", label: "Fabric" },
  ],
  customIntro: "Type any width and height within the limits and we'll price it straight away, with hemmed (or welded) edges and eyelets included.",
  customFinishing: "PVC and fabric: hemmed edges and eyelets every 1m. Mesh: welded edges and eyelets.",
};

const BANDS_EACH = [{ label: "Price each", min: 1 }];

// New products (re-checked 21 Nov 2026): Easy Signs regular price inc GST ÷ 0.75, rounded UP to the next $5.
// Pricing record: /workspace/pricing/new-products-2026-10-20.csv. No custom sizes on these.
export const STRETCH_FABRIC: GearProduct = {
  slug: "stretch-fabric-displays",
  eventName: "stretch_fabric",
  subject: "Stretch fabric display quote",
  noun: "display",
  pageTitle: "Stretch Fabric Displays Australia | The Signage Shed",
  description: "Stretch fabric display stands, 850 or 1200mm wide and 2000mm tall, single or double sided, with a carry case. Prices online, delivered Australia-wide.",
  eyebrow: "Stretch fabric displays, delivered Australia-wide",
  heading: "Stretch fabric displays for expos, foyers and events",
  intro: "A printed fabric cover pulled tight over a curved-corner tube frame. Smooth, crease-free and quick to put up, and it packs into its own carry case.",
  teaserTitle: "Stretch fabric displays",
  teaserText: "Printed fabric over a curved tube frame, 850 or 1200mm wide, single or double sided, with a carry case.",
  groups: [
    { id: "850", title: "850 × 2000mm", text: "The slim size, about the footprint of a pull up banner." },
    { id: "1200", title: "1200 × 2000mm", text: "Wider, for a bigger logo or more room for your message." },
  ],
  bands: BANDS_EACH,
  items: [
    { id: "850-single", group: "850", label: "Stretch fabric display 850 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [265] },
    { id: "850-double", group: "850", label: "Stretch fabric display 850 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [315] },
    { id: "1200-single", group: "1200", label: "Stretch fabric display 1200 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [320] },
    { id: "1200-double", group: "1200", label: "Stretch fabric display 1200 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [385] },
  ],
  notes: [
    "Every display includes the curved frame, the printed fabric and a carry case.",
    "Double sided: printed on both faces, so it works in the middle of a room.",
  ],
  artwork: "Stretch fabric displays are printed from a full-size template. Ask for the template with your quote, or send us your logo and wording and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What's included?", a: "The curved tube frame, the printed fabric cover and a carry case." },
    { q: "Single or double sided?", a: "Single sided suits a display against a wall. Choose double sided when people will see it from both sides." },
    { q: "How is it different from a pull up banner?", a: "A pull up banner rolls into its base. A stretch fabric display is a fabric cover pulled over a frame, so it has rounded corners and a smooth, seamless look." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4StretchFabric,
  gallery: [],
  notesHint: "Where it will be used, colours or design ideas, anything we should know",
};

export const TABLE_TOP_BANNERS: GearProduct = {
  slug: "table-top-banners",
  eventName: "table_top",
  subject: "Table-top banner quote",
  noun: "banner",
  pageTitle: "Table-Top Banners Australia | The Signage Shed",
  description: "Printed table-top banner kits for 4ft and 6ft tables, 600mm or 800mm tall, single sided on a light frame. Prices online, delivered Australia-wide.",
  eyebrow: "Table-top banners, delivered Australia-wide",
  heading: "Table-top banners that sit along your table",
  intro: "A printed fabric banner on a light frame that sits on top of your table, so your brand shows above the tablecloth at expos, markets and events.",
  teaserTitle: "Table-top banners",
  teaserText: "Printed table-top banner kits for 4ft and 6ft tables, single sided.",
  groups: [
    { id: "kit", title: "Table-top banner kit, single sided", text: "Printed banner and frame. Choose the size to suit your table." },
  ],
  bands: BANDS_EACH,
  items: [
    { id: "600x4ft", group: "kit", label: "Table-top banner kit 600mm tall × 4ft, single sided", short: "600mm tall × 4ft table", includes: "Printed banner and frame", price: [205] },
    { id: "600x6ft", group: "kit", label: "Table-top banner kit 600mm tall × 6ft, single sided", short: "600mm tall × 6ft table", includes: "Printed banner and frame", price: [245] },
    { id: "800x6ft", group: "kit", label: "Table-top banner kit 800mm tall × 6ft, single sided", short: "800mm tall × 6ft table", includes: "Printed banner and frame", price: [270] },
  ],
  notes: [
    "Printed single sided.",
    "Pair it with a printed table cover for the full look.",
  ],
  artwork: "Table-top banners are printed from a full-size template. Ask for the template with your quote, or send us your logo and wording and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What's included?", a: "The printed banner and its frame, ready to sit on your table." },
    { q: "Which size do I need?", a: "Match the width to your table: 4ft or 6ft. On a 6ft table, choose 600mm or 800mm tall depending on how much height you want above the table." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4TableTopBanner,
  gallery: [],
  notesHint: "Your table size, colours or design ideas, anything we should know",
};

export const ACM_SIGNS: GearProduct = {
  slug: "acm-signs",
  eventName: "acm",
  subject: "ACM sign quote",
  noun: "sign",
  pageTitle: "ACM Signs Australia: Aluminium Composite | The Signage Shed",
  description: "Printed ACM (aluminium composite) signs from 900 × 600mm to 2400 × 1200mm, white vinyl with gloss laminate. Prices online, delivered Australia-wide.",
  eyebrow: "ACM signs, delivered Australia-wide",
  heading: "ACM signs for shopfronts, sites and walls",
  intro: "Flat, rigid aluminium composite panels printed on white vinyl with a gloss laminate. Our sturdiest sign, for walls, fences and anywhere it needs to last.",
  teaserTitle: "ACM signs",
  teaserText: "Rigid aluminium composite signs, white vinyl with gloss laminate, from 900 × 600mm to 2400 × 1200mm.",
  groups: [
    { id: "900x600", title: "900 × 600mm", text: "Single or double sided." },
    { id: "large", title: "Larger sizes", text: "Printed single sided." },
  ],
  bands: BANDS_EACH,
  items: [
    { id: "900x600-single", group: "900x600", label: "ACM sign 900 × 600mm, single sided", short: "Single sided", includes: "White vinyl, gloss laminate", price: [185] },
    { id: "900x600-double", group: "900x600", label: "ACM sign 900 × 600mm, double sided", short: "Double sided", includes: "White vinyl, gloss laminate", price: [215] },
    { id: "1200x900-single", group: "large", label: "ACM sign 1200 × 900mm, single sided", short: "1200 × 900mm", includes: "White vinyl, gloss laminate", price: [220] },
    { id: "1800x1200-single", group: "large", label: "ACM sign 1800 × 1200mm, single sided", short: "1800 × 1200mm", includes: "White vinyl, gloss laminate", price: [400] },
    { id: "2400x1200-single", group: "large", label: "ACM sign 2400 × 1200mm, single sided", short: "2400 × 1200mm", includes: "White vinyl, gloss laminate", price: [525] },
  ],
  notes: [
    "Printed on white vinyl with a gloss laminate. Supplied with no holes.",
    "Need holes for fixing? Ask us and we'll include it in your quote.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "What is ACM?", a: "Aluminium composite material: a flat, rigid panel with aluminium faces. It's sturdier than corflute and suits signs that need to last." },
    { q: "Does it come with holes?", a: "No, signs are supplied without holes. If you need holes for fixing, ask us and we'll include them in your quote." },
    { q: "ACM or corflute?", a: "Corflute is lighter and lower cost, great for events and short-term signs. ACM is rigid and sturdier for longer-term use. See our corflute vs rigid signs guide." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4AcmSign,
  gallery: [],
  notesHint: "Where it will go, whether you need holes, colours or design ideas",
  fromPerM2: 131,
  fromPerM2Lead: "ACM signs from $131 per m².",
  customKinds: [
    { kind: "acm-single", label: "Single sided" },
    { kind: "acm-double", label: "Double sided" },
  ],
  customIntro: "Type any width and height up to 2400 × 1200mm and we'll price it straight away. Printed on white vinyl with a gloss laminate, no holes.",
  customFinishing: "White vinyl with a gloss laminate, supplied with no holes.",
};

export const RECTANGLE_FLAGS: GearProduct = {
  slug: "rectangle-flags",
  eventName: "rectangle_flag",
  subject: "Rectangle flag quote",
  noun: "flag",
  pageTitle: "Rectangle Flags Australia: Custom Printed | The Signage Shed",
  description: "Custom printed double sided rectangle flags in small, medium and large, with pole and ground spike or a cross base and water bag. Delivered Australia-wide.",
  eyebrow: "Printed rectangle flags, delivered Australia-wide",
  heading: "Rectangle flags with room for your whole message",
  intro: "A rectangular printed flag on a pole, so your logo and wording show in full. Double sided, with a pole and ground spike, or a cross base and water bag for hard ground.",
  teaserTitle: "Rectangle flags",
  teaserText: "Double sided rectangle flags in three sizes, with pole and ground spike or cross base.",
  groups: [
    { id: "rect", title: "Rectangle flag, double sided", text: "Printed flag with pole and ground spike. Choose the size." },
  ],
  bands: BANDS_EACH,
  items: [
    { id: "small", group: "rect", label: "Rectangle flag small 1.5m, double sided", short: "Small 1.5m", includes: "Printed flag, pole and ground spike", price: [175], priceWithAddon: [225] },
    { id: "medium", group: "rect", label: "Rectangle flag medium 2.2m, double sided", short: "Medium 2.2m", includes: "Printed flag, pole and ground spike", price: [215], priceWithAddon: [265] },
    { id: "large", group: "rect", label: "Rectangle flag large 3.2m, double sided", short: "Large 3.2m", includes: "Printed flag, pole and ground spike", price: [265], priceWithAddon: [315] },
  ],
  addon: { label: "Cross base and water bag", note: "Cross base and water bag instead of the ground spike: Small $225, Medium $265, Large $315 each." },
  notes: [
    "Double sided, so it reads correctly from both sides.",
    "Ground spike for grass, or a cross base and water bag for paving and indoors.",
  ],
  artwork: "Flags are printed from the full-size template for that size. Ask for the template with your quote, or send us your logo and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "Spike or cross base?", a: "The ground spike suits grass and soft ground. On paving, concrete or indoors, choose the cross base and water bag." },
    { q: "Rectangle or teardrop and feather?", a: "A rectangle flag gives you the most room for a logo and wording. Teardrop and feather flags have a curved shape that stands out from a distance." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4RectangleFlags,
  gallery: [],
  notesHint: "Where the flags will stand, colours or design ideas, anything we should know",
};

export const GEAR_PRODUCTS = [GAZEBOS, FLAGS, UMBRELLAS, BANNERS, STRETCH_FABRIC, TABLE_TOP_BANNERS, ACM_SIGNS, RECTANGLE_FLAGS] as const;

/** Lowest single-item price on a product (used for "From $..." text). Replacement parts don't count. */
export const fromPrice = (p: GearProduct) =>
  Math.min(...p.items.filter((i) => !i.accessory && !i.label.startsWith("Replacement")).map((i) => i.price[0]));

export type GearChoice = { item: string; addon: boolean; qty: string };

export function bandIndex(p: GearProduct, qty: number): number {
  let idx = 0;
  p.bands.forEach((b, n) => {
    if (qty >= b.min) idx = n;
  });
  return idx;
}

/** Price each for an item at a quantity: exact quantity tiers when the item has them, otherwise its band price.
 * The add-on adds the same amount it adds in the price table. */
function gearUnit(p: GearProduct, it: GearItem, addon: boolean, qty: number): number | undefined {
  const b = bandIndex(p, qty);
  const extra = addon && it.priceWithAddon ? (it.priceWithAddon[b] ?? 0) - (it.price[b] ?? 0) : 0;
  if (it.tiers) return tierUnit(it.tiers, qty) + extra;
  const prices = addon && it.priceWithAddon ? it.priceWithAddon : it.price;
  return prices[b];
}

/** Price each: the line total (band unit price × qty, capped so it never exceeds a larger order's total)
 * divided by the quantity. */
export function gearEach(p: GearProduct, it: GearItem, addon: boolean, qty: number): number | undefined {
  if (gearUnit(p, it, addon, qty) === undefined) return undefined;
  const horizon = Math.max(p.bands[p.bands.length - 1]!.min, ...(it.tiers ?? []).map(([q]) => q));
  const raw = (q: number) => {
    const u = gearUnit(p, it, addon, q);
    return u === undefined ? Infinity : u * q;
  };
  return cappedTotal(raw, qty, horizon) / qty;
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
  const each = gearEach(p, it, c.addon, qty);
  if (each === undefined) return { ok: false, reason: "No price for that quantity" };
  return { ok: true, each, qty, total: Math.round(each * qty * 100) / 100 };
}

export { money } from "./corfluteSigns";
