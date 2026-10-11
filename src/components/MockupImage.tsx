import { asset } from "../lib/asset";
import type { Mockup } from "../data/mockups";

const dir = (f: string) => asset(`images/mockups/${f}`);

// A product mockup as WebP (two sizes) with a JPG fallback, lazy-loaded by default.
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
  const [small, large] = square ? [600, 1200] : [800, 1600];
  const base = square ? `${s}-sq` : s;
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${dir(`${base}-${small}.webp`)} ${small}w, ${dir(`${base}-${large}.webp`)} ${large}w`}
        sizes={sizes}
      />
      <img
        src={dir(`${base}-${small}.jpg`)}
        width={small}
        height={square ? small : (small * 3) / 4}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        alt={mockup.alt}
        className={className}
      />
    </picture>
  );
}
