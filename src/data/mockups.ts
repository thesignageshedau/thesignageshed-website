// Product mockup images (AI-generated scenes with our real logo files composited on).
// Web files are built by scripts/build-mockups.mjs into public/images/mockups.
export type Mockup = { slug: string; title: string; alt: string };

export const MOCKUPS = {
  mediaWallSingle: {
    slug: "media-wall-single",
    title: "Single sided",
    alt: "Single-sided charcoal fabric media wall with orange pinstripes and The Signage Shed logo on a cream panel, in an event foyer",
  },
  mediaWallDouble: {
    slug: "media-wall-double",
    title: "Double sided",
    alt: "Charcoal fabric media wall with orange and cream stripes and The Signage Shed logo on a cream panel, in an expo hall",
  },
  mediaWallLed: {
    slug: "media-wall-led",
    title: "LED backlit",
    alt: "LED backlit media wall with glowing orange stripes and The Signage Shed logo on a cream panel, in a dim convention foyer",
  },
  tableCoverFitted: {
    slug: "table-cover-fitted",
    title: "Fitted table cover",
    alt: "Fitted charcoal table cover with an orange stripe and The Signage Shed logo on the front panel, in an event foyer",
  },
  tableCoverLoose: {
    slug: "table-cover-loose",
    title: "Loose (draped) table cover",
    alt: "Loose charcoal table throw with orange and cream stripes and The Signage Shed logo on the front, in a convention foyer",
  },
  pullUpLuxury: {
    slug: "pull-up-luxury",
    title: "Luxury pull up banner",
    alt: "Luxury charcoal pull up banner with a silver base and The Signage Shed logo, standing in an expo hall",
  },
  pullUpDouble: {
    slug: "pull-up-double",
    title: "Double sided pull up banner",
    alt: "Double-sided charcoal pull up banner with an orange and cream swoosh and The Signage Shed logo, in an event foyer",
  },
  corfluteFence: {
    slug: "corflute-fence",
    title: "Cable-tied to a fence",
    alt: "Charcoal and cream corflute sign with The Signage Shed logo cable-tied to a chain-link fence at a sports field",
  },
  corfluteShopfront: {
    slug: "corflute-shopfront",
    title: "Mounted on a shopfront",
    alt: "Cream and charcoal corflute sign with The Signage Shed logo mounted on a brick shopfront",
  },
  aframeAluminium: {
    slug: "aframe-aluminium",
    title: "Printed aluminium A-frame",
    alt: "Silver aluminium A-frame with a cream printed panel, orange hazard stripes and The Signage Shed logo, on a café footpath",
  },
  aframeInsert: {
    slug: "aframe-insert",
    title: "Insert A-frame",
    alt: "Black insert-frame A-frame with a cream printed panel and The Signage Shed logo, on a park path under gum trees",
  },
  aframeRealEstate: {
    slug: "aframe-real-estate",
    title: "Real estate A-frame (600 x 450)",
    alt: "Real estate A-frame with a landscape panel showing The Signage Shed logo, on a brick-paved driveway",
  },
  aframeFolding: {
    slug: "aframe-folding",
    title: "Folding corflute A-frame",
    alt: "Folding corflute A-frame with The Signage Shed logo on a path beside a lawn bowls green",
  },
  gazebo3x3: {
    slug: "gazebo-3x3",
    title: "3 × 3m gazebo with printed back wall",
    alt: "Black 3 by 3 metre pop up gazebo with The Signage Shed logo on the valance and printed back wall, on a park lawn",
  },
  gazebo6x3: {
    slug: "gazebo-6x3",
    title: "6 × 3m gazebo with printed back wall",
    alt: "Black 6 by 3 metre pop up gazebo with The Signage Shed logo on the valance and an orange-striped back wall, on a park lawn",
  },
  flags: {
    slug: "flags",
    title: "Teardrop and feather flags",
    alt: "A teardrop flag and a feather flag in charcoal with The Signage Shed logo, beside a lake with gum trees",
  },
  umbrella: {
    slug: "umbrella",
    title: "Printed market umbrella",
    alt: "Charcoal and cream market umbrella with The Signage Shed logo on the valance, on a garden path near a market",
  },
} satisfies Record<string, Mockup>;
