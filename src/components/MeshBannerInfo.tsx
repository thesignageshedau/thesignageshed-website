import { BANNERS, money } from "../data/eventGear";
import { quoteHref } from "../data/quoteProducts";

// /banners/ only: plain-English guide to mesh banners, with prices read from the BANNERS price table.
const mesh = BANNERS.items.filter((i) => i.group === "mesh");
// First quantity band where the item reaches its lowest price each.
const low = (p: number[]) => p.indexOf(Math.min(...p));
const from = (n: number) => `${BANNERS.bands[n]!.min}+`;

export default function MeshBannerInfo() {
  return (
    <section id="mesh-banners" aria-labelledby="mesh-heading" className="scroll-mt-20 py-14 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id="mesh-heading" className="text-3xl sm:text-4xl">Printed mesh banners</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Banner mesh is a printed material full of tiny holes. Wind passes straight through, so the banner
              doesn't act like a sail. That means less strain on the banner, the eyelets and whatever it's tied to.
            </p>
            <p>
              Choose mesh for fences, scaffolding and outdoor events, or anywhere the weather can turn. From a
              few metres away the print reads as a solid image.
            </p>
            <p>
              We print mesh vinyl with welded edges and eyelets. Want something lighter that folds away for reuse? Our{" "}
              <strong>fabric banners</strong> are printed polyester fabric with hemmed edges and stainless steel eyelets,
              priced in the table above.
            </p>
          </div>
          <div>
            <h3 className="font-slab text-xl font-bold">Common mesh sizes</h3>
            <ul className="mt-3 divide-y divide-charcoal/10 rounded-xl border-2 border-charcoal/15 bg-white">
              {mesh.map((i) => (
                <li key={i.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                  <span className="font-semibold">Mesh vinyl {i.short}</span>
                  <span className="text-sm">
                    {money(i.price[0]!)} for 1, down to {money(i.price[low(i.price)]!)} each for {from(low(i.price))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              Minimum order $180 for the whole order, and you can mix products. Need another size? Tell us the width
              and height in the{" "}
              <a href={quoteHref("banners")} className="font-semibold underline underline-offset-4 hover:text-rust">quote form</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
