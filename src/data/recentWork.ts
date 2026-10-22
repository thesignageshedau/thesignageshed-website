// Recent work gallery. Real jobs only: photos we took of signage we made, with the customer's OK.
// Leave the array empty and the section doesn't render. Never add stock, placeholder or mock-up images here.
// image: a slug in public/images with -480/-800/-1200/-1600 .webp versions (see lib/asset srcSet).
export type RecentJob = {
  id: string;
  title: string; // e.g. "Shopfront A-frame for a cafe"
  product?: string; // e.g. "Printed aluminium A-frame"
  image: string;
  alt: string;
};

export const RECENT_WORK: RecentJob[] = [];
