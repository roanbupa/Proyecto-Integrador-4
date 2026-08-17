import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Configuración de Vite y Vitest.
export default defineConfig({
  plugins: [react()],

  test: {
    // Simula el entorno del navegador para los tests de React.
    environment: 'jsdom',

    // Archivo que se ejecutará antes de cada test.
    setupFiles: './tests/setup.ts',

    // Permite utilizar describe, it, expect, vi, etc. sin importarlos.
    globals: true,
  },
})