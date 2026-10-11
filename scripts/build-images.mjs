// Regenerates the web images in public/ from the original brand and listing files.
// Only needed when the source artwork changes. Run with: npm run images
// Source folder defaults to the side-projects folder on the build box; override with SRC_ROOT.
import sharp from "sharp";
import { mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";

const SRC = process.env.SRC_ROOT ?? "/workspace/side-projects";
const OUT = path.resolve("public");
const LOGO = `${SRC}/The Signage Shed Brand/Logo Pack 2026 v2 (New Apps)/The Signage Shed Logo Pack 2026 v2`;
const MAIN = `${LOGO}/01 Main Logo/Digital - Web PNG and JPG`;
const BADGE = `${LOGO}/02 Badge Icon/Digital - Web PNG and JPG`;

const products = {
  "pricing-kit": `${SRC}/sign-shop-pricing-kit/Preview Images v2 (New Logo)/Preview 2 - Quote Calculator.jpg`,
  "job-costing": `${SRC}/Spreadsheets/Sign Shop Job Costing & Profit Calculator/Listing Images/01 Know Which Jobs Make Money.png`,
  "vehicle-wrap": `${SRC}/Spreadsheets/Vehicle Wrap Quote Calculator/Listing Images/01 Quote Any Vehicle Wrap In Minutes.png`,
  "template-kit": `${SRC}/Signage Templates Pack/Listing Images/Listing Image 1 - Cover.png`,
  "bundle": `${SRC}/Signage Templates Pack/Bundle Listing Images/Bundle Image 1 - Cover.png`,
  "christmas-window-pack": `${SRC}/Shopfront Window Graphics Pack/Refresh Build/Listing Images v4 (Oct 2026)/Listing Image 1 - Photo 1, Real Shopfront.jpg`,
  "black-friday-window-pack": `${SRC}/Black Friday Window Pack/Refresh Build/Listing Images v4 (Oct 2026)/Listing Image 1 - Photo 1, Real Shopfront.jpg`,
};

const CHARCOAL = { r: 51, g: 55, b: 58, alpha: 1 };
mkdirSync(`${OUT}/images`, { recursive: true });
mkdirSync(`${OUT}/icons`, { recursive: true });

for (const [name, file] of Object.entries(products)) {
  for (const w of [800, 1600]) {
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 })
      .toFile(`${OUT}/images/${name}-${w}.webp`);
  }
}

// Logos
for (const w of [480, 960]) {
  await sharp(`${MAIN}/The Signage Shed Logo - Full Colour (Dark Backgrounds) - 2000px.png`)
    .resize({ width: w }).webp({ quality: 85 }).toFile(`${OUT}/images/logo-sign-${w}.webp`);
}
for (const w of [96, 192]) {
  await sharp(`${BADGE}/The Signage Shed Badge Icon - Full Colour (Dark Backgrounds) - 1000px.png`)
    .resize({ width: w }).webp({ quality: 90 }).toFile(`${OUT}/images/badge-${w}.webp`);
}

// Favicons
copyFileSync(`${BADGE}/The Signage Shed Badge Icon - Favicon.ico`, `${OUT}/favicon.ico`);
copyFileSync(`${BADGE}/The Signage Shed Badge Icon - Favicon 32px.png`, `${OUT}/icons/favicon-32.png`);
copyFileSync(`${BADGE}/The Signage Shed Badge Icon - Favicon 192px.png`, `${OUT}/icons/icon-192.png`);
copyFileSync(`${BADGE}/The Signage Shed Badge Icon - Favicon 512px.png`, `${OUT}/icons/icon-512.png`);
await sharp(`${BADGE}/The Signage Shed Badge Icon - Full Colour (Dark Backgrounds) - 1000px.png`)
  .resize(150, 150).extend({ top: 15, bottom: 15, left: 15, right: 15, background: CHARCOAL })
  .flatten({ background: CHARCOAL }).png().toFile(`${OUT}/icons/apple-touch-icon.png`);

// Open Graph image 1200x630: hanging sign logo on charcoal with a rust base stripe
const logo = await sharp(`${MAIN}/The Signage Shed Logo - Full Colour (Dark Backgrounds) - 2000px.png`)
  .resize({ height: 470 }).toBuffer();
const stripe = await sharp({ create: { width: 1200, height: 14, channels: 4, background: { r: 192, g: 88, b: 47, alpha: 1 } } }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: CHARCOAL } })
  .composite([{ input: logo, gravity: "center" }, { input: stripe, top: 616, left: 0 }])
  .jpeg({ quality: 85 }).toFile(`${OUT}/og-image.jpg`);

console.log("Images built");
