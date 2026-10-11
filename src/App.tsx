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
import { legalDocs } from "./data/legal";
import { LEGAL_PAGES, SITE_COPY, type LegalSlug } from "./data/products";
import { usePageview } from "./lib/analytics";

// GitHub Pages only serves files, so the legal pages use hash routes: /#/refund-policy etc.
// (public/404.html also sends clean links like /refund-policy to the hash route.)
// Section links such as #products keep working as normal in-page anchors.
const slugs = LEGAL_PAGES.map((p) => p.slug) as readonly string[];
function routeFromHash(): LegalSlug | null {
  const m = window.location.hash.match(/^#\/([a-z-]+)\/?$/);
  return m && slugs.includes(m[1]) ? (m[1] as LegalSlug) : null;
}

export default function App() {
  const [route, setRoute] = useState<LegalSlug | null>(routeFromHash);

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const doc = route ? legalDocs[route] : null;

  useEffect(() => {
    document.title = doc ? `${doc.title} | The Signage Shed` : SITE_COPY.title;
  }, [doc]);

  // After switching page: legal pages start at the top; on the home page, scroll to the
  // section in the hash (e.g. #products) once it has rendered.
  useLayoutEffect(() => {
    if (doc) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = window.location.hash.slice(1);
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "instant" });
  }, [doc]);

  usePageview(route ? `/${route}` : "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn-cream">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {doc ? (
          <LegalPage doc={doc} />
        ) : (
          <>
            <Hero />
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
