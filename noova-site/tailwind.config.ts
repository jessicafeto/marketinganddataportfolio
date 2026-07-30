import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Locked noova palette
        paper: "#F6F4EF",
        ink: "#16150F",
        cypress: "#2E3B33",
        // Stone greys (supporting)
        stone: {
          100: "#EDEBE4",
          200: "#DEDBD2",
          300: "#C6C2B6",
          400: "#A7A59E",
          500: "#8A887F",
          600: "#6B6960",
        },
      },
      fontFamily: {
        sans: ["var(--font-switzer)", "system-ui", "sans-serif"],
        serif: ["var(--font-zodiak)", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.24em",
        wide2: "0.14em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        "8xl": "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
