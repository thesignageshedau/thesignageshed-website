// Builds the web versions of the product mockups (WebP in two sizes plus a JPG fallback).
// Source: the full-size set in "Product Mockups" next to this site folder; override with MOCKUPS_DIR.
// Run with: npm run images:mockups
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = process.env.MOCKUPS_DIR ?? path.resolve("../Product Mockups");
const OUT = path.resolve("public/images/mockups");
mkdirSync(OUT, { recursive: true });

export const MOCKUPS = {
  "media-wall-single": "Media Wall Mockup - Single Sided - Event Foyer",
  "media-wall-double": "Media Wall Mockup - Double Sided - Expo Hall",
  "media-wall-led": "Media Wall Mockup - LED Backlit - Convention Foyer",
  "table-cover-fitted": "Table Cover Mockup - Fitted - Event Foyer",
  "table-cover-loose": "Table Cover Mockup - Loose Throw - Convention Foyer",
  "pull-up-luxury": "Pull Up Banner Mockup - Luxury - Expo Hall",
  "pull-up-double": "Pull Up Banner Mockup - Double Sided - Event Foyer",
  "corflute-fence": "Corflute Sign Mockup - Cable Tied to Club Fence",
  "corflute-shopfront": "Corflute Sign Mockup - Mounted on Shopfront",
  "aframe-aluminium": "A-Frame Mockup - Printed Aluminium - Cafe Footpath",
  "aframe-insert": "A-Frame Mockup - Insert Frame - Park Path",
  "aframe-real-estate": "A-Frame Mockup - Real Estate 600x450 - Brick House Driveway",
  "aframe-folding": "A-Frame Mockup - Folding Corflute - Bowls Club Path",
  "gazebo-3x3": "Gazebo Mockup - 3x3 with Back Wall - Park Rotunda Lawn",
  "gazebo-6x3": "Gazebo Mockup - 6x3 with Back Wall - Park Pavilion Lawn",
  "flags": "Flag Mockup - Teardrop and Feather - Lakeside Park",
  "umbrella": "Market Umbrella Mockup - Printed Canopy - Garden Path",
};

for (const [slug, name] of Object.entries(MOCKUPS)) {
  const land = `${SRC}/${name}.jpg`;
  const sq = `${SRC}/${name} (Square).jpg`;
  for (const w of [800, 1600]) {
    await sharp(land).resize({ width: w }).webp({ quality: 74 }).toFile(`${OUT}/${slug}-${w}.webp`);
  }
  await sharp(land).resize({ width: 800 }).jpeg({ quality: 76, mozjpeg: true }).toFile(`${OUT}/${slug}-800.jpg`);
  for (const w of [600, 1200]) {
    await sharp(sq).resize({ width: w }).webp({ quality: 74 }).toFile(`${OUT}/${slug}-sq-${w}.webp`);
  }
  await sharp(sq).resize({ width: 600 }).jpeg({ quality: 76, mozjpeg: true }).toFile(`${OUT}/${slug}-sq-600.jpg`);
}
console.log(`Built ${Object.keys(MOCKUPS).length} mockups into ${OUT}`);
