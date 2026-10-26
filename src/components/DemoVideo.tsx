import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";

type Props = {
  name: string; // base name in public/videos, e.g. "pricing-kit-demo" -> .mp4 / .webm / .jpg
  label: string;
  className?: string;
};

// Short silent demo clip of a real spreadsheet. The poster loads as the clip nears the screen, the
// video itself only once it's on screen, it only plays while it's on screen, and anyone who prefers reduced motion just gets the
// still poster. A small button pauses it.
export default function DemoVideo({ name, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const userPaused = useRef(false);
  const [near, setNear] = useState(false); // poster
  const [active, setActive] = useState(false); // video sources
  // Starts as the still poster (matches the prerendered HTML so hydration lines up), then switches
  // to the video after mount unless the visitor prefers reduced motion.
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const poster = asset(`videos/${name}.jpg`);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) {
      setReduced(false);
      return;
    }
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    v.muted = true;
    if (!("IntersectionObserver" in window)) {
      visible.current = true;
      setNear(true);
      setActive(true);
      return;
    }
    const nearObs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          setNear(true);
          nearObs.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    const playObs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        visible.current = e.isIntersecting;
        if (e.isIntersecting) setActive(true);
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    nearObs.observe(v);
    playObs.observe(v);
    return () => {
      nearObs.disconnect();
      playObs.disconnect();
    };
  }, [reduced]);

  // sources are added the first time the clip is on screen; load() picks them up
  useEffect(() => {
    if (active) ref.current?.load();
  }, [active]);

  const keepInView = () => {
    const v = ref.current;
    if (!v) return;
    if (visible.current && !userPaused.current) v.play().catch(() => {});
    else v.pause();
  };

  const toggle = () => {
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    keepInView();
  };

  if (reduced) {
    return (
      <div className={className}>
        <img src={poster} alt={label} width={960} height={720} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={near ? poster : undefined}
        width={960}
        height={720}
        aria-label={label}
        className="h-full w-full object-cover"
        onLoadedData={keepInView}
        onPlay={() => {
          if (!visible.current || userPaused.current) ref.current?.pause();
        }}
      >
        {active && <source src={asset(`videos/${name}.mp4`)} type="video/mp4" />}
        {active && <source src={asset(`videos/${name}.webm`)} type="video/webm" />}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play demo" : "Pause demo"}
        className="absolute bottom-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-charcoal/75 text-cream opacity-70 transition hover:opacity-100 focus-visible:opacity-100"
      >
        {paused ? (
          <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3 fill-current"><path d="M4 2.5v11l9-5.5z" /></svg>
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3 fill-current"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
        )}
      </button>
    </div>
  );
}
