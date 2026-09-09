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
├── data/questions.js      192 questions, 4 catégories, 3 niveaux
├── lib/
│   ├── quiz.js            niveaux, tirage d'une manche, mélange
│   ├── ranks.js           rangs de fin de partie + puissance de combat
│   ├── share.js           résumé partagé (Web Share natif, sinon presse-papier)
│   ├── storage.js         meilleurs scores par mode (localStorage, migration v1→v2)
│   └── accents.js         table des accents de couleur
├── hooks/useCountdown.js  compte à rebours du mode chrono
├── components/
│   ├── ui/                primitives réutilisables (Button, Panel, Countdown…)
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

| Niveau | Questions | Composition visée | Recouvrement entre deux parties |
| --- | --- | --- | --- |
| Facile | 10 | 70 % faciles, 30 % moyennes | ~3,8 / 10 |
| Moyen | 10 | 20 % faciles, 60 % moyennes, 20 % difficiles | ~3,5 / 10 |
| Difficile | 10 | 40 % moyennes, 60 % difficiles | ~3,1 / 10 |

Chaque catégorie compte 48 questions : 16 faciles, 12 moyennes, 20 difficiles.

Si un palier ne contient pas assez de questions, le tirage complète avec les
plus proches du niveau visé plutôt que d'échouer.

**Dimensionner la banque.** La variété d'un mode ne dépend pas du nombre total de
questions, mais du vivier réellement atteint par son mélange. Deux règles suffisent
à raisonner :

- Tirer `n` questions parmi `v` impose au minimum `2n − v` questions communes entre
  deux parties consécutives. C'est pour cette raison que le mode difficile est passé
  de 15 à 10 questions : il ne puise que dans les paliers moyen et difficile, soit
  22 questions par catégorie, ce qui condamnait 8 questions à revenir à chaque fois.
- Au-delà de ce plancher, le recouvrement d'un palier vaut environ `q²/p`, où `q` est
  le quota tiré dans ce palier et `p` sa taille. Le mode facile tirant 7 questions
  faciles, passer de 8 à 16 faciles par catégorie a fait chuter son recouvrement de
  6,8 à 3,8 sur 10. Le même calcul appliqué au palier difficile (6 tirées parmi 20,
  plus 4 moyennes parmi 12) prévoyait 3,1 — c'est exactement la valeur mesurée.

Autrement dit, agrandir un palier n'a d'effet que sur les modes qui y puisent, et
l'effet suit une courbe en `1/p` : les premiers ajouts rapportent beaucoup, les
suivants de moins en moins.

Le script de mesure tient en quelques lignes : jouer deux manches d'affilée et
compter les identifiants communs, répété quelques centaines de fois.

### Mode chrono

Option transversale, activable sur n'importe quelle catégorie et n'importe quel
niveau — et non un quatrième niveau, ce qui aurait dilué la sémantique des trois
autres. Le temps par question se resserre avec la difficulté : 15 s en facile,
12 s en moyen, 10 s en difficile (`seconds` dans `DIFFICULTIES`).

Passé le délai, la question compte comme manquée : la bonne réponse est révélée,
mais aucune proposition n'est marquée comme choisie, puisque le joueur n'a rien
choisi. Le mode est figé au lancement de la manche (`roundChrono`) : le basculer
depuis l'accueil ne change jamais les règles d'une partie déjà commencée.

`useCountdown` prend deux précautions qui comptent plus qu'il n'y paraît :

- **Pause quand l'onglet passe en arrière-plan.** Perdre une question parce qu'on
  a répondu à une notification serait injuste, et les navigateurs bridant les
  timers des onglets cachés, un décompte naïf y deviendrait de toute façon faux.
- **Temps restant calculé sur `performance.now`** plutôt qu'un compteur décrémenté
  à chaque tick, qui dériverait au fil des imprécisions de `setInterval`.

Les records du mode chrono sont stockés **séparément** de ceux du mode classique
(voir `lib/storage.js`). Les mélanger reviendrait à comparer un score sous
contrainte de temps à un score sans : le second l'emporterait presque toujours au
pourcentage, et le mode chrono ne décrocherait jamais de record.

Sur l'accueil, chaque carte n'affiche que le record du **mode actuellement
sélectionné** : basculer l'interrupteur change les badges affichés. Le
pictogramme ⏱ lève l'ambiguïté, y compris sur « Jamais tenté », qui se lit alors
« jamais tenté en chrono » et non « jamais joué ».

### Partage du score

`ShareButton` dégrade en trois temps, sans jamais laisser le joueur sans issue :

1. **API Web Share** quand le navigateur l'expose — la feuille de partage native
   du système, chemin normal sur mobile. Aucune API de réseau social n'est intégrée.
2. **Presse-papier** sinon, cas de la plupart des navigateurs de bureau.
3. **Champ pré-sélectionné** si la copie elle-même est refusée (permission, absence
   de geste utilisateur, iframe restreinte).

Une annulation de la feuille de partage (`AbortError`) est un choix de
l'utilisateur, pas une erreur : elle ne déclenche aucun message.

`buildSharePayload` renvoie le texte et l'URL séparés pour Web Share, qui ajoute
le lien lui-même, et une version `full` d'un seul tenant pour le presse-papier —
les concaténer partout ferait apparaître l'URL en double.

## Déploiement

Le site est publié sur **GitHub Pages**, sur le domaine `dragonballquiz.com`.

### Automatique

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` : validation de la
banque de questions, lint, build, puis publication de `dist/` sur Pages. Il est aussi
déclenchable à la main (*Actions → Déploiement GitHub Pages → Run workflow*), sans
commit. **Aucun secret à configurer** : le workflow s'authentifie via OIDC.

Le domaine personnalisé tient à deux choses qu'il ne faut pas dissocier :

- `public/CNAME`, copié dans `dist/` au build. S'il disparaît, Pages retombe sur
  l'URL par défaut au déploiement suivant.
- La zone DNS du domaine, chez OVH, qui doit pointer vers Pages :

  ```
  A     @    185.199.108.153        AAAA  @  2606:50c0:8000::153
  A     @    185.199.109.153        AAAA  @  2606:50c0:8001::153
  A     @    185.199.110.153        AAAA  @  2606:50c0:8002::153
  A     @    185.199.111.153        AAAA  @  2606:50c0:8003::153
  CNAME www  yboukamir.github.io.
  ```

`public/.nojekyll` désactive le traitement Jekyll, qui ignorerait sinon les fichiers
et dossiers commençant par un underscore.

### Repli : hébergement classique (OVH ou autre)

Le build est un site statique ordinaire : il peut être servi par n'importe quel
hébergeur, sans Node ni base de données. Cette procédure n'est plus celle en usage,
elle est conservée au cas où le site quitterait Pages.

`public/.htaccess` ne sert que dans ce cas : GitHub Pages n'est pas Apache et
l'ignore complètement. Il y est conservé pour que le repli fonctionne d'emblée,
avec compression, cache long sur les assets hashés et `no-cache` sur l'index.

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
