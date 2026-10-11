import { SHOP } from "../data/products";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I get my files after I buy?",
    a: <>Straight away. On Gumroad you get a download link on screen and by email. On Etsy the files are in your Purchases page once payment clears. Nothing is posted.</>,
  },
  {
    q: "Do the spreadsheets work in Google Sheets?",
    a: <>Yes. They're standard .xlsx files. Upload the file to Google Drive, then open it with Google Sheets. They also work in Microsoft Excel.</>,
  },
  {
    q: "Can I get a refund?",
    a: <>Because these are digital downloads, we don't offer refunds for change of mind. If a file is faulty, won't open, or isn't as described, email us and we'll fix it or refund you. Your rights under Australian Consumer Law aren't affected.</>,
  },
  {
    q: "Do the prices include GST?",
    a: <>Prices are shown in Australian dollars. Any GST or sales tax is worked out by Gumroad or Etsy at checkout, based on where you are. Inside the spreadsheets you can quote prices ex or inc GST.</>,
  },
  {
    q: "Can I change the rates and materials?",
    a: <>Yes. Your rates, materials, margins and business details go into a settings tab, and everything else works from those.</>,
  },
  {
    q: "I have a question that isn't here.",
    a: <>Email us at <a className="font-semibold text-rust-dark underline underline-offset-2" href={`mailto:${SHOP.email}`}>{SHOP.email}</a> and we'll get back to you.</>,
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 className="text-3xl sm:text-4xl">FAQ</h2>
        <div className="mt-8 divide-y divide-charcoal/15 rounded-xl border border-charcoal/15 bg-white">
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
