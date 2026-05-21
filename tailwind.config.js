/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
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
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['Clash Display', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      colors: {
        // Light-theme design tokens
        bg: {
          primary: "#f8fafc",
          secondary: "#ffffff",
          tertiary: "#e2e8f0"
        },
        accent: {
          primary: "#7C3AED",
          secondary: "#EC4899"
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          tertiary: "#9CA3AF"
        },
        // Model-specific colors
        model: {
          midjourney: {
            bg: "#ede9fe",
            text: "#7C3AED",
            border: "#7C3AED"
          },
          flux: {
            bg: "#dcfce7",
            text: "#10B981",
            border: "#10B981"
          },
          dalle: {
            bg: "#dbeafe",
            text: "#3B82F6",
            border: "#3B82F6"
          },
          "stable-diffusion": {
            bg: "#ffedd5",
            text: "#F97316",
            border: "#F97316"
          }
        },
        // Legacy support
        site: "#ffffff",
        canvas: "#f8fafc",
        surface: "#ffffff",
        border: "rgba(15,23,42,0.08)",
        ink: "#111827",
        primary: "#7C3AED",
        "primary-light": "#A78BFA",
        "primary-dark": "#6D28D9",
        secondary: "#EC4899",
        "secondary-light": "#F472B6",
        warm: "#FB923C",
        "warm-light": "#FDBA74",
        cream: "#F8FAFC",
        ui: {
          background: "#ffffff",
          backgroundAlt: "#f8fafc",
          surface: "#ffffff",
          surfaceMuted: "#e2e8f0",
          border: "rgba(15,23,42,0.08)",
          borderStrong: "rgba(15,23,42,0.16)",
          text: "#111827",
          muted: "#6B7280",
          subtle: "#9CA3AF",
          accent: "#7C3AED",
          "accent-hover": "#6D28D9",
          "accent-soft": "rgba(124,58,237,0.12)",
          success: "#10B981",
          "success-soft": "rgba(16,185,129,0.12)",
          warning: "#FB923C",
          "warning-soft": "rgba(251,146,60,0.12)",
          danger: "#EF4444",
          "danger-soft": "rgba(239,68,68,0.12)"
        },
        brand: {
          primary: "#7C3AED",
          secondary: "#EC4899",
          accent: "#7C3AED",
          ink: "#F0EBE3",
          gold: "#A78BFA",
          "gold-soft": "rgba(167,139,250,0.12)",
          soft: "#1C2240",
          border: "rgba(255,255,255,0.08)"
        },
        "brand-ink": "#F0EBE3",
        "brand-accent": "#7C3AED",
        "brand-gold": "#A78BFA",
        "brand-gold-soft": "rgba(167,139,250,0.12)"
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
        // Dark-mode shadows with purple/magenta tints
        soft: "0 4px 16px rgba(0, 0, 0, 0.3)",
        lift: "0 12px 32px rgba(0, 0, 0, 0.4)",
        panel: "0 20px 64px rgba(0, 0, 0, 0.5)",
        glow: "0 0 32px rgba(124, 58, 237, 0.25)",
        "glow-secondary": "0 0 32px rgba(236, 72, 153, 0.25)"
      },
      fontSize: {
        // Typography scale
        "hero-lg": ["96px", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-md": ["72px", { lineHeight: "1.1", fontWeight: "700" }],
        "section-lg": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "section-md": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-title": ["16px", { lineHeight: "1.4", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-xs": ["12px", { lineHeight: "1.4", fontWeight: "400" }]
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
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.8)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        glow: "glow 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
