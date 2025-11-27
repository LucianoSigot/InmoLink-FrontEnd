/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Esta línea es crucial para React/Vite
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}