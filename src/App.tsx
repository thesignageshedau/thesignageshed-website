import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import FreeSample from "./components/FreeSample";
import EtsyShop from "./components/EtsyShop";
import WhyUs from "./components/WhyUs";
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
import QuotePage from "./components/QuotePage";
import NotFound from "./components/NotFound";
import { PAGE_DESCRIPTIONS } from "./data/pageMeta";
import QuoteThanks from "./components/QuoteThanks";
import TableCoversPage from "./components/TableCoversPage";
import TableCoversTeaser from "./components/TableCoversTeaser";
import { legalDocs } from "./data/legal";
import { LEGAL_PAGES, SITE_COPY, type LegalSlug } from "./data/products";
import { usePageview } from "./lib/analytics";

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
  | "quote";
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
] as readonly string[];
/** True for a #/ address that isn't one of our pages (section links like #faq don't count). */
function isUnknownRoute(): boolean {
  return window.location.hash.startsWith("#/") && routeFromHash() === null;
}
function routeFromHash(): Route | null {
  const m = window.location.hash.match(/^#\/([a-z-]+)\/?(?:\?.*)?$/);
  return m?.[1] && slugs.includes(m[1]) ? (m[1] as Route) : null;
}
const PAGE_TITLES: Partial<Record<Route, string>> = {
  "media-walls": "Media Walls: Prices and Quotes | The Signage Shed",
  "table-covers": "Table Covers: Prices and Quotes | The Signage Shed",
  "pull-up-banners": "Pull Up Banners: Prices and Quotes | The Signage Shed",
  "corflute-signs": "Corflute Signs: Prices and Quotes | The Signage Shed",
  "a-frames": "A-Frame Signs: Prices and Quotes | The Signage Shed",
  gazebos: GAZEBOS.pageTitle,
  flags: FLAGS.pageTitle,
  "market-umbrellas": UMBRELLAS.pageTitle,
  banners: BANNERS.pageTitle,
  "quote-thanks": "Quote request sent | The Signage Shed",
  quote: "Request a Quote | The Signage Shed",
};

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
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        (route && PAGE_DESCRIPTIONS[route]) || SITE_COPY.description,
      );
    }
  }, [doc, route, missing]);

  // After switching page: other pages start at the top; on the home page, scroll to the
  // section in the hash (e.g. #products) once it has rendered.
  useLayoutEffect(() => {
    if (route) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = window.location.hash.slice(1);
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "instant" });
  }, [route]);

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
        ) : route === "quote" ? (
          <QuotePage />
        ) : route === "quote-thanks" ? (
          <QuoteThanks />
        ) : missing ? (
          <NotFound />
        ) : (
          <>
            <Hero />
            <div id="signage" className="scroll-mt-20" />
            <MediaWallsTeaser />
            <TableCoversTeaser />
            <PullUpBannersTeaser />
            <CorfluteSignsTeaser />
            <AFramesTeaser />
            <EventGearTeaser />
            <Products />
            <FreeSample />
            <EtsyShop />
            <WhyUs />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
