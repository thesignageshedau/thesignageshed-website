import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
// The artwork checker (and pdf.js) only loads when someone opens it.
const ArtworkCheckPage = lazy(() => import("./components/ArtworkCheckPage"));
import Header from "./components/Header";
import Hero from "./components/Hero";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LegalPage from "./components/LegalPage";
import MediaWallsPage from "./components/MediaWallsPage";
import MediaWallsTeaser from "./components/MediaWallsTeaser";
import PullUpBannersPage from "./components/PullUpBannersPage";
import PullUpBannersTeaser from "./components/PullUpBannersTeaser";
import CorfluteSignsPage from "./components/CorfluteSignsPage";
import CorfluteSignsTeaser from "./components/CorfluteSignsTeaser";
import AFramesPage from "./components/AFramesPage";
import AFramesTeaser from "./components/AFramesTeaser";
import GearPage from "./components/GearPage";
import EventGearTeaser from "./components/EventGearTeaser";
import { BANNERS, FLAGS, GAZEBOS, UMBRELLAS } from "./data/eventGear";
import QuoteBar from "./components/QuoteBar";
import TrustStrip from "./components/TrustStrip";
import FaqSchema from "./components/FaqSchema";
import { QUOTE_PRODUCTS } from "./data/quoteProducts";
import DeliveryPage from "./components/DeliveryPage";
import ArtworkHelpPage from "./components/ArtworkHelpPage";
import ForSignShopsPage from "./components/ForSignShopsPage";
import QuotePage from "./components/QuotePage";
import NotFound from "./components/NotFound";
import { PAGE_DESCRIPTIONS } from "./data/pageMeta";
import QuoteThanks from "./components/QuoteThanks";
import TableCoversPage from "./components/TableCoversPage";
import TableCoversTeaser from "./components/TableCoversTeaser";
import { legalDocs } from "./data/legal";
import { LEGAL_PAGES, SITE_COPY, type LegalSlug } from "./data/products";
import { usePageview } from "./lib/analytics";
import { useReveal } from "./lib/reveal";

// GitHub Pages only serves files, so pages other than home use hash routes: /#/refund-policy,
// /#/media-walls, /#/table-covers, /#/pull-up-banners, /#/corflute-signs, /#/a-frames, /#/gazebos, /#/flags, /#/market-umbrellas, /#/banners, /#/quote-thanks.
// (public/404.html also sends clean links like /refund-policy to the hash route.)
// Section links such as #products keep working as normal in-page anchors.
type Route =
  | LegalSlug
  | "media-walls"
  | "table-covers"
  | "pull-up-banners"
  | "corflute-signs"
  | "a-frames"
  | "gazebos"
  | "flags"
  | "market-umbrellas"
  | "banners"
  | "quote-thanks"
  | "quote"
  | "check-artwork"
  | "for-sign-shops"
  | "delivery"
  | "artwork-help";
const slugs = [
  ...LEGAL_PAGES.map((p) => p.slug),
  "media-walls",
  "table-covers",
  "pull-up-banners",
  "corflute-signs",
  "a-frames",
  "gazebos",
  "flags",
  "market-umbrellas",
  "banners",
  "quote-thanks",
  "quote",
  "check-artwork",
  "for-sign-shops",
  "delivery",
  "artwork-help",
] as readonly string[];
/** True for a #/ address that isn't one of our pages (section links like #faq don't count). */
function isUnknownRoute(): boolean {
  return window.location.pathname !== "/" && routeFromHash() === null;
}
/** Old home page anchors for the sign shop content now live on #/for-sign-shops. */
export const SIGN_SHOP_SECTIONS = ["products", "free", "etsy", "why"];
function routeFromHash(): Route | null {
  const m = window.location.pathname.match(/^\/([a-z-]+)\/?$/);
  return m?.[1] && slugs.includes(m[1]) ? (m[1] as Route) : null;
}
const PAGE_TITLES: Partial<Record<Route, string>> = {
  "media-walls": "Media Walls Australia: Printed Fabric Backdrops | The Signage Shed",
  "table-covers": "Printed Table Covers Australia: Custom Table Throws | The Signage Shed",
  "pull-up-banners": "Pull Up Banners Australia: Printed and Delivered | The Signage Shed",
  "corflute-signs": "Corflute Signs Australia: Custom Printed | The Signage Shed",
  "a-frames": "A-Frame Signs Australia: Custom Printed Sandwich Boards | The Signage Shed",
  gazebos: GAZEBOS.pageTitle,
  flags: FLAGS.pageTitle,
  "market-umbrellas": UMBRELLAS.pageTitle,
  banners: BANNERS.pageTitle,
  "quote-thanks": "Quote request sent | The Signage Shed",
  "for-sign-shops": "Pricing Spreadsheets for Sign Shops (Australia) | The Signage Shed",
  "check-artwork": "Check Your Artwork: Free Print File Checker | The Signage Shed",
  delivery: "Delivery Australia-wide: How It Works | The Signage Shed",
  "artwork-help": "Artwork Help: Bleed, Safe Area, Resolution and File Setup | The Signage Shed",
  quote: "Request a Quote: Custom Printed Signage Australia | The Signage Shed",
};

const SITE_URL = "https://thesignageshed.au/";

export default function App() {
  const [route, setRoute] = useState<Route | null>(routeFromHash);
  const [missing, setMissing] = useState(isUnknownRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      setMissing(isUnknownRoute());
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const doc =
    route && route in legalDocs ? legalDocs[route as LegalSlug] : null;

  useEffect(() => {
    document.title = doc
      ? `${doc.title} | The Signage Shed`
      : missing
        ? "Page not found | The Signage Shed"
        : (route && PAGE_TITLES[route]) || SITE_COPY.title;
    const desc = doc?.description ?? ((route && PAGE_DESCRIPTIONS[route]) || SITE_COPY.description);
    const url = `${SITE_URL}${route ? `${route}/` : ""}`;
    const set = (sel: string, attr: string, val: string) => document.querySelector(sel)?.setAttribute(attr, val);
    set('meta[name="description"]', "content", desc);
    for (const s of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) set(s, "content", document.title);
    for (const s of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) set(s, "content", desc);
    if (missing) document.querySelector('link[rel="canonical"]')?.remove();
    else set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    let robots = document.querySelector('meta[name="robots"]');
    if (missing || route === "quote-thanks") {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
    } else robots?.remove();
  }, [doc, route, missing]);

  // After switching page: other pages start at the top; on the home page, scroll to the
  // section in the hash (e.g. #products) once it has rendered.
  useLayoutEffect(() => {
    const anchor = route === "for-sign-shops" ? document.getElementById(window.location.hash.slice(1)) : null;
    if (anchor) {
      anchor.scrollIntoView({ behavior: "instant" });
      return;
    }
    if (route) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = window.location.hash.slice(1);
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "instant" });
  }, [route]);

  const barProduct = QUOTE_PRODUCTS.find((p) => p.slug === route);

  useReveal(route ?? (missing ? "missing" : "home"));
  usePageview(route ? `/${route}` : "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {doc ? (
          <LegalPage doc={doc} />
        ) : route === "media-walls" ? (
          <MediaWallsPage />
        ) : route === "table-covers" ? (
          <TableCoversPage />
        ) : route === "pull-up-banners" ? (
          <PullUpBannersPage />
        ) : route === "corflute-signs" ? (
          <CorfluteSignsPage />
        ) : route === "a-frames" ? (
          <AFramesPage />
        ) : route === "gazebos" ? (
          <GearPage key="gazebos" product={GAZEBOS} />
        ) : route === "flags" ? (
          <GearPage key="flags" product={FLAGS} />
        ) : route === "market-umbrellas" ? (
          <GearPage key="market-umbrellas" product={UMBRELLAS} />
        ) : route === "banners" ? (
          <GearPage key="banners" product={BANNERS} />
        ) : route === "delivery" ? (
          <DeliveryPage />
        ) : route === "artwork-help" ? (
          <ArtworkHelpPage />
        ) : route === "for-sign-shops" ? (
          <ForSignShopsPage />
        ) : route === "check-artwork" ? (
          <Suspense fallback={<p className="mx-auto max-w-site px-4 py-20 text-lg sm:px-6">Loading the artwork checker…</p>}>
            <ArtworkCheckPage />
          </Suspense>
        ) : route === "quote" ? (
          <QuotePage />
        ) : route === "quote-thanks" ? (
          <QuoteThanks />
        ) : missing ? (
          <NotFound />
        ) : (
          <>
            <Hero />
            <TrustStrip tone="dark" />
            <div id="signage" className="scroll-mt-20" />
            <MediaWallsTeaser />
            <TableCoversTeaser />
            <PullUpBannersTeaser />
            <CorfluteSignsTeaser />
            <AFramesTeaser />
            <EventGearTeaser />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <FaqSchema page={route ?? (missing ? "missing" : "home")} />
      <Footer />
      {barProduct && <div aria-hidden className="h-20 md:hidden" />}
      {barProduct && <QuoteBar slug={barProduct.slug} label={barProduct.label} />}
    </>
  );
}
