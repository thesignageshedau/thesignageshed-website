// New products (checked 25 Oct 2026). Supplier REGULAR price inc GST for each exact quantity ÷ 0.7 (repriced 26 Nov 2026),
// rounded UP to the next $5. Pricing records: /workspace/pricing/*-2026-10-25.csv. Standard sizes only.
import { AREA_RATES } from "./areaRates";
const R = (k: keyof typeof AREA_RATES) => AREA_RATES[k].fromPerM2;
import { MOCKUPS } from "./mockups";
import type { GearFaq, GearProduct } from "./eventGear";

const COMMON_FAQS: GearFaq[] = [
  { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
  { q: "How much is delivery?", a: "Freight depends on the product's size and weight. We quote it to your postcode and include it on your quote. See our Delivery page for how it works." },
  { q: "How do I pay?", a: "Payment is due once your artwork is approved." },
];
const BANDS_EACH = [{ label: "Price each", min: 1 }];

export const LIGHTBOX: GearProduct = {
  slug: "lightbox-displays",
  eventName: "lightbox",
  subject: "Modular lightbox display quote",
  noun: "lightbox",
  pageTitle: "Modular Lightbox Displays Australia | The Signage Shed",
  description: "Freestanding backlit SEG fabric lightbox displays in 1000 × 2000mm, 2000 × 2000mm and 3000 × 2000mm, single or double sided, with a carry bag. Delivered Australia-wide.",
  eyebrow: "Backlit lightbox displays, delivered Australia-wide",
  heading: "Modular lightbox displays that glow",
  intro: "A freestanding modular frame lit from inside, with your artwork printed on silicone-edged fabric that pushes into the frame. Bright enough to stand out across an expo hall, foyer or shop floor.",
  teaserTitle: "Modular lightbox displays",
  teaserText: "Backlit fabric lightboxes 1, 2 or 3m wide and 2m tall, single or double sided.",
  groups: [
    { id: "1000", title: "1000 × 2000mm", text: "A tall, slim lightbox, about the footprint of a wide pull up banner." },
    { id: "2000", title: "2000 × 2000mm", text: "A square 2 × 2m wall of light for a stand or foyer." },
    { id: "3000", title: "3000 × 2000mm", text: "A wide 3m backdrop for an expo stand or event." },
  ],
  bands: [{label: "1", min: 1}, {label: "2", min: 2}, {label: "3 to 4", min: 3}, {label: "5+", min: 5}],
items: [
    { id: "1000x2000-single", group: "1000", label: "Modular lightbox 1000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 1430], [2, 2860], [3, 4221], [5, 6605]], price: [1430, 1430, 1407, 1321] },
    { id: "1000x2000-double", group: "1000", label: "Modular lightbox 1000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 1645], [2, 3286], [3, 4857], [5, 7595]], price: [1645, 1643, 1619, 1519] },
    { id: "2000x2000-single", group: "2000", label: "Modular lightbox 2000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 2265], [2, 4526], [3, 6681], [5, 10455]], price: [2265, 2263, 2227, 2091] },
    { id: "2000x2000-double", group: "2000", label: "Modular lightbox 2000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 2605], [2, 5206], [3, 7686], [5, 12025]], price: [2605, 2603, 2562, 2405] },
    { id: "3000x2000-single", group: "3000", label: "Modular lightbox 3000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 2800], [2, 5596], [3, 8262], [5, 12925]], price: [2800, 2798, 2754, 2585] },
    { id: "3000x2000-double", group: "3000", label: "Modular lightbox 3000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 3220], [2, 6436], [3, 9501], [5, 14865]], price: [3220, 3218, 3167, 2973] },
],
  notes: [
    "Indoor use only.",
    "Single sided: your print on the front and a blank fabric on the back, which keeps the light in so your print stays bright.",
    "Double sided: printed on both faces, so it works in the middle of a room.",
    "Needs a power point nearby.",
  ],
  artwork: "Lightbox fabrics are printed from a full-size template for your size. Ask for the template with your quote, or send us your logo and wording and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What's included?", a: "The modular backlit frame, your printed fabric (plus a blank back fabric on single sided displays) and a carry bag. Assembly instructions come with it." },
    { q: "Can I use it outdoors?", a: "No. Lightbox displays are for indoor use, as wind can blow them over." },
    { q: "Can I change the graphic later?", a: "Yes. The fabric has a silicone edge that pulls out and pushes back in, so you can order a new print for the same frame. Lightbox fabric is a special backlit fabric, so standard fabric prints won't look right in it." },
    { q: "Do you set it up?", a: "No, you put it together yourself using the instructions supplied. The frame pieces connect, then you plug it in and fit the fabrics." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4Lightbox1000,
  gallery: [MOCKUPS.v4Lightbox1000, MOCKUPS.v4Lightbox2000, MOCKUPS.v4Lightbox3000],
  galleryHeading: "1, 2 or 3 metres wide",
  notesHint: "Where it will stand, power access, colours or design ideas",
};

export const BIG_HEADS: GearProduct = {
  slug: "big-head-cutouts",
  eventName: "big_head",
  subject: "Big head cutout quote",
  noun: "cutout",
  pageTitle: "Big Head Cutouts Australia: Custom Printed | The Signage Shed",
  description: "Custom big head cutouts in small (380mm, with handle), medium (600mm) and large (900mm), printed and cut to shape. Great for footy, birthdays, weddings and parties.",
  eyebrow: "Big head cutouts, delivered Australia-wide",
  heading: "Big head cutouts for game day and parties",
  intro: "Send us a photo and we print it, cut to the outline, on a light rigid board. Wave them in the stands, hand them out at a party or line them up at a wedding.",
  teaserTitle: "Big head cutouts",
  teaserText: "Printed and cut to shape in three sizes, from a 380mm hand-held to a 900mm giant head.",
  groups: [
    { id: "small", title: "Small (380mm tall) with handle", text: "A hand-held size with a handle, for crowds and parties." },
    { id: "medium", title: "Medium (600mm tall)", text: "A bigger head that shows up in photos from across the room." },
    { id: "large", title: "Large (900mm tall)", text: "Our biggest head, for the front row or a party centrepiece." },
  ],
  bands: [{label: "1 to 4", min: 1}, {label: "5 to 9", min: 5}, {label: "10 to 19", min: 10}, {label: "20 to 49", min: 20}, {label: "50+", min: 50}],
items: [
    { id: "small-cf", group: "small", label: "Big head cutout small 380mm with handle, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 200], [5, 200], [10, 200], [20, 200], [50, 300]], price: [200, 40, 20, 10, 6] },
    { id: "small-pvc", group: "small", label: "Big head cutout small 380mm with handle, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 200], [5, 200], [10, 200], [20, 340], [50, 700]], price: [200, 40, 20, 17, 14] },
    { id: "medium-cf", group: "medium", label: "Big head cutout medium 600mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 200], [5, 200], [10, 200], [20, 280], [50, 550]], price: [200, 40, 20, 14, 11] },
    { id: "medium-pvc", group: "medium", label: "Big head cutout medium 600mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 200], [5, 215], [10, 400], [20, 700], [50, 1550]], price: [200, 43, 40, 35, 31] },
    { id: "large-cf", group: "large", label: "Big head cutout large 900mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 200], [5, 210], [10, 310], [20, 500], [50, 1050]], price: [200, 42, 31, 25, 21] },
    { id: "large-pvc", group: "large", label: "Big head cutout large 900mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 200], [5, 430], [10, 760], [20, 1380], [50, 3150]], price: [200, 86, 76, 69, 63] },
],
  notes: [
    "Printed single sided and cut to the outline of your image.",
    "3mm corrugated plastic is light and suits outdoor events. 3mm foam PVC is smooth and suits indoor use.",
    "The more you order, the lower the price each.",
  ],
  artwork: "Send us a clear, well lit photo and we'll cut out the head for you and send a proof to approve. Only use photos you have permission to use.",
  faqs: [
    { q: "Which material should I choose?", a: "Corrugated plastic is light and moisture-resistant, so it suits outdoor events like footy and fun runs. Foam PVC has a smoother finish and suits indoor parties." },
    { q: "Do they all have handles?", a: "The small size comes with a handle. Medium and large are flat cutouts without one." },
    { q: "Can I have different faces?", a: "Prices are for 1 design. More designs cost a little more, and your quote confirms the price." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4BigHeadLarge,
  gallery: [MOCKUPS.v4BigHeadSmall, MOCKUPS.v4BigHeadMedium, MOCKUPS.v4BigHeadLarge],
  galleryHeading: "Small, medium or large",
  notesHint: "Event date, how many faces, which size and material",
};

export const SEG_AFRAMES: GearProduct = {
  slug: "seg-fabric-frames",
  eventName: "seg_aframe",
  subject: "SEG fabric frame quote",
  noun: "frame",
  pageTitle: "SEG Fabric Frame Displays for Sport & Events | The Signage Shed",
  description: "Free-standing SEG fabric frame displays that link together, 717mm tall and 559mm to 2794mm long. Sponsor signage for pool decks, sidelines and fun runs, delivered Australia-wide.",
  eyebrow: "SEG fabric frames, delivered Australia-wide",
  heading: "SEG fabric frames for sidelines and pool decks",
  intro: "A low, free-standing aluminium frame with a double-sided printed fabric graphic tensioned into it by its silicone edge (SEG). Sections link into one long run of signage. It is not lit: for a glowing display, see our lightboxes. Great for local sports clubs and events: along a pool lane, a sideline, a fun run finish chute or in front of a stage, with room for every sponsor.",
  teaserTitle: "SEG fabric frames",
  teaserText: "Low, linking SEG fabric frames for sponsor signage at pools, sidelines and fun runs.",
  groups: [
    { id: "segaf", title: "SEG fabric frame kit (717mm tall)", text: "Frame and printed fabric graphic. Each section is 559mm wide, so choose how many link together." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 4", min: 2}, {label: "5 to 9", min: 5}, {label: "10+", min: 10}],
items: [
    { id: "1-frame", group: "segaf", label: "SEG fabric frame 559 × 717mm (1 section)", short: "559 × 717mm · 1 section", includes: "Frame and printed fabric graphic", tiers: [[1, 305], [2, 590], [5, 1365], [10, 2580]], price: [305, 295, 273, 258] },
    { id: "2-frames", group: "segaf", label: "SEG fabric frame 1118 × 717mm (2 sections)", short: "1118 × 717mm · 2 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 565], [2, 1066], [5, 2440], [10, 4690]], price: [565, 533, 488, 469] },
    { id: "3-frames", group: "segaf", label: "SEG fabric frame 1676 × 717mm (3 sections)", short: "1676 × 717mm · 3 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 820], [2, 1500], [5, 3495], [10, 6890]], price: [820, 750, 699, 689] },
    { id: "4-frames", group: "segaf", label: "SEG fabric frame 2235 × 717mm (4 sections)", short: "2235 × 717mm · 4 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 1040], [2, 1930], [5, 4545], [10, 9090]], price: [1040, 965, 909, 909] },
    { id: "5-frames", group: "segaf", label: "SEG fabric frame 2794 × 717mm (5 sections)", short: "2794 × 717mm · 5 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 1255], [2, 2356], [5, 5645], [10, 11290]], price: [1255, 1178, 1129, 1129] },
],
  notes: [
    "The fabric has a silicone edge that fits into the frame without tools.",
    "Longer runs than 5 sections are available. Ask us in the Notes box and we'll quote it.",
  ],
  artwork: "SEG frame fabrics are printed from a full-size template for your length. Ask for the template with your quote, or send us your sponsor logos and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What are they good for?", a: "Sponsor and event signage that sits low, so it doesn't block the view: pool decks, sidelines, fun run chutes, presentation areas and stage fronts." },
    { q: "How do the sections link?", a: "Each section is 559mm wide and 717mm tall. Order 1 to 5 sections as one kit, with one printed fabric graphic to suit the full length." },
    { q: "Can I change the graphics?", a: "Yes. The fabric has a silicone edge that pulls out and pushes back in, so you can swap sponsors with a new print on the same frame." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4SegFrame3,
  gallery: [MOCKUPS.v4SegFrame1, MOCKUPS.v4SegFrame2, MOCKUPS.v4SegFrame3, MOCKUPS.v4SegFrame4, MOCKUPS.v4SegFrame5],
  galleryHeading: "1 to 5 sections long",
  notesHint: "Event or club, how many sponsors, length needed, colours",
};

export const BARRIERS: GearProduct = {
  slug: "crowd-barriers",
  eventName: "barrier",
  subject: "Barrier frame or cover quote",
  noun: "barrier",
  pageTitle: "Crowd Barrier Frames & Covers Australia | The Signage Shed",
  description: "Printed fabric barrier frames (1000, 1500 or 2000mm wide) and covers for standard 2100 × 1100mm steel crowd control barriers. For events, fun runs and sports clubs.",
  eyebrow: "Crowd barrier frames and covers, delivered Australia-wide",
  heading: "Branded barriers for events and sports clubs",
  intro: "Turn queue lines, finish chutes and sidelines into sponsor signage. Choose a light freestanding barrier frame with a printed fabric, or a printed cover that slides over the standard steel crowd control barriers you already use.",
  teaserTitle: "Crowd barrier frames and covers",
  teaserText: "Printed fabric barrier frames, and covers for standard steel crowd control barriers.",
  groups: [
    { id: "frame", title: "Barrier frame and fabric (900mm tall)", text: "An anodised aluminium tube frame with a printed fabric, that packs into a carry bag." },
    { id: "cover", title: "Cover for a steel crowd control barrier", text: "A printed cover that slides over a standard 2100 × 1100mm interlocking steel barrier, with no tools. Barrier not included." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 4", min: 2}, {label: "5 to 9", min: 5}, {label: "10 to 19", min: 10}, {label: "20+", min: 20}],
items: [
    { id: "1000-single", group: "frame", label: "Barrier frame 1000 × 900mm, single sided", short: "1000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 230], [2, 456], [5, 995], [10, 1800], [20, 3360]], price: [230, 228, 199, 180, 168] },
    { id: "1000-double", group: "frame", label: "Barrier frame 1000 × 900mm, double sided", short: "1000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 250], [2, 500], [5, 1095], [10, 1980], [20, 3680]], price: [250, 250, 219, 198, 184] },
    { id: "1500-single", group: "frame", label: "Barrier frame 1500 × 900mm, single sided", short: "1500 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 265], [2, 530], [5, 1160], [10, 2100], [20, 3900]], price: [265, 265, 232, 210, 195] },
    { id: "1500-double", group: "frame", label: "Barrier frame 1500 × 900mm, double sided", short: "1500 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 290], [2, 576], [5, 1255], [10, 2270], [20, 4220]], price: [290, 288, 251, 227, 211] },
    { id: "2000-single", group: "frame", label: "Barrier frame 2000 × 900mm, single sided", short: "2000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 300], [2, 600], [5, 1320], [10, 2410], [20, 4500]], price: [300, 300, 264, 241, 225] },
    { id: "2000-double", group: "frame", label: "Barrier frame 2000 × 900mm, double sided", short: "2000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 325], [2, 646], [5, 1425], [10, 2590], [20, 4840]], price: [325, 323, 285, 259, 242] },
    { id: "cover-single", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, single sided", short: "Cover · Single sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 160], [2, 316], [5, 690], [10, 1250], [20, 2320]], price: [160, 158, 138, 125, 116] },
    { id: "cover-double", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, double sided", short: "Cover · Double sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 180], [2, 360], [5, 785], [10, 1420], [20, 2640]], price: [180, 180, 157, 142, 132] },
],
  notes: [
    "Single sided frames: printed on one side and white on the other.",
    "Double sided: printed on both sides, and the two sides can be different designs.",
    "Covers fit standard interlocking steel barriers 2100mm wide and 1100mm tall. The barrier itself isn't included.",
  ],
  artwork: "Barrier fabrics are printed from a full-size template for that size. Ask for the template with your quote, or send us your logos and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "Frame or cover?", a: "If you don't have barriers, choose the frame and fabric: it's light and packs into a carry bag. If your event already uses steel crowd control barriers, a printed cover slides straight over them." },
    { q: "What are they good for?", a: "Fun run starts and finishes, queue lines, sports club sidelines, sponsor walls and VIP areas." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4BarrierCover,
  gallery: [MOCKUPS.v4Barrier1000, MOCKUPS.v4Barrier1500, MOCKUPS.v4Barrier2000, MOCKUPS.v4BarrierCover],
  galleryHeading: "Crowd barrier frames and covers",
  notesHint: "Event or club, how many barriers, sponsor logos",
};

export const SELFIE_FRAMES: GearProduct = {
  slug: "selfie-frames",
  eventName: "selfie_frame",
  subject: "Selfie frame quote",
  noun: "frame",
  pageTitle: "Custom Selfie Frames for Weddings & Events | The Signage Shed",
  description: "Custom printed selfie frames (photo props) in 600 × 900mm and 850 × 1200mm, printed on waterproof 5mm corrugated plastic and cut out ready to use. Delivered Australia-wide.",
  eyebrow: "Selfie frames, delivered Australia-wide",
  heading: "Selfie frames for weddings, parties and game day",
  intro: "A printed photo frame with the middle cut out, ready for your guests to hold up. Add names and a date for a wedding, a club logo for presentation night, or your brand for a launch.",
  teaserTitle: "Selfie frames",
  teaserText: "Printed photo-prop frames in two sizes, cut out and ready to use.",
  groups: [
    { id: "selfie", title: "Selfie frame, 5mm corrugated plastic", text: "Printed in full colour and cut out in one solid panel (not folded)." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 4", min: 2}, {label: "5 to 9", min: 5}, {label: "10+", min: 10}],
items: [
    { id: "small", group: "selfie", label: "Selfie frame small 600 × 900mm", short: "Small 600 × 900mm", includes: "Printed and cut out, ready to use", tiers: [[1, 145], [2, 286], [5, 510], [10, 790]], price: [145, 143, 102, 79] },
    { id: "large", group: "selfie", label: "Selfie frame large 850 × 1200mm", short: "Large 850 × 1200mm", includes: "Printed and cut out, ready to use", tiers: [[1, 220], [2, 440], [5, 790], [10, 1230]], price: [220, 220, 158, 123] },
],
  notes: [
    "Printed on waterproof 5mm corrugated plastic, so a spilt drink won't hurt it.",
    "We cut the window out for you, so it's ready to use.",
    "Two sizes only: small 600 × 900mm and large 850 × 1200mm.",
  ],
  artwork: "Send us your names, date, logo or hashtag and we'll set the artwork up for you to approve, or ask for our template.",
  faqs: [
    { q: "What are they good for?", a: "Weddings, engagements, birthdays, school formals, club presentation nights, product launches and sports days." },
    { q: "Which size?", a: "The small frame suits one or two people. The large frame fits a small group." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4SelfieSmall,
  gallery: [MOCKUPS.v4SelfieSmall, MOCKUPS.v4SelfieLarge],
  galleryHeading: "Small or large",
  notesHint: "Event date, names or wording, colours or theme",
};

export const CAR_MAGNETS: GearProduct = {
  slug: "car-magnets",
  eventName: "car_magnet",
  subject: "Car magnet quote",
  noun: "magnet",
  pageTitle: "Custom Car Magnets Australia: Printed | The Signage Shed",
  description: "Printed car magnets on 0.8mm magnet with white vinyl and gloss laminate, rounded corners, from 290 × 220mm to 600 × 400mm. Delivered Australia-wide.",
  eyebrow: "Printed car magnets, delivered Australia-wide",
  heading: "Car magnets that turn your car into an ad",
  intro: "Full colour magnetic signs for car and ute doors. Put them on for work and take them off for the weekend.",
  teaserTitle: "Car magnets",
  teaserText: "Printed 0.8mm car magnets with gloss laminate, in four door-friendly sizes.",
  groups: [
    { id: "mag", title: "Car magnet, rounded corners", text: "Thick 0.8mm magnet, printed full colour on white vinyl with a gloss laminate." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 3", min: 2}, {label: "4 to 9", min: 4}, {label: "10+", min: 10}],
items: [
    { id: "290x220", group: "mag", label: "Car magnet 290 × 220mm", short: "290 × 220mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 200], [2, 200], [4, 200], [10, 220]], price: [200, 100, 50, 22] },
    { id: "440x290", group: "mag", label: "Car magnet 440 × 290mm", short: "440 × 290mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 200], [2, 200], [4, 200], [10, 430]], price: [200, 100, 50, 43] },
    { id: "600x300", group: "mag", label: "Car magnet 600 × 300mm", short: "600 × 300mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 200], [2, 200], [4, 240], [10, 600]], price: [200, 100, 60, 60] },
    { id: "600x400", group: "mag", label: "Car magnet 600 × 400mm", short: "600 × 400mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 200], [2, 200], [4, 320], [10, 800]], price: [200, 100, 80, 80] },
],
  notes: [
    "Printed full colour on white vinyl, gloss laminated, on 0.8mm magnet, with rounded corners.",
    "Price each. Most vehicles need two, one for each side.",
    "Magnets only stick to steel panels. Check your doors are flat steel before you order.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo, phone number and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "Will it fit my car?", a: "Measure the flat part of your door, away from handles and trims, and pick the size that fits inside it. Magnets only stick to steel, not aluminium, plastic or fibreglass panels." },
    { q: "Do you fit them?", a: "No. They're ready to use: you put them on and take them off yourself." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4CarMagnet600x400,
  gallery: [MOCKUPS.v4CarMagnet290, MOCKUPS.v4CarMagnet440, MOCKUPS.v4CarMagnet600x300, MOCKUPS.v4CarMagnet600x400],
  galleryHeading: "Four sizes", galleryIncludesHero: true,
  notesHint: "Your vehicle, the size of the flat door panel, wording",
};

export const BUSINESS_CARDS: GearProduct = {
  slug: "business-cards",
  eventName: "business_cards",
  subject: "Business card quote",
  noun: "pack",
  pageTitle: "Premium & Luxury Business Cards Australia | The Signage Shed",
  description: "Premium 350gsm and luxury 420gsm business cards, 90 × 55mm, double sided full colour, with matte, gloss or velvet soft-touch laminate. Delivered Australia-wide.",
  eyebrow: "Premium and luxury business cards",
  heading: "Business cards that feel as good as they look",
  intro: "Standard 90 × 55mm cards, printed full colour on both sides and laminated on both sides. Choose premium 350gsm with matte or gloss, or luxury 420gsm with a velvet soft-touch finish.",
  teaserTitle: "Premium and luxury business cards",
  teaserText: "350gsm matte or gloss, or 420gsm velvet soft-touch, printed both sides.",
  groups: [
    { id: "premium", title: "Premium: 350gsm artboard", text: "Double sided full colour, with matte or gloss laminate on both sides. Square corners." },
    { id: "luxury", title: "Luxury: 420gsm coated artboard", text: "Thicker card with a velvet soft-touch laminate on both sides, and optional spot gloss on both sides. Square corners." },
  ],
  bands: BANDS_EACH,
  items: [
    { id: "pc-matte-250", group: "premium", label: "Premium business cards, matte, 250 cards", short: "Matte · 250 cards", includes: "350gsm artboard, matte laminate both sides", price: [140] },
    { id: "pc-matte-500", group: "premium", label: "Premium business cards, matte, 500 cards", short: "Matte · 500 cards", includes: "350gsm artboard, matte laminate both sides", price: [195] },
    { id: "pc-matte-1000", group: "premium", label: "Premium business cards, matte, 1000 cards", short: "Matte · 1000 cards", includes: "350gsm artboard, matte laminate both sides", price: [295] },
    { id: "pc-matte-2500", group: "premium", label: "Premium business cards, matte, 2500 cards", short: "Matte · 2500 cards", includes: "350gsm artboard, matte laminate both sides", price: [610] },
    { id: "pc-gloss-250", group: "premium", label: "Premium business cards, gloss, 250 cards", short: "Gloss · 250 cards", includes: "350gsm artboard, gloss laminate both sides", price: [140] },
    { id: "pc-gloss-500", group: "premium", label: "Premium business cards, gloss, 500 cards", short: "Gloss · 500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [195] },
    { id: "pc-gloss-1000", group: "premium", label: "Premium business cards, gloss, 1000 cards", short: "Gloss · 1000 cards", includes: "350gsm artboard, gloss laminate both sides", price: [295] },
    { id: "pc-gloss-2500", group: "premium", label: "Premium business cards, gloss, 2500 cards", short: "Gloss · 2500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [610] },
    { id: "lc-velvet-250", group: "luxury", label: "Luxury business cards, velvet, 250 cards", short: "Velvet · 250 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [205] },
    { id: "lc-velvet-500", group: "luxury", label: "Luxury business cards, velvet, 500 cards", short: "Velvet · 500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [285] },
    { id: "lc-velvet-1000", group: "luxury", label: "Luxury business cards, velvet, 1000 cards", short: "Velvet · 1000 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [450] },
    { id: "lc-velvet-2500", group: "luxury", label: "Luxury business cards, velvet, 2500 cards", short: "Velvet · 2500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [935] },
    { id: "lc-velvet-spot-250", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 250 cards", short: "Velvet with spot gloss · 250 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [250] },
    { id: "lc-velvet-spot-500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 500 cards", short: "Velvet with spot gloss · 500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [350] },
    { id: "lc-velvet-spot-1000", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 1000 cards", short: "Velvet with spot gloss · 1000 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [545] },
    { id: "lc-velvet-spot-2500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 2500 cards", short: "Velvet with spot gloss · 2500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [1140] },
  ],
  notes: [
    "Price is per pack of cards, 1 design.",
    "Standard 90 × 55mm, printed full colour on both sides.",
    "Rounded corners available on request.",
  ],
  artwork: "Send your artwork at 90 × 55mm with 2mm bleed, or send us your logo and details and we'll set it up for you to approve.",
  faqs: [
    { q: "Premium or luxury?", a: "Premium is 350gsm artboard with matte or gloss laminate on both sides. Luxury is thicker 420gsm coated artboard with a velvet soft-touch laminate on both sides, and you can add spot gloss to make a logo shine." },
    { q: "What's spot gloss?", a: "A clear gloss layer on chosen parts of the design, like your logo, so they shine against the soft-touch finish." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4CardsLuxuryVelvet,
  gallery: [MOCKUPS.v4CardsPremiumMatte, MOCKUPS.v4CardsPremiumGloss, MOCKUPS.v4CardsLuxuryVelvet, MOCKUPS.v4CardsLuxurySpot],
  galleryHeading: "Matte, gloss, velvet or spot gloss",
  notesHint: "Names on the cards, how many people, finish",
};

// Printed self-adhesive vinyl. The From price on the hero and product cards is the smallest instant price.
// Every size and quantity is priced on quote, so the page does not list a price per size.
const SAV_FROM = 200;
const SAV_SIZES = [
  ["a4", "A4 (210 × 297mm)"],
  ["a3", "A3 (297 × 420mm)"],
  ["a2", "A2 (420 × 594mm)"],
  ["a1", "A1 (594 × 841mm)"],
  ["a0", "A0 (841 × 1189mm)"],
  ["600x900", "600 × 900mm"],
  ["900x1200", "900 × 1200mm"],
  ["1000x1000", "1000 × 1000mm"],
  ["1200x1200", "1200 × 1200mm"],
  ["1200x2400", "1200 × 2400mm"],
] as const;
export const SAV_SIZE_MM: Record<string, [number, number]> = {
  a4: [210, 297],
  a3: [297, 420],
  a2: [420, 594],
  a1: [594, 841],
  a0: [841, 1189],
  "600x900": [600, 900],
  "900x1200": [900, 1200],
  "1000x1000": [1000, 1000],
  "1200x1200": [1200, 1200],
  "1200x2400": [1200, 2400],
};

const SAV_MATERIALS: { id: string; title: string; text: string; includes: string }[] = [
  { id: "economy", title: "Economy white", text: "Gloss white vinyl with no laminate, for short-term indoor or outdoor use.", includes: "Gloss white vinyl, no laminate" },
  { id: "premium", title: "Premium white", text: "Gloss or matte white vinyl with no laminate, for a longer outdoor life.", includes: "Gloss or matte white vinyl, no laminate" },
  { id: "laminate", title: "Premium with laminate", text: "Premium white vinyl with a gloss or matte protective laminate.", includes: "Premium white vinyl, with gloss or matte laminate" },
];

export const PRINTED_VINYL: GearProduct = {
  slug: "printed-vinyl",
  eventName: "printed_vinyl",
  subject: "Printed self-adhesive vinyl quote",
  noun: "vinyl",
  pageTitle: "Printed Self-Adhesive Vinyl (SAV) | The Signage Shed",
  description: `Printed self-adhesive vinyl (SAV) stickers and decals in standard or custom sizes from A4 to 1200 × 2400mm. Economy or premium white, with optional laminate. From $${R("sav")} per m². Delivered Australia-wide.`,
  eyebrow: "Printed vinyl stickers and decals, delivered Australia-wide",
  heading: "Printed self-adhesive vinyl (SAV)",
  intro: "Full colour stickers and decals on white self-adhesive vinyl. We print the sheet and deliver it ready for you to peel and apply. Choose economy white for short-term use, premium white for longer outdoor life, or premium with a gloss or matte laminate.",
  teaserTitle: "Printed vinyl stickers",
  teaserText: "Self-adhesive vinyl (SAV) in standard or custom sizes, from A4 to 1200 × 2400mm.",
  groups: SAV_MATERIALS.map((m) => ({ id: m.id, title: m.title, text: m.text })),
  bands: [{ label: "1", min: 1 }],
  items: SAV_MATERIALS.flatMap((m) =>
    SAV_SIZES.map(([id, short]) => ({
      id: `${m.id}-${id}`,
      group: m.id,
      label: `Printed self-adhesive vinyl, ${m.title}, ${short}`,
      short,
      includes: m.includes,
      price: [SAV_FROM],
    })),
  ),
  quoteOnly: true,
  fromPerM2: R("sav"),
  fromPerM2Lead: `Printed vinyl from $${R("sav")} per m².`,
  customKinds: [{ kind: "sav", label: "Economy white" }],
  customIntro: "Type any width and height (from 200mm, up to 1300 × 5000mm) for an instant price on economy white vinyl. Premium and laminate are confirmed in your quote.",
  customFinishing: "Economy gloss white vinyl, no laminate, delivered ready for you to apply.",
  notes: [
    "We print the sheet and deliver it ready for you to apply.",
    "Instant prices are for economy white vinyl, no laminate. Premium and laminate are confirmed in your quote.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "Do you apply the vinyl?", a: "No. We print it and deliver it ready for you to apply. We don't visit or install." },
    { q: "Can I order more than one?", a: "Yes. Enter a quantity in the price box, or send us the sizes and we'll include them in your quote." },
    { q: "What about clear vinyl, window film or another size?", a: "Clear vinyl, one-way window film, wall vinyl, cling and oversize sheets are quoted with the job. Add the details in the notes on the quote form." },
    { q: "Which material should I choose?", a: "Economy white is gloss vinyl with no laminate, for short-term indoor or outdoor use. Premium white is gloss or matte vinyl with no laminate, for a longer outdoor life. Premium with laminate adds a gloss or matte protective film. Economy white is priced instantly. Premium and laminate are confirmed in your quote." },
    { q: "How long does it take?", a: "We dispatch within 3 days of artwork approval, depending on order size. Need it by a date? Put it in the Notes box on the quote form and we'll let you know if it's tight." },
    { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
    { q: "How much is delivery?", a: "We'll email you a quote with freight included. Freight depends on the size and weight, and we quote it to your postcode." },
    { q: "How do I pay?", a: "Request a quote and approve it, then pay by invoice once your artwork is approved. There's no checkout on the site." },
  ],
  hero: MOCKUPS.v4SavVinylSheet,
  gallery: [MOCKUPS.v4SavShopfront],
  galleryHeading: "Applied to glass",
  notesHint: "Where it will go, gloss or matte, wording or design ideas",
};

export const NEW_PRODUCTS = [LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS, PRINTED_VINYL] as const;
