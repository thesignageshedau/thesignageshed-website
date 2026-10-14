import MockupImage from "./MockupImage";
import { MOCKUPS, type Mockup } from "../data/mockups";
import * as MW from "../data/mediaWalls";
import * as TC from "../data/tableCovers";
import * as PB from "../data/pullUpBanners";
import * as CF from "../data/corfluteSigns";
import * as AF from "../data/aFrames";
import { BANNERS, FLAGS, GAZEBOS, UMBRELLAS, fromPrice } from "../data/eventGear";

const items: { href: string; name: string; from: number; img: Mockup }[] = [
  { href: "/media-walls/", name: "Media walls", from: MW.FROM_PRICE, img: MOCKUPS.v4MediaWall },
  { href: "/pull-up-banners/", name: "Pull up banners", from: PB.FROM_PRICE, img: MOCKUPS.v4PullUp },
  { href: "/corflute-signs/", name: "Corflute signs", from: CF.FROM_PRICE, img: MOCKUPS.v4Corflute },
  { href: "/table-covers/", name: "Table covers", from: TC.FROM_PRICE, img: MOCKUPS.v4TableCover },
  { href: "/a-frames/", name: "A-frames", from: AF.FROM_PRICE, img: MOCKUPS.v4AFrames },
  { href: "/banners/", name: "Vinyl and mesh banners", from: fromPrice(BANNERS), img: BANNERS.hero },
  { href: "/gazebos/", name: "Gazebos", from: fromPrice(GAZEBOS), img: GAZEBOS.hero },
  { href: "/flags/", name: "Teardrop and feather flags", from: fromPrice(FLAGS), img: FLAGS.hero },
  { href: "/market-umbrellas/", name: "Market umbrellas", from: fromPrice(UMBRELLAS), img: UMBRELLAS.hero },
];
const money = (n: number) => `$${n.toLocaleString("en-AU", { maximumFractionDigits: 2 })}`;

/** Phone home page: every product as a compact card (photo, name, from price) instead of the long teasers. */
export default function ProductGrid() {
  return (
    <section aria-labelledby="grid-heading" className="py-10 md:hidden">
      <div className="px-4">
        <h2 id="grid-heading" className="text-3xl">Our signage</h2>
        <p className="mt-1 text-sm text-charcoal/80">Tap a product for sizes, prices and a quote.</p>
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="block h-full overflow-hidden rounded-xl border-2 border-charcoal/15 bg-white hover:border-rust">
                <MockupImage mockup={it.img} sizes="45vw" className="aspect-[4/3] w-full object-cover" />
                <span className="block px-3 pt-2 font-slab text-base font-bold leading-tight">{it.name}</span>
                <span className="mx-3 mb-3 mt-1.5 inline-block rounded-full bg-sage-light px-2.5 py-0.5 text-sm font-semibold text-sage-dark">From {money(it.from)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
