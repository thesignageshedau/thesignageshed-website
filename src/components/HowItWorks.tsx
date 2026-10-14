import { asset } from "../lib/asset";

const STEPS = ["Get a quote", "Send artwork or we set it up", "We print", "Delivered to you"];

// Home page "How it works" strip: the illustrated steps (desktop and mobile versions), with the
// steps as real text for screen readers and search.
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="bg-[#F2EBDD]">
      <h2 id="how-heading" className="sr-only">How it works</h2>
      <ol className="sr-only">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <picture>
        <source
          media="(max-width: 639px)"
          type="image/webp"
          srcSet={`${asset("images/how-it-works-mobile-400.webp")} 400w, ${asset("images/how-it-works-mobile-800.webp")} 800w`}
          sizes="100vw"
          width={800}
          height={1400}
        />
        <source
          type="image/webp"
          srcSet={`${asset("images/how-it-works-desktop-800.webp")} 800w, ${asset("images/how-it-works-desktop-1600.webp")} 1600w`}
          sizes="(min-width: 1600px) 1600px, 100vw"
          width={1600}
          height={400}
        />
        <img
          src={asset("images/how-it-works-desktop-1600.jpg")}
          width={1600}
          height={400}
          loading="lazy"
          decoding="async"
          alt="How it works in four steps: 1, get a quote. 2, send artwork or we set it up. 3, we print. 4, delivered to you."
          className="mx-auto block h-auto w-full max-w-[1600px]"
        />
      </picture>
    </section>
  );
}
