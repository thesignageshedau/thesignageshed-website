import { FREE_DEMO, FREE_SAMPLE_URL, SHOW_DEMOS } from "../data/products";
import { asset, srcSet } from "../lib/asset";
import DemoVideo from "./DemoVideo";

const points = [
  "Corflute, ACM, banner and vinyl decals set up, plus spare rows for your own materials",
  "Material, print, labour and markup worked out for each line",
  "Sell price ex GST, GST, total inc GST, profit and margin",
];

// Hidden until FREE_SAMPLE_URL (src/data/products.ts) has the Gumroad link.
export default function FreeSample() {
  if (!FREE_SAMPLE_URL) return null;
  return (
    <section id="free" aria-labelledby="free-heading" className="scroll-mt-20 bg-cream-light pb-16 sm:pb-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border-4 border-charcoal bg-cream shadow-md">
          <div aria-hidden className="pointer-events-none absolute inset-2 rounded-xl border-2 border-rust/70" />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1fr_1.05fr] md:gap-10">
            {SHOW_DEMOS ? (
              <DemoVideo
                name={FREE_DEMO.name}
                label={FREE_DEMO.label}
                className="order-last aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-charcoal/20 bg-white shadow-lg md:order-first"
              />
            ) : (
              <img
                src={asset("images/free-sample-800.webp")}
                srcSet={srcSet("free-sample")}
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 90vw"
                width={800}
                height={524}
                loading="lazy"
                decoding="async"
                alt="The free Sign Shop Quick Pricing Sheet open on a laptop"
                className="order-last h-auto w-full md:order-first"
              />
            )}
            <div>
              <span className="inline-block rounded bg-rust-dark px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-white">
                Free download
              </span>
              <h2 id="free-heading" className="mt-4 text-3xl sm:text-4xl">
                Free quick pricing sheet
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                Price everyday sign jobs from your own material costs, labour rate and markup. It's a cut-down version
                of our Sign Shop Pricing Kit, and it's yours free.
              </p>
              <ul className="mt-5 space-y-2">
                {points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rust" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={FREE_SAMPLE_URL} className="btn-rust" target="_blank" rel="noopener" data-track="free-sample-gumroad">
                  Get the free sheet
                </a>
                <span className="text-sm font-semibold text-charcoal/80">Excel &amp; Google Sheets · AU GST</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
                It's a $0 download on Gumroad: enter your email and the file comes straight to you. We'll send the odd
                email with new templates and deals, and you can unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
