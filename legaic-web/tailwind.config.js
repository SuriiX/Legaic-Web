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
        brand: {
          cloud: "#F0F8FF",   // <-- Reemplaza por tu valor real
          slate: "#708090",   // <-- Reemplaza por tu valor real
          accent: "#FFD700",  // <-- Reemplaza por tu valor real
          navy: "#000080",    // <-- Reemplaza por tu valor real
          primary: "#007BFF", // <-- Reemplaza por tu valor real
        },
      },
      // --- AÑADE ESTA NUEVA SECCIÓN ---
      boxShadow: {
        'brand-card': '0 4px 12px 0 rgba(0, 0, 0, 0.05)', // <-- ¡Reemplaza por tu valor real!
        'brand-soft': '0 8px 24px 0 rgba(0, 0, 0, 0.08)', // <-- ¡Reemplaza por tu valor real!
      }
      // --- FIN DE LA NUEVA SECCIÓN ---
    },
  },
  plugins: [require("@tailwindcss/typography")],
};