// Event gear: pop-up gazebos, teardrop and feather flags, and printed market umbrellas.
// Prices come from the Price List tab of each product's spreadsheet in Google Drive (01 Products):
// supplier cost inc GST x 1.3, rounded UP to the next $5 (quantity bands use the supplier price at the
// smallest quantity in the band). Generated from /workspace/es/np/wb/prices.json by /workspace/es/np/gen_ts.py.
// Prices include everything except delivery (not registered for GST).
import type { Mockup } from "./mockups";
import { MOCKUPS } from "./mockups";

export const PRICE_NOTES = [
  "Prices include everything except delivery.",
  "Minimum order $180 for the whole order.",
] as const;

export type GearItem = {
  id: string;
  group: string;
  label: string; // full name, used in the quote form and email
  short: string; // row name inside its group in the price table
  includes: string;
  price: number[]; // price each per quantity band
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
  /** Smaller "Size and finish" photos (scale and close-ups). */
  sizeFinish?: Mockup[];
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
  description: "Medium teardrop (2.7m) and feather (3.0m) flags printed with your artwork, with a 10kg heavy duty square base. Prices online, delivered Australia-wide.",
  eyebrow: "Printed teardrop and feather flags, delivered Australia-wide",
  heading: "Custom teardrop and feather flags that get you seen",
  intro: "Tall printed flags for shopfronts, sport and events. Each one comes with its pole set and a 10kg heavy duty square base, so it works on paving, grass or indoors with no ground spikes.",
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
  hero: MOCKUPS.v4Flags,
  gallery: [MOCKUPS.v4FlagsTeardrop, MOCKUPS.v4Flags],
  galleryHeading: "Teardrop or feather",
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
    { id: "umbrella-10kg", group: "umbrella", label: "Printed market umbrella 2m × 2m, with 10kg base", short: "With 10kg base", includes: "Umbrella, printed canopy and 10kg heavy duty base", price: [490, 465, 450], priceWithAddon: [535, 505, 485] },
    { id: "canopy-only", group: "canopy", label: "Replacement printed canopy (2m × 2m)", short: "Replacement canopy", includes: "Printed canopy only, fits our umbrella frame", price: [245, 235, 225] },
    { id: "base-10kg", group: "weights", label: "Extra 10kg heavy duty umbrella base", short: "10kg heavy duty base", includes: "Base only, fits our umbrella pole", price: [135, 125, 120], accessory: true },
    { id: "water-bag", group: "weights", label: "20L umbrella water bag", short: "20L water bag", includes: "Water bag only, 20kg when filled", price: [45, 45, 40], accessory: true },
  ],
  notes: [
    "Printed on all four canopy panels and the valance.",
  ],
  addon: { label: "Water bag", note: "Add a 20L water bag to an umbrella for $35 to $45 extra each. Tick it in the quote form to see the price." },
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

const BANDS_BANNER = [
  { label: "1 to 4", min: 1 },
  { label: "5+", min: 5 },
];

// Vinyl, mesh and fabric mesh banners. Supplier price inc GST x 1.3, rounded UP to the next $5
// (checked 13 Oct 2026). 1 to 4 uses the supplier price at 2 banners; the $180 minimum applies to the whole order.
export const BANNERS: GearProduct = {
  slug: "banners",
  eventName: "banner",
  subject: "Vinyl or mesh banner quote",
  noun: "banner",
  pageTitle: "Vinyl and Mesh Banners Australia | The Signage Shed",
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
    "Minimum order $180 for the whole order.",
    "All banners are printed single sided in full colour.",
    "Need a different size? Choose \"Other\" in the quote form and tell us the width and height.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve. Keep text and logos at least 50mm in from the edges so the eyelets stay clear of them.",
  faqs: [
    { q: "Which banner should I choose?", a: "PVC vinyl gives the boldest colour and suits walls, shopfronts and indoor events. On a fence or anywhere windy, choose mesh vinyl or fabric mesh, as the holes let wind through so the banner and fence take less load." },
    { q: "What comes with the banner?", a: "Every banner is finished and ready to hang: PVC vinyl has hemmed edges and eyelets every 1m (ropes optional), mesh vinyl has welded edges and eyelets, and fabric mesh has hemmed edges and stainless steel eyelets. Cable ties or hooks to fix it up are not included." },
    { q: "Is there a minimum order?", a: "Yes. Our minimum order is $180 for the whole order, and you can mix banners with other products to reach it. Order 5 or more of the same banner and the price per banner drops." },
    ...COMMON_FAQS,
  ],
  hero: MOCKUPS.v4MeshBanner,
  gallery: [MOCKUPS.v4PvcBanner, MOCKUPS.v4MeshBannerEvent, MOCKUPS.v4MeshBanner],
  galleryHeading: "PVC vinyl, mesh vinyl or fabric mesh",
  sizeFinish: [MOCKUPS.v4BannerEyelet],
  notesHint: "Where it will hang (fence, wall, scaffold), colours or design ideas, anything we should know",
};

const BANDS_EACH = [{ label: "Price each", min: 1 }];

// New products (checked 20 Oct 2026): supplier regular price inc GST x 1.3, rounded UP to the next $5.
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
    { id: "850-single", group: "850", label: "Stretch fabric display 850 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [260] },
    { id: "850-double", group: "850", label: "Stretch fabric display 850 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [305] },
    { id: "1200-single", group: "1200", label: "Stretch fabric display 1200 × 2000mm, single sided", short: "Single sided", includes: "Curved frame, printed fabric and carry case", price: [315] },
    { id: "1200-double", group: "1200", label: "Stretch fabric display 1200 × 2000mm, double sided", short: "Double sided", includes: "Curved frame, printed fabric and carry case", price: [375] },
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
    { id: "600x4ft", group: "kit", label: "Table-top banner kit 600mm tall × 4ft, single sided", short: "600mm tall × 4ft table", includes: "Printed banner and frame", price: [200] },
    { id: "600x6ft", group: "kit", label: "Table-top banner kit 600mm tall × 6ft, single sided", short: "600mm tall × 6ft table", includes: "Printed banner and frame", price: [240] },
    { id: "800x6ft", group: "kit", label: "Table-top banner kit 800mm tall × 6ft, single sided", short: "800mm tall × 6ft table", includes: "Printed banner and frame", price: [265] },
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
    { id: "900x600-single", group: "900x600", label: "ACM sign 900 × 600mm, single sided", short: "Single sided", includes: "White vinyl, gloss laminate", price: [180] },
    { id: "900x600-double", group: "900x600", label: "ACM sign 900 × 600mm, double sided", short: "Double sided", includes: "White vinyl, gloss laminate", price: [210] },
    { id: "1200x900-single", group: "large", label: "ACM sign 1200 × 900mm, single sided", short: "1200 × 900mm", includes: "White vinyl, gloss laminate", price: [215] },
    { id: "1800x1200-single", group: "large", label: "ACM sign 1800 × 1200mm, single sided", short: "1800 × 1200mm", includes: "White vinyl, gloss laminate", price: [390] },
    { id: "2400x1200-single", group: "large", label: "ACM sign 2400 × 1200mm, single sided", short: "2400 × 1200mm", includes: "White vinyl, gloss laminate", price: [510] },
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
    { id: "small", group: "rect", label: "Rectangle flag small 1.5m, double sided", short: "Small 1.5m", includes: "Printed flag, pole and ground spike", price: [170], priceWithAddon: [220] },
    { id: "medium", group: "rect", label: "Rectangle flag medium 2.2m, double sided", short: "Medium 2.2m", includes: "Printed flag, pole and ground spike", price: [210], priceWithAddon: [260] },
    { id: "large", group: "rect", label: "Rectangle flag large 3.2m, double sided", short: "Large 3.2m", includes: "Printed flag, pole and ground spike", price: [260], priceWithAddon: [305] },
  ],
  addon: { label: "Cross base and water bag", note: "Cross base and water bag instead of the ground spike: Small $220, Medium $260, Large $305 each." },
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
