/** Link to the artwork checker with this product chosen. Shown next to the artwork guides. */
export default function ArtworkCheckLink({ product }: { product: string }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border-2 border-charcoal/15 bg-white px-4 py-3">
      <span className="font-semibold">Already have a file? Check it against our guide in your browser.</span>
      <a href={`/check-artwork/?product=${product}`} className="btn-outline" data-track={`artwork-check-link-${product}`}>
        Check your artwork
      </a>
    </p>
  );
}
