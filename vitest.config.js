import { defineConfig } from 'vitest/config'

// Configuration distincte de vite.config.js : les tests ne visent que la
// logique pure de src/lib, sans JSX ni CSS. Charger React et Tailwind pour
// eux ralentirait chaque exécution sans rien apporter.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
