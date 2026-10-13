// Adds the in-between WebP sizes used by srcset (480 and 1200 wide for landscape mockups and
// product images, 480 and 800 for square mockups), resized down from the largest web copy.
// Run with: node scripts/build-responsive.mjs
import sharp from "sharp";
import { readdirSync, existsSync } from "node:fs";

const jobs = [];
const M = "public/images/mockups";
for (const f of readdirSync(M)) {
  let m;
  if ((m = f.match(/^(.*)-sq-1200\.webp$/))) for (const w of [480, 800]) jobs.push([`${M}/${f}`, `${M}/${m[1]}-sq-${w}.webp`, w]);
  else if ((m = f.match(/^(.*)-1600\.webp$/))) for (const w of [480, 1200]) jobs.push([`${M}/${f}`, `${M}/${m[1]}-${w}.webp`, w]);
}
const I = "public/images";
for (const f of readdirSync(I)) {
  const m = f.match(/^(.*)-1600\.webp$/);
  if (m) for (const w of [480, 1200]) jobs.push([`${I}/${f}`, `${I}/${m[1]}-${w}.webp`, w]);
}
for (const [src, out, w] of jobs) {
  if (existsSync(out)) continue;
  await sharp(src).resize({ width: w }).webp({ quality: 74 }).toFile(out);
}
console.log(`${jobs.length} sizes checked`);
