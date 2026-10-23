import type { ReactNode } from "react";
import { helpLink } from "../components/HelpParts";

export type Guide = { slug: string; title: string; summary: string; sections: { id: string; title: string; body: ReactNode }[] };
const L = (href: string, t: string) => <a className={helpLink} href={href}>{t}</a>;

export const GUIDES: Guide[] = [
  {
    slug: "pull-up-banner-size",
    title: "What size pull up banner do I need?",
    summary: "850mm or 1200mm wide, single or double sided: how to pick the right pull up banner for your space.",
    sections: [
      { id: "sizes", title: "The two sizes we print", body: <>
        <p>We print pull up banners in two sizes, and both stand 2000mm tall:</p>
        <ul>
          <li><strong>850 × 2000mm</strong> is the standard size. It fits most spaces.</li>
          <li><strong>1200 × 2000mm</strong> gives you more room for your message. It suits bigger stands, wide logos and artwork with a lot to say.</li>
        </ul>
        <p>At 2000mm tall, the top of the banner stands above head height, so a logo placed up high can be seen across a room.</p>
      </> },
      { id: "space", title: "Measure your space first", body: <>
        <p>Before you choose, measure the spot where the banner will stand. Leave room for people to walk past and for the base, which sits a little deeper than the banner itself. In a tight foyer or beside a door, the narrower 850mm is the easier fit.</p>
        <p>If you're using more than one banner side by side, think about how the artwork lines up. Matching layouts look tidy and read as one display.</p>
      </> },
      { id: "sides", title: "Single or double sided?", body: <>
        <p>A <strong>Luxury</strong> stand has one printed banner, so it suits a spot against a wall or at the back of your stand. A <strong>double sided</strong> stand has a banner rolling out of each side of the base, so people see your message from both directions. That suits the middle of a room, a walkway or a shopfront.</p>
      </> },
      { id: "price", title: "What it costs", body: <>
        <p>Luxury banners are $230 for 850 × 2000mm and $305 for 1200 × 2000mm. Double sided banners are $285 and $385. Every banner is printed in full colour on tear-resistant, low-curl blockout PVC and comes with a carry bag. Prices include everything except delivery, the price each drops as your quantity grows, and the minimum order is $180 (excl. freight).</p>
      </> },
      { id: "artwork", title: "Artwork tips", body: <>
        <p>Keep the bottom 100mm to background only, because it sits low near the base. Put your logo and key message in the top half, where people actually look. Our {L("/artwork-help/#guides", "artwork guides")} have the exact bleed and safe area for each size, and you can see the full range on our {L("/pull-up-banners/", "pull up banners page")}.</p>
      </> },
    ],
  },
  {
    slug: "corflute-vs-rigid-signs",
    title: "Corflute vs other rigid signs: which to choose",
    summary: "Corflute, aluminium composite A-frame panels and insert A-frames compared, so you can pick the right sign for the job.",
    sections: [
      { id: "corflute", title: "Corflute: light, tough and great value", body: <>
        <p>Corflute is a fluted plastic board, like a plastic version of cardboard. It's light, waterproof and cheap to print in quantity, which is why it's the go-to for event signs, directional signs, site boards and short to medium term promotions.</p>
        <p>We print on premium Australian-made corflute, built for outdoor use, in 5mm or 3mm. Choose 5mm when the sign needs to stay flat and stiff, and 3mm for lighter, lower cost runs. Signs come in 600 × 450mm, 600 × 900mm and 900 × 1200mm, single or double sided, with optional eyelets for tying to fences and posts.</p>
        <p>Corflute is priced in bundles: 1 to 5 signs from $180, with the price per sign dropping as your quantity grows. Our {L("/corflute-signs/", "custom corflute signs")} page has an instant price calculator.</p>
      </> },
      { id: "acm", title: "Aluminium composite: our sturdiest option", body: <>
        <p>Aluminium composite panel (often called ACM) is two thin sheets of aluminium bonded to a solid core. It's rigid, flat and much heavier duty than corflute, so it's the choice for signs that need to look sharp for longer.</p>
        <p>Our printed aluminium A-frame uses aluminium composite panels on both faces, printed in full colour and gloss laminated, so they wipe clean and handle the weather.</p>
      </> },
      { id: "inserts", title: "Insert A-frames: the best of both", body: <>
        <p>An insert A-frame has a strong frame with printed 5mm corflute inserts that slide in from the top. You get a sturdy footpath sign, and you can change your message in seconds by re-ordering just the inserts. If you only need a sign for an event or a short promotion, our folding corflute A-frame is light, budget friendly and folds flat.</p>
      </> },
      { id: "choose", title: "Quick way to choose", body: <>
        <ul>
          <li><strong>Lots of signs, short to medium term:</strong> corflute.</li>
          <li><strong>One hard-working footpath sign:</strong> printed aluminium A-frame.</li>
          <li><strong>A message that changes often:</strong> insert A-frame.</li>
          <li><strong>Events and markets on a budget:</strong> folding corflute A-frame.</li>
        </ul>
        <p>See every option and price on our {L("/a-frames/", "A-frame signs")} page. Need something taller to catch eyes from the road? Our {L("/flags/", "feather and teardrop flags")} stand 2.7m to 3.0m tall.</p>
      </> },
    ],
  },
  {
    slug: "print-ready-artwork",
    title: "How to set up print-ready artwork",
    summary: "Size, bleed, safe area, resolution, colour, fonts and file types: a quick checklist before you send your file.",
    sections: [
      { id: "size", title: "1. Start at the right size", body: <>
        <p>Set up your document at the finished size of the product, or use our template. Some of our templates are full size and some are at 10% scale for very large items like media walls. Each product's {L("/artwork-help/#guides", "artwork guide")} tells you which.</p>
      </> },
      { id: "bleed", title: "2. Add bleed", body: <>
        <p>Printers can't cut exactly on the edge every time, so we print a little bigger and trim it back. Run any background colour or image past the finished edge, out to the bleed. If you stop at the edge, a thin white line can show after trimming. The bleed is different for each product.</p>
      </> },
      { id: "safe", title: "3. Keep important things in the safe area", body: <>
        <p>The safe area is the zone inside the finished edge where nothing gets trimmed, folded, hemmed or hidden by a frame or base. Keep text, logos, phone numbers and faces inside it.</p>
      </> },
      { id: "resolution", title: "4. Check your resolution", body: <>
        <p>Images need at least <strong>130 ppi</strong> at the full printed size, and <strong>150 ppi or more</strong> prints crisp. A photo that looks sharp on screen can still be too small for a 2 metre banner. Logos and text are best as vectors, which stay sharp at any size.</p>
      </> },
      { id: "colour", title: "5. Use CMYK colour", body: <>
        <p>Screens show colour in RGB, and printers use CMYK. Supply CMYK for the most accurate colour. RGB files get converted, and very bright greens, blues and oranges can come out duller than on screen.</p>
      </> },
      { id: "fonts", title: "6. Outline or embed your fonts", body: <>
        <p>If we don't have your font, the text can change when we open your file. Convert text to outlines or embed all fonts in your PDF before you export.</p>
      </> },
      { id: "files", title: "7. Send the right file type", body: <>
        <p>A print-ready <strong>PDF</strong> is best. <strong>AI or EPS</strong> files are fine with fonts outlined, and <strong>JPG, PNG or TIFF</strong> files are fine when they're high resolution at full size. Before you send, run your file through our free {L("/check-artwork/", "artwork checker")}. We also check every file and send a digital proof before anything is printed.</p>
        <p>No artwork yet? We can help: a flat $150 to assist with your artwork, or $599 for full design with 2 revisions.</p>
      </> },
    ],
  },
];
