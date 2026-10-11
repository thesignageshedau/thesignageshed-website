import { etsyItems, SHOP, SHOW_ETSY_PACKS } from "../data/products";
import { asset, srcSet } from "../lib/asset";

export default function EtsyShop() {
  // Hidden for now: switch on with SHOW_ETSY_PACKS in the products data file.
  if (!SHOW_ETSY_PACKS) return null;
  return (
    <section id="etsy" className="scroll-mt-20 border-y border-charcoal/10 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="rule mb-4" />
            <h2 className="text-3xl sm:text-4xl">More in our Etsy shop</h2>
            <p className="mt-3 max-w-2xl text-lg">
              Print-ready sign templates and seasonal window graphics packs, made for vinyl cutters and print-and-cut setups.
            </p>
          </div>
          <a href={SHOP.etsy} className="btn-rust" target="_blank" rel="noopener" data-track="etsy-shop-packs">Browse the Etsy shop</a>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {etsyItems.map((item) => (
            <li key={item.id}>
              <a href={SHOP.etsy} target="_blank" rel="noopener" data-track={`view-etsy-${item.id}`}
                className="group block h-full overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden bg-charcoal/5">
                  <img src={asset(`images/${item.image}-800.webp`)} srcSet={srcSet(item.image)}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                    width={800} height={600} loading="lazy" decoding="async" alt={item.imageAlt}
                    className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-slab text-lg font-bold leading-snug">{item.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/85">{item.blurb}</p>
                  <p className="mt-3 font-semibold text-rust-dark group-hover:underline">Find it on Etsy</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
