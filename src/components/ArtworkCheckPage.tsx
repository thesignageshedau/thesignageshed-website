import { useEffect, useMemo, useRef, useState } from "react";
import { ARTWORK_PRODUCTS, ARTWORK_SPECS, artSize, type ArtworkSpec } from "../data/artworkSpecs";
import { QUOTE_EMAIL } from "../data/mediaWalls";
import { quoteHref } from "../data/quoteProducts";
import { asset } from "../lib/asset";
import { ACCEPT, analyseArtwork, overall, type Analysis, type Status } from "../lib/artworkCheck";
import { trackEvent } from "../lib/analytics";
import { input, label } from "./QuoteFormParts";

function params() {
  return new URLSearchParams(window.location.hash.split("?")[1] ?? "");
}

const BADGE: Record<Status, { text: string; cls: string; icon: string }> = {
  pass: { text: "Pass", cls: "bg-green-700 text-white", icon: "✓" },
  warn: { text: "Check", cls: "bg-amber-500 text-charcoal", icon: "!" },
  fail: { text: "Fix", cls: "bg-red-700 text-white", icon: "✕" },
  info: { text: "Note", cls: "bg-charcoal/15 text-charcoal", icon: "i" },
};

const SUMMARY: Record<"pass" | "warn" | "fail", { title: string; body: string; cls: string }> = {
  pass: { title: "Looks print-ready", body: "Nothing jumped out. We'll still check it by eye and send you a digital proof before we print.", cls: "border-green-700 bg-green-50" },
  warn: { title: "Nearly there", body: "It can probably be printed, but have a look at the points marked Check. We're happy to help sort them out.", cls: "border-amber-500 bg-amber-50" },
  fail: { title: "Needs a fix before print", body: "There's at least one problem that would show in the finished print. The tips below explain how to fix it, or send it to us and we'll advise.", cls: "border-red-700 bg-red-50" },
};

/** Bleed, finished edge and safe area drawn over the preview, in artwork mm. */
function Guides({ spec }: { spec: ArtworkSpec }) {
  const [aw, ah] = artSize(spec);
  const [bx, by] = spec.bleed;
  const [fw, fh] = spec.finished;
  const s = spec.safe;
  const stroke = Math.max(aw, ah) / 250;
  return (
    <svg viewBox={`0 0 ${aw} ${ah}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {spec.round ? (
        <>
          <path
            fillRule="evenodd"
            d={`M0 0H${aw}V${ah}H0Z M${aw / 2} ${ah / 2} m-${fw / 2} 0 a${fw / 2} ${fh / 2} 0 1 0 ${fw} 0 a${fw / 2} ${fh / 2} 0 1 0 -${fw} 0Z`}
            fill="rgba(200,30,30,0.28)"
          />
          <ellipse cx={aw / 2} cy={ah / 2} rx={fw / 2} ry={fh / 2} fill="none" stroke="#c81e1e" strokeWidth={stroke} />
          <ellipse cx={aw / 2} cy={ah / 2} rx={spec.round.safeDiameter / 2} ry={spec.round.safeDiameter / 2} fill="none" stroke="#15803d" strokeWidth={stroke} strokeDasharray={`${stroke * 4} ${stroke * 3}`} />
        </>
      ) : (
        <>
          <path fillRule="evenodd" d={`M0 0H${aw}V${ah}H0Z M${bx} ${by}H${bx + fw}V${by + fh}H${bx}Z`} fill="rgba(200,30,30,0.28)" />
          <rect x={bx} y={by} width={fw} height={fh} fill="none" stroke="#c81e1e" strokeWidth={stroke} />
          <rect
            x={bx + s.left}
            y={by + s.top}
            width={fw - s.left - s.right}
            height={fh - s.top - s.bottom}
            fill="none"
            stroke="#15803d"
            strokeWidth={stroke}
            strokeDasharray={`${stroke * 4} ${stroke * 3}`}
          />
        </>
      )}
    </svg>
  );
}

export default function ArtworkCheckPage() {
  const initial = useMemo(() => {
    const p = params();
    const product = ARTWORK_PRODUCTS.some((x) => x.slug === p.get("product")) ? p.get("product")! : "";
    const spec = ARTWORK_SPECS.find((s) => s.product === product && (s.id === p.get("spec") || s.quoteSize === p.get("size")));
    return { product, spec: spec?.id ?? "" };
  }, []);
  const [product, setProduct] = useState(initial.product);
  const [specId, setSpecId] = useState(initial.spec);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [preview, setPreview] = useState("");
  const [guides, setGuides] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const specs = ARTWORK_SPECS.filter((s) => s.product === product);
  const spec = ARTWORK_SPECS.find((s) => s.id === specId) ?? null;

  useEffect(() => {
    if (!file || !spec) return;
    let cancelled = false;
    setBusy(true);
    setError("");
    setResult(null);
    analyseArtwork(file, spec)
      .then((r) => {
        if (cancelled) return;
        setResult(r);
        setPreview(r.preview.toDataURL("image/jpeg", 0.85));
        trackEvent(`artwork-check-${overall(r.checks)}`);
        window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error && e.message ? e.message : "We couldn't read that file.");
      })
      .finally(() => !cancelled && setBusy(false));
    return () => {
      cancelled = true;
    };
  }, [file, spec]);

  const verdict = result ? overall(result.checks) : null;
  const [aw, ah] = spec ? artSize(spec) : [0, 0];
  const quoteLink = spec
    ? `${quoteHref(spec.product, spec.quoteSize)}&artwork=${encodeURIComponent(
        result && verdict ? `${result.fileName} (${spec.label}): ${SUMMARY[verdict].title.toLowerCase()} in the online check` : "",
      )}`
    : "#/quote";

  return (
    <div>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-site px-4 py-12 sm:px-6 md:py-16">
          <p className="eyebrow">Free online tool</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Check your artwork</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">
            Pick your product, choose your file and we'll check the size, bleed, resolution and colour mode against our
            artwork guide. It all happens on your device: your file isn't uploaded anywhere.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-site gap-8 px-4 sm:px-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-5">
            <div className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
              <h2 className="font-display text-2xl tracking-wide">1. What are you printing?</h2>
              <label className={`${label} mt-4`}>
                Product
                <select
                  className={input}
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value);
                    setSpecId("");
                    setResult(null);
                  }}
                >
                  <option value="">Choose a product</option>
                  {ARTWORK_PRODUCTS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`${label} mt-4`}>
                Size
                <select className={input} value={specId} disabled={!product} onChange={(e) => setSpecId(e.target.value)}>
                  <option value="">{product ? "Choose a size" : "Choose a product first"}</option>
                  {specs.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              {spec && (
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                  <dt className="font-bold">Artwork incl. bleed</dt>
                  <dd>
                    {Math.round(aw).toLocaleString("en-AU")} × {Math.round(ah).toLocaleString("en-AU")} mm
                    {spec.templateScale === 0.1 && <span className="text-charcoal/70"> (or 10% scale)</span>}
                  </dd>
                  <dt className="font-bold">Finished size</dt>
                  <dd>
                    {spec.finished[0].toLocaleString("en-AU")} × {spec.finished[1].toLocaleString("en-AU")} mm
                  </dd>
                  <dt className="font-bold">Bleed</dt>
                  <dd>{spec.bleed[0] === spec.bleed[1] ? `${spec.bleed[0]} mm each edge` : `${spec.bleed[0]} mm sides, ${spec.bleed[1]} mm top and bottom`}</dd>
                  <dt className="font-bold">Safe area</dt>
                  <dd>
                    {spec.round
                      ? "Inside the table top circle"
                      : spec.safe.bottom !== spec.safe.top
                        ? `${spec.safe.top} mm top and sides, ${spec.safe.bottom} mm bottom`
                        : `${spec.safe.top} mm from each edge`}
                  </dd>
                  <dt className="font-bold">Resolution</dt>
                  <dd>
                    {spec.minPpi} ppi or more at full size
                  </dd>
                </dl>
              )}
              {spec && (
                <a href={asset(spec.guide)} download className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-rust-dark underline underline-offset-4">
                  Download the artwork guide (PDF)
                </a>
              )}
            </div>

            <div className="rounded-xl border border-charcoal/15 bg-white p-5 shadow-sm">
              <h2 className="font-display text-2xl tracking-wide">2. Choose your file</h2>
              <p className="mt-2 text-sm text-charcoal/80">PDF, JPG or PNG. Only page 1 of a PDF is previewed.</p>
              <input
                ref={fileInput}
                id="artwork-file"
                type="file"
                accept={ACCEPT}
                className="sr-only"
                disabled={!spec}
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  e.target.value = "";
                }}
              />
              <label
                htmlFor="artwork-file"
                aria-disabled={!spec}
                className={`mt-4 w-full ${spec ? "btn-rust cursor-pointer" : "btn cursor-not-allowed bg-charcoal/10 text-charcoal/50"}`}
              >
                {file ? "Choose a different file" : "Choose a file"}
              </label>
              {!spec && <p className="mt-2 text-sm text-charcoal/70">Choose a product and size first.</p>}
              {file && <p className="mt-3 break-all text-sm"><span className="font-bold">File:</span> {file.name}</p>}
            </div>
          </div>

          <div ref={resultsRef} className="scroll-mt-24" aria-live="polite">
            {busy && (
              <div className="rounded-xl border border-charcoal/15 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold">Checking your file…</p>
                <p className="mt-1 text-sm text-charcoal/70">Big PDFs can take a few seconds.</p>
              </div>
            )}
            {error && !busy && (
              <div role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 p-5">
                <p className="font-bold">We couldn't check that file</p>
                <p className="mt-1">{error}</p>
                <p className="mt-2 text-sm">
                  You can still send it to us: reply to our quote email with it attached, or email {QUOTE_EMAIL}.
                </p>
              </div>
            )}
            {!busy && !error && !result && (
              <div className="rounded-xl border-2 border-dashed border-charcoal/25 p-8 text-center text-charcoal/70">
                <p className="text-lg font-semibold">Your results will show here</p>
                <p className="mt-1 text-sm">With a preview of your artwork and our bleed and safe area guides on top.</p>
              </div>
            )}
            {result && spec && verdict && !busy && (
              <div className="space-y-6">
                <div className={`rounded-xl border-2 p-5 ${SUMMARY[verdict].cls}`}>
                  <h2 className="font-display text-2xl tracking-wide">{SUMMARY[verdict].title}</h2>
                  <p className="mt-1">{SUMMARY[verdict].body}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <figure className="rounded-xl border border-charcoal/15 bg-white p-4 shadow-sm">
                    <div className="relative mx-auto w-full overflow-hidden bg-[repeating-conic-gradient(#eee_0_25%,#fff_0_50%)] [background-size:16px_16px]">
                      <img src={preview} alt={`Preview of ${result.fileName}`} className="block h-auto w-full" />
                      {guides && <Guides spec={spec} />}
                    </div>
                    <figcaption className="mt-3 space-y-2 text-sm">
                      <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold">
                        <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} className="h-5 w-5 accent-rust-dark" />
                        Show guides
                      </label>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1">
                        <li className="flex items-center gap-1.5"><span className="inline-block h-3 w-5 bg-red-700/30" /> Bleed (trimmed off)</li>
                        <li className="flex items-center gap-1.5"><span className="inline-block h-0.5 w-5 bg-red-700" /> Finished edge</li>
                        <li className="flex items-center gap-1.5"><span className="inline-block w-5 border-t-2 border-dashed border-green-700" /> Safe area</li>
                      </ul>
                      <p className="text-charcoal/70">
                        Guides are stretched to fit your file, so they're a guide only when the proportions don't match.
                        {spec.note ? ` ${spec.note}` : ""}
                      </p>
                    </figcaption>
                  </figure>

                  <ul className="space-y-3">
                    {result.checks.map((c, i) => (
                      <li key={`${c.id}-${i}`} className="rounded-xl border border-charcoal/15 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${BADGE[c.status].cls}`}>
                            <span aria-hidden>{BADGE[c.status].icon}</span> {BADGE[c.status].text}
                          </span>
                          <div>
                            <p className="font-bold">{c.title}</p>
                            <p className="text-sm">{c.detail}</p>
                            {c.tip && <p className="mt-1 text-sm text-charcoal/80"><span className="font-semibold">Tip:</span> {c.tip}</p>}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border-2 border-charcoal bg-cream p-5">
                  <h2 className="font-display text-2xl tracking-wide">Ready for a quote?</h2>
                  <p className="mt-1">
                    We'll open the quote form with your product and size filled in. Files can't
                    be attached to the form, so once we email you your quote, just reply with your artwork attached (or paste a download
                    link into the form).
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={quoteLink} className="btn-rust" data-track="artwork-check-quote">
                      Send this with a quote request
                    </a>
                    <button type="button" className="btn-outline" onClick={() => fileInput.current?.click()}>
                      Check another file
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="mx-auto max-w-3xl px-4 text-sm text-charcoal/80 sm:px-6">
          <h2 className="font-display text-xl tracking-wide text-charcoal">About this check</h2>
          <p className="mt-2">
            It's an automatic first look, not a final proof. It can't judge spelling, design or fine details like thin lines and
            small text, and colour mode and resolution checks are best guesses for some PDFs. Every order still gets a check by us
            and a digital proof before anything is printed.
          </p>
        </div>
      </section>
    </div>
  );
}
