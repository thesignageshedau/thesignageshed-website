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
