/**
 * Chaînes françaises.
 *
 * Les valeurs qui dépendent d'un nombre ou d'un nom sont des fonctions
 * plutôt que des gabarits à trous : l'accord en nombre n'obéit pas aux
 * mêmes règles d'une langue à l'autre, et une fonction laisse chaque
 * traduction décider elle-même.
 */
export default {
  code: 'fr',
  htmlLang: 'fr',
  locale: 'fr-FR',
  nom: 'Français',

  meta: {
    title: 'Dragon Ball Quiz — teste ta puissance de combat',
    description: (n) =>
      `Quiz de fan sur l'univers Dragon Ball : personnages, sagas, techniques et power levels. 4 catégories, 3 niveaux de difficulté, ${n} questions originales. Gratuit et sans inscription.`,
  },

  langue: {
    label: 'Langue',
    versAutre: 'English',
  },

  accueil: {
    surtitre: 'Quiz de fan · 100 % gratuit',
    accroche: (n, c) =>
      `${n} questions originales réparties en ${c} catégories et 3 niveaux. Réponds vite, gagne ton rang, et va défier tes amis avec ta puissance de combat.`,
    etapeCategorie: 'Choisis ton terrain',
    etapeNiveau: 'Choisis ton niveau',
    legendeNiveau: 'Niveau de difficulté',
    chronoLabel: '⏱ Mode chrono',
    chronoDescription: (s) =>
      `${s} secondes par question. Passé le délai, la question est perdue.`,
    commencer: 'Commencer le combat →',
    choisirCategorie: 'Choisis une catégorie',
    effacer: 'Effacer mes records et mon historique',
    chargement: 'Chargement des questions…',
  },

  carte: {
    record: (score, total, niveau) => `Record ${score}/${total} · ${niveau}`,
    recordChrono: (score, total, niveau) => `⏱ ${score}/${total} · ${niveau}`,
    jamaisTente: 'Jamais tenté',
    jamaisTenteChrono: '⏱ Jamais tenté',
  },

  categories: {
    personnages: { label: 'Personnages', tagline: 'Qui est qui dans la galaxie' },
    sagas: { label: 'Sagas', tagline: 'Des Saiyans au Tournoi du Pouvoir' },
    techniques: {
      label: 'Techniques & transformations',
      tagline: 'Kaméhaméha, Potaras, Ultra Instinct',
    },
    power: {
      label: 'Power levels',
      tagline: 'Scouters, multiplicateurs et chiffres cultes',
    },
    coulisses: {
      label: 'Coulisses & création',
      tagline: 'Toriyama, le Jump, l’origine des noms',
    },
  },

  niveaux: {
    facile: {
      label: 'Facile',
      sousTitre: (n) => `${n} questions`,
      blurb: 'Les bases de la série. Idéal pour chauffer.',
    },
    moyen: {
      label: 'Moyen',
      sousTitre: (n) => `${n} questions`,
      blurb: 'Il faut avoir suivi les arcs jusqu’au bout.',
    },
    difficile: {
      label: 'Difficile',
      sousTitre: (n) => `${n} questions`,
      blurb: 'Chiffres exacts, seconds rôles, détails de films.',
    },
  },

  quiz: {
    abandonner: 'Abandonner',
    badgeChrono: '⏱ Chrono',
    propositions: 'Propositions de réponse',
    progression: (n, total) => `Progression : question ${n} sur ${total}`,
    questionSur: (n, total) => `Question ${n} / ${total}`,
    bonnes: (n) => `${n} bonne${n > 1 ? 's' : ''}`,
    juste: 'Dans le mille.',
    faux: 'Raté.',
    tempsEcoule: 'Temps écoulé.',
    bonneReponse: (r) => `La bonne réponse : ${r}.`,
    suivante: 'Question suivante →',
    voirResultat: 'Voir le résultat →',
  },

  resultat: {
    rangAtteint: 'Rang atteint',
    score: 'Score',
    puissance: 'Puissance',
    nouveauRecord: '★ Nouveau record dans cette catégorie',
    rejouer: '↻ Rejouer',
    changerCategorie: 'Changer de catégorie',
    voirQuestions: (n) => `▼ Revoir les ${n} questions`,
    masquerQuestions: '▲ Masquer le détail',
  },

  partage: {
    partager: '↗ Partager mon score',
    copier: '⧉ Copier mon score',
    partage: '✔ Partagé !',
    copie: '✔ Copié !',
    ouCopier: 'ou copier le texte',
    messagePartage: 'Résumé envoyé à l’application choisie.',
    messageCopie: 'Le résumé est dans ton presse-papier, colle-le où tu veux.',
    messageEchec:
      'Ton navigateur a bloqué la copie — le texte est sélectionné, fais Ctrl+C (ou ⌘+C).',
    zoneTexte: 'Résumé de la partie à copier',
    titre: 'Dragon Ball Quiz',
    ligneScore: (score, total, rang) => `Score : ${score}/${total} · Rang : ${rang}`,
    lignePuissance: (p) => `Puissance de combat estimée : ${p}`,
    invitation: 'À toi de faire mieux',
    mentionChrono: 'chrono ⏱',
  },

  tableau: {
    titre: 'Tableau des scores',
    entamees: (n, total) =>
      `${n} catégorie${n > 1 ? 's' : ''} sur ${total} entamée${n > 1 ? 's' : ''}`,
    legende: 'Meilleurs scores par catégorie et par mode de jeu',
    colCategorie: 'Catégorie',
    colClassique: 'Classique',
    colChrono: '⏱ Chrono',
    nouveauRecord: 'nouveau record',
  },

  historique: {
    titre: 'Dernières parties',
    conservees: (n, total) => `${n} sur ${total} conservées`,
    cettePartie: 'cette partie',
  },

  rangs: {
    terrien: {
      label: 'Terrien lambda',
      tagline: 'Le fermier au fusil a fait mieux. Et il n’avait qu’une puissance de 5.',
    },
    eleve: {
      label: 'Élève de la Tortue',
      tagline: 'Tu as porté la carapace, mais tu n’as pas encore fini le premier tour de l’île.',
    },
    'guerrier-z': {
      label: 'Guerrier Z',
      tagline: 'Solide. Tu tiens la ligne de front, même si Nappa te fait encore peur.',
    },
    'super-saiyan': {
      label: 'Super Saiyan',
      tagline: 'La légende est réveillée. Les cheveux tiennent tout seuls, désormais.',
    },
    blue: {
      label: 'Super Saiyan Blue',
      tagline: 'Maîtrise divine du ki. Et un score qui commence à faire du bruit.',
    },
    'ultra-instinct': {
      label: 'Ultra Instinct',
      tagline: 'Tu réponds avant même d’avoir lu la question. Le corps agit seul.',
    },
    zeno: {
      label: 'Zeno en personne',
      tagline: 'Sans faute. À ce niveau-là, tu n’es plus un joueur, tu es l’arbitre.',
    },
  },

  pied: {
    marque: 'Dragon Ball Quiz',
    mention:
      "Site de fan non officiel, sans lien avec Toei Animation, Shueisha ou les ayants droit d'Akira Toriyama. Dragon Ball et les noms qui en sont issus appartiennent à leurs propriétaires respectifs. Aucune image, aucun artwork ni aucun logo tiré de l'œuvre originale n'est utilisé ici : l'habillage graphique et les questions sont des créations originales.",
    credit: 'Conçu et développé par Yassine Boukamir.',
  },
}
