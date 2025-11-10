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
        // Aquí definimos toda tu paleta de colores "brand"
        brand: {
          cloud: "#F0F8FF", // <-- ¡Reemplaza por tu valor real!
          slate: "#708090", // <-- ¡Reemplaza por tu valor real!
          accent: "#FFD700", // <-- ¡Reemplaza por tu valor real!
          navy: "#000080", // <-- ¡Reemplaza por tu valor real!
          primary: "#007BFF", // <-- ¡Reemplaza por tu valor real!
        },
      },

    },
  },
  plugins: [require("@tailwindcss/typography")],
};