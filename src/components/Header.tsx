import { asset } from "../lib/asset";
import { MEDIA_WALLS_HREF, TABLE_COVERS_HREF } from "../lib/routes";

const links = [
  { href: "#products", label: "Products", show: "" },
  { href: MEDIA_WALLS_HREF, label: "Media walls", show: "" },
  { href: TABLE_COVERS_HREF, label: "Table covers", show: "" },
  { href: "#why", label: "Why us", show: "hidden xl:block" },
  { href: "#faq", label: "FAQ", show: "hidden xl:block" },
  { href: "#contact", label: "Contact", show: "hidden lg:block" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-rust bg-charcoal text-cream">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-3"
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
          <span className="font-display text-lg leading-none tracking-wide max-[459px]:sr-only sm:text-xl">
            The Signage Shed
          </span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
            {links.map((l) => (
              <li key={l.href} className={l.show}>
                <a
                  href={l.href}
                  className="whitespace-nowrap rounded px-1.5 py-2 text-[13px] hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4 sm:px-3 sm:text-base"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
