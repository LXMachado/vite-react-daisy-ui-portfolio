/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#070b18",
        "canvas-soft": "#0b1120",
        surface: "#111b2b",
        "surface-elevated": "#16233f",
        "surface-border": "rgba(148, 163, 184, 0.25)",
        ink: "#f8fafc",
        "ink-muted": "#94a3b8",
        accent: "#38bdf8",
        highlight: "#f472b6",
        amberglow: "#fbbf24",
        line: "rgba(15, 23, 42, 0.3)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      fontFamily: {
        SUSE: ["SUSE", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 45px -15px rgba(56, 189, 248, 0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(148, 163, 184, 0.08)",
      },
      backgroundImage: {
        noise: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.08) 1px, transparent 0)",
        "frosted-gradient": "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(244,114,182,0.12))",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(56, 189, 248, 0.4)" },
          "70%": { boxShadow: "0 0 0 18px rgba(56, 189, 248, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(56, 189, 248, 0)" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.5s infinite",
        "gradient-pan": "gradient-pan 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
