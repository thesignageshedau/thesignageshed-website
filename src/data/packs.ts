// Sector packs (checked 26 Oct 2026), built only from products we already sell.
// Price per pack = supplier REGULAR price inc GST for the exact pack contents (quantity and number of designs)
// ÷ 0.65, rounded UP to the next $5. Pricing record: /workspace/pricing/sector-packs-2026-10-26.csv.
import { MOCKUPS } from "./mockups";
import type { GearFaq, GearProduct } from "./eventGear";

const FAQS: GearFaq[] = [
  { q: "Can I change what's in a pack?", a: "Yes. Tell us what you need in the Notes box and we'll quote it. Packs are just a starting point." },
  { q: "Can each sign have a different design?", a: "Yes. Each pack lists how many designs are included. Need more? Ask and your quote confirms the price." },
  { q: "Will I see a proof before it's printed?", a: "Always. We send you a digital proof, and nothing is printed until you approve it in writing." },
  { q: "How much is delivery?", a: "Freight depends on the size and weight of your pack. We'll email you a quote with freight included. See our Delivery page for how it works." },
  { q: "Is there a minimum order?", a: "Yes, $180 (excl. freight) for the whole order. Every pack is over that on its own." },
  { q: "How do I pay?", a: "Payment is due once your artwork is approved." },
];

const tier = (p: number) => ({ tiers: [[1, p]] as [number, number][], price: [p] });

export const PACKS: GearProduct = {
  slug: "packs",
  eventName: "packs",
  subject: "Sector pack quote",
  noun: "pack",
  pageTitle: "Signage Packs for Sports Clubs, Schools, Building Sites & Events | The Signage Shed",
  description: "Ready-made signage packs: sponsor banner packs for sports clubs, site safety corflute and fence mesh packs for building sites, school packs, event and expo packs, and teardrop flag 3-packs. Delivered Australia-wide.",
  eyebrow: "Signage packs, delivered Australia-wide",
  heading: "Signage packs for clubs, schools, sites and events",
  intro: "Popular combinations, bundled into one price per pack. Every pack is built from the same banners, corflutes, flags and displays we sell on their own, and each one is over our $180 minimum order.",
  teaserTitle: "Signage packs",
  teaserText: "Sponsor banner packs, site safety signs, fence mesh, school packs, expo packs and flag 3-packs.",
  groups: [
    { id: "sport", title: "Sports club sponsor banners", text: "2000 × 1000mm PVC banners, hemmed with eyelets every metre, one design per sponsor. Ready for the fence before the season starts." },
    { id: "site", title: "Building site safety corflutes", text: "600 × 900mm, 5mm corflute, printed single sided, with an eyelet in each corner for cable ties." },
    { id: "mesh", title: "Site fence mesh", text: "2400 × 1600mm mesh banners with welded edges and eyelets, sized for temporary fence panels. Wind passes through the mesh." },
    { id: "school", title: "School pack", text: "Everything for an open day or sports carnival in one order." },
    { id: "event", title: "Event and expo packs", text: "Built around a 2.4 × 2.2m media wall for a stand, launch or photo backdrop." },
    { id: "flags", title: "Teardrop flag 3-packs", text: "Three 2.3m teardrop flags, each with a pole set and 10kg square base." },
  ],
  bands: [{ label: "Price per pack", min: 1 }],
  items: [
    { id: "sponsor-5", group: "sport", label: "Sponsor banner 5-pack: 5 × PVC banner 2000 × 1000mm, 5 designs", short: "5 banners, 5 designs", includes: "5 printed PVC banners, hemmed with eyelets", ...tier(435) },
    { id: "sponsor-10", group: "sport", label: "Sponsor banner 10-pack: 10 × PVC banner 2000 × 1000mm, 10 designs", short: "10 banners, 10 designs", includes: "10 printed PVC banners, hemmed with eyelets", ...tier(805) },
    { id: "site-cf-5", group: "site", label: "Site safety corflute 5-pack: 5 × 600 × 900mm 5mm, corner eyelets, 5 designs", short: "5 signs, 5 designs", includes: "5 printed corflute signs with 4 corner eyelets each", ...tier(265) },
    { id: "site-cf-10", group: "site", label: "Site safety corflute 10-pack: 10 × 600 × 900mm 5mm, corner eyelets, 10 designs", short: "10 signs, 10 designs", includes: "10 printed corflute signs with 4 corner eyelets each", ...tier(380) },
    { id: "mesh-2", group: "mesh", label: "Site fence mesh 2-pack: 2 × mesh banner 2400 × 1600mm, 1 design", short: "2 mesh banners, 1 design", includes: "2 printed mesh banners, welded edges and eyelets", ...tier(300) },
    { id: "mesh-4", group: "mesh", label: "Site fence mesh 4-pack: 4 × mesh banner 2400 × 1600mm, 1 design", short: "4 mesh banners, 1 design", includes: "4 printed mesh banners, welded edges and eyelets", ...tier(540) },
    { id: "school", group: "school", label: "School pack: 2 × PVC banner 2000 × 1000mm, 2 × 2.3m teardrop flag (single sided), 10 × 600 × 900mm corflute", short: "2 banners, 2 flags, 10 corflutes", includes: "2 PVC banners (1 design), 2 single-sided teardrop flags with 10kg bases (1 design), 10 corflute signs (5 designs)", ...tier(1005) },
    { id: "event-starter", group: "event", label: "Event starter pack: 2.4 × 2.2m media wall kit + 850 × 2000mm pull up banner", short: "Media wall + pull up banner", includes: "Media wall frame, print and bag, plus a pull up banner with stand", ...tier(845) },
    { id: "event-full", group: "event", label: "Expo stand pack: 2.4 × 2.2m media wall kit + 850 × 2000mm pull up banner + 6ft fitted table cover", short: "Media wall + pull up + table cover", includes: "Media wall frame, print and bag, a pull up banner with stand, and a fitted 6ft table cover", ...tier(1115) },
    { id: "flags-3-single", group: "flags", label: "Teardrop flag 3-pack: 3 × 2.3m teardrop, single sided, 3 designs", short: "Single sided, 3 designs", includes: "3 printed flags, pole sets and 10kg square bases", ...tier(720) },
    { id: "flags-3-double", group: "flags", label: "Teardrop flag 3-pack: 3 × 2.3m teardrop, double sided, 3 designs", short: "Double sided, 3 designs", includes: "3 printed flags, pole sets and 10kg square bases", ...tier(860) },
  ],
  notes: [
    "One price per pack, including everything except freight.",
    "We'll email you a quote with freight included.",
    "Want a different mix or quantity? Tell us in the Notes box and we'll quote it.",
  ],
  artwork: "Send us your logos and wording, or finished artwork for each design. We'll set up anything that needs it and send you a proof to approve before we print.",
  faqs: FAQS,
  hero: { ...MOCKUPS.v4PvcBanner, title: "Sponsor banner (PVC banner shown)" },
  gallery: [
    { ...MOCKUPS.v4PvcBanner, title: "Sponsor banners (PVC banner shown)" },
    { ...MOCKUPS.v4Corflute, title: "Site corflutes (corflute sign shown)" },
    { ...MOCKUPS.v4MeshBannerEvent, title: "Fence mesh (mesh on event fencing shown)" },
    { ...MOCKUPS.v4FlagsTeardrop, title: "Teardrop flag packs" },
    { ...MOCKUPS.v4MediaWall, title: "Event packs (media wall shown)" },
    { ...MOCKUPS.v4PullUp, title: "Pull up banner, in event packs" },
  ],
  galleryHeading: "What's in the packs",
  notesHint: "Club, school or site name, event date, how many designs, or changes to the pack",
};
