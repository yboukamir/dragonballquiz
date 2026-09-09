/**
 * English strings. Mirrors the shape of `fr.js` exactly — any key added
 * on one side must exist on the other, and `npm run check:i18n` fails the
 * build otherwise.
 *
 * Character and technique names follow the English releases (Frieza,
 * Krillin, Master Roshi, Spirit Bomb…), not a transliteration of the
 * French ones: an English-speaking fan should recognise every term.
 */
export default {
  code: 'en',
  htmlLang: 'en',
  locale: 'en-GB',
  nom: 'English',

  meta: {
    title: 'Dragon Ball Quiz — test your power level',
    description: (n) =>
      `Fan quiz on the Dragon Ball universe: characters, sagas, techniques and power levels. 4 categories, 3 difficulty levels, ${n} original questions. Free, no sign-up.`,
  },

  langue: {
    label: 'Language',
    versAutre: 'Français',
  },

  accueil: {
    surtitre: 'Fan quiz · 100% free',
    accroche: (n) =>
      `${n} original questions across 4 categories and 3 difficulty levels. Answer fast, earn your rank, then go and challenge your friends.`,
    etapeCategorie: 'Pick your battleground',
    etapeNiveau: 'Pick your level',
    legendeNiveau: 'Difficulty level',
    chronoLabel: '⏱ Timed mode',
    chronoDescription: (s) =>
      `${s} seconds per question. Run out of time and the question is lost.`,
    commencer: 'Start the fight →',
    choisirCategorie: 'Pick a category',
    effacer: 'Clear my records and history',
    chargement: 'Loading questions…',
  },

  carte: {
    record: (score, total, niveau) => `Best ${score}/${total} · ${niveau}`,
    recordChrono: (score, total, niveau) => `⏱ ${score}/${total} · ${niveau}`,
    jamaisTente: 'Never attempted',
    jamaisTenteChrono: '⏱ Never attempted',
  },

  categories: {
    personnages: { label: 'Characters', tagline: 'Who is who across the galaxy' },
    sagas: { label: 'Sagas', tagline: 'From the Saiyans to the Tournament of Power' },
    techniques: {
      label: 'Techniques & transformations',
      tagline: 'Kamehameha, Potara, Ultra Instinct',
    },
    power: {
      label: 'Power levels',
      tagline: 'Scouters, multipliers and legendary numbers',
    },
  },

  niveaux: {
    facile: {
      label: 'Easy',
      sousTitre: (n) => `${n} questions`,
      blurb: 'The basics of the series. A good warm-up.',
    },
    moyen: {
      label: 'Medium',
      sousTitre: (n) => `${n} questions`,
      blurb: 'You need to have followed the arcs to the end.',
    },
    difficile: {
      label: 'Hard',
      sousTitre: (n) => `${n} questions`,
      blurb: 'Exact figures, supporting cast, film details.',
    },
  },

  quiz: {
    abandonner: 'Give up',
    badgeChrono: '⏱ Timed',
    propositions: 'Answer choices',
    progression: (n, total) => `Progress: question ${n} of ${total}`,
    questionSur: (n, total) => `Question ${n} / ${total}`,
    bonnes: (n) => `${n} correct`,
    juste: 'Spot on.',
    faux: 'Missed it.',
    tempsEcoule: "Time's up.",
    bonneReponse: (r) => `The answer was: ${r}.`,
    suivante: 'Next question →',
    voirResultat: 'See the result →',
  },

  resultat: {
    rangAtteint: 'Rank reached',
    score: 'Score',
    puissance: 'Power',
    nouveauRecord: '★ New record in this category',
    rejouer: '↻ Play again',
    changerCategorie: 'Change category',
    voirQuestions: (n) => `▼ Review all ${n} questions`,
    masquerQuestions: '▲ Hide the details',
  },

  partage: {
    partager: '↗ Share my score',
    copier: '⧉ Copy my score',
    partage: '✔ Shared!',
    copie: '✔ Copied!',
    ouCopier: 'or copy the text',
    messagePartage: 'Summary sent to the app you picked.',
    messageCopie: "The summary is on your clipboard — paste it wherever you like.",
    messageEchec:
      'Your browser blocked the copy — the text is selected, press Ctrl+C (or ⌘+C).',
    zoneTexte: 'Game summary to copy',
    titre: 'Dragon Ball Quiz',
    ligneScore: (score, total, rang) => `Score: ${score}/${total} · Rank: ${rang}`,
    lignePuissance: (p) => `Estimated power level: ${p}`,
    invitation: 'Beat that',
    mentionChrono: 'timed ⏱',
  },

  tableau: {
    titre: 'Scoreboard',
    entamees: (n, total) => `${n} of ${total} categories started`,
    legende: 'Best scores by category and game mode',
    colCategorie: 'Category',
    colClassique: 'Classic',
    colChrono: '⏱ Timed',
    nouveauRecord: 'new record',
  },

  historique: {
    titre: 'Recent games',
    conservees: (n, total) => `${n} of ${total} kept`,
    cettePartie: 'this game',
  },

  rangs: {
    terrien: {
      label: 'Ordinary Earthling',
      tagline: 'The farmer with the shotgun did better — and his power level was 5.',
    },
    eleve: {
      label: 'Turtle School student',
      tagline: 'You put the shell on, but you have not finished the first lap of the island.',
    },
    'guerrier-z': {
      label: 'Z Fighter',
      tagline: 'Solid. You hold the front line, even if Nappa still scares you.',
    },
    'super-saiyan': {
      label: 'Super Saiyan',
      tagline: 'The legend is awake. The hair stands up on its own now.',
    },
    blue: {
      label: 'Super Saiyan Blue',
      tagline: 'Divine ki control — and a score that is starting to make noise.',
    },
    'ultra-instinct': {
      label: 'Ultra Instinct',
      tagline: 'You answer before you have even read the question. The body acts alone.',
    },
    zeno: {
      label: 'Zeno himself',
      tagline: 'Flawless. At this level you are no longer a player, you are the referee.',
    },
  },

  pied: {
    marque: 'Dragon Ball Quiz',
    mention:
      'Unofficial fan site, not affiliated with Toei Animation, Shueisha or the rights holders of Akira Toriyama. Dragon Ball and the names derived from it belong to their respective owners. No image, artwork or logo from the original work is used here: the visual design and the questions are original creations.',
    credit: 'Designed and built by Yassine Boukamir.',
  },
}
