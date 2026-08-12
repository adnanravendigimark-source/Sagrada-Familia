import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gaudi-inspired palette: warm stone, mosaic gold, stained-glass teal/terracotta
        stone: {
          50: "#faf8f4",
          900: "#241f1a",
        },
        gold: {
          400: "rgb(var(--color-gold-400) / <alpha-value>)",
          500: "#c1892c",
          600: "#a3701f",
        },
        // basilica.* and gold.400 are backed by CSS variables (defaults in
        // globals.css :root) instead of fixed hex, so the admin-editable
        // "Brand Colors" panel (/admin/homepage → Advanced SEO tab) can
        // override them site-wide at runtime — see app/layout.tsx, which
        // injects the admin's chosen values as an inline <style> tag. The
        // `rgb(var(...) / <alpha-value>)` form is Tailwind's documented
        // pattern for CSS-variable colors that still support opacity
        // modifiers like `bg-basilica-terracotta/40`, used throughout.
        basilica: {
          teal: "rgb(var(--color-basilica-teal) / <alpha-value>)",
          terracotta: "rgb(var(--color-basilica-terracotta) / <alpha-value>)",
          plum: "rgb(var(--color-basilica-plum) / <alpha-value>)",
        },
        // Dark navy used for the wordmark in the premium logo lockup.
        navy: {
          900: "#1c2438",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "ui-serif", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 20% 20%, rgba(217,164,65,0.25) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(15,92,92,0.25) 0, transparent 40%), radial-gradient(circle at 50% 80%, rgba(196,85,47,0.2) 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
