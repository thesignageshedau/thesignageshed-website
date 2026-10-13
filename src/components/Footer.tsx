import { LEGAL_PAGES, SHOP } from "../data/products";
import { asset } from "../lib/asset";

const links = [
  { href: SHOP.gumroad, label: "Gumroad store", track: "footer-gumroad" },
  { href: SHOP.etsy, label: "Etsy shop", track: "footer-etsy" },
  { href: SHOP.youtube, label: "Shed Talk on YouTube", track: "footer-youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-deep text-cream">
      <div className="mx-auto grid max-w-site gap-8 px-4 py-12 sm:px-6 md:grid-cols-[auto_1fr] md:items-center">
        <img src={asset("images/badge-192.webp")} width={88} height={88} alt="The Signage Shed badge" loading="lazy" className="h-[88px] w-[88px]" />
        <div className="md:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener" data-track={l.track} className="inline-flex min-h-11 items-center hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">{l.label}</a>
              </li>
            ))}
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
                  <a href={`#/${p.slug}`} className="inline-flex min-h-11 items-center text-cream/85 hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-3 text-sm text-cream/70">
            © {new Date().getFullYear()} The Signage Shed. Digital products for sign shops and small businesses.
            General information only, not tax or financial advice. Excel and Google Sheets are trademarks of their owners.
          </p>
          <p className="mt-2 text-sm text-cream/70">The Signage Shed Co · ABN 51 879 534 008 · Prices in AUD. Not registered for GST.</p>
        </div>
      </div>
    </footer>
  );
}
