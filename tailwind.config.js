/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        brand: {
          primary: "#111827",
          secondary: "#4F46E5",
          accent: "#818CF8",
          soft: "#EEF2FF",
          border: "#E2E8F0"
        },
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
        soft: "0 10px 30px -18px rgba(49, 46, 129, 0.28)",
        lift: "0 18px 40px -22px rgba(49, 46, 129, 0.35)"
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
