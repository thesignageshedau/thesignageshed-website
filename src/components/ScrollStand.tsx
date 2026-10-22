import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";

// Apple-style scroll section (prototype): a 3D pull up banner stand that turns and unrolls as you
// scroll. three.js only loads (in its own chunk) when the section is close to the viewport.
// Reduced motion, no WebGL and the prerendered HTML get the static image. Phones get a lighter scene.

const CAPTIONS = [
  { title: "850mm or 1200mm wide", body: "Luxury and double sided pull up banners, 2000mm tall." },
  { title: "Quoted fast", body: "Send us your artwork or your logo and wording, and we'll quote it." },
  { title: "Shipped Australia-wide", body: "Printed, fitted to the stand and packed in a carry bag." },
];

function canAnimate(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Captions({ progress, compact }: { progress?: number; compact?: boolean }) {
  if (compact && progress !== undefined) {
    // Phones: one caption at a time, stacked in the same spot so the layout never jumps.
    return (
      <ol className="relative h-24">
        {CAPTIONS.map((c, i) => {
          // The outgoing caption is fully gone before the next one starts, so they never overlap.
          const start = 0.04 + i * 0.24, next = start + 0.24;
          const a = i === 0 ? 1 : Math.min(1, Math.max(0, (progress - start) / 0.06));
          const b = i === CAPTIONS.length - 1 ? 0 : Math.min(1, Math.max(0, (progress - (next - 0.05)) / 0.05));
          const o = a * (1 - b);
          return (
            <li key={c.title} className="absolute inset-x-0 top-0" style={{ opacity: o, transform: `translateY(${(1 - a) * 12 - b * 12}px)` }} aria-hidden={o < 0.5}>
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-1 text-base leading-snug text-cream/90">{c.body}</p>
            </li>
          );
        })}
      </ol>
    );
  }
  return (
    <ol className="space-y-8">
      {CAPTIONS.map((c, i) => {
        // Each caption fades in over its third of the scroll.
        const o = progress === undefined ? 1 : Math.min(1, Math.max(0, (progress - 0.05 - i * 0.24) / 0.1));
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
          srcSet={`${asset("images/stand-3d-480.webp")} 480w, ${asset("images/stand-3d-800.webp")} 800w, ${asset("images/stand-3d-1064.webp")} 1064w`}
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
  const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const visibleRef = useRef(true);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!animate || !wrap.current) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let loaded = false;
    const io = new IntersectionObserver(
      (entries) => {
        // Rendering pauses while the section is off-screen; three.js loads once, on first approach.
        visibleRef.current = entries[0].isIntersecting;
        if (!entries[0].isIntersecting || loaded) return;
        loaded = true;
        // Wait for the page to finish loading and go idle, so the hero always wins.
        const start = () => {
          const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
          idle(() => {
            import("./StandScene").then((m) => {
              if (!cancelled && canvas.current)
                dispose = m.mountStand(canvas.current, () => progressRef.current, () => setReady(true), {
                  mobile,
                  isVisible: () => visibleRef.current,
                });
            });
          });
        };
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
      },
      { rootMargin: mobile ? "100px 0px" : "300px 0px" },
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
  }, [animate, mobile]);

  if (!animate) return <StaticStand />;

  return (
    <section aria-labelledby="stand-heading" className="bg-charcoal-deep text-cream">
      <div ref={wrap} className="relative" style={{ height: mobile ? "200svh" : "160vh" }}>
        <div className="sticky top-0 flex items-center overflow-hidden" style={{ height: "100svh" }}>
          <div
            className={
              mobile
                ? "mx-auto flex h-full w-full flex-col justify-center gap-3 px-5 pb-5 pt-24"
                : "mx-auto grid h-full w-full max-w-site grid-cols-2 items-center gap-10 px-6"
            }
          >
            <div className={mobile ? "shrink-0" : undefined}>
              <p className={mobile ? "eyebrow mb-1" : "eyebrow mb-3"}>Pull up banners</p>
              <h2 id="stand-heading" className={mobile ? "mb-3 text-2xl" : "mb-8 text-4xl"}>Up in seconds, seen all day.</h2>
              <Captions progress={progress} compact={mobile} />
              {!mobile && (
                <a href="/pull-up-banners/" className="btn-rust mt-8" style={{ opacity: Math.min(1, Math.max(0, (progress - 0.7) / 0.12)) }}>
                  See pull up banners
                </a>
              )}
            </div>
            <div className={mobile ? "relative min-h-0 w-full flex-1" : "relative h-[85vh] w-full"}>
              {/* Poster: the closed stand, shown until the 3D scene has drawn, then cross-faded out. */}
              <img
                src={asset("images/stand-3d-poster.webp")}
                alt=""
                aria-hidden="true"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
                style={{ opacity: ready ? 0 : 1 }}
              />
              <canvas
                ref={canvas}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full transition-opacity duration-500"
                style={{ opacity: ready ? 1 : 0 }}
              />
            </div>
            {mobile && (
              <a href="/pull-up-banners/" className="btn-rust shrink-0 self-center" style={{ opacity: Math.min(1, Math.max(0, (progress - 0.7) / 0.12)) }}>
                See pull up banners
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
