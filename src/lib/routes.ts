// Page links. GitHub Pages only serves files, so pages other than home use hash routes (#/media-walls).
export const MEDIA_WALLS_HREF = "#/media-walls";
export const TABLE_COVERS_HREF = "#/table-covers";
export const PULL_UP_BANNERS_HREF = "#/pull-up-banners";
export const QUOTE_THANKS_HREF = "#/quote-thanks";
export const homeSection = (id: string) => `#${id}`;
export function goTo(href: string) {
  window.location.hash = href.replace(/^#/, "");
}
/** Full URL of a page on this site (for FormSubmit's _next redirect). */
export const absoluteUrl = (href: string) =>
  `${window.location.origin}${window.location.pathname}${href}`;
export const PRIVACY_HREF = "#/privacy-policy";
