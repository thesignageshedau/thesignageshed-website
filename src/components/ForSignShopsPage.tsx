import Products from "./Products";
import FreeSample from "./FreeSample";
import EtsyShop from "./EtsyShop";
import WhyUs from "./WhyUs";
import Faq from "./Faq";
import { homeSection } from "../lib/routes";
import { SHOP } from "../data/products";

const tools = [
  { href: SHOP.etsy, label: "Etsy shop", text: "Our sign templates and spreadsheets on Etsy.", track: "signshops-tools-etsy" },
  { href: "https://thesignageshedau.gumroad.com/l/ylljx", label: "AI Prompt Pack", text: "40 AI prompts we wrote for small sign and print shops.", track: "signshops-tools-prompts" },
  { href: "https://thesignageshedau.gumroad.com/l/xglczm", label: "Yield Calculator", text: "Work out how many signs you get from a sheet or roll.", track: "signshops-tools-yield" },
  { href: "https://thesignageshedau.gumroad.com/l/rrqofd", label: "Starter Kit bundle", text: "The Yield Calculator and AI Prompt Pack together.", track: "signshops-tools-bundle" },
];

const elsewhere = [
  { href: SHOP.gumroad, label: "Gumroad store", text: "All our spreadsheets, with instant download.", track: "signshops-gumroad" },
  { href: SHOP.etsy, label: "Etsy shop", text: "Selected spreadsheets and kits on Etsy.", track: "signshops-etsy" },
  { href: SHOP.youtube, label: "Shed Talk on YouTube", text: "Short updates on markets, the economy and small business, plus quick pricing tips.", track: "signshops-youtube" },
  { href: SHOP.instagram, label: "Instagram", text: "Sign templates and pricing tools at @thesignageshedau.", track: "signshops-instagram" },
];

/** Digital products for other sign shops: pricing spreadsheets, the free sheet and template packs. */
export default function ForSignShopsPage() {
  return (
    <>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-site px-4 py-12 sm:px-6 md:py-16">
          <a
            href={homeSection("top")}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-white"
          >
            ← Back to The Signage Shed
          </a>
          <p className="eyebrow mt-6">For sign shops and signwriters</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Pricing spreadsheets for sign shops</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">
            Quoting, pricing and job costing spreadsheets built around how sign jobs are actually made, with Australian GST
            built in. Instant download, and they work in Excel and Google Sheets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-rust">
              See the spreadsheets
            </a>
            <a href="#free" className="btn-ghost-light">
              Get the free pricing sheet
            </a>
          </div>
        </div>
      </section>
      <Products />
      <FreeSample />
      <EtsyShop />
      <WhyUs />
      <section id="tools" aria-labelledby="tools-heading" className="scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="tools-heading" className="text-3xl sm:text-4xl">Tools for sign shops</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  data-track={l.track}
                  aria-label={`${l.label} (opens in a new tab)`}
                  className="block h-full rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm hover:border-rust"
                >
                  <span className="font-slab text-xl font-bold text-rust-dark">{l.label} ↗</span>
                  <span className="mt-1 block text-charcoal/80">{l.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="elsewhere-heading" className="py-14 sm:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="elsewhere-heading" className="text-3xl sm:text-4xl">Find us elsewhere</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {elsewhere.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  data-track={l.track}
                  aria-label={`${l.label} (opens in a new tab)`}
                  className="block h-full rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm hover:border-rust"
                >
                  <span className="font-slab text-xl font-bold text-rust-dark">{l.label} ↗</span>
                  <span className="mt-1 block text-charcoal/80">{l.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Faq digital />
    </>
  );
}
