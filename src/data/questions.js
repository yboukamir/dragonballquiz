/**
 * Banque de questions — 80 questions originales rédigées pour ce site.
 *
 * Convention d'écriture : `a[0]` est TOUJOURS la bonne réponse.
 * Les propositions sont mélangées à l'exécution (voir `src/lib/quiz.js`),
 * ce qui rend le fichier beaucoup plus simple à relire et à corriger.
 *
 * diff : 1 = facile · 2 = moyen · 3 = difficile
 * why  : explication affichée dans le feedback après la réponse.
 *
 * Pour ajouter une traduction plus tard : dupliquer `q` / `a` / `why` en
 * `q_en` / `a_en` / `why_en` et brancher un sélecteur dans `lib/quiz.js`.
 */

export const CATEGORIES = [
  {
    id: 'personnages',
    label: 'Personnages',
    tagline: 'Qui est qui dans la galaxie',
    accent: 'orange',
  },
  {
    id: 'sagas',
    label: 'Sagas',
    tagline: 'Des Saiyans au Tournoi du Pouvoir',
    accent: 'cobalt',
  },
  {
    id: 'techniques',
    label: 'Techniques & transformations',
    tagline: 'Kaméhaméha, Potaras, Ultra Instinct',
    accent: 'ki',
  },
  {
    id: 'power',
    label: 'Power levels',
    tagline: 'Scouters, multiplicateurs et chiffres cultes',
    accent: 'crimson',
  },
]

export const QUESTIONS = [
  /* ---------------------------------------------------------------
     PERSONNAGES
  --------------------------------------------------------------- */
  {
    id: 'pe01', cat: 'personnages', diff: 1,
    q: "Quel est le nom saiyan de Son Goku ?",
    a: ["Kakarot", "Raditz", "Turles", "Bardock"],
    why: "Ses parents Bardock et Gine le nomment ainsi avant son envoi sur Terre.",
  },
  {
    id: 'pe02', cat: 'personnages', diff: 1,
    q: "Qui est l'épouse de Son Goku ?",
    a: ["Chichi", "Bulma", "Videl", "Launch"],
    why: "Fille du Gyumao, elle lui arrache une promesse de mariage lors d'un Tenkaichi Budokai.",
  },
  {
    id: 'pe03', cat: 'personnages', diff: 1,
    q: "Qui est le père de Trunks ?",
    a: ["Vegeta", "Yamcha", "Ten Shin Han", "Krilin"],
    why: "Trunks est le fils de Vegeta et de Bulma.",
  },
  {
    id: 'pe04', cat: 'personnages', diff: 1,
    q: "À quelle race appartient Piccolo ?",
    a: ["Les Nameks", "Les Saiyans", "Les Majins", "Les Kaioshins"],
    why: "Envoyé enfant sur Terre, il ignore longtemps ses propres origines.",
  },
  {
    id: 'pe05', cat: 'personnages', diff: 1,
    q: "Quel ami d'enfance de Goku, petit et chauve, s'entraîne avec lui chez Tortue Géniale ?",
    a: ["Krilin", "Yamcha", "Yajirobé", "Oolong"],
    why: "Krilin restera son meilleur ami sur toute la série.",
  },
  {
    id: 'pe06', cat: 'personnages', diff: 1,
    q: "Qui est le Dieu de la Destruction de l'univers 7 ?",
    a: ["Beerus", "Whis", "Zeno", "Champa"],
    why: "Champa est son frère jumeau, mais il règne sur l'univers 6.",
  },
  {
    id: 'pe07', cat: 'personnages', diff: 2,
    q: "Comment s'appelle le grand-père adoptif de Goku ?",
    a: ["Son Gohan", "Gyumao", "Karin", "Muten Roshi"],
    why: "Goku donnera ce prénom à son propre fils aîné, en hommage.",
  },
  {
    id: 'pe08', cat: 'personnages', diff: 2,
    q: "Qui est le frère aîné de Goku ?",
    a: ["Raditz", "Turles", "Nappa", "Tarble"],
    why: "Tarble est le frère de Vegeta, pas celui de Goku.",
  },
  {
    id: 'pe09', cat: 'personnages', diff: 2,
    q: "Quel ange accompagne et entraîne Beerus ?",
    a: ["Whis", "Vados", "Merus", "Le Grand Prêtre"],
    why: "Vados occupe exactement le même rôle auprès de Champa, dans l'univers 6.",
  },
  {
    id: 'pe10', cat: 'personnages', diff: 2,
    q: "Comment s'appelle la mère biologique de Goku ?",
    a: ["Gine", "Fasha", "Celipa", "Panbukin"],
    why: "Gine apparaît dans Dragon Ball Minus, puis dans le film Broly de 2018.",
  },
  {
    id: 'pe11', cat: 'personnages', diff: 2,
    q: "Quel est le nom japonais de Tortue Géniale ?",
    a: ["Muten Roshi", "Karin", "Shen", "Kaio"],
    why: "Littéralement « le vieux maître invincible ».",
  },
  {
    id: 'pe12', cat: 'personnages', diff: 2,
    q: "Quel guerrier naît de la fusion de Goten et Trunks ?",
    a: ["Gotenks", "Gogeta", "Vegetto", "Gohanks"],
    why: "Gogeta et Vegetto sont eux issus de la fusion de Goku et Vegeta.",
  },
  {
    id: 'pe13', cat: 'personnages', diff: 2,
    q: "Qui est la sœur jumelle de C-17 ?",
    a: ["C-18", "C-21", "C-16", "C-19"],
    why: "Tous deux étaient des humains avant les modifications du Dr Gero.",
  },
  {
    id: 'pe14', cat: 'personnages', diff: 2,
    q: "Qui est le père biologique de Goku ?",
    a: ["Bardock", "Nappa", "Paragus", "Toma"],
    why: "Bardock est un soldat saiyan de classe inférieure, au service de Freezer.",
  },
  {
    id: 'pe15', cat: 'personnages', diff: 3,
    q: "Quel bras droit de Freezer, à la peau verte et aux longs cheveux, se mue en créature monstrueuse ?",
    a: ["Zarbon", "Dodoria", "Cui", "Jeece"],
    why: "Sa transformation lui coûte son élégance… et finalement la vie, face à Vegeta.",
  },
  {
    id: 'pe16', cat: 'personnages', diff: 3,
    q: "Comment s'appelle la fille de Vegeta et Bulma ?",
    a: ["Bra", "Pan", "Marron", "Videl"],
    why: "Pan est la fille de Gohan et Videl : les deux naissances sont très proches.",
  },
  {
    id: 'pe17', cat: 'personnages', diff: 3,
    q: "Quelle Saiyan de l'univers 6 atteint le Super Saiyan pendant le Tournoi du Pouvoir ?",
    a: ["Caulifla", "Vados", "Ribrianne", "Heles"],
    why: "Sa protégée Kale y parvient aussi, dans une version berserk incontrôlable.",
  },
  {
    id: 'pe18', cat: 'personnages', diff: 3,
    q: "Qui dirige les Pride Troopers de l'univers 11 ?",
    a: ["Toppo", "Jiren", "Dyspo", "Kahseral"],
    why: "Jiren en est le membre le plus puissant, mais le chef reste Toppo.",
  },
  {
    id: 'pe19', cat: 'personnages', diff: 3,
    q: "Quel personnage était scellé dans l'épée Z depuis des générations ?",
    a: ["Le Vieux Kaioshin", "Kibito", "Gowasu", "Shin"],
    why: "Libéré par Gohan, il éveille en échange le potentiel caché du jeune Saiyan.",
  },
  {
    id: 'pe20', cat: 'personnages', diff: 3,
    q: "Comment s'appelle la fille de Krilin et C-18 ?",
    a: ["Marron", "Maron", "Pan", "Bra"],
    why: "À ne pas confondre avec Maron, une ancienne petite amie de Krilin.",
  },

  /* ---------------------------------------------------------------
     SAGAS
  --------------------------------------------------------------- */
  {
    id: 'sa01', cat: 'sagas', diff: 1,
    q: "Sur quelle planète se déroule la course aux Dragon Balls face à Freezer ?",
    a: ["Namek", "Vegeta", "La Terre", "Sadala"],
    why: "Les boules y sont bien plus grandes, et le dragon s'y appelle Porunga.",
  },
  {
    id: 'sa02', cat: 'sagas', diff: 1,
    q: "Qui tue Krilin sur Namek, déclenchant la première transformation de Goku en Super Saiyan ?",
    a: ["Freezer", "Vegeta", "Dodoria", "Le capitaine Ginyu"],
    why: "C'est la colère née de cette mort qui fait basculer Goku.",
  },
  {
    id: 'sa03', cat: 'sagas', diff: 1,
    q: "Comment s'appelle le grand tournoi d'arts martiaux récurrent de la série ?",
    a: ["Le Tenkaichi Budokai", "Le Cell Game", "Le Tournoi du Pouvoir", "La Coupe de Namek"],
    why: "Littéralement « le tournoi des arts martiaux du plus fort sous le ciel ».",
  },
  {
    id: 'sa04', cat: 'sagas', diff: 1,
    q: "Dans Dragon Ball Super, quel tournoi met en jeu la survie des univers perdants ?",
    a: ["Le Tournoi du Pouvoir", "Le Tenkaichi Budokai", "Le Cell Game", "Le tournoi de Champa"],
    why: "Zeno efface purement et simplement les univers éliminés.",
  },
  {
    id: 'sa05', cat: 'sagas', diff: 1,
    q: "Qui détruit la planète Vegeta ?",
    a: ["Freezer", "Beerus", "Broly", "Cooler"],
    why: "Il redoutait la légende du Super Saiyan et la montée en puissance de son armée.",
  },
  {
    id: 'sa06', cat: 'sagas', diff: 1,
    q: "Quel ennemi organise un tournoi portant son propre nom pour défier les guerriers Z ?",
    a: ["Cell", "Babidi", "Freezer", "Piccolo Daimao"],
    why: "Le Cell Game est retransmis à la télévision devant le monde entier.",
  },
  {
    id: 'sa07', cat: 'sagas', diff: 2,
    q: "Comment s'appelle le commando d'élite de Freezer, composé de cinq membres ?",
    a: ["Le Commando Ginyu", "Les Pride Troopers", "L'Armée du Ruban Rouge", "Les Saibaimen"],
    why: "Ils sont surtout restés célèbres pour leurs poses de présentation.",
  },
  {
    id: 'sa08', cat: 'sagas', diff: 2,
    q: "Quels androïdes Cell doit-il absorber pour atteindre sa forme parfaite ?",
    a: ["C-17 et C-18", "C-16 et C-17", "C-19 et C-20", "C-18 et C-16"],
    why: "C-16 n'entre pas dans sa conception : il est de fabrication purement mécanique.",
  },
  {
    id: 'sa09', cat: 'sagas', diff: 2,
    q: "Qui porte le coup fatal à Cell sous sa forme parfaite ?",
    a: ["Gohan", "Goku", "Vegeta", "Trunks"],
    why: "Gohan en Super Saiyan 2, après que Vegeta a créé l'ouverture décisive.",
  },
  {
    id: 'sa10', cat: 'sagas', diff: 2,
    q: "Quel personnage venu du futur prévient Goku qu'une maladie cardiaque va l'emporter ?",
    a: ["Trunks", "Goten", "Gohan", "Tapion"],
    why: "Il apporte aussi le remède, ce qui change tout le cours de la chronologie.",
  },
  {
    id: 'sa11', cat: 'sagas', diff: 2,
    q: "Quel sorcier orchestre le réveil de Majin Buu ?",
    a: ["Babidi", "Bibidi", "Dabra", "Yakon"],
    why: "Dabra, roi du monde des démons, n'est que son homme de main.",
  },
  {
    id: 'sa12', cat: 'sagas', diff: 2,
    q: "Qui a créé Majin Buu à l'origine ?",
    a: ["Bibidi", "Babidi", "Dabra", "Le Grand Kaioshin"],
    why: "Bibidi est le père de Babidi : le fils ne fait que réveiller la créature.",
  },
  {
    id: 'sa13', cat: 'sagas', diff: 2,
    q: "Quelle organisation, dirigée par le Commandant Red, affronte Goku enfant ?",
    a: ["L'Armée du Ruban Rouge", "L'armée de Freezer", "La Patrouille Galactique", "Le Commando Ginyu"],
    why: "Le Dr Gero en est un rescapé : les androïdes seront sa vengeance.",
  },
  {
    id: 'sa14', cat: 'sagas', diff: 2,
    q: "Quel roi démon, vaincu par Goku enfant, est directement lié à la naissance de Piccolo ?",
    a: ["Piccolo Daimao", "Kami-Sama", "Garlic Jr", "Tao Pai Pai"],
    why: "Le Piccolo que l'on connaît est son descendant, engendré juste avant sa mort.",
  },
  {
    id: 'sa15', cat: 'sagas', diff: 2,
    q: "Quel jeune Namek devient le nouveau Dieu de la Terre après l'arc Freezer ?",
    a: ["Dendé", "Nail", "Cargo", "Muri"],
    why: "Il crée de nouvelles Dragon Balls terrestres, nettement plus puissantes.",
  },
  {
    id: 'sa16', cat: 'sagas', diff: 3,
    q: "Combien d'univers s'affrontent lors du Tournoi du Pouvoir ?",
    a: ["8", "12", "10", "7"],
    why: "Il existe 12 univers, mais seuls les 8 au plus faible niveau mortel concourent.",
  },
  {
    id: 'sa17', cat: 'sagas', diff: 3,
    q: "Quel univers est éliminé en premier du Tournoi du Pouvoir ?",
    a: ["L'univers 9", "L'univers 10", "L'univers 4", "L'univers 2"],
    why: "L'équipe du Trio de Danger tombe la première, sous les yeux de tous.",
  },
  {
    id: 'sa18', cat: 'sagas', diff: 3,
    q: "Qui décide de l'organisation du Tournoi du Pouvoir ?",
    a: ["Zeno", "Beerus", "Le Grand Prêtre", "Whis"],
    why: "Le Grand Prêtre se contente d'en fixer les règles et de l'arbitrer.",
  },
  {
    id: 'sa19', cat: 'sagas', diff: 3,
    q: "Quel Kaioshin s'empare du corps de Goku pour devenir Goku Black ?",
    a: ["Zamasu", "Gowasu", "Shin", "Kibito"],
    why: "Il utilise les Super Dragon Balls pour échanger son corps contre celui de Goku.",
  },
  {
    id: 'sa20', cat: 'sagas', diff: 3,
    q: "Quel androïde tente de s'autodétruire pour éliminer Cell, sans savoir que sa bombe a été retirée ?",
    a: ["C-16", "C-17", "C-18", "C-19"],
    why: "Bulma l'avait désamorcée pendant les réparations : le sacrifice échoue.",
  },

  /* ---------------------------------------------------------------
     TECHNIQUES & TRANSFORMATIONS
  --------------------------------------------------------------- */
  {
    id: 'te01', cat: 'techniques', diff: 1,
    q: "Quelle attaque emblématique Goku charge-t-il à deux mains sur le côté ?",
    a: ["Le Kaméhaméha", "Le Galick Gun", "Le Makankosappo", "Le Final Flash"],
    why: "Technique inventée par Tortue Géniale, qui a mis cinquante ans à la mettre au point.",
  },
  {
    id: 'te02', cat: 'techniques', diff: 1,
    q: "Quelle transformation dresse les cheveux du guerrier et les teint en doré ?",
    a: ["Le Super Saiyan", "Le Kaio-ken", "L'Ultra Instinct", "Le Super Saiyan Blue"],
    why: "Longtemps considérée comme une simple légende chez les Saiyans.",
  },
  {
    id: 'te03', cat: 'techniques', diff: 1,
    q: "Quelle technique permet à Goku de se déplacer instantanément vers une source de ki ?",
    a: ["La Téléportation", "Le Kaio-ken", "Le Mafuba", "Le Zenkai"],
    why: "Apprise sur la planète Yardrat, pendant son retour de Namek.",
  },
  {
    id: 'te04', cat: 'techniques', diff: 1,
    q: "Quelle attaque rassemble l'énergie de tous les êtres vivants alentour ?",
    a: ["Le Genkidama", "Le Kienzan", "Le Kikoho", "Le Big Bang Attack"],
    why: "Enseignée par Kaio du Nord ; sa charge très longue impose d'être protégé.",
  },
  {
    id: 'te05', cat: 'techniques', diff: 1,
    q: "Quelle forme aux cheveux argentés et à l'aura étrangement calme Goku atteint-il au Tournoi du Pouvoir ?",
    a: ["L'Ultra Instinct", "Le Super Saiyan 3", "Le Super Saiyan Rosé", "Le Super Saiyan God"],
    why: "Le corps y réagit seul, sans que la pensée n'intervienne.",
  },
  {
    id: 'te06', cat: 'techniques', diff: 1,
    q: "En quoi se transforme un Saiyan ayant gardé sa queue lorsqu'il regarde la pleine lune ?",
    a: ["Un Ozaru, singe géant", "Un Super Saiyan", "Un Majin", "Un Ultra Instinct"],
    why: "C'est pour cette raison que la queue de Goku est coupée à plusieurs reprises.",
  },
  {
    id: 'te07', cat: 'techniques', diff: 2,
    q: "Quelle attaque Vegeta emploie-t-il lors de son premier affrontement contre Goku sur Terre ?",
    a: ["Le Galick Gun", "Le Final Flash", "Le Big Bang Attack", "Le Kaméhaméha"],
    why: "Goku la repousse avec un Kaméhaméha amplifié par le Kaio-ken.",
  },
  {
    id: 'te08', cat: 'techniques', diff: 2,
    q: "Quelle technique de Ten Shin Han se lance en formant un triangle avec les mains ?",
    a: ["Le Kikoho", "Le Taiyoken", "Le Kienzan", "Le Dodonpa"],
    why: "Elle puise dans l'énergie vitale : chaque tir abrège la vie de son utilisateur.",
  },
  {
    id: 'te09', cat: 'techniques', diff: 2,
    q: "Quel rayon perforant Piccolo charge-t-il sur deux doigts posés au front ?",
    a: ["Le Makankosappo", "Le Masenko", "Le Kikoho", "Le Death Beam"],
    why: "Sa charge est lente, mais il traverse presque n'importe quelle défense.",
  },
  {
    id: 'te10', cat: 'techniques', diff: 2,
    q: "Quelle technique multiplie temporairement la puissance au prix de lourds dégâts corporels ?",
    a: ["Le Kaio-ken", "Le Zenkai", "Le Genkidama", "Le Mafuba"],
    why: "Enseignée par Kaio du Nord, elle se cumule avec d'autres transformations.",
  },
  {
    id: 'te11', cat: 'techniques', diff: 2,
    q: "Quel accessoire porté à l'oreille permet une fusion entre deux combattants ?",
    a: ["Les Potaras", "La ceinture de Metamor", "Le scouter", "Le haricot magique"],
    why: "Réservés aux Kaioshins ; chez les mortels, la fusion finit par se dissiper.",
  },
  {
    id: 'te12', cat: 'techniques', diff: 2,
    q: "Quelle forme Vegeta obtient-il de Babidi, marquée d'un M sur le front ?",
    a: ["Majin Vegeta", "Super Vegeta", "Le Super Saiyan Blue Evolution", "Le Super Saiyan 4"],
    why: "Il accepte le contrôle du sorcier en espérant retrouver son instinct de combattant.",
  },
  {
    id: 'te13', cat: 'techniques', diff: 2,
    q: "Quelle forme aux cheveux rouges précède le Super Saiyan Blue ?",
    a: ["Le Super Saiyan God", "Le Super Saiyan 3", "Le Super Saiyan Rosé", "Le Golden Freezer"],
    why: "Obtenue lors d'un rituel réunissant six Saiyans au cœur pur.",
  },
  {
    id: 'te14', cat: 'techniques', diff: 2,
    q: "Combien de temps dure au maximum la fusion obtenue par la danse ?",
    a: ["30 minutes", "5 minutes", "1 heure", "Elle est permanente"],
    why: "Et la durée chute encore si le fusionné adopte une forme trop puissante.",
  },
  {
    id: 'te15', cat: 'techniques', diff: 3,
    q: "Le Super Saiyan Blue combine le Super Saiyan et quel autre état ?",
    a: ["Le Super Saiyan God", "L'Ultra Instinct", "Le Kaio-ken", "La forme Ozaru"],
    why: "D'où son nom complet : Super Saiyan God Super Saiyan.",
  },
  {
    id: 'te16', cat: 'techniques', diff: 3,
    q: "Quelle technique de Krilin découpe l'adversaire à l'aide d'un disque d'énergie ?",
    a: ["Le Kienzan", "Le Taiyoken", "Le Masenko", "Le Kikoho"],
    why: "Sa puissance de coupe rend même Freezer et Nappa prudents.",
  },
  {
    id: 'te17', cat: 'techniques', diff: 3,
    q: "Quelle technique de scellement coûte la vie à celui qui l'exécute ?",
    a: ["Le Mafuba", "Le Kienzan", "Le Genkidama", "Le Taiyoken"],
    why: "Elle enferme la cible dans un récipient ; Tortue Géniale y laisse la vie.",
  },
  {
    id: 'te18', cat: 'techniques', diff: 3,
    q: "Quelle transformation Gohan débloque-t-il dans le film Super Hero (2022) ?",
    a: ["Le Gohan Beast", "L'Ultime Gohan", "Le Super Saiyan 4", "Le Super Saiyan Rosé"],
    why: "Déclenchée par la mise en scène de Piccolo, qui feint sa propre défaite.",
  },
  {
    id: 'te19', cat: 'techniques', diff: 3,
    q: "Quelle forme dorée Freezer révèle-t-il dans La Résurrection de F ?",
    a: ["Le Golden Freezer", "Le Black Freezer", "Meta-Cooler", "Freezer Ultime"],
    why: "Le Black Freezer, lui, n'apparaît que bien plus tard dans le manga Super.",
  },
  {
    id: 'te20', cat: 'techniques', diff: 3,
    q: "Quelle technique aveugle l'adversaire par un flash lumineux intense ?",
    a: ["Le Taiyoken", "Le Kienzan", "Le Dodonpa", "Le Mafuba"],
    why: "Littéralement « le poing du soleil » : Krilin en fait un usage très régulier.",
  },

  /* ---------------------------------------------------------------
     POWER LEVELS
  --------------------------------------------------------------- */
  {
    id: 'po01', cat: 'power', diff: 1,
    q: "Quel appareil les soldats de Freezer utilisent-ils pour mesurer une puissance de combat ?",
    a: ["Le scouter", "Le haricot magique", "La Potara", "La capsule Hoi-Poi"],
    why: "Il sert aussi de radio : c'est autant un outil de mesure que de communication.",
  },
  {
    id: 'po02', cat: 'power', diff: 1,
    q: "Comment appelle-t-on l'énergie vitale que les guerriers apprennent à percevoir sans appareil ?",
    a: ["Le ki", "Le zenkai", "Le kiai", "Le makai"],
    why: "Savoir la masquer volontairement rend d'ailleurs les scouters inutiles.",
  },
  {
    id: 'po03', cat: 'power', diff: 1,
    q: "Quelle puissance de combat le scouter de Raditz attribue-t-il à un simple fermier terrien ?",
    a: ["5", "50", "1", "100"],
    why: "C'est l'étalon de référence de la série pour un humain ordinaire.",
  },
  {
    id: 'po04', cat: 'power', diff: 1,
    q: "Quelle est la puissance de combat de Raditz lors de son arrivée sur Terre ?",
    a: ["1 500", "500", "9 000", "250"],
    why: "Largement au-dessus de Goku et Piccolo, contraints de s'allier contre lui.",
  },
  {
    id: 'po05', cat: 'power', diff: 1,
    q: "Quel objet rend instantanément toute son énergie à un combattant blessé ?",
    a: ["Le haricot magique (senzu)", "Le scouter", "La Potara", "L'eau sacrée"],
    why: "Cultivé par Karin en haut de sa tour, en quantité toujours très limitée.",
  },
  {
    id: 'po06', cat: 'power', diff: 2,
    q: "Quelle puissance le scouter de Raditz affiche-t-il pour Goku lors de leur rencontre ?",
    a: ["334", "1 500", "710", "180"],
    why: "Un chiffre dérisoire face aux 1 500 de son propre frère.",
  },
  {
    id: 'po07', cat: 'power', diff: 2,
    q: "Quelle puissance de combat le scouter attribue-t-il à Piccolo face à Raditz ?",
    a: ["322", "408", "260", "1 220"],
    why: "Presque au niveau de Goku : d'où l'alliance forcée entre les deux rivaux.",
  },
  {
    id: 'po08', cat: 'power', diff: 2,
    q: "Quelle est la puissance de combat de Nappa à son arrivée sur Terre ?",
    a: ["4 000", "1 800", "18 000", "9 000"],
    why: "Assez pour écraser à lui seul presque tous les guerriers Z réunis.",
  },
  {
    id: 'po09', cat: 'power', diff: 2,
    q: "Quelle est la puissance de combat de Vegeta à son arrivée sur Terre ?",
    a: ["18 000", "8 000", "24 000", "4 000"],
    why: "Soit plus de quatre fois celle de Nappa, son propre garde du corps.",
  },
  {
    id: 'po10', cat: 'power', diff: 2,
    q: "Comment nomme-t-on la capacité des Saiyans à devenir plus forts après avoir frôlé la mort ?",
    a: ["Le Zenkai", "Le Kaio-ken", "L'Ultra Instinct", "Le Ozaru"],
    why: "C'est ce qui rend Vegeta si dangereux après chaque défaite encaissée.",
  },
  {
    id: 'po11', cat: 'power', diff: 2,
    q: "Quelle est la puissance de Freezer sous sa première forme ?",
    a: ["530 000", "120 000", "1 000 000", "53 000"],
    why: "Un chiffre annoncé comme définitif… avant trois transformations supplémentaires.",
  },
  {
    id: 'po12', cat: 'power', diff: 2,
    q: "Par combien la transformation en Super Saiyan multiplie-t-elle la puissance de base ?",
    a: ["50", "10", "100", "20"],
    why: "Multiplicateur canonique de la série : x50 par rapport à l'état normal.",
  },
  {
    id: 'po13', cat: 'power', diff: 3,
    q: "Quelle puissance atteint Freezer sous sa forme finale à 100 % ?",
    a: ["120 000 000", "12 000 000", "530 000 000", "60 000 000"],
    why: "Soit plus de deux cents fois sa première forme, déjà jugée insurmontable.",
  },
  {
    id: 'po14', cat: 'power', diff: 3,
    q: "Par combien le Super Saiyan 2 multiplie-t-il la puissance de base ?",
    a: ["100", "50", "200", "400"],
    why: "Exactement le double du Super Saiyan classique.",
  },
  {
    id: 'po15', cat: 'power', diff: 3,
    q: "Par combien le Super Saiyan 3 multiplie-t-il la puissance de base ?",
    a: ["400", "100", "1 000", "200"],
    why: "D'où sa consommation d'énergie phénoménale, intenable plus de quelques minutes.",
  },
  {
    id: 'po16', cat: 'power', diff: 3,
    q: "Quelle puissance de combat est attribuée à Bardock, le père de Goku ?",
    a: ["10 000", "1 500", "4 000", "22 000"],
    why: "Élevée pour un Saiyan de classe inférieure, dérisoire face à Freezer.",
  },
  {
    id: 'po17', cat: 'power', diff: 3,
    q: "Quel pic de puissance Gohan enfant atteint-il sous le coup de la colère, face à Raditz ?",
    a: ["1 307", "710", "2 800", "980"],
    why: "Un pic bref, mais supérieur à Raditz lui-même : le scouter n'y croit pas.",
  },
  {
    id: 'po18', cat: 'power', diff: 3,
    q: "Quel niveau de Kaio-ken Goku atteint-il contre Freezer, sur Namek ?",
    a: ["x20", "x10", "x4", "x100"],
    why: "Un record pour lui, au prix de dégâts internes considérables.",
  },
  {
    id: 'po19', cat: 'power', diff: 3,
    q: "En version originale, quel chiffre Vegeta annonce-t-il pour Goku avant que son scouter n'explose ?",
    a: ["Plus de 8 000", "Plus de 9 000", "Plus de 5 000", "Plus de 12 000"],
    why: "Le célèbre « It's over 9000 ! » vient du doublage américain : l'original dit 8 000.",
  },
  {
    id: 'po20', cat: 'power', diff: 3,
    q: "Combien de temps Freezer annonce-t-il avant l'explosion de la planète Namek ?",
    a: ["5 minutes", "10 minutes", "1 heure", "30 minutes"],
    why: "Cinq minutes qui, à l'écran, se sont tout de même un peu étirées…",
  },
]

export const QUESTIONS_BY_CATEGORY = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = QUESTIONS.filter((q) => q.cat === c.id)
  return acc
}, {})
