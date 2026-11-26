// Page links. GitHub Pages only serves files, so pages other than home use hash routes (#/media-walls).
export const MEDIA_WALLS_HREF = "/media-walls/";
export const TABLE_COVERS_HREF = "/table-covers/";
export const PULL_UP_BANNERS_HREF = "/pull-up-banners/";
export const CORFLUTE_SIGNS_HREF = "/corflute-signs/";
export const A_FRAMES_HREF = "/a-frames/";
export const GAZEBOS_HREF = "/gazebos/";
export const FLAGS_HREF = "/flags/";
export const MARKET_UMBRELLAS_HREF = "/market-umbrellas/";
export const BANNERS_HREF = "/banners/";
export const CLOTHING_HREF = "/clothing/";
export const SHOPS_AND_CAFES_HREF = "/shops-and-cafes/";
export const TRADIES_HREF = "/tradies/";
export const MARKETS_AND_STALLS_HREF = "/markets-and-stalls/";
export const CLUBS_AND_TEAMS_HREF = "/clubs-and-teams/";
export const GEAR_HREFS = {
  gazebos: GAZEBOS_HREF,
  flags: FLAGS_HREF,
  "market-umbrellas": MARKET_UMBRELLAS_HREF,
  banners: BANNERS_HREF,
  "stretch-fabric-displays": "/stretch-fabric-displays/",
  "table-top-banners": "/table-top-banners/",
  "acm-signs": "/acm-signs/",
  "rectangle-flags": "/rectangle-flags/",
  "lightbox-displays": "/lightbox-displays/",
  "big-head-cutouts": "/big-head-cutouts/",
  "seg-fabric-frames": "/seg-fabric-frames/",
  "crowd-barriers": "/crowd-barriers/",
  "selfie-frames": "/selfie-frames/",
  "car-magnets": "/car-magnets/",
  packs: "/packs/",
  "business-cards": "/business-cards/",
  "printed-vinyl": "/printed-vinyl/",
  "posters": "/posters/",
  "foam-pvc-signs": "/foam-pvc-signs/",
  "window-clings": "/window-clings/",
  "x-banner-stands": "/x-banner-stands/",
  "fabric-display-cubes": "/fabric-display-cubes/",
  "printed-chairs": "/printed-chairs/",
  "arch-banners": "/arch-banners/",
} as const;
export const CHECK_ARTWORK_HREF = "/check-artwork/";
export const QUOTE_THANKS_HREF = "/quote-thanks/";
export const homeSection = (id: string) => (id === "top" ? "/" : `/#${id}`);
/** Client-side navigation: update the address and tell the app (it listens for hashchange/popstate). */
export function goTo(href: string) {
  history.pushState(null, "", href);
  window.dispatchEvent(new Event("hashchange"));
}
/** Full URL of a page on this site (for FormSubmit's _next redirect). */
export const absoluteUrl = (href: string) =>
  `${window.location.origin}${href}`;
export const PRIVACY_HREF = "/privacy-policy/";
