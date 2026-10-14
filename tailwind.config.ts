import type { Config } from "tailwindcss";

// Brand colours from The Signage Shed Brand Guide 2026 ("Sign Writer Heritage")
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: { DEFAULT: "#33373A", deep: "#25292B", ink: "#3B3F40" },
        cream: { DEFAULT: "#F2EBDD", light: "#FAF6EE" },
        // rust = brand accent (decoration); rust-dark = accessible text/buttons on light; rust-light = text on charcoal
        rust: { DEFAULT: "#C0582F", dark: "#A2461F", deeper: "#873A19", light: "#E8946C" },
        // sage = brand sage (decoration only, 2.9:1 on cream); sage-dark = text and borders (5.5:1 on cream); sage-light = section tint
        sage: { DEFAULT: "#828E77", dark: "#56614D", light: "#E3E6DC" },
        steel: "#7F8181",
        chain: "#A7AAAC",
      },
      fontFamily: {
        display: ['"Ultra"', "Georgia", "serif"],
        slab: ['"Zilla Slab"', "Georgia", "serif"],
      },
      maxWidth: { site: "72rem" },
    },
  },
  plugins: [],
} satisfies Config;
