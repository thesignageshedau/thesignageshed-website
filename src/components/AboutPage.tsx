import HowItWorks from "./HowItWorks";
import { HelpCta, HelpHero, HelpSection, helpLink } from "./HelpParts";

/** About the studio. Only says what the rest of the site already says. */
export default function AboutPage() {
  return (
    <>
      <HelpHero eyebrow="About us" title="An online print studio for signs, banners and event gear">
        <p>We print custom signage and event gear and deliver it Australia-wide. You order online, by quote, from wherever you are.</p>
      </HelpHero>

      <HowItWorks />

      <HelpSection id="what-we-do" title="What we do">
        <p>
          We make printed signage and event gear: media walls, pull up banners, table covers, corflute signs, A-frames,
          flags, gazebos, market umbrellas and vinyl and mesh banners. Prices are on each product page, so you can see
          what things cost before you ask.
        </p>
      </HelpSection>

      <HelpSection id="how-we-work" title="How we work">
        <ul>
          <li><strong>Quote first.</strong> Tell us what you need and we reply by email, usually within one business day. There's nothing to pay online.</li>
          <li><strong>A digital proof before we print.</strong> Nothing is printed until you approve the proof in writing.</li>
          <li><strong>Delivered Australia-wide.</strong> Freight is in your quote, so you see the full cost before you pay. <a className={helpLink} href="/delivery/">How delivery works</a></li>
        </ul>
        <p>We print and deliver. Everything arrives ready for you to put up yourself.</p>
      </HelpSection>

      <HelpSection id="artwork" title="Help with your artwork">
        <p>
          Send print-ready artwork, or send us your logo and wording and we'll set it up for you. Our{" "}
          <a className={helpLink} href="/artwork-help/">artwork help</a> explains bleed, the safe area, resolution and
          file types in plain English, and our free <a className={helpLink} href="/check-artwork/">artwork checker</a>{" "}
          checks your file against our specs before you order.
        </p>
      </HelpSection>

      <HelpCta title="Start with a quote">
        <a href="/quote/" className="btn-rust" data-track="about-quote">Get a quote</a>
        <a href="/#signage" className="btn-ghost-light">See our signage</a>
      </HelpCta>
    </>
  );
}
