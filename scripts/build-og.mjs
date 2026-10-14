// Builds the 1200x630 Open Graph images in public/og/ (one per page) from the v4 photo set,
// the logo and the page name, in the brand fonts and colours. Rendered with headless Chromium.
// Run with: node scripts/build-og.mjs  (sources default to the side-projects folder; override with SRC_ROOT)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";

const SRC = process.env.SRC_ROOT ?? "/workspace/side-projects";
const V4 = `${SRC}/The Signage Shed Website/Product Mockups/v4 Photo Set`;
const v4 = (n) => `${V4}/${n} - Lifestyle - 1600x1200.jpg`;
const LOGO = `${SRC}/The Signage Shed Brand/Logo Pack 2026 v2 (New Apps)/The Signage Shed Logo Pack 2026 v2/01 Main Logo/Digital - Web PNG and JPG/The Signage Shed Logo - Full Colour (Dark Backgrounds) - 1000px.png`;
const font = (pkg, w) => path.resolve(`node_modules/@fontsource/${pkg}/files/${pkg}-latin-${w}-normal.woff2`);
const data = (f, type) => `data:${type};base64,${readFileSync(f).toString("base64")}`;

// slug: [image, title, tagline]
export const OG_PAGES = {
  home: [v4("03 Media Wall"), "Signs, banners & event gear", "Printed and delivered Australia-wide"],
  "media-walls": [v4("03 Media Wall"), "Media walls", "Fabric backdrops, delivered Australia-wide"],
  "table-covers": [v4("08 Table Cover"), "Table covers", "Printed throws and runners, delivered Australia-wide"],
  "pull-up-banners": [v4("02 Pull Up Banner"), "Pull up banners", "Printed, fitted and delivered Australia-wide"],
  "corflute-signs": [v4("01 Corflute Sign"), "Corflute signs", "Custom printed, delivered Australia-wide"],
  "a-frames": [v4("04 A-Frames"), "A-frame signs", "Printed both sides, delivered Australia-wide"],
  gazebos: [v4("05 Gazebo 3x3"), "Printed gazebos", "Your logo on the canopy, delivered Australia-wide"],
  flags: [v4("06 Flags"), "Teardrop & feather flags", "Printed and delivered Australia-wide"],
  "market-umbrellas": [v4("07 Market Umbrella"), "Market umbrellas", "Printed on every panel, delivered Australia-wide"],
  banners: [v4("09 Mesh Banner"), "Vinyl & mesh banners", "Hemmed, eyeleted and delivered Australia-wide"],
  delivery: [v4("05 Gazebo 3x3"), "Delivery", "Australia-wide, quoted before you pay"],
  "artwork-help": [v4("02 Pull Up Banner"), "Artwork help", "Bleed, safe area, resolution and file setup"],
  "check-artwork": [v4("01 Corflute Sign"), "Check your artwork", "Free print file checker"],
  "for-sign-shops": [path.resolve("public/images/pricing-kit-1600.webp"), "For sign shops", "Pricing spreadsheets for Australian sign shops"],
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const logo = data(LOGO, "image/png");
for (const [slug, [img, title, tag]] of Object.entries(OG_PAGES)) {
  const photo = data(img, img.endsWith(".webp") ? "image/webp" : "image/jpeg");
  await p.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: Ultra; src: url("file://${font("ultra", 400)}"); }
    @font-face { font-family: Zilla; font-weight: 600; src: url("file://${font("zilla-slab", 600)}"); }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; display: grid; grid-template-columns: 500px 700px; background: #33373A; overflow: hidden; }
    .l { position: relative; padding: 44px 48px; display: flex; flex-direction: column; justify-content: space-between; color: #F2EBDD; }
    .l img { width: 230px; }
    h1 { font: 400 54px/1.08 Ultra, serif; margin-top: 8px; }
    .rule { width: 72px; height: 6px; background: #C0582F; margin-bottom: 18px; }
    p { font: 600 26px/1.3 Zilla, serif; color: #E8946C; margin-top: 16px; }
    .r { background: url(${photo}) center/cover; }
    .s { position: absolute; left: 0; bottom: 0; width: 1200px; height: 14px; background: #C0582F; }
  </style></head><body><div class="l"><img src="${logo}"><div><div class="rule"></div><h1>${title}</h1><p>${tag.replace("Australia-wide", "<span style=\"white-space:nowrap\">Australia-wide</span>")}</p></div></div><div class="r"></div><div class="s"></div></body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `public/og/${slug}.jpg`, type: "jpeg", quality: 84 });
}
await b.close();
console.log(`Built ${Object.keys(OG_PAGES).length} OG images`);
