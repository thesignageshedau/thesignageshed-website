import MockupImage from "./MockupImage";
import MuchMore from "./MuchMore";
import TrustStrip from "./TrustStrip";
import { FaqList } from "./PriceParts";
import { QUOTE_EMAIL } from "../data/mediaWalls";
import { INDUSTRY_HUBS, NOTES, type Industry } from "../data/industries";
import { homeSection } from "../lib/routes";

const SITE = "https://thesignageshed.au";

function Hub({ industry: p }: { industry: Industry }) {
  const url = `${SITE}/${p.slug}/`;
  const image = `${SITE}/images/mockups/${p.image.slug}-800.jpg`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.heading,
    description: p.description,
    image,
    url,
    brand: { "@type": "Brand", name: "The Signage Shed" },
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: p.offerPrice,
      availability: "https://schema.org/InStock",
      url,
      seller: { "@type": "Organization", name: "The Signage Shed" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="relative mx-auto max-w-site px-4 py-14 sm:px-6 md:py-20">
          <a
            href={homeSection("top")}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
          >
            ← Back to The Signage Shed
          </a>
          <p className="eyebrow mt-8">{p.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">{p.heading}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">{p.intro}</p>
          <p className="mt-4 text-lg font-semibold text-cream">{p.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-rust">
              See products
            </a>
            <a href="/quote/" className="btn-ghost-light">
              Get a quote
            </a>
          </div>
        </div>
      </section>

      <section id="products" aria-labelledby={`${p.slug}-products`} className="scroll-mt-20 py-14 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id={`${p.slug}-products`} className="text-3xl sm:text-4xl">
            Products and prices
          </h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">
            These are the current From prices on each product page. Open a product for sizes, options and a quote.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.products.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-charcoal/15 bg-white hover:border-rust"
                >
                  <MockupImage mockup={item.img} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                  <span className="px-4 pt-3 font-slab text-xl font-bold leading-tight">{item.name}</span>
                  <span className="mx-4 mb-4 mt-2 inline-block w-fit rounded-full bg-sage-light px-2.5 py-0.5 text-sm font-semibold text-sage-dark">
                    {item.fromText}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <MuchMore />
          <div className="mt-8 flex max-w-3xl flex-col gap-1.5 text-sm leading-relaxed">
            {NOTES.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip tone="dark" />

      <section className="bg-cream" aria-labelledby={`${p.slug}-related`}>
        <div className="mx-auto max-w-site px-4 py-8 sm:px-6">
          <h2 id={`${p.slug}-related`} className="text-xl">
            Related pages
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {p.related.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-rust">
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="quote" aria-labelledby={`${p.slug}-quote`} className="scroll-mt-20 bg-cream py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 id={`${p.slug}-quote`} className="text-3xl sm:text-4xl">
            Get a price for your {p.label.toLowerCase()}
          </h2>
          <p className="mt-2 text-lg leading-relaxed">
            We email you a quote with freight included, usually within one business day. Add other products to the same request.
          </p>
          <a href="/quote/" className="btn-rust mt-6 inline-block" data-track={`${p.slug}-quote-cta`}>
            Get a quote
          </a>
        </div>
      </section>

      <FaqList
        id={`${p.slug}-faq`}
        title="Questions"
        email={QUOTE_EMAIL}
        faqs={[
          { q: "Can I mix products in one order?", a: "Yes. We'll email you one quote for everything, with freight included." },
          { q: "Do you install the signs?", a: "No. We print and deliver. You put the gear up yourself. We do not visit." },
          { q: "How much is delivery?", a: "Freight depends on the size and weight of the order. We quote it to your postcode and include it on your quote." },
        ]}
      />
    </>
  );
}

export default function IndustryPage({ slug }: { slug: string }) {
  const industry = INDUSTRY_HUBS.find((i) => i.slug === slug);
  if (!industry) return null;
  return <Hub industry={industry} />;
}
