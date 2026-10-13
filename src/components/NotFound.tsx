import { homeSection } from "../lib/routes";

/** Shown for any #/ address the site doesn't have. */
export default function NotFound() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="rule mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg leading-relaxed">
          Sorry, that page doesn't exist. It may have moved, or the link has a typo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="btn-rust">Home page</a>
          <a href={homeSection("signage")} className="btn-outline">See our signage</a>
          <a href="/quote/" className="btn-outline">Request a quote</a>
        </div>
      </div>
    </section>
  );
}
