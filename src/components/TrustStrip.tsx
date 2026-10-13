/** Short row of reassurances, shown under page heros and above quote forms. Only true claims. */
const items = [
  "Delivered Australia-wide",
  "Quote by email, no payment now",
  "Digital proof before we print",
];

export default function TrustStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul
      aria-label="Why order with us"
      className={`flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-4 text-sm font-semibold sm:text-base ${
        dark ? "bg-charcoal-deep text-cream" : "rounded-lg border-2 border-charcoal/15 bg-cream text-charcoal"
      }`}
    >
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2">
          <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-rust">
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}
