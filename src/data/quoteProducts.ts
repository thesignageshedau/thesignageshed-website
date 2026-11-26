// Products offered on the general "Request a quote" page (#/quote). Slugs match the product page routes,
// so #/quote?product=gazebos pre-selects Gazebos.
export const QUOTE_PRODUCTS: { slug: string; label: string; optionHint: string }[] = [
  { slug: "media-walls", label: "Media walls", optionHint: "e.g. 3m x 2.2m, single sided, complete kit" },
  { slug: "table-covers", label: "Table covers", optionHint: "e.g. 6ft fitted, full colour" },
  { slug: "pull-up-banners", label: "Pull up banners", optionHint: "e.g. 850mm x 2000mm standard" },
  { slug: "corflute-signs", label: "Corflute signs", optionHint: "e.g. 600 x 900mm, 5mm, double sided" },
  { slug: "a-frames", label: "A-frames", optionHint: "e.g. 600 x 900mm, both sides printed" },
  { slug: "banners", label: "Vinyl and mesh banners", optionHint: "e.g. 3000 x 1000mm mesh, eyelets" },
  { slug: "gazebos", label: "Gazebos", optionHint: "e.g. 3m x 3m with 2 walls" },
  { slug: "flags", label: "Teardrop and feather flags", optionHint: "e.g. medium feather flag, ground spike" },
  { slug: "market-umbrellas", label: "Market umbrellas", optionHint: "e.g. 2.4m, printed on all panels" },
  { slug: "stretch-fabric-displays", label: "Stretch fabric displays", optionHint: "e.g. 850 × 2000mm, double sided" },
  { slug: "table-top-banners", label: "Table-top banners", optionHint: "e.g. 600mm tall × 6ft" },
  { slug: "acm-signs", label: "ACM signs", optionHint: "e.g. 1200 × 900mm" },
  { slug: "rectangle-flags", label: "Rectangle flags", optionHint: "e.g. medium, cross base" },
  { slug: "lightbox-displays", label: "Lightbox displays", optionHint: "e.g. 2000 × 2000mm, double sided" },
  { slug: "big-head-cutouts", label: "Big head cutouts", optionHint: "e.g. large, corrugated plastic, 10 heads" },
  { slug: "seg-fabric-frames", label: "SEG fabric frames", optionHint: "e.g. 3 sections" },
  { slug: "crowd-barriers", label: "Crowd barrier frames and covers", optionHint: "e.g. 2000mm frame, double sided" },
  { slug: "selfie-frames", label: "Selfie frames", optionHint: "e.g. large, wedding names and date" },
  { slug: "car-magnets", label: "Car magnets", optionHint: "e.g. 600 × 300mm, pair" },
  { slug: "business-cards", label: "Business cards", optionHint: "e.g. luxury velvet, 500 cards" },
  { slug: "printed-vinyl", label: "Printed self-adhesive vinyl", optionHint: "e.g. A3, premium white" },
  { slug: "posters", label: "Posters", optionHint: "e.g. A1, 10 posters" },
  { slug: "foam-pvc-signs", label: "Foam PVC signs and counter cards", optionHint: "e.g. A4 counter card, 5 pieces" },
  { slug: "window-clings", label: "Window clings", optionHint: "e.g. 600 × 900mm, 2 clings" },
  { slug: "x-banner-stands", label: "X-banner stands", optionHint: "e.g. 600 × 1600mm, 2 stands" },
  { slug: "fabric-display-cubes", label: "Fabric display cubes", optionHint: "e.g. 610mm, 3 cubes" },
  { slug: "printed-chairs", label: "Director's and deck chairs", optionHint: "e.g. 4 director's chairs, single sided" },
  { slug: "arch-banners", label: "Arch banners", optionHint: "e.g. large arch, grass" },
  { slug: "packs", label: "Signage packs", optionHint: "e.g. sponsor banner 10-pack" },
  { slug: "clothing", label: "Clothing", optionHint: "e.g. 10 black tees, full front, mixed sizes" },
  { slug: "other", label: "Something else or a mix", optionHint: "Tell us the size or option you're after" },
];
/** Quote form link, pre-filling product and size, plus extras like option, sides and qty. */
export const quoteHref = (slug?: string, size?: string, extra: Record<string, string | number> = {}) => {
  if (!slug) return "/quote/";
  const q = new URLSearchParams({ product: slug });
  if (size) q.set("size", size);
  for (const [k, v] of Object.entries(extra)) q.set(k, String(v));
  return `/quote/?${q.toString()}`;
};
