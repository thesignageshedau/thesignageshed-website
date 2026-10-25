// New products (checked 25 Oct 2026). Supplier REGULAR price inc GST for each exact quantity ÷ 0.65,
// rounded UP to the next $5. Pricing records: /workspace/pricing/*-2026-10-25.csv. Standard sizes only.
import { MOCKUPS } from "./mockups";
import type { GearFaq, GearProduct } from "./eventGear";

const COMMON_FAQS: GearFaq[] = [
  { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
  { q: "How much is delivery?", a: "Freight depends on the product's size and weight. We quote it to your postcode and include it on your quote. See our Delivery page for how it works." },
  { q: "Is there a minimum order?", a: "Yes. Our minimum order value is $180 (excl. freight) for the whole order." },
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
    { id: "1000x2000-single", group: "1000", label: "Modular lightbox 1000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 1540], [2, 3080], [3, 4545], [5, 7115]], price: [1540.0, 1540.0, 1515.0, 1423.0] },
    { id: "1000x2000-double", group: "1000", label: "Modular lightbox 1000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 1770], [2, 3540], [3, 5225], [5, 8175]], price: [1770.0, 1770.0, 1741.67, 1635.0] },
    { id: "2000x2000-single", group: "2000", label: "Modular lightbox 2000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 2440], [2, 4875], [3, 7195], [5, 11260]], price: [2440.0, 2437.5, 2398.33, 2252.0] },
    { id: "2000x2000-double", group: "2000", label: "Modular lightbox 2000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 2805], [2, 5605], [3, 8275], [5, 12950]], price: [2805.0, 2802.5, 2758.33, 2590.0] },
    { id: "3000x2000-single", group: "3000", label: "Modular lightbox 3000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 3015], [2, 6025], [3, 8895], [5, 13920]], price: [3015.0, 3012.5, 2965.0, 2784.0] },
    { id: "3000x2000-double", group: "3000", label: "Modular lightbox 3000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 3465], [2, 6925], [3, 10230], [5, 16005]], price: [3465.0, 3462.5, 3410.0, 3201.0] },
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
    { id: "small-cf", group: "small", label: "Big head cutout small 380mm with handle, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 215], [5, 215], [10, 215], [20, 215], [50, 300]], price: [215.0, 43.0, 21.5, 10.75, 6.0] },
    { id: "small-pvc", group: "small", label: "Big head cutout small 380mm with handle, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 215], [5, 215], [10, 215], [20, 365], [50, 740]], price: [215.0, 43.0, 21.5, 18.25, 14.8] },
    { id: "medium-cf", group: "medium", label: "Big head cutout medium 600mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 215], [5, 215], [10, 215], [20, 300], [50, 560]], price: [215.0, 43.0, 21.5, 15.0, 11.2] },
    { id: "medium-pvc", group: "medium", label: "Big head cutout medium 600mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 215], [5, 230], [10, 425], [20, 735], [50, 1620]], price: [215.0, 46.0, 42.5, 36.75, 32.4] },
    { id: "large-cf", group: "large", label: "Big head cutout large 900mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 215], [5, 225], [10, 330], [20, 540], [50, 1100]], price: [215.0, 45.0, 33.0, 27.0, 22.0] },
    { id: "large-pvc", group: "large", label: "Big head cutout large 900mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 215], [5, 465], [10, 815], [20, 1475], [50, 3360]], price: [215.0, 93.0, 81.5, 73.75, 67.2] },
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
  slug: "expandable-seg-a-frames",
  eventName: "seg_aframe",
  subject: "Expandable SEG A-frame quote",
  noun: "A-frame",
  pageTitle: "Expandable SEG A-Frames for Sport & Events | The Signage Shed",
  description: "Low fabric A-frame signs that link together, 717mm tall and 559mm to 2794mm long. Sponsor signage for pool decks, sidelines and fun runs, delivered Australia-wide.",
  eyebrow: "Expandable fabric A-frames, delivered Australia-wide",
  heading: "Expandable SEG A-frames for sidelines and pool decks",
  intro: "Low fabric A-frames that link together into one long run of signage. Great for local sports clubs and events: along a pool lane, a sideline, a fun run finish chute or in front of a stage, with room for every sponsor.",
  teaserTitle: "Expandable SEG A-frames",
  teaserText: "Low linking fabric A-frames for sponsor signage at pools, sidelines and fun runs.",
  groups: [
    { id: "segaf", title: "Expandable SEG A-frame kit (717mm tall)", text: "Frame and printed fabric graphic. Each frame is 559mm wide, so choose how many link together." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 4", min: 2}, {label: "5 to 9", min: 5}, {label: "10+", min: 10}],
items: [
    { id: "1-frame", group: "segaf", label: "Expandable SEG A-frame 559 × 717mm (1 frame)", short: "559 × 717mm · 1 frame", includes: "Frame and printed fabric graphic", tiers: [[1, 325], [2, 635], [5, 1470], [10, 2780]], price: [325.0, 317.5, 294.0, 278.0] },
    { id: "2-frames", group: "segaf", label: "Expandable SEG A-frame 1118 × 717mm (2 frames)", short: "1118 × 717mm · 2 frames", includes: "Frame and printed fabric graphic", tiers: [[1, 610], [2, 1145], [5, 2630], [10, 5045]], price: [610.0, 572.5, 526.0, 504.5] },
    { id: "3-frames", group: "segaf", label: "Expandable SEG A-frame 1676 × 717mm (3 frames)", short: "1676 × 717mm · 3 frames", includes: "Frame and printed fabric graphic", tiers: [[1, 880], [2, 1615], [5, 3765], [10, 7415]], price: [880.0, 807.5, 753.0, 741.5] },
    { id: "4-frames", group: "segaf", label: "Expandable SEG A-frame 2235 × 717mm (4 frames)", short: "2235 × 717mm · 4 frames", includes: "Frame and printed fabric graphic", tiers: [[1, 1120], [2, 2075], [5, 4895], [10, 9785]], price: [1120.0, 1037.5, 979.0, 978.5] },
    { id: "5-frames", group: "segaf", label: "Expandable SEG A-frame 2794 × 717mm (5 frames)", short: "2794 × 717mm · 5 frames", includes: "Frame and printed fabric graphic", tiers: [[1, 1350], [2, 2535], [5, 6075], [10, 12150]], price: [1350.0, 1267.5, 1215.0, 1215.0] },
],
  notes: [
    "The fabric has a silicone edge that fits into the frame without tools.",
    "Longer runs than 5 frames are available. Ask us in the Notes box and we'll quote it.",
  ],
  artwork: "SEG A-frame fabrics are printed from a full-size template for your length. Ask for the template with your quote, or send us your sponsor logos and we'll set the artwork up for you to approve.",
  faqs: [
    { q: "What are they good for?", a: "Sponsor and event signage that sits low, so it doesn't block the view: pool decks, sidelines, fun run chutes, presentation areas and stage fronts." },
    { q: "How do the frames link?", a: "Each frame is 559mm wide and 717mm tall. Order 1 to 5 frames as one kit, with one printed fabric graphic to suit the full length." },
    { q: "Can I change the graphics?", a: "Yes. The fabric has a silicone edge that pulls out and pushes back in, so you can swap sponsors with a new print on the same frame." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4SegAframe3,
  gallery: [MOCKUPS.v4SegAframe1, MOCKUPS.v4SegAframe2, MOCKUPS.v4SegAframe3, MOCKUPS.v4SegAframe4, MOCKUPS.v4SegAframe5],
  galleryHeading: "1 to 5 frames long",
  notesHint: "Event or club, how many sponsors, length needed, colours",
};

export const BARRIERS: GearProduct = {
  slug: "barrier-covers",
  eventName: "barrier",
  subject: "Barrier frame or cover quote",
  noun: "barrier",
  pageTitle: "Printed Barrier Covers & Frames Australia | The Signage Shed",
  description: "Printed fabric barrier frames (1000, 1500 or 2000mm wide) and covers for standard 2100 × 1100mm steel crowd control barriers. For events, fun runs and sports clubs.",
  eyebrow: "Barrier frames and covers, delivered Australia-wide",
  heading: "Branded barriers for events and sports clubs",
  intro: "Turn queue lines, finish chutes and sidelines into sponsor signage. Choose a light freestanding barrier frame with a printed fabric, or a printed cover that slides over the standard steel crowd control barriers you already use.",
  teaserTitle: "Barrier frames and covers",
  teaserText: "Printed fabric barrier frames, and covers for standard steel crowd control barriers.",
  groups: [
    { id: "frame", title: "Barrier frame and fabric (900mm tall)", text: "An anodised aluminium tube frame with a printed fabric, that packs into a carry bag." },
    { id: "cover", title: "Cover for a steel crowd control barrier", text: "A printed cover that slides over a standard 2100 × 1100mm interlocking steel barrier, with no tools. Barrier not included." },
  ],
  bands: [{label: "1", min: 1}, {label: "2 to 4", min: 2}, {label: "5 to 9", min: 5}, {label: "10 to 19", min: 10}, {label: "20+", min: 20}],
items: [
    { id: "1000-single", group: "frame", label: "Barrier frame 1000 × 900mm, single sided", short: "1000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 245], [2, 490], [5, 1075], [10, 1940], [20, 3600]], price: [245.0, 245.0, 215.0, 194.0, 180.0] },
    { id: "1000-double", group: "frame", label: "Barrier frame 1000 × 900mm, double sided", short: "1000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 270], [2, 540], [5, 1180], [10, 2135], [20, 3965]], price: [270.0, 270.0, 236.0, 213.5, 198.25] },
    { id: "1500-single", group: "frame", label: "Barrier frame 1500 × 900mm, single sided", short: "1500 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 285], [2, 570], [5, 1250], [10, 2255], [20, 4190]], price: [285.0, 285.0, 250.0, 225.5, 209.5] },
    { id: "1500-double", group: "frame", label: "Barrier frame 1500 × 900mm, double sided", short: "1500 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 310], [2, 620], [5, 1350], [10, 2440], [20, 4530]], price: [310.0, 310.0, 270.0, 244.0, 226.5] },
    { id: "2000-single", group: "frame", label: "Barrier frame 2000 × 900mm, single sided", short: "2000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 325], [2, 645], [5, 1425], [10, 2590], [20, 4835]], price: [325.0, 322.5, 285.0, 259.0, 241.75] },
    { id: "2000-double", group: "frame", label: "Barrier frame 2000 × 900mm, double sided", short: "2000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 350], [2, 695], [5, 1530], [10, 2790], [20, 5205]], price: [350.0, 347.5, 306.0, 279.0, 260.25] },
    { id: "cover-single", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, single sided", short: "Cover · Single sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 170], [2, 340], [5, 745], [10, 1340], [20, 2490]], price: [170.0, 170.0, 149.0, 134.0, 124.5] },
    { id: "cover-double", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, double sided", short: "Cover · Double sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 195], [2, 385], [5, 845], [10, 1525], [20, 2830]], price: [195.0, 192.5, 169.0, 152.5, 141.5] },
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
  galleryHeading: "Barrier frames and covers",
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
    { id: "small", group: "selfie", label: "Selfie frame small 600 × 900mm", short: "Small 600 × 900mm", includes: "Printed and cut out, ready to use", tiers: [[1, 155], [2, 305], [5, 550], [10, 850]], price: [155.0, 152.5, 110.0, 85.0] },
    { id: "large", group: "selfie", label: "Selfie frame large 850 × 1200mm", short: "Large 850 × 1200mm", includes: "Printed and cut out, ready to use", tiers: [[1, 240], [2, 475], [5, 850], [10, 1325]], price: [240.0, 237.5, 170.0, 132.5] },
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
    { id: "290x220", group: "mag", label: "Car magnet 290 × 220mm", short: "290 × 220mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 215], [2, 215], [4, 215], [10, 230]], price: [215.0, 107.5, 53.75, 23.0] },
    { id: "440x290", group: "mag", label: "Car magnet 440 × 290mm", short: "440 × 290mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 215], [2, 215], [4, 215], [10, 455]], price: [215.0, 107.5, 53.75, 45.5] },
    { id: "600x300", group: "mag", label: "Car magnet 600 × 300mm", short: "600 × 300mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 215], [2, 215], [4, 260], [10, 640]], price: [215.0, 107.5, 65.0, 64.0] },
    { id: "600x400", group: "mag", label: "Car magnet 600 × 400mm", short: "600 × 400mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 215], [2, 215], [4, 345], [10, 855]], price: [215.0, 107.5, 86.25, 85.5] },
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
  hero: MOCKUPS.v4CarMagnet600x300,
  gallery: [MOCKUPS.v4CarMagnet290, MOCKUPS.v4CarMagnet440, MOCKUPS.v4CarMagnet600x300, MOCKUPS.v4CarMagnet600x400],
  galleryHeading: "Four sizes",
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
    { id: "pc-matte-250", group: "premium", label: "Premium business cards, matte, 250 cards", short: "Matte · 250 cards", includes: "350gsm artboard, matte laminate both sides", price: [155] },
    { id: "pc-matte-500", group: "premium", label: "Premium business cards, matte, 500 cards", short: "Matte · 500 cards", includes: "350gsm artboard, matte laminate both sides", price: [210] },
    { id: "pc-matte-1000", group: "premium", label: "Premium business cards, matte, 1000 cards", short: "Matte · 1000 cards", includes: "350gsm artboard, matte laminate both sides", price: [320] },
    { id: "pc-matte-2500", group: "premium", label: "Premium business cards, matte, 2500 cards", short: "Matte · 2500 cards", includes: "350gsm artboard, matte laminate both sides", price: [655] },
    { id: "pc-gloss-250", group: "premium", label: "Premium business cards, gloss, 250 cards", short: "Gloss · 250 cards", includes: "350gsm artboard, gloss laminate both sides", price: [155] },
    { id: "pc-gloss-500", group: "premium", label: "Premium business cards, gloss, 500 cards", short: "Gloss · 500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [210] },
    { id: "pc-gloss-1000", group: "premium", label: "Premium business cards, gloss, 1000 cards", short: "Gloss · 1000 cards", includes: "350gsm artboard, gloss laminate both sides", price: [320] },
    { id: "pc-gloss-2500", group: "premium", label: "Premium business cards, gloss, 2500 cards", short: "Gloss · 2500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [655] },
    { id: "lc-velvet-250", group: "luxury", label: "Luxury business cards, velvet, 250 cards", short: "Velvet · 250 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [220] },
    { id: "lc-velvet-500", group: "luxury", label: "Luxury business cards, velvet, 500 cards", short: "Velvet · 500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [310] },
    { id: "lc-velvet-1000", group: "luxury", label: "Luxury business cards, velvet, 1000 cards", short: "Velvet · 1000 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [485] },
    { id: "lc-velvet-2500", group: "luxury", label: "Luxury business cards, velvet, 2500 cards", short: "Velvet · 2500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [1005] },
    { id: "lc-velvet-spot-250", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 250 cards", short: "Velvet with spot gloss · 250 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [270] },
    { id: "lc-velvet-spot-500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 500 cards", short: "Velvet with spot gloss · 500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [375] },
    { id: "lc-velvet-spot-1000", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 1000 cards", short: "Velvet with spot gloss · 1000 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [590] },
    { id: "lc-velvet-spot-2500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 2500 cards", short: "Velvet with spot gloss · 2500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [1225] },
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

export const NEW_PRODUCTS = [LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS] as const;
