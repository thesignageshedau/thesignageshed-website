import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";

// Apple-style scroll section (prototype): a 3D pull up banner stand that turns and unrolls as you
// scroll. three.js only loads (in its own chunk) when the section is close to the viewport.
// Reduced motion, small screens, no WebGL and the prerendered HTML all get the static image.

const CAPTIONS = [
  { title: "850mm or 1200mm wide", body: "Luxury and double sided pull up banners, 2000mm tall." },
  { title: "Quoted fast", body: "Send us your artwork or your logo and wording, and we'll quote it." },
  { title: "Shipped Australia-wide", body: "Printed, fitted to the stand and packed in a carry bag." },
];

function canAnimate(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Captions({ progress }: { progress?: number }) {
  return (
    <ol className="space-y-8">
      {CAPTIONS.map((c, i) => {
        // Each caption fades in over its third of the scroll.
        const o = progress === undefined ? 1 : Math.min(1, Math.max(0, (progress - i * 0.28) / 0.12));
        return (
          <li key={c.title} style={{ opacity: o, transform: `translateY(${(1 - o) * 16}px)` }}>
            <h3 className="text-2xl sm:text-3xl">{c.title}</h3>
            <p className="mt-2 max-w-sm text-lg leading-relaxed text-cream/90">{c.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

function StaticStand() {
  return (
    <section aria-labelledby="stand-heading" className="bg-charcoal-deep text-cream">
      <div className="mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow mb-3">Pull up banners</p>
          <h2 id="stand-heading" className="mb-8 text-3xl sm:text-4xl">Up in seconds, seen all day.</h2>
          <Captions />
          <a href="/pull-up-banners/" className="btn-rust mt-8">See pull up banners</a>
        </div>
        <img
          src={asset("images/stand-3d-800.webp")}
          srcSet={`${asset("images/stand-3d-480.webp")} 480w, ${asset("images/stand-3d-800.webp")} 800w`}
          sizes="(min-width: 768px) 45vw, calc(100vw - 32px)"
          width={800} height={1000}
          alt="A printed pull up banner stand"
          loading="lazy" decoding="async"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </section>
  );
}

export default function ScrollStand() {
  const [animate] = useState(canAnimate);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!animate || !wrap.current) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        import("./StandScene").then((m) => {
          if (!cancelled && canvas.current) dispose = m.mountStand(canvas.current, () => progressRef.current);
        });
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(wrap.current);
    const onScroll = () => {
      const r = wrap.current!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      progressRef.current = p;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      dispose?.();
    };
  }, [animate]);

  if (!animate) return <StaticStand />;

  return (
    <section aria-labelledby="stand-heading" className="bg-charcoal-deep text-cream">
      <div ref={wrap} className="relative" style={{ height: "220vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto grid h-full w-full max-w-site grid-cols-2 items-center gap-10 px-6">
            <div>
              <p className="eyebrow mb-3">Pull up banners</p>
              <h2 id="stand-heading" className="mb-8 text-4xl">Up in seconds, seen all day.</h2>
              <Captions progress={progress} />
              <a href="/pull-up-banners/" className="btn-rust mt-8" style={{ opacity: Math.min(1, Math.max(0, (progress - 0.8) / 0.15)) }}>
                See pull up banners
              </a>
            </div>
            <canvas ref={canvas} aria-hidden="true" className="h-[85vh] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
