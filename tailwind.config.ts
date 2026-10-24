import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFF0",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#0A0A0A",
          foreground: "#FFFFF0",
        },
        price: "#262626",
        discount: "#D90429",
        amberBtn: {
          DEFAULT: "#F59E0B",
          foreground: "#0A0A0A",
          hover: "#D97706",
        },
        gold: {
          DEFAULT: "#C5A24D",
          light: "#E5C875",
          dark: "#9E7F30",
          subtle: "#F9F5EC",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "Cambria", "serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(197, 162, 77, 0.15)",
        card: "0 4px 20px -2px rgba(10, 10, 10, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
