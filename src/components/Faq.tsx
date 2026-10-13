import { SHOP } from "../data/products";

const link = "font-semibold text-rust-dark underline underline-offset-2";

const allFaqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What do you make?",
    a: <>Printed signage and event gear, delivered Australia-wide: A-frames, corflute signs, pull up banners, media walls, table covers, flags, gazebos, market umbrellas and vinyl and mesh banners.</>,
  },
  {
    q: "How do I get a quote?",
    a: <>Fill in our <a className={link} href="#/quote">quote form</a>, or use the Quote button next to any price on a product page. Tell us the product, size, quantity and when you need it. We reply by email, usually within one business day.</>,
  },
  {
    q: "What about artwork and templates?",
    a: <>Send print-ready artwork at the finished size, or send us your logo and wording and we'll set it up for you. If you'd like to design it yourself, ask for the template for your product with your quote.</>,
  },
  {
    q: "Will I see a proof before it's printed?",
    a: <>Always. We send you a digital proof, and nothing is printed until you approve it in writing.</>,
  },
  {
    q: "How long does it take?",
    a: <>Usually dispatched within a few business days of artwork approval. Tell us your needed-by date in the quote form and we'll let you know if it's tight.</>,
  },
  {
    q: "Do you deliver?",
    a: <>Yes, Australia-wide. Delivery is quoted separately, based on your postcode, and included in your quote.</>,
  },
  {
    q: "How do I pay?",
    a: <>There's nothing to pay online. Once you're happy with the quote, we send you an invoice or a secure payment link to pay by card.</>,
  },
  {
    q: "Is there a minimum order?",
    a: <>Yes. Orders under $180 are charged a $180 minimum. It covers the whole order, so you can combine products to reach it.</>,
  },
  {
    q: "Do you install signs?",
    a: <>No. We print and deliver, and everything arrives ready to put up yourself, with the fittings listed on each product page.</>,
  },
  {
    q: "Digital products: how do I get my files?",
    a: <>Straight away. Gumroad gives you a download link on screen and by email; on Etsy the files are in your Purchases page. The spreadsheets are .xlsx and work in Excel and Google Sheets, with your rates and materials in a settings tab.</>,
  },
  {
    q: "Digital products: refunds and GST?",
    a: <>No change-of-mind refunds on downloads, but if a file is faulty or not as described we'll fix it or refund you. Your rights under Australian Consumer Law aren't affected. Any GST is worked out by Gumroad or Etsy at checkout.</>,
  },
  {
    q: "I have a question that isn't here.",
    a: <>Email us at <a className={link} href={`mailto:${SHOP.email}`}>{SHOP.email}</a> and we'll get back to you.</>,
  },
];

/** Signage FAQs on the home page; digital = the spreadsheet FAQs on the sign shop page. */
export default function Faq({ digital = false }: { digital?: boolean }) {
  const faqs = allFaqs.filter((f) =>
    digital ? f.q.startsWith("Digital products") || f.q.startsWith("I have a question") : !f.q.startsWith("Digital products"),
  );
  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 className="text-3xl sm:text-4xl">FAQ</h2>
        <div data-faq className="mt-8 divide-y divide-charcoal/15 rounded-xl border border-charcoal/15 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-2xl leading-none text-rust transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
