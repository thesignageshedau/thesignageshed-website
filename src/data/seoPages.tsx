// Search-focused landing pages for common searches. Prices come only from the product data files
// (aFrames.ts, corfluteSigns.ts, eventGear.ts). Products we don't publish a price for show "Price on quote".
import type { ReactNode } from "react";
import * as AF from "./aFrames";
import * as CF from "./corfluteSigns";
import { ACM_SIGNS } from "./eventGear";
import { MOCKUPS, type Mockup } from "./mockups";
import { helpLink } from "../components/HelpParts";

const L = (href: string, t: string) => <a className={helpLink} href={href}>{t}</a>;
const acmFrom = Math.min(...ACM_SIGNS.items.map((i) => i.price[0]!));
const af = (id: string) => AF.ITEMS.find((i) => i.id === id)!.price[0];

export type SeoPage = {
  slug: string;
  title: string; // <title>
  description: string; // meta description
  eyebrow: string;
  h1: string;
  intro: string;
  from: number | null; // null = price on quote
  fromNote: string;
  image?: Mockup;
  quote: { product: string; size?: string; label: string };
  related: { href: string; text: string }[];
  sections: { id: string; title: string; body: ReactNode }[];
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "cafe-a-frame-signs",
    title: "Café A-Frame Signs: Footpath Boards | The Signage Shed",
    description: `Printed A-frame signs for cafés: aluminium, insert and folding corflute footpath boards, printed both sides. From $180, delivered Australia-wide.`,
    eyebrow: "A-frame signs for cafés",
    h1: "Café A-frame signs for your footpath",
    intro: "A double sided footpath sign tells people walking past what you serve and that you're open. We print three styles of A-frame, so you can pick the one that suits how often your menu changes.",
    from: 180,
    fromNote: "",
    image: MOCKUPS.v4AFramePrinted,
    quote: { product: "a-frames", size: "printed-600x900", label: "café A-frame" },
    related: [{ href: "/a-frames/", text: "All A-frame signs and prices" }, { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs guide" }],
    sections: [
      { id: "styles", title: "Which A-frame suits a café?", body: <>
        <ul>
          <li><strong>Printed aluminium A-frame (600 × 900mm):</strong> our sturdiest board. Both faces are aluminium composite panels, printed in full colour and gloss laminated, so they wipe clean. ${af("printed-600x900")} each.</li>
          <li><strong>Insert A-frame (600 × 900mm):</strong> printed 5mm corflute inserts slide in from the top, so you can swap a seasonal menu or special and re-order just the inserts. ${af("insert-600x900")} each, with replacement insert pairs from ${af("insert-600x900-inserts")}.</li>
          <li><strong>Folding corflute A-frame (600 × 950mm):</strong> light and budget friendly, printed front and back. ${af("folding-600x950")} each.</li>
        </ul>
        <p>The price each drops as you order more. The full price table is on our {L("/a-frames/", "A-frame signs page")}.</p>
      </> },
      { id: "artwork", title: "Artwork tips for a footpath sign", body: <>
        <p>People read a footpath sign in a couple of seconds, so keep it short: your name, one or two items or offers, and an arrow if you're tucked away. Big, high-contrast text reads best from across the street.</p>
        <p>Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve. Our {L("/artwork-help/", "artwork help")} covers bleed and safe areas.</p>
      </> },
      { id: "price", title: "Pricing and minimum order", body: <>
        <p>Prices include everything except delivery. Minimum order $180 (excl. freight). We send a digital proof before we print, and deliver Australia-wide.</p>
      </> },
    ],
  },
  {
    slug: "corflute-event-signs",
    title: "Corflute Event Signs: Custom Printed | The Signage Shed",
    description: `Custom printed corflute signs for events: directional, sponsor and fence signs from 600 × 450mm to 900 × 1200mm. Bundles from $${CF.FROM_PRICE}, delivered Australia-wide.`,
    eyebrow: "Corflute signs for events",
    h1: "Corflute event signs",
    intro: "Light, waterproof and great value in quantity, corflute is the go-to for event signage: directions, parking, entry, sponsor boards and signs cable-tied to fences.",
    from: CF.FROM_PRICE,
    fromNote: "for a bundle of 1 to 5 signs",
    image: MOCKUPS.v4Corflute,
    quote: { product: "corflute-signs", size: "600x900", label: "corflute event signs" },
    related: [{ href: "/corflute-signs/", text: "Corflute sign price calculator" }, { href: "/banners/", text: "Vinyl and mesh banners" }],
    sections: [
      { id: "sizes", title: "Sizes and options", body: <>
        <p>{CF.MATERIAL} Single or double sided, portrait or landscape, in three sizes:</p>
        <ul>
          {CF.SIZES.map((s) => <li key={s.id}><strong>{s.label}</strong></li>)}
        </ul>
        <p>Add eyelets for tying to fences and posts ({CF.money(CF.EYELET_EACH)} per eyelet). Extra designs in the same order are {CF.money(CF.EXTRA_DESIGN)} each, so each direction or sponsor can have its own sign.</p>
      </> },
      { id: "price", title: "Bundle pricing", body: <>
        <p>Corflute is priced in bundles: 1 to 5 signs from ${CF.FROM_PRICE}, and the price per sign drops as your quantity grows. See every price on our {L("/corflute-signs/", "corflute signs page")}.</p>
        <p>Prices include everything except delivery. Minimum order $180 (excl. freight).</p>
      </> },
      { id: "artwork", title: "Artwork for event signs", body: <>
        <p>Use big arrows and short words so people can read the sign on the move. Our {L("/check-artwork/", "free print file checker")} checks size, bleed and resolution before you order.</p>
      </> },
    ],
  },
  {
    slug: "shop-window-wall-signs",
    title: "Shop Wall Signs and Window Signs | The Signage Shed",
    description: `Printed shop wall signs on rigid aluminium composite (ACM) from $${acmFrom}, plus corflute wall signs. Window graphics priced on quote. Delivered Australia-wide.`,
    eyebrow: "Signs for your shopfront",
    h1: "Shop window and wall signs",
    intro: "A clear sign on your shopfront wall helps people find you. We print flat, rigid signs ready for you to fix up, and quote window graphics to suit your glass.",
    from: acmFrom,
    fromNote: "900 × 600mm single sided ACM wall sign",
    image: MOCKUPS.v4AcmSign,
    quote: { product: "acm-signs", size: "900x600-single", label: "shop wall sign" },
    related: [{ href: "/acm-signs/", text: "ACM signs and prices" }, { href: "/corflute-signs/", text: "Corflute signs" }],
    sections: [
      { id: "wall", title: "Wall signs: ACM", body: <>
        <p>Our ACM signs are aluminium composite panels printed on white vinyl with a gloss laminate. They're flat, rigid and our sturdiest sign for a shopfront wall.</p>
        <ul>
          {ACM_SIGNS.items.map((i) => <li key={i.id}>{i.label.replace("ACM sign ", "")}: ${i.price[0]}</li>)}
        </ul>
        <p>Signs are supplied without holes. If you need holes for fixing, ask us and we'll include them in your quote. For a lower cost or shorter-term sign, {L("/corflute-signs/", "corflute")} also suits a wall.</p>
      </> },
      { id: "window", title: "Window signs", body: <>
        <p>Window graphics are priced on quote. Tell us your glass size and what you'd like on it, and we'll come back to you with options and a price.</p>
      </> },
      { id: "price", title: "Pricing and minimum order", body: <>
        <p>Prices include everything except delivery. Minimum order $180 (excl. freight). We send a digital proof before we print, and deliver Australia-wide.</p>
      </> },
    ],
  },
];
