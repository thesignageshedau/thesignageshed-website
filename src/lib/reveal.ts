// Scroll-in motion: adds .rv to sections and grid items below the fold, then .in when they scroll
// into view. Only transform/opacity change, so nothing shifts. Skipped entirely for reduced motion,
// and never applied to forms or the artwork checker, or to anything already on screen.
import { useEffect } from "react";

const SKIP = "form, fieldset, [data-noanim], [aria-live], #main > section:first-child";

export function useReveal(key: string) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const t = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      const vh = innerHeight;
      const els = document.querySelectorAll<HTMLElement>(
        "#main > * > section, #main > section, #main .grid > *, #main [aria-label='Why order with us'] > li",
      );
      els.forEach((el) => {
        if (el.closest(SKIP) || el.classList.contains("rv")) return;
        if (el.getBoundingClientRect().top < vh) return; // already visible: leave it alone
        const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
        el.style.setProperty("--d", `${Math.min(i, 4) * 70}ms`);
        el.classList.add("rv");
        io!.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(t);
      io?.disconnect();
      document.querySelectorAll(".rv:not(.in)").forEach((el) => el.classList.add("in"));
    };
  }, [key]);
}
