// Product mockup images (AI-generated scenes with our real logo files composited on).
// Web files are built by scripts/build-mockups.mjs into public/images/mockups.
export type Mockup = { slug: string; title: string; alt: string };

export const MOCKUPS = {
  bannerPvc: {
    slug: "banner-pvc",
    title: "PVC vinyl banner",
    alt: "Cream PVC vinyl banner with The Signage Shed logo and charcoal and orange stripes, fixed to a timber rail fence",
  },
  bannerMesh: {
    slug: "banner-mesh",
    title: "Mesh vinyl banner",
    alt: "Mesh vinyl banner with The Signage Shed logo fixed to a construction site fence",
  },
  bannerFabricMesh: {
    slug: "banner-fabric-mesh",
    title: "Fabric mesh banner",
    alt: "Fabric mesh banner with The Signage Shed logo on a temporary event fence",
  },
  mediaWallSingle: {
    slug: "media-wall-single",
    title: "Single sided",
    alt: "Fabric sock and frame media wall printed in cream with orange and charcoal stripes and The Signage Shed logo, in an event foyer",
  },
  mediaWallDouble: {
    slug: "media-wall-double",
    title: "Double sided",
    alt: "Charcoal fabric sock and frame media wall with orange and cream stripes and The Signage Shed logo on a cream panel, in an expo hall",
  },
  mediaWallLed: {
    slug: "media-wall-led",
    title: "LED backlit",
    alt: "Fabric sock and frame media wall lit by LED lights, with glowing orange stripes and The Signage Shed logo on a cream panel, in a dim convention foyer",
  },
  tableCoverFitted: {
    slug: "table-cover-fitted",
    title: "Fitted table cover",
    alt: "Fitted cream 6ft table cover with charcoal and orange stripes and The Signage Shed logo on the front, in an expo hall",
  },
  tableCoverLoose: {
    slug: "table-cover-loose",
    title: "Loose (draped) table cover",
    alt: "Loose charcoal table throw with orange and cream stripes and The Signage Shed logo on the front, in a convention foyer",
  },
  pullUpLuxury: {
    slug: "pull-up-luxury",
    title: "Luxury pull up banner",
    alt: "Pull up banner with a silver base, printed in cream with The Signage Shed logo, standing in a conference foyer",
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
    alt: "Cream corflute sign with charcoal and orange borders and The Signage Shed logo mounted on a shopfront wall",
  },
  aframeAluminium: {
    slug: "aframe-aluminium",
    title: "Printed aluminium A-frame",
    alt: "Silver aluminium A-frame with a cream printed panel, orange and charcoal border and The Signage Shed logo, on a café footpath",
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
    alt: "3 by 3 metre pop up gazebo with a cream striped canopy and The Signage Shed logo on the printed back wall, on a park lawn",
  },
  gazebo6x3: {
    slug: "gazebo-6x3",
    title: "6 × 3m gazebo with printed back wall",
    alt: "Black 6 by 3 metre pop up gazebo with The Signage Shed logo on the valance and an orange-striped back wall, on a park lawn",
  },
  flags: {
    slug: "flags",
    title: "Teardrop and feather flags",
    alt: "A cream teardrop flag and a cream feather flag printed with The Signage Shed logo running up each flag, beside a lake with gum trees",
  },
  umbrella: {
    slug: "umbrella",
    title: "Printed market umbrella",
    alt: "Charcoal and cream market umbrella with The Signage Shed logo on the valance, on a garden path near a market",
  },
} satisfies Record<string, Mockup>;
