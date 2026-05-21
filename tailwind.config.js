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
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["Clash Display", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Clash Display", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      colors: {
        // Dark-mode-first design tokens
        bg: {
          primary: "#0B0E1A",
          secondary: "#131729",
          tertiary: "#1C2240"
        },
        accent: {
          primary: "#7C3AED",
          secondary: "#EC4899"
        },
        text: {
          primary: "#F0EBE3",
          secondary: "#9CA3B8",
          tertiary: "#5B6380"
        },
        // Model-specific colors
        model: {
          midjourney: {
            bg: "#2D1B69",
            text: "#A78BFA",
            border: "#7C3AED"
          },
          flux: {
            bg: "#0D3D2E",
            text: "#34D399",
            border: "#10B981"
          },
          dalle: {
            bg: "#1E3A5F",
            text: "#60A5FA",
            border: "#3B82F6"
          },
          "stable-diffusion": {
            bg: "#3D1F00",
            text: "#FB923C",
            border: "#F97316"
          }
        },
        // Legacy support
        site: "#0B0E1A",
        canvas: "#0B0E1A",
        surface: "#131729",
        border: "rgba(255,255,255,0.08)",
        ink: "#F0EBE3",
        primary: "#7C3AED",
        "primary-light": "#A78BFA",
        "primary-dark": "#6D28D9",
        secondary: "#EC4899",
        "secondary-light": "#F472B6",
        warm: "#FB923C",
        "warm-light": "#FDBA74",
        cream: "#F0EBE3",
        ui: {
          background: "#0B0E1A",
          backgroundAlt: "#131729",
          surface: "#131729",
          surfaceMuted: "#1C2240",
          border: "rgba(255,255,255,0.08)",
          borderStrong: "rgba(255,255,255,0.16)",
          text: "#F0EBE3",
          muted: "#9CA3B8",
          subtle: "#5B6380",
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
