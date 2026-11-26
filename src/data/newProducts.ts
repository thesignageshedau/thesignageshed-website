// New products (checked 25 Oct 2026). Supplier REGULAR price inc GST for each exact quantity ÷ 0.75,
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
    { id: "1000x2000-single", group: "1000", label: "Modular lightbox 1000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 1335], [2, 2670], [3, 3942], [5, 6165]], price: [1335, 1335, 1314, 1233] },
    { id: "1000x2000-double", group: "1000", label: "Modular lightbox 1000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 1535], [2, 3070], [3, 4530], [5, 7085]], price: [1535, 1535, 1510, 1417] },
    { id: "2000x2000-single", group: "2000", label: "Modular lightbox 2000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 2115], [2, 4226], [3, 6237], [5, 9760]], price: [2115, 2113, 2079, 1952] },
    { id: "2000x2000-double", group: "2000", label: "Modular lightbox 2000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 2430], [2, 4856], [3, 7170], [5, 11225]], price: [2430, 2428, 2390, 2245] },
    { id: "3000x2000-single", group: "3000", label: "Modular lightbox 3000 × 2000mm, single sided", short: "Single sided", includes: "Backlit frame, printed fabric and carry bag, plus a blank back fabric", tiers: [[1, 2610], [2, 5220], [3, 7710], [5, 12065]], price: [2610, 2610, 2570, 2413] },
    { id: "3000x2000-double", group: "3000", label: "Modular lightbox 3000 × 2000mm, double sided", short: "Double sided", includes: "Backlit frame, printed fabric and carry bag", tiers: [[1, 3005], [2, 6006], [3, 8865], [5, 13875]], price: [3005, 3003, 2955, 2775] },
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
    { id: "small-cf", group: "small", label: "Big head cutout small 380mm with handle, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 185], [5, 185], [10, 190], [20, 200], [50, 300]], price: [185, 37, 19, 10, 6] },
    { id: "small-pvc", group: "small", label: "Big head cutout small 380mm with handle, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape, with handle", tiers: [[1, 185], [5, 185], [10, 190], [20, 320], [50, 650]], price: [185, 37, 19, 16, 13] },
    { id: "medium-cf", group: "medium", label: "Big head cutout medium 600mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 185], [5, 185], [10, 190], [20, 260], [50, 500]], price: [185, 37, 19, 13, 10] },
    { id: "medium-pvc", group: "medium", label: "Big head cutout medium 600mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 185], [5, 200], [10, 370], [20, 640], [50, 1450]], price: [185, 40, 37, 32, 29] },
    { id: "large-cf", group: "large", label: "Big head cutout large 900mm, 3mm corrugated plastic", short: "3mm corrugated plastic (outdoor)", includes: "Printed and cut to shape", tiers: [[1, 185], [5, 195], [10, 290], [20, 480], [50, 1000]], price: [185, 39, 29, 24, 20] },
    { id: "large-pvc", group: "large", label: "Big head cutout large 900mm, 3mm foam PVC", short: "3mm foam PVC (indoor)", includes: "Printed and cut to shape", tiers: [[1, 185], [5, 405], [10, 710], [20, 1280], [50, 2950]], price: [185, 81, 71, 64, 59] },
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
    { id: "1-frame", group: "segaf", label: "SEG fabric frame 559 × 717mm (1 section)", short: "559 × 717mm · 1 section", includes: "Frame and printed fabric graphic", tiers: [[1, 285], [2, 550], [5, 1275], [10, 2410]], price: [285, 275, 255, 241] },
    { id: "2-frames", group: "segaf", label: "SEG fabric frame 1118 × 717mm (2 sections)", short: "1118 × 717mm · 2 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 530], [2, 996], [5, 2280], [10, 4380]], price: [530, 498, 456, 438] },
    { id: "3-frames", group: "segaf", label: "SEG fabric frame 1676 × 717mm (3 sections)", short: "1676 × 717mm · 3 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 765], [2, 1400], [5, 3260], [10, 6430]], price: [765, 700, 652, 643] },
    { id: "4-frames", group: "segaf", label: "SEG fabric frame 2235 × 717mm (4 sections)", short: "2235 × 717mm · 4 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 970], [2, 1800], [5, 4240], [10, 8480]], price: [970, 900, 848, 848] },
    { id: "5-frames", group: "segaf", label: "SEG fabric frame 2794 × 717mm (5 sections)", short: "2794 × 717mm · 5 sections", includes: "Frame and printed fabric graphic", tiers: [[1, 1170], [2, 2200], [5, 5265], [10, 10530]], price: [1170, 1100, 1053, 1053] },
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
    { id: "1000-single", group: "frame", label: "Barrier frame 1000 × 900mm, single sided", short: "1000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 215], [2, 426], [5, 930], [10, 1680], [20, 3120]], price: [215, 213, 186, 168, 156] },
    { id: "1000-double", group: "frame", label: "Barrier frame 1000 × 900mm, double sided", short: "1000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 235], [2, 470], [5, 1025], [10, 1850], [20, 3440]], price: [235, 235, 205, 185, 172] },
    { id: "1500-single", group: "frame", label: "Barrier frame 1500 × 900mm, single sided", short: "1500 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 250], [2, 496], [5, 1080], [10, 1960], [20, 3640]], price: [250, 248, 216, 196, 182] },
    { id: "1500-double", group: "frame", label: "Barrier frame 1500 × 900mm, double sided", short: "1500 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 270], [2, 536], [5, 1170], [10, 2120], [20, 3940]], price: [270, 268, 234, 212, 197] },
    { id: "2000-single", group: "frame", label: "Barrier frame 2000 × 900mm, single sided", short: "2000 × 900mm · Single sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 280], [2, 560], [5, 1235], [10, 2250], [20, 4200]], price: [280, 280, 247, 225, 210] },
    { id: "2000-double", group: "frame", label: "Barrier frame 2000 × 900mm, double sided", short: "2000 × 900mm · Double sided", includes: "Aluminium frame, printed fabric and carry bag", tiers: [[1, 300], [2, 600], [5, 1330], [10, 2420], [20, 4520]], price: [300, 300, 266, 242, 226] },
    { id: "cover-single", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, single sided", short: "Cover · Single sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 150], [2, 296], [5, 645], [10, 1170], [20, 2160]], price: [150, 148, 129, 117, 108] },
    { id: "cover-double", group: "cover", label: "Crowd control barrier cover 2100 × 1100mm, double sided", short: "Cover · Double sided", includes: "Printed cover only, fits a standard 2100 × 1100mm steel barrier", tiers: [[1, 170], [2, 336], [5, 730], [10, 1320], [20, 2460]], price: [170, 168, 146, 132, 123] },
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
    { id: "small", group: "selfie", label: "Selfie frame small 600 × 900mm", short: "Small 600 × 900mm", includes: "Printed and cut out, ready to use", tiers: [[1, 135], [2, 266], [5, 475], [10, 740]], price: [135, 133, 95, 74] },
    { id: "large", group: "selfie", label: "Selfie frame large 850 × 1200mm", short: "Large 850 × 1200mm", includes: "Printed and cut out, ready to use", tiers: [[1, 210], [2, 416], [5, 740], [10, 1150]], price: [210, 208, 148, 115] },
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
    { id: "290x220", group: "mag", label: "Car magnet 290 × 220mm", short: "290 × 220mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 185], [2, 186], [4, 188], [10, 200]], price: [185, 93, 47, 20] },
    { id: "440x290", group: "mag", label: "Car magnet 440 × 290mm", short: "440 × 290mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 185], [2, 186], [4, 188], [10, 400]], price: [185, 93, 47, 40] },
    { id: "600x300", group: "mag", label: "Car magnet 600 × 300mm", short: "600 × 300mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 185], [2, 186], [4, 228], [10, 560]], price: [185, 93, 57, 56] },
    { id: "600x400", group: "mag", label: "Car magnet 600 × 400mm", short: "600 × 400mm", includes: "0.8mm magnet, white vinyl, gloss laminate, rounded corners", tiers: [[1, 185], [2, 186], [4, 300], [10, 740]], price: [185, 93, 75, 74] },
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
    { id: "pc-matte-250", group: "premium", label: "Premium business cards, matte, 250 cards", short: "Matte · 250 cards", includes: "350gsm artboard, matte laminate both sides", price: [135] },
    { id: "pc-matte-500", group: "premium", label: "Premium business cards, matte, 500 cards", short: "Matte · 500 cards", includes: "350gsm artboard, matte laminate both sides", price: [180] },
    { id: "pc-matte-1000", group: "premium", label: "Premium business cards, matte, 1000 cards", short: "Matte · 1000 cards", includes: "350gsm artboard, matte laminate both sides", price: [280] },
    { id: "pc-matte-2500", group: "premium", label: "Premium business cards, matte, 2500 cards", short: "Matte · 2500 cards", includes: "350gsm artboard, matte laminate both sides", price: [570] },
    { id: "pc-gloss-250", group: "premium", label: "Premium business cards, gloss, 250 cards", short: "Gloss · 250 cards", includes: "350gsm artboard, gloss laminate both sides", price: [135] },
    { id: "pc-gloss-500", group: "premium", label: "Premium business cards, gloss, 500 cards", short: "Gloss · 500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [180] },
    { id: "pc-gloss-1000", group: "premium", label: "Premium business cards, gloss, 1000 cards", short: "Gloss · 1000 cards", includes: "350gsm artboard, gloss laminate both sides", price: [280] },
    { id: "pc-gloss-2500", group: "premium", label: "Premium business cards, gloss, 2500 cards", short: "Gloss · 2500 cards", includes: "350gsm artboard, gloss laminate both sides", price: [570] },
    { id: "lc-velvet-250", group: "luxury", label: "Luxury business cards, velvet, 250 cards", short: "Velvet · 250 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [195] },
    { id: "lc-velvet-500", group: "luxury", label: "Luxury business cards, velvet, 500 cards", short: "Velvet · 500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [270] },
    { id: "lc-velvet-1000", group: "luxury", label: "Luxury business cards, velvet, 1000 cards", short: "Velvet · 1000 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [420] },
    { id: "lc-velvet-2500", group: "luxury", label: "Luxury business cards, velvet, 2500 cards", short: "Velvet · 2500 cards", includes: "420gsm coated artboard, velvet soft-touch laminate both sides", price: [870] },
    { id: "lc-velvet-spot-250", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 250 cards", short: "Velvet with spot gloss · 250 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [235] },
    { id: "lc-velvet-spot-500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 500 cards", short: "Velvet with spot gloss · 500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [325] },
    { id: "lc-velvet-spot-1000", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 1000 cards", short: "Velvet with spot gloss · 1000 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [510] },
    { id: "lc-velvet-spot-2500", group: "luxury", label: "Luxury business cards, velvet with spot gloss, 2500 cards", short: "Velvet with spot gloss · 2500 cards", includes: "420gsm, velvet soft-touch both sides, spot gloss both sides", price: [1060] },
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

// Printed self-adhesive vinyl. From $185 on the hero and product cards.
// Every size and quantity is priced on quote, so the page does not list a price per size.
const SAV_FROM = 185;
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
  description: "Printed self-adhesive vinyl (SAV) stickers and decals in standard or custom sizes from A4 to 1200 × 2400mm. Economy or premium white, with optional laminate. From $23 per m². Delivered Australia-wide.",
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
  fromPerM2: 23,
  fromPerM2Lead: "Printed vinyl from $23 per m².",
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
    { q: "Is there a minimum order?", a: "Yes. Our minimum order is $180 (excl. freight) for the whole order, not per product." },
    { q: "How do I pay?", a: "Request a quote and approve it, then pay by invoice once your artwork is approved. There's no checkout on the site." },
  ],
  hero: MOCKUPS.v4SavVinylSheet,
  gallery: [MOCKUPS.v4SavShopfront],
  galleryHeading: "Applied to glass",
  notesHint: "Where it will go, gloss or matte, wording or design ideas",
};


// ---- More products (checked 26 Nov 2026) ----------------------------------------------------------
// Supplier REGULAR price inc GST for each exact quantity (sale prices ignored, and the supplier's stated product
// minimum used where it is higher) ÷ 0.7, rounded UP to the next $5; quantity totals keep a whole-dollar price each.
// Pricing record: /workspace/pricing/es-expansion-2026-11-26.csv. Standard sizes only.
const BANDS_5 = [{ label: "1", min: 1 }, { label: "2 to 4", min: 2 }, { label: "5 to 9", min: 5 }, { label: "10 to 24", min: 10 }, { label: "25+", min: 25 }];

export const POSTERS: GearProduct = {
  slug: "posters",
  eventName: "posters",
  subject: "Poster quote",
  noun: "poster",
  pageTitle: "Custom Printed Posters A3 to A0 | The Signage Shed",
  description: "Full colour posters printed on 200gsm poster paper in A3, A2, A1 and A0, for shop windows, noticeboards, menus and events. Delivered Australia-wide.",
  eyebrow: "Printed posters, delivered Australia-wide",
  heading: "Posters for windows, walls and noticeboards",
  intro: "Full colour posters on 200gsm poster paper for indoor use: a specials board in the window, a menu on the wall, or an event poster on the club noticeboard.",
  teaserTitle: "Posters",
  teaserText: "Full colour posters in A3, A2, A1 and A0 on 200gsm paper.",
  groups: [
    { id: "poster", title: "Poster, 200gsm paper", text: "Printed full colour, one side. Best for indoor use or behind glass." },
  ],
  bands: BANDS_5,
  items: [
    { id: "a3", group: "poster", label: "Poster A3 (297 × 420mm), 200gsm", short: "A3 · 297 × 420mm", includes: "Printed full colour on 200gsm poster paper", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 200]], price: [200, 100, 40, 20, 8] },
    { id: "a2", group: "poster", label: "Poster A2 (420 × 594mm), 200gsm", short: "A2 · 420 × 594mm", includes: "Printed full colour on 200gsm poster paper", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 200]], price: [200, 100, 40, 20, 8] },
    { id: "a1", group: "poster", label: "Poster A1 (594 × 841mm), 200gsm", short: "A1 · 594 × 841mm", includes: "Printed full colour on 200gsm poster paper", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 225]], price: [200, 100, 40, 20, 9] },
    { id: "a0", group: "poster", label: "Poster A0 (841 × 1189mm), 200gsm", short: "A0 · 841 × 1189mm", includes: "Printed full colour on 200gsm poster paper", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 400]], price: [200, 100, 40, 20, 16] },
  ],
  notes: [
    "Printed full colour on one side of 200gsm poster paper.",
    "Need a tougher, water-resistant poster? Ask for synthetic paper in the Notes box and we'll quote it.",
  ],
  artwork: "Send your artwork at the finished size with 3mm bleed, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "Can I put them outside?", a: "Paper posters are made for indoor use or behind glass. For outdoors, look at our corflute signs or ask about synthetic paper." },
    { q: "Do you frame or hang them?", a: "No. We print and deliver them, ready for you to put up." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4Poster,
  gallery: [MOCKUPS.v4Poster, MOCKUPS.v4WindowCling],
  galleryHeading: "On the wall or in the window",
  notesHint: "Where it will go, how many of each size, wording or design ideas",
};

export const FOAM_PVC: GearProduct = {
  slug: "foam-pvc-signs",
  eventName: "foam_pvc",
  subject: "Foam PVC sign quote",
  noun: "sign",
  pageTitle: "Foam PVC Signs and Counter Cards | The Signage Shed",
  description: "Rigid 3mm foam PVC signs in A3, A1 and A0 for indoor walls, plus A5, A4 and A3 counter cards with a stand on the back. Delivered Australia-wide.",
  eyebrow: "Foam PVC signs, delivered Australia-wide",
  heading: "Foam PVC signs and counter cards",
  intro: "Foam PVC is a light, smooth, rigid board that gives a crisp print, so it suits signs inside a shop, office, reception or showroom. Counter cards come with a stand on the back so they stand up on a counter or table.",
  teaserTitle: "Foam PVC signs and counter cards",
  teaserText: "Rigid 3mm indoor signs from A3 to A0, and counter cards with a stand.",
  groups: [
    { id: "wall", title: "Wall signs, 3mm foam PVC", text: "A smooth rigid board for indoor walls and displays. Printed single sided." },
    { id: "counter", title: "Counter cards with a stand", text: "3mm foam PVC with a stand on the back, for counters, tables and shelves." },
  ],
  bands: BANDS_5,
  items: [
    { id: "wall-a3", group: "wall", label: "Foam PVC sign A3 (420 × 297mm), 3mm, single sided", short: "A3 · 420 × 297mm", includes: "3mm foam PVC, printed single sided", tiers: [[1, 180], [2, 180], [5, 180], [10, 180], [25, 250]], price: [180, 90, 36, 18, 10] },
    { id: "wall-a1", group: "wall", label: "Foam PVC sign A1 (594 × 841mm), 3mm, single sided", short: "A1 · 594 × 841mm", includes: "3mm foam PVC, printed single sided", tiers: [[1, 180], [2, 180], [5, 210], [10, 360], [25, 775]], price: [180, 90, 42, 36, 31] },
    { id: "wall-a0", group: "wall", label: "Foam PVC sign A0 (841 × 1189mm), 3mm, single sided", short: "A0 · 841 × 1189mm", includes: "3mm foam PVC, printed single sided", tiers: [[1, 180], [2, 180], [5, 355], [10, 630], [25, 1425]], price: [180, 90, 71, 63, 57] },
    { id: "counter-a5", group: "counter", label: "Counter card A5 (148 × 210mm), 3mm foam PVC with stand", short: "A5 · 148 × 210mm", includes: "3mm foam PVC, printed single sided, with a stand on the back", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 200]], price: [200, 100, 40, 20, 8] },
    { id: "counter-a4", group: "counter", label: "Counter card A4 (210 × 297mm), 3mm foam PVC with stand", short: "A4 · 210 × 297mm", includes: "3mm foam PVC, printed single sided, with a stand on the back", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 250]], price: [200, 100, 40, 20, 10] },
    { id: "counter-a3", group: "counter", label: "Counter card A3 (297 × 420mm), 3mm foam PVC with stand", short: "A3 · 297 × 420mm", includes: "3mm foam PVC, printed single sided, with a stand on the back", tiers: [[1, 200], [2, 200], [5, 200], [10, 200], [25, 350]], price: [200, 100, 40, 20, 14] },
  ],
  notes: [
    "Made for indoor use.",
    "Double sided, 5mm board or a shaped cut? Add it in the Notes box and we'll quote it.",
  ],
  artwork: "Send your artwork at the finished size with 3mm bleed, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "How do I put a wall sign up?", a: "Foam PVC is light, so double-sided mounting tape or velcro dots work on most smooth walls. We print and deliver; we don't install." },
    { q: "Can foam PVC go outside?", a: "It's best indoors. For outdoor signs, see our corflute and ACM signs." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4FoamPvc,
  gallery: [MOCKUPS.v4FoamPvc, MOCKUPS.v4Poster],
  galleryHeading: "On the wall and on the counter",
  notesHint: "Wall sign or counter card, sizes, how many, wording",
};

export const WINDOW_CLINGS: GearProduct = {
  slug: "window-clings",
  eventName: "window_clings",
  subject: "Window cling quote",
  noun: "cling",
  pageTitle: "Printed Window Clings, Removable | The Signage Shed",
  description: "Removable static window clings printed full colour on white cling, in 450 × 600mm, 600 × 900mm and 900 × 1200mm. No glue, easy to move or reuse. Delivered Australia-wide.",
  eyebrow: "Removable window clings, delivered Australia-wide",
  heading: "Window clings you can peel off and reuse",
  intro: "A static cling holds onto clean glass without glue, so you can put up a promotion, peel it off when it ends and use it again. Good for specials, opening hours and seasonal displays.",
  teaserTitle: "Window clings",
  teaserText: "Removable static clings for glass, from 450 × 600mm to 900 × 1200mm.",
  groups: [
    { id: "cling", title: "White window cling", text: "Printed full colour on white static cling, applied to the inside of the glass." },
  ],
  bands: BANDS_5,
  items: [
    { id: "450x600", group: "cling", label: "Window cling 450 × 600mm, white", short: "450 × 600mm", includes: "White static cling, printed full colour", tiers: [[1, 180], [2, 180], [5, 180], [10, 180], [25, 325]], price: [180, 90, 36, 18, 13] },
    { id: "600x900", group: "cling", label: "Window cling 600 × 900mm, white", short: "600 × 900mm", includes: "White static cling, printed full colour", tiers: [[1, 180], [2, 180], [5, 180], [10, 250], [25, 575]], price: [180, 90, 36, 25, 23] },
    { id: "900x1200", group: "cling", label: "Window cling 900 × 1200mm, white", short: "900 × 1200mm", includes: "White static cling, printed full colour", tiers: [[1, 180], [2, 180], [5, 250], [10, 460], [25, 1050]], price: [180, 90, 50, 46, 42] },
  ],
  notes: [
    "Sticks to smooth, clean glass without adhesive.",
    "Clear cling or another size? Add it in the Notes box and we'll quote it. For long-term graphics, see our printed vinyl.",
  ],
  artwork: "Send your artwork at the finished size, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "Cling or vinyl?", a: "Cling has no glue, so it's easy to remove and reuse, which suits short promotions. Printed vinyl is adhesive and suits signs that stay up longer." },
    { q: "Do you put them up?", a: "No. We print and deliver them. Clean the glass, smooth the cling on from the centre out, and you're done." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4WindowCling,
  gallery: [MOCKUPS.v4WindowCling, MOCKUPS.v4SavShopfront],
  galleryHeading: "On a shop window",
  notesHint: "Window size, how many, wording or design ideas",
};

export const X_BANNERS: GearProduct = {
  slug: "x-banner-stands",
  eventName: "x_banner",
  subject: "X-banner stand quote",
  noun: "stand",
  pageTitle: "X-Banner Stands 600 × 1600mm | The Signage Shed",
  description: "Low-cost X-banner stands with a printed 600 × 1600mm banner and carry bag. Light, quick to set up and easy to swap the banner. Delivered Australia-wide.",
  eyebrow: "X-banner stands, delivered Australia-wide",
  heading: "X-banner stands: a light, low-cost display",
  intro: "A folding X-shaped stand with your printed banner hooked on at the corners. It packs into a carry bag and sets up in a minute, so it suits markets, expos, receptions and in-store promotions.",
  teaserTitle: "X-banner stands",
  teaserText: "A light 600 × 1600mm stand with printed banner and carry bag.",
  groups: [
    { id: "xbanner", title: "X-banner stand, 600 × 1600mm", text: "Stand, printed banner and carry bag." },
  ],
  bands: BANDS_5,
  items: [
    { id: "600x1600", group: "xbanner", label: "X-banner stand 600 × 1600mm with printed banner", short: "600 × 1600mm", includes: "X stand, printed banner and carry bag", tiers: [[1, 85], [2, 170], [5, 370], [10, 680], [25, 1550]], price: [85, 85, 74, 68, 62] },
  ],
  notes: [
    "Best for indoor use. It is light, so it can blow over outside.",
    "Need a replacement banner for your stand? Ask in the Notes box and we'll quote it.",
    "For a stand that rolls the banner away, see our pull up banners.",
  ],
  artwork: "Send your artwork at 600 × 1600mm, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "X-banner or pull up banner?", a: "An X-banner is lighter and cheaper. A pull up banner has a base that the banner rolls into, so it looks neater and protects the print between events." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4XBanner,
  gallery: [MOCKUPS.v4XBanner],
  notesHint: "Where it will stand, how many, wording or design ideas",
};

export const FABRIC_CUBES: GearProduct = {
  slug: "fabric-display-cubes",
  eventName: "fabric_cubes",
  subject: "Fabric display cube quote",
  noun: "cube",
  pageTitle: "Printed Fabric Display Cubes | The Signage Shed",
  description: "Printed stretch fabric display cubes on an aluminium frame, in 510, 610, 765 and 915mm, with a carry bag. For expo stands, shop displays and events. Delivered Australia-wide.",
  eyebrow: "Fabric display cubes, delivered Australia-wide",
  heading: "Fabric display cubes that stack and pack flat",
  intro: "A light aluminium cube frame with a printed stretch fabric cover that zips on. Stack them, line them up or use them as plinths on an expo stand, in a shop window or at an event.",
  teaserTitle: "Fabric display cubes",
  teaserText: "Printed fabric cubes from 510mm to 915mm, with a carry bag.",
  groups: [
    { id: "cube", title: "Fabric display cube", text: "Aluminium frame, printed stretch fabric cover and carry bag." },
  ],
  bands: BANDS_5,
  items: [
    { id: "510", group: "cube", label: "Fabric display cube 510mm", short: "510 × 510 × 510mm", includes: "Aluminium frame, printed stretch fabric cover and carry bag", tiers: [[1, 165], [2, 330], [5, 775], [10, 1480], [25, 3550]], price: [165, 165, 155, 148, 142] },
    { id: "610", group: "cube", label: "Fabric display cube 610mm", short: "610 × 610 × 610mm", includes: "Aluminium frame, printed stretch fabric cover and carry bag", tiers: [[1, 195], [2, 386], [5, 895], [10, 1710], [25, 4100]], price: [195, 193, 179, 171, 164] },
    { id: "765", group: "cube", label: "Fabric display cube 765mm", short: "765 × 765 × 765mm", includes: "Aluminium frame, printed stretch fabric cover and carry bag", tiers: [[1, 235], [2, 470], [5, 1100], [10, 2100], [25, 5025]], price: [235, 235, 220, 210, 201] },
    { id: "915", group: "cube", label: "Fabric display cube 915mm", short: "915 × 915 × 915mm", includes: "Aluminium frame, printed stretch fabric cover and carry bag", tiers: [[1, 290], [2, 576], [5, 1345], [10, 2570], [25, 6150]], price: [290, 288, 269, 257, 246] },
  ],
  notes: [
    "Made for indoor use.",
  ],
  artwork: "Cube covers are printed from a template for your size. Ask for the template with your quote, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "How do they go together?", a: "The frame pieces connect into a cube, then the printed cover slides over and zips closed. It all packs back into the carry bag." },
    { q: "Can I change the print later?", a: "Yes. Ask for a replacement cover for the same frame in the Notes box and we'll quote it." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4FabricCubes,
  gallery: [MOCKUPS.v4FabricCubes],
  notesHint: "Sizes, how many, and where they will be used",
};

export const PRINTED_CHAIRS: GearProduct = {
  slug: "printed-chairs",
  eventName: "printed_chairs",
  subject: "Printed chair quote",
  noun: "chair",
  pageTitle: "Printed Director's Chairs and Deck Chairs | The Signage Shed",
  description: "Folding director's chairs and deck chairs with your logo printed on the fabric. For club sidelines, coaches' benches, markets and events. Delivered Australia-wide.",
  eyebrow: "Printed chairs, delivered Australia-wide",
  heading: "Director's chairs and deck chairs with your logo",
  intro: "Folding chairs with your branding printed on the fabric. Director's chairs suit the coaches' bench, the commentary box or a VIP area. Deck chairs suit markets, club days and relaxed event spaces.",
  teaserTitle: "Printed chairs",
  teaserText: "Director's chairs and deck chairs with your logo printed on the fabric.",
  groups: [
    { id: "director", title: "Director's chair", text: "Folding frame with printed backrest and seat fabric." },
    { id: "deck", title: "Deck chair", text: "Folding deck chair with a printed fabric sling, in an aluminium or timber frame." },
  ],
  bands: BANDS_5,
  items: [
    { id: "director-single", group: "director", label: "Director's chair, printed single sided", short: "Printed single sided", includes: "Folding chair with printed backrest and seat fabric", tiers: [[1, 210], [2, 416], [5, 975], [10, 1860], [25, 4450]], price: [210, 208, 195, 186, 178] },
    { id: "director-double", group: "director", label: "Director's chair, printed double sided", short: "Printed double sided", includes: "Folding chair with printed backrest and seat fabric", tiers: [[1, 230], [2, 460], [5, 1075], [10, 2060], [25, 4925]], price: [230, 230, 215, 206, 197] },
    { id: "deck-aluminium", group: "deck", label: "Deck chair, aluminium frame, printed sling", short: "Aluminium frame", includes: "Folding aluminium deck chair with printed fabric sling", tiers: [[1, 210], [2, 416], [5, 975], [10, 1860], [25, 4450]], price: [210, 208, 195, 186, 178] },
    { id: "deck-wood", group: "deck", label: "Deck chair, timber frame, printed sling", short: "Timber frame", includes: "Folding timber deck chair with printed fabric sling", tiers: [[1, 150], [2, 300], [5, 705], [10, 1350], [25, 3225]], price: [150, 150, 141, 135, 129] },
  ],
  notes: [
    "Replacement fabrics for chairs you already have from us can be quoted. Ask in the Notes box.",
  ],
  artwork: "Chair fabrics are printed from a template. Ask for the template with your quote, or send us your logo and we'll set it up for you to approve.",
  faqs: [
    { q: "Do they fold?", a: "Yes, both styles fold flat to carry and store." },
    { q: "Can they stay outside?", a: "Use them outdoors, then pack them away. Long periods in strong sun will fade the print over time." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4DirectorChairs,
  gallery: [MOCKUPS.v4DirectorChairs, MOCKUPS.v4DeckChairs],
  galleryHeading: "Director's chairs or deck chairs",
  galleryIncludesHero: true,
  notesHint: "Chair style, how many, logo and colours",
};

export const ARCH_BANNERS: GearProduct = {
  slug: "arch-banners",
  eventName: "arch_banners",
  subject: "Arch banner quote",
  noun: "arch",
  pageTitle: "Printed Arch Banners for Events | The Signage Shed",
  description: "Walk-through printed arch banners, 3390mm wide and 1860mm or 2180mm tall, with poles and ground spikes. For fun runs, start and finish lines, and event entrances. Delivered Australia-wide.",
  eyebrow: "Arch banners, delivered Australia-wide",
  heading: "Arch banners for start lines and entrances",
  intro: "A printed fabric arch on flexible poles that people walk through. Mark the start and finish of a fun run, the entry to a market or club day, or the way into an event.",
  teaserTitle: "Arch banners",
  teaserText: "Walk-through printed arches, 3.39m wide, with poles and ground spikes.",
  groups: [
    { id: "arch", title: "Arch banner with ground spikes", text: "Printed fabric arch, poles and two ground spikes for grass." },
  ],
  bands: BANDS_5,
  items: [
    { id: "small", group: "arch", label: "Arch banner small (3390 × 1860mm) with ground spikes", short: "Small · 3390 × 1860mm", includes: "Printed arch fabric, poles, ground spikes", tiers: [[1, 400], [2, 790], [5, 1840], [10, 3530], [25, 8500]], price: [400, 395, 368, 353, 340] },
    { id: "large", group: "arch", label: "Arch banner large (3390 × 2180mm) with ground spikes", short: "Large · 3390 × 2180mm", includes: "Printed arch fabric, poles, ground spikes", tiers: [[1, 460], [2, 906], [5, 2105], [10, 4040], [25, 9725]], price: [460, 453, 421, 404, 389] },
  ],
  notes: [
    "Ground spikes are for grass and soft ground. For hard surfaces, ask about bases in the Notes box and we'll quote them.",
    "Printed one side; the reverse shows a mirror image.",
    "Take it down in strong wind.",
  ],
  artwork: "Arch fabrics are printed from a template. Ask for the template with your quote, or send us your logo and wording and we'll set it up for you to approve.",
  faqs: [
    { q: "Do you set it up?", a: "No. It comes with poles and ground spikes, and you put it together yourself." },
    ...COMMON_FAQS
  ],
  hero: MOCKUPS.v4ArchBanner,
  gallery: [MOCKUPS.v4ArchBanner],
  notesHint: "Event date, ground surface, wording or design ideas",
};

export const NEW_PRODUCTS = [LIGHTBOX, BIG_HEADS, SEG_AFRAMES, BARRIERS, SELFIE_FRAMES, CAR_MAGNETS, BUSINESS_CARDS, PRINTED_VINYL, POSTERS, FOAM_PVC, WINDOW_CLINGS, X_BANNERS, FABRIC_CUBES, PRINTED_CHAIRS, ARCH_BANNERS] as const;
