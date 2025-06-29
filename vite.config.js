import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser'  // Asegura que usa terser
  },
  esbuild: {
    target: 'esnext'  // Configuración adicional recomendada
  }
})