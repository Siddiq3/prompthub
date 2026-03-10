/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "Segoe UI", "sans-serif"],
        heading: ["Fraunces", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        site: "#f7f4ee",
        brand: {
          primary: "#132238",
          secondary: "#2A7D72",
          accent: "#8E5A2B",
          ink: "#132238",
          gold: "#C99A5D",
          "gold-soft": "#E1BB84",
          soft: "#EEF3F6",
          border: "#DCE4E9"
        },
        "brand-ink": "#132238",
        "brand-accent": "#8E5A2B",
        "brand-gold": "#C99A5D",
        "brand-gold-soft": "#E1BB84",
        primary: "#4F46E5",
        "primary-light": "#6366F1",
        "primary-dark": "#312E81",
        secondary: "#10B981",
        "secondary-light": "#34D399",
        warm: "#b89a63",
        "warm-light": "#cbb383",
        cream: "#f7faff",
        ink: "#0B0E14"
      },
      boxShadow: {
        soft: "0 14px 30px -24px rgba(19, 34, 56, 0.28)",
        lift: "0 24px 48px -28px rgba(19, 34, 56, 0.36)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite"
      }
    }
  },
  plugins: []
};
