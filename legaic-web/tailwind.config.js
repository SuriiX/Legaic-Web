// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-cloud": "#F0F8FF", // <-- Reemplaza esto con tu valor real

        "brand-slate": "#708090", // <-- Añade esta línea y reemplaza el valor
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};