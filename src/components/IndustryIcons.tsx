import type { IndustryIconId } from "../data/industries";

/** Simple line icons in the site style. Original drawings, not copied from another brand. */
const icons: Record<IndustryIconId, { label: string; paths: string[] }> = {
  events: {
    label: "A small flag on a pole",
    paths: ["M5 3.5v13", "M5 4.2h8.5l-2 2.6 2 2.6H5"],
  },
  schools: {
    label: "A simple schoolhouse",
    paths: ["M3 10.5 L10 4 l7 6.5", "M5 10.5v6h10v-6", "M8.2 16.5v-4h3.6v4"],
  },
  shops: {
    label: "A small shopfront with an awning",
    paths: ["M3.5 8.5h13v8h-13z", "M3.5 8.5l1.5-3h10l1.5 3", "M8 12.5h4v4H8z"],
  },
  tradies: {
    label: "A small work van",
    paths: ["M2.5 12.2h15v3.2h-15z", "M2.5 12.2l2.2-4.2h7.2l3.2 4.2", "M6 15.4a1.2 1.2 0 1 0 0.01 0", "M14.2 15.4a1.2 1.2 0 1 0 0.01 0"],
  },
  markets: {
    label: "A market umbrella",
    paths: ["M10 3.5v13", "M3.5 8.2c0-4 13-4 13 0H3.5z", "M7 16.5h6"],
  },
  clubs: {
    label: "A simple team shirt",
    paths: ["M7 4.2h6l1.6 2.2 2.4.8v2.2h-3.2v7.2H6.2V9.4H3V7.2l2.4-.8z"],
  },
};

export default function IndustryIcon({ id, className = "h-8 w-8" }: { id: IndustryIconId; className?: string }) {
  const icon = icons[id];
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <title>{icon.label}</title>
      {icon.paths.map((d) => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
