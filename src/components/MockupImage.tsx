import { asset } from "../lib/asset";
import type { Mockup } from "../data/mockups";

const dir = (f: string) => asset(`images/mockups/${f}`);

// A product mockup as responsive WebP (four sizes) with a JPG fallback, lazy-loaded by default.
export default function MockupImage({
  mockup,
  square = false,
  sizes,
  className = "",
  eager = false,
}: {
  mockup: Mockup;
  square?: boolean;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  const s = mockup.slug;
  const widths = square ? [480, 600, 800, 1200] : [480, 800, 1200, 1600];
  const small = square ? 600 : 800;
  const base = square ? `${s}-sq` : s;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={widths.map((w) => `${dir(`${base}-${w}.webp`)} ${w}w`).join(", ")}
        sizes={sizes}
      />
      <img
        src={dir(`${base}-${small}.jpg`)}
        width={small}
        height={square ? small : (small * 3) / 4}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        alt={mockup.alt}
        className={className}
      />
    </picture>
  );
}
