import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Chemins relatifs : le build fonctionne aussi bien a la racine du domaine
  // qu'a l'interieur d'un sous-dossier sur l'hebergement OVH.
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
