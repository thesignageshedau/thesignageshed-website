// Product mockup images (rendered composites using our real logo files).
// Web files are built by scripts/build-mockups.mjs into public/images/mockups.
export type Mockup = { slug: string; title: string; alt: string };

export const MOCKUPS = {
  mediaWallSingle: {
    slug: "media-wall-single",
    title: "Single sided",
    alt: "Single-sided fabric media wall printed with The Signage Shed logo in charcoal and rust, standing in an event foyer",
  },
  mediaWallDouble: {
    slug: "media-wall-double",
    title: "Double sided",
    alt: "Two double-sided fabric media walls in an expo hall, one showing the charcoal side and the other the cream side",
  },
  mediaWallLed: {
    slug: "media-wall-led",
    title: "LED backlit",
    alt: "LED backlit fabric media wall glowing evenly in a dimmed convention foyer",
  },
  tableCoverFitted: {
    slug: "table-cover-fitted",
    title: "Fitted table cover",
    alt: "Fitted charcoal table cover with The Signage Shed logo on the front panel, set up in an event foyer",
  },
  tableCoverLoose: {
    slug: "table-cover-loose",
    title: "Loose (draped) table cover",
    alt: "Loose cream table throw draped over a trestle table with the logo on the front drop, in a convention foyer",
  },
  pullUpLuxury: {
    slug: "pull-up-luxury",
    title: "Luxury pull up banner",
    alt: "Two luxury pull up banners with silver bases, one cream and one charcoal, standing in an expo hall",
  },
  pullUpDouble: {
    slug: "pull-up-double",
    title: "Double sided pull up banner",
    alt: "Double-sided pull up banners in charcoal and rust with The Signage Shed logo, in an event foyer",
  },
  corfluteFence: {
    slug: "corflute-fence",
    title: "Cable-tied to a fence",
    alt: "Charcoal corflute sign with The Signage Shed logo cable-tied to a black palisade fence at a sports club",
  },
  corfluteShopfront: {
    slug: "corflute-shopfront",
    title: "Mounted on a shopfront",
    alt: "Cream corflute sign with The Signage Shed logo mounted on a shopfront window",
  },
  aframeAluminium: {
    slug: "aframe-aluminium",
    title: "Printed aluminium A-frame",
    alt: "Printed aluminium A-frame sign with silver frame and charcoal panel on a café footpath",
  },
  aframeInsert: {
    slug: "aframe-insert",
    title: "Insert A-frame",
    alt: "Black insert-frame A-frame sign with a carry handle and cream printed panel on a park path",
  },
  aframeRealEstate: {
    slug: "aframe-real-estate",
    title: "Real estate A-frame (600 x 450)",
    alt: "Real estate A-frame with a 600 x 450 landscape panel on a black frame, on a brick-paved driveway",
  },
  aframeFolding: {
    slug: "aframe-folding",
    title: "Folding corflute A-frame",
    alt: "Rust folding corflute A-frame sign on the lawn beside a lawn bowls green",
  },
  gazebo3x3: {
    slug: "gazebo-3x3",
    title: "3 × 3m gazebo with printed back wall",
    alt: "Black 3 by 3 metre pop up gazebo with The Signage Shed logo on the canopy and a printed cream back wall, on a park lawn",
  },
  gazebo6x3: {
    slug: "gazebo-6x3",
    title: "6 × 3m gazebo with printed back wall",
    alt: "Black 6 by 3 metre pop up gazebo with The Signage Shed logo on the canopy, valance and back wall, on a park lawn",
  },
  flags: {
    slug: "flags",
    title: "Teardrop and feather flags",
    alt: "A rust teardrop flag and a charcoal feather flag with The Signage Shed logo on square black bases, beside a lake",
  },
  umbrella: {
    slug: "umbrella",
    title: "Printed market umbrella",
    alt: "Square market umbrella with a charcoal canopy and cream valance printed with The Signage Shed logo, on a garden path",
  },
} satisfies Record<string, Mockup>;
