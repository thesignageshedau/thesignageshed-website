// Monotonic and worked-example checks for custom-size pricing. Run with: npx tsx scripts/check-custom-pricing.ts
import { priceCustom, parseDims, parseMm, parseQty, FROM_PER_M2, kindForCorflute } from "../src/data/customSize";
import { BANNERS, gearEach } from "../src/data/eventGear";
import { PACKS } from "../src/data/packs";
import { signsTotal } from "../src/data/corfluteSigns";
import { ACM_SIGNS } from "../src/data/eventGear";


// Pricing rule (26 Nov 2026): supplier regular price inc GST ÷ 0.7, rounded UP to the next $5 (exact multiples
// stay). Multi-unit lines use the whole-dollar unit × qty; corflute 1–10 bundles and packs are flat totals.
// Expected values below are worked from the recorded supplier prices, not read back from the site data.
const up5 = (x: number) => {
  const r = Math.round(x * 1e6) / 1e6;
  return Math.abs(r / 5 - Math.round(r / 5)) < 1e-9 ? Math.round(r) : Math.ceil(r / 5) * 5;
};
const sell = (es: number, qty = 1, flat = false) => {
  const base = up5(es / 0.7);
  return flat || qty <= 1 ? base : Math.ceil(base / qty - 1e-9) * qty;
};
const FLOOR = sell(137.5); // the supplier's $137.50 product floor

const fails: string[] = [];
const ok = (name: string, cond: boolean, detail = "") => {
  if (cond) console.log(`ok  ${name}${detail ? " — " + detail : ""}`);
  else {
    fails.push(`${name}${detail ? " — " + detail : ""}`);
    console.log(`FAIL ${name}${detail ? " — " + detail : ""}`);
  }
};

// Validation
ok("reject empty", !parseMm("", "mm").ok);
ok("reject text", !parseMm("abc", "mm").ok);
ok("reject zero", !parseMm("0", "mm").ok);
ok("reject negative", !parseMm("-10", "mm").ok);
ok("accept 1.5m as 1500mm", parseMm("1.5", "m").ok && (parseMm("1.5", "m") as { mm: number }).mm === 1500);
ok("round 2000.4 mm", parseMm("2000.4", "mm").ok && (parseMm("2000.4", "mm") as { mm: number }).mm === 2000);
ok("qty 1.5 rejected", !parseQty("1.5").ok);
ok("qty 0 rejected", !parseQty("0").ok);
ok("pvc 100mm too small", !parseDims("pvc", "100", "1000", "mm").ok);
ok("pvc 2000x3000 swaps to 3000x2000", parseDims("pvc", "2000", "2000", "mm").ok);
const swap = parseDims("pvc", "2000", "3000", "mm");
ok("pvc height 3000 swaps", swap.ok && swap.ok && swap.swapped && swap.widthMm === 3000 && swap.heightMm === 2000);
ok("corflute 3000x3000 too big", !parseDims("corflute-5mm-single", "3000", "3000", "mm").ok);
ok("corflute 2400x1200 ok", parseDims("corflute-5mm-single", "2400", "1200", "mm").ok);
ok("sav 150mm too small", !parseDims("sav", "150", "200", "mm").ok);

// Worked examples
const ex = (kind: Parameters<typeof priceCustom>[0], w: number, h: number, qty: number) => {
  const r = priceCustom(kind, w, h, qty);
  if (!r.ok) return { ok: false as const, reason: r.reason };
  return r;
};

const pvc3 = ex("pvc", 3000, 1000, 1);
ok(`PVC 3000×1000 qty 1 is $${FLOOR} (listed)`, pvc3.ok && pvc3.ok && pvc3.total === FLOOR && pvc3.matchedListed === "pvc-3000x1000");
const pvc3q10 = ex("pvc", 3000, 1000, 10);
ok(`PVC 3000×1000 qty 10 is $${sell(654.39, 10)}`, pvc3q10.ok && pvc3q10.ok && pvc3q10.total === sell(654.39, 10));
const mesh2 = ex("mesh", 2000, 1000, 1);
ok("Mesh 2000×1000 qty 1 prices instantly", mesh2.ok && mesh2.ok && mesh2.total >= FLOOR);
console.log("  example mesh 2000×1000 q1", mesh2.ok ? `$${mesh2.total}` : mesh2.reason);
const mesh2q10 = ex("mesh", 2000, 1000, 10);
console.log("  example mesh 2000×1000 q10", mesh2q10.ok ? `$${mesh2q10.total}` : mesh2q10.reason);
const cf = ex("corflute-5mm-single", 1200, 600, 1);
ok("Corflute 1200×600 5mm SS qty 1 prices instantly", cf.ok && cf.ok && cf.total >= FLOOR);
console.log("  example corflute 1200×600 5mm SS q1", cf.ok ? `$${cf.total}` : cf.reason);
const cf5 = ex("corflute-5mm-single", 1200, 600, 5);
const cf10 = ex("corflute-5mm-single", 1200, 600, 10);
console.log("  example corflute 1200×600 q5", cf5.ok ? `$${cf5.total}` : "", "q10", cf10.ok ? `$${cf10.total}` : "");

// Listed matches
const pvc2k: Record<number, number> = { 1: sell(137.5), 5: sell(255.2, 5), 10: sell(472.12, 10) };
ok(`PVC 2000×1000 custom = listed $${pvc2k[1]}/$${pvc2k[5]}/$${pvc2k[10]}`,
  [1,5,10].every((q) => {
    const r = ex("pvc", 2000, 1000, q);
    return r.ok && r.total === pvc2k[q];
  }));
ok("Corflute 600×900 5mm SS listed bundles",
  ex("corflute-5mm-single", 600, 900, 1).ok && (ex("corflute-5mm-single", 600, 900, 1) as {total:number}).total === sell(137.5, 5, true)
  && (ex("corflute-5mm-single", 600, 900, 5) as {total:number}).total === sell(137.5, 5, true)
  && (ex("corflute-5mm-single", 900, 600, 10) as {total:number}).total === sell(180.51, 10, true));

ok(`Mesh 2400×1600 qty 4 is $${sell(348.73, 4)} (pack component)`, (ex("mesh", 2400, 1600, 4) as {total:number}).total === sell(348.73, 4));

// Quantity monotonicity
function qtyMono(kind: Parameters<typeof priceCustom>[0], w: number, h: number, maxQ: number) {
  let prev = 0;
  for (let q = 1; q <= maxQ; q++) {
    const r = ex(kind, w, h, q);
    if (!r.ok) return `fail at qty ${q}: ${r.reason}`;
    if (r.total < prev) return `qty ${q} total ${r.total} < qty ${q - 1} total ${prev}`;
    prev = r.total;
  }
  return "";
}
for (const [kind, w, h, maxQ] of [
  ["pvc", 2500, 1000, 50],
  ["pvc", 3000, 1000, 50],
  ["mesh", 2000, 1000, 50],
  ["fabric", 2200, 1200, 50],
  ["corflute-5mm-single", 1200, 600, 100],
  ["corflute-3mm-double", 900, 900, 100],
  ["runner-front", 800, 1500, 10],
  ["acm-single", 1000, 1000, 10],
  ["sav", 800, 600, 50],
] as const) {
  const err = qtyMono(kind, w, h, maxQ);
  ok(`qty mono ${kind} ${w}×${h}`, !err, err);
}

// Area monotonicity: grow one side
function areaMono(kind: Parameters<typeof priceCustom>[0], h: number, widths: number[], qty: number) {
  let prev = 0;
  let prevW = 0;
  for (const w of widths) {
    const r = ex(kind, w, h, qty);
    if (!r.ok) return `fail at ${w}×${h}: ${r.reason}`;
    if (r.total < prev) return `${w}×${h} total ${r.total} < ${prevW}×${h} total ${prev}`;
    prev = r.total;
    prevW = w;
  }
  return "";
}
for (const [kind, h, widths, qty] of [
  ["pvc", 1000, [1000, 1500, 2000, 2500, 3000, 4000, 5000], 10],
  ["mesh", 1000, [1000, 2000, 3000, 4000], 10],
  ["corflute-5mm-single", 900, [400, 600, 900, 1200], 10],
  ["acm-single", 900, [600, 900, 1200, 1800], 1],
  ["sav", 1000, [400, 600, 1000, 1300], 10],
] as const) {
  const err = areaMono(kind, h, [...widths], qty);
  ok(`area mono ${kind} h=${h} q${qty}`, !err, err);
}

// Packs: expected new prices
// Sum of each component's rounded price, then the pack total rounded up to the next $5.
const pack = (...parts: number[]) => up5(parts.reduce((a, b) => a + b, 0));
const packExpect: Record<string, number> = {
  "sponsor-5": pack(sell(280.14, 5, true)),
  "sponsor-10": pack(sell(523.09, 10, true)),
  "site-cf-5": pack(sell(169.59, 5, true)),
  "site-cf-10": pack(sell(246.88, 10, true)),
  "mesh-2": pack(sell(192.96, 2)),
  "mesh-4": pack(sell(348.73, 4)),
  "school": pack(sell(137.5, 2), sell(308.0, 2), sell(205.45, 10, true)),
  "event-starter": pack(sell(387.2), sell(148.5)),
  "event-full": pack(sell(387.2), sell(148.5), sell(174.9)),
  "flags-3-single": pack(sell(466.97, 3)),
  "flags-3-double": pack(sell(557.39, 3)),
};
for (const it of PACKS.items) {
  ok(`pack ${it.id} = $${packExpect[it.id]}`, it.price[0] === packExpect[it.id], `got ${it.price[0]}`);
}

// Listed gearEach still works
const pvcItem = BANNERS.items.find((i) => i.id === "pvc-4000x1000")!;
ok(`PVC 4000×1000 qty 1 each ${FLOOR}`, gearEach(BANNERS, pvcItem, false, 1) === FLOOR);
ok(`PVC 4000×1000 qty 10 each ${sell(895.84, 10) / 10}`, gearEach(BANNERS, pvcItem, false, 10) === sell(895.84, 10) / 10);
const mesh4 = BANNERS.items.find((i) => i.id === "mesh-2400x1600")!;
ok(`mesh 2400×1600 qty 4 total ${sell(348.73, 4)}`, Math.round((gearEach(BANNERS, mesh4, false, 4) ?? 0) * 4) === sell(348.73, 4));
ok(`corflute listed 600x900 5mm ss 10 = ${sell(180.51, 10, true)}`, signsTotal("600x900", "5mm", "single", 10) === sell(180.51, 10, true));
ok(`ACM starts at ${FLOOR}`, ACM_SIGNS.items[0]!.price[0] === FLOOR);

console.log("\nFrom-rates:", FROM_PER_M2);
console.log("kindForCorflute 3mm double", kindForCorflute("3mm", "double"));

if (fails.length) {
  console.error(`\n${fails.length} check(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${ /* count later */ "monotonic and example"} checks passed`);
