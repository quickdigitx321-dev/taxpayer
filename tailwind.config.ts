import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef7f1",
          100: "#d7eadc",
          200: "#b1d6bd",
          300: "#84b996",
          400: "#57976f",
          500: "#367a53",
          600: "#285f40",
          700: "#214c35",
          800: "#1d3d2d",
          900: "#183326",
          950: "#0b1f17"
        },
        charcoal: {
          50: "#f6f5f3",
          100: "#e8e4df",
          200: "#d2c9bf",
          300: "#b7a99b",
          400: "#9d8877",
          500: "#816c5d",
          600: "#665348",
          700: "#4c4039",
          800: "#342d29",
          900: "#211d1b",
          950: "#151210"
        },
        gold: {
          50: "#fbf7ea",
          100: "#f3e8c6",
          200: "#e6cf8d",
          300: "#d6b052",
          400: "#c79a32",
          500: "#aa7c22",
          600: "#865f1c",
          700: "#644819",
          800: "#443115",
          900: "#2d210f"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21, 18, 16, 0.08)",
        premium: "0 24px 80px rgba(11, 31, 23, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
