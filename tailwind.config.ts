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
        jaune: "#FFEE53",
        gris: "#0D0D0D",
      },
      fontFamily: {
        akira: ["var(--font-akira)"],
        leagueSpartan: ["var(--font-leagueSpartan)"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 50s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
