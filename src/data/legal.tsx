// Plain-English legal pages for The Signage Shed (digital downloads sold through Gumroad and Etsy).
// Written for an Australian online seller. Update LAST_UPDATED whenever you change the wording.
import type { ReactNode } from "react";
import { Email, Ext } from "../components/LegalLinks";
import type { LegalSlug } from "./products";

export const LAST_UPDATED = "11 October 2026";

export type LegalDoc = {
  slug: LegalSlug;
  title: string;
  description: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
};

export const legalDocs: Record<LegalSlug, LegalDoc> = {
  "refund-policy": {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Refunds for The Signage Shed digital downloads: what's covered under the Australian Consumer Law and how to ask.",
    intro: (
      <>
        Everything we sell is a digital download, delivered straight away through Gumroad or Etsy. This page explains
        when you can get a refund and how to ask for one. Nothing here limits your rights under the Australian Consumer
        Law.
      </>
    ),
    sections: [
      {
        heading: "Faulty or not as described",
        body: (
          <>
            <p>
              If a file is faulty, won't open, is missing something we said was included, or isn't what the listing
              described, email us and we'll fix it, send you a working file or refund you. If the problem is major,
              you can choose a refund.
            </p>
            <p>
              Our products come with guarantees that can't be excluded under the Australian Consumer Law, including
              that they match their description and are of acceptable quality.
            </p>
          </>
        ),
      },
      {
        heading: "Change of mind",
        body: (
          <p>
            Because digital files can't be returned once they're downloaded, we don't offer refunds if you simply
            change your mind, bought the wrong product or no longer need it. The Australian Consumer Law doesn't
            require change-of-mind refunds. If you're not sure a product suits you, email us before you buy and we'll
            happily answer questions.
          </p>
        ),
      },
      {
        heading: "How to ask for a refund or fix",
        body: (
          <>
            <p>Email <Email /> with:</p>
            <ul>
              <li>where you bought it (Gumroad or Etsy) and your order number or receipt email</li>
              <li>which product it is</li>
              <li>what's wrong, with a screenshot if you can</li>
            </ul>
            <p>We aim to reply within two business days. Most problems are fixed with an updated file.</p>
          </>
        ),
      },
      {
        heading: "How refunds are paid",
        body: (
          <p>
            Refunds go back through the platform you bought from, to your original payment method. Gumroad and Etsy
            handle the payment, so how long it takes to reach your account depends on them and your bank. Etsy
            purchases can also be raised through Etsy's own help and case system.
          </p>
        ),
      },
      {
        heading: "Free products",
        body: (
          <p>
            Free downloads, like our quick pricing sheet, cost nothing so there's nothing to refund. If a free file
            doesn't work, let us know and we'll fix it.
          </p>
        ),
      },
    ],
  },

  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How The Signage Shed handles your personal information: purchases, quote requests, emails, and cookieless website analytics.",
    intro: (
      <>
        We keep this simple: we collect as little as we need, we don't sell your information, and our website doesn't
        use cookies. We aim to handle personal information in line with the Australian Privacy Principles.
      </>
    ),
    sections: [
      {
        heading: "Who we are",
        body: (
          <p>
            The Signage Shed is an Australian online seller of digital downloads (spreadsheets and templates) for sign
            shops and small businesses. We also supply printed media walls, table covers, pull up banners, corflute signs and A-frames, quoted on request. You can contact us
            about privacy at <Email />.
          </p>
        ),
      },
      {
        heading: "When you buy or download something",
        body: (
          <>
            <p>
              Our products are sold through Gumroad and Etsy, and they run the checkout. When you buy or download a
              product, including a free one, the platform shares some details with us: your name, email address, what
              you bought, the price and your country. We never see your card or payment details.
            </p>
            <p>
              Gumroad and Etsy also collect information under their own privacy policies, which you'll find on their
              websites: <Ext href="https://gumroad.com/privacy">Gumroad privacy policy</Ext> and{" "}
              <Ext href="https://www.etsy.com/legal/privacy">Etsy privacy policy</Ext>.
            </p>
          </>
        ),
      },
      {
        heading: "When you ask for a quote",
        body: (
          <>
            <p>
              If you use the quote form on our Media Walls, Table Covers, Pull Up Banners, Corflute Signs or A-Frames page, the details you enter are sent to us by email through
              FormSubmit (formsubmit.co), a form-to-email service. That's your name and email address, your phone
              number and business name if you give them, the product you're after (such as size, print or drop, stand type, base colour, LED lights, single or double sided printing, eyelets, number of designs, frame colour, carry handle and quantity),
              your delivery postcode, the date you need it by, whether you'd like design help, any artwork link and
              your notes.
            </p>
            <p>
              We use these details only to prepare your quote and follow it up, and if you go ahead, to make and
              deliver your order. We don't add you to a mailing list. FormSubmit handles the form under its own{" "}
              <Ext href="https://formsubmit.co/privacy.pdf">privacy policy</Ext>.
            </p>
          </>
        ),
      },
      {
        heading: "Emails from us",
        body: (
          <>
            <p>
              If you get a product from us on Gumroad, including our free quick pricing sheet, we may email you now
              and then about new templates, tips and deals for sign shops. These emails are sent through Gumroad and
              every one has an unsubscribe link. You can also email us to be taken off the list.
            </p>
            <p>
              Etsy's rules don't allow sellers to add buyers to a mailing list, so if you buy on Etsy we only contact
              you about your order.
            </p>
          </>
        ),
      },
      {
        heading: "When you email us",
        body: (
          <p>
            If you email us, we keep your email address and message so we can reply and help with your order. We use
            Gmail for our inbox.
          </p>
        ),
      },
      {
        heading: "Website analytics (no cookies)",
        body: (
          <>
            <p>
              We use GoatCounter, a privacy-friendly analytics service, to count visits to this website. It doesn't use
              cookies, doesn't store your IP address and doesn't follow you across other websites. It tells us things
              like which pages are visited, which site you came from, your browser type, screen size and country.
              We also count clicks on our Gumroad and Etsy buttons, and when a quote request is sent, so we know which
              products people are interested in. None of this identifies you personally.
            </p>
            <p>
              Our website host and the services that deliver fonts and scripts to your browser receive your IP address
              as a normal part of loading a web page, and may keep it briefly in their logs for security.
            </p>
          </>
        ),
      },
      {
        heading: "Cookies",
        body: (
          <p>
            This website doesn't set cookies. When you click through to Gumroad or Etsy, those sites use their own
            cookies under their own policies.
          </p>
        ),
      },
      {
        heading: "How we use your information",
        body: (
          <ul>
            <li>to deliver your products and help with any problems or refunds</li>
            <li>to answer your emails and quote requests</li>
            <li>to send occasional product emails, if you got a product from us on Gumroad (unsubscribe any time)</li>
            <li>to understand which pages and products are popular, so we can improve them</li>
            <li>to keep records we're required to keep, such as sales records for tax</li>
          </ul>
        ),
      },
      {
        heading: "Who we share it with",
        body: (
          <p>
            We don't sell, rent or trade your personal information. It's only handled by the services we use to run
            the shop: Gumroad, Etsy, FormSubmit, Google (Gmail) and GoatCounter. Some of these services store information
            overseas, including in the United States.
          </p>
        ),
      },
      {
        heading: "Keeping it safe and how long we keep it",
        body: (
          <p>
            We use well-known, secure services to run the shop and keep access to our accounts limited. We keep
            order records for as long as tax law requires (generally five years) and delete other information when we
            no longer need it.
          </p>
        ),
      },
      {
        heading: "Your choices and rights",
        body: (
          <p>
            You can ask to see the personal information we hold about you, ask us to correct it, or ask us to delete
            it, by emailing <Email />. We'll respond within 30 days. If you're unhappy with how we've handled a privacy
            concern, please tell us first. You can also contact the Office of the Australian Information Commissioner
            at <Ext href="https://www.oaic.gov.au">oaic.gov.au</Ext>.
          </p>
        ),
      },
      {
        heading: "Changes to this policy",
        body: <p>If we change how we handle information, we'll update this page and the date at the top.</p>,
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    description: "Terms for using The Signage Shed website and our digital downloads, including the licence and how purchases work.",
    intro: (
      <>
        These terms cover this website and the digital products we sell. By using the site or our products you agree
        to them. They're written in plain English, and nothing in them limits your rights under the Australian
        Consumer Law.
      </>
    ),
    sections: [
      {
        heading: "Buying our products",
        body: (
          <p>
            Our products are sold through Gumroad and Etsy. When you buy, the checkout, payment, receipts and any
            GST or sales tax are handled by that platform under its own terms, which apply to your purchase alongside
            these terms. Prices on this website are a guide in Australian dollars, and the price shown at checkout is
            the one that applies. Launch deals and discount codes end on the date shown.
          </p>
        ),
      },
      {
        heading: "Your licence to use the files",
        body: (
          <>
            <p>When you buy or download a product, you can:</p>
            <ul>
              <li>use it in your own business, including for quoting and pricing jobs for your customers</li>
              <li>edit it, change the rates and add your own branding for your own use</li>
              <li>keep backup copies</li>
            </ul>
            <p>You can't:</p>
            <ul>
              <li>resell, share, give away or upload the files (or edited versions of them) for others to download</li>
              <li>pass them off as your own product or include them in a product you sell</li>
            </ul>
            <p>If you'd like to use a product across several separate businesses, email us and we'll sort something out.</p>
          </>
        ),
      },
      {
        heading: "General information only",
        body: (
          <p>
            Our spreadsheets, guides and examples are tools to help you work out your own prices. They're general
            information, not financial, tax, accounting or legal advice. Example prices and figures are for
            illustration only. You're responsible for checking your own numbers, rates and tax settings before you
            rely on them, and we recommend comparing your first few quotes against jobs you've already done.
          </p>
        ),
      },
      {
        heading: "Refunds",
        body: <p>Refunds are covered by our Refund Policy, which is linked at the bottom of every page.</p>,
      },
      {
        heading: "Our content",
        body: (
          <p>
            The Signage Shed name, logo, website content and products belong to us. Please don't copy them without
            asking. Excel and Google Sheets are trademarks of their owners, and we're not affiliated with Microsoft,
            Google, Gumroad or Etsy.
          </p>
        ),
      },
      {
        heading: "Links to other websites",
        body: (
          <p>
            This website links to Gumroad, Etsy, YouTube and other sites. We're not responsible for their content or
            how they handle your information.
          </p>
        ),
      },
      {
        heading: "Liability",
        body: (
          <p>
            We work hard to make our products accurate and useful, but we can't promise they'll be error-free or suit
            every business. To the extent the law allows, we're not liable for indirect losses, such as lost profits
            from a quote, that come from using our products or this website. Where our liability can't be excluded but
            can be limited, it's limited to supplying the product again or refunding what you paid. This doesn't affect
            any guarantee or right you have under the Australian Consumer Law.
          </p>
        ),
      },
      {
        heading: "Changes and governing law",
        body: (
          <p>
            We may update these terms from time to time, and the date at the top shows when they last changed. These
            terms are governed by the laws of Australia.
          </p>
        ),
      },
      {
        heading: "Contact",
        body: (
          <p>
            Questions about these terms? Email <Email />.
          </p>
        ),
      },
    ],
  },
};
