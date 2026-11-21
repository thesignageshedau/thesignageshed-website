// Google Ads tag (AW-18587866650). The same ID is in the gtag snippet in index.html.
export const GADS_ID = "AW-18587866650";

// Conversion label for the "Quote request" action in Google Ads account 851-777-5396.
export const GADS_QUOTE_LABEL = "HhQpCKiJ3bwdEJqssZ9F";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Record a quote-request conversion once the thank-you page has mounted. No-ops if the label is empty. */
export function trackQuoteConversion() {
  if (!GADS_QUOTE_LABEL) return;
  gtag("event", "conversion", { send_to: `${GADS_ID}/${GADS_QUOTE_LABEL}` });
}

/** Record a page view for a client-side route change (the first view is sent by the head snippet). */
export function trackPageView() {
  const page_path = `${window.location.pathname}${window.location.search}`;
  gtag("event", "page_view", {
    page_path,
    page_title: document.title,
    page_location: window.location.href,
  });
}
