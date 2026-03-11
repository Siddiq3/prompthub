/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        heading: ["Manrope", "Inter", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        site: "#F8FAFC",
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        ink: "#111827",
        primary: "#4F46E5",
        "primary-light": "#6366F1",
        "primary-dark": "#4338CA",
        secondary: "#10B981",
        "secondary-light": "#34D399",
        warm: "#F59E0B",
        "warm-light": "#FCD34D",
        cream: "#F8FAFC",
        ui: {
          background: "#F8FAFC",
          backgroundAlt: "#F1F5F9",
          surface: "#FFFFFF",
          surfaceMuted: "#F8FAFC",
          border: "#E5E7EB",
          borderStrong: "#D1D5DB",
          text: "#111827",
          muted: "#4B5563",
          subtle: "#6B7280",
          accent: "#6366F1",
          "accent-hover": "#4F46E5",
          "accent-soft": "#EEF2FF",
          success: "#10B981",
          "success-soft": "#ECFDF5",
          warning: "#F59E0B",
          "warning-soft": "#FFFBEB",
          danger: "#DC2626",
          "danger-soft": "#FEF2F2"
        },
        brand: {
          primary: "#6366F1",
          secondary: "#10B981",
          accent: "#6366F1",
          ink: "#111827",
          gold: "#818CF8",
          "gold-soft": "#C7D2FE",
          soft: "#F1F5F9",
          border: "#E5E7EB"
        },
        "brand-ink": "#111827",
        "brand-accent": "#6366F1",
        "brand-gold": "#818CF8",
        "brand-gold-soft": "#C7D2FE"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        section: "5rem",
        "section-mobile": "3rem"
      },
      maxWidth: {
        content: "80rem"
      },
      borderRadius: {
        card: "1.5rem",
        shell: "2rem",
        pill: "9999px"
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.03), 0 12px 32px -20px rgba(15, 23, 42, 0.12)",
        lift: "0 1px 2px rgba(15, 23, 42, 0.04), 0 20px 40px -20px rgba(15, 23, 42, 0.16)",
        panel: "0 18px 40px -28px rgba(15, 23, 42, 0.18)"
      },
      transitionDuration: {
        150: "150ms",
        180: "180ms",
        220: "220ms"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.94)", opacity: "1" },
          "100%": { transform: "scale(1.12)", opacity: "0" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite"
      }
    }
  },
  plugins: []
};
