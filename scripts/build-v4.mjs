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
  ["../v4-modular-lightbox/38 Modular Lightbox 1000x2000 - Lifestyle", "v4-lightbox-1000x2000", false],
  ["../v4-modular-lightbox/39 Modular Lightbox 2000x2000 - Lifestyle", "v4-lightbox-2000x2000", false],
  ["../v4-modular-lightbox/40 Modular Lightbox 3000x2000 - Lifestyle", "v4-lightbox-3000x2000", false],
  ["../v4-big-heads/41 Big Head Small with Handle - Lifestyle", "v4-big-head-small", false],
  ["../v4-big-heads/42 Big Head Medium - Lifestyle", "v4-big-head-medium", false],
  ["../v4-big-heads/43 Big Head Large - Lifestyle", "v4-big-head-large", false],
  ["../v4-events/44 SEG Fabric Frame 1 Section - Lifestyle", "v4-seg-frame-1", false],
  ["../v4-events/45 SEG Fabric Frame 2 Sections - Lifestyle", "v4-seg-frame-2", false],
  ["../v4-events/46 SEG Fabric Frame 3 Sections - Lifestyle", "v4-seg-frame-3", false],
  ["../v4-events/61 SEG Fabric Frame 4 Sections - Lifestyle", "v4-seg-frame-4", false],
  ["../v4-events/62 SEG Fabric Frame 5 Sections - Lifestyle", "v4-seg-frame-5", false],
  ["../v4-events/47 Barrier Frame 1000x900 - Lifestyle", "v4-barrier-1000", false],
  ["../v4-events/48 Barrier Frame 1500x900 - Lifestyle", "v4-barrier-1500", false],
  ["../v4-events/49 Barrier Frame 2000x900 - Lifestyle", "v4-barrier-2000", false],
  ["../v4-events/50 Barrier Cover 2100x1100 - Lifestyle", "v4-barrier-cover", false],
  ["../v4-selfie-frames/51 Selfie Frame Small - Lifestyle", "v4-selfie-small", false],
  ["../v4-selfie-frames/52 Selfie Frame Large - Lifestyle", "v4-selfie-large", false],
  ["../v4-car-magnets/53 Car Magnet 290x220 - Lifestyle", "v4-car-magnet-290x220", false],
  ["../v4-car-magnets/54 Car Magnet 440x290 - Lifestyle", "v4-car-magnet-440x290", false],
  ["../v4-car-magnets/55 Car Magnet 600x300 - Lifestyle", "v4-car-magnet-600x300", false],
  ["../v4-car-magnets/56 Car Magnet 600x400 - Lifestyle", "v4-car-magnet-600x400", false],
  ["../v4-business-cards/57 Business Cards Premium Matte - Lifestyle", "v4-cards-premium-matte", false],
  ["../v4-business-cards/58 Business Cards Premium Gloss - Lifestyle", "v4-cards-premium-gloss", false],
  ["../v4-business-cards/59 Business Cards Luxury Velvet - Lifestyle", "v4-cards-luxury-velvet", false],
  ["../v4-business-cards/60 Business Cards Luxury Spot Gloss - Lifestyle", "v4-cards-luxury-spot", false],
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
