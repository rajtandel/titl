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
          warm: "rgb(var(--titl-warm) / <alpha-value>)",
          "warm-hover": "rgb(var(--titl-warm-hover) / <alpha-value>)",
          leaf: "rgb(var(--titl-leaf) / <alpha-value>)",
          hero: "rgb(var(--titl-hero-from) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      fontSize: {
        "body-lg": ["1.0625rem", { lineHeight: "1.6" }],
        display: ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-sm": ["2.375rem", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        readable: "68ch",
        content: "980px",
      },
      boxShadow: {
        card: "var(--titl-shadow-card)",
        "card-hover": "var(--titl-shadow-card-hover)",
        nav: "var(--titl-shadow-nav)",
        glow: "var(--titl-shadow-glow)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "page-enter": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "page-enter": "page-enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-down": "slide-down 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 3s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
