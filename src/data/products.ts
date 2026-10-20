// Product data for the site. Prices are in AUD as listed on Gumroad.
// Only add a link here once you've opened it and confirmed it works.

export const SHOP = {
  gumroad: "https://thesignageshedau.gumroad.com",
  etsy: "https://www.etsy.com/shop/TheSignageShedAU",
  email: "infothesignageshed@gmail.com",
  youtube: "https://www.youtube.com/@ShedTalkAU",
  instagram: "https://www.instagram.com/thesignageshedau/",
};

// ---- Site settings -------------------------------------------------------------------
// Public site address, used for canonical links and social previews.
export const SITE_URL = "https://thesignageshed.au/";

// Free sample: the Gumroad link for "Sign Shop Quick Pricing Sheet (Free)" (a $0 product, so
// Gumroad collects the email address). Leave empty to hide the free sheet section.
export const FREE_SAMPLE_URL: string = "https://thesignageshedau.gumroad.com/l/quick-pricing-sheet";


// Legal pages, linked from the footer.
export const LEGAL_PAGES = [
  { slug: "refund-policy", label: "Refund Policy" },
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms of Use" },
] as const;
export type LegalSlug = (typeof LEGAL_PAGES)[number]["slug"];

// Show or hide the Etsy sign template and vinyl window graphics packs.
// false hides the "More in our Etsy shop" section (etsyItems below) and the
// "print-ready sign templates" wording in the hero and SEO tags. Set to true to bring them back.
export const SHOW_ETSY_PACKS = false;

// Short silent demo clips of the real spreadsheets (public/videos). false = cards show the
// listing images again.
export const SHOW_DEMOS = true;
export const FREE_DEMO = {
  name: "free-quick-pricing-demo",
  label: "Demo: a corflute and banner job typed into the free Quick Pricing Sheet, with the sell price, GST, profit and margin updating",
};

// Copy that changes with SHOW_ETSY_PACKS (hero text, page title and descriptions).
export const SITE_COPY = SHOW_ETSY_PACKS
  ? {
      title: "The Signage Shed | Pricing spreadsheets and sign templates for sign shops",
      description:
        "Spreadsheets, calculators and print-ready sign templates for Australian sign shops, signwriters and small businesses. AU GST built in, works in Excel and Google Sheets, instant download.",
      ogDescription:
        "Pricing, job costing and quoting spreadsheets plus print-ready sign templates for Australian sign shops and small businesses.",
      heroProducts: "pricing calculators, job costing sheets and print-ready sign templates",
    }
  : {
      title: "Signage & Printing Australia: Signs, Banners & Flags",
      description:
        "Signage and printing, shipped Australia-wide: corflute signs, A-frames, feather and teardrop flags, pull up banners, media walls and gazebos. Prices online.",
      ogDescription:
        "Custom printed signs, banners and event gear with prices online, delivered Australia-wide.",
      heroProducts: "pricing calculators and job costing sheets",
    };

export type Promo = { code: string; label: string; url: string };

export type Product = {
  id: string;
  name: string;
  price: string;
  summary: string;
  points: string[];
  image: string; // base name in public/images, e.g. "pricing-kit" -> pricing-kit-800.webp / -1600.webp
  imageAlt: string;
  demo?: { name: string; label: string }; // clip in public/videos, shown when SHOW_DEMOS is on
  gumroad?: string;
  etsy?: string;
  promo?: Promo;
};

export const featured: Product[] = [
  {
    id: "pricing-kit",
    name: "Sign Shop Pricing Kit",
    price: "A$49",
    summary:
      "A working quote calculator plus a plain-English pricing guide. Price every sign job from your real costs, not guesswork.",
    points: [
      "Quote calculator: area, waste, ink, laminate, router time, finishing, design and install",
      "Sell price ex and inc GST, per sign and per m², with a margin guard",
      "8-page pricing guide on shop rates, minimums and discounting",
    ],
    image: "pricing-kit",
    imageAlt: "Sign Shop Pricing Kit quote calculator preview",
    demo: {
      name: "pricing-kit-demo",
      label: "Demo: 20 double-sided corflute signs typed into the Pricing Kit quote calculator, with the sell price and margin updating",
    },
    gumroad: "https://thesignageshedau.gumroad.com/l/wzpldn",
    etsy: "https://www.etsy.com/shop/TheSignageShedAU",
    promo: {
      code: "LAUNCH20",
      label: "20% off with LAUNCH20 until 31 Oct",
      url: "https://thesignageshedau.gumroad.com/l/wzpldn/LAUNCH20",
    },
  },
  {
    id: "job-costing",
    name: "Sign Shop Job Costing & Profit Calculator",
    price: "A$39",
    summary:
      "Find out which jobs actually make money. True cost, margin, markup and dollars per labour hour, estimate vs actual.",
    points: [
      "Materials, ink, machine time, labour, outwork, freight and overhead",
      "One-page job sheet with profit at quote vs actual",
      "Dashboard by month, job type and customer, plus best and worst jobs",
    ],
    image: "job-costing",
    imageAlt: "Job Costing & Profit Calculator dashboard preview",
    demo: {
      name: "job-costing-demo",
      label: "Demo: actual material and labour logged against a shopfront sign job, with profit and margin at quote vs actual updating",
    },
    gumroad: "https://thesignageshedau.gumroad.com/l/nfdckl",
    etsy: "https://www.etsy.com/au/listing/4592210179",
  },
  {
    id: "vehicle-wrap",
    name: "Vehicle Wrap Quote Calculator",
    price: "A$39",
    summary:
      "Quote any vehicle wrap in minutes: vinyl m², linear metres off the roll, laminate, labour, margin and GST.",
    points: [
      "38 common Australian vehicles built in, with room to add your own",
      "Full, half, quarter or custom panel coverage",
      "Printable customer quote with your profit shown before you send",
    ],
    image: "vehicle-wrap",
    imageAlt: "Vehicle Wrap Quote Calculator preview",
    demo: {
      name: "vehicle-wrap-demo",
      label: "Demo: a Ford Ranger picked in the Vehicle Wrap Quote Calculator, going from quarter to half to full wrap with the price and margin updating",
    },
    gumroad: "https://thesignageshedau.gumroad.com/l/mdzqkf",
    etsy: "https://www.etsy.com/au/listing/4592479814",
    promo: {
      code: "WRAPLAUNCH35",
      label: "35% off with WRAPLAUNCH35 until 31 Oct",
      url: "https://thesignageshedau.gumroad.com/l/mdzqkf/WRAPLAUNCH35",
    },
  },
];

// More items in the Etsy shop. These link to the shop page (not individual listings)
// because the individual listing URLs couldn't be checked automatically.
export type EtsyItem = { id: string; name: string; blurb: string; image: string; imageAlt: string };

export const etsyItems: EtsyItem[] = [
  {
    id: "template-kit",
    name: "Print-Ready Sign Template Kit",
    blurb: "Corflute, A-frame, pull-up banner and more, set up with bleed and cut lines.",
    image: "template-kit",
    imageAlt: "Print-Ready Sign Template Kit cover",
  },
  {
    id: "bundle",
    name: "Sign Shop Bundle",
    blurb: "The Pricing Kit and the Template Kit together.",
    image: "bundle",
    imageAlt: "Sign Shop Bundle cover",
  },
  {
    id: "christmas-window-pack",
    name: "Christmas Shopfront Window Pack",
    blurb: "Christmas and summer sale window graphics: cut vinyl, print and cut, and mirrored.",
    image: "christmas-window-pack",
    imageAlt: "Christmas window graphics shown on a shopfront",
  },
  {
    id: "black-friday-window-pack",
    name: "Black Friday Window Pack",
    blurb: "Black Friday and Cyber Monday window sets, A-frames and posters.",
    image: "black-friday-window-pack",
    imageAlt: "Black Friday window graphics shown on a shopfront",
  },
];
