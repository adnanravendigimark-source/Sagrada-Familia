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
          400: "#d9a441",
          500: "#c1892c",
          600: "#a3701f",
        },
        basilica: {
          teal: "#0f5c5c",
          terracotta: "#c4552f",
          plum: "#4a2545",
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
