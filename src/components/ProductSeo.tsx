import * as CF from "../data/corfluteSigns";
import * as AF from "../data/aFrames";
import { ACM_SIGNS, FLAGS, RECTANGLE_FLAGS, STRETCH_FABRIC, TABLE_TOP_BANNERS, type GearProduct } from "../data/eventGear";
import { LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS } from "../data/newProducts";

export const SEO_SLUGS = ["corflute-signs", "a-frames", "flags", "stretch-fabric-displays", "table-top-banners", "acm-signs", "rectangle-flags", "lightbox-displays", "big-head-cutouts", "expandable-seg-a-frames", "barrier-covers", "selfie-frames", "car-magnets", "business-cards"] as const;
type Slug = (typeof SEO_SLUGS)[number];
const gearPrices = (g: GearProduct) => g.items.flatMap((i) => [i.price[0]!, ...(i.priceWithAddon ? [i.priceWithAddon[0]!] : [])]);
const SITE = "https://thesignageshed.au";

const prices: Record<Slug, number[]> = {
  "corflute-signs": CF.SIZES.flatMap((s) => CF.THICKNESSES.flatMap((t) => [s.price[t.id].single.upTo5, s.price[t.id].double.upTo5])),
  "a-frames": AF.ITEMS.filter((i) => !i.replacement).map((i) => i.price[0]),
  flags: FLAGS.items.map((i) => i.price[0]),
  "stretch-fabric-displays": gearPrices(STRETCH_FABRIC),
  "table-top-banners": gearPrices(TABLE_TOP_BANNERS),
  "acm-signs": gearPrices(ACM_SIGNS),
  "rectangle-flags": gearPrices(RECTANGLE_FLAGS),
  "lightbox-displays": gearPrices(LIGHTBOX),
  "big-head-cutouts": gearPrices(BIG_HEADS),
  "expandable-seg-a-frames": gearPrices(SEG_AFRAMES),
  "barrier-covers": gearPrices(BARRIERS),
  "selfie-frames": gearPrices(SELFIE_FRAMES),
  "car-magnets": gearPrices(CAR_MAGNETS),
  "business-cards": gearPrices(BUSINESS_CARDS),
};

const INFO: Record<Slug, { name: string; description: string }> = {
  "corflute-signs": {
    name: "Custom printed corflute signs",
    description: "Corflute signs printed on premium Australian-made 5mm or 3mm corflute, in 600 × 450mm, 600 × 900mm and 900 × 1200mm, single or double sided, delivered Australia-wide.",
  },
  "a-frames": {
    name: "Custom printed A-frame signs",
    description: "Double sided A-frame signs (sandwich boards): printed aluminium, insert and folding corflute A-frames, delivered Australia-wide.",
  },
  flags: {
    name: "Custom printed teardrop and feather flags",
    description: "Teardrop flags (2.3m to 3.7m) and feather flags (2.4m to 4.0m) printed with your artwork, with pole set and 10kg heavy duty square base. Delivered Australia-wide.",
  },
  "stretch-fabric-displays": { name: "Stretch fabric display stands", description: STRETCH_FABRIC.description },
  "table-top-banners": { name: "Printed table-top banner kits", description: TABLE_TOP_BANNERS.description },
  "acm-signs": { name: "Printed ACM (aluminium composite) signs", description: ACM_SIGNS.description },
  "rectangle-flags": { name: "Custom printed rectangle flags", description: RECTANGLE_FLAGS.description },
  "lightbox-displays": { name: "Modular backlit SEG lightbox displays", description: LIGHTBOX.description },
  "big-head-cutouts": { name: "Custom printed big head cutouts", description: BIG_HEADS.description },
  "expandable-seg-a-frames": { name: "Expandable SEG fabric A-frames", description: SEG_AFRAMES.description },
  "barrier-covers": { name: "Printed barrier frames and crowd control barrier covers", description: BARRIERS.description },
  "selfie-frames": { name: "Custom printed selfie frames", description: SELFIE_FRAMES.description },
  "car-magnets": { name: "Custom printed car magnets", description: CAR_MAGNETS.description },
  "business-cards": { name: "Premium and luxury business cards", description: BUSINESS_CARDS.description },
};

const RELATED: Record<Slug, { href: string; text: string }[]> = {
  "corflute-signs": [
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  "a-frames": [
    { href: "/cafe-a-frame-signs/", text: "Café A-frame signs" },
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  flags: [
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/pull-up-banners/", text: "Pull up banners" },
    { href: "/rectangle-flags/", text: "Rectangle flags" },
  ],
  "stretch-fabric-displays": [
    { href: "/pull-up-banners/", text: "Pull up banners" },
    { href: "/media-walls/", text: "Media walls" },
    { href: "/table-top-banners/", text: "Table-top banners" },
  ],
  "table-top-banners": [
    { href: "/table-covers/", text: "Table covers" },
    { href: "/pull-up-banners/", text: "Pull up banners" },
    { href: "/stretch-fabric-displays/", text: "Stretch fabric displays" },
  ],
  "acm-signs": [
    { href: "/shop-window-wall-signs/", text: "Shop window and wall signs" },
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  "rectangle-flags": [
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/a-frames/", text: "A-frame signs" },
  ],
  "lightbox-displays": [
    { href: "/media-walls/", text: "Media walls" },
    { href: "/stretch-fabric-displays/", text: "Stretch fabric displays" },
    { href: "/pull-up-banners/", text: "Pull up banners" },
  ],
  "big-head-cutouts": [
    { href: "/selfie-frames/", text: "Selfie frames" },
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
  ],
  "expandable-seg-a-frames": [
    { href: "/barrier-covers/", text: "Barrier frames and covers" },
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/banners/", text: "Vinyl and mesh banners" },
  ],
  "barrier-covers": [
    { href: "/expandable-seg-a-frames/", text: "Expandable SEG A-frames" },
    { href: "/banners/", text: "Vinyl and mesh banners" },
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
  ],
  "selfie-frames": [
    { href: "/big-head-cutouts/", text: "Big head cutouts" },
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/media-walls/", text: "Media walls" },
  ],
  "car-magnets": [
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/business-cards/", text: "Business cards" },
    { href: "/a-frames/", text: "A-frame signs" },
  ],
  "business-cards": [
    { href: "/car-magnets/", text: "Car magnets" },
    { href: "/pull-up-banners/", text: "Pull up banners" },
    { href: "/a-frames/", text: "A-frame signs" },
  ],
};

/** Product/AggregateOffer JSON-LD (prices from the site's price data) plus related product links. */
export default function ProductSeo({ slug }: { slug: Slug }) {
  const p = prices[slug];
  const i = INFO[slug];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: i.name,
    description: i.description,
    image: `${SITE}/og/${slug}.jpg`,
    url: `${SITE}/${slug}/`,
    brand: { "@type": "Brand", name: "The Signage Shed" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: Math.min(...p),
      highPrice: Math.max(...p),
      offerCount: p.length,
      availability: "https://schema.org/InStock",
      url: `${SITE}/${slug}/`,
      seller: { "@type": "Organization", name: "The Signage Shed" },
    },
  };
  return (
    <section className="bg-cream" aria-labelledby={`${slug}-related`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-site px-4 py-8 sm:px-6">
        <h2 id={`${slug}-related`} className="text-xl">Related signage</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {RELATED[slug].map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">{l.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
