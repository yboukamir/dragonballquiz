import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { QUESTIONS } from './src/data/questions.fr.js'

export default defineConfig({
  // Chemins absolus : le site vit a la racine du domaine et sert deux pages
  // a des profondeurs differentes (/ et /en/). Des chemins relatifs feraient
  // chercher les assets dans /en/assets/ depuis la page anglaise.
  base: '/',
  plugins: [react(), tailwindcss()],
  // Nombre de questions connu au build : l'accueil l'affiche dès le premier
  // rendu, sans attendre le téléchargement de la banque. Les deux banques en
  // comptent autant, npm run check y veille.
  define: {
    'import.meta.env.VITE_NOMBRE_QUESTIONS': JSON.stringify(QUESTIONS.length),
  },
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
