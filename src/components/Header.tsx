import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";
import { quoteHref, QUOTE_PRODUCTS } from "../data/quoteProducts";

/** Product slug of the page we're on (#/pull-up-banners), so the quote button pre-selects it. */
function useProductSlug() {
  const read = () => {
    const m = window.location.hash.match(/^#\/([a-z-]+)/);
    const slug = m?.[1] ?? "";
    return QUOTE_PRODUCTS.some((p) => p.slug === slug && slug !== "other") ? slug : undefined;
  };
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const on = () => setSlug(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return slug;
}
import {
  A_FRAMES_HREF,
  CORFLUTE_SIGNS_HREF,
  FLAGS_HREF,
  GAZEBOS_HREF,
  MARKET_UMBRELLAS_HREF,
  BANNERS_HREF,
  MEDIA_WALLS_HREF,
  PULL_UP_BANNERS_HREF,
  TABLE_COVERS_HREF,
} from "../lib/routes";

// Printed products sit in a Products dropdown so the bar fits from 320px up; the digital downloads
// (#products section on the home page) are the last item in it.
const products: { href: string; label: string }[] = [
  { href: MEDIA_WALLS_HREF, label: "Media walls" },
  { href: TABLE_COVERS_HREF, label: "Table covers" },
  { href: PULL_UP_BANNERS_HREF, label: "Pull up banners" },
  { href: BANNERS_HREF, label: "Vinyl and mesh banners" },
  { href: CORFLUTE_SIGNS_HREF, label: "Corflute signs" },
  { href: A_FRAMES_HREF, label: "A-frames" },
  { href: GAZEBOS_HREF, label: "Gazebos" },
  { href: FLAGS_HREF, label: "Teardrop and feather flags" },
  { href: MARKET_UMBRELLAS_HREF, label: "Market umbrellas" },
];
const links: { href: string; label: string; show: string }[] = [
  { href: "#/check-artwork", label: "Check artwork", show: "hidden md:block" },
  { href: "#faq", label: "FAQ", show: "hidden lg:block" },
  { href: "#contact", label: "Contact", show: "hidden sm:block" },
];
const linkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap rounded px-1.5 py-2 text-sm hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4 md:px-3 md:text-base";

function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onHash = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  return (
    <li ref={wrap} className="relative">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        onClick={() => setOpen((o) => !o)}
        className={`${linkClass} flex items-center gap-1 font-semibold`}
      >
        Products
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
      <ul
        id="products-menu"
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border-2 border-rust bg-charcoal py-1 shadow-xl"
      >
        {products.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center px-4 py-2.5 text-base hover:bg-white/10 hover:text-white"
            >
              {p.label}
            </a>
          </li>
        ))}
        <li className="mt-1 border-t border-cream/20 pt-1">
          <a
            href="#/check-artwork"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center px-4 py-2.5 text-base hover:bg-white/10 hover:text-white"
          >
            Check your artwork
          </a>
        </li>
      </ul>
    </li>
  );
}

export default function Header() {
  const slug = useProductSlug();
  return (
    <header className="sticky top-0 z-40 border-b-4 border-rust bg-charcoal text-cream">
      <div className="mx-auto flex max-w-site items-center justify-between gap-2 px-4 py-3 min-[400px]:gap-4 sm:px-6">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3"
          aria-label="The Signage Shed, back to top"
        >
          <img
            src={asset("images/badge-96.webp")}
            srcSet={`${asset("images/badge-96.webp")} 1x, ${asset("images/badge-192.webp")} 2x`}
            width={44}
            height={44}
            alt="The Signage Shed badge"
            className="h-11 w-11"
          />
          <span className="whitespace-nowrap font-display text-lg leading-none tracking-wide max-[459px]:sr-only sm:text-xl">
            The Signage Shed
          </span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-semibold md:gap-2 md:text-base">
            <ProductsMenu />
            {links.map((l) => (
              <li key={l.href} className={l.show}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={quoteHref(slug)}
                data-track="quote-header"
                className="ml-1 inline-flex min-h-11 items-center whitespace-nowrap rounded-md bg-rust-dark px-3 text-sm font-semibold text-white hover:bg-rust-deeper md:px-4 md:text-base"
              >
                Get a quote
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
