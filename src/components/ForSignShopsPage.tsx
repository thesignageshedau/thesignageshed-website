import Products from "./Products";
import FreeSample from "./FreeSample";
import EtsyShop from "./EtsyShop";
import WhyUs from "./WhyUs";
import Faq from "./Faq";
import { homeSection } from "../lib/routes";

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
      <Faq digital />
    </>
  );
}
