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
          50: "#eef5fb",
          100: "#d9e9f7",
          200: "#b9d6ed",
          300: "#8bbadd",
          400: "#5698ca",
          500: "#347bb3",
          600: "#225f94",
          700: "#174d7c",
          800: "#0d406a",
          900: "#07365a",
          950: "#002642"
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
        premium: "0 24px 80px rgba(0, 60, 119, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
