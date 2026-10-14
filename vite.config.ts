import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { SITE_COPY } from "./src/data/products";

// Fills the title and description placeholders in index.html from src/data/products.ts,
// so they follow the SHOW_ETSY_PACKS flag.
const siteCopyHtml = (): Plugin => ({
  name: "site-copy-html",
  transformIndexHtml: (html) =>
    html
      .replaceAll("%SITE_TITLE%", SITE_COPY.title)
      .replaceAll("%SITE_DESCRIPTION%", SITE_COPY.description)
      .replaceAll("%SITE_OG_DESCRIPTION%", SITE_COPY.ogDescription),
});

// Preloads the fonts used above the fold (Ultra headings, Zilla Slab 400 body and 600 eyebrows/buttons).
const fontPreload = (): Plugin => ({
  name: "font-preload",
  enforce: "post",
  transformIndexHtml(html, ctx) {
    if (!ctx.bundle) return html;
    const want = [/ultra-latin-400-normal/, /zilla-slab-latin-400-normal/, /zilla-slab-latin-600-normal/];
    const files = Object.keys(ctx.bundle).filter((f) => f.endsWith(".woff2") && want.some((r) => r.test(f)));
    const base = process.env.BASE_PATH ?? "/";
    return { html, tags: files.map((f) => ({ tag: "link", attrs: { rel: "preload", href: base + f, as: "font", type: "font/woff2", crossorigin: "" }, injectTo: "head-prepend" as const })) };
  },
});

// BASE_PATH is set by the GitHub Pages workflow ("/thesignageshed-website/").
// With a custom domain (e.g. thesignageshed.com.au) it should be "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), siteCopyHtml(), fontPreload()],
  build: { assetsInlineLimit: 0 },
});
