/**
 * Régénère les captures du README dans docs/.
 *
 * Prérequis : puppeteer-core, volontairement absent des dépendances du
 * projet — il ne sert qu'ici, et l'ajouter alourdirait une installation
 * qui n'a pas besoin de piloter un navigateur :
 *
 *   npm install --no-save puppeteer-core
 *   node scripts/captures.mjs
 *
 * Le script pilote le Chrome déjà installé (voir CHROME) plutôt que d'en
 * télécharger un, et vise le site en ligne.
 */
import puppeteer from 'puppeteer-core'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SITE = 'https://dragonballquiz.com/'
const SORTIE = 'C:\\Users\\ybouk\\Desktop\\dragonballquiz.com\\docs\\'

// Nombre de bonnes réponses visé pour la capture de résultat. 8/10 met en
// valeur le système de rangs sans afficher un sans-faute peu crédible.
const BONNES_VISEES = 8

const attendre = (ms) => new Promise((r) => setTimeout(r, ms))

const navigateur = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

async function nouvellePage({ width, height, deviceScaleFactor }) {
  const page = await navigateur.newPage()
  await page.setViewport({ width, height, deviceScaleFactor })
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.clear()
      localStorage.setItem('dbq.lang.v1', 'fr')
    } catch {
      /* rien */
    }
  })
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

/* ---------------------------------------------------- accueil (large) */
{
  const page = await nouvellePage({ width: 1000, height: 1180, deviceScaleFactor: 1.5 })
  await page.goto(SITE, { waitUntil: 'networkidle0' })
  await attendre(1200)
  await page.screenshot({ path: SORTIE + 'apercu-accueil.png' })
  console.log('accueil capturé')
  await page.close()
}

/* --------------------------------------- quiz et résultat (mobile) */
{
  const page = await nouvellePage({ width: 390, height: 844, deviceScaleFactor: 2 })
  await page.goto(SITE, { waitUntil: 'networkidle0' })
  await attendre(1200)

  await clic(page, 'Techniques', 'section button')
  await attendre(200)
  await clic(page, 'Difficile', 'fieldset button')
  await attendre(200)
  await clic(page, 'Commencer le combat')
  await attendre(700)

  // La banque est un fragment chargé à la demande : on la réimporte pour
  // connaître la bonne réponse (toujours `a[0]` dans les données) et
  // piloter la partie au lieu de répondre au hasard.
  const banqueChargee = await page.evaluate(async () => {
    const url = performance
      .getEntriesByType('resource')
      .map((r) => r.name)
      .find((n) => /questions\.fr-.*\.js$/.test(n))
    if (!url) return false
    const mod = await import(url)
    window.__reponses = new Map(mod.QUESTIONS.map((q) => [q.q, q.a[0]]))
    return window.__reponses.size
  })
  console.log('banque rechargée :', banqueChargee, 'questions')

  // Une réponse volontairement fausse sur la première question : le
  // feedback est le cœur du jeu, autant le montrer.
  await page.evaluate(() => {
    const g = [...document.querySelectorAll('[role=group][aria-label]')].find(
      (x) => !/Langue|Language/.test(x.getAttribute('aria-label')),
    )
    const enonce = document.querySelector('h2').textContent
    const bonne = window.__reponses.get(enonce)
    const options = [...g.querySelectorAll('button')]
    const fausse = options.find((b) => !b.textContent.includes(bonne)) ?? options[0]
    fausse.click()
  })
  await attendre(700)

  await page.evaluate(() => window.scrollTo(0, 0))
  await attendre(300)
  await page.screenshot({ path: SORTIE + 'apercu-quiz.png' })
  console.log('quiz capturé')

  // On termine la manche en visant le score cible.
  let posees = 1
  let garde = 0
  while (garde++ < 40) {
    const fini = await page.evaluate(
      (visees, dejaPosees) => {
        const suivant = [...document.querySelectorAll('button')].find((b) =>
          /Question suivante|Voir le résultat/.test(b.textContent),
        )
        if (suivant) {
          suivant.click()
          return { avance: false }
        }
        const g = [...document.querySelectorAll('[role=group][aria-label]')].find(
          (x) => !/Langue|Language/.test(x.getAttribute('aria-label')),
        )
        const options = g ? [...g.querySelectorAll('button')] : []
        if (!options.length) return { fin: true }

        const enonce = document.querySelector('h2').textContent
        const bonne = window.__reponses.get(enonce)
        const justes = Number(document.body.dataset.justes ?? 0)
        // On répond juste tant que la cible n'est pas atteinte, faux ensuite.
        const viser = justes < visees
        const cible = viser
          ? options.find((b) => b.textContent.includes(bonne))
          : options.find((b) => !b.textContent.includes(bonne))
        if (viser) document.body.dataset.justes = String(justes + 1)
        ;(cible ?? options[0]).click()
        return { avance: true, posees: dejaPosees + 1 }
      },
      BONNES_VISEES,
      posees,
    )
    if (fini.posees) posees = fini.posees
    await attendre(160)
    if (fini.fin) break
  }

  await attendre(800)
  const score = await page.evaluate(() => {
    const p = document.querySelector('p.text-ki.font-display')
    return p ? p.textContent : '?'
  })
  console.log('score de la capture :', score)

  await page.evaluate(() => window.scrollTo(0, 0))
  await attendre(600)
  await page.screenshot({ path: SORTIE + 'apercu-resultat.png' })
  console.log('résultat capturé')
  await page.close()
}

await navigateur.close()
