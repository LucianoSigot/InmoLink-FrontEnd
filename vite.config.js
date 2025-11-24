import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Tu plugin de React
import tailwindcss from '@tailwindcss/vite' // <-- Importa el plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Añade el plugin aquí
  ],
})