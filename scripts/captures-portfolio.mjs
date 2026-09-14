/**
 * Régénère les captures de l'étude de cas sur boukamir.be
 * (`dragonballquiz.html` dans le dépôt yboukamir/portfolio).
 *
 *   npm install --no-save puppeteer-core
 *   node scripts/captures-portfolio.mjs [cible] [dossier]
 *
 * cible   : tout (par défaut), accueil, partie, resultat ou apercu.
 * dossier : le dossier `assets` du portfolio (par défaut, le clone local).
 *
 * Mêmes cadrages que les images publiées :
 * - accueil, partie, resultat : 1240 × 775, en deux densités, dans
 *   `assets/projets/` — `dragonballquiz-<nom>@2x.jpg` (1240 px) et
 *   `dragonballquiz-<nom>.jpg` (620 px) ;
 * - apercu : l'accueil en 1200 × 630, capturé en double densité puis réduit,
 *   dans `assets/apercu-dragonballquiz-<N>.jpg`. N est le numéro suivant le
 *   plus grand trouvé dans le dossier : LinkedIn garde un aperçu par URL
 *   exacte, un nouvel aperçu doit donc changer de nom. Penser à reporter ce
 *   nom dans la balise og:image de `dragonballquiz.html`.
 *
 * Le script vise le site en ligne : déployer d'abord ce qu'on veut montrer.
 *
 * Trois pièges rencontrés en l'écrivant, et leur parade :
 * - le site défile en douceur (`scroll-behavior: smooth`) : chaque mesure de
 *   position tomberait au milieu de l'animation, d'où le défilement forcé
 *   en instantané ;
 * - avec le zoom CSS, les positions mesurées et le défilement ne sont pas
 *   dans la même unité : le cadrage converge par petits pas ;
 * - chercher le bouton « A » par son texte trouve « Abandonner » : la
 *   réponse est prise dans le groupe de propositions.
 */
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SITE = 'https://dragonballquiz.com/'
const cible = process.argv[2] ?? 'tout'
const ASSETS = process.argv[3] ?? 'C:\\Users\\ybouk\\Desktop\\Mon site\\assets'
const PROJETS = path.join(ASSETS, 'projets')

const CIBLES = ['tout', 'accueil', 'partie', 'resultat', 'apercu']
if (!CIBLES.includes(cible)) {
  console.error(`Cible inconnue : ${cible}. Choisir parmi ${CIBLES.join(', ')}.`)
  process.exit(1)
}
const faire = (nom) => cible === 'tout' || cible === nom

// Même score que la capture du README : 8/10 met en valeur les rangs sans
// afficher un sans-faute peu crédible.
const BONNES_VISEES = 8

const attendre = (ms) => new Promise((r) => setTimeout(r, ms))
fs.mkdirSync(PROJETS, { recursive: true })

const navigateur = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

async function nouvellePage(width, height, deviceScaleFactor) {
  const page = await navigateur.newPage()
  await page.setViewport({ width, height, deviceScaleFactor })
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.clear()
      // Une langue enregistrée : sans elle, un navigateur non francophone
      // afficherait le bandeau « This quiz is also available in English ».
      localStorage.setItem('dbq.lang.v1', 'fr')
    } catch {
      /* rien */
    }
  })
  await page.goto(SITE, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  await attendre(1000)
  return page
}

const clic = (page, texte, selecteur = 'button') =>
  page.evaluate(
    (t, s) => {
      const el = [...document.querySelectorAll(s)].find((b) => b.textContent.includes(t))
      if (!el) throw new Error('introuvable : ' + t)
      el.click()
    },
    texte,
    selecteur,
  )

/** Zoom, défilement instantané, focus retiré ; `selecteur` posé à 14 px du haut, sinon haut de page. */
async function cadrer(page, zoom, selecteur = null) {
  await page.evaluate((z) => {
    document.activeElement?.blur()
    document.documentElement.style.scrollBehavior = 'auto'
    document.documentElement.style.zoom = String(z)
    window.scrollTo(0, 0)
  }, zoom)
  await attendre(300)
  if (selecteur) {
    const haut = await page.evaluate(
      (s, z) => {
        const el = document.querySelector(s)
        if (!el) throw new Error('élément de cadrage introuvable : ' + s)
        for (let i = 0; i < 40; i++) {
          const ecart = el.getBoundingClientRect().top - 14
          if (Math.abs(ecart) < 1) break
          window.scrollBy(0, ecart * z)
        }
        return Math.round(el.getBoundingClientRect().top)
      },
      selecteur,
      zoom,
    )
    if (Math.abs(haut - 14) > 3) throw new Error(`cadrage manqué : ${haut} px au lieu de 14`)
  }
  await attendre(300)
}

/** Les deux densités d'une capture 1240 × 775, sur la page déjà préparée. */
async function deuxDensites(page, nom, zoom, selecteur = null) {
  await page.setViewport({ width: 1240, height: 775, deviceScaleFactor: 1 })
  await cadrer(page, zoom, selecteur)
  await page.screenshot({ path: path.join(PROJETS, `dragonballquiz-${nom}@2x.jpg`), type: 'jpeg', quality: 86 })
  await page.setViewport({ width: 1240, height: 775, deviceScaleFactor: 0.5 })
  await cadrer(page, zoom, selecteur)
  await page.screenshot({ path: path.join(PROJETS, `dragonballquiz-${nom}.jpg`), type: 'jpeg', quality: 86 })
  console.log(`${nom} capturé`)
}

/** Recharge la banque de questions depuis le site : la bonne réponse est toujours `a[0]`. */
async function chargerReponses(page) {
  const taille = await page.evaluate(async () => {
    const url = performance
      .getEntriesByType('resource')
      .map((r) => r.name)
      .find((n) => /questions\.fr-.*\.js$/.test(n))
    if (!url) return 0
    const mod = await import(url)
    window.__reponses = new Map(mod.QUESTIONS.map((q) => [q.q, q.a[0]]))
    return window.__reponses.size
  })
  if (!taille) throw new Error('banque de questions introuvable')
}

/* ------------------------------------------------------------ accueil */
if (faire('accueil')) {
  const page = await nouvellePage(1240, 775, 1)
  await deuxDensites(page, 'accueil', 1)
  await page.close()
}

/* ------------------------------------------------------------- aperçu */
if (faire('apercu')) {
  const numeros = fs
    .readdirSync(ASSETS)
    .map((f) => f.match(/^apercu-dragonballquiz-(\d+)\.jpg$/)?.[1])
    .filter(Boolean)
    .map(Number)
  const nom = `apercu-dragonballquiz-${Math.max(0, ...numeros) + 1}.jpg`

  const page = await nouvellePage(1200, 630, 2)
  await cadrer(page, 1)
  const png = await page.screenshot({ type: 'png', encoding: 'base64' })
  // Réduction de la double densité à 1200 × 630, dans le navigateur lui-même.
  const jpeg = await page.evaluate(async (donnees) => {
    const img = new Image()
    img.src = `data:image/png;base64,${donnees}`
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 630
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, 1200, 630)
    return canvas.toDataURL('image/jpeg', 0.86).split(',')[1]
  }, png)
  fs.writeFileSync(path.join(ASSETS, nom), Buffer.from(jpeg, 'base64'))
  console.log(`aperçu capturé : ${nom} — à reporter dans la balise og:image`)
  await page.close()
}

/* -------------------------------------------------------------- partie */
if (faire('partie')) {
  // Une réponse fausse, pour montrer le retour, sur un énoncé de deux lignes
  // au plus, pour garder le cadrage : on relance la manche jusqu'à l'obtenir.
  let page
  for (let essai = 1; ; essai++) {
    page = await nouvellePage(1240, 775, 1)
    await clic(page, 'Techniques', 'section button')
    await attendre(200)
    await clic(page, 'Moyen', 'fieldset button')
    await attendre(200)
    await clic(page, 'Commencer le combat')
    await attendre(700)
    await chargerReponses(page)
    const { lignes, fausse } = await page.evaluate(() => {
      const h2 = document.querySelector('h2')
      const lignes = Math.round(h2.getBoundingClientRect().height / parseFloat(getComputedStyle(h2).lineHeight))
      const bonne = window.__reponses.get(h2.textContent)
      const options = [...document.querySelectorAll('[role="group"][aria-label] button')].filter(
        (b) => !b.hasAttribute('hreflang'),
      )
      const choix = options.find((b) => !b.textContent.includes(bonne))
      choix?.click()
      return { lignes, fausse: Boolean(choix) }
    })
    await attendre(900)
    if ((fausse && lignes <= 2) || essai >= 15) break
    await page.close()
  }
  // Cadrage sur le bandeau de catégorie, en tête de l'écran de question.
  await deuxDensites(page, 'partie', 0.85, 'div.overflow-hidden:has(> div > p.title-ink)')
  await page.close()
}

/* ------------------------------------------------------------ résultat */
if (faire('resultat')) {
  const page = await nouvellePage(1240, 775, 1)
  await clic(page, 'Techniques', 'section button')
  await attendre(200)
  await clic(page, 'Difficile', 'fieldset button')
  await attendre(200)
  await clic(page, 'Commencer le combat')
  await attendre(700)
  await chargerReponses(page)

  for (let garde = 0; garde < 40; garde++) {
    const etat = await page.evaluate((visees) => {
      const suivant = [...document.querySelectorAll('button')].find((b) =>
        /Question suivante|Voir le résultat/.test(b.textContent),
      )
      if (suivant) {
        suivant.click()
        return 'suite'
      }
      const options = [...document.querySelectorAll('[role="group"][aria-label] button')].filter(
        (b) => !b.hasAttribute('hreflang'),
      )
      const enonce = document.querySelector('h2')?.textContent
      if (!options.length || !window.__reponses.has(enonce)) return 'fin'
      const bonne = window.__reponses.get(enonce)
      const justes = Number(document.body.dataset.justes ?? 0)
      const viser = justes < visees
      const choix = viser
        ? options.find((b) => b.textContent.includes(bonne))
        : options.find((b) => !b.textContent.includes(bonne))
      if (viser) document.body.dataset.justes = String(justes + 1)
      ;(choix ?? options[0]).click()
      return 'réponse'
    }, BONNES_VISEES)
    await attendre(180)
    if (etat === 'fin') break
  }
  await attendre(900)
  const score = await page.evaluate(() => document.querySelector('p.text-ki.font-display')?.textContent ?? '?')
  console.log('score de la capture :', score)
  await deuxDensites(page, 'resultat', 0.85)
  await page.close()
}

await navigateur.close()
