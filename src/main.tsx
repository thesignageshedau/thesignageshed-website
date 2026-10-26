import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Fonts: woff2 only, font-display: swap.
import "./fonts.css";
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

// Prerendered pages: reuse the HTML that's already on screen (hydrate) instead of rebuilding it,
// so the first paint is the final paint. Pages without prerendered markup render from scratch.
const rootEl = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// Render fresh instead where the first client render can't match the saved HTML: the artwork checker
// is code-split (lazy), and a quote link with ?product=… prefills the form from the address.
const fresh = location.pathname.startsWith("/check-artwork") || (location.pathname.startsWith("/quote") && location.search !== "");
if (rootEl.firstElementChild && !fresh) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);
