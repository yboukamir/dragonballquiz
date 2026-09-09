# dragonballquiz.com

Quiz de fan sur l'univers Dragon Ball. Site statique, React + Tailwind CSS,
sans backend : les meilleurs scores vivent dans le `localStorage` du visiteur.

## Stack

- **React 19** (aucun routeur : une seule page, trois écrans pilotés par un état local)
- **Tailwind CSS v4** via `@tailwindcss/vite` — les tokens de design sont dans `src/index.css`
- **Vite 8** pour le build
- Aucune dépendance UI tierce

## Démarrer

```bash
npm install
npm run dev
```

| Script | Rôle |
| --- | --- |
| `npm run dev` | serveur de développement (port 5180) |
| `npm run build` | build de production dans `dist/` |
| `npm run preview` | sert le build de production en local |
| `npm run lint` | oxlint |
| `npm run check` | valide la banque de questions et le tirage des manches |
| `npm run check:share` | affiche le texte de partage et la grille des rangs |

## Structure

```
src/
├── data/questions.js      80 questions, 4 catégories, 3 niveaux
├── lib/
│   ├── quiz.js            niveaux, tirage d'une manche, mélange
│   ├── ranks.js           rangs de fin de partie + puissance de combat
│   ├── share.js           texte copié dans le presse-papier
│   ├── storage.js         meilleurs scores (localStorage, tolérant aux erreurs)
│   └── accents.js         table des accents de couleur
├── components/
│   ├── ui/                primitives réutilisables (Button, Panel, ProgressBar…)
│   └── *.jsx              écrans et blocs métier
└── App.jsx                machine à états : accueil → quiz → résultat
```

### Ajouter des questions

Tout se passe dans `src/data/questions.js`. Une entrée ressemble à ceci :

```js
{
  id: 'pe21', cat: 'personnages', diff: 2,
  q: "La question ?",
  a: ["Bonne réponse", "Leurre 1", "Leurre 2", "Leurre 3"],
  why: "Explication affichée dans le feedback.",
}
```

**`a[0]` est toujours la bonne réponse.** Les propositions sont mélangées à
l'exécution dans `lib/quiz.js`, ce qui rend le fichier relisible d'un coup d'œil.
`npm run check` vérifie ensuite l'unicité des identifiants, le nombre de
propositions, l'absence de doublons et la bonne répartition des réponses.

### Niveaux

| Niveau | Questions | Composition visée |
| --- | --- | --- |
| Facile | 10 | 70 % faciles, 30 % moyennes |
| Moyen | 10 | 20 % faciles, 60 % moyennes, 20 % difficiles |
| Difficile | 15 | 40 % moyennes, 60 % difficiles |

Si un palier ne contient pas assez de questions, le tirage complète avec les
plus proches du niveau visé plutôt que d'échouer.

## Déploiement sur OVH

Le build produit un site entièrement statique, à copier tel quel.

```bash
npm run build
```

Puis envoyer **le contenu** de `dist/` (et non le dossier lui-même) dans le
répertoire web du domaine — sur un hébergement mutualisé OVH, il s'agit
généralement de `www/`. En FTP/SFTP :

```
dist/index.html      → www/index.html
dist/assets/         → www/assets/
dist/.htaccess       → www/.htaccess
dist/favicon.svg     → www/favicon.svg
dist/robots.txt      → www/robots.txt
dist/sitemap.xml     → www/sitemap.xml
```

Ou en une commande, avec `lftp` :

```bash
lftp -c "open -u UTILISATEUR,MOTDEPASSE ftp.cluster0XX.hosting.ovh.net; mirror -R --delete --verbose dist/ www/"
```

Points d'attention :

- `.htaccess` est un fichier caché — vérifier que le client FTP l'envoie bien.
- `vite.config.js` utilise `base: './'`, donc le site fonctionne aussi depuis un
  sous-dossier si besoin de le tester avant bascule.
- Aucune règle de réécriture n'est nécessaire : le site est une page unique.

## Droits d'auteur

Site de fan non officiel, sans lien avec Toei Animation, Shueisha ou les ayants
droit d'Akira Toriyama. Dragon Ball et les noms qui en sont issus appartiennent à
leurs propriétaires respectifs.

Aucune image, aucun artwork, aucun logo ni aucune capture provenant de l'anime ou
du manga n'est utilisé. L'habillage graphique (palette, typographies, formes,
illustrations SVG) et l'intégralité des questions sont des créations originales
écrites pour ce site.
