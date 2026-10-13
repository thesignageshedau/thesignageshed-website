import { SHOP } from "../data/products";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-rust-dark py-14 text-white">
      <div className="mx-auto flex max-w-site flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">Got a question?</h2>
          <p className="mt-2 text-lg text-white/90">Ask about a product, your artwork or an order. We read every email.</p>
        </div>
        <a href={`mailto:${SHOP.email}`} className="btn bg-charcoal text-cream hover:bg-charcoal-deep break-all">
          {SHOP.email}
        </a>
      </div>
    </section>
  );
}
