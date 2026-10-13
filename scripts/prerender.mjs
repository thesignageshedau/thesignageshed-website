// Pre-renders every page to real HTML after `vite build`, so search engines and link previews
// see the full content, headings, FAQs, titles, meta tags, canonical and JSON-LD without running JS.
// Serves dist/ with an SPA fallback, opens each route in headless Chromium, and saves the DOM to
// dist/<route>/index.html. Unknown paths get dist/404.html (the "Page not found" page, noindex).
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { chromium } from "playwright";

const DIST = new URL("../dist/", import.meta.url).pathname;
export const ROUTES = [
  "", "media-walls", "table-covers", "pull-up-banners", "corflute-signs", "a-frames", "gazebos", "flags",
  "market-umbrellas", "banners", "quote", "check-artwork", "for-sign-shops", "delivery", "artwork-help",
  "refund-policy", "privacy-policy", "terms", "quote-thanks",
];
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".json": "application/json", ".mjs": "text/javascript", ".pdf": "application/pdf", ".ico": "image/x-icon", ".mp4": "video/mp4", ".webmanifest": "application/manifest+json" };
const shell = await readFile(join(DIST, "index.html"));

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = join(DIST, path);
  try {
    if (extname(path) && (await stat(file)).isFile()) {
      res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
      return res.end(await readFile(file));
    }
  } catch {}
  res.writeHead(200, { "content-type": "text/html" });
  res.end(shell);
}).listen(0);
const origin = `http://localhost:${server.address().port}`;

const browser = await chromium.launch();
// Reduced motion: the scroll-in animation never hides anything in the saved HTML.
const page = await browser.newPage({ reducedMotion: "reduce", viewport: { width: 1366, height: 900 } });
await page.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());

async function snapshot(path) {
  await page.goto(origin + path, { waitUntil: "networkidle" });
  await page.waitForFunction(() => !document.body.innerText.includes("Loading the artwork checker"));
  await page.waitForTimeout(150); // FAQ JSON-LD is added on the next tick
  const html = "<!doctype html>\n" + (await page.evaluate(() => {
    document.querySelectorAll(".rv").forEach((el) => el.classList.remove("rv", "in"));
    return document.documentElement.outerHTML;
  }));
  return html.replaceAll(origin, "https://thesignageshed.au"); // e.g. the form's _next address
}

for (const r of ROUTES) {
  const html = await snapshot(r ? `/${r}/` : "/");
  const dir = join(DIST, r);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  console.log(`prerendered /${r}${r ? "/" : ""} (${(html.length / 1024).toFixed(0)} KB)`);
}
await writeFile(join(DIST, "404.html"), await snapshot("/__not-found__/"));
console.log("prerendered 404.html");
await browser.close();
server.close();
