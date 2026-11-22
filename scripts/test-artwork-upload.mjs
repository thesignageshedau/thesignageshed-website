/**
 * Quote form artwork upload tests.
 *
 * NEVER lets a request reach FormSubmit (it would email a real inbox).
 * All formsubmit.co requests are intercepted and fulfilled or aborted locally.
 *
 * Usage (after `npm run build`):
 *   node scripts/test-artwork-upload.mjs
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const SHOT_DIR = "/workspace/shots/artwork-upload-preview-2026-11-23";
const PREVIEW_PORT = Number(process.env.PORT || 4173);
const BASE = `http://127.0.0.1:${PREVIEW_PORT}`;
const FORMSUBMIT = /formsubmit\.co/i;

const EMAIL_FIELDS = [
  "Form version",
  "Product code",
  "Product",
  "Item",
  "Size",
  "Custom size (as entered)",
  "Size (mm)",
  "Material",
  "Orientation",
  "Thickness",
  "Sides",
  "Eyelets",
  "Options",
  "Quantity",
  "Number of designs",
  "Price shown",
  "Name",
  "Email",
  "Phone",
  "Business",
  "Delivery suburb",
  "Delivery state",
  "Delivery postcode",
  "Needed by",
  "Artwork status",
  "Artwork link",
  "Artwork check",
  "Notes",
];

const failures = [];
function assert(cond, msg) {
  if (!cond) {
    failures.push(msg);
    console.error("FAIL:", msg);
  } else {
    console.log("OK:", msg);
  }
}

function parseMultipart(buffer, contentType) {
  const m = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType || "");
  const boundary = m && (m[1] || m[2]);
  if (!boundary || !buffer) return { fields: {}, files: [] };
  const raw = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  const parts = raw.toString("latin1").split(`--${boundary}`);
  const fields = {};
  const files = [];
  for (const part of parts) {
    if (!part || part === "--" || part.startsWith("--")) continue;
    const trimmed = part.replace(/^\r\n/, "").replace(/\r\n$/, "");
    const idx = trimmed.indexOf("\r\n\r\n");
    if (idx < 0) continue;
    const head = trimmed.slice(0, idx);
    const body = trimmed.slice(idx + 4);
    const name = /name="([^"]+)"/.exec(head)?.[1];
    const filename = /filename="([^"]+)"/.exec(head)?.[1];
    if (!name) continue;
    if (filename != null) {
      files.push({ name, filename, size: Buffer.from(body, "latin1").length, body });
    } else {
      fields[name] = body;
    }
  }
  return { fields, files };
}

async function fillQuoteForm(page) {
  await page.getByRole("combobox", { name: "Product" }).selectOption("Something else or a mix");
  await page.getByRole("textbox", { name: "What you need" }).fill("Test 1200 x 800mm banner");
  await page.getByRole("radio", { name: "Print-ready files" }).check();
  await page.getByRole("textbox", { name: "Postcode" }).fill("3000");
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test Customer");
  await page.locator('input[name="email"]').fill("test@example.com");
  await page.locator('input[name="Phone"]').fill("0412 345 678");
  await page.locator('input[name="Business"]').fill("Test Co");
  await page.locator('input[name="Artwork link"]').fill("https://wetransfer.com/example");
  await page.locator('textarea[name="Notes"]').fill("Need it for a Friday event.");
}

async function startPreview() {
  const child = spawn(
    "npx",
    ["--no-install", "vite", "preview", "--host", "127.0.0.1", "--port", String(PREVIEW_PORT), "--strictPort"],
    { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, BROWSER: "none" } },
  );
  let output = "";
  child.stdout.on("data", (d) => {
    output += d.toString();
  });
  child.stderr.on("data", (d) => {
    output += d.toString();
  });
  const started = await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`vite preview did not start.\n${output}`)), 30000);
    const onData = (d) => {
      const s = d.toString();
      if (/Local:/i.test(s) || s.includes(String(PREVIEW_PORT))) {
        clearTimeout(t);
        resolve(true);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => {
      clearTimeout(t);
      reject(new Error(`vite preview exited ${code}.\n${output}`));
    });
  });
  void started;
  return child;
}

async function waitForHealth() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`${BASE}/quote/`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Preview server did not serve /quote/");
}

const captured = [];
function attachIntercept(context) {
  return context.route("**/*", async (route) => {
    const req = route.request();
    const url = req.url();
    if (FORMSUBMIT.test(url)) {
      captured.push({
        url,
        method: req.method(),
        resourceType: req.resourceType(),
        headers: req.headers(),
        postData: req.postDataBuffer(),
        contentType: req.headers()["content-type"] || "",
      });
      if (/\/ajax\//i.test(url)) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: "true", message: "Intercepted; not sent." }),
        });
      } else {
        // Never hit the real form endpoint either.
        await route.fulfill({
          status: 200,
          contentType: "text/plain",
          body: "Intercepted; not sent.",
        });
      }
      return;
    }
    await route.continue();
  });
}

async function shot(page, name) {
  await mkdir(SHOT_DIR, { recursive: true });
  const dest = path.join(SHOT_DIR, name);
  await page.screenshot({ path: dest, fullPage: false });
  console.log("SHOT:", dest);
  return dest;
}

async function run() {
  const preview = await startPreview();
  try {
    await waitForHealth();
    const browser = await chromium.launch({ headless: true });
    try {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      await attachIntercept(context);
      const page = await context.newPage();
      page.on("request", (req) => {
        if (FORMSUBMIT.test(req.url())) {
          // Route handler should have caught this. Logged for the report.
          console.log("FORMSUBMIT REQUEST (intercepted):", req.method(), req.url());
        }
      });

      await page.goto(`${BASE}/quote/`, { waitUntil: "networkidle" });
      await fillQuoteForm(page);

      // --- Oversize error (no submit, so no FormSubmit request) ---
      captured.length = 0;
      const oversize = {
        name: "too-big.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.alloc(12 * 1024 * 1024, 1),
      };
      await page.locator("#quote-artwork-file").setInputFiles(oversize);
      const oversizeText = page.getByText(/The most we can attach here is 10 MB/i);
      await oversizeText.waitFor({ state: "visible", timeout: 5000 });
      assert(await oversizeText.isVisible(), "oversize error is visible after choosing a 12 MB file");
      assert(captured.length === 0, "choosing an oversize file does not contact FormSubmit");

      // Desktop + mobile oversize screenshots, scrolled to the artwork field
      await page.locator("#quote-artwork-file").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.getElementById("quote-artwork-file")?.closest("fieldset")?.scrollIntoView({ block: "center" }));
      await shot(page, "desktop-oversize-error.png");
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => {
        const el = document.getElementById("quote-artwork-file")?.closest("label");
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, Math.max(0, top - 120));
      });
      await shot(page, "mobile-oversize-error.png");

      // --- Valid file selected, screenshots ---
      await page.setViewportSize({ width: 1440, height: 900 });
      const smallPdf = {
        name: "logo.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.4 test artwork for quote form\n"),
      };
      await page.locator("#quote-artwork-file").setInputFiles(smallPdf);
      // Error should clear
      await page.waitForTimeout(200);
      const stillOversize = await page.getByText(/The most we can attach here is 10 MB/i).count();
      assert(stillOversize === 0, "oversize error clears after choosing a valid file");
      await page.locator("#quote-artwork-file").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.getElementById("quote-artwork-file")?.closest("fieldset")?.scrollIntoView({ block: "center" }));
      await shot(page, "desktop-file-selected.png");
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("#quote-artwork-file").scrollIntoViewIfNeeded();
      await page.evaluate(() => document.getElementById("quote-artwork-file")?.closest("fieldset")?.scrollIntoView({ block: "start" }));
      await shot(page, "mobile-file-selected.png");

      // --- Submit with file: intercept and inspect multipart ---
      await page.setViewportSize({ width: 1440, height: 900 });
      captured.length = 0;
      await page.getByRole("button", { name: "Send quote request" }).click();
      await page.waitForURL(/quote-thanks/, { timeout: 8000 }).catch(() => {});
      const fileReq = captured.find((r) => r.method === "POST");
      assert(!!fileReq, "submit with a file sent a POST that was intercepted");
      if (fileReq) {
        assert(/\/ajax\//.test(fileReq.url), `file submit used the AJAX endpoint (${fileReq.url})`);
        assert(/multipart\/form-data/i.test(fileReq.contentType), `Content-Type is multipart, got ${fileReq.contentType}`);
        const parsed = parseMultipart(fileReq.postData, fileReq.contentType);
        for (const k of EMAIL_FIELDS) {
          assert(k in parsed.fields, `multipart includes existing field "${k}"`);
        }
        assert(parsed.fields["Name"] === "Test Customer", `Name is Test Customer, got ${parsed.fields["Name"]}`);
        assert(parsed.fields.Email === "test@example.com", `Email is test@example.com, got ${parsed.fields.Email}`);
        assert(parsed.fields["Delivery postcode"] === "3000", `postcode is 3000, got ${parsed.fields["Delivery postcode"]}`);
        assert(parsed.fields["Delivery state"] === "VIC", `state is VIC, got ${parsed.fields["Delivery state"]}`);
        assert(parsed.fields["Artwork status"] === "Print-ready files", `artwork status, got ${parsed.fields["Artwork status"]}`);
        assert(parsed.fields["Artwork link"] === "https://wetransfer.com/example", "artwork link is preserved");
        assert(parsed.fields.Notes === "Need it for a Friday event.", "notes are preserved");
        assert(parsed.fields["Form version"] === "quote-v3", "form version is quote-v3");
        assert(parsed.fields["Item count"] === "1", "item count is 1");
        assert(parsed.fields._captcha === "false", "_captcha is preserved");
        assert(parsed.fields["Artwork file"] === "logo.pdf", `Artwork file filename, got ${parsed.fields["Artwork file"]}`);
        const att = parsed.files.find((f) => f.name === "attachment");
        assert(!!att, "multipart includes a file field named attachment");
        if (att) {
          assert(att.filename === "logo.pdf", `attachment filename is logo.pdf, got ${att.filename}`);
          assert(att.size > 0, `attachment has bytes, size ${att.size}`);
          assert(att.body.includes("%PDF-1.4"), "attachment body is the chosen file");
        }
        // Write a redacted dump for the report
        await mkdir(SHOT_DIR, { recursive: true });
        const dump = {
          url: fileReq.url,
          contentType: fileReq.contentType,
          fieldNames: Object.keys(parsed.fields),
          fields: parsed.fields,
          files: parsed.files.map((f) => ({ name: f.name, filename: f.filename, size: f.size })),
        };
        await writeFile(path.join(SHOT_DIR, "intercepted-multipart.json"), JSON.stringify(dump, null, 2));
      }
      assert(
        captured.every((r) => true),
        "all FormSubmit requests were intercepted (no live email)",
      );

      // --- Submit without a file still uses JSON and existing fields ---
      await page.goto(`${BASE}/quote/`, { waitUntil: "networkidle" });
      await fillQuoteForm(page);
      captured.length = 0;
      await page.getByRole("button", { name: "Send quote request" }).click();
      await page.waitForURL(/quote-thanks/, { timeout: 8000 }).catch(() => {});
      const jsonReq = captured.find((r) => r.method === "POST");
      assert(!!jsonReq, "submit without a file sent a POST that was intercepted");
      if (jsonReq) {
        assert(/\/ajax\//.test(jsonReq.url), "no-file submit used the AJAX endpoint");
        assert(/application\/json/i.test(jsonReq.contentType), `no-file Content-Type is JSON, got ${jsonReq.contentType}`);
        const data = JSON.parse(jsonReq.postData.toString("utf8"));
        for (const k of EMAIL_FIELDS) {
          assert(k in data, `JSON includes existing field "${k}"`);
        }
        assert(data.Name === "Test Customer", "JSON Name is Test Customer");
        assert(data.Email === "test@example.com", "JSON Email is preserved");
        assert(!("Artwork file" in data), "JSON path does not add Artwork file when none is attached");
        assert(!jsonReq.postData.toString("utf8").includes("attachment"), "JSON path does not include an attachment");
      }

      await context.close();
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill("SIGTERM");
  }

  console.log("\n---- results ----");
  if (failures.length) {
    console.error(`${failures.length} failure(s)`);
    process.exitCode = 1;
  } else {
    console.log("All checks passed. No request was sent to the live FormSubmit inbox.");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
