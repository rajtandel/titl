/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        titl: {
          forest: "#1a3d2e",
          moss: "#2d5a45",
          sage: "#6b8f71",
          cream: "#f6f3ec",
          sand: "#e8dfd0",
          bark: "#4a3728",
          leaf: "#8faa6b",
        },
      },
      fontFamily: {
        sans: ["Lexend", "system-ui", "sans-serif"],
        serif: ["'Source Serif 4'", "Georgia", "serif"],
      },
      fontSize: {
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "display": ["2.25rem", { lineHeight: "1.2" }],
      },
      maxWidth: {
        readable: "70ch",
      },
    },
  },
  plugins: [],
};
