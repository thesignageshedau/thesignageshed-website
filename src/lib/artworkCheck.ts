// Client-side artwork checks. Nothing leaves the browser: files are read with FileReader /
// createImageBitmap, and PDFs with pdf.js (loaded on demand so the rest of the site stays light).
import { artSize, type ArtworkSpec } from "../data/artworkSpecs";

export type Status = "pass" | "warn" | "fail" | "info";
export type CheckResult = { id: string; title: string; status: Status; detail: string; tip?: string };
export type Analysis = {
  kind: "pdf" | "image";
  fileName: string;
  fileBytes: number;
  pages: number;
  widthMm: number | null; // page size for PDFs; null for images (no physical size)
  heightMm: number | null;
  pxW?: number;
  pxH?: number;
  preview: HTMLCanvasElement;
  checks: CheckResult[];
};

const MAX_BYTES = 200 * 1024 * 1024; // we won't try to open anything larger in the browser
const EMAIL_LIMIT = 25 * 1024 * 1024; // most email services cap attachments around 25 MB
const PREVIEW_MAX = 1400; // longest preview edge in px
const mm = (n: number) => `${Math.round(n).toLocaleString("en-AU")} mm`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

export function fileKind(f: File): "pdf" | "jpeg" | "png" | null {
  const n = f.name.toLowerCase();
  if (f.type === "application/pdf" || n.endsWith(".pdf")) return "pdf";
  if (f.type === "image/jpeg" || /\.jpe?g$/.test(n)) return "jpeg";
  if (f.type === "image/png" || n.endsWith(".png")) return "png";
  return null;
}

/** JPEG colour: count components in the SOF header (3 = RGB/YCbCr, 4 = CMYK, 1 = greyscale). */
function jpegComponents(buf: ArrayBuffer): number | null {
  const v = new DataView(buf);
  if (v.byteLength < 4 || v.getUint16(0) !== 0xffd8) return null;
  let i = 2;
  while (i + 9 < v.byteLength) {
    if (v.getUint8(i) !== 0xff) { i++; continue; }
    const m = v.getUint8(i + 1);
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    const len = v.getUint16(i + 2);
    if ((m >= 0xc0 && m <= 0xc3) || (m >= 0xc5 && m <= 0xc7) || (m >= 0xc9 && m <= 0xcb) || (m >= 0xcd && m <= 0xcf))
      return v.getUint8(i + 9);
    i += 2 + len;
  }
  return null;
}

/** JPEG pixel density from the JFIF header, if it says dots per inch or per cm. */
function jfifDpi(buf: ArrayBuffer): number | null {
  const v = new DataView(buf);
  if (v.byteLength < 18 || v.getUint16(2) !== 0xffe0) return null;
  const id = String.fromCharCode(v.getUint8(6), v.getUint8(7), v.getUint8(8), v.getUint8(9));
  if (id !== "JFIF") return null;
  const unit = v.getUint8(13), x = v.getUint16(14);
  if (unit === 1 && x > 1) return x;
  if (unit === 2 && x > 1) return x * 2.54;
  return null;
}

/** Rough PDF colour scan: looks for colour space names in the raw (uncompressed) parts of the file. */
function pdfColourHints(buf: ArrayBuffer): { rgb: boolean; cmyk: boolean } {
  const s = new TextDecoder("latin1").decode(new Uint8Array(buf));
  return { rgb: /\/DeviceRGB|\/CalRGB|\/sRGB/.test(s), cmyk: /\/DeviceCMYK|\/DeviceN|\/Separation/.test(s) };
}

function sizeChecks(
  spec: ArtworkSpec,
  w: number,
  h: number,
  checks: CheckResult[],
  physical: boolean,
): { printScale: number; matchedArt: boolean } {
  const [aw, ah] = artSize(spec);
  const [fw, fh] = spec.finished;
  const rotated = (w > h) !== (aw > ah) && Math.abs(aw - ah) > 1;
  const ratio = w / h;
  const artRatio = aw / ah;
  const finRatio = fw / fh;
  const off = Math.abs(ratio / artRatio - 1);
  const offFin = Math.abs(ratio / finRatio - 1);
  const matchedArt = off <= 0.01;
  const matchedFin = !matchedArt && offFin <= 0.01;

  if (rotated) {
    checks.push({
      id: "shape",
      title: "Proportions",
      status: "fail",
      detail: `Your file is ${w > h ? "landscape" : "portrait"}, but this product is ${aw > ah ? "landscape" : "portrait"}.`,
      tip: "Rotate your artboard (not just the artwork) so it matches the product, then export again.",
    });
  } else if (matchedArt) {
    checks.push({ id: "shape", title: "Proportions", status: "pass", detail: `Matches the artwork size including bleed (within ${pct(off)}).` });
  } else if (matchedFin) {
    checks.push({
      id: "shape",
      title: "Proportions",
      status: "warn",
      detail: "Matches the finished size, but there's no room for bleed.",
      tip: `Extend your background ${spec.bleed[0] === spec.bleed[1] ? `${spec.bleed[0]} mm` : `${spec.bleed[0]} mm at the sides and ${spec.bleed[1]} mm top and bottom`} past every edge so nothing white shows after trimming.`,
    });
  } else {
    checks.push({
      id: "shape",
      title: "Proportions",
      status: off <= 0.05 ? "warn" : "fail",
      detail: `Your file is ${pct(off)} off the product's proportions.`,
      tip:
        off <= 0.05
          ? "We can usually stretch or crop this small amount, but it's best to set your artboard to the exact size from our guide."
          : "Artwork this far out would be cropped or squashed. Start again from our template, or set the artboard to the size in our guide.",
    });
  }

  if (!physical) {
    return { printScale: 0, matchedArt };
  }
  // Page size: full size, or our 10% scale template.
  const scales = spec.templateScale === 0.1 ? [1, 0.1] : [1];
  let best: { scale: number; err: number; target: "art" | "fin" } = { scale: 1, err: Infinity, target: "art" };
  for (const sc of scales) {
    for (const [target, tw, th] of [["art", aw, ah], ["fin", fw, fh]] as const) {
      const err = Math.max(Math.abs(w - tw * sc) / (tw * sc), Math.abs(h - th * sc) / (th * sc));
      if (err < best.err) best = { scale: sc, err, target };
    }
  }
  const at = best.scale === 1 ? "full size" : "10% scale";
  const want = `${mm(aw * best.scale)} × ${mm(ah * best.scale)}`;
  if (best.err <= 0.005 || Math.max(Math.abs(w - aw * best.scale), Math.abs(h - ah * best.scale)) <= 1.5) {
    checks.push({
      id: "size",
      title: "Size and bleed",
      status: best.target === "art" ? "pass" : "warn",
      detail:
        best.target === "art"
          ? `${mm(w)} × ${mm(h)}: the artwork size including bleed, at ${at}.`
          : `${mm(w)} × ${mm(h)}: the finished size at ${at}, with no bleed.`,
      ...(best.target === "fin" ? { tip: `Add bleed: the page should be ${want}.` } : {}),
    });
  } else if (best.target === "fin" && best.err <= 0.005) {
    checks.push({ id: "size", title: "Size and bleed", status: "warn", detail: `Finished size with no bleed (${mm(w)} × ${mm(h)}).`, tip: `Add bleed: the page should be ${want}.` });
  } else {
    checks.push({
      id: "size",
      title: "Size and bleed",
      status: matchedArt ? "warn" : "fail",
      detail: `Your page is ${mm(w)} × ${mm(h)}. We need ${mm(aw)} × ${mm(ah)}${spec.templateScale === 0.1 ? ` (or ${mm(aw / 10)} × ${mm(ah / 10)} at 10% scale)` : ""}.`,
      tip: matchedArt
        ? "The proportions are right, so we can scale it, but check the resolution below holds up at full size."
        : "Set your artboard to the size in our guide (or use our template) and export again.",
    });
  }
  // How much the page is enlarged to print: printed mm per page mm.
  return { printScale: aw / w, matchedArt };
}

function ppiCheck(spec: ArtworkSpec, ppi: number | null, what: string): CheckResult {
  const lead = (t: string) => (what ? `${what} ${t.charAt(0).toLowerCase()}${t.slice(1)}` : t);
  if (ppi === null)
    return { id: "ppi", title: "Resolution", status: "info", detail: "We couldn't measure image resolution in this file.", tip: `Make sure photos are at least ${spec.minPpi} ppi at full printed size.` };
  const r = Math.round(ppi);
  if (ppi >= spec.goodPpi) return { id: "ppi", title: "Resolution", status: "pass", detail: lead(`About ${r} ppi at full printed size. That will print crisp.`) };
  if (ppi >= spec.minPpi)
    return { id: "ppi", title: "Resolution", status: "pass", detail: lead(`About ${r} ppi at full printed size. Fine for viewing from a step or two back.`) };
  if (ppi >= spec.minPpi * 0.75)
    return { id: "ppi", title: "Resolution", status: "warn", detail: lead(`About ${r} ppi at full printed size, a little under our ${spec.minPpi} ppi minimum.`), tip: "It may look slightly soft up close. A larger original image or a vector logo will fix it." };
  return {
    id: "ppi",
    title: "Resolution",
    status: "fail",
    detail: lead(`Only about ${r} ppi at full printed size (we need ${spec.minPpi} ppi or more).`),
    tip: "This will print blurry or pixelated. Use the original, full size photo or logo (not one saved from a website or social media), or send a vector PDF.",
  };
}

function fileSizeCheck(bytes: number): CheckResult {
  const mb = bytes / 1024 / 1024;
  const s = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  if (bytes > EMAIL_LIMIT)
    return { id: "bytes", title: "File size", status: "warn", detail: `${s}. That's too big for most email attachments.`, tip: "Send it as a download link instead (Google Drive, Dropbox or WeTransfer) and paste the link into the quote form." };
  return { id: "bytes", title: "File size", status: "pass", detail: `${s}. Small enough to email.` };
}

function pagesCheck(spec: ArtworkSpec, pages: number): CheckResult {
  if (pages <= spec.maxPages)
    return { id: "pages", title: "Pages", status: "pass", detail: pages === 1 ? "1 page." : `${pages} pages. ${spec.note ?? ""}`.trim() };
  return {
    id: "pages",
    title: "Pages",
    status: "warn",
    detail: `${pages} pages. We expect ${spec.maxPages === 1 ? "1 page" : `up to ${spec.maxPages} (front and back)`} for this product.`,
    tip: "Send one file per design, or tell us in your quote request which pages to print.",
  };
}

async function analyseImage(file: File, kind: "jpeg" | "png", spec: ArtworkSpec): Promise<Analysis> {
  const buf = await file.arrayBuffer();
  const bmp = await createImageBitmap(new Blob([buf], { type: file.type || `image/${kind}` }));
  const pxW = bmp.width, pxH = bmp.height;
  const scale = Math.min(1, PREVIEW_MAX / Math.max(pxW, pxH));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(pxW * scale);
  canvas.height = Math.round(pxH * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();

  const checks: CheckResult[] = [];
  sizeChecks(spec, pxW, pxH, checks, false);
  const [aw] = artSize(spec);
  const ppi = pxW / (aw / 25.4);
  const tagged = kind === "jpeg" ? jfifDpi(buf) : null;
  checks.push({
    id: "size",
    title: "Size and bleed",
    status: "info",
    detail: `${pxW.toLocaleString("en-AU")} × ${pxH.toLocaleString("en-AU")} px. Images have no fixed print size, so we've worked it out as if it fills the artwork size including bleed${tagged ? ` (your file is tagged ${Math.round(tagged)} ppi, which printers ignore)` : ""}.`,
  });
  checks.push(ppiCheck(spec, ppi, ""));
  if (kind === "png") {
    checks.push({ id: "colour", title: "Colour mode", status: "warn", detail: "PNG files are always RGB.", tip: "Bright greens, blues and oranges can print a little duller. For exact brand colours, send a CMYK PDF." });
  } else {
    const c = jpegComponents(buf);
    checks.push(
      c === 4
        ? { id: "colour", title: "Colour mode", status: "pass", detail: "CMYK. Ready for print." }
        : c === 1
          ? { id: "colour", title: "Colour mode", status: "pass", detail: "Greyscale." }
          : c === 3
            ? { id: "colour", title: "Colour mode", status: "warn", detail: "RGB.", tip: "Bright greens, blues and oranges can print a little duller. For exact brand colours, convert to CMYK or send a CMYK PDF." }
            : { id: "colour", title: "Colour mode", status: "info", detail: "We couldn't tell the colour mode." },
    );
  }
  checks.push({ id: "vector", title: "Text and logos", status: "info", detail: "Images turn text and logos into pixels.", tip: "For the sharpest text, export a PDF from your design app with text and logos kept as vectors." });
  checks.push(fileSizeCheck(file.size));
  checks.push(pagesCheck(spec, 1));
  return { kind: "image", fileName: file.name, fileBytes: file.size, pages: 1, widthMm: null, heightMm: null, pxW, pxH, preview: canvas, checks };
}

type PdfJs = typeof import("pdfjs-dist");
let pdfjsPromise: Promise<PdfJs> | null = null;
function loadPdfJs(): Promise<PdfJs> {
  pdfjsPromise ??= Promise.all([import("pdfjs-dist"), import("pdfjs-dist/build/pdf.worker.min.mjs?url")]).then(([lib, worker]) => {
    lib.GlobalWorkerOptions.workerSrc = worker.default;
    return lib;
  });
  return pdfjsPromise;
}

type Mat = [number, number, number, number, number, number];
const mul = (m: Mat, n: Mat): Mat => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];

async function analysePdf(file: File, spec: ArtworkSpec): Promise<Analysis> {
  const buf = await file.arrayBuffer();
  const colour = pdfColourHints(buf);
  const pdfjs = await loadPdfJs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), isEvalSupported: false }).promise;
  try {
    const page = await doc.getPage(1);
    const vp1 = page.getViewport({ scale: 1 }); // 1 unit = 1 pt (userUnit included), rotation applied
    const userUnit = (page as unknown as { userUnit?: number }).userUnit ?? 1;
    const wMm = (vp1.width * 25.4) / 72;
    const hMm = (vp1.height * 25.4) / 72;
    const checks: CheckResult[] = [];
    const { printScale } = sizeChecks(spec, wMm, hMm, checks, true);

    // Embedded images: walk the drawing commands, tracking the transform for each image drawn.
    let minPpi: number | null = null;
    let images = 0;
    try {
      const ops = await page.getOperatorList();
      const OPS = pdfjs.OPS;
      let ctm: Mat = [1, 0, 0, 1, 0, 0];
      const stack: Mat[] = [];
      const pageArea = (vp1.width / userUnit) * (vp1.height / userUnit);
      for (let i = 0; i < ops.fnArray.length; i++) {
        const fn = ops.fnArray[i];
        const args = ops.argsArray[i] as unknown[];
        if (fn === OPS.save) stack.push(ctm);
        else if (fn === OPS.restore) ctm = stack.pop() ?? [1, 0, 0, 1, 0, 0];
        else if (fn === OPS.transform) ctm = mul(ctm, args as Mat);
        else if (fn === OPS.paintFormXObjectBegin) {
          stack.push(ctm);
          const m = args[0] as Mat | null;
          if (m) ctm = mul(ctm, m);
        } else if (fn === OPS.paintFormXObjectEnd) ctm = stack.pop() ?? ctm;
        else if (fn === OPS.paintImageXObject || fn === OPS.paintInlineImageXObject) {
          let pw = 0, ph = 0;
          if (fn === OPS.paintImageXObject) {
            pw = Number(args[1]); ph = Number(args[2]);
          } else {
            const img = args[0] as { width?: number; height?: number };
            pw = img?.width ?? 0; ph = img?.height ?? 0;
          }
          const dw = Math.hypot(ctm[0], ctm[1]); // drawn size in pt
          const dh = Math.hypot(ctm[2], ctm[3]);
          if (!pw || !ph || dw < 1 || dh < 1) continue;
          if ((dw * dh) / pageArea < 0.02) continue; // ignore tiny icons
          images++;
          const printedInW = ((dw * userUnit) / 72) * printScale;
          const printedInH = ((dh * userUnit) / 72) * printScale;
          const ppi = Math.min(pw / printedInW, ph / printedInH);
          minPpi = minPpi === null ? ppi : Math.min(minPpi, ppi);
        }
      }
    } catch {
      minPpi = null;
    }
    checks.push(
      images === 0
        ? { id: "ppi", title: "Resolution", status: "pass", detail: "No large photos found: text and shapes are vectors, so they print sharp at any size." }
        : ppiCheck(spec, minPpi, `${images === 1 ? "1 image" : `${images} images`} found. The lowest is`),
    );
    checks.push(
      colour.rgb && !colour.cmyk
        ? { id: "colour", title: "Colour mode", status: "warn", detail: "Looks like RGB.", tip: "Bright greens, blues and oranges can print a little duller. For exact brand colours, export as CMYK (PDF/X-1a or PDF/X-4 works well)." }
        : colour.rgb && colour.cmyk
          ? { id: "colour", title: "Colour mode", status: "warn", detail: "A mix of RGB and CMYK.", tip: "We'll convert the RGB parts for print. For exact brand colours, export everything as CMYK." }
          : colour.cmyk
            ? { id: "colour", title: "Colour mode", status: "pass", detail: "CMYK. Ready for print." }
            : { id: "colour", title: "Colour mode", status: "info", detail: "We couldn't tell the colour mode from this file.", tip: "If you can, export as CMYK." },
    );
    checks.push(fileSizeCheck(file.size));
    checks.push(pagesCheck(spec, doc.numPages));

    const scale = PREVIEW_MAX / Math.max(vp1.width, vp1.height);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(vp.width);
    canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    return { kind: "pdf", fileName: file.name, fileBytes: file.size, pages: doc.numPages, widthMm: wMm, heightMm: hMm, preview: canvas, checks };
  } finally {
    void doc.destroy();
  }
}

export async function analyseArtwork(file: File, spec: ArtworkSpec): Promise<Analysis> {
  const kind = fileKind(file);
  if (!kind) throw new Error("Please choose a PDF, JPG or PNG file.");
  if (file.size > MAX_BYTES) throw new Error("That file is over 200 MB, too big to check in your browser. Send it to us with a download link and we'll check it for you.");
  if (kind === "pdf") return analysePdf(file, spec);
  return analyseImage(file, kind, spec);
}

export function overall(checks: CheckResult[]): "pass" | "warn" | "fail" {
  if (checks.some((c) => c.status === "fail")) return "fail";
  if (checks.some((c) => c.status === "warn")) return "warn";
  return "pass";
}
