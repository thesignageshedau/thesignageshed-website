import IndustryIcon from "./IndustryIcons";
import MuchMore from "./MuchMore";
import { INDUSTRIES, SHOP_BY_LABEL } from "../data/industries";

/** Compact homepage row of shop-by-use links, with simple line icons. */
export default function IndustryTiles() {
  return (
    <section aria-labelledby="shop-by-heading" className="bg-cream py-10 sm:py-12">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id="shop-by-heading" className="text-3xl sm:text-4xl">
          {SHOP_BY_LABEL}
        </h2>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed">
          Start with the kind of work you do. Each page lists the products that fit, with prices.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="flex h-full flex-col items-start gap-3 rounded-xl border-2 border-charcoal/15 bg-white px-4 py-4 hover:border-rust"
              >
                <span className="text-rust">
                  <IndustryIcon id={i.icon} className="h-8 w-8" />
                </span>
                <span className="font-slab text-base font-bold leading-tight">{i.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <MuchMore />
      </div>
    </section>
  );
}
