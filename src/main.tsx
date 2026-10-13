import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/ultra/latin-400.css";
import "@fontsource/zilla-slab/latin-400.css";
import "@fontsource/zilla-slab/latin-600.css";
import "@fontsource/zilla-slab/latin-700.css";
import "./index.css";
import App, { SIGN_SHOP_SECTIONS } from "./App";
import { goTo } from "./lib/routes";

// Old hash links (/#/pull-up-banners?product=x) now live at clean paths (/pull-up-banners/?product=x).
{
  const h = location.hash;
  const m = h.match(/^#\/([a-z-]+)\/?(\?.*)?$/);
  if (m) history.replaceState(null, "", `/${m[1]}/${m[2] ?? ""}`);
  else if (location.pathname === "/" && SIGN_SHOP_SECTIONS.includes(h.slice(1))) history.replaceState(null, "", `/for-sign-shops/${h}`);
}

// Same-site page links switch pages without a full reload. Downloads, files, new tabs and
// modified clicks are left to the browser.
document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || a.target || a.hasAttribute("download") || a.origin !== location.origin) return;
  if (/\.[a-z0-9]+$/i.test(a.pathname)) return;
  if (a.pathname === location.pathname && a.search === location.search && a.hash) return; // in-page anchor
  e.preventDefault();
  goTo(a.pathname + a.search + a.hash);
});
window.addEventListener("popstate", () => window.dispatchEvent(new Event("hashchange")));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
