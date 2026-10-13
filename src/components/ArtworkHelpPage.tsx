import FaqSchema from "./FaqSchema";
import { HelpCta, HelpFaq, HelpHero, HelpSection, helpLink } from "./HelpParts";
import { asset } from "../lib/asset";
import { CHECK_ARTWORK_HREF } from "../lib/routes";
import { QUOTE_EMAIL } from "../data/mediaWalls";

const guides: { product: string; items: [string, string][] }[] = [
  { product: "Pull up banners", items: [
    ["Luxury 850 × 2000mm", "pull-up-banners/luxury-850x2000mm"],
    ["Luxury 1200 × 2000mm", "pull-up-banners/luxury-1200x2000mm"],
    ["Double sided 850 × 2000mm", "pull-up-banners/double-sided-850x2000mm"],
    ["Double sided 1200 × 2000mm", "pull-up-banners/double-sided-1200x2000mm"],
  ] },
  { product: "Media walls", items: [
    ["2.4m × 2.2m", "media-walls/media-wall-2-4m-x-2-2m"],
    ["3m × 2.2m", "media-walls/media-wall-3m-x-2-2m"],
    ["4m × 2.2m", "media-walls/media-wall-4m-x-2-2m"],
  ] },
  { product: "Corflute signs", items: [
    ["600 × 450mm", "corflute-signs/corflute-sign-600x450mm"],
    ["600 × 900mm", "corflute-signs/corflute-sign-600x900mm"],
    ["900 × 1200mm", "corflute-signs/corflute-sign-900x1200mm"],
  ] },
  { product: "A-frames", items: [
    ["Printed A-frame 600 × 900mm", "a-frames/printed-a-frame-600x900mm"],
    ["Insert A-frame 600 × 900mm", "a-frames/insert-a-frame-600x900mm"],
    ["Real estate A-frame 600 × 450mm", "a-frames/real-estate-a-frame-600x450mm"],
    ["Folding corflute A-frame 600 × 950mm", "a-frames/folding-corflute-a-frame-600x950mm"],
  ] },
  { product: "Table covers", items: [
    ["Fitted throw 6ft, 3 sided", "table-covers/fitted-throw-6ft-3-sided"],
    ["Fitted throw 6ft, 4 sided", "table-covers/fitted-throw-6ft-4-sided"],
    ["Fitted throw 8ft, 3 sided", "table-covers/fitted-throw-8ft-3-sided"],
    ["Fitted throw 8ft, 4 sided", "table-covers/fitted-throw-8ft-4-sided"],
    ["Loose throw 6ft, 3 sided", "table-covers/loose-throw-6ft-3-sided"],
    ["Loose throw 6ft, 4 sided", "table-covers/loose-throw-6ft-4-sided"],
    ["Round throw 1520mm, full drop", "table-covers/round-throw-1520mm-full-drop"],
    ["Round throw 1520mm, half drop", "table-covers/round-throw-1520mm-half-drop"],
    ["Front drop runner 610 × 2006mm", "table-covers/runner-front-drop-610x2006mm"],
    ["Front drop runner 914 × 2006mm", "table-covers/runner-front-drop-914x2006mm"],
  ] },
];

function BleedDiagram() {
  return (
    <figure className="rounded-xl border border-charcoal/15 bg-white p-4">
      <svg viewBox="0 0 300 200" role="img" aria-labelledby="bleed-t" className="w-full">
        <title id="bleed-t">Bleed: the artwork runs past the finished edge and the extra is trimmed off</title>
        <rect x="10" y="10" width="280" height="180" fill="#b4532a" opacity="0.25" />
        <rect x="35" y="35" width="230" height="130" fill="#f5efe3" />
        <rect x="10" y="10" width="280" height="180" fill="none" stroke="#b4532a" strokeDasharray="4 3" />
        <rect x="35" y="35" width="230" height="130" fill="none" stroke="#33373a" strokeWidth="2" />
        <text x="150" y="27" textAnchor="middle" fontSize="12" fill="#7a3518">Bleed (trimmed off)</text>
        <text x="150" y="105" textAnchor="middle" fontSize="13" fill="#33373a">Finished size</text>
      </svg>
      <figcaption className="mt-2 text-sm text-charcoal/80">Background colour and images run out into the bleed. The solid line is where it's cut.</figcaption>
    </figure>
  );
}

function SafeDiagram() {
  return (
    <figure className="rounded-xl border border-charcoal/15 bg-white p-4">
      <svg viewBox="0 0 300 200" role="img" aria-labelledby="safe-t" className="w-full">
        <title id="safe-t">Safe area: keep text and logos inside the inner box</title>
        <rect x="10" y="10" width="280" height="180" fill="#f5efe3" stroke="#33373a" strokeWidth="2" />
        <rect x="45" y="40" width="210" height="120" fill="#2f6b4f" opacity="0.12" stroke="#2f6b4f" strokeDasharray="5 4" />
        <text x="150" y="95" textAnchor="middle" fontSize="13" fill="#1f4a36">Safe area</text>
        <text x="150" y="113" textAnchor="middle" fontSize="11" fill="#1f4a36">text, logos, phone numbers</text>
        <text x="150" y="30" textAnchor="middle" fontSize="11" fill="#33373a">Finished edge</text>
      </svg>
      <figcaption className="mt-2 text-sm text-charcoal/80">Anything important stays inside the dashed box, clear of trims, folds, hems and frames.</figcaption>
    </figure>
  );
}

const faqs = [
  { q: "What file type should I send?", a: <>A print-ready PDF is best. High resolution JPG and PNG files are fine too.</> },
  { q: "What resolution does my artwork need?", a: <>At least 130 ppi at the full printed size, and 150 ppi or more for a crisp print. Logos and text are best as vectors.</> },
  { q: "Should my artwork be CMYK or RGB?", a: <>CMYK. We print in CMYK, so RGB files are converted and some bright colours can come out duller.</> },
  { q: "Do I need to add bleed?", a: <>Yes. Run your background past the finished edge by the bleed shown in your product's artwork guide.</> },
  { q: "How do I send my files?", a: <>Paste a link (Google Drive, WeTransfer or Dropbox) in the quote form, or reply to our quote email with your files attached.</> },
  { q: "Can you check my artwork?", a: <>Yes. Run it through our free <a className={helpLink} href={CHECK_ARTWORK_HREF}>artwork checker</a> first, and we also check every file and send a digital proof before anything is printed.</> },
];

export default function ArtworkHelpPage() {
  return (
    <>
      <HelpHero eyebrow="Artwork help" title="Setting up your print file">
        <p>Plain-English guides to getting your artwork print-ready: bleed, the safe area, resolution, colour, fonts and file types.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={CHECK_ARTWORK_HREF} className="btn-rust" data-track="artwork-help-checker">Check your artwork now</a>
          <a href="#guides" className="btn-ghost-light">Artwork guides</a>
        </div>
      </HelpHero>

      <HelpSection id="bleed" title="Bleed" aside={<BleedDiagram />}>
        <p>Printers can't cut exactly on the edge every time, so we print a little bigger and trim it back. That extra margin is the <strong>bleed</strong>.</p>
        <p>Run any background colour or image past the finished edge, all the way out to the bleed. If you stop at the edge, a thin white line can show after trimming.</p>
        <p>The bleed is different for each product. Your product's artwork guide shows it.</p>
      </HelpSection>

      <HelpSection id="safe-area" title="The safe area" aside={<SafeDiagram />}>
        <p>The <strong>safe area</strong> is the zone inside the finished edge where nothing important gets trimmed, folded, hemmed or hidden by a frame or base.</p>
        <p>Keep text, logos, phone numbers and faces inside it. Backgrounds can still run to the bleed.</p>
      </HelpSection>

      <HelpSection id="resolution" title="Resolution">
        <p>Resolution is how much image detail there is at the size we print, measured in pixels per inch (ppi) at full size.</p>
        <ul>
          <li><strong>130 ppi</strong> at full size is our minimum.</li>
          <li><strong>150 ppi or more</strong> prints crisp.</li>
        </ul>
        <p>A photo that looks sharp on screen can still be too small for a 2 metre banner. Our artwork checker works out the effective ppi for you.</p>
      </HelpSection>

      <HelpSection id="colour" title="CMYK vs RGB">
        <p>Screens show colour in <strong>RGB</strong> (light). Printers use <strong>CMYK</strong> (ink). We print in CMYK, so set your file up in CMYK.</p>
        <p>RGB files get converted, and very bright greens, blues and oranges can come out duller than on screen.</p>
      </HelpSection>

      <HelpSection id="fonts" title="Outline your fonts">
        <p>If we don't have your font, the text can change when we open your file. Before you export, convert text to outlines (in Illustrator, <em>Type › Create Outlines</em>) or embed all fonts in your PDF.</p>
      </HelpSection>

      <HelpSection id="file-types" title="File types">
        <ul>
          <li><strong>PDF</strong> is preferred: print-ready, with fonts outlined or embedded.</li>
          <li><strong>JPG or PNG</strong> are fine when they're high resolution at full size.</li>
        </ul>
      </HelpSection>

      <HelpSection id="vector" title="Vector vs raster">
        <p><strong>Vector</strong> artwork (logos and text from Illustrator, or a vector PDF) is made of shapes, so it stays sharp at any size.</p>
        <p><strong>Raster</strong> artwork (photos, JPG and PNG) is made of pixels, so it goes soft or blocky when it's stretched too far. That's why resolution matters.</p>
        <p>Where you can, use vector logos and text, and keep photos at 150 ppi or more at full size.</p>
      </HelpSection>

      <HelpSection id="scale" title="10% scale templates for large items">
        <p>Full-size files for big items like media walls and table covers are huge. Our templates for these are at <strong>10% scale</strong>: design at one tenth of the real size, including the bleed.</p>
        <p>At 10% scale, images need ten times the resolution (for example 1500 ppi in the file to print at 150 ppi).</p>
      </HelpSection>

      <HelpSection id="send" title="How to send your files">
        <p>Files can't be attached to our quote form, so either:</p>
        <ul>
          <li>paste a <strong>link</strong> (Google Drive, WeTransfer or Dropbox) into the Artwork link field on the <a className={helpLink} href="#/quote">quote form</a>, or</li>
          <li><strong>reply to our quote email</strong> with your files attached, or email <a className={helpLink} href={`mailto:${QUOTE_EMAIL}`}>{QUOTE_EMAIL}</a>.</li>
        </ul>
        <p>No artwork yet? Send your logo and wording and we'll set it up for you. You'll always see a digital proof before we print.</p>
      </HelpSection>

      <section id="guides" aria-labelledby="guides-h" className="scroll-mt-20 py-10 sm:py-12">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="rule mb-4" />
          <h2 id="guides-h" className="text-3xl sm:text-4xl">Artwork guides and templates</h2>
          <p className="mt-4 max-w-3xl text-lg">Each guide shows the artwork size, bleed and safe area for that product. Templates are PDFs you can design on.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <div key={g.product} className="rounded-xl border border-charcoal/15 bg-white p-5">
                <h3 className="font-slab text-xl font-bold">{g.product}</h3>
                <ul className="mt-3 space-y-2">
                  {g.items.map(([label, path]) => (
                    <li key={path}>
                      <span className="block font-semibold">{label}</span>
                      <a className={helpLink} href={asset(`downloads/${path}-artwork-guide.pdf`)} target="_blank" rel="noopener">Guide (PDF)</a>
                      {" · "}
                      <a className={helpLink} href={asset(`downloads/${path}-artwork-template.pdf`)} target="_blank" rel="noopener">Template (PDF)</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HelpFaq faqs={faqs} />
      <FaqSchema page="artwork-help" />

      <HelpCta title="Ready to check your file?">
        <a href={CHECK_ARTWORK_HREF} className="btn-rust">Check your artwork</a>
        <a href="#/quote" className="btn-ghost-light" data-track="artwork-help-quote">Get a quote</a>
      </HelpCta>
    </>
  );
}
