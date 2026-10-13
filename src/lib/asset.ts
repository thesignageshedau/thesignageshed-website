// Prefix a file in /public with the site's base path (needed on GitHub Pages project sites).
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

export const srcSet = (name: string) =>
  [480, 800, 1200, 1600].map((w) => `${asset(`images/${name}-${w}.webp`)} ${w}w`).join(", ");
