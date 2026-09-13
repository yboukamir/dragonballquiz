import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LanguageProvider from './i18n/LanguageProvider'
// Polices servies par le site lui-même, et non par Google Fonts : la feuille
// de Google bloquait le premier affichage le temps de joindre deux serveurs
// tiers, et transmettait l'adresse IP de chaque visiteur à Google sans son
// accord. Mêmes graisses que celles que Google servait — sans l’italique, que
// rien n'utilise. Chaque feuille découpe la police par alphabet (unicode-range) :
// le navigateur ne télécharge que les caractères dont la page a besoin.
import '@fontsource/anton/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
