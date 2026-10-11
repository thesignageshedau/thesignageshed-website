import { asset } from "../lib/asset";

const links = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-rust bg-charcoal text-cream">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="The Signage Shed, back to top">
          <img src={asset("images/badge-96.webp")} srcSet={`${asset("images/badge-96.webp")} 1x, ${asset("images/badge-192.webp")} 2x`}
            width={44} height={44} alt="" className="h-11 w-11" />
          <span className="font-display text-lg leading-none tracking-wide sm:text-xl">The Signage Shed</span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
            {links.map((l, i) => (
              <li key={l.href} className={i === 1 || i === 2 ? "hidden md:block" : ""}>
                <a href={l.href} className="rounded px-2 py-2 hover:text-white hover:underline decoration-rust decoration-2 underline-offset-4 sm:px-3">
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
