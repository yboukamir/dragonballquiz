/**
 * Audit d'accessibilité de tous les écrans du jeu, avec axe-core.
 *
 *   npm install --no-save puppeteer-core axe-core
 *   node scripts/audit-a11y.mjs [url]        (par défaut : le site en ligne)
 *
 * Lighthouse n'examine que la page au chargement, or la moitié du site
 * n'apparaît qu'en jouant : la question, le retour après une réponse, le
 * compte à rebours, le résultat, le récapitulatif. Ce script joue donc des
 * manches dans les deux langues et passe axe sur chaque état, puis rejoue une
 * manche entière au clavier seul.
 *
 * Le rapport complet part dans un fichier JSON du dossier temporaire ; la
 * console en donne la synthèse. Code de sortie 1 s'il reste une violation.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import puppeteer from 'puppeteer-core'

const require = createRequire(import.meta.url)
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = (process.argv[2] ?? 'https://dragonballquiz.com/').replace(/\/?$/, '/')

const REGLES = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

const LIBELLES = {
  fr: {
    commencer: /Commencer le combat/,
    suivante: /Question suivante|Voir le résultat/,
    chrono: /Mode chrono/,
    difficile: /^Difficile/,
    recap: /Revoir les/,
    accueil: /Changer de catégorie/,
    rang: /Rang atteint/i,
  },
  en: {
    commencer: /Start the fight/,
    suivante: /Next question|See the result/,
    chrono: /Timed mode/,
    difficile: /^Hard/,
    recap: /Review the|See the \d+|questions/,
    accueil: /Change category/,
    rang: /Rank reached/i,
  },
}

const attendre = (ms) => new Promise((r) => setTimeout(r, ms))

const navigateur = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
})

async function nouvellePage(langue) {
  const page = await navigateur.newPage()
  // Mobile d'abord, comme le site : c'est la mise en page la plus contrainte.
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.evaluateOnNewDocument((l) => {
    try {
      localStorage.clear()
      localStorage.setItem('dbq.lang.v1', l)
    } catch {
      /* rien */
    }
  }, langue)
  await page.goto(langue === 'fr' ? BASE : `${BASE}en/`, { waitUntil: 'networkidle0' })
  await attendre(600)
  return page
}

const clic = (page, motif, selecteur = 'button') =>
  page.evaluate(
    (source, drapeaux, s) => {
      const re = new RegExp(source, drapeaux)
      const el = [...document.querySelectorAll(s)].find((b) => re.test(b.textContent))
      if (!el) throw new Error(`introuvable : ${source}`)
      el.click()
    },
    motif.source,
    motif.flags,
    selecteur,
  )

/** Clique la n-ième proposition de la question affichée. */
const repondre = (page, n) =>
  page.evaluate((i) => {
    const groupe = [...document.querySelectorAll('[role=group][aria-label]')].find(
      (g) => !/Langue|Language/.test(g.getAttribute('aria-label')),
    )
    groupe.querySelectorAll('button')[i].click()
  }, n)

const surEcranResultat = (page, L) =>
  page.evaluate((source) => new RegExp(source, 'i').test(document.body.innerText), L.rang.source)

const violations = []
const incompletes = []

async function auditer(page, ecran, langue) {
  if (!(await page.evaluate(() => Boolean(window.axe)))) await page.addScriptTag({ content: AXE })
  const resultat = await page.evaluate(
    async (tags) => {
      const r = await window.axe.run(document, {
        runOnly: { type: 'tag', values: tags },
        resultTypes: ['violations', 'incomplete'],
      })
      const simplifier = (v) => ({
        id: v.id,
        impact: v.impact,
        aide: v.help,
        lien: v.helpUrl,
        noeuds: v.nodes.map((n) => ({
          cible: n.target.join(' '),
          html: n.html.slice(0, 180),
          detail: (n.failureSummary || n.any?.map((a) => a.message).join(' ') || '').slice(0, 300),
        })),
      })
      return { violations: r.violations.map(simplifier), incompletes: r.incomplete.map(simplifier) }
    },
    REGLES,
  )
  for (const v of resultat.violations) violations.push({ ...v, ecran, langue })
  // Seul le contraste « à vérifier » nous intéresse : axe renonce quand le
  // fond est un dégradé ou une trame, ce qui est le cas partout ici.
  for (const v of resultat.incompletes.filter((x) => x.id === 'color-contrast'))
    incompletes.push({ ...v, ecran, langue })
  console.log(
    `  ${langue}/${ecran.padEnd(18)} ${resultat.violations.length} règle(s) en échec` +
      (resultat.violations.length ? ` : ${resultat.violations.map((v) => v.id).join(', ')}` : ''),
  )
}

/* ----------------------------------------------------- tous les écrans */
for (const langue of ['fr', 'en']) {
  const L = LIBELLES[langue]
  console.log(`\n=== ${langue.toUpperCase()} ===`)
  const page = await nouvellePage(langue)

  await auditer(page, 'accueil', langue)

  await clic(page, /Sagas/, 'section button')
  await attendre(200)
  await clic(page, L.commencer)
  await attendre(500)
  await auditer(page, 'question', langue)

  // Deuxième proposition : juste ou fausse au hasard du mélange, peu importe,
  // l'écran de retour s'affiche dans les deux cas.
  await repondre(page, 1)
  await attendre(400)
  await auditer(page, 'retour', langue)

  for (let i = 0; i < 12; i++) {
    if (await surEcranResultat(page, L)) break
    const aSuite = await page.evaluate(
      (source) => [...document.querySelectorAll('button')].some((b) => new RegExp(source).test(b.textContent)),
      L.suivante.source,
    )
    if (!aSuite) {
      await repondre(page, 0)
      await attendre(200)
    }
    await clic(page, L.suivante)
    await attendre(300)
  }
  // Un écran mal identifié fausserait le rapport sans bruit : on s'arrête net.
  if (!(await surEcranResultat(page, L))) throw new Error(`${langue} : écran de résultat non atteint`)
  await attendre(600)
  await auditer(page, 'resultat', langue)

  // Le récapitulatif n'est rendu qu'une fois déplié.
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button[aria-expanded]')][0]
    b?.click()
  })
  await attendre(300)
  await auditer(page, 'resultat-recap', langue)

  // Retour à l'accueil : les cartes affichent maintenant un record, et le
  // lien d'effacement apparaît.
  await clic(page, L.accueil)
  await attendre(400)
  await auditer(page, 'accueil-records', langue)

  // Mode chrono : le compte à rebours n'existe qu'en partie.
  await clic(page, L.chrono)
  await attendre(200)
  await clic(page, /Sagas/, 'section button')
  await attendre(200)
  await clic(page, L.difficile, 'fieldset button')
  await attendre(200)
  await clic(page, L.commencer)
  await attendre(400)
  await auditer(page, 'question-chrono', langue)

  await page.close()
}

/* --------------------------------------------- une manche au clavier seul */
console.log('\n=== Clavier seul (fr) ===')
const clavier = await nouvellePage('fr')

/** Tabule jusqu'à un élément dont le texte correspond, et rend le nombre de tabulations. */
async function tabulerJusqua(page, motif, max = 60) {
  for (let n = 1; n <= max; n++) {
    await page.keyboard.press('Tab')
    const actif = await page.evaluate(() => ({
      texte: document.activeElement?.textContent?.trim() ?? '',
      tag: document.activeElement?.tagName,
    }))
    if (motif.test(actif.texte)) return n
  }
  return null
}

// L'élément qui a le focus est-il visiblement marqué ?
const focusVisible = (page) =>
  page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return null
    const s = getComputedStyle(el)
    return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
  })

const parcours = []
const pas = async (etape, motif) => {
  const n = await tabulerJusqua(clavier, motif)
  parcours.push({ etape, tabulations: n, focusVisible: n ? await focusVisible(clavier) : null })
  if (n) await clavier.keyboard.press('Enter')
  await attendre(250)
  return n
}

await pas('catégorie', /^Sagas/)
await pas('lancer la manche', /Commencer le combat/)

let questions = 0
let focusSurSuite = 0
const tabsParQuestion = []
const focusApresSuite = []
for (let i = 0; i < 10; i++) {
  // Tabule jusqu'à une proposition de réponse. On vise le groupe lui-même
  // et non un texte : « Abandonner » commence aussi par un A et le précède
  // dans l'ordre du document.
  let n = 0
  let atteint = false
  while (n < 40 && !atteint) {
    await clavier.keyboard.press('Tab')
    n++
    atteint = await clavier.evaluate(() => {
      const g = document.activeElement?.closest('[role=group][aria-label]')
      return Boolean(g && !/Langue|Language/.test(g.getAttribute('aria-label')))
    })
  }
  if (!atteint) break
  tabsParQuestion.push(n)
  await clavier.keyboard.press('Enter')
  await attendre(250)

  // Le code donne le focus au bouton de suite après la réponse.
  const suiteAuFocus = await clavier.evaluate(() => /→/.test(document.activeElement?.textContent ?? ''))
  if (!suiteAuFocus) break
  focusSurSuite++
  await clavier.keyboard.press('Enter')
  await attendre(300)

  // Et quand la question suivante s'affiche, où atterrit le focus ?
  focusApresSuite.push(
    await clavier.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return 'body (focus perdu)'
      return `${el.tagName.toLowerCase()} « ${el.textContent.trim().slice(0, 40)} »`
    }),
  )
  questions++
}
const arrive = await clavier.evaluate(() => /Rang atteint/i.test(document.body.innerText))
console.log(`  manche jouée au clavier : ${questions}/10 questions, écran de résultat atteint : ${arrive}`)
console.log(`  focus placé sur « suite » après la réponse : ${focusSurSuite}/${tabsParQuestion.length}`)
console.log(`  tabulations pour atteindre une proposition : ${tabsParQuestion.join(', ')}`)
console.log(`  focus après « suite » : ${[...new Set(focusApresSuite)].join(' | ')}`)
for (const p of parcours)
  console.log(`  ${p.etape.padEnd(18)} ${p.tabulations ?? 'INATTEIGNABLE'} tabulation(s), focus visible : ${p.focusVisible}`)

await navigateur.close()

/* ------------------------------------------------------------- synthèse */
const parRegle = new Map()
for (const v of violations) {
  const r = parRegle.get(v.id) ?? { id: v.id, impact: v.impact, aide: v.aide, lien: v.lien, ecrans: new Set(), cibles: new Map() }
  r.ecrans.add(`${v.langue}/${v.ecran}`)
  for (const n of v.noeuds) if (!r.cibles.has(n.cible)) r.cibles.set(n.cible, n)
  parRegle.set(v.id, r)
}

console.log('\n=== Synthèse ===')
if (parRegle.size === 0) console.log('  aucune violation axe')
for (const r of [...parRegle.values()].sort((a, b) => b.cibles.size - a.cibles.size)) {
  console.log(`\n  [${r.impact}] ${r.id} — ${r.aide}`)
  console.log(`    écrans : ${[...r.ecrans].join(', ')}`)
  for (const n of [...r.cibles.values()].slice(0, 6)) {
    console.log(`    · ${n.cible}`)
    console.log(`      ${n.html}`)
    if (n.detail) console.log(`      → ${n.detail.replace(/\s+/g, ' ')}`)
  }
  if (r.cibles.size > 6) console.log(`    … et ${r.cibles.size - 6} autre(s)`)
}

const cheminRapport = path.join(os.tmpdir(), 'audit-a11y-dragonballquiz.json')
fs.writeFileSync(
  cheminRapport,
  JSON.stringify({ base: BASE, violations, incompletes, clavier: { questions, arrive, focusSurSuite, tabsParQuestion, focusApresSuite, parcours } }, null, 2),
)
console.log(`\nContraste « à vérifier » (fonds en dégradé) : ${incompletes.reduce((t, v) => t + v.noeuds.length, 0)} élément(s)`)
console.log(`Rapport complet : ${cheminRapport}`)
process.exit(parRegle.size > 0 ? 1 : 0)
