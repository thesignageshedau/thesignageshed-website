// Event gear: pop-up gazebos, teardrop and feather flags, and printed market umbrellas.
// Prices come from the Price List tab of each product's spreadsheet in Google Drive (01 Products):
// supplier regular price inc GST ÷ 0.7 (repriced 26 Nov 2026), rounded UP to the next $5 (quantity tiers use the supplier total at the
// smallest quantity in the band). Re-checked 21 Nov 2026: /workspace/pricing/price-audit-2026-11-21.csv.
// Prices include everything except delivery (not registered for GST).
import { AREA_RATES } from "./areaRates";
const R = (k: keyof typeof AREA_RATES) => AREA_RATES[k].fromPerM2;
import type { Mockup } from "./mockups";
import { MOCKUPS } from "./mockups";
import { type Tier, cappedTotal, tierUnit } from "./tiers";

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
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
    { id: "standard-3x3-none", group: "standard", label: "Standard 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 945], [2, 1886], [3, 2802], [5, 4490]], price: [945, 943, 934, 898], priceWithAddon: [1015, 1013, 1004, 965] },
    { id: "standard-3x3-single", group: "standard", label: "Standard 3 × 3m gazebo, with single sided back wall", short: "3 × 3m · Single sided back wall", includes: "Frame, printed canopy and 4 valances, plus a printed back wall", tiers: [[1, 1195], [2, 2390], [3, 3546], [5, 5690]], price: [1195, 1195, 1182, 1138], priceWithAddon: [1265, 1265, 1252, 1205] },
    { id: "standard-6x3-none", group: "standard", label: "Standard 6 × 3m gazebo, canopy only", short: "6 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 1650], [2, 3296], [3, 4896], [5, 7855]], price: [1650, 1648, 1632, 1571], priceWithAddon: [1760, 1758, 1740, 1674] },
    { id: "luxury-3x3-none", group: "luxury", label: "Luxury 3 × 3m gazebo, canopy only", short: "3 × 3m · Canopy only", includes: "Frame, printed canopy and 4 valances", tiers: [[1, 1395], [2, 2786], [3, 4140], [5, 6640]], price: [1395, 1393, 1380, 1328], priceWithAddon: [1465, 1465, 1450, 1396] },
  ],
  addon: { label: "Heavy duty wheeled carry bag", note: "Heavy duty wheeled carry bag: $67 to $72 extra on a 3 × 3m, $103 to $110 extra on a 6 × 3m. Tick it in the quote form to see the price." },
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
    { id: "teardrop-small-double", group: "teardrop", label: "Teardrop flag 2.3m, double sided", short: "2.3m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 265], [2, 530], [3, 780], [5, 1205], [10, 2250], [20, 4280]], price: [265, 265, 260, 241, 225, 214], priceWithAddon: [285, 285, 279, 259, 242, 231] },
    { id: "teardrop-small-single", group: "teardrop", label: "Teardrop flag 2.3m, single sided", short: "2.3m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 220], [2, 440], [3, 651], [5, 1010], [10, 1890], [20, 3600]], price: [220, 220, 217, 202, 189, 180], priceWithAddon: [240, 240, 235, 220, 206, 196] },
    { id: "teardrop-double", group: "teardrop", label: "Teardrop flag 2.7m, double sided", short: "2.7m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 300], [2, 596], [3, 882], [5, 1360], [10, 2540], [20, 4840]], price: [300, 298, 294, 272, 254, 242], priceWithAddon: [320, 318, 312, 289, 271, 258] },
    { id: "teardrop-single", group: "teardrop", label: "Teardrop flag 2.7m, single sided", short: "2.7m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 240], [2, 476], [3, 702], [5, 1085], [10, 2030], [20, 3880]], price: [240, 238, 234, 217, 203, 194], priceWithAddon: [255, 255, 252, 234, 220, 210] },
    { id: "teardrop-large-double", group: "teardrop", label: "Teardrop flag 3.7m, double sided", short: "3.7m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 330], [2, 660], [3, 972], [5, 1505], [10, 2820], [20, 5360]], price: [330, 330, 324, 301, 282, 268], priceWithAddon: [350, 348, 342, 319, 299, 284] },
    { id: "teardrop-large-single", group: "teardrop", label: "Teardrop flag 3.7m, single sided", short: "3.7m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 270], [2, 536], [3, 786], [5, 1220], [10, 2290], [20, 4360]], price: [270, 268, 262, 244, 229, 218], priceWithAddon: [285, 285, 280, 262, 246, 235] },
    { id: "feather-small-double", group: "feather", label: "Feather flag 2.4m, double sided", short: "2.4m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 280], [2, 560], [3, 822], [5, 1270], [10, 2370], [20, 4500]], price: [280, 280, 274, 254, 237, 225], priceWithAddon: [300, 298, 294, 272, 254, 242] },
    { id: "feather-small-single", group: "feather", label: "Feather flag 2.4m, single sided", short: "2.4m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 230], [2, 460], [3, 675], [5, 1045], [10, 1960], [20, 3720]], price: [230, 230, 225, 209, 196, 186], priceWithAddon: [250, 248, 244, 227, 212, 203] },
    { id: "feather-double", group: "feather", label: "Feather flag 3.0m, double sided", short: "3.0m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 325], [2, 646], [3, 951], [5, 1470], [10, 2750], [20, 5220]], price: [325, 323, 317, 294, 275, 261], priceWithAddon: [345, 343, 335, 312, 292, 278] },
    { id: "feather-single", group: "feather", label: "Feather flag 3.0m, single sided", short: "3.0m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 250], [2, 500], [3, 741], [5, 1145], [10, 2150], [20, 4100]], price: [250, 250, 247, 229, 215, 205], priceWithAddon: [270, 270, 265, 247, 232, 221] },
    { id: "feather-large-double", group: "feather", label: "Feather flag 4.0m, double sided", short: "4.0m · Double sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 360], [2, 720], [3, 1065], [5, 1650], [10, 3080], [20, 5860]], price: [360, 360, 355, 330, 308, 293], priceWithAddon: [380, 380, 374, 347, 325, 309] },
    { id: "feather-large-single", group: "feather", label: "Feather flag 4.0m, single sided", short: "4.0m · Single sided", includes: "Printed flag, pole set and 10kg square base", tiers: [[1, 285], [2, 566], [3, 831], [5, 1290], [10, 2420], [20, 4620]], price: [285, 283, 277, 258, 242, 231], priceWithAddon: [305, 303, 297, 276, 259, 247] },
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
    { id: "umbrella-10kg", group: "umbrella", label: "Printed market umbrella 2m × 2m, with 10kg base", short: "With 10kg base", includes: "Umbrella, printed canopy and 10kg heavy duty base", tiers: [[1, 540], [5, 2550], [10, 4910]], price: [540, 510, 491], priceWithAddon: [585, 554, 533] },
    { id: "canopy-only", group: "canopy", label: "Replacement printed canopy (2m × 2m)", short: "Replacement canopy", includes: "Printed canopy only, fits our umbrella frame", tiers: [[1, 270], [5, 1275], [10, 2460]], price: [270, 255, 246] },
    { id: "base-10kg", group: "weights", label: "Extra 10kg heavy duty umbrella base", short: "10kg heavy duty base", includes: "Base only, fits our umbrella pole", tiers: [[1, 145], [5, 680], [10, 1290]], price: [145, 136, 129], accessory: true },
    { id: "water-bag", group: "weights", label: "20L umbrella water bag", short: "20L water bag", includes: "Water bag only, 20kg when filled", tiers: [[1, 50], [5, 225], [10, 420]], price: [50, 45, 42], accessory: true },
  ],
  notes: [
    "Printed on all four canopy panels and the valance.",
  ],
  addon: { label: "Water bag", note: "Add a 20L water bag to an umbrella for $42 to $45 extra each. Tick it in the quote form to see the price." },
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


// PVC vinyl, mesh vinyl and fabric banners. Quantity tiers: supplier regular pick-up price inc GST ÷ 0.7 (repriced 26 Nov 2026), each tier
// total rounded UP to the next $5 (PVC and mesh 3000 × 1000 checked 23 Oct 2026; mesh 2400 × 1800 and fabric checked 3 Nov 2026,
// record /workspace/pricing/banners-fix-2026-11-03.csv). PVC 3000 × 1500 and the rope add-on re-checked 21 Nov 2026.
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
    { id: "pvc-2000x1000", group: "pvc", label: "PVC vinyl banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 200], [2, 200], [3, 240], [5, 365], [10, 680], [20, 1280], [50, 3000]], price: [200, 100, 80, 73, 68, 64, 60], priceWithAddon: [200, 100, 87, 80, 74, 70, 66] },
    { id: "pvc-3000x1000", group: "pvc", label: "PVC vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 200], [2, 230], [3, 327], [5, 505], [10, 940], [20, 1780], [50, 4200]], price: [200, 115, 109, 101, 94, 89, 84], priceWithAddon: [200, 125, 117, 109, 102, 97, 91] },
    { id: "pvc-3000x1500", group: "pvc", label: "PVC vinyl banner 3000 × 1500mm", short: "3000 × 1500mm", includes: "Hemmed edges and eyelets", tiers: [[1, 200], [2, 316], [3, 450], [5, 705], [10, 1320], [20, 2520], [50, 5950]], price: [200, 158, 150, 141, 132, 126, 119], priceWithAddon: [200, 170, 162, 153, 144, 137, 130] },
    { id: "pvc-4000x1000", group: "pvc", label: "PVC vinyl banner 4000 × 1000mm", short: "4000 × 1000mm", includes: "Hemmed edges and eyelets", tiers: [[1, 200], [2, 306], [3, 435], [5, 685], [10, 1280], [20, 2440], [50, 5800]], price: [200, 153, 145, 137, 128, 122, 116], priceWithAddon: [200, 168, 159, 150, 142, 135, 128] },
    { id: "mesh-2400x1600", group: "mesh", label: "Mesh vinyl banner 2400 × 1600mm", short: "2400 × 1600mm", includes: "Welded edges and eyelets", tiers: [[1, 200], [2, 280], [3, 390], [4, 500], [5, 610], [10, 1130], [20, 2140], [50, 5000]], price: [200, 140, 130, 125, 122, 113, 107, 100] },
    { id: "mesh-3000x1000", group: "mesh", label: "Mesh vinyl banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Welded edges and eyelets", tiers: [[1, 200], [2, 240], [3, 336], [5, 525], [10, 970], [20, 1820], [50, 4250]], price: [200, 120, 112, 105, 97, 91, 85] },
    { id: "mesh-2400x1800", group: "mesh", label: "Mesh vinyl banner 2400 × 1800mm", short: "2400 × 1800mm", includes: "Welded edges and eyelets", tiers: [[1, 200], [2, 300], [3, 426], [5, 665], [10, 1240], [20, 2340], [50, 5450]], price: [200, 150, 142, 133, 124, 117, 109] },
    { id: "mesh-3000x1600", group: "mesh", label: "Mesh vinyl banner 3000 × 1600mm", short: "3000 × 1600mm", includes: "Welded edges and eyelets", tiers: [[1, 200], [2, 330], [3, 465], [5, 725], [10, 1360], [20, 2560], [50, 6000]], price: [200, 165, 155, 145, 136, 128, 120] },
    { id: "fabric-2000x1000", group: "fabric", label: "Fabric banner 2000 × 1000mm", short: "2000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 200], [2, 200], [3, 240], [5, 375], [10, 700], [20, 1320], [50, 3100]], price: [200, 100, 80, 75, 70, 66, 62] },
    { id: "fabric-3000x1000", group: "fabric", label: "Fabric banner 3000 × 1000mm", short: "3000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 200], [2, 230], [3, 327], [5, 510], [10, 960], [20, 1820], [50, 4300]], price: [200, 115, 109, 102, 96, 91, 86] },
    { id: "fabric-3000x1500", group: "fabric", label: "Fabric banner 3000 × 1500mm", short: "3000 × 1500mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 200], [2, 296], [3, 420], [5, 660], [10, 1240], [20, 2360], [50, 5600]], price: [200, 148, 140, 132, 124, 118, 112] },
    { id: "fabric-4000x1000", group: "fabric", label: "Fabric banner 4000 × 1000mm", short: "4000 × 1000mm", includes: "Hemmed edges and stainless steel eyelets", tiers: [[1, 200], [2, 290], [3, 411], [5, 645], [10, 1210], [20, 2320], [50, 5500]], price: [200, 145, 137, 129, 121, 116, 110] },
  ],
  addon: { label: "Ropes", note: "PVC vinyl banners: add ropes for $6 to $15 more each, depending on size. The quote form shows the exact price." },
  notes: [
    "All banners are printed single sided in full colour.",
    "Need a different size? Use the custom size box to get an instant price, or choose Custom size in the quote form.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve. Keep text and logos at least 50mm in from the edges so the eyelets stay clear of them.",
  faqs: [
    { q: "Which banner should I choose?", a: "PVC vinyl gives the boldest colour and suits walls, shopfronts and indoor events. On a fence or anywhere windy, choose mesh vinyl, as the holes let wind through so the banner and fence take less load." },
    { q: "What comes with the banner?", a: "Every banner is finished and ready to hang: PVC vinyl has hemmed edges and eyelets every 1m (ropes optional), mesh vinyl has welded edges and eyelets, and fabric banners have hemmed edges and stainless steel eyelets. Cable ties or hooks to fix it up are not included." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4MeshBanner,
  gallery: [MOCKUPS.v4PvcBanner, MOCKUPS.v4MeshBannerEvent, MOCKUPS.v4MeshBanner],
  galleryHeading: "PVC vinyl, mesh vinyl or fabric",
  sizeFinish: [MOCKUPS.v4BannerEyelet],
  notesHint: "Where it will hang (fence, wall, scaffold), colours or design ideas, anything we should know",
  fromPerM2: R("pvc"),
  fromPerM2Lead: `Printed vinyl banners from $${R("pvc")} per m². Mesh from $${R("mesh")}, fabric from $${R("fabric")}.`,
  customKinds: [
    { kind: "pvc", label: "PVC vinyl" },
    { kind: "mesh", label: "Mesh vinyl" },
    { kind: "fabric", label: "Fabric" },
  ],
  customIntro: "Type any width and height within the limits and we'll price it straight away, with hemmed (or welded) edges and eyelets included.",
  customFinishing: "PVC and fabric: hemmed edges and eyelets every 1m. Mesh: welded edges and eyelets.",
};

const BANDS_EACH = [{ label: "Price each", min: 1 }];

// New products (re-checked 21 Nov 2026): supplier regular price inc GST ÷ 0.7 (repriced 26 Nov 2026), rounded UP to the next $5.
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
    { id: "850-single", group: "850", label: "Stretch fabric display 850 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [285] },
    { id: "850-double", group: "850", label: "Stretch fabric display 850 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [335] },
    { id: "1200-single", group: "1200", label: "Stretch fabric display 1200 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [345] },
    { id: "1200-double", group: "1200", label: "Stretch fabric display 1200 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [410] },
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
    { id: "600x4ft", group: "kit", label: "Table-top banner kit 600mm tall × 4ft, single sided", short: "600mm tall × 4ft table", includes: "Printed banner and frame", price: [215] },
    { id: "600x6ft", group: "kit", label: "Table-top banner kit 600mm tall × 6ft, single sided", short: "600mm tall × 6ft table", includes: "Printed banner and frame", price: [265] },
    { id: "800x6ft", group: "kit", label: "Table-top banner kit 800mm tall × 6ft, single sided", short: "800mm tall × 6ft table", includes: "Printed banner and frame", price: [290] },
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
    { id: "900x600-single", group: "900x600", label: "ACM sign 900 × 600mm, single sided", short: "Single sided", includes: "White vinyl, gloss laminate", price: [200] },
    { id: "900x600-double", group: "900x600", label: "ACM sign 900 × 600mm, double sided", short: "Double sided", includes: "White vinyl, gloss laminate", price: [230] },
    { id: "1200x900-single", group: "large", label: "ACM sign 1200 × 900mm, single sided", short: "1200 × 900mm", includes: "White vinyl, gloss laminate", price: [235] },
    { id: "1800x1200-single", group: "large", label: "ACM sign 1800 × 1200mm, single sided", short: "1800 × 1200mm", includes: "White vinyl, gloss laminate", price: [430] },
    { id: "2400x1200-single", group: "large", label: "ACM sign 2400 × 1200mm, single sided", short: "2400 × 1200mm", includes: "White vinyl, gloss laminate", price: [560] },
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
  fromPerM2: R("acm-single"),
  fromPerM2Lead: `ACM signs from $${R("acm-single")} per m².`,
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
    { id: "small", group: "rect", label: "Rectangle flag small 1.5m, double sided", short: "Small 1.5m", includes: "Printed flag, pole and ground spike", price: [185], priceWithAddon: [240] },
    { id: "medium", group: "rect", label: "Rectangle flag medium 2.2m, double sided", short: "Medium 2.2m", includes: "Printed flag, pole and ground spike", price: [230], priceWithAddon: [285] },
    { id: "large", group: "rect", label: "Rectangle flag large 3.2m, double sided", short: "Large 3.2m", includes: "Printed flag, pole and ground spike", price: [285], priceWithAddon: [335] },
  ],
  addon: { label: "Cross base and water bag", note: "Cross base and water bag instead of the ground spike: Small $240, Medium $285, Large $335 each." },
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
