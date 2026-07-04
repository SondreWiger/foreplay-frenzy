import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blood: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#dc2626",
          600: "#991b1b",
          700: "#7f1d1d",
          800: "#450a0a",
          900: "#1a0505",
          950: "#0d0202",
        },
        neon: {
          pink: "#ff2d95",
          red: "#ff0040",
          purple: "#bf00ff",
          blue: "#00d4ff",
        },
        leather: {
          50: "#f5f0eb",
          100: "#e6d9cc",
          200: "#c9a882",
          300: "#a67c52",
          400: "#7a5230",
          500: "#5a3a1e",
          600: "#3d2612",
          700: "#2a1a0c",
          800: "#1a1008",
          900: "#0d0804",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "card-flip": "card-flip 0.6s ease-in-out",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "shake": "shake 0.5s ease-in-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 38, 38, 0.6)" },
        },
        "card-flip": {
          "0%": { transform: "rotateY(0deg) scale(1)" },
          "50%": { transform: "rotateY(90deg) scale(0.95)" },
          "100%": { transform: "rotateY(0deg) scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
