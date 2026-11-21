// Search-focused landing pages for common searches. Prices come only from the product data files.
// Products we don't publish a price for show "Price on quote".
import type { ReactNode } from "react";
import * as AF from "./aFrames";
import * as CF from "./corfluteSigns";
import * as MW from "./mediaWalls";
import * as PB from "./pullUpBanners";
import * as TC from "./tableCovers";
import { ACM_SIGNS, BANNERS, FLAGS, RECTANGLE_FLAGS, fromPrice } from "./eventGear";
import { MOCKUPS, type Mockup } from "./mockups";
import { BARRIERS, SEG_AFRAMES } from "./newProducts";
import { PACKS } from "./packs";
import { money } from "./quoteOptions";
import { helpLink } from "../components/HelpParts";

const L = (href: string, t: string) => <a className={helpLink} href={href}>{t}</a>;
const acmFrom = Math.min(...ACM_SIGNS.items.map((i) => i.price[0]!));
const af = (id: string) => AF.ITEMS.find((i) => i.id === id)!.price[0];

const published = (items: { accessory?: boolean; label: string; price: number[] }[]) =>
  items.filter((i) => !i.accessory && !i.label.startsWith("Replacement"));
const cheapest = <T extends { price: number[] }>(items: T[]) => items.reduce((a, b) => (a.price[0]! <= b.price[0]! ? a : b));
const bannerPrice = fromPrice(BANNERS);
const flagPrice = fromPrice(FLAGS);
const cheapestBanner = cheapest(published(BANNERS.items));
const cheapestFlag = cheapest(published(FLAGS.items));
const pullUpChoices = PB.SIZES.flatMap((s) =>
  (["luxury", "double"] as const).map((stand) => ({ stand, size: s, price: s.price[stand] })),
);
const pullUpCheapest = pullUpChoices.reduce((a, b) => (a.price <= b.price ? a : b));
const wallCheapest = MW.SIZES.reduce((a, b) => (a.kit.single <= b.kit.single ? a : b));
const sixFt = TC.THROWS.find((t) => t.id === "6ft")!;
const runnerFrom = Math.min(...TC.RUNNERS.front.map((r) => r.price));
const schoolPack = PACKS.items.find((i) => i.id === "school")!;
const sponsor5 = PACKS.items.find((i) => i.id === "sponsor-5")!;
const sponsor10 = PACKS.items.find((i) => i.id === "sponsor-10")!;
const segOne = SEG_AFRAMES.items.find((i) => i.id === "1-frame")!;
const barrierCover = BARRIERS.items.find((i) => i.id === "cover-single")!;
const standName = (stand: "luxury" | "double") => (stand === "luxury" ? "luxury" : "double sided");
const asPhrase = (label: string) => label.replace(/^(Teardrop|Feather)\b/, (word) => word.toLowerCase());
const ORDER_TERMS = "Minimum order $180 per order. We'll email you a quote with freight included.";
const deal = (rows: { price: number; note: string }[]) => rows.reduce((a, b) => (a.price <= b.price ? a : b));
const eventDeal = deal([
  { price: bannerPrice, note: `for a ${cheapestBanner.label}` },
  { price: flagPrice, note: `for a ${asPhrase(cheapestFlag.label)}` },
  { price: MW.FROM_PRICE, note: `for a ${wallCheapest.label} single sided media wall kit` },
  { price: TC.FROM_PRICE, note: "for a printed table cover" },
  { price: CF.FROM_PRICE, note: "for a corflute sign bundle of 1 to 5 signs" },
]);
const schoolDeal = deal([
  { price: bannerPrice, note: `for a ${cheapestBanner.label}` },
  { price: flagPrice, note: `for a ${asPhrase(cheapestFlag.label)}` },
  { price: fromPrice(RECTANGLE_FLAGS), note: `for a ${asPhrase(cheapest(published(RECTANGLE_FLAGS.items)).label).replace(/^Rectangle/, "rectangle")}` },
  { price: CF.FROM_PRICE, note: "for a corflute sign bundle of 1 to 5 signs" },
]);

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
  /** Replaces the default minimum-order line under the hero price. */
  terms?: string;
  related: { href: string; text: string }[];
  sections: { id: string; title: string; body: ReactNode }[];
  faqs?: { q: string; a: string }[];
  gallery?: Mockup[];
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "cafe-a-frame-signs",
    title: "Café A-Frame Signs: Footpath Boards | The Signage Shed",
    description: `Printed A-frame signs for cafés: aluminium, insert and folding corflute footpath boards, printed both sides. From $${AF.FROM_PRICE}, delivered Australia-wide.`,
    eyebrow: "A-frame signs for cafés",
    h1: "Café A-frame signs for your footpath",
    intro: "A double sided footpath sign tells people walking past what you serve and that you're open. We print three styles of A-frame, so you can pick the one that suits how often your menu changes.",
    from: AF.FROM_PRICE,
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
  {
    slug: "pull-up-banners-australia",
    title: "Retractable Pull Up Banners Australia | The Signage Shed",
    description: `Retractable pull up banners for Australia, luxury or double sided, 850mm or 1200mm wide, with a carry bag. From $${PB.FROM_PRICE}. We'll email you a quote with freight included.`,
    eyebrow: "Pull up banners and retractable banners",
    h1: "Pull up banners and retractable banners for Australia",
    intro: "A pull up banner is a retractable banner: the graphic rolls into the base, and you pull it up on a pole when you arrive. We print them for shops, expos, clubs and schools anywhere in Australia, and we deliver to the address you give us.",
    from: PB.FROM_PRICE,
    fromNote: `for ${pullUpCheapest.size.label.startsWith("8") ? "an" : "a"} ${pullUpCheapest.size.label} ${standName(pullUpCheapest.stand)} pull up banner`,
    image: MOCKUPS.v4PullUp,
    gallery: [MOCKUPS.v4PullUpDouble, MOCKUPS.v4PullUpScale],
    quote: { product: "pull-up-banners", size: "850x2000", label: "pull up banner" },
    terms: ORDER_TERMS,
    related: [
      { href: "/pull-up-banners/", text: "Pull up banner prices and templates" },
      { href: "/guides/pull-up-banner-size/", text: "Which pull up banner size" },
      { href: "/event-signage-australia/", text: "Event signage for expos" },
      { href: "/quote/", text: "Request a quote" },
    ],
    sections: [
      { id: "stands", title: "Luxury or double sided", body: <>
        <p>We print two stands, and both are 2000mm tall. A luxury pull up banner has one graphic. It suits a wall, a reception counter or the back of a stand. A double sided retractable banner rolls a graphic out of each side, so people read it from both directions in a walkway, a shopfront or the middle of a room.</p>
        <p>Choose 850mm wide when the space is tight: a foyer, a classroom door or a small expo booth. Choose 1200mm wide when the logo is wide or the message needs another line. Our {L("/guides/pull-up-banner-size/", "pull up banner size guide")} walks through that choice, and every quantity break is on the {L("/pull-up-banners/", "pull up banners page")}.</p>
        <p>One design, including the stand, the print and a carry bag:</p>
        <ul>
          {PB.SIZES.map((s) => (
            <li key={s.id}><strong>{s.label} luxury:</strong> {money(s.price.luxury)}. <strong>Double sided:</strong> {money(s.price.double)}.</li>
          ))}
        </ul>
        <p>{PB.MATERIAL} The 850mm luxury stand can have a silver or black base. The other sizes come with a silver base, at the same price.</p>
      </> },
      { id: "artwork", title: "Where it works, and the artwork", body: <>
        <p>Use a retractable banner where people are close enough to read a headline: a counter, a market stall under cover, a school hall, a club presentation or the front of an expo stand. It packs into the carry bag, so the same banner can move from the shop one week to an event the next. Keep it indoors or under cover. Outside, the graphic catches the wind and the stand can tip.</p>
        <p>Put the logo and the main line in the top half, where people look. Leave the bottom 100mm as background only, because it sits low beside the base. Send print-ready artwork at the finished size, or send your logo and wording and we will set it up. We email a digital proof, and nothing is printed until you approve that proof in writing.</p>
        <p>Bleed and safe area for each stand are on our {L("/artwork-help/", "artwork help")} page. You can check a PDF, JPG or PNG in the free {L("/check-artwork/", "print file checker")} before you send it.</p>
      </> },
      { id: "order", title: "How to order a pull up banner", body: <>
        <p>There is no checkout on this website. Tell us the width, the stand and how many you need on the {L("/quote/", "quote form")}. We'll email you a quote with freight included, usually within one business day. The minimum order is $180 per order, not per banner. You can add {L("/corflute-signs/", "corflute")}, a {L("/flags/", "flag")} or a {L("/table-covers/", "table cover")} to the same quote.</p>
        <p>Once you approve the quote, you pay by invoice. {MW.TURNAROUND} We print and deliver. We do not visit your premises and we do not install the banner. You stand it up yourself. If you are kitting out a whole booth, the {L("/event-signage-australia/", "event signage")} page links the backdrop, flags and table covers as well. {L("/delivery/", "Delivery")} is Australia-wide.</p>
      </> },
    ],
    faqs: [
      { q: "What is a retractable banner?", a: "A retractable banner is the same product as a pull up banner. The printed graphic rolls into the base for travel, and you pull it up on a pole when you set it up." },
      { q: "Which width should I choose?", a: "850mm wide suits most foyers, counters and small stands. 1200mm wide gives more room for a wide logo or a longer message. Both sizes are 2000mm tall." },
      { q: "Can I use a pull up banner outside?", a: "Pull up banners are made for indoor use. Outside, the graphic catches the wind and the stand can tip, so keep it under cover." },
      { q: "How do I order and pay?", a: `Ask for a quote on the quote form. We'll email you a quote with freight included. There is no checkout on this site. After you approve the quote, you pay by invoice. ${MW.TURNAROUND}` },
    ],
  },
  {
    slug: "corflute-signs-australia",
    title: "Custom Corflute Signs Australia | The Signage Shed",
    description: `Custom corflute signs printed on Australian-made 5mm board, from 600 × 450mm to 900 × 1200mm. Bundles from $${CF.FROM_PRICE}. We'll email you a quote with freight included.`,
    eyebrow: "Corflute signs printed to order",
    h1: "Custom printed corflute signs for Australia",
    intro: "Corflute is a light, waterproof corrugated plastic board. We print custom corflute signs for events, clubs, shops and short runs anywhere in Australia, then deliver them ready for you to put up.",
    from: CF.FROM_PRICE,
    fromNote: "for a bundle of 1 to 5 signs",
    image: MOCKUPS.v4Corflute,
    gallery: [MOCKUPS.v4CorfluteWall, MOCKUPS.v4CorfluteEdge, MOCKUPS.v4CorfluteScale],
    quote: { product: "corflute-signs", size: "600x900", label: "corflute signs" },
    terms: ORDER_TERMS,
    related: [
      { href: "/corflute-signs/", text: "Corflute sign prices and calculator" },
      { href: "/corflute-event-signs/", text: "Corflute event signs" },
      { href: "/guides/corflute-vs-rigid-signs/", text: "Corflute vs rigid signs" },
      { href: "/quote/", text: "Request a quote" },
    ],
    sections: [
      { id: "sizes", title: "Sizes, sides and bundle prices", body: <>
        <p>{CF.MATERIAL} Each size can be portrait or landscape. Single sided suits a wall, a window or a fence. Double sided suits a sign people walk past from both ways, such as a stake sign or a board in a doorway.</p>
        <p>A bundle of 1 to 5 signs is one flat price for the whole bundle, not a price per sign. The same idea applies to 6 to 10 signs. From 11 signs you pay per sign, and that price drops again at 20, 50 and at 100 or more. These are the 5mm bundle prices for 1 to 5 signs:</p>
        <ul>
          {CF.SIZES.map((s) => (
            <li key={s.id}><strong>{s.label}:</strong> {money(s.price["5mm"].single.upTo5)} single sided, or {money(s.price["5mm"].double.upTo5)} double sided.</li>
          ))}
        </ul>
        <p>The full table, including larger quantities, is on our {L("/corflute-signs/", "corflute signs page")}, which has a calculator. For directions, parking and sponsor boards, see {L("/corflute-event-signs/", "corflute event signs")}.</p>
      </> },
      { id: "fixing", title: "Eyelets, artwork and what is not included", body: <>
        <p>Prices are for the printed board only. Stakes, frames and cable ties are not included. Eyelets are clear reinforced holes for cable ties, rope or hooks, at {money(CF.EYELET_EACH)} per eyelet per sign. Four corners are {money(CF.EYELET_EACH * 4)} a sign, and two eyelets are {money(CF.EYELET_EACH * 2)}. An extra design in the same order is {money(CF.EXTRA_DESIGN)}, so each direction or sponsor can have its own wording.</p>
        <p>People read a corflute sign while they are moving, so use a short line, a big arrow and strong contrast. Keep text away from the edges and away from the eyelets. Send artwork at the finished size, or send the logo and the words and we will set it up. We email a digital proof and we do not print until you approve it. Guides for each size are on the {L("/artwork-help/", "artwork help")} page, and our {L("/guides/corflute-vs-rigid-signs/", "corflute vs rigid signs guide")} compares this board with aluminium composite when you need something stiffer.</p>
      </> },
      { id: "order", title: "Ordering printed corflute in Australia", body: <>
        <p>The prices above include the print. They do not include freight. Tell us the size, single or double sided, and how many signs on the {L("/quote/", "quote form")}. We'll email you a quote with freight included. The minimum is $180 per order, not per sign, and the smallest bundle already meets it. You can add banners or flags to the same order.</p>
        <p>There is no checkout here. You request a quote, you approve that quote, and you pay by invoice. {MW.TURNAROUND} We do not install signs and we do not visit your site. The boards arrive ready for you to put up. See {L("/delivery/", "how delivery works")}.</p>
      </> },
    ],
    faqs: [
      { q: "What are corflute signs printed on?", a: "Corflute is fluted plastic sheet, light and waterproof, printed in full colour. Our signs are premium Australian-made 5mm board." },
      { q: "Which size should I pick?", a: "600 × 450mm suits a small notice. 600 × 900mm is the usual portrait sign. 900 × 1200mm reads from further away. Each size can be portrait or landscape, single sided or double sided." },
      { q: "Do you supply stakes?", a: `No. The price is for the printed sign. Add eyelets if you will fix it with cable ties or rope. Eyelets are ${money(CF.EYELET_EACH)} each. Stakes and frames are not included.` },
      { q: "How does the bundle price work?", a: `One to five signs is a flat bundle price, and six to ten is another flat price. From 11 signs you pay per sign, and that price drops as the quantity rises. Freight is not in those prices. We'll email you a quote with freight included. The minimum order is $180 per order.` },
    ],
  },
  {
    slug: "media-walls-australia",
    title: "Step and Repeat Media Walls Australia | The Signage Shed",
    description: `Printed fabric media walls and step and repeat backdrops, 2.4m to 4m wide, with frame and carry bag. From $${MW.FROM_PRICE}. We'll email you a quote with freight included.`,
    eyebrow: "Media walls and step and repeat backdrops",
    h1: "Media walls and step and repeat backdrops",
    intro: "A media wall is a fabric backdrop stretched on a frame. Print a repeating logo and it becomes a step and repeat backdrop for photos. We make them for launches, expos, school events and club presentations, and we deliver Australia-wide.",
    from: MW.FROM_PRICE,
    fromNote: `for a ${wallCheapest.label} single sided kit`,
    image: MOCKUPS.v4MediaWall,
    gallery: [MOCKUPS.v4MediaWallDouble, MOCKUPS.v4MediaWallLed, MOCKUPS.v4MediaWallScale],
    quote: { product: "media-walls", size: "2.4x2.2", label: "media wall" },
    terms: ORDER_TERMS,
    related: [
      { href: "/media-walls/", text: "Media wall prices and templates" },
      { href: "/event-signage-australia/", text: "Event signage" },
      { href: "/pull-up-banners/", text: "Pull up banners" },
      { href: "/quote/", text: "Request a quote" },
    ],
    sections: [
      { id: "kits", title: "Sizes and what is in the kit", body: <>
        <p>We print three widths, and every wall is 2.2m tall. A complete kit is the frame, the printed fabric and a carry bag. A single sided wall is printed on the front with a plain back. A double sided wall is printed on both sides, which suits a stand people can walk around.</p>
        <ul>
          {MW.SIZES.map((s) => (
            <li key={s.id}><strong>{s.label}:</strong> {money(s.kit.single)} single sided kit, {money(s.kit.double)} double sided. Replacement fabric is {money(s.fabric.single)} single sided or {money(s.fabric.double)} double sided.</li>
          ))}
        </ul>
        <p>Optional clamp-on LED lights are {money(MW.LED_PACK)} for a pack of two, and the pack fits any size. If you already have one of our frames, order replacement fabric rather than a new kit. Every price, including quantity breaks, is on the {L("/media-walls/", "media walls page")}.</p>
      </> },
      { id: "step-repeat", title: "Artwork for a step and repeat backdrop", body: <>
        <p>A step and repeat backdrop repeats your logo across the fabric so it shows up behind people in photos. Keep each logo large, leave clear space between repeats, and put a name or a short line where a camera will still read it. We can set that repeat up from your logo file. If you already have finished artwork, send that instead.</p>
        <p>Either way, we email a digital proof and we wait for written approval before we print. Artwork guides for each width are on the {L("/artwork-help/", "artwork help")} page. Some media wall templates are drawn at a reduced scale because the wall is large, and the guide for that size says which. You can also run a PDF, JPG or PNG through the {L("/check-artwork/", "print file checker")}.</p>
      </> },
      { id: "order", title: "Using the wall, then ordering", body: <>
        <p>The wall packs into the carry bag, so you can use it at one event and store it for the next. You set the frame up yourself. We do not install it and we do not come to the venue. Pair it with a {L("/pull-up-banners/", "pull up banner")} at the front of the stand and a {L("/table-covers/", "table cover")} on the trestle if you want a small booth. Those pieces are linked from our {L("/event-signage-australia/", "event signage")} page.</p>
        <p>Ask for a quote with the width, single or double sided, and whether you want the LED pack. Use the {L("/quote/", "quote form")}. We'll email you a quote with freight included. The minimum order is $180 per order. There is no checkout on the site: approve the quote, then pay by invoice. {MW.TURNAROUND} {L("/delivery/", "Freight")} is worked out for your address and shown on the quote before you pay.</p>
      </> },
    ],
    faqs: [
      { q: "Is a media wall the same as a step and repeat backdrop?", a: "A step and repeat backdrop is a media wall printed with a repeating logo, made for photos. The frame, the fabric and the carry bag are the same kit." },
      { q: "How wide are the media walls?", a: "2.4m, 3m or 4m wide, and every size is 2.2m tall. Each size is available single sided or double sided." },
      { q: "Can I change the print later?", a: "Yes. Order a replacement printed fabric for the same size and use it on the frame you already have." },
      { q: "Do you set the wall up at the event?", a: `No. We print and deliver the kit. You put the frame up yourself. We do not visit the venue. We'll email you a quote with freight included, and you pay by invoice after you approve the quote. ${MW.TURNAROUND}` },
    ],
  },
  {
    slug: "event-signage-australia",
    title: "Event Signage for Expos and Trade Shows | The Signage Shed",
    description: `Event signage for expos and trade shows: banners, flags, media walls, table covers and corflute. From $${eventDeal.price}. We'll email you a quote with freight included.`,
    eyebrow: "Expo and trade show signs",
    h1: "Event signage for expos and trade shows",
    intro: "An expo stand needs a few pieces that pack down and go up again next time. We print event signage for trade shows, markets, school fairs and club days, and we send it anywhere in Australia. This page is the map. Each price below is the From price on that product page, and the full table lives there.",
    from: eventDeal.price,
    fromNote: eventDeal.note,
    image: MOCKUPS.v4MeshBannerEvent,
    gallery: [MOCKUPS.v4MediaWall, MOCKUPS.v4PullUp, MOCKUPS.v4Flags, MOCKUPS.v4TableCover, MOCKUPS.v4Corflute],
    quote: { product: "other", label: "event signage" },
    terms: ORDER_TERMS,
    related: [
      { href: "/banners/", text: "Vinyl and mesh banners" },
      { href: "/flags/", text: "Teardrop and feather flags" },
      { href: "/media-walls/", text: "Media walls" },
      { href: "/table-covers/", text: "Table covers and runners" },
      { href: "/corflute-signs/", text: "Corflute signs" },
      { href: "/pull-up-banners/", text: "Pull up banners" },
      { href: "/packs/", text: "Signage packs" },
      { href: "/quote/", text: "Request a quote" },
    ],
    sections: [
      { id: "backdrop", title: "Backdrops, pull ups and hanging banners", body: <>
        <p>Start with the thing people see first. A {L("/media-walls/", "media wall")} is the fabric backdrop: from {money(MW.FROM_PRICE)} for a {wallCheapest.label} single sided kit, with frame and carry bag. Print a repeating logo and it works as a {L("/media-walls-australia/", "step and repeat backdrop")}. The other widths, 3m and 4m, are on that page.</p>
        <p>{L("/pull-up-banners/", "Pull up banners")} stand at the front of the booth, from {money(PB.FROM_PRICE)} for a {pullUpCheapest.size.label} {standName(pullUpCheapest.stand)} retractable banner with a carry bag. Read the width guide on our {L("/pull-up-banners-australia/", "pull up banners Australia")} page if you are choosing between 850mm and 1200mm.</p>
        <p>{L("/banners/", "Vinyl, mesh and fabric banners")} hang on a fence, a wall or the back of a stand, from {money(bannerPrice)} for a {cheapestBanner.label}. PVC vinyl gives the boldest colour. Mesh lets wind through, so it is the one for outdoor fencing. Fabric folds without a hard crease between shows. All three are hemmed or welded, with eyelets, and printed single sided.</p>
      </> },
      { id: "table", title: "Flags and the table", body: <>
        <p>{L("/flags/", "Teardrop and feather flags")} mark the stand from across the hall or the oval, from {money(flagPrice)} for a {asPhrase(cheapestFlag.label)}. Each flag includes the pole set and a 10kg square base, so you do not need a ground spike on carpet or paving. Teardrop holds its shape in still air and suits a logo. Feather is taller and slimmer and suits a name that has to read from a distance.</p>
        <p>Dress the trestle with a fitted throw, a loose throw or a runner. {L("/table-covers/", "Table covers")} start from {money(TC.FROM_PRICE)}. A 6ft fitted throw is {money(sixFt.fitted.four)} for four sides and {money(sixFt.fitted.three)} for three sides with an open back. Listed front runners start at {money(runnerFrom)}. The page also has an 8ft throw and a round throw. The fabric is polyester and machine washable, so it can do the next show.</p>
      </> },
      { id: "corflute", title: "Corflute, packs and how an event order works", body: <>
        <p>{L("/corflute-signs/", "Corflute signs")}, bundles from {money(CF.FROM_PRICE)} for 1 to 5 signs, cover directions, parking, entry and sponsor boards. They are light enough to cable-tie to temporary fencing. Sizes run from 600 × 450mm to 900 × 1200mm, single or double sided, with optional eyelets. The {L("/corflute-signs-australia/", "custom corflute signs")} page explains the bundle pricing, and {L("/corflute-event-signs/", "corflute event signs")} is the short version for event jobs.</p>
        <p>You can mix any of these on one {L("/quote/", "quote")}. The minimum is $180 per order, not per product. We'll email you a quote with freight included. There is no checkout: you approve the quote, then you pay by invoice. We send a digital proof before we print. {MW.TURNAROUND} We deliver the gear. We do not install it and we do not visit the venue.</p>
        <p>Ready-made mixes, including an expo stand pack, are on the {L("/packs/", "signage packs")} page. {L("/delivery/", "Delivery")} is to your address, anywhere in Australia.</p>
      </> },
    ],
    faqs: [
      { q: "What event signage should I order first?", a: "Start with a media wall or a pull up banner so the stand has a name. Add a table cover and a flag if people need to find you from further away. Use corflute for directions and sponsor boards." },
      { q: "Can I mix banners, flags and corflute in one order?", a: "Yes. One quote can include banners, flags, a media wall, table covers and corflute. The $180 minimum applies to the whole order, not to each product." },
      { q: "Do you install the stand at the venue?", a: "No. We print and deliver. You set the gear up yourself. We do not visit the venue." },
      { q: "How do freight and payment work?", a: `We'll email you a quote with freight included. There is no checkout on this site. After you approve the quote, you pay by invoice. ${MW.TURNAROUND}` },
    ],
  },
  {
    slug: "school-and-sports-club-signs",
    title: "School and Sports Club Signs Australia | The Signage Shed",
    description: `Banners, flags and printed corflute for schools and sports clubs in Australia, plus ready-made packs. From $${schoolDeal.price}. We'll email you a quote with freight included.`,
    eyebrow: "Banners, flags and corflute for schools and clubs",
    h1: "Signs for schools and sports clubs",
    intro: "Open days, sports carnivals, registration days and home games need the same things: a banner people can read from the boundary, a flag at the gate, and corflute for parking and change rooms. We print them for schools and clubs across Australia and deliver to the address you give us.",
    from: schoolDeal.price,
    fromNote: schoolDeal.note,
    image: MOCKUPS.v4FlagsTeardrop,
    gallery: [MOCKUPS.v4PvcBanner, MOCKUPS.v4Corflute, MOCKUPS.v4RectangleFlags],
    quote: { product: "packs", size: "school", label: "school or club signs" },
    terms: ORDER_TERMS,
    related: [
      { href: "/banners/", text: "Vinyl and mesh banners" },
      { href: "/flags/", text: "Teardrop and feather flags" },
      { href: "/corflute-signs/", text: "Corflute signs" },
      { href: "/packs/", text: "School and sponsor packs" },
      { href: "/rectangle-flags/", text: "Rectangle flags" },
      { href: "/event-signage-australia/", text: "Event signage" },
      { href: "/quote/", text: "Request a quote" },
    ],
    sections: [
      { id: "banners", title: "Banners for the fence and the hall", body: <>
        <p>PVC vinyl banners are 510gsm blockout vinyl, hemmed, with eyelets, printed single sided. Fabric banners are lightweight polyester that folds without creasing, so they store between seasons. Mesh is perforated vinyl, so wind can pass through a boundary fence. {L("/banners/", "Printed banners")} start from {money(bannerPrice)} for a {cheapestBanner.label}.</p>
        <p>The {sponsor5.label} is {money(sponsor5.price[0]!)}. The {sponsor10.label} is {money(sponsor10.price[0]!)}. If the canteen or the hall already uses a retractable stand, {L("/pull-up-banners/", "pull up banners")} start from {money(PB.FROM_PRICE)} and include a carry bag.</p>
      </> },
      { id: "flags", title: "Flags at the gate and on the oval", body: <>
        <p>A teardrop or feather flag stands on a 10kg square base, so you do not need a spike in the gym or on a hard path. {L("/flags/", "Flags")} start from {money(flagPrice)} for a {asPhrase(cheapestFlag.label)}, including the pole set and the base. Teardrop keeps its shape in still air, which suits a logo. Feather is taller and slimmer, which suits a school or club name. Take flags down in strong wind.</p>
        <p>{L("/rectangle-flags/", "Rectangle flags")} are the straight panel when you want more room for names. They start from {money(fromPrice(RECTANGLE_FLAGS))} with a pole and ground spike. A cross base and water bag is the option for paving and indoors, and that price is on the rectangle flags page. For a low sponsor board along a sideline or a pool deck, one {L("/seg-fabric-frames/", "SEG fabric frame")} section is {money(segOne.price[0]!)}. A printed cover for a standard steel crowd barrier is {money(barrierCover.price[0]!)}, and the barrier itself is not included. See {L("/crowd-barriers/", "crowd barrier frames and covers")}.</p>
      </> },
      { id: "corflute", title: "Corflute, the school pack and how to order", body: <>
        <p>{L("/corflute-signs/", "Corflute sign")} bundles start from {money(CF.FROM_PRICE)} for 1 to 5 signs, in 600 × 450mm, 600 × 900mm and 900 × 1200mm, on Australian-made 5mm board. Use them for directions, the canteen, parking and team lists. Eyelets are {money(CF.EYELET_EACH)} each if you want to cable-tie the board to a gate. Our {L("/corflute-signs-australia/", "custom corflute signs")} page sets out the bundle prices.</p>
        <p>If you want a set in one price, the school pack on our {L("/packs/", "signage packs")} page is {money(schoolPack.price[0]!)}. It includes {schoolPack.includes}. Sports clubs can start from the sponsor banner packs above. Tell us a different mix in the notes and we will quote it.</p>
        <p>The minimum order is $180 per order, not per product. Use the {L("/quote/", "quote form")}. We'll email you a quote with freight included. There is no checkout: approve the quote, then pay by invoice. We email a proof before we print. {MW.TURNAROUND} We do not come to the school or the ground, and we do not install. The gear arrives ready for your volunteers to put up. {L("/delivery/", "Delivery")} is Australia-wide. A carnival that also needs a backdrop is covered on the {L("/event-signage-australia/", "event signage")} page.</p>
      </> },
    ],
    faqs: [
      { q: "What should a school order for an open day?", a: "A banner for the entrance, a flag so people can see you from the street, and corflute for directions. The school pack bundles two PVC banners, two teardrop flags and ten corflute signs." },
      { q: "Can each sponsor have their own banner?", a: "Yes. The sponsor packs include one design per banner. Tell us if you need a different number and the quote confirms the price." },
      { q: "Will the flags stand on an oval?", a: "Each teardrop and feather flag includes a 10kg square base, so it stands on grass or a hard court without a spike. Take flags down in strong wind." },
      { q: "Do you install signs at the school?", a: `No. We print and deliver. We do not visit the school or the ground, and we do not install. We'll email you a quote with freight included. After you approve the quote, you pay by invoice. ${MW.TURNAROUND}` },
    ],
  },
];
