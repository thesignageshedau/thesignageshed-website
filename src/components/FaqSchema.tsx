import { useEffect } from "react";

/**
 * Adds FAQPage JSON-LD built from the FAQ <details> on the current page (question in <summary>,
 * answer in the rest). Runs after render so it always matches the visible FAQs.
 */
export default function FaqSchema({ page }: { page: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      document.getElementById("faq-ld")?.remove();
      const blocks = [...document.querySelectorAll<HTMLElement>("[data-faq] details")];
      const plain = (el: HTMLElement) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.querySelectorAll("[aria-hidden]").forEach((n) => n.remove());
        return (clone.textContent ?? "").replace(/\s+/g, " ").trim();
      };
      const entities = blocks
        .map((d) => {
          const summary = d.querySelector("summary");
          const q = summary ? plain(summary) : "";
          const clone = d.cloneNode(true) as HTMLElement;
          clone.querySelectorAll("[aria-hidden]").forEach((n) => n.remove());
          clone.querySelector("summary")?.remove();
          const a = (clone.textContent ?? "").replace(/\s+/g, " ").trim();
          return q && a ? { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } } : null;
        })
        .filter(Boolean);
      if (!entities.length) return;
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = "faq-ld";
      s.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: entities });
      document.head.appendChild(s);
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.getElementById("faq-ld")?.remove();
    };
  }, [page]);
  return null;
}
