/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/main.js"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F6",
        ink: "#16150F",
        cypress: "#2E3B33",
      },
      fontFamily: {
        canela: ["Canela", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        wordmark: "-0.06em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
