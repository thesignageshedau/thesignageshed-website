import FaqSchema from "./FaqSchema";
import { HelpCta, HelpFaq, HelpHero, HelpSection } from "./HelpParts";

const faqs = [
  { q: "Do you deliver Australia-wide?", a: <>Yes. We deliver to addresses all over Australia.</> },
  { q: "How much is delivery?", a: <>Delivery is quoted separately, based on your postcode and the size and weight of your order. The freight cost is in your quote, so you see it before you pay.</> },
  { q: "How long does delivery take?", a: <>Orders are usually dispatched within a few business days of artwork approval. Typical transit times vary by carrier and location, and we confirm them in your quote.</> },
  { q: "Can I pick up my order?", a: <>No, we don't offer pick up. Every order is delivered to the address you give us.</> },
  { q: "Do you install signs?", a: <>No. We print and deliver, and everything arrives ready to put up yourself.</> },
];

export default function DeliveryPage() {
  return (
    <>
      <HelpHero eyebrow="Delivery" title="How delivery works">
        <p>We print your signage and send it to you, anywhere in Australia. Delivery is quoted with your order, so you know the full cost before you pay.</p>
      </HelpHero>

      <HelpSection id="cost" title="What delivery costs">
        <p>Delivery is quoted separately from the product price. We work it out from:</p>
        <ul>
          <li>your delivery postcode</li>
          <li>the size of your order once it's packed</li>
          <li>its weight</li>
        </ul>
        <p>The freight cost is in your quote, and you see it before you pay anything. Typical transit times vary by carrier and location, so we confirm them in your quote too.</p>
        <p>Need it by a certain date? Put it in the <em>Date needed by</em> field on the quote form and we'll tell you if it's tight.</p>
      </HelpSection>


      <HelpSection id="no-pickup" title="Pick up and installation">
        <p>We don't offer pick up in person. Every order is delivered to the address you give us.</p>
        <p>We don't install. Everything arrives ready for you to put up yourself, with the fittings listed on each product page.</p>
      </HelpSection>


      <HelpFaq faqs={faqs} />
      <FaqSchema page="delivery" />

      <HelpCta title="Get a delivered price">
        <a href="#/quote" className="btn-rust" data-track="delivery-quote">Get a quote</a>
        <a href="#/artwork-help" className="btn-ghost-light">Artwork help</a>
      </HelpCta>
    </>
  );
}
