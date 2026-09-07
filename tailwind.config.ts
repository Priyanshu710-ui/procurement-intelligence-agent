import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        ink: "#1B1A17",
        ledger: "#1F2A44",
        ledgerLight: "#324268",
        gold: "#B9843C",
        goldLight: "#D9A968",
        sage: "#5C7A5F",
        rust: "#A6512F",
        line: "#DAD5C7",
      },
      fontFamily: {
        display: ["var(--font-serif)", "serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
