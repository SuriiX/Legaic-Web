// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Asegúrate de que apunte a tu carpeta 'src'
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {}, // Está bien si 'extend' está vacío
  },
  plugins: [
    // Asegúrate de que el plugin de tipografía esté aquí
    require("@tailwindcss/typography"),
  ],
};