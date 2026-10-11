// Prefix a file in /public with the site's base path (needed on GitHub Pages project sites).
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

export const srcSet = (name: string) =>
  `${asset(`images/${name}-800.webp`)} 800w, ${asset(`images/${name}-1600.webp`)} 1600w`;
