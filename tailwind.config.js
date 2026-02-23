/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        brand: {
          primary: "#0B1F3A",
          secondary: "#123D6A",
          accent: "#38BDF8",
          soft: "#F1F5F9",
          border: "#E2E8F0"
        },
        primary: "#1f3b73",
        "primary-light": "#30589c",
        "primary-dark": "#172c55",
        secondary: "#4fa8c7",
        "secondary-light": "#77c0d8",
        warm: "#b89a63",
        "warm-light": "#cbb383",
        cream: "#f7faff",
        ink: "#1d2942"
      },
      boxShadow: {
        soft: "0 10px 30px -18px rgba(22, 44, 85, 0.28)",
        lift: "0 18px 40px -22px rgba(22, 44, 85, 0.35)"
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
