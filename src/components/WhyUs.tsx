const reasons = [
  { title: "Built by people in the sign trade", body: "Every sheet is based on how sign jobs are actually quoted and made: materials by the m², machine time, design, install and travel." },
  { title: "Made for Australian shops", body: "Prices in Australian dollars, metric units throughout, and common Australian vehicles in the wrap calculator." },
  { title: "Works in Excel and Google Sheets", body: "Standard .xlsx files that open in Microsoft Excel or Google Sheets. No subscription, no app and no login." },
  { title: "Instant download", body: "Pay and download straight away from Gumroad or Etsy. Nothing is posted, so there's no waiting." },
];

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-20 bg-charcoal py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 className="text-3xl sm:text-4xl">Why our templates</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <div key={r.title} className="rounded-xl border border-cream/15 bg-charcoal-deep p-6">
              <p className="font-display text-2xl text-rust-light" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-slab text-xl font-bold tracking-normal">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-cream/85">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
