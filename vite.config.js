import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Production build optimizations
  build: {
    outDir: 'dist',
    sourcemap: false,         // Disable in production for smaller bundle
    rollupOptions: {
      output: {
        // Split large vendors into separate chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion', 'gsap', '@gsap/react'],
        },
      },
    },
  },

  // Dev server proxy — avoids CORS in development
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
