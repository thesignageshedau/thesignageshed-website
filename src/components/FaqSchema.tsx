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
      const entities = blocks
        .map((d) => {
          const q = d.querySelector("summary")?.textContent?.trim() ?? "";
          const clone = d.cloneNode(true) as HTMLElement;
          clone.querySelector("summary")?.remove();
          const a = clone.textContent?.replace(/\s+/g, " ").trim() ?? "";
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
