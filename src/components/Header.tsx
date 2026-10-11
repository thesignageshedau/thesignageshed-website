import { asset } from "../lib/asset";
import {
  MEDIA_WALLS_HREF,
  PULL_UP_BANNERS_HREF,
  TABLE_COVERS_HREF,
} from "../lib/routes";

// short: label below 1024px wide, where the full set of links has to fit on one line.
const links: { href: string; label: string; short?: string; show: string }[] = [
  { href: "#products", label: "Products", show: "max-[369px]:hidden" },
  { href: MEDIA_WALLS_HREF, label: "Media walls", show: "" },
  { href: TABLE_COVERS_HREF, label: "Table covers", show: "" },
  {
    href: PULL_UP_BANNERS_HREF,
    label: "Pull up banners",
    short: "Banners",
    show: "",
  },
  { href: "#why", label: "Why us", show: "hidden xl:block" },
  { href: "#faq", label: "FAQ", show: "hidden xl:block" },
  { href: "#contact", label: "Contact", show: "hidden lg:block" },
];

export default function Header() {
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
            alt=""
            className="h-11 w-11"
          />
          <span className="font-display text-lg leading-none tracking-wide max-[459px]:sr-only whitespace-nowrap sm:text-xl">
            The Signage Shed
          </span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-semibold md:gap-2 md:text-base">
            {links.map((l) => (
              <li key={l.href} className={l.show}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded px-1 py-2 text-[13px] min-[360px]:px-1.5 hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4 md:px-3 md:text-base"
                >
                  {l.short ? (
                    <>
                      <span className="lg:hidden">{l.short}</span>
                      <span className="hidden lg:inline">{l.label}</span>
                    </>
                  ) : (
                    l.label
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
