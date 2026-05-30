import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FDF0E8",
          100: "#FAD5BC",
          200: "#F5B48A",
          300: "#EE8F55",
          400: "#E57035",
          500: "#D4622A",
          600: "#B8501F",
          700: "#963D16",
          800: "#742D0E",
          900: "#521F08",
        },
        forest: {
          50: "#E8F5F1",
          100: "#C0E4D8",
          200: "#8FCEBB",
          300: "#55B397",
          400: "#259E7A",
          500: "#0F6E56",
          600: "#0A5A44",
          700: "#074534",
          800: "#043124",
          900: "#021F17",
        },
        ivory: "#FDF6ED",
        charcoal: "#1A1A1A",
        warmgray: "#6B6560",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mandala-pattern":
          "radial-gradient(circle at 20% 50%, rgba(212,98,42,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(15,110,86,0.04) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,98,42,0.2)" },
          "50%": { boxShadow: "0 0 0 8px rgba(212,98,42,0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
