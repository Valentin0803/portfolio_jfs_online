import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0907",
        or: "#C9A24B",
        creme: "#F3EDE1",
      },
      fontFamily: {
        unbounded: ["var(--font-unbounded)"],
        dmSans: ["var(--font-dmSans)"],
      },
      keyframes: {
        halo: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        halo: "halo 1.8s ease-out infinite",
        scroll: "scroll 50s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
