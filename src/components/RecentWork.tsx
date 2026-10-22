import { RECENT_WORK } from "../data/recentWork";
import { asset, srcSet } from "../lib/asset";

/** "Recent work" gallery. Renders nothing until RECENT_WORK has real jobs in it. */
export default function RecentWork() {
  if (RECENT_WORK.length === 0) return null;
  return (
    <section id="recent-work" aria-labelledby="recent-work-heading" className="scroll-mt-20 py-14 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="rule mb-4" />
        <h2 id="recent-work-heading" className="text-3xl sm:text-4xl">Recent work</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT_WORK.map((job) => (
            <li key={job.id} className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-charcoal/5">
                <img src={asset(`images/${job.image}-800.webp`)} srcSet={srcSet(job.image)}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  width={800} height={600} loading="lazy" decoding="async" alt={job.alt}
                  className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-slab text-lg font-bold leading-snug">{job.title}</h3>
                {job.product && <p className="mt-1 text-charcoal/80">{job.product}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
