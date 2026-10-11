import { featured, SHOP, SHOW_DEMOS, type Product } from "../data/products";
import { promoActive } from "../lib/promo";
import { srcSet, asset } from "../lib/asset";
import DemoVideo from "./DemoVideo";

function ProductCard({ p, showPromo }: { p: Product; showPromo: boolean }) {
  const promo = showPromo ? p.promo : undefined;
  const demo = SHOW_DEMOS ? p.demo : undefined;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-cream">
        {demo ? (
          <DemoVideo name={demo.name} label={demo.label} className="h-full w-full" />
        ) : (
          <img
            src={asset(`images/${p.image}-800.webp`)}
            srcSet={srcSet(p.image)}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            width={800} height={600}
            loading="lazy" decoding="async"
            alt={p.imageAlt}
            className="h-full w-full object-cover"
          />
        )}
        {!demo && promo && (
          <span className="absolute left-3 top-3 rounded bg-rust-dark px-3 py-1 text-sm font-bold text-white shadow">
            {promo.label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {demo && promo && (
          <span className="mb-3 self-start rounded bg-rust-dark px-3 py-1 text-sm font-bold text-white">{promo.label}</span>
        )}
        <h3 className="text-xl leading-snug">{p.name}</h3>
        <p className="mt-1 text-lg font-bold text-rust-dark">
          {p.price} <span className="text-sm font-normal text-charcoal/70">instant download</span>
        </p>
        <p className="mt-3 leading-relaxed">{p.summary}</p>
        <ul className="mt-4 space-y-2 text-[0.95rem]">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2">
              <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rust" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-6 [&>a]:flex-1 [&>a]:whitespace-nowrap mt-auto">
          {p.gumroad && (
            <a href={promo ? promo.url : p.gumroad} className="btn-rust" target="_blank" rel="noopener" data-track={`buy-gumroad-${p.id}`}>
              {promo ? `Buy with ${promo.code}` : "Buy on Gumroad"}
            </a>
          )}
          {p.etsy && (
            <a href={p.etsy} className="btn-outline" target="_blank" rel="noopener" data-track={`view-etsy-${p.id}`}>View on Etsy</a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const showPromo = promoActive();
  return (
    <section id="products" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 className="text-3xl sm:text-4xl">Featured products</h2>
        <p className="mt-3 max-w-2xl text-lg">
          Spreadsheets that do the maths for you, built around how sign jobs are actually priced.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} p={p} showPromo={showPromo} />)}
        </div>
        <p className="mt-8 text-center">
          <a href={SHOP.gumroad} className="font-semibold text-rust-dark underline decoration-2 underline-offset-4 hover:text-rust-deeper"
            target="_blank" rel="noopener" data-track="gumroad-store">See everything in our Gumroad store</a>
        </p>
      </div>
    </section>
  );
}
