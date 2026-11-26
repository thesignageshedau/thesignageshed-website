// Shop-by-use hubs and homepage tiles. Prices are the current live From figures
// from each product page (no new prices). Freight is quoted separately.

/** Visible heading for the menu group and homepage tiles. Change this to rename the feature. */
export const SHOP_BY_LABEL = "Shop by use";

import * as AF from "./aFrames";
import * as PB from "./pullUpBanners";
import * as TC from "./tableCovers";
import { ACM_SIGNS, BANNERS, FLAGS, UMBRELLAS, fromPrice } from "./eventGear";
import { ARCH_BANNERS, BUSINESS_CARDS, CAR_MAGNETS, POSTERS, PRINTED_CHAIRS, PRINTED_VINYL, WINDOW_CLINGS } from "./newProducts";
import { PACKS } from "./packs";
import { FROM_PER_M2 } from "./customSize";
import { FROM_EACH_IN_TENS } from "./clothing";
import { MOCKUPS, type Mockup } from "./mockups";
import { MIN_NOTE } from "./tiers";

export type IndustryIconId =
  | "events"
  | "schools"
  | "shops"
  | "tradies"
  | "markets"
  | "clubs";

export type IndustryProduct = {
  href: string;
  name: string;
  from: number;
  fromText: string;
  img: Mockup;
};

export type Industry = {
  slug: string;
  href: string;
  icon: IndustryIconId;
  label: string; // nav and tiles
  eyebrow: string;
  heading: string;
  title: string;
  description: string;
  intro: string;
  lead: string; // visible From line in the hero, must match JSON-LD
  offerPrice: number;
  offerPerM2: boolean;
  image: Mockup;
  products: IndustryProduct[];
  related: { href: string; text: string }[];
  /** Existing SEO page we reuse instead of a new hub. */
  existing?: boolean;
};

const fromAud = (n: number) => `From $${n.toLocaleString("en-AU")}`;
const fromM2 = (n: number) => `From $${n} per m²`;
const clothingFrom = `From $${FROM_EACH_IN_TENS} each in 10s`;

const clothing: IndustryProduct = {
  href: "/clothing/",
  name: "Printed clothing",
  from: FROM_EACH_IN_TENS,
  fromText: clothingFrom,
  img: MOCKUPS.v4ClothingTee,
};
const aFrames: IndustryProduct = {
  href: "/a-frames/",
  name: "A-frames",
  from: AF.FROM_PRICE,
  fromText: fromAud(AF.FROM_PRICE),
  img: MOCKUPS.v4AFrames,
};
const banners: IndustryProduct = {
  href: "/banners/",
  name: "Vinyl and mesh banners",
  from: FROM_PER_M2.pvc,
  fromText: fromM2(FROM_PER_M2.pvc),
  img: BANNERS.hero,
};
const acm: IndustryProduct = {
  href: "/acm-signs/",
  name: "ACM signs",
  from: FROM_PER_M2["acm-single"],
  fromText: fromM2(FROM_PER_M2["acm-single"]),
  img: ACM_SIGNS.hero,
};
const corflute: IndustryProduct = {
  href: "/corflute-signs/",
  name: "Corflute signs",
  from: FROM_PER_M2["corflute-5mm-single"],
  fromText: fromM2(FROM_PER_M2["corflute-5mm-single"]),
  img: MOCKUPS.v4Corflute,
};
const vinyl: IndustryProduct = {
  href: "/printed-vinyl/",
  name: "Printed vinyl",
  from: FROM_PER_M2.sav,
  fromText: fromM2(FROM_PER_M2.sav),
  img: PRINTED_VINYL.hero,
};
const flags: IndustryProduct = {
  href: "/flags/",
  name: "Teardrop and feather flags",
  from: fromPrice(FLAGS),
  fromText: fromAud(fromPrice(FLAGS)),
  img: FLAGS.hero,
};
const covers: IndustryProduct = {
  href: "/table-covers/",
  name: "Table covers and runners",
  from: TC.FROM_PRICE,
  fromText: fromAud(TC.FROM_PRICE),
  img: MOCKUPS.v4TableCover,
};
const umbrellas: IndustryProduct = {
  href: "/market-umbrellas/",
  name: "Market umbrellas",
  from: fromPrice(UMBRELLAS),
  fromText: fromAud(fromPrice(UMBRELLAS)),
  img: UMBRELLAS.hero,
};
const magnets: IndustryProduct = {
  href: "/car-magnets/",
  name: "Car magnets",
  from: fromPrice(CAR_MAGNETS),
  fromText: fromAud(fromPrice(CAR_MAGNETS)),
  img: CAR_MAGNETS.hero,
};
const cards: IndustryProduct = {
  href: "/business-cards/",
  name: "Business cards",
  from: fromPrice(BUSINESS_CARDS),
  fromText: fromAud(fromPrice(BUSINESS_CARDS)),
  img: BUSINESS_CARDS.hero,
};
const pullUps: IndustryProduct = {
  href: "/pull-up-banners/",
  name: "Pull up banners",
  from: PB.FROM_PRICE,
  fromText: fromAud(PB.FROM_PRICE),
  img: MOCKUPS.v4PullUp,
};
const gearTile = (href: string, name: string, g: typeof POSTERS): IndustryProduct => ({
  href,
  name,
  from: fromPrice(g),
  fromText: fromAud(fromPrice(g)),
  img: g.hero,
});
const clings = gearTile("/window-clings/", "Window clings", WINDOW_CLINGS);
const posters = gearTile("/posters/", "Posters", POSTERS);
const chairs = gearTile("/printed-chairs/", "Printed chairs", PRINTED_CHAIRS);
const arches = gearTile("/arch-banners/", "Arch banners", ARCH_BANNERS);
const sponsor5 = PACKS.items.find((i) => i.id === "sponsor-5")!;
const sponsorPacks: IndustryProduct = {
  href: "/packs/",
  name: "Sponsor banner packs",
  from: sponsor5.price[0]!,
  fromText: fromAud(sponsor5.price[0]!),
  img: PACKS.hero,
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "event-signage-australia",
    href: "/event-signage-australia/",
    icon: "events",
    label: "Events",
    eyebrow: "",
    heading: "",
    title: "",
    description: "",
    intro: "",
    lead: "",
    offerPrice: 0,
    offerPerM2: false,
    image: MOCKUPS.v4MeshBannerEvent,
    products: [],
    related: [],
    existing: true,
  },
  {
    slug: "school-and-sports-club-signs",
    href: "/school-and-sports-club-signs/",
    icon: "schools",
    label: "Schools & sports clubs",
    eyebrow: "",
    heading: "",
    title: "",
    description: "",
    intro: "",
    lead: "",
    offerPrice: 0,
    offerPerM2: false,
    image: MOCKUPS.v4FlagsTeardrop,
    products: [],
    related: [],
    existing: true,
  },
  {
    slug: "shops-and-cafes",
    href: "/shops-and-cafes/",
    icon: "shops",
    label: "Shops & cafés",
    eyebrow: "Signs for shops and cafés",
    heading: "Footpath boards, wall signs and window vinyl",
    title: "Signs for Shops and Cafés | The Signage Shed",
    description: `A-frame signs, ACM wall signs, printed vinyl and business cards for shops and cafés. A-frames from $${AF.FROM_PRICE}, delivered Australia-wide.`,
    intro: "A clear board on the footpath and a sign on the wall help people find you and see what you offer. We print the signs and deliver them Australia-wide. You put them up.",
    lead: `A-frame signs from $${AF.FROM_PRICE}.`,
    offerPrice: AF.FROM_PRICE,
    offerPerM2: false,
    image: MOCKUPS.v4AFramePrinted,
    products: [aFrames, acm, vinyl, clings, posters, cards, pullUps],
    related: [
      { href: "/cafe-a-frame-signs/", text: "Café A-frame signs" },
      { href: "/shop-window-wall-signs/", text: "Shop window and wall signs" },
      { href: "/a-frames/", text: "All A-frame signs and prices" },
      { href: "/acm-signs/", text: "ACM signs" },
    ],
  },
  {
    slug: "tradies",
    href: "/tradies/",
    icon: "tradies",
    label: "Tradies",
    eyebrow: "Signs and clothing for tradies",
    heading: "Car magnets, site signs and workwear with your name on them",
    title: "Signs and Clothing for Tradies | The Signage Shed",
    description: `Car magnets, corflute, ACM, banners and printed tees, hoodies and caps for tradies. Clothing from $${FROM_EACH_IN_TENS} each in 10s, delivered Australia-wide.`,
    intro: "Put your name on the vehicle, the site and the team. We print car magnets, corflute and ACM signs, banners, and tees, hoodies and caps, and we deliver Australia-wide.",
    lead: `Printed clothing from $${FROM_EACH_IN_TENS} each in 10s.`,
    offerPrice: FROM_EACH_IN_TENS,
    offerPerM2: false,
    image: CAR_MAGNETS.hero,
    products: [magnets, corflute, acm, banners, clothing],
    related: [
      { href: "/car-magnets/", text: "Car magnets" },
      { href: "/corflute-signs/", text: "Corflute signs" },
      { href: "/clothing/", text: "Printed clothing" },
    ],
  },
  {
    slug: "markets-and-stalls",
    href: "/markets-and-stalls/",
    icon: "markets",
    label: "Markets & stalls",
    eyebrow: "Gear for markets and stalls",
    heading: "Umbrellas, flags, table covers and a board for the aisle",
    title: "Market Stall Signs and Gear | The Signage Shed",
    description: `Market umbrellas, teardrop flags, table covers, A-frames and banners for market stalls. A-frames from $${AF.FROM_PRICE}, delivered Australia-wide.`,
    intro: "A stall needs to be seen from down the aisle: a printed umbrella or flag, a covered table, and a board with your name on it. We print the gear and deliver it Australia-wide. You set it up.",
    lead: `A-frame signs from $${AF.FROM_PRICE}.`,
    offerPrice: AF.FROM_PRICE,
    offerPerM2: false,
    image: UMBRELLAS.hero,
    products: [umbrellas, flags, covers, aFrames, banners, chairs],
    related: [
      { href: "/market-umbrellas/", text: "Market umbrellas" },
      { href: "/flags/", text: "Teardrop and feather flags" },
      { href: "/table-covers/", text: "Table covers and runners" },
      { href: "/event-signage-australia/", text: "Event signage" },
    ],
  },
  {
    slug: "clubs-and-teams",
    href: "/clubs-and-teams/",
    icon: "clubs",
    label: "Clubs & teams",
    eyebrow: "Clothing and signs for clubs and teams",
    heading: "Team clothing, sponsor banners and flags",
    title: "Clothing and Signs for Clubs and Teams | The Signage Shed",
    description: `Printed tees, hoodies, caps and totes, plus sponsor banners and flags for clubs and teams. Clothing from $${FROM_EACH_IN_TENS} each in 10s, delivered Australia-wide.`,
    intro: "Kit the team and mark the ground. We print tees, hoodies, caps and totes, sponsor banners and flags, and we deliver Australia-wide.",
    lead: `Printed clothing from $${FROM_EACH_IN_TENS} each in 10s.`,
    offerPrice: FROM_EACH_IN_TENS,
    offerPerM2: false,
    image: MOCKUPS.v4ClothingTee,
    products: [clothing, sponsorPacks, banners, flags, chairs, arches],
    related: [
      { href: "/clothing/", text: "Printed clothing" },
      { href: "/packs/", text: "Sponsor banner packs" },
      { href: "/school-and-sports-club-signs/", text: "School and sports club signs" },
      { href: "/flags/", text: "Teardrop and feather flags" },
    ],
  },
];

export const INDUSTRY_HUBS = INDUSTRIES.filter((i) => !i.existing);

export const NOTES = [
  "Prices include everything except delivery.",
  MIN_NOTE,
  "We'll email you a quote with freight included.",
  "We print and deliver. We do not install, and we do not visit.",
];
