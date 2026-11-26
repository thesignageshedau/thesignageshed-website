import * as CF from "../data/corfluteSigns";
import * as AF from "../data/aFrames";
import { ACM_SIGNS, FLAGS, RECTANGLE_FLAGS, STRETCH_FABRIC, TABLE_TOP_BANNERS, fromPrice, type GearProduct } from "../data/eventGear";
import { LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS, PRINTED_VINYL, POSTERS, FOAM_PVC, WINDOW_CLINGS, X_BANNERS, FABRIC_CUBES, PRINTED_CHAIRS, ARCH_BANNERS } from "../data/newProducts";
import { FROM_PER_M2 } from "../data/customSize";
import { OG_IMAGES } from "../data/ogImages";

export const SEO_SLUGS = ["corflute-signs", "a-frames", "flags", "stretch-fabric-displays", "table-top-banners", "acm-signs", "rectangle-flags", "lightbox-displays", "big-head-cutouts", "seg-fabric-frames", "crowd-barriers", "selfie-frames", "car-magnets", "business-cards", "printed-vinyl", "posters", "foam-pvc-signs", "window-clings", "x-banner-stands", "fabric-display-cubes", "printed-chairs", "arch-banners"] as const;
type Slug = (typeof SEO_SLUGS)[number];
const gearPrices = (g: GearProduct) => g.items.flatMap((i) => [i.price[0]!, ...(i.priceWithAddon ? [i.priceWithAddon[0]!] : [])]);
const SITE = "https://thesignageshed.au";

/** Visible "From $X per m²" headlines, used in Product offers so markup matches the page. */
const PER_M2_FROM: Partial<Record<Slug, number>> = {
  "corflute-signs": FROM_PER_M2["corflute-5mm-single"],
  "acm-signs": FROM_PER_M2["acm-single"],
  "printed-vinyl": FROM_PER_M2.sav,
};

const HERO_FALLBACK: Partial<Record<Slug, { slug: string }>> = {
  "lightbox-displays": LIGHTBOX.hero,
  "big-head-cutouts": BIG_HEADS.hero,
  "seg-fabric-frames": SEG_AFRAMES.hero,
  "crowd-barriers": BARRIERS.hero,
  "selfie-frames": SELFIE_FRAMES.hero,
  "car-magnets": CAR_MAGNETS.hero,
  "business-cards": BUSINESS_CARDS.hero,
  "printed-vinyl": PRINTED_VINYL.hero,
  "posters": POSTERS.hero,
  "foam-pvc-signs": FOAM_PVC.hero,
  "window-clings": WINDOW_CLINGS.hero,
  "x-banner-stands": X_BANNERS.hero,
  "fabric-display-cubes": FABRIC_CUBES.hero,
  "printed-chairs": PRINTED_CHAIRS.hero,
  "arch-banners": ARCH_BANNERS.hero,
};

function productImage(slug: Slug): string {
  if (slug in OG_IMAGES) return `${SITE}/og/${slug}.jpg`;
  const hero = HERO_FALLBACK[slug];
  if (hero) return `${SITE}/images/mockups/${hero.slug}-800.jpg`;
  return `${SITE}/og-image.jpg`;
}

/** Per-m² starting rate. Price lives only in priceSpecification so Google keeps the unit (1 m²). */
function perM2Offer(pricePerM2: number, url: string) {
  const qty = {
    "@type": "QuantitativeValue",
    value: 1,
    unitCode: "MTK",
    unitText: "sqm",
  };
  return {
    "@type": "Offer",
    priceCurrency: "AUD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: pricePerM2,
      priceCurrency: "AUD",
      referenceQuantity: { ...qty, valueReference: { ...qty } },
    },
    availability: "https://schema.org/InStock",
    url,
    seller: { "@type": "Organization", name: "The Signage Shed" },
  };
}

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
  "seg-fabric-frames": gearPrices(SEG_AFRAMES),
  "crowd-barriers": gearPrices(BARRIERS),
  "selfie-frames": gearPrices(SELFIE_FRAMES),
  "car-magnets": gearPrices(CAR_MAGNETS),
  "business-cards": gearPrices(BUSINESS_CARDS),
  "printed-vinyl": [fromPrice(PRINTED_VINYL)],
  "posters": gearPrices(POSTERS),
  "foam-pvc-signs": gearPrices(FOAM_PVC),
  "window-clings": gearPrices(WINDOW_CLINGS),
  "x-banner-stands": gearPrices(X_BANNERS),
  "fabric-display-cubes": gearPrices(FABRIC_CUBES),
  "printed-chairs": gearPrices(PRINTED_CHAIRS),
  "arch-banners": gearPrices(ARCH_BANNERS),
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
  "seg-fabric-frames": { name: "Free-standing SEG fabric frames", description: SEG_AFRAMES.description },
  "crowd-barriers": { name: "Printed barrier frames and crowd control barrier covers", description: BARRIERS.description },
  "selfie-frames": { name: "Custom printed selfie frames", description: SELFIE_FRAMES.description },
  "car-magnets": { name: "Custom printed car magnets", description: CAR_MAGNETS.description },
  "business-cards": { name: "Premium and luxury business cards", description: BUSINESS_CARDS.description },
  "posters": { name: "Custom printed posters", description: POSTERS.description },
  "foam-pvc-signs": { name: "Foam PVC signs and counter cards", description: FOAM_PVC.description },
  "window-clings": { name: "Printed removable window clings", description: WINDOW_CLINGS.description },
  "x-banner-stands": { name: "X-banner stands with printed banner", description: X_BANNERS.description },
  "fabric-display-cubes": { name: "Printed fabric display cubes", description: FABRIC_CUBES.description },
  "printed-chairs": { name: "Printed director's chairs and deck chairs", description: PRINTED_CHAIRS.description },
  "arch-banners": { name: "Printed walk-through arch banners", description: ARCH_BANNERS.description },
  "printed-vinyl": { name: "Printed self-adhesive vinyl stickers and decals", description: PRINTED_VINYL.description },
};

const RELATED: Record<Slug, { href: string; text: string }[]> = {
  "corflute-signs": [
    { href: "/corflute-signs-australia/", text: "Custom corflute signs" },
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/flags/", text: "Teardrop and feather flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  "a-frames": [
    { href: "/cafe-a-frame-signs/", text: "Café A-frame signs" },
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/flags/", text: "Teardrop and feather flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  flags: [
    { href: "/school-and-sports-club-signs/", text: "School and sports club signs" },
    { href: "/event-signage-australia/", text: "Event signage" },
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
    { href: "/flags/", text: "Teardrop and feather flags" },
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
    { href: "/flags/", text: "Teardrop and feather flags" },
  ],
  "seg-fabric-frames": [
    { href: "/school-and-sports-club-signs/", text: "School and sports club signs" },
    { href: "/crowd-barriers/", text: "Crowd barrier frames and covers" },
    { href: "/corflute-event-signs/", text: "Corflute event signs" },
    { href: "/flags/", text: "Teardrop and feather flags" },
    { href: "/banners/", text: "Vinyl and mesh banners" },
  ],
  "crowd-barriers": [
    { href: "/school-and-sports-club-signs/", text: "School and sports club signs" },
    { href: "/event-signage-australia/", text: "Event signage" },
    { href: "/seg-fabric-frames/", text: "SEG fabric frames" },
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
  "printed-vinyl": [
    { href: "/banners/", text: "Vinyl and mesh banners" },
    { href: "/acm-signs/", text: "ACM signs" },
    { href: "/car-magnets/", text: "Car magnets" },
  ],
  "posters": [
    { href: "/foam-pvc-signs/", text: "Foam PVC signs and counter cards" },
    { href: "/window-clings/", text: "Window clings" },
    { href: "/a-frames/", text: "A-frame signs" },
  ],
  "foam-pvc-signs": [
    { href: "/posters/", text: "Posters" },
    { href: "/acm-signs/", text: "ACM signs" },
    { href: "/window-clings/", text: "Window clings" },
  ],
  "window-clings": [
    { href: "/printed-vinyl/", text: "Printed vinyl stickers" },
    { href: "/posters/", text: "Posters" },
    { href: "/a-frames/", text: "A-frame signs" },
  ],
  "x-banner-stands": [
    { href: "/pull-up-banners/", text: "Pull up banners" },
    { href: "/stretch-fabric-displays/", text: "Stretch fabric displays" },
    { href: "/table-covers/", text: "Table covers" },
  ],
  "fabric-display-cubes": [
    { href: "/media-walls/", text: "Media walls" },
    { href: "/x-banner-stands/", text: "X-banner stands" },
    { href: "/table-covers/", text: "Table covers" },
  ],
  "printed-chairs": [
    { href: "/gazebos/", text: "Gazebos" },
    { href: "/flags/", text: "Teardrop and feather flags" },
    { href: "/clothing/", text: "Printed clothing" },
  ],
  "arch-banners": [
    { href: "/flags/", text: "Teardrop and feather flags" },
    { href: "/crowd-barriers/", text: "Crowd barrier frames and covers" },
    { href: "/banners/", text: "Vinyl and mesh banners" },
  ],
};

/** Product/AggregateOffer JSON-LD (prices from the site's price data) plus related product links. */
export default function ProductSeo({ slug }: { slug: Slug }) {
  const p = prices[slug];
  const i = INFO[slug];
  const url = `${SITE}/${slug}/`;
  const perM2 = PER_M2_FROM[slug];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: i.name,
    description: i.description,
    image: productImage(slug),
    url,
    brand: { "@type": "Brand", name: "The Signage Shed" },
    offers:
      perM2 != null
        ? perM2Offer(perM2, url)
        : {
            "@type": "AggregateOffer",
            priceCurrency: "AUD",
            lowPrice: Math.min(...p),
            highPrice: Math.max(...p),
            offerCount: p.length,
            availability: "https://schema.org/InStock",
            url,
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
