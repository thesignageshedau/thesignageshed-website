// Inlines the critical CSS into every pre-rendered page and loads the full stylesheet without
// blocking render (beasties "media" strategy, with a <noscript> fallback). Runs after prerender.mjs.
import Beasties from "beasties";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ROUTES } from "./prerender-routes.mjs";

const DIST = new URL("../dist/", import.meta.url).pathname;
const beasties = new Beasties({ path: DIST, publicPath: "/", preload: "media", noscriptFallback: true, inlineFonts: true, preloadFonts: false, pruneSource: false, reduceInlineStyles: false, logLevel: "warn" });
const files = [...ROUTES.map((r) => join(DIST, r, "index.html")), join(DIST, "404.html")];
for (const f of files) {
  const html = await readFile(f, "utf8");
  const out = await beasties.process(html);
  await writeFile(f, out);
  const inl = (out.match(/<style>([\s\S]*?)<\/style>/) || ["", ""])[1].length;
  console.log(`critical css ${f.replace(DIST, "/")} inlined ${(inl / 1024).toFixed(1)} KB`);
}
