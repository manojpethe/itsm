import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss()
  ],
  test: {
    globals: true, // Enables Jest-like global APIs like `describe` and `test` without importing them
    environment: 'jsdom', // Use 'jsdom' or 'happy-dom' if testing UI components
  },
})