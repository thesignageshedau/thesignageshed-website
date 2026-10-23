import { LEGAL_PAGES, SHOP } from "../data/products";
import { asset } from "../lib/asset";

export default function Footer() {
  return (
    <footer className="bg-charcoal-deep text-cream">
      <div className="mx-auto grid max-w-site gap-8 px-4 py-12 sm:px-6 md:grid-cols-[auto_1fr] md:items-center">
        <img src={asset("images/badge-192.webp")} width={88} height={88} alt="The Signage Shed badge" loading="lazy" className="h-[88px] w-[88px]" />
        <div className="md:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
            <li>
              <a href="/about/" className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">About</a>
            </li>
            <li>
              <a href="/delivery/" className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">Delivery</a>
            </li>
            <li>
              <a href="/faq/" className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">Questions</a>
            </li>
            <li>
              <a href="/guides/" className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">Guides</a>
            </li>
            <li>
              <a href="/artwork-help/" className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">Artwork help</a>
            </li>
            <li>
              <a href={`mailto:${SHOP.email}`} className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">Email us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-site px-4 py-5 sm:px-6">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-0 text-sm font-semibold">
              {LEGAL_PAGES.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}/`} className="inline-flex min-h-11 items-center text-cream/85 hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-3 text-sm text-cream/70">
            © {new Date().getFullYear()} The Signage Shed.{" "}
            <a href="/for-sign-shops/" className="underline underline-offset-4 hover:text-white">Digital products for sign shops</a>.
            {" "}Popular:{" "}
            <a href="/cafe-a-frame-signs/" className="underline underline-offset-4 hover:text-white">café A-frame signs</a>,{" "}
            <a href="/corflute-event-signs/" className="underline underline-offset-4 hover:text-white">corflute event signs</a>,{" "}
            <a href="/shop-window-wall-signs/" className="underline underline-offset-4 hover:text-white">shop window and wall signs</a>,{" "}
            <a href="/acrylic-office-signs/" className="underline underline-offset-4 hover:text-white">acrylic office signs</a>.
            General information only, not tax or financial advice. Excel and Google Sheets are trademarks of their owners.
          </p>
          <p className="mt-2 text-sm text-cream/70">The Signage Shed Co · ABN 51 879 534 008 · Prices in AUD.</p>
        </div>
      </div>
    </footer>
  );
}
