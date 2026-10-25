// Builds the v4 photo set into public/images/mockups (same naming as the other mockups) and the
// How it works strip into public/images. Run with: node scripts/build-v4.mjs "<v4 folder>"
import sharp from "sharp";
const SRC = process.argv[2];
const M = "public/images/mockups";
// [file prefix, slug, make square crops?] Squares are skipped where the crop cuts off the product.
const SCENES = [
  ["01 Corflute Sign - Lifestyle", "v4-corflute", true],
  ["02 Pull Up Banner - Lifestyle", "v4-pull-up", true],
  ["03 Media Wall - Lifestyle", "v4-media-wall", true],
  ["04 A-Frames - Lifestyle", "v4-aframes", false],
  ["05 Gazebo 3x3 - Lifestyle", "v4-gazebo", true],
  ["06 Flags - Lifestyle", "v4-flags", true],
  ["07 Market Umbrella - Lifestyle", "v4-umbrella", true],
  ["08 Table Cover - Lifestyle", "v4-table-cover", false],
  ["09 Mesh Banner - Lifestyle", "v4-mesh-banner", false],
  ["10 Pull Up Banner - Scale", "v4-pull-up-scale", true],
  ["11 Media Wall - Scale", "v4-media-wall-scale", false],
  ["12 A-Frame - Scale", "v4-aframe-scale", true],
  ["13 Corflute - Scale", "v4-corflute-scale", true],
  ["14 Corflute Edge - Close-up", "v4-corflute-edge", true],
  ["15 Banner Eyelet - Close-up", "v4-banner-eyelet", true],
  ["16 Fabric Texture - Close-up", "v4-fabric-texture", true],
  ["17 Media Wall Double Sided - Lifestyle", "v4-media-wall-double", true],
  ["18 Media Wall LED Backlit - Lifestyle", "v4-media-wall-led", true],
  ["19 Gazebo 3x3 Back Wall - Lifestyle", "v4-gazebo-3x3-wall", true],
  ["20 Gazebo 6x3 Back Wall - Lifestyle", "v4-gazebo-6x3-wall", false],
  ["21 Corflute Sign Wall - Lifestyle", "v4-corflute-wall", true],
  ["22 A-Frame Printed - Lifestyle", "v4-aframe-printed", true],
  ["23 A-Frame Insert - Lifestyle", "v4-aframe-insert", true],
  ["24 A-Frame Corflute Folding - Lifestyle", "v4-aframe-corflute", true],
  ["25 A-Frame Small 600x450 - Lifestyle", "v4-aframe-small", true],
  ["26 Pull Up Banner Double Sided - Lifestyle", "v4-pull-up-double", true],
  ["27 Table Throw - Lifestyle", "v4-table-throw", true],
  ["28 Teardrop Flags - Lifestyle", "v4-flags-teardrop", true],
  ["29 PVC Banner Fence - Lifestyle", "v4-pvc-banner", true],
  ["30 Mesh Banner Event Fence - Lifestyle", "v4-mesh-banner-event", true],
  ["31 Stretch Fabric Display - Lifestyle", "v4-stretch-fabric", true],
  ["32 Table-Top Banner - Lifestyle", "v4-table-top-banner", false],
  ["33 ACM Sign - Lifestyle", "v4-acm-sign", true],
  ["34 Rectangle Flags - Lifestyle", "v4-rectangle-flags", true],
  ["35 Teardrop Flag Sizes - Lifestyle", "v4-teardrop-sizes", false],
  ["36 Feather Flag Sizes - Lifestyle", "v4-feather-sizes", false],
];
const ONLY = process.env.ONLY?.split(",");
for (const [f, slug, sq] of SCENES.filter(([, s]) => !ONLY || ONLY.includes(s))) {
  const land = `${SRC}/${f} - 1600x1200.jpg`;
  for (const w of [320, 480, 640, 800, 1200, 1600]) await sharp(land).resize({ width: w }).webp({ quality: 68, effort: 6, smartSubsample: true }).toFile(`${M}/${slug}-${w}.webp`);
  await sharp(land).resize({ width: 800 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${M}/${slug}-800.jpg`);
  if (sq) {
    const s = `${SRC}/${f} - 1200x1200.jpg`;
    for (const w of [320, 480, 600, 640, 800, 1200]) await sharp(s).resize({ width: w }).webp({ quality: 68, effort: 6, smartSubsample: true }).toFile(`${M}/${slug}-sq-${w}.webp`);
    await sharp(s).resize({ width: 600 }).jpeg({ quality: 78, mozjpeg: true }).toFile(`${M}/${slug}-sq-600.jpg`);
  }
}
if (ONLY) process.exit(0);
const H = `${SRC}/How It Works`;
for (const w of [800, 1600]) await sharp(`${H}/How It Works - Desktop 1600x400 @2x.png`).resize({ width: w }).webp({ quality: 82 }).toFile(`public/images/how-it-works-desktop-${w}.webp`);
for (const w of [400, 800]) await sharp(`${H}/How It Works - Mobile 800x1400 @2x.png`).resize({ width: w }).webp({ quality: 82 }).toFile(`public/images/how-it-works-mobile-${w}.webp`);
await sharp(`${H}/How It Works - Desktop 1600x400.png`).jpeg({ quality: 80 }).toFile("public/images/how-it-works-desktop-1600.jpg");
console.log("done");
