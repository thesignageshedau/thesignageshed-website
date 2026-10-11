# The Signage Shed website

The website for The Signage Shed: spreadsheets, calculators and print-ready sign templates for sign shops, signwriters and small businesses.

Live preview: https://thesignageshedau.github.io/thesignageshed-website/

## Stack

Vite + React + TypeScript + Tailwind CSS (the same stack Lovable uses, so the repo can be imported into Lovable).

## Editing

| What | Where |
| --- | --- |
| Products, prices, buy links, promo codes | `src/data/products.ts` |
| Promo end date (badges hide automatically after it) | `src/lib/promo.ts` |
| Hero text | `src/components/Hero.tsx` |
| "Why our templates" | `src/components/WhyUs.tsx` |
| FAQ | `src/components/Faq.tsx` |
| Footer links, email | `src/data/products.ts` (`SHOP`) |
| Colours and fonts (brand guide 2026) | `tailwind.config.ts` |
| Page title, description, social preview | `index.html` and `.env` (`VITE_SITE_URL`) |
| Images, logo, favicon, social image | `public/` (regenerate with `npm run images` on the build box) |

Brand colours: Charcoal `#33373A`, Cream `#F2EBDD`, Rust `#C0582F`. Fonts: Ultra (headings) and Zilla Slab (body), self-hosted.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).

### Custom domain (e.g. thesignageshed.com.au)

1. Buy the domain (a .com.au needs an ABN; a .au or .com doesn't).
2. In the domain's DNS add four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` pointing to `thesignageshedau.github.io`.
3. In GitHub: Settings → Pages → Custom domain, enter the domain, then tick "Enforce HTTPS" once it's available.
4. In `.github/workflows/deploy.yml` change `BASE_PATH` to `/`, and in `.env` set `VITE_SITE_URL` to the new address (with a trailing `/`). Push.
