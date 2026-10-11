// Cookieless analytics with GoatCounter (https://www.goatcounter.com).
// Nothing loads unless a GoatCounter code is set (GOATCOUNTER_CODE in src/data/products.ts,
// or the VITE_GOATCOUNTER_CODE environment variable).
//
// Page views are sent on every route change. Clicks on any element with a data-track="name"
// attribute (the Gumroad and Etsy buttons) are sent as GoatCounter events named "name".
import { useEffect } from "react";
import { GOATCOUNTER_CODE } from "../data/products";

type CountOptions = { path: string; title?: string; event?: boolean };
type GoatCounter = { no_onload?: boolean; count?: (o: CountOptions) => void };
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

const envCode = (import.meta.env["VITE_GOATCOUNTER_CODE"] as string | undefined) ?? "";
const code = (envCode || GOATCOUNTER_CODE).trim();
export const analyticsEnabled = /^[a-z0-9-]+$/i.test(code);

let started = false;
const queue: CountOptions[] = [];

function send(o: CountOptions) {
  const count = window.goatcounter?.count;
  if (count) count(o);
  else queue.push(o);
}

function start() {
  if (started || !analyticsEnabled) return;
  started = true;
  // We send page views ourselves (single-page site), so turn off the automatic one.
  window.goatcounter = { ...window.goatcounter, no_onload: true };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset["goatcounter"] = `https://${code}.goatcounter.com/count`;
  s.onload = () => queue.splice(0).forEach((o) => window.goatcounter?.count?.(o));
  document.head.appendChild(s);
  // Outbound click tracking for anything marked with data-track.
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-track]") : null;
      const name = el?.dataset["track"];
      if (name) send({ path: name, title: el.textContent?.trim().slice(0, 100) || name, event: true });
    },
    true,
  );
}

/** Count a page view for `path` whenever it changes. Does nothing while analytics is off. */
export function usePageview(path: string) {
  useEffect(() => {
    if (!analyticsEnabled) return;
    start();
    send({ path, title: document.title });
  }, [path]);
}
