// Monotonic and worked-example checks for custom-size pricing. Run with: npx tsx scripts/check-custom-pricing.ts
import { priceCustom, parseDims, parseMm, parseQty, FROM_PER_M2, kindForCorflute } from "../src/data/customSize";
import { BANNERS, gearEach } from "../src/data/eventGear";
import { PACKS } from "../src/data/packs";
import { signsTotal } from "../src/data/corfluteSigns";
import { ACM_SIGNS } from "../src/data/eventGear";

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
ok("PVC 3000×1000 qty 1 is $185 (listed)", pvc3.ok && pvc3.ok && pvc3.total === 185 && pvc3.matchedListed === "pvc-3000x1000");
const pvc3q10 = ex("pvc", 3000, 1000, 10);
ok("PVC 3000×1000 qty 10 is $880", pvc3q10.ok && pvc3q10.ok && pvc3q10.total === 880);
const mesh2 = ex("mesh", 2000, 1000, 1);
ok("Mesh 2000×1000 qty 1 prices instantly", mesh2.ok && mesh2.ok && mesh2.total >= 185);
console.log("  example mesh 2000×1000 q1", mesh2.ok ? `$${mesh2.total}` : mesh2.reason);
const mesh2q10 = ex("mesh", 2000, 1000, 10);
console.log("  example mesh 2000×1000 q10", mesh2q10.ok ? `$${mesh2q10.total}` : mesh2q10.reason);
const cf = ex("corflute-5mm-single", 1200, 600, 1);
ok("Corflute 1200×600 5mm SS qty 1 prices instantly", cf.ok && cf.ok && cf.total >= 185);
console.log("  example corflute 1200×600 5mm SS q1", cf.ok ? `$${cf.total}` : cf.reason);
const cf5 = ex("corflute-5mm-single", 1200, 600, 5);
const cf10 = ex("corflute-5mm-single", 1200, 600, 10);
console.log("  example corflute 1200×600 q5", cf5.ok ? `$${cf5.total}` : "", "q10", cf10.ok ? `$${cf10.total}` : "");

// Listed matches
ok("PVC 2000×1000 custom = listed $185/$345/$630",
  [1,5,10].every((q) => {
    const r = ex("pvc", 2000, 1000, q);
    return r.ok && r.total === ({1:185,5:345,10:630} as Record<number, number>)[q];
  }));
ok("Corflute 600×900 5mm SS listed bundles",
  ex("corflute-5mm-single", 600, 900, 1).ok && (ex("corflute-5mm-single", 600, 900, 1) as {total:number}).total === 185
  && (ex("corflute-5mm-single", 600, 900, 5) as {total:number}).total === 185
  && (ex("corflute-5mm-single", 900, 600, 10) as {total:number}).total === 245);

ok("Mesh 2400×1600 qty 4 is $468 (pack component)", (ex("mesh", 2400, 1600, 4) as {total:number}).total === 468);

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
const packExpect: Record<string, number> = {
  "sponsor-5": 375,
  "sponsor-10": 700,
  "site-cf-5": 230,
  "site-cf-10": 330,
  "mesh-2": 260,
  "mesh-4": 468,
  "school": 877,
  "event-starter": 720,
  "event-full": 950,
  "flags-3-single": 627,
  "flags-3-double": 747,
};
for (const it of PACKS.items) {
  ok(`pack ${it.id} = $${packExpect[it.id]}`, it.price[0] === packExpect[it.id], `got ${it.price[0]}`);
}

// Listed gearEach still works
const pvcItem = BANNERS.items.find((i) => i.id === "pvc-4000x1000")!;
ok("new PVC 4000×1000 qty 1 each 185", gearEach(BANNERS, pvcItem, false, 1) === 185);
ok("new PVC 4000×1000 qty 10 each 120", gearEach(BANNERS, pvcItem, false, 10) === 120);
const mesh4 = BANNERS.items.find((i) => i.id === "mesh-2400x1600")!;
ok("mesh 2400×1600 qty 4 total 468", Math.round((gearEach(BANNERS, mesh4, false, 4) ?? 0) * 4) === 468);
ok("corflute listed 600x900 5mm ss 10 = 245", signsTotal("600x900", "5mm", "single", 10) === 245);
ok("ACM still starts at 185", ACM_SIGNS.items[0]!.price[0] === 185);

console.log("\nFrom-rates:", FROM_PER_M2);
console.log("kindForCorflute 3mm double", kindForCorflute("3mm", "double"));

if (fails.length) {
  console.error(`\n${fails.length} check(s) failed`);
  process.exit(1);
}
console.log(`\nAll ${ /* count later */ "monotonic and example"} checks passed`);
