/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
      },
    },
    extend: {
      colors: {
        brand: {
          night: "#051323",
          navy: "#0A223B",
          primary: "#123C64",
          slate: "#485B74",
          cloud: "#F2F5F9",
          mist: "#E6EDF4",
          accent: "#C8A156",
          accentDark: "#A8843F",
        },
      },
      boxShadow: {
        "brand-soft": "0 25px 60px -20px rgba(10, 34, 59, 0.35)",
        "brand-card": "0 18px 40px -18px rgba(7, 23, 38, 0.22)",
      },
      backgroundImage: {
        "brand-hero": "linear-gradient(135deg, rgba(5,19,35,0.95) 0%, rgba(18,60,100,0.92) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: 0, transform: "translateY(-32px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.98)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-down": "fade-down 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
