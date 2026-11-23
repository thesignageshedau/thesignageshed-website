// Checks prerendered Product JSON-LD against Google's Product snippet and Merchant listing
// required fields: name, image (crawlable local file), Offer or AggregateOffer with a numeric
// AUD price (or unit price in priceSpecification), and no invented reviews or shipping claims.
// Also checks that marked-up prices and meta/OG/Twitter "From" figures match the
// visible "From" prices on the page.
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const SITE = "https://thesignageshed.au";
const ROUTES = [
  "", "media-walls", "table-covers", "pull-up-banners", "corflute-signs", "a-frames", "gazebos", "flags",
  "market-umbrellas", "banners", "stretch-fabric-displays", "table-top-banners", "acm-signs", "rectangle-flags", "lightbox-displays", "big-head-cutouts", "seg-fabric-frames", "crowd-barriers", "selfie-frames", "car-magnets", "business-cards", "printed-vinyl", "packs", "quote", "check-artwork", "for-sign-shops", "delivery", "faq", "artwork-help", "about",
  "guides", "guides/pull-up-banner-size", "guides/corflute-vs-rigid-signs", "guides/print-ready-artwork",
  "cafe-a-frame-signs", "corflute-event-signs", "shop-window-wall-signs",
  "pull-up-banners-australia", "corflute-signs-australia", "media-walls-australia", "event-signage-australia", "school-and-sports-club-signs",
  "refund-policy", "privacy-policy", "terms", "quote-thanks",
];
const errors = [];
const fail = (route, msg) => errors.push(`/${route}${route ? "/" : ""}: ${msg}`);

function products(html) {
  const out = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis;
  for (const m of html.matchAll(re)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      out.push({ parseError: String(e) });
      continue;
    }
    const items = Array.isArray(data) ? data : [data];
    for (const it of items) if (it && it["@type"] === "Product") out.push(it);
  }
  return out;
}

function visibleFrom(html) {
  const vis = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
  const all = [];
  for (const m of vis.matchAll(/from\s+\$\s*([\d,]+)(?:\s*per\s*m(?:²|2))?/gi)) {
    all.push({ amount: Number(m[1].replace(/,/g, "")), perM2: /per\s*m/i.test(m[0]) });
  }
  return all;
}

async function fileExists(absUrl) {
  if (!absUrl.startsWith(SITE + "/")) return false;
  const rel = absUrl.slice(SITE.length + 1);
  try {
    await access(join(DIST, rel));
    return true;
  } catch {
    return false;
  }
}

function offerPrice(offers) {
  if (!offers) return null;
  if (offers.price != null) return { amount: Number(offers.price), perM2: false, source: "price" };
  const spec = offers.priceSpecification;
  if (spec?.price != null) {
    const unit = spec.referenceQuantity?.unitCode || spec.referenceQuantity?.unitText;
    const perM2 = unit === "MTK" || String(unit).toLowerCase() === "sqm";
    return { amount: Number(spec.price), perM2, source: "priceSpecification" };
  }
  if (offers.lowPrice != null) return { amount: Number(offers.lowPrice), perM2: false, source: "lowPrice" };
  return null;
}

for (const route of ROUTES) {
  const html = await readFile(join(DIST, route, "index.html"), "utf8");
  const found = products(html);
  const froms = visibleFrom(html);
  for (const p of found) {
    if (p.parseError) {
      fail(route, `unparsable JSON-LD (${p.parseError})`);
      continue;
    }
    if (!p.name) fail(route, "Product is missing name");
    if (!p.image || typeof p.image !== "string") fail(route, "Product is missing image");
    else if (!(await fileExists(p.image))) fail(route, `Product image is not in the build: ${p.image}`);
    if (p.aggregateRating || p.review) fail(route, "must not include reviews or ratings");
    const offers = p.offers;
    if (!offers) {
      fail(route, "Product is missing offers");
      continue;
    }
    if (offers.shippingDetails || offers.hasMerchantReturnPolicy || p.hasMerchantReturnPolicy) {
      fail(route, "must not invent shipping or return policy markup");
    }
    const currency = offers.priceCurrency || offers.priceSpecification?.priceCurrency;
    if (currency !== "AUD") fail(route, `priceCurrency should be AUD, got ${currency}`);
    const typ = offers["@type"];
    if (typ !== "Offer" && typ !== "AggregateOffer") fail(route, `unexpected offers type ${typ}`);
    if (typ === "AggregateOffer") {
      if (typeof offers.lowPrice !== "number" || !(offers.lowPrice > 0)) fail(route, "AggregateOffer needs a numeric lowPrice > 0");
      if (typeof offers.highPrice !== "number" || offers.highPrice < offers.lowPrice) {
        fail(route, "AggregateOffer needs highPrice >= lowPrice");
      }
    }
    const marked = offerPrice(offers);
    if (!marked || !Number.isFinite(marked.amount) || marked.amount <= 0) {
      fail(route, "offer is missing a numeric price greater than zero");
      continue;
    }
    const match = froms.find((f) => f.amount === marked.amount && f.perM2 === marked.perM2);
    if (froms.length && !match) {
      fail(
        route,
        `marked-up ${marked.perM2 ? "per-m² " : ""}price ${marked.amount} does not match visible From prices (${froms
          .map((f) => `${f.amount}${f.perM2 ? "/m²" : ""}`)
          .join(", ")})`,
      );
    }
  }

  const attrs = (name, key = "name") => {
    const out = [];
    const re = new RegExp(`<meta[^>]+${key}="${name}"[^>]+content="([^"]*)"`, "gi");
    for (const m of html.matchAll(re)) out.push(m[1].replaceAll("&amp;", "&"));
    return out;
  };
  const title = (html.match(/<title>(.*?)<\/title>/is) || ["", ""])[1].replace(/<[^>]+>/g, "");
  const metaTexts = [
    ["title", title],
    ...["description", "twitter:title", "twitter:description"].flatMap((n) => attrs(n).map((v) => [n, v])),
    ...["og:title", "og:description"].flatMap((n) => attrs(n, "property").map((v) => [n, v])),
  ];
  for (const [field, text] of metaTexts) {
    if (!text) continue;
    for (const m of text.matchAll(/from\s+\$\s*([\d,]+)(?:\s*per\s*m(?:²|2))?/gi)) {
      const amount = Number(m[1].replace(/,/g, ""));
      if (amount === 180) continue; // minimum-order note
      const perM2 = /per\s*m/i.test(m[0]);
      const match = froms.find((f) => f.amount === amount && f.perM2 === perM2);
      if (froms.length && !match) {
        fail(
          route,
          `${field} "From $${amount}${perM2 ? " per m²" : ""}" does not match visible From prices (${froms
            .map((f) => `${f.amount}${f.perM2 ? "/m²" : ""}`)
            .join(", ")})`,
        );
      }
    }
  }
}

if (errors.length) {
  console.error(`Product JSON-LD check failed (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Product JSON-LD ok (${ROUTES.length} pages)`);
