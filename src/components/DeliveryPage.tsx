import MockupImage from "./MockupImage";
import { MOCKUPS } from "../data/mockups";
import FaqSchema from "./FaqSchema";
import { HelpCta, HelpFaq, HelpHero, HelpSection } from "./HelpParts";

const faqs = [
  { q: "Do you deliver Australia-wide?", a: <>Yes. We deliver to addresses all over Australia.</> },
  { q: "How much is delivery?", a: <>Freight depends on the product's size and weight. We quote it to your postcode and include it on your quote. You see it before you pay.</> },
  { q: "How long does delivery take?", a: <>We dispatch within 3 days of artwork approval, depending on order size. Typical transit times vary by carrier and location, and we confirm them in your quote.</> },
  { q: "Can I pick up my order?", a: <>No, we don't offer pick up. Every order is delivered to the address you give us.</> },
  { q: "Do you install signs?", a: <>No. We print and deliver, and everything arrives ready to put up yourself.</> },
];

export default function DeliveryPage() {
  return (
    <>
      <HelpHero eyebrow="Delivery" title="How delivery works">
        <p>We print your signage and send it to you, anywhere in Australia. Delivery is quoted with your order, so you know the full cost before you pay.</p>
      </HelpHero>

      <div className="mx-auto max-w-site px-4 pt-10 sm:px-6">
        <figure className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
          <MockupImage mockup={MOCKUPS.v4Gazebo} sizes="(min-width: 1152px) 1120px, calc(100vw - 32px)" className="aspect-[16/7] w-full object-cover" />
        </figure>
      </div>

      <HelpSection id="cost" title="What delivery costs">
        <p>Freight depends on the product's size and weight, and it's included on your quote. We work it out from:</p>
        <ul>
          <li>your delivery postcode</li>
          <li>the size of the product</li>
          <li>its weight</li>
        </ul>
        <p>The freight cost is in your quote, and you see it before you pay anything. Typical transit times vary by carrier and location, so we confirm them in your quote too.</p>
        <p>Need it by a certain date? Put it in the <em>Notes</em> box on the quote form and we'll tell you if it's tight.</p>
      </HelpSection>


      <HelpSection id="no-pickup" title="Pick up and installation">
        <p>We don't offer pick up in person. Every order is delivered to the address you give us.</p>
        <p>We don't install. Everything arrives ready for you to put up yourself, with the fittings listed on each product page.</p>
      </HelpSection>


      <HelpFaq faqs={faqs} />
      <FaqSchema page="delivery" />

      <HelpCta title="Get a delivered price">
        <a href="/quote/" className="btn-rust" data-track="delivery-quote">Get a quote</a>
        <a href="/artwork-help/" className="btn-ghost-light">Artwork help</a>
      </HelpCta>
    </>
  );
}
