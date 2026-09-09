/**
 * Banque de questions — 152 questions originales rédigées pour ce site.
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

  {
    id: 'pe21', cat: 'personnages', diff: 1,
    q: "Comment s'appelle le second fils de Goku et Chichi ?",
    a: ["Goten", "Gohan", "Trunks", "Tarble"],
    why: "Né pendant les sept années où Goku est mort, il ne connaîtra son père que plus tard.",
  },
  {
    id: 'pe22', cat: 'personnages', diff: 1,
    q: "Quel ancien bandit du désert voyage accompagné du chat métamorphe Puar ?",
    a: ["Yamcha", "Ten Shin Han", "Yajirobé", "Oolong"],
    why: "Il détroussait les voyageurs avant de croiser la route de Goku et Bulma.",
  },
  {
    id: 'pe23', cat: 'personnages', diff: 2,
    q: "Quel guerrier à trois yeux, formé par Tsuru Sennin, finit par rejoindre les guerriers Z ?",
    a: ["Ten Shin Han", "Chaozu", "Yajirobé", "Tao Pai Pai"],
    why: "Il rompt avec l'école de la Grue après son combat contre Goku.",
  },
  {
    id: 'pe24', cat: 'personnages', diff: 2,
    q: "Quelle fille de Mr Satan finit par épouser Son Gohan ?",
    a: ["Videl", "Erasa", "Angela", "Marron"],
    why: "Elle apprend à voler auprès de lui avant le 25e Tenkaichi Budokai.",
  },
  {
    id: 'pe25', cat: 'personnages', diff: 2,
    q: "Quel scientifique conçoit les androïdes pour se venger de Goku ?",
    a: ["Le Dr Gero", "Le Dr Brief", "Babidi", "Bulma"],
    why: "Ancien de l'Armée du Ruban Rouge, il se transforme lui-même en C-20.",
  },
  {
    id: 'pe26', cat: 'personnages', diff: 2,
    q: "Quel membre du Commando Ginyu peut échanger son corps avec celui d'un adversaire ?",
    a: ["Le capitaine Ginyu", "Jeece", "Burter", "Recoome"],
    why: "La manœuvre finit par se retourner contre lui : il termine dans le corps d'une grenouille.",
  },
  {
    id: 'pe27', cat: 'personnages', diff: 3,
    q: "Quel Namek fusionne avec Piccolo sur Namek, décuplant sa puissance ?",
    a: ["Nail", "Dendé", "Cargo", "Muri"],
    why: "Garde du corps du doyen, il propose lui-même la fusion après avoir été laissé pour mort.",
  },
  {
    id: 'pe28', cat: 'personnages', diff: 3,
    q: "Quel jeune Saiyan de l'univers 6 est entraîné par Vegeta en personne ?",
    a: ["Cabba", "Cauliflita", "Renso", "Tarble"],
    why: "Vegeta le pousse au Super Saiyan en le mettant délibérément en colère.",
  },
  {
    id: 'pe29', cat: 'personnages', diff: 3,
    q: "Comment s'appelle le frère cadet de Vegeta ?",
    a: ["Tarble", "Raditz", "Turles", "Paragus"],
    why: "Trop faible pour l'armée de Freezer, il avait été envoyé sur une planète lointaine.",
  },
  {
    id: 'pe30', cat: 'personnages', diff: 3,
    q: "Quel Kaioshin, maître de Zamasu, est assassiné par son propre apprenti ?",
    a: ["Gowasu", "Shin", "Kibito", "Le Vieux Kaioshin"],
    why: "Zamasu le tue pour s'emparer de sa Potara, dans l'univers 10.",
  },

  {
    id: 'pe31', cat: 'personnages', diff: 1,
    q: "Quelle inventrice de génie part avec Goku à la recherche des Dragon Balls ?",
    a: ["Bulma", "Chichi", "Launch", "Videl"],
    why: "Sa famille dirige la Capsule Corporation, ce qui lui donne des moyens illimités.",
  },
  {
    id: 'pe32', cat: 'personnages', diff: 1,
    q: "Qui vit à Kame House, la maison rose bâtie sur une petite île ?",
    a: ["Tortue Géniale", "Karin", "Mr Popo", "Kaio du Nord"],
    why: "Krilin et C-18 finiront par s'y installer avec lui.",
  },
  {
    id: 'pe33', cat: 'personnages', diff: 1,
    q: "Quel cochon capable de se métamorphoser accompagne Bulma et Goku ?",
    a: ["Oolong", "Puar", "Karin", "Yajirobé"],
    why: "Il ne tient sa forme que cinq minutes, séquelle d'une école buissonnière.",
  },
  {
    id: 'pe34', cat: 'personnages', diff: 1,
    q: "Quel chat blanc, au sommet d'une tour immense, cultive les haricots magiques ?",
    a: ["Karin", "Puar", "Mr Popo", "Oolong"],
    why: "Sa tour se dresse juste sous le Palais céleste.",
  },
  {
    id: 'pe35', cat: 'personnages', diff: 1,
    q: "Qui assiste le Dieu de la Terre au Palais céleste ?",
    a: ["Mr Popo", "Karin", "Dendé", "Yajirobé"],
    why: "Il y entretient les jardins et veille sur la Salle de l'Esprit et du Temps.",
  },
  {
    id: 'pe36', cat: 'personnages', diff: 1,
    q: "Quel Saiyan chauve et massif débarque sur Terre aux côtés de Vegeta ?",
    a: ["Nappa", "Raditz", "Turles", "Broly"],
    why: "Vegeta l'élimine lui-même dès qu'il le juge devenu inutile.",
  },
  {
    id: 'pe37', cat: 'personnages', diff: 1,
    q: "Quelle créature rose est née de la magie du sorcier Bibidi ?",
    a: ["Majin Buu", "Dabra", "Cell", "Yakon"],
    why: "Bibidi l'avait scellée dans un cocon avant que son fils Babidi ne la réveille.",
  },
  {
    id: 'pe38', cat: 'personnages', diff: 1,
    q: "Quel petit compagnon au visage blanc ne quitte jamais Ten Shin Han ?",
    a: ["Chaozu", "Puar", "Oolong", "Mr Popo"],
    why: "Il se sacrifie contre Nappa en tentant de s'autodétruire.",
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
    id: 'sa15', cat: 'sagas', diff: 3,
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

  {
    id: 'sa21', cat: 'sagas', diff: 1,
    q: "Combien de Dragon Balls faut-il réunir pour invoquer le dragon ?",
    a: ["Sept", "Cinq", "Quatre", "Dix"],
    why: "Une fois le vœu exaucé, elles se dispersent et redeviennent des pierres pendant un an.",
  },
  {
    id: 'sa22', cat: 'sagas', diff: 1,
    q: "Comment s'appelle le dragon invoqué par les Dragon Balls terrestres ?",
    a: ["Shenron", "Porunga", "Zalama", "Icarus"],
    why: "Porunga est son équivalent namek, capable d'exaucer trois vœux au lieu d'un.",
  },
  {
    id: 'sa23', cat: 'sagas', diff: 2,
    q: "À combien de temps extérieur correspond une année passée dans la Salle de l'Esprit et du Temps ?",
    a: ["Un jour", "Une semaine", "Un mois", "Une heure"],
    why: "D'où son intérêt avant le Cell Game : un an d'entraînement en une seule journée.",
  },
  {
    id: 'sa24', cat: 'sagas', diff: 2,
    q: "Auprès de qui Goku s'entraîne-t-il après sa mort face à Raditz ?",
    a: ["Kaio du Nord", "Tortue Géniale", "Karin", "Le Vieux Kaioshin"],
    why: "Il y apprend le Kaio-ken et le Genkidama, au bout du long Chemin du Serpent.",
  },
  {
    id: 'sa25', cat: 'sagas', diff: 2,
    q: "Quelles créatures vertes les Saiyans font-ils pousser pour servir de combattants jetables ?",
    a: ["Les Saibaimen", "Les Namekseijin", "Les Majins", "Les Sabaiens"],
    why: "L'un d'eux tue Yamcha en s'autodétruisant contre lui.",
  },
  {
    id: 'sa26', cat: 'sagas', diff: 2,
    q: "À qui le monde attribue-t-il la victoire sur Cell ?",
    a: ["Mr Satan", "Gohan", "Goku", "Trunks"],
    why: "Gohan laisse volontiers la gloire au champion, ce qui arrange tout le monde.",
  },
  {
    id: 'sa27', cat: 'sagas', diff: 3,
    q: "Qui remporte le 23e Tenkaichi Budokai, celui qui oppose Goku à Piccolo ?",
    a: ["Goku", "Piccolo", "Ten Shin Han", "Krilin"],
    why: "Sa première victoire au tournoi, après deux finales perdues.",
  },
  {
    id: 'sa28', cat: 'sagas', diff: 3,
    q: "Quel ennemi propre à l'anime tente de répandre une brume qui asservit l'humanité ?",
    a: ["Garlic Jr", "Cooler", "Turles", "Lord Slug"],
    why: "Son arc n'existe que dans l'anime : il est absent du manga d'origine.",
  },
  {
    id: 'sa29', cat: 'sagas', diff: 3,
    q: "Quelle forme de Majin Buu absorbe Gotenks et Piccolo ?",
    a: ["Super Buu", "Kid Buu", "Buu le gros", "Majin Buu originel"],
    why: "Chaque absorption modifie sa silhouette et décuple son intelligence.",
  },
  {
    id: 'sa30', cat: 'sagas', diff: 3,
    q: "Quel Dieu de la Destruction organise un tournoi entre les univers 6 et 7 ?",
    a: ["Champa", "Beerus", "Quitela", "Belmod"],
    why: "Frère jumeau de Beerus, il veut s'emparer de la Terre de l'univers 7 pour sa cuisine.",
  },

  {
    id: 'sa31', cat: 'sagas', diff: 1,
    q: "Quelle planète les Saiyans habitaient-ils avant sa destruction ?",
    a: ["La planète Vegeta", "Namek", "Sadala", "Yardrat"],
    why: "Elle portait le nom de leur roi, après avoir été prise à ses habitants d'origine.",
  },
  {
    id: 'sa32', cat: 'sagas', diff: 1,
    q: "Quel est le tout premier adversaire de Dragon Ball Z, venu chercher Goku sur Terre ?",
    a: ["Raditz", "Vegeta", "Nappa", "Freezer"],
    why: "C'est lui qui révèle à Goku ses origines saiyanes.",
  },
  {
    id: 'sa33', cat: 'sagas', diff: 1,
    q: "À l'origine, combien de vœux Shenron exauce-t-il ?",
    a: ["Un seul", "Deux", "Trois", "Sept"],
    why: "Porunga, sur Namek, en accorde trois — d'où la course pour l'atteindre en premier.",
  },
  {
    id: 'sa34', cat: 'sagas', diff: 1,
    q: "Comment s'appelle l'entreprise dirigée par la famille de Bulma ?",
    a: ["La Capsule Corporation", "Le Ruban Rouge", "La Ginyu Corp", "La Brief Company"],
    why: "Son père, le Dr Brief, est l'inventeur des capsules Hoi-Poi.",
  },
  {
    id: 'sa35', cat: 'sagas', diff: 1,
    q: "Que contiennent les capsules Hoi-Poi ?",
    a: [
      "Des véhicules et des maisons miniaturisés",
      "Des armes de l'armée du Ruban Rouge",
      "Des médicaments de régénération",
      "Des scouters de rechange",
    ],
    why: "On les lance au sol, et l'objet reprend sa taille réelle dans un nuage de fumée.",
  },
  {
    id: 'sa36', cat: 'sagas', diff: 1,
    q: "Sous quelle identité costumée Gohan combat-il le crime en ville ?",
    a: ["Great Saiyaman", "Mr Satan", "Jackie Chun", "Le Grand Guerrier"],
    why: "Un déguisement fourni par Bulma, que Videl perce à jour très vite.",
  },
  {
    id: 'sa37', cat: 'sagas', diff: 1,
    q: "Comment Goku permet-il à Piccolo d'abattre Raditz ?",
    a: [
      "Il le retient à mains nues et accepte de mourir avec lui",
      "Il l'assomme d'un Kaméhaméha",
      "Il le piège dans un récipient",
      "Il le distrait pendant que Gohan attaque",
    ],
    why: "Le rayon perforant de Piccolo les traverse tous les deux.",
  },
  {
    id: 'sa38', cat: 'sagas', diff: 1,
    q: "Combien d'années s'écoulent entre la mort de Goku face à Cell et son retour au tournoi ?",
    a: ["Sept ans", "Trois ans", "Cinq ans", "Dix ans"],
    why: "Goten naît et grandit pendant cette absence, sans jamais connaître son père.",
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

  {
    id: 'te21', cat: 'techniques', diff: 1,
    q: "Quelle transformation Gohan atteint-il face à Cell, au-delà du Super Saiyan ?",
    a: ["Le Super Saiyan 2", "Le Super Saiyan 3", "L'Ultra Instinct", "Le Gohan Beast"],
    why: "Des éclairs parcourent désormais l'aura, et les cheveux se dressent davantage.",
  },
  {
    id: 'te22', cat: 'techniques', diff: 1,
    q: "Quelle forme aux cheveux dorés descendant jusqu'aux reins, et sans sourcils, apparaît contre Majin Buu ?",
    a: ["Le Super Saiyan 3", "Le Super Saiyan 2", "Le Super Saiyan God", "Le Super Saiyan Blue"],
    why: "Sa consommation d'énergie est telle qu'elle est intenable plus de quelques minutes.",
  },
  {
    id: 'te23', cat: 'techniques', diff: 2,
    q: "Quelle attaque Gohan tient-il de Piccolo, lancée les deux mains au-dessus de la tête ?",
    a: ["Le Masenko", "Le Kienzan", "Le Kikoho", "Le Taiyoken"],
    why: "Il l'emploie pour la première fois contre Nappa, encore enfant.",
  },
  {
    id: 'te24', cat: 'techniques', diff: 2,
    q: "Quelle attaque de Vegeta, longuement chargée bras écartés, marque le Cell Game ?",
    a: ["Le Final Flash", "Le Galick Gun", "Le Big Bang Attack", "Le Makankosappo"],
    why: "Cell la laisse volontairement le frapper — et le regrette aussitôt.",
  },
  {
    id: 'te25', cat: 'techniques', diff: 2,
    q: "Quelle sphère d'énergie compacte Vegeta lance-t-il d'une seule main contre C-19 ?",
    a: ["Le Big Bang Attack", "Le Final Flash", "Le Genkidama", "Le Kienzan"],
    why: "Sa première démonstration de puissance en Super Saiyan devant les autres guerriers Z.",
  },
  {
    id: 'te26', cat: 'techniques', diff: 2,
    q: "Comment nomme-t-on la technique qui permet de voler en contrôlant son ki ?",
    a: ["Le Bukujutsu", "Le Kaio-ken", "Le Zenkai", "Le Taiyoken"],
    why: "Krilin et Yamcha l'apprennent à l'école de Tortue Géniale, bien avant les Saiyans.",
  },
  {
    id: 'te27', cat: 'techniques', diff: 3,
    q: "Quelle transformation rosée Goku Black obtient-il ?",
    a: ["Le Super Saiyan Rosé", "Le Super Saiyan God", "Le Super Saiyan Blue", "Le Golden Freezer"],
    why: "La teinte vient de son corps de Saiyan habité par une âme divine.",
  },
  {
    id: 'te28', cat: 'techniques', diff: 3,
    q: "Quelle forme Vegeta atteint-il en poussant le Super Saiyan Blue au-delà de ses limites, face à Jiren ?",
    a: ["Le Super Saiyan Blue Evolution", "L'Ultra Instinct", "Le Super Saiyan Rosé", "Le Super Saiyan 4"],
    why: "Une voie propre à Vegeta, distincte de l'Ultra Instinct emprunté par Goku.",
  },
  {
    id: 'te29', cat: 'techniques', diff: 3,
    q: "Quelle attaque Cell tient-il des cellules de Freezer, tirée du bout du doigt ?",
    a: ["Le Death Beam", "Le Masenko", "Le Kienzan", "Le Galick Gun"],
    why: "Cell combine les techniques de tous les guerriers dont il porte les cellules.",
  },
  {
    id: 'te30', cat: 'techniques', diff: 3,
    q: "Quelle forme de Freezer, supérieure au Golden, apparaît dans l'arc Granolah du manga Super ?",
    a: ["Le Black Freezer", "Meta-Cooler", "Freezer Ultime", "Le Golden Freezer 2"],
    why: "Obtenue au prix de dix ans d'entraînement dans la Salle de l'Esprit et du Temps.",
  },

  {
    id: 'te31', cat: 'techniques', diff: 1,
    q: "De quelle couleur est l'aura d'un Super Saiyan ?",
    a: ["Dorée", "Bleue", "Rouge", "Verte"],
    why: "Elle accompagne les cheveux dressés et le regard qui vire au turquoise.",
  },
  {
    id: 'te32', cat: 'techniques', diff: 1,
    q: "Quelle fusion impose aux deux guerriers d'exécuter une danse parfaitement synchronisée ?",
    a: ["La danse de Metamor", "Les Potaras", "L'absorption", "Le Kaio-ken"],
    why: "Goku la rapporte du peuple de Metamor, croisé pendant son séjour dans l'au-delà.",
  },
  {
    id: 'te33', cat: 'techniques', diff: 1,
    q: "Que se passe-t-il si la danse de fusion est mal exécutée ?",
    a: [
      "La fusion réussit mais donne un guerrier ridicule et très faible",
      "Rien du tout, il suffit de recommencer",
      "La fusion devient définitive",
      "Les deux guerriers perdent leurs pouvoirs",
    ],
    why: "Goten et Trunks en font deux fois l'expérience, pour le plus grand désespoir de Piccolo.",
  },
  {
    id: 'te34', cat: 'techniques', diff: 1,
    q: "Quelle partie du corps un Saiyan doit-il conserver pour se transformer en singe géant ?",
    a: ["Sa queue", "Ses cheveux", "Ses yeux", "Ses mains"],
    why: "La couper met fin à la transformation sur-le-champ.",
  },
  {
    id: 'te35', cat: 'techniques', diff: 1,
    q: "Combien de formes Freezer possède-t-il avant d'atteindre le Golden ?",
    a: ["Quatre", "Trois", "Cinq", "Deux"],
    why: "La quatrième, la plus épurée, est sa forme d'origine, longtemps bridée volontairement.",
  },
  {
    id: 'te36', cat: 'techniques', diff: 1,
    q: "Sur quoi Goku se déplace-t-il dans les airs avant de savoir voler ?",
    a: ["Le Nuage Magique", "Le Bâton Magique", "Une capsule volante", "Le dos de Shenron"],
    why: "Offert par Tortue Géniale, il ne porte que les cœurs purs.",
  },
  {
    id: 'te37', cat: 'techniques', diff: 1,
    q: "Quelle arme extensible Goku porte-t-il dans le dos, enfant ?",
    a: ["Le Bâton Magique", "L'épée Z", "Un trident", "Le Nuage Magique"],
    why: "Héritée de son grand-père adoptif, elle s'allonge à volonté sur commande.",
  },
  {
    id: 'te38', cat: 'techniques', diff: 1,
    q: "De quelle couleur sont les cheveux du Super Saiyan Blue ?",
    a: ["Bleus", "Dorés", "Rouges", "Argentés"],
    why: "Le rouge appartient au Super Saiyan God, l'argenté à l'Ultra Instinct.",
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
  {
    id: 'po21', cat: 'power', diff: 1,
    q: "Que se passe-t-il quand un scouter mesure une puissance trop élevée pour lui ?",
    a: ["Il explose", "Il s'éteint", "Il change de couleur", "Il se met à sonner"],
    why: "Un ressort comique récurrent, du scouter de Raditz à ceux de l'armée de Freezer.",
  },
  {
    id: 'po22', cat: 'power', diff: 1,
    q: "Que mesure réellement un scouter ?",
    a: [
      "L'énergie que le combattant laisse s'échapper",
      "Sa masse musculaire",
      "Sa vitesse de déplacement",
      "Son niveau de colère",
    ],
    why: "D'où son inutilité face à quelqu'un qui sait masquer son ki, comme les guerriers Z.",
  },
  {
    id: 'po23', cat: 'power', diff: 2,
    q: "Quelle puissance de combat Vegeta atteint-il sur Namek, après avoir été soigné ?",
    a: ["24 000", "18 000", "30 000", "9 000"],
    why: "Le Zenkai en action : frôler la mort puis guérir le rend nettement plus fort.",
  },
  {
    id: 'po24', cat: 'power', diff: 2,
    q: "Quelle puissance de combat Krilin atteint-il à l'arrivée des Saiyans sur Terre ?",
    a: ["1 083", "820", "1 480", "610"],
    why: "Fruit de l'entraînement auprès de Kami-Sama pendant l'absence de Goku.",
  },
  {
    id: 'po25', cat: 'power', diff: 2,
    q: "Quelle puissance de combat Gohan affiche-t-il à l'arrivée des Saiyans ?",
    a: ["981", "1 307", "710", "1 480"],
    why: "Après six mois de survie en pleine nature, imposés par Piccolo.",
  },
  {
    id: 'po26', cat: 'power', diff: 2,
    q: "Quelle puissance de combat Goku atteint-il grâce à l'entraînement de Kaio du Nord ?",
    a: ["8 000", "5 000", "18 000", "4 000"],
    why: "Soit le double de Nappa — mais encore loin des 18 000 de Vegeta.",
  },
  {
    id: 'po27', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Freezer atteint-il sous sa deuxième forme ?",
    a: ["1 000 000", "530 000", "2 500 000", "300 000"],
    why: "Presque le double de sa première forme, et il lui en reste deux.",
  },
  {
    id: 'po28', cat: 'power', diff: 3,
    q: "Quelle puissance Goku atteint-il en Super Saiyan face à Freezer, sur Namek ?",
    a: ["150 000 000", "120 000 000", "60 000 000", "300 000 000"],
    why: "Juste de quoi dépasser les 120 millions de Freezer à pleine puissance.",
  },
  {
    id: 'po29', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Yamcha affiche-t-il à l'arrivée des Saiyans ?",
    a: ["1 480", "1 083", "1 830", "981"],
    why: "Le plus fort des humains à ce moment-là, juste derrière Ten Shin Han.",
  },
  {
    id: 'po30', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Ten Shin Han affiche-t-il à l'arrivée des Saiyans ?",
    a: ["1 830", "1 480", "1 083", "2 400"],
    why: "Le plus élevé des combattants humains, Piccolo mis à part.",
  },
  {
    id: 'po31', cat: 'power', diff: 1,
    q: "Qui utilise des scouters dans la série ?",
    a: ["Les soldats de l'armée de Freezer", "Les Nameks", "Les Kaioshins", "Les humains"],
    why: "Les guerriers Z, eux, apprennent à sentir le ki sans le moindre appareil.",
  },
  {
    id: 'po32', cat: 'power', diff: 1,
    q: "Comment un combattant peut-il tromper un scouter ?",
    a: [
      "En abaissant volontairement son ki",
      "En se déplaçant très vite",
      "En se cachant derrière un obstacle",
      "En criant très fort",
    ],
    why: "L'appareil ne lit que l'énergie émise : un ki masqué le rend aveugle.",
  },
  {
    id: 'po33', cat: 'power', diff: 1,
    q: "Où poussent les haricots magiques qui rendent toute son énergie à un blessé ?",
    a: [
      "Au sommet de la tour de Karin",
      "Sur la planète Namek",
      "Dans les jardins du Palais céleste",
      "Derrière Kame House",
    ],
    why: "Karin les rationne sévèrement : il en pousse très peu à la fois.",
  },
  {
    id: 'po34', cat: 'power', diff: 1,
    q: "Que multiplie le Kaio-ken ?",
    a: [
      "La puissance de combat",
      "La taille du combattant",
      "La durée d'une transformation",
      "La portée des attaques",
    ],
    why: "Multiplicateur au choix du combattant — mais le corps encaisse la facture.",
  },
  {
    id: 'po35', cat: 'power', diff: 1,
    q: "De quelle couleur est l'aura du Kaio-ken ?",
    a: ["Rouge", "Bleue", "Dorée", "Verte"],
    why: "D'où le contraste saisissant quand Goku le superpose au Super Saiyan Blue.",
  },
  {
    id: 'po36', cat: 'power', diff: 1,
    q: "Quelle particularité rend l'entraînement chez Kaio du Nord si éprouvant ?",
    a: [
      "Sa planète a une gravité dix fois supérieure à la Terre",
      "L'air y est irrespirable",
      "Le froid y est extrême",
      "Le temps y passe cent fois plus vite",
    ],
    why: "Goku peine d'abord à simplement tenir debout, avant d'attraper le singe Bubbles.",
  },
  {
    id: 'po37', cat: 'power', diff: 1,
    q: "Comment Goku s'entraîne-t-il durant son voyage vers Namek ?",
    a: [
      "En augmentant la gravité de son vaisseau",
      "Dans la Salle de l'Esprit et du Temps",
      "Au sommet de la tour de Karin",
      "En combattant des robots",
    ],
    why: "Il y monte jusqu'à cent fois la gravité terrestre, au bord de la rupture.",
  },
  {
    id: 'po38', cat: 'power', diff: 1,
    q: "Quel appareil ennemi Bulma parvient-elle à réparer pour les guerriers Z ?",
    a: ["Un scouter", "Un vaisseau de Freezer", "Une cuve de régénération", "Une Potara"],
    why: "Elle en traduit même le langage, ce qui permet de suivre les communications ennemies.",
  },
]

export const QUESTIONS_BY_CATEGORY = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = QUESTIONS.filter((q) => q.cat === c.id)
  return acc
}, {})
