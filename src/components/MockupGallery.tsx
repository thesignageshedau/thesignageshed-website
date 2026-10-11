import type { Mockup } from "../data/mockups";
import MockupImage from "./MockupImage";

// "See it in place" strip of landscape mockups on a product page.
export default function MockupGallery({
  id,
  heading = "See it in place",
  items,
}: {
  id: string;
  heading?: string;
  items: Mockup[];
}) {
  const cols = items.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <section aria-labelledby={`${id}-heading`} className="py-14 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id={`${id}-heading`} className="text-3xl sm:text-4xl">
          {heading}
        </h2>
        <div className={`mt-6 grid gap-6 ${cols}`}>
          {items.map((m) => (
            <figure
              key={m.slug}
              className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm"
            >
              <MockupImage
                mockup={m}
                sizes={items.length === 3 ? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 580px, (min-width: 640px) 50vw, 100vw"}
                className="aspect-[4/3] h-auto w-full object-cover"
              />
              <figcaption className="px-4 py-3 font-semibold">{m.title}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-sm text-charcoal/70">
          Product mockups shown with our own branding. Your print uses your artwork.
        </p>
      </div>
    </section>
  );
}
