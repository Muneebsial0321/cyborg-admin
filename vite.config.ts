import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Vite React App',
        short_name: 'MyApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a', // Optional: Tailwind slate-900
        icons: [
          {
            src: '/icom.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})

