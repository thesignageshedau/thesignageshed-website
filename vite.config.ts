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

// BASE_PATH is set by the GitHub Pages workflow ("/thesignageshed-website/").
// With a custom domain (e.g. thesignageshed.com.au) it should be "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), siteCopyHtml()],
  build: { assetsInlineLimit: 0 },
});
