# Notes techniques

Les décisions de conception de [dragonballquiz.com](https://dragonballquiz.com/),
et pourquoi elles ont été arbitrées dans ce sens. Le [README](../README.md) suffit
pour installer et lancer le projet ; ce document est pour qui veut savoir comment
il tient debout.

- [Langues](#langues)
- [Catégories](#catégories)
- [Ajouter des questions](#ajouter-des-questions)
- [Niveaux](#niveaux)
- [Barème pondéré](#barème-pondéré)
- [Mode chrono](#mode-chrono)
- [Tableau des scores](#tableau-des-scores)
- [Historique des parties](#historique-des-parties)
- [Partage du score](#partage-du-score)
- [Domaine et hébergement](#domaine-et-hébergement)
- [Repli sur un hébergement classique](#repli-sur-un-hébergement-classique)

---

## Langues

Le site est bilingue français / anglais, avec **une URL par langue** :
`https://dragonballquiz.com/` pour le français, `/en/` pour l'anglais. Chacune est
une page HTML distincte, avec sa propre balise `lang`, son `title`, sa
`description`, son `canonical` et les `hreflang` croisés — c'est ce qui les rend
indexables séparément.

- `src/i18n/fr.js` et `en.js` : toutes les chaînes d'interface. Les valeurs qui
  dépendent d'un nombre sont des **fonctions** et non des gabarits à trous :
  l'accord en nombre n'obéit pas aux mêmes règles d'une langue à l'autre, et une
  fonction laisse chaque traduction décider.
- `src/data/questions.fr.js` et `questions.en.js` : les deux banques, mêmes
  identifiants et mêmes niveaux.

Les banques sont **chargées à la demande** (`useQuestionBank`), donc un visiteur
ne télécharge jamais la langue qu'il ne lit pas : environ 73 Ko de code plus 14 Ko
pour une seule banque, au lieu de 88 Ko si les deux étaient empilées.

`npm run check` vérifie trois pariés qu'aucun test manuel n'attraperait :

- mêmes identifiants, mêmes catégories et mêmes niveaux entre les deux banques —
  sans quoi un joueur qui change de langue verrait ses records porter sur un jeu
  différent ;
- aucun énoncé laissé en français dans la banque anglaise ;
- mêmes clés dans les deux dictionnaires, une clé oubliée produisant sinon un
  « undefined » à l'écran, sans erreur ni avertissement.

Le sélecteur est présent sur les trois écrans. En pleine partie, changer de
langue ramène à l'accueil : la manche en cours porte des questions dans
l'ancienne langue, la poursuivre mélangerait les deux. Sur l'écran de résultat
en revanche, rien n'est perdu — le score est déjà enregistré — donc l'écran se
contente de se retraduire, et le récapitulatif se referme puisqu'il contient les
questions telles qu'elles ont été posées.

**Comment la langue est décidée, et pourquoi dans cet ordre.** L'URL fait foi.
Un choix explicite enregistré lors d'une visite précédente redirige vers la
langue correspondante ; à défaut, la page servie décide. La langue du navigateur
n'est **jamais** consultée.

Ce dernier point est délibéré : Googlebot explore le plus souvent en
`Accept-Language: en`. Le rediriger de `/` vers `/en/` empêcherait la version
française d'être indexée. Un robot n'ayant pas de `localStorage`, se fier au seul
choix explicite rend la redirection invisible pour lui.

Le prix à payer : un anglophone qui arrive pour la première fois sur `/` voit le
français, et doit cliquer sur EN. Le sélecteur est présent sur les trois écrans,
en haut de page.

Le sélecteur est fait de **vrais liens** `<a href>` vers `/` et `/en/` : un moteur
doit pouvoir suivre le chemin vers l'autre version, et un clic du milieu doit
ouvrir un onglet. Le clic simple est intercepté pour basculer sans rechargement,
via `pushState` — le bouton précédent revient donc bien à la langue précédente.

## Catégories

| Catégorie | Terrain |
| --- | --- |
| Personnages | Qui est qui dans la galaxie |
| Sagas | Des Saiyans au Tournoi du Pouvoir |
| Techniques & transformations | Kaméhaméha, Potaras, Ultra Instinct |
| Power levels | Scouters, multiplicateurs et chiffres cultes |
| Coulisses & création | Toriyama, le Jump, l'origine des noms |

Les quatre premières portent sur la fiction. La cinquième porte sur l'œuvre
elle-même : prépublication, tomes, étymologie des noms, autres travaux de
l'auteur. Ses réponses se vérifient hors de l'histoire, et elle départage
nettement le lecteur assidu du spectateur.

**Chaque catégorie a sa part de coulisses.** Une dizaine de questions par
catégorie traitent son terrain par l'envers du décor, sans quitter son thème :
l'origine des noms et les doublages pour Personnages, les tomes et les
adaptations pour Sagas, le sens des noms d'attaques pour Techniques, et pour
Power levels la raison pour laquelle l'auteur a fini par abandonner les chiffres.
Un joueur qui connaît la série par cœur peut donc encore se faire surprendre
dans sa propre catégorie de prédilection.

**Terminologie.** Les questions françaises suivent les graphies de l'édition
française sous licence — « Majin Boo » et non « Buu », « Lunch » et non
« Launch », « cyborgs » et non « androïdes », « le Tout-Puissant » pour le dieu
de la Terre. La banque anglaise garde les graphies de l'édition anglophone
(« Majin Buu », « Frieza », « Chi-Chi ») : ce sont deux banques indépendantes,
pas une traduction mot à mot.

## Ajouter des questions

Tout se passe dans `src/data/questions.fr.js` et `questions.en.js`, une entrée dans chaque. Elles ressemblent à ceci :

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

**Ne pas se déflorer soi-même.** Le feedback affiché après une réponse est lu
attentivement : s'il cite mot pour mot la bonne réponse d'une autre question de
la même catégorie, celle-ci est perdue pour le reste de la partie.
`npm run check:fuites` liste ces mentions croisées. Il reste **hors de**
`npm run check` à dessein : l'outil ne sait pas distinguer une divulgation
d'une simple mention — « Akira Toriyama » revient partout sans rien gâcher,
alors que nommer « le Black Freezer » dans une explication tuait la question qui
le demandait. C'est un rapport à relire, pas un test à faire passer.

## Niveaux

| Niveau | Questions | Composition visée | Recouvrement entre deux parties |
| --- | --- | --- | --- |
| Facile | 10 | 70 % faciles, 30 % moyennes | ~3,2 / 10 |
| Moyen | 10 | 20 % faciles, 60 % moyennes, 20 % difficiles | ~2,7 / 10 |
| Difficile | 10 | 40 % moyennes, 60 % difficiles | ~2,6 / 10 |

Chaque catégorie compte 58 questions : 19 faciles, 16 moyennes, 23 difficiles —
sauf Power levels, dont la matière se prête mieux au palier difficile (18 / 15 / 25).

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
  6,8 à 3,8 sur 10. Le dernier élargissement (48 → 58 questions par catégorie) prévoyait
  `49/19 + 9/16` = 3,14 en facile et `16/16 + 36/23` = 2,57 en difficile ; la mesure
  donne 3,18 et 2,55. La formule n'a jamais menti de plus d'un dixième.

Autrement dit, agrandir un palier n'a d'effet que sur les modes qui y puisent, et
l'effet suit une courbe en `1/p` : les premiers ajouts rapportent beaucoup, les
suivants de moins en moins.

Le script de mesure tient en quelques lignes : jouer deux manches d'affilée et
compter les identifiants communs, répété quelques centaines de fois.

## Barème pondéré

Une bonne réponse ne rapporte pas partout la même chose :

| Palier de la question | Points |
| --- | --- |
| Facile | 300 |
| Moyenne | 500 |
| Difficile | 1 000 |

Chaque manche mélange les paliers, ce qui rend le décompte brut trompeur : deux
joueurs à 5/10 n'ont pas fourni le même effort si l'un a répondu aux six questions
difficiles et l'autre aux quatre moyennes. Sur une manche difficile type
(6 × 1 000 + 4 × 500 = 8 000 points en jeu), le premier fait 5 000 points, soit
63 % — rang Super Saiyan — quand le second fait 3 000 points, soit 38 % —
rang Élève de la Tortue. `npm run check` calcule cet écart à chaque exécution :
à 5/10, le taux réel va de **38 % à 63 %** selon les questions tombées. Les bornes
sont prises sur les cinq questions les plus chères et les cinq moins chères de la
manche, et non tirées au sort — un chiffre qui bouge à chaque exécution ne vaut
rien comme repère.

Ce taux pondéré, et non plus le rapport de bonnes réponses, décide désormais du
rang, de la puissance de combat et du record. Le nombre de bonnes réponses reste
affiché partout : c'est ce qu'on annonce à un ami, les points disent ce que ça vaut.

**Compatibilité.** Les records et les parties enregistrés avant le barème n'ont
pas de points. Plutôt que de les effacer ou de leur en inventer, `ratioDe`
retombe sur leur rapport brut et l'affichage sur leur fraction. Un joueur peut
donc voir, un temps, des lignes calculées sur deux échelles ; la sienne se
recale dès sa partie suivante. Le stockage est passé en `dbq.best.v3` pour cette
raison : la forme n'a pas changé, mais le critère de comparaison si, et les deux
ne se départagent pas.

## Mode chrono

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

## Tableau des scores

En fin de partie, `ScoreTable` récapitule les records : une ligne par catégorie,
une colonne par mode. Contrairement aux cartes d'accueil, les deux modes y sont
montrés côte à côte — c'est justement le moment où voir ce qu'il reste à conquérir
donne envie de relancer une manche.

La case qui vient d'être jouée est surlignée, et porte une étoile s'il s'agit d'un
nouveau record. Les combinaisons jamais tentées affichent un tiret plutôt qu'un
zéro, qui laisserait croire à un score nul.

C'est un vrai `<table>` avec `<caption>` et `<th scope>` : la structure porte le
sens pour les lecteurs d'écran, et le conteneur reste défilant pour qu'une
traduction plus longue ne déborde jamais de la page.

## Historique des parties

`lib/history.js` tient un journal séparé des records : ceux-ci ne gardent que le
meilleur résultat, alors qu'un historique a besoin de la chronologie — **y compris
des parties ratées**, puisque c'est justement là qu'on lit sa progression.

Le journal conserve les **20 dernières parties** et `GameHistory` en affiche six.
Sans plafond, un joueur assidu finirait par saturer le quota du localStorage, et
l'écriture échouerait alors silencieusement pour tout le reste du site.

Les dates sont relatives via `Intl.RelativeTimeFormat` — « à l'instant », « il y a
5 minutes », « hier » — puis basculent sur une date courte au-delà d'une semaine,
où l'écart en jours ne dit plus rien d'utile.

Le bouton d'effacement de l'accueil vide les deux stockages à la fois, et son
libellé le dit explicitement.

## Partage du score

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

## Domaine et hébergement

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

## Repli sur un hébergement classique

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
dist/en/index.html   → www/en/index.html
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
- `vite.config.js` utilise `base: '/'` : le site doit vivre à la racine du domaine.
  Il sert deux pages à des profondeurs différentes (`/` et `/en/`) qui partagent
  les mêmes assets, ce que des chemins relatifs rendraient impossible.
- Aucune règle de réécriture n'est nécessaire : le site est une page unique.
