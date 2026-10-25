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
  "market-umbrellas", "banners", "stretch-fabric-displays", "table-top-banners", "acm-signs", "rectangle-flags", "lightbox-displays", "big-head-cutouts", "seg-fabric-frames", "crowd-barriers", "selfie-frames", "car-magnets", "business-cards", "quote", "check-artwork", "for-sign-shops", "delivery", "faq", "artwork-help", "about",
  "guides", "guides/pull-up-banner-size", "guides/corflute-vs-rigid-signs", "guides/print-ready-artwork",
  "cafe-a-frame-signs", "corflute-event-signs", "shop-window-wall-signs",
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

// Sitemap <lastmod>: the date of the last commit (the site is built and deployed from main on every push),
// falling back to the build date when git isn't available. W3C date format (YYYY-MM-DD).
{
  const { execSync } = await import("node:child_process");
  let lastmod = "";
  try {
    lastmod = execSync("git log -1 --format=%cs", { encoding: "utf8" }).trim();
  } catch {}
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) lastmod = new Date().toISOString().slice(0, 10);
  const file = join(DIST, "sitemap.xml");
  const xml = (await readFile(file, "utf8"))
    .replace(/<lastmod>[^<]*<\/lastmod>/g, "")
    .replace(/(<loc>[^<]*<\/loc>)/g, `$1<lastmod>${lastmod}</lastmod>`);
  await writeFile(file, xml);
  console.log(`sitemap lastmod ${lastmod}`);
}

// Renamed pages: static redirect stubs so old links (and the GitHub Pages file server) land on the new page.
for (const [from, to] of [["expandable-seg-a-frames", "seg-fabric-frames"], ["barrier-covers", "crowd-barriers"]]) {
  const dir = join(DIST, from);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="https://thesignageshed.au/${to}/"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/${to}/"><script>location.replace("/${to}/"+location.search+location.hash)</script><a href="/${to}/">This page has moved</a>`);
}
