import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Chemins absolus : le site vit a la racine du domaine et sert deux pages
  // a des profondeurs differentes (/ et /en/). Des chemins relatifs feraient
  // chercher les assets dans /en/assets/ depuis la page anglaise.
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // Une page HTML par langue : c'est ce qui rend chaque version
      // indexable, avec ses propres balises lang, title et description.
      input: {
        fr: resolve(import.meta.dirname, 'index.html'),
        en: resolve(import.meta.dirname, 'en/index.html'),
      },
    },
  },
})
