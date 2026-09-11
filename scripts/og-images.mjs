/**
 * Génère les images d'aperçu de partage (Open Graph), une par langue.
 *
 *   npm install --no-save puppeteer-core
 *   node scripts/og-images.mjs
 *
 * Même prérequis que `captures.mjs` : puppeteer-core, volontairement absent
 * des dépendances, et le Chrome déjà installé sur la machine.
 *
 * Les images sortent dans `public/og/`, que Vite copie tel quel : leur URL
 * reste donc fixe d'un build à l'autre (`/og/fr.png`). C'est indispensable,
 * les réseaux sociaux mettant l'aperçu en cache sur l'URL de l'image — un nom
 * haché changerait à chaque déploiement.
 *
 * Tout ce qui est chiffré (nombre de questions, de catégories, de niveaux) est
 * lu dans les données, et les libellés dans les dictionnaires : relancer le
 * script suffit à remettre l'image d'accord avec le site. Le visuel reste une
 * création originale — lettrage, formes et palette du site, aucun artwork.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { QUESTIONS } from '../src/data/questions.fr.js'
import { CATEGORIES } from '../src/data/categories.js'
import { DIFFICULTIES } from '../src/lib/quiz.js'
import fr from '../src/i18n/fr.js'
import en from '../src/i18n/en.js'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SORTIE = path.join(RACINE, 'public', 'og')

// Format recommandé par Facebook, LinkedIn et X : 1,91:1.
const LARGEUR = 1200
const HAUTEUR = 630

// Au-delà, WhatsApp renonce parfois à afficher l'aperçu.
const POIDS_MAX = 300 * 1024

const COULEURS = {
  orange: '#ff6b00',
  cobalt: '#1d4fd8',
  ki: '#ffc61a',
  crimson: '#e01b3c',
  sky: '#35a7ff',
  jade: '#2fbf71',
}

const LANGUES = [
  {
    code: 'fr',
    t: fr,
    chiffres: (q, c, n) =>
      `<b>${q}</b> questions originales · <b>${c}</b> catégories · <b>${n}</b> niveaux`,
  },
  {
    code: 'en',
    t: en,
    chiffres: (q, c, n) =>
      `<b>${q}</b> original questions · <b>${c}</b> categories · <b>${n}</b> levels`,
  },
]

/** Reprise de `KiOrb` : même géométrie, en SVG autonome. */
function orbe(teinte) {
  const rayons = Array.from({ length: 12 }, (_, i) => i * 30)
    .map(
      (a) =>
        `<path d="M100 12 L106 46 L100 40 L94 46 Z" fill="${teinte}" opacity="0.75" transform="rotate(${a} 100 100)"/>`,
    )
    .join('')
  return `<svg class="orbe" viewBox="0 0 200 200" aria-hidden="true">${rayons}
    <circle cx="100" cy="100" r="52" fill="${teinte}"/>
    <circle cx="100" cy="100" r="52" fill="none" stroke="#0f0e14" stroke-width="5"/>
    <circle cx="100" cy="100" r="34" fill="none" stroke="#0f0e14" stroke-width="3" opacity="0.45"/>
    <path d="M78 78 Q92 66 108 72" fill="none" stroke="#fff7e8" stroke-width="7" stroke-linecap="round" opacity="0.85"/>
  </svg>`
}

function gabarit({ code, t, chiffres }) {
  const puces = CATEGORIES.map(
    (c) => `<span class="puce" style="--a:${COULEURS[c.accent]}">${t.categories[c.id].label}</span>`,
  ).join('')

  return `<!doctype html>
<html lang="${code}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@600;700&family=Barlow+Condensed:wght@700&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: ${LARGEUR}px; height: ${HAUTEUR}px; overflow: hidden; }
  body {
    position: relative;
    background: #0f0e14;
    color: #fff7e8;
    font-family: Barlow, system-ui, sans-serif;
  }
  /* Lueur chaude derrière l'orbe, trame de points par-dessus : le fond du site. */
  .lueur {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 75% at 84% 26%, rgba(255, 107, 0, 0.30), transparent 70%);
  }
  .trame {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255, 247, 232, 0.06) 1.4px, transparent 1.6px);
    background-size: 22px 22px;
  }
  .orbe {
    position: absolute; right: -110px; top: -96px;
    width: 540px; height: 540px; opacity: 0.5;
  }
  .contenu { position: absolute; left: 72px; top: 58px; right: 72px; }
  .surtitre {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 25px; letter-spacing: 0.3em; text-transform: uppercase; color: #ffc61a;
  }
  /* Capitales, comme le titre du site. */
  h1 { font-family: Anton, sans-serif; font-weight: 400; line-height: 0.82; margin-top: 16px; text-transform: uppercase; }
  .ligne { display: block; font-size: 132px; }
  .bloc {
    display: inline-block; margin-top: 16px;
    transform: skewX(-6deg);
    border: 4px solid #08070c; background: #ff6b00; color: #0f0e14;
    padding: 8px 26px 4px; font-size: 132px;
    box-shadow: 10px 10px 0 0 #08070c;
  }
  .bloc span { display: inline-block; transform: skewX(6deg); }
  .chiffres { margin-top: 34px; font-size: 30px; font-weight: 600; color: #efe2ca; }
  .chiffres b { color: #ffc61a; font-weight: 700; }
  .puces { margin-top: 20px; display: flex; flex-wrap: wrap; gap: 12px; max-width: 820px; }
  .puce {
    position: relative;
    background: #1b1922; border: 3px solid #08070c;
    padding: 8px 16px 8px 26px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 23px; letter-spacing: 0.03em;
    box-shadow: 4px 4px 0 0 #08070c;
  }
  .puce::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 9px; background: var(--a); }
  .domaine {
    position: absolute; right: 72px; bottom: 50px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 27px; letter-spacing: 0.12em; color: #fff7e8;
  }
</style>
</head>
<body>
  <div class="lueur"></div>
  <div class="trame"></div>
  ${orbe('#ff6b00')}
  <div class="contenu">
    <p class="surtitre">${t.accueil.surtitre}</p>
    <h1>
      <span class="ligne">Dragon Ball</span>
      <span class="bloc"><span>Quiz</span></span>
    </h1>
    <p class="chiffres">${chiffres(QUESTIONS.length, CATEGORIES.length, DIFFICULTIES.length)}</p>
    <div class="puces">${puces}</div>
  </div>
  <p class="domaine">dragonballquiz.com</p>
</body>
</html>`
}

fs.mkdirSync(SORTIE, { recursive: true })

const navigateur = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

let echec = false
for (const langue of LANGUES) {
  const page = await navigateur.newPage()
  await page.setViewport({ width: LARGEUR, height: HAUTEUR, deviceScaleFactor: 1 })
  await page.setContent(gabarit(langue), { waitUntil: 'networkidle0' })

  // Sans police chargée, le lettrage retomberait sur une police système et
  // l'image partirait telle quelle sur tous les réseaux : on vérifie.
  const polices = await page.evaluate(async () => {
    await document.fonts.ready
    return ['Anton', 'Barlow', 'Barlow Condensed'].map((f) => [f, document.fonts.check(`32px "${f}"`)])
  })
  const manquantes = polices.filter(([, ok]) => !ok).map(([f]) => f)
  if (manquantes.length) {
    console.error(`✗ ${langue.code} : polices non chargées — ${manquantes.join(', ')}`)
    echec = true
  }

  // Rien ne doit déborder du cadre : un texte coupé serait visible partout.
  const debord = await page.evaluate(() =>
    [...document.querySelectorAll('.contenu *, .domaine')]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.right > window.innerWidth || r.bottom > window.innerHeight
      })
      .map((el) => el.className || el.tagName),
  )
  if (debord.length) {
    console.error(`✗ ${langue.code} : éléments hors cadre — ${debord.join(', ')}`)
    echec = true
  }

  const fichier = path.join(SORTIE, `${langue.code}.png`)
  await page.screenshot({ path: fichier, type: 'png' })
  const poids = fs.statSync(fichier).size
  const ok = poids <= POIDS_MAX
  if (!ok) echec = true
  console.log(
    `${ok ? '✓' : '✗'} ${path.relative(RACINE, fichier)} — ${LARGEUR}×${HAUTEUR}, ${Math.round(poids / 1024)} Ko`,
  )
  await page.close()
}

await navigateur.close()
process.exit(echec ? 1 : 0)
