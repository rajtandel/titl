/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        titl: {
          bg: "rgb(var(--titl-bg) / <alpha-value>)",
          surface: "rgb(var(--titl-surface) / <alpha-value>)",
          text: "rgb(var(--titl-text) / <alpha-value>)",
          muted: "rgb(var(--titl-muted) / <alpha-value>)",
          subtle: "rgb(var(--titl-subtle) / <alpha-value>)",
          border: "rgb(var(--titl-border) / <alpha-value>)",
          divider: "rgb(var(--titl-divider) / <alpha-value>)",
          accent: "rgb(var(--titl-accent) / <alpha-value>)",
          "accent-hover": "rgb(var(--titl-accent-hover) / <alpha-value>)",
          "on-accent": "rgb(var(--titl-on-accent) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "body-lg": ["1.0625rem", { lineHeight: "1.55" }],
        display: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        readable: "68ch",
        content: "980px",
      },
      boxShadow: {
        card: "var(--titl-shadow-card)",
        nav: "var(--titl-shadow-nav)",
      },
    },
  },
  plugins: [],
};
