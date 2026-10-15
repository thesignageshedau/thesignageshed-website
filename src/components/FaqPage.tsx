import FaqSchema from "./FaqSchema";
import { HelpCta, HelpFaq, HelpHero, helpLink } from "./HelpParts";
import { CHECK_ARTWORK_HREF } from "../lib/routes";

const faqs = [
  { q: "How do I get a quote?", a: <>Fill in our <a className={helpLink} href="/quote/">quote form</a> and we'll email you a quote that includes freight.</> },
  { q: "Are your prices in Australian dollars?", a: <>Yes. All prices are in AUD, and the price shown is what you pay.</> },
  { q: "Is there a minimum order?", a: <>Yes. The minimum order is $180 per product. Products can't be combined to reach it, so each product in your order needs to be at least $180.</> },
  { q: "How long until my order is dispatched?", a: <>We dispatch within 3 days of artwork approval, depending on the size of your order.</> },
  { q: "How much is freight?", a: <>Freight depends on the size and weight of the product, and it's included on your quote. See <a className={helpLink} href="/delivery/">how delivery works</a>.</> },
  { q: "When do I pay?", a: <>Payment is due once your artwork is approved.</> },
  { q: "Can you help with my artwork?", a: <>Yes. We charge a flat $150 to help with your artwork. If you need a full design from scratch, it's $599, including 2 revisions.</> },
  { q: "What file types do you accept?", a: <>A print-ready PDF is best, with fonts outlined or embedded. We also take AI and EPS files with fonts outlined, and high resolution JPG, PNG or TIFF files at full size. Supply CMYK with bleed. Our <a className={helpLink} href="/artwork-help/">artwork help page</a> covers bleed, resolution and colour, and you can check a PDF, JPG or PNG with our free <a className={helpLink} href={CHECK_ARTWORK_HREF}>artwork checker</a>.</> },
  { q: "Can I order a sample?", a: <>Yes. Samples are available with the same $180 minimum, plus freight.</> },
];

export default function FaqPage() {
  return (
    <>
      <HelpHero eyebrow="Questions" title="Common questions">
        <p>Quick answers on quotes, minimums, artwork, payment and freight. Tap a question to see the answer.</p>
      </HelpHero>
      <HelpFaq faqs={faqs} />
      <FaqSchema page="faq" />
      <HelpCta title="Ready for a price?">
        <a href="/quote/" className="btn-rust" data-track="faq-quote">Get a quote</a>
        <a href="/artwork-help/" className="btn-ghost-light">Artwork help</a>
      </HelpCta>
    </>
  );
}
