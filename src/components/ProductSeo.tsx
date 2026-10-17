import * as CF from "../data/corfluteSigns";
import * as AF from "../data/aFrames";
import { FLAGS } from "../data/eventGear";

type Slug = "corflute-signs" | "a-frames" | "flags";
const SITE = "https://thesignageshed.au";

const prices: Record<Slug, number[]> = {
  "corflute-signs": CF.SIZES.flatMap((s) => CF.THICKNESSES.flatMap((t) => [s.price[t.id].single.upTo5, s.price[t.id].double.upTo5])),
  "a-frames": AF.ITEMS.filter((i) => !i.replacement).map((i) => i.price[0]),
  flags: FLAGS.items.map((i) => i.price[0]),
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
    description: "Medium teardrop (2.7m) and feather (3.0m) flags printed with your artwork, with pole set and 10kg heavy duty square base, delivered Australia-wide.",
  },
};

const RELATED: Record<Slug, { href: string; text: string }[]> = {
  "corflute-signs": [
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  "a-frames": [
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/flags/", text: "Feather and teardrop flags" },
    { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" },
  ],
  flags: [
    { href: "/corflute-signs/", text: "Corflute signs" },
    { href: "/a-frames/", text: "A-frame signs" },
    { href: "/pull-up-banners/", text: "Pull up banners" },
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
