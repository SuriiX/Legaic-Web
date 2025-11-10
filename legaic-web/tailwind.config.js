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
        // <-- Añade esta sección de "colors"
        "brand-cloud": "#F0F8FF", // <-- Reemplaza esto con tu valor de color real
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};