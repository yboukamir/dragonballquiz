/**
 * Banque de questions — 290 questions originales rédigées pour ce site.
 *
 * Convention d'écriture : `a[0]` est TOUJOURS la bonne réponse.
 * Les propositions sont mélangées à l'exécution (voir `src/lib/quiz.js`),
 * ce qui rend le fichier beaucoup plus simple à relire et à corriger.
 *
 * diff : 1 = facile · 2 = moyen · 3 = difficile
 * why  : explication affichée dans le feedback après la réponse.
 *
 * La version anglaise vit dans `questions.en.js`, avec les mêmes
 * identifiants et les mêmes niveaux : les deux banques sont interchangeables.
 */

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
    a: ["Chichi", "Bulma", "Videl", "Lunch"],
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
    q: "Quel scientifique conçoit les cyborgs pour se venger de Goku ?",
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
    a: ["Bulma", "Chichi", "Lunch", "Videl"],
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
    q: "Qui assiste le Tout-Puissant, le Dieu de la Terre, au Palais céleste ?",
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
    a: ["Majin Boo", "Dabra", "Cell", "Yakon"],
    why: "Bibidi l'avait scellée dans un cocon avant que son fils Babidi ne la réveille.",
  },
  {
    id: 'pe38', cat: 'personnages', diff: 1,
    q: "Quel petit compagnon au visage blanc ne quitte jamais Ten Shin Han ?",
    a: ["Chaozu", "Puar", "Oolong", "Mr Popo"],
    why: "Il se sacrifie contre Nappa en tentant de s'autodétruire.",
  },

  {
    id: 'pe39', cat: 'personnages', diff: 3,
    q: "Quel membre du Commando Ginyu se proclame le plus rapide de l'univers ?",
    a: ["Burter", "Jeece", "Recoome", "Guldo"],
    why: "Sa vitesse ne suffit pourtant pas à suivre un Goku revenu de son entraînement.",
  },
  {
    id: 'pe40', cat: 'personnages', diff: 3,
    q: "Quel membre du Commando Ginyu fige le temps en retenant sa respiration ?",
    a: ["Guldo", "Burter", "Jeece", "Recoome"],
    why: "Le plus faible du groupe physiquement, mais doté de pouvoirs mentaux redoutables.",
  },
  {
    id: 'pe41', cat: 'personnages', diff: 3,
    q: "Quel Namek éveille le potentiel caché de Krilin puis de Gohan sur Namek ?",
    a: ["Le Grand Doyen", "Nail", "Muri", "Dendé"],
    why: "Saichôrô en version originale : c'est de lui que naissent les Dragon Balls nameks.",
  },
  {
    id: 'pe42', cat: 'personnages', diff: 3,
    q: "Quel Saiyan sosie de Goku se nourrit des fruits de l'Arbre Divin ?",
    a: ["Turles", "Raditz", "Broly", "Nappa"],
    why: "Personnage de film : l'Arbre Divin draine toute la vie de la planète où il pousse.",
  },
  {
    id: 'pe43', cat: 'personnages', diff: 3,
    q: "Quel frère de Freezer revient sous une forme entièrement métallique ?",
    a: ["Cooler", "King Cold", "Turles", "Slug"],
    why: "Meta-Cooler se reconstruit indéfiniment tant que son ordinateur central tient.",
  },
  {
    id: 'pe44', cat: 'personnages', diff: 3,
    q: "Quel Pride Trooper de l'univers 11 mise tout sur sa vitesse ?",
    a: ["Dyspo", "Toppo", "Jiren", "Kahseral"],
    why: "Son Ultime Kaio-ken pousse sa vitesse à un point que même Goku peine à suivre.",
  },
  {
    id: 'pe45', cat: 'personnages', diff: 3,
    q: "Quel Kaioshin, seul rescapé de son rang, combat aux côtés des guerriers Z contre Boo ?",
    a: ["Shin", "Gowasu", "Kibito", "Le Vieux Kaioshin"],
    why: "Kaioshin de l'Est, il est le dernier survivant du massacre commis par Majin Boo.",
  },
  {
    id: 'pe46', cat: 'personnages', diff: 3,
    q: "Quel assassin professionnel, frère de Tsuru Sennin, est engagé pour tuer Goku enfant ?",
    a: ["Tao Pai Pai", "Yajirobé", "Le Commandant Red", "Le Général Blue"],
    why: "Il revient plus tard en cyborg, sans plus de succès.",
  },
  {
    id: 'pe47', cat: 'personnages', diff: 3,
    q: "Quel agent de la Patrouille Galactique, en réalité un ange, entraîne Goku dans l'arc Moro ?",
    a: ["Merus", "Jaco", "Whis", "Vados"],
    why: "Intervenir dans les affaires mortelles lui coûtera son existence même.",
  },
  {
    id: 'pe48', cat: 'personnages', diff: 3,
    q: "Quel sorcier millénaire, libéré de sa prison, absorbe l'énergie de planètes entières ?",
    a: ["Moro", "Babidi", "Bibidi", "Dabra"],
    why: "Antagoniste du manga Super, il avait été enfermé dix millions d'années plus tôt.",
  },
  {
    id: "pe49", cat: "personnages", diff: 1,
    q: "Quelle particularité réunit Goku, Gohan et Goten dans la version japonaise ?",
    a: ["Une même comédienne les double tous les trois", "Ils partagent une date de naissance", "Ils n'apparaissent jamais dans le même chapitre", "Ils ont chacun un scouter"],
    why: "Masako Nozawa prête sa voix aux trois générations depuis 1986.",
  },

  {
    id: "pe50", cat: "personnages", diff: 1,
    q: "De quel mot anglais le nom de Vegeta est-il tiré ?",
    a: ["Vegetable, le légume", "Victory, la victoire", "Veteran, le vétéran", "Vengeance"],
    why: "La règle vaut pour tous les Saiyans — et leur planète porte le nom de son roi.",
  },

  {
    id: "pe51", cat: "personnages", diff: 1,
    q: "Quel personnage est né au cinéma et n'apparaît dans aucun chapitre du manga d'origine ?",
    a: ["Broly", "Trunks", "C-18", "Dendé"],
    why: "Créé pour un film en 1993, il n'entre dans la continuité officielle qu'en 2018.",
  },

  {
    id: "pe52", cat: "personnages", diff: 2,
    q: "Sous quel nom Mr Satan est-il connu dans une grande partie des versions occidentales ?",
    a: ["Hercule", "Ajax", "Titan", "Goliath"],
    why: "Son nom d'origine passait mal auprès de certains diffuseurs.",
  },

  {
    id: "pe53", cat: "personnages", diff: 2,
    q: "De quoi le nom japonais de Krilin, Kuririn, est-il composé ?",
    a: ["De la châtaigne et de Shaolin", "Du riz et du dragon", "De la lune et du poing", "Du sel et de la mer"],
    why: "« Kuri », la châtaigne, pour le crâne ; « rin », comme dans Shaolin, pour le moine.",
  },

  {
    id: "pe54", cat: "personnages", diff: 2,
    q: "Quel personnage l'ancien doublage français avait-il rebaptisé « Satan Petit Cœur » ?",
    a: ["Piccolo", "Freezer", "Cell", "Vegeta"],
    why: "Cette version francophone renommait largement les personnages ; le manga a rétabli les noms d'origine.",
  },

  {
    id: "pe55", cat: "personnages", diff: 2,
    q: "Quel personnage Toriyama voulait-il installer comme héros principal après l'arc Cell ?",
    a: ["Son Gohan", "Trunks", "Vegeta", "Piccolo"],
    why: "Il a fini par juger qu'il n'avait pas l'étoffe du rôle et a ramené Goku au premier plan.",
  },

  {
    id: "pe56", cat: "personnages", diff: 3,
    q: "D'où viennent les noms de Bibidi, Babidi et Boo ?",
    a: ["D'une formule magique de conte", "D'instruments de musique", "De plats épicés", "De constellations"],
    why: "« Bibbidi-Bobbidi-Boo », la formule de la fée marraine de Cendrillon.",
  },

  {
    id: "pe57", cat: "personnages", diff: 3,
    q: "De quel mot le prénom de Videl est-il l'anagramme ?",
    a: ["Devil, le diable", "Video, la vidéo", "Livde, une plante", "Ledvi, une étoile"],
    why: "Comme son père Mr Satan, elle porte un nom d'inspiration diabolique.",
  },

  {
    id: "pe58", cat: "personnages", diff: 3,
    q: "Quels prénoms humains C-17 et C-18 portaient-ils avant leur transformation ?",
    a: ["Lapis et Lazuli", "Silex et Quartz", "Ambre et Jade", "Onyx et Perle"],
    why: "Deux moitiés d'une même pierre : ils ont été enlevés puis modifiés ensemble.",
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
    q: "Quels cyborgs Cell doit-il absorber pour atteindre sa forme parfaite ?",
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
    q: "Quel sorcier orchestre le réveil de Majin Boo ?",
    a: ["Babidi", "Bibidi", "Dabra", "Yakon"],
    why: "Dabra, roi du monde des démons, n'est que son homme de main.",
  },
  {
    id: 'sa12', cat: 'sagas', diff: 2,
    q: "Qui a créé Majin Boo à l'origine ?",
    a: ["Bibidi", "Babidi", "Dabra", "Le Grand Kaioshin"],
    why: "Bibidi est le père de Babidi : le fils ne fait que réveiller la créature.",
  },
  {
    id: 'sa13', cat: 'sagas', diff: 2,
    q: "Quelle organisation, dirigée par le Commandant Red, affronte Goku enfant ?",
    a: ["L'Armée du Ruban Rouge", "L'armée de Freezer", "La Patrouille Galactique", "Le Commando Ginyu"],
    why: "Le Dr Gero en est un rescapé : les cyborgs seront sa vengeance.",
  },
  {
    id: 'sa14', cat: 'sagas', diff: 2,
    q: "Quel roi démon, vaincu par Goku enfant, est directement lié à la naissance de Piccolo ?",
    a: ["Piccolo Daimao", "Kami-Sama", "Garlic Jr", "Tao Pai Pai"],
    why: "Le Piccolo que l'on connaît est son descendant, engendré juste avant sa mort.",
  },
  {
    id: 'sa15', cat: 'sagas', diff: 3,
    q: "Quel jeune Namek devient le nouveau Tout-Puissant après l'arc Freezer ?",
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
    q: "Quel cyborg tente de s'autodétruire pour éliminer Cell, sans savoir que sa bombe a été retirée ?",
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
    q: "Quelle forme de Majin Boo absorbe Gotenks et Piccolo ?",
    a: ["Super Boo", "Kid Boo", "Boo le gros", "Majin Boo originel"],
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

  {
    id: 'sa39', cat: 'sagas', diff: 3,
    q: "Quel univers remporte le Tournoi du Pouvoir ?",
    a: ["L'univers 7", "L'univers 11", "L'univers 6", "L'univers 2"],
    why: "C-17 est le dernier debout, après que Goku et Freezer ont emporté Jiren avec eux.",
  },
  {
    id: 'sa40', cat: 'sagas', diff: 3,
    q: "Qui formule le vœu final aux Super Dragon Balls, à l'issue du Tournoi du Pouvoir ?",
    a: ["C-17", "Goku", "Vegeta", "Freezer"],
    why: "Il demande le rétablissement de tous les univers effacés, plutôt qu'une faveur personnelle.",
  },
  {
    id: 'sa41', cat: 'sagas', diff: 3,
    q: "Qui tue Yamcha, Ten Shin Han, Chaozu et Piccolo lors de l'arrivée des Saiyans ?",
    a: ["Nappa", "Vegeta", "Raditz", "Les Saibaimen"],
    why: "Seul Yamcha tombe sous un Saibaiman : les trois autres meurent bien de la main de Nappa.",
  },
  {
    id: 'sa42', cat: 'sagas', diff: 3,
    q: "Combien de temps dure le Tournoi du Pouvoir ?",
    a: ["48 minutes", "24 heures", "Une semaine", "3 heures"],
    why: "Une durée fixée par Zeno, mesurée sur un sablier posé devant les gradins.",
  },
  {
    id: 'sa43', cat: 'sagas', diff: 3,
    q: "Quel ancien ennemi est ressuscité pour compléter l'équipe de l'univers 7 ?",
    a: ["Freezer", "Cell", "Majin Boo", "Cooler"],
    why: "Boo devait y participer, mais s'endort profondément à la veille du tournoi.",
  },
  {
    id: 'sa44', cat: 'sagas', diff: 3,
    q: "Quel agent de la Patrouille Galactique débarque sur Terre pour prévenir du retour de Freezer ?",
    a: ["Jaco", "Merus", "Whis", "Le Grand Prêtre"],
    why: "Il avait déjà croisé Bulma bien des années plus tôt, dans un récit préquel.",
  },
  {
    id: 'sa45', cat: 'sagas', diff: 3,
    q: "Quel film introduit la transformation en Super Saiyan God ?",
    a: ["Battle of Gods", "La Résurrection de F", "Super Hero", "Broly"],
    why: "Il marque aussi la première apparition de Beerus et de Whis.",
  },
  {
    id: 'sa46', cat: 'sagas', diff: 3,
    q: "Quel assassin de l'univers 6 affronte Goku lors du tournoi entre les univers 6 et 7 ?",
    a: ["Hit", "Cabba", "Frost", "Botamo"],
    why: "Réputé n'avoir jamais échoué sur un contrat en plus de mille ans de carrière.",
  },
  {
    id: 'sa47', cat: 'sagas', diff: 3,
    q: "Qui manipule Broly dans le film de 2018 ?",
    a: ["Paragus, son père", "Freezer seul", "Vegeta", "Cheelai"],
    why: "Il lui impose un collier de contrôle pour assouvir sa propre vengeance.",
  },
  {
    id: 'sa48', cat: 'sagas', diff: 3,
    q: "Avec qui Goku part-il s'entraîner à la toute fin de Dragon Ball Z ?",
    a: ["Uub", "Gohan", "Vegeta", "Pan"],
    why: "La réincarnation de Kid Boo, née humaine grâce au vœu formulé par Goku lui-même.",
  },
  {
    id: "sa49", cat: "sagas", diff: 1,
    q: "Le manga a-t-il été coupé en deux entre Dragon Ball et Dragon Ball Z ?",
    a: ["Non, la coupure vient de la télévision", "Oui, à partir du tome 17", "Oui, dès le tome 1", "Oui, mais seulement en France"],
    why: "Le manga s'appelle Dragon Ball du premier au dernier chapitre ; le « Z » est une invention de l'anime.",
  },

  {
    id: "sa50", cat: "sagas", diff: 1,
    q: "Quel événement referme le manga Dragon Ball ?",
    a: ["Le 28e Tenkaichi Budokai", "La chute de Majin Boo", "Le Tournoi du Pouvoir", "La mort de Freezer"],
    why: "Dix ans après Boo, Goku quitte l'arène avec Oob — et le manga s'arrête là.",
  },

  {
    id: "sa51", cat: "sagas", diff: 1,
    q: "Où le Tournoi du Pouvoir a-t-il été raconté en premier ?",
    a: ["Dans l'anime Dragon Ball Super", "Dans le manga Super", "Dans un film", "Dans un jeu vidéo"],
    why: "Le manga de Toyotarō l'a adapté ensuite, avec des différences notables.",
  },

  {
    id: "sa52", cat: "sagas", diff: 2,
    q: "Après quel arc Akira Toriyama souhaitait-il conclure la série ?",
    a: ["L'arc Freezer", "L'arc des Saiyans", "L'arc Cell", "L'arc Boo"],
    why: "Le succès de la série a repoussé plusieurs fois la fin qu'il avait prévue.",
  },

  {
    id: "sa53", cat: "sagas", diff: 2,
    q: "Sous quelle forme les deux premiers arcs de Dragon Ball Super ont-ils d'abord existé ?",
    a: ["Deux films sortis au cinéma", "Deux jeux vidéo", "Deux romans", "Deux épisodes spéciaux"],
    why: "La série les a repris et étirés, en ajoutant ce que le format court ne permettait pas.",
  },

  {
    id: "sa54", cat: "sagas", diff: 2,
    q: "Combien d'années séparent la fin du manga d'origine du début de Dragon Ball Super ?",
    a: ["Vingt ans", "Cinq ans", "Dix ans", "Trente ans"],
    why: "Le dernier chapitre paraît en 1995, la nouvelle série démarre en 2015.",
  },

  {
    id: "sa55", cat: "sagas", diff: 2,
    q: "Quel arc du manga Dragon Ball Super n'a jamais été adapté en série animée ?",
    a: ["L'arc Moro", "L'arc Zamasu", "L'arc du Tournoi du Pouvoir", "L'arc Champa"],
    why: "L'anime s'est arrêté à la fin de son dernier tournoi ; le manga a continué sans lui.",
  },

  {
    id: "sa56", cat: "sagas", diff: 3,
    q: "Combien de chapitres compte la saga de Majin Boo ?",
    a: ["99", "45", "130", "60"],
    why: "Du chapitre 421 au chapitre 519, le dernier du manga.",
  },

  {
    id: "sa57", cat: "sagas", diff: 3,
    q: "Dans quel tome de l'édition originale la saga de Majin Boo s'ouvre-t-elle ?",
    a: ["Le tome 36", "Le tome 29", "Le tome 31", "Le tome 40"],
    why: "Elle occupe les sept derniers volumes, du tome 36 au tome 42.",
  },

  {
    id: "sa58", cat: "sagas", diff: 3,
    q: "Combien d'épisodes compte la série Dragon Ball Z ?",
    a: ["291", "153", "200", "360"],
    why: "Sept saisons diffusées de 1989 à 1996, là où la première série s'arrêtait à 153.",
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
    why: "Chaque tir abrège la vie de son utilisateur — le prix est prélevé sur lui.",
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
    why: "Sa toute première transformation obtenue par l'entraînement, et non par la croissance.",
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
    q: "Quelle forme aux cheveux dorés descendant jusqu'aux reins, et sans sourcils, apparaît contre Majin Boo ?",
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

  {
    id: 'te39', cat: 'techniques', diff: 3,
    q: "Quelle technique de Hit fige son adversaire dans le temps ?",
    a: ["Le Saut Temporel", "L'Ultra Instinct", "Le Mafuba", "Le Taiyoken"],
    why: "Un dixième de seconde au départ, qu'il allonge à mesure que le combat progresse.",
  },
  {
    id: 'te40', cat: 'techniques', diff: 3,
    q: "Quelle est l'attaque signature de Gogeta ?",
    a: ["Le Big Bang Kaméhaméha", "Le Final Kaméhaméha", "Le Final Flash", "Le Galick Gun"],
    why: "Un nom-valise, à l'image du guerrier : chaque moitié y apporte son attaque fétiche.",
  },
  {
    id: 'te41', cat: 'techniques', diff: 3,
    q: "Quelle attaque Vegetto lance-t-il en combinant l'héritage de ses deux moitiés ?",
    a: ["Le Final Kaméhaméha", "Le Big Bang Kaméhaméha", "Le Makankosappo", "Le Kienzan"],
    why: "La posture du Final Flash, la décharge du Kaméhaméha.",
  },
  {
    id: 'te42', cat: 'techniques', diff: 3,
    q: "Grâce à quoi Cell renaît-il après son autodestruction ?",
    a: [
      "Une unique cellule survivante",
      "Un vœu adressé à Shenron",
      "Une nouvelle absorption",
      "Un clone laissé sur Terre",
    ],
    why: "Il en revient plus fort encore : le Zenkai fait partie de son patrimoine saiyan.",
  },
  {
    id: 'te43', cat: 'techniques', diff: 3,
    q: "Comment Vegeta se transforme-t-il en singe géant sur Terre, sans pleine lune ?",
    a: [
      "Il crée une lune artificielle",
      "Il absorbe l'énergie du sol",
      "Il utilise son scouter",
      "Il attend une éclipse",
    ],
    why: "La Balle de Lumière : une sphère d'énergie qui imite le rayonnement lunaire.",
  },
  {
    id: 'te44', cat: 'techniques', diff: 3,
    q: "Quelle technique permet à Ten Shin Han de se dédoubler en quatre combattants ?",
    a: ["La technique des quatre corps", "Le Kikoho", "Le Taiyoken", "Le Zanzoken"],
    why: "Chaque copie ne dispose que du quart de la puissance de l'original.",
  },
  {
    id: 'te45', cat: 'techniques', diff: 3,
    q: "Comment nomme-t-on la technique d'image rémanente qui laisse un double illusoire ?",
    a: ["Le Zanzoken", "Le Taiyoken", "Le Bukujutsu", "Le Kienzan"],
    why: "Un simple déplacement à très grande vitesse, que l'œil interprète comme un double.",
  },
  {
    id: 'te46', cat: 'techniques', diff: 3,
    q: "Quel état Goku atteint-il avant de maîtriser complètement l'Ultra Instinct ?",
    a: [
      "L'Ultra Instinct « signe »",
      "Le Super Saiyan Blue Evolution",
      "Le Super Saiyan Rosé",
      "Le Gohan Beast",
    ],
    why: "Cheveux encore sombres et regard argenté : le corps esquive seul, mais frappe mal.",
  },
  {
    id: 'te47', cat: 'techniques', diff: 3,
    q: "Quel guerrier naît de la fusion Potara entre Goku et Vegeta, face à Super Boo ?",
    a: ["Vegetto", "Gogeta", "Gotenks", "Gohanks"],
    why: "Les Potaras devaient être définitifs — c'est la seule fusion qui finira par se défaire.",
  },
  {
    id: 'te48', cat: 'techniques', diff: 3,
    q: "Quelle capacité de Majin Boo transforme ses adversaires en friandises ?",
    a: ["Un rayon transformateur", "Le Mafuba", "Le Taiyoken", "Le Kienzan"],
    why: "Il les dévore ensuite, ce qui reste sa manière la plus expéditive de faire le vide.",
  },
  {
    id: "te49", cat: "techniques", diff: 1,
    q: "Que désigne « kame », la première partie du mot Kaméhaméha ?",
    a: ["La tortue", "La lumière", "Le feu", "Le ciel"],
    why: "L'attaque est celle de l'école de la Tortue — le nom dit d'où elle vient.",
  },

  {
    id: "te50", cat: "techniques", diff: 1,
    q: "Que veut dire « genki », dans le nom du Genkidama ?",
    a: ["L'énergie vitale", "La colère", "La lumière du ciel", "Le dernier souffle"],
    why: "C'est exactement ce que Goku emprunte à tout ce qui vit alentour.",
  },

  {
    id: "te51", cat: "techniques", diff: 1,
    q: "Quelle raison pratique Toriyama a-t-il donnée aux cheveux dorés du Super Saiyan ?",
    a: ["Des cheveux clairs demandent moins d'encre à noircir", "Le doré rappelait le soleil", "Son éditeur voulait plus de couleur", "Il fallait se démarquer de Freezer"],
    why: "Une semaine de retard en moins sur un hebdomadaire, chapitre après chapitre.",
  },

  {
    id: "te52", cat: "techniques", diff: 2,
    q: "Que signifie « Makankosappo », le nom du rayon de Piccolo ?",
    a: ["Un rayon qui transperce les démons", "Le poing du ciel", "La lance du dragon", "L'œil du serpent"],
    why: "Un nom taillé pour l'attaque qu'il réservait à Goku, et qui a fini dans le dos de Raditz.",
  },

  {
    id: "te53", cat: "techniques", diff: 2,
    q: "Que veut dire littéralement le nom japonais de l'Ultra Instinct ?",
    a: ["Le secret de l'égoïsme", "L'œil du dragon", "Le vide parfait", "La voie du ciel"],
    why: "« Migatte no Gokui » : le corps agit pour son compte, sans attendre l'ordre de l'esprit.",
  },

  {
    id: "te54", cat: "techniques", diff: 2,
    q: "Quelle attaque de la série est devenue la pose la plus imitée en photo par les fans ?",
    a: ["Le Kaméhaméha", "Le Kienzan", "Le Taiyoken", "Le Makankosappo"],
    why: "Mains jointes sur le côté, jambes fléchies : la posture a fait le tour du monde.",
  },

  {
    id: "te55", cat: "techniques", diff: 2,
    q: "Quelle transformation n'apparaît dans aucun chapitre du manga ?",
    a: ["Le Super Saiyan 4", "Le Super Saiyan 2", "Le Super Saiyan 3", "Le Super Saiyan Blue"],
    why: "Elle est propre à Dragon Ball GT, série produite après la fin de la prépublication.",
  },

  {
    id: "te56", cat: "techniques", diff: 3,
    q: "Quel personnage exécute le tout premier Kaméhaméha de la série ?",
    a: ["Kamé Sennin", "Son Goku", "Krilin", "Yamcha"],
    why: "Le maître le montre une fois, pour éteindre un incendie ; Goku le reproduit dans la foulée.",
  },

  {
    id: "te57", cat: "techniques", diff: 3,
    q: "Que signifie « Kikoho », le nom de l'attaque de Ten Shin Han ?",
    a: ["Le canon du souffle de ki", "Le triangle du ciel", "Le troisième œil", "La grue blanche"],
    why: "Le nom décrit le geste : les mains dessinent l'embouchure du canon.",
  },

  {
    id: "te58", cat: "techniques", diff: 3,
    q: "En quelle année le Super Saiyan apparaît-il pour la première fois dans le magazine ?",
    a: ["1991", "1987", "1994", "1996"],
    why: "Sept ans après le premier chapitre, en plein cœur de l'arc Freezer.",
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
    why: "Son scouter explose sur ce chiffre — et le nombre que retiendra le monde entier n'est pas celui-là.",
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
    why: "Frôler la mort puis guérir : le Saiyan revient toujours plus fort de l'infirmerie.",
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
  {
    id: 'po39', cat: 'power', diff: 3,
    q: "Quelle puissance de combat le scouter attribue-t-il à Chaozu, à l'arrivée des Saiyans ?",
    a: ["610", "981", "1 083", "450"],
    why: "Le plus faible des guerriers Z présents ce jour-là.",
  },
  {
    id: 'po40', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Piccolo atteint-il à l'arrivée des Saiyans ?",
    a: ["3 500", "1 830", "2 400", "4 000"],
    why: "Loin devant les humains, mais toujours sous les 4 000 de Nappa.",
  },
  {
    id: 'po41', cat: 'power', diff: 3,
    q: "Quelle puissance Goku atteint-il avec le Kaio-ken x2 face à Vegeta ?",
    a: ["16 000", "24 000", "12 000", "8 000"],
    why: "Le double de ses 8 000 — encore insuffisant face aux 18 000 du prince.",
  },
  {
    id: 'po42', cat: 'power', diff: 3,
    q: "Quelle puissance de combat possède un Saibaiman ?",
    a: ["1 200", "610", "2 000", "800"],
    why: "Assez pour tuer Yamcha, dont la puissance était pourtant supérieure.",
  },
  {
    id: 'po43', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Nail affiche-t-il face à Freezer ?",
    a: ["42 000", "23 000", "120 000", "18 000"],
    why: "Dérisoire face à Freezer, mais colossal pour un Namek non guerrier.",
  },
  {
    id: 'po44', cat: 'power', diff: 3,
    q: "Quelle puissance de combat le capitaine Ginyu possède-t-il ?",
    a: ["120 000", "42 000", "23 000", "530 000"],
    why: "Le plus puissant de son commando, et de loin.",
  },
  {
    id: 'po45', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Dodoria possède-t-il ?",
    a: ["22 000", "23 000", "18 000", "42 000"],
    why: "Presque au niveau de Zarbon, mais sans sa transformation.",
  },
  {
    id: 'po46', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Zarbon affiche-t-il sous sa forme normale ?",
    a: ["23 000", "22 000", "42 000", "18 000"],
    why: "Sa transformation la fait plus que doubler, au prix de son élégance.",
  },
  {
    id: 'po47', cat: 'power', diff: 3,
    q: "Par combien la transformation en singe géant multiplie-t-elle la puissance d'un Saiyan ?",
    a: ["10", "50", "5", "100"],
    why: "D'où l'intérêt de la queue, et le danger que représente la moindre pleine lune.",
  },
  {
    id: 'po48', cat: 'power', diff: 3,
    q: "Quelle puissance de combat Cui, l'ancien rival de Vegeta, possède-t-il ?",
    a: ["18 000", "22 000", "23 000", "24 000"],
    why: "Exactement le niveau de Vegeta avant la Terre — ce que Cui ignorait.",
  },
  {
    id: "po49", cat: "power", diff: 1,
    q: "Pourquoi Toriyama a-t-il cessé de chiffrer les puissances de combat ?",
    a: ["Les nombres devenaient ingérables", "Les lecteurs s'en plaignaient", "Son éditeur le lui a interdit", "Les scouters étaient trop longs à dessiner"],
    why: "Après Freezer, chaque combat aurait demandé un chiffre plus gros que le précédent.",
  },

  {
    id: "po50", cat: "power", diff: 1,
    q: "À partir de quel moment les scouters disparaissent-ils presque entièrement ?",
    a: ["Après l'arc Freezer", "Après l'arc des Saiyans", "Après l'arc Cell", "Après l'arc Boo"],
    why: "L'appareil s'efface en même temps que les chiffres qu'il servait à afficher.",
  },

  {
    id: "po51", cat: "power", diff: 1,
    q: "D'où viennent les puissances de combat chiffrées ?",
    a: ["Du manga lui-même", "De l'anime", "Des jeux vidéo", "Des magazines de fans"],
    why: "Scouters et nombres sont dans les pages dessinées par Toriyama dès l'arrivée de Raditz.",
  },

  {
    id: "po52", cat: "power", diff: 2,
    q: "Quel mot japonais la série emploie-t-elle pour « puissance de combat » ?",
    a: ["Sentôryoku", "Kiryoku", "Bujutsu", "Genkiryoku"],
    why: "Littéralement la force au combat — le mot que le manga emploie chaque fois qu'un chiffre tombe.",
  },

  {
    id: "po53", cat: "power", diff: 2,
    q: "Comment s'appelle la collection de guides officiels parue à la fin du manga ?",
    a: ["Daizenshuu", "Databook Z", "Kanzenshuu", "Shonen Files"],
    why: "C'est de là que vient la plupart des chiffres que le manga n'a jamais donnés.",
  },

  {
    id: "po54", cat: "power", diff: 2,
    q: "D'où vient le fameux « It's over 9000 ! », absent de la version originale ?",
    a: ["Du doublage anglais de l'anime", "Du manga", "D'un jeu vidéo", "D'un guide officiel"],
    why: "Le chiffre d'origine est 8 000 : l'écart d'un doublage est devenu plus célèbre que la scène.",
  },

  {
    id: "po55", cat: "power", diff: 2,
    q: "Dans quel magazine le manga Dragon Ball Super est-il prépublié ?",
    a: ["V-Jump", "Weekly Shōnen Jump", "Young Jump", "Shōnen Sunday"],
    why: "Un mensuel de la même maison, où la série paraît un chapitre à la fois.",
  },

  {
    id: "po56", cat: "power", diff: 3,
    q: "En quelle année les scouters apparaissent-ils pour la première fois dans le magazine ?",
    a: ["1988", "1984", "1991", "1995"],
    why: "Avec Raditz, quatre ans après le premier chapitre de la série.",
  },

  {
    id: "po57", cat: "power", diff: 3,
    q: "Quand les guides officiels Daizenshuu ont-ils été publiés ?",
    a: ["En 1995, à la fin du manga", "En 1988", "En 2003", "En 2015"],
    why: "Publiés au moment où la prépublication s'achevait, ils font le bilan de onze ans de série.",
  },

  {
    id: "po58", cat: "power", diff: 3,
    q: "Qu'est-ce qui remplace le scouter chez les guerriers Z ?",
    a: ["Rien : ils lisent le ki eux-mêmes", "Un scouter réparé par Bulma", "Un détecteur de la Capsule Corp", "Un cristal namek"],
    why: "Sentir le ki rend l'appareil inutile — et permet de rester invisible à celui qui en porte un.",
  },  /* ---------------------------------------------------------------
     COULISSES & CRÉATION
  --------------------------------------------------------------- */
  {
    id: 'co01', cat: 'coulisses', diff: 1,
    q: "Qui a créé et dessiné le manga Dragon Ball ?",
    a: ["Akira Toriyama", "Eiichirō Oda", "Masashi Kishimoto", "Yoshihiro Togashi"],
    why: "Il lance la série en 1984 et la dessine seul jusqu'à sa conclusion, onze ans plus tard.",
  },
  {
    id: 'co02', cat: 'coulisses', diff: 1,
    q: "Dans quel magazine Dragon Ball a-t-il été prépublié chapitre par chapitre ?",
    a: ["Weekly Shōnen Jump", "Weekly Shōnen Magazine", "Weekly Shōnen Sunday", "Young Jump"],
    why: "L'hebdomadaire phare de l'éditeur Shueisha, où la série paraît une semaine sur l'autre.",
  },
  {
    id: 'co03', cat: 'coulisses', diff: 1,
    q: "Quel roman classique chinois a inspiré les premières aventures de Goku ?",
    a: ["Le Voyage en Occident", "Au bord de l'eau", "Les Trois Royaumes", "Le Rêve dans le pavillon rouge"],
    why: "Son Goku est la lecture japonaise de Sun Wukong, le roi des singes du roman.",
  },
  {
    id: 'co04', cat: 'coulisses', diff: 1,
    q: "Quel manga à succès d'Akira Toriyama a précédé Dragon Ball ?",
    a: ["Dr Slump", "Sand Land", "Blue Dragon", "Cowa !"],
    why: "Les aventures d'Arale, publiées de 1980 à 1984, juste avant le premier chapitre de Dragon Ball.",
  },
  {
    id: 'co05', cat: 'coulisses', diff: 1,
    q: "Combien de tomes compte l'édition originale du manga ?",
    a: ["42", "34", "28", "50"],
    why: "Quarante-deux volumes, du premier chapitre à la toute dernière page.",
  },
  {
    id: 'co06', cat: 'coulisses', diff: 1,
    q: "Comment s'appelle le studio fondé par Akira Toriyama ?",
    a: ["Bird Studio", "Studio Ghibli", "Studio Pierrot", "Bones"],
    why: "Un clin d'œil à son nom : « tori » veut dire oiseau en japonais.",
  },
  {
    id: 'co07', cat: 'coulisses', diff: 1,
    q: "Quel studio d'animation a produit la série télévisée Dragon Ball ?",
    a: ["Toei Animation", "Madhouse", "Sunrise", "Studio Pierrot"],
    why: "L'anime démarre en 1986, deux ans seulement après le lancement du manga.",
  },
  {
    id: 'co08', cat: 'coulisses', diff: 1,
    q: "En quelle année le premier chapitre de Dragon Ball a-t-il paru ?",
    a: ["1984", "1979", "1990", "1995"],
    why: "Le début d'une série qui tiendra la couverture de son magazine pendant plus d'une décennie.",
  },
  {
    id: 'co09', cat: 'coulisses', diff: 1,
    q: "De quel légume le nom saiyan de Goku, Kakarot, s'inspire-t-il ?",
    a: ["La carotte", "Le radis", "Le chou", "L'asperge"],
    why: "Tous les Saiyans portent un nom de légume : c'est la règle que s'est fixée l'auteur.",
  },
  {
    id: 'co10', cat: 'coulisses', diff: 1,
    q: "Que signifie « yasai », le mot japonais dont « Saiyan » est l'anagramme ?",
    a: ["Légume", "Guerrier", "Étoile", "Singe"],
    why: "« Yasai » devient « saiya » par inversion des syllabes — le verlan japonais.",
  },
  {
    id: 'co11', cat: 'coulisses', diff: 1,
    q: "Le prénom de Bulma vient d'une pièce de vêtement. Laquelle ?",
    a: ["Un short de sport", "Un chapeau", "Une écharpe", "Une paire de bottes"],
    why: "Toute sa famille porte des noms de sous-vêtements, de son père jusqu'à ses enfants.",
  },
  {
    id: 'co12', cat: 'coulisses', diff: 1,
    q: "Qui dessine le manga Dragon Ball Super ?",
    a: ["Toyotarō", "Akira Toriyama", "Tite Kubo", "Hiro Mashima"],
    why: "Ancien dessinateur amateur repéré par l'éditeur ; Toriyama en supervisait le scénario.",
  },
  {
    id: 'co13', cat: 'coulisses', diff: 1,
    q: "Quelle série animée adapte la seconde moitié du manga, à partir de 1989 ?",
    a: ["Dragon Ball Z", "Dragon Ball GT", "Dragon Ball Kai", "Dragon Ball Daima"],
    why: "Elle reprend le récit à l'arrivée de Raditz et le suit jusqu'à la fin du manga.",
  },
  {
    id: 'co14', cat: 'coulisses', diff: 1,
    q: "Quelle série animée de 1996 n'est tirée d'aucun chapitre du manga ?",
    a: ["Dragon Ball GT", "Dragon Ball Z", "Dragon Ball Kai", "Dragon Ball Super"],
    why: "Un scénario original écrit par la Toei après la fin de la prépublication.",
  },
  {
    id: 'co15', cat: 'coulisses', diff: 1,
    q: "Quel éditeur japonais publie Dragon Ball ?",
    a: ["Shueisha", "Kodansha", "Shogakukan", "Kadokawa"],
    why: "La maison qui édite l'hebdomadaire où la série est parue de bout en bout.",
  },
  {
    id: 'co16', cat: 'coulisses', diff: 1,
    q: "En quelle année Akira Toriyama s'est-il éteint ?",
    a: ["2024", "2015", "2019", "2021"],
    why: "Disparu le 1er mars 2024, à 68 ans, quarante ans après le premier chapitre.",
  },
  {
    id: 'co17', cat: 'coulisses', diff: 2,
    q: "Combien de chapitres compte le manga Dragon Ball ?",
    a: ["519", "302", "420", "640"],
    why: "Cinq cent dix-neuf chapitres hebdomadaires, sans presque aucune interruption.",
  },
  {
    id: 'co18', cat: 'coulisses', diff: 2,
    q: "Combien de tomes compte la Perfect Edition du manga ?",
    a: ["34", "42", "28", "46"],
    why: "La réédition grand format resserre les 42 tomes d'origine en 34 volumes.",
  },
  {
    id: 'co19', cat: 'coulisses', diff: 2,
    q: "Qui a soufflé à Akira Toriyama le nom du Kaméhaméha ?",
    a: ["Sa femme", "Son éditeur", "Son fils", "Un lecteur"],
    why: "L'auteur séchait sur le nom de l'attaque ; elle lui a proposé celui-là, il l'a gardé.",
  },
  {
    id: 'co20', cat: 'coulisses', diff: 2,
    q: "De quel mot japonais le nom du commando Ginyu est-il tiré ?",
    a: ["Lait", "Étoile", "Tonnerre", "Épice"],
    why: "« Gyūnyū » veut dire lait : chaque membre porte un nom de produit laitier.",
  },
  {
    id: 'co21', cat: 'coulisses', diff: 2,
    q: "Les habitants de Namek portent des noms inspirés de quoi ?",
    a: ["Escargots et limaces", "Fleurs des champs", "Épices", "Minéraux"],
    why: "« Namekuji » veut dire limace ; Dendé vient de « denden-mushi », l'escargot.",
  },
  {
    id: 'co22', cat: 'coulisses', diff: 2,
    q: "De quoi le nom de Piccolo s'inspire-t-il ?",
    a: ["D'un instrument de musique", "D'un plat italien", "D'un oiseau", "D'une étoile"],
    why: "Sa lignée suit la même règle : Tambourine, Cymbal, Drum et Piano.",
  },
  {
    id: 'co23', cat: 'coulisses', diff: 2,
    q: "Quel éditeur a accompagné les débuts de Toriyama et l'a poussé vers Dragon Ball ?",
    a: ["Kazuhiko Torishima", "Masakazu Katsura", "Yoshihiro Togashi", "Hisashi Sasaki"],
    why: "Déjà son éditeur sur Dr Slump, il est resté célèbre pour ses refus à répétition.",
  },
  {
    id: 'co24', cat: 'coulisses', diff: 2,
    q: "De quel univers culinaire viennent les noms de Yamcha, Oolong et Puerh ?",
    a: ["Le thé chinois", "Le saké", "Les pâtisseries", "Les sodas"],
    why: "Oolong et pu-erh sont deux thés ; « yamcha » désigne le fait d'en boire avec des dim sum.",
  },
  {
    id: 'co25', cat: 'coulisses', diff: 2,
    q: "Que signifie le nom du tournoi, le « Tenkaichi Budokai » ?",
    a: [
      "Les arts martiaux du plus fort sous le ciel",
      "Le tournoi des sept boules",
      "La coupe du roi démon",
      "L'arène des dieux",
    ],
    why: "« Tenkaichi » veut dire premier sous le ciel : le titre est dans le nom.",
  },
  {
    id: 'co26', cat: 'coulisses', diff: 2,
    q: "En quelle année la prépublication du manga s'est-elle achevée ?",
    a: ["1995", "1992", "1997", "2000"],
    why: "Onze ans de parution hebdomadaire, refermés sur le tournoi qui clôt la série.",
  },
  {
    id: 'co27', cat: 'coulisses', diff: 2,
    q: "Pour quelle série de jeux vidéo Toriyama a-t-il dessiné les personnages ?",
    a: ["Dragon Quest", "Final Fantasy", "The Legend of Zelda", "Street Fighter"],
    why: "Un travail commencé en 1986 et poursuivi sur presque tous les épisodes suivants.",
  },
  {
    id: 'co28', cat: 'coulisses', diff: 2,
    q: "Quel manga de Toriyama suit un jeune démon dans un désert privé d'eau ?",
    a: ["Sand Land", "Blue Dragon", "Kajika", "Neko Majin"],
    why: "Publié en 2000, il a été adapté en film d'animation puis en série.",
  },
  {
    id: 'co29', cat: 'coulisses', diff: 3,
    q: "Quel légume a donné son nom à Nappa ?",
    a: ["Le chou chinois", "Le navet", "L'artichaut", "Le poireau"],
    why: "Le « nappa » est un chou pommé très courant dans la cuisine japonaise.",
  },
  {
    id: 'co30', cat: 'coulisses', diff: 3,
    q: "Et celui du frère aîné de Goku, Raditz ?",
    a: ["Le radis", "La betterave", "La laitue", "Le céleri"],
    why: "« Radish » en anglais : la règle des légumes vaut aussi pour la famille de Goku.",
  },
  {
    id: 'co31', cat: 'coulisses', diff: 3,
    q: "Quel légume se cache derrière le nom de Broly ?",
    a: ["Le brocoli", "Le poireau", "Le haricot", "L'endive"],
    why: "Son père Paragus complète la fratrie végétale : son nom vient de l'asperge.",
  },
  {
    id: 'co32', cat: 'coulisses', diff: 3,
    q: "Quel produit laitier se cache derrière le nom de Jeece ?",
    a: ["Le fromage", "Le beurre", "La crème", "Le yaourt"],
    why: "« Cheese », prononcé à la japonaise, comme tout le commando Ginyu.",
  },
  {
    id: 'co33', cat: 'coulisses', diff: 3,
    q: "Et derrière celui de Butta, le plus rapide du commando ?",
    a: ["Le beurre", "Le fromage", "Le lait", "La crème"],
    why: "« Batā », le beurre : Reacom vient de la crème et Guldo du yaourt.",
  },
  {
    id: 'co34', cat: 'coulisses', diff: 3,
    q: "Quel vêtement a donné son nom à Trunks ?",
    a: ["Le caleçon", "La chaussette", "Le gant", "Le bonnet"],
    why: "Sa sœur Bra suit la même logique — la famille Brief au grand complet.",
  },
  {
    id: 'co35', cat: 'coulisses', diff: 3,
    q: "Que signifie « Porunga », le nom du dragon de Namek ?",
    a: ["Le dieu des rêves", "Le gardien du ciel", "Le roi des étoiles", "Le serpent d'or"],
    why: "Un nom en langue namek, à l'inverse de Shenron qui vient du chinois.",
  },
  {
    id: 'co36', cat: 'coulisses', diff: 3,
    q: "Que devait annoncer le « Z » de Dragon Ball Z ?",
    a: [
      "La fin de la série, Z fermant l'alphabet",
      "Le nom de la planète Zeta",
      "Le mot japonais pour puissance",
      "La zone d'entraînement des Saiyans",
    ],
    why: "L'auteur voulait alors conclure : la suite en a décidé autrement, pendant sept ans.",
  },
  {
    id: 'co37', cat: 'coulisses', diff: 3,
    q: "Sous quelle forme Akira Toriyama se représentait-il dans ses pages bonus ?",
    a: ["Un petit robot masqué", "Un oiseau", "Un chat", "Un samouraï"],
    why: "Un robot au masque à gaz, sa signature dans les marges de ses mangas.",
  },
  {
    id: 'co38', cat: 'coulisses', diff: 3,
    q: "Quel remontage de 2009 resserre l'anime sur le déroulé exact du manga ?",
    a: ["Dragon Ball Kai", "Dragon Ball GT", "Dragon Ball Super", "Dragon Ball Daima"],
    why: "Les épisodes de remplissage disparaissent et l'image est retravaillée.",
  },
  {
    id: 'co39', cat: 'coulisses', diff: 3,
    q: "Quelle série de 2024 fête les quarante ans de la licence en rajeunissant les héros ?",
    a: ["Dragon Ball Daima", "Dragon Ball Super", "Dragon Ball Heroes", "Dragon Ball GT"],
    why: "Akira Toriyama a travaillé sur son scénario et ses personnages avant sa disparition.",
  },
  {
    id: 'co40', cat: 'coulisses', diff: 3,
    q: "Quel manga de Toriyama se déroule dans le même univers, autour d'un patrouilleur galactique ?",
    a: ["Jaco the Galactic Patrolman", "Sand Land", "Cowa !", "Kajika"],
    why: "On y croise la sœur aînée de Bulma : le lien avec Dragon Ball est explicite.",
  },
  {
    id: 'co41', cat: 'coulisses', diff: 3,
    q: "Pour quel jeu de rôle de 1995 Toriyama a-t-il dessiné les personnages avec le créateur de Dragon Quest ?",
    a: ["Chrono Trigger", "Secret of Mana", "Terranigma", "Illusion of Time"],
    why: "Un trio d'auteurs réuni pour l'occasion, avec Yuji Horii au scénario.",
  },
  {
    id: 'co42', cat: 'coulisses', diff: 3,
    q: "À quoi renvoie le nom de Chichi en japonais ?",
    a: ["Au lait", "Au feu", "À la montagne", "Au vent"],
    why: "Elle est la fille du Roi Gyumao, littéralement le « roi démon vache » : le thème est familial.",
  },
  {
    id: 'co43', cat: 'coulisses', diff: 3,
    q: "Quelle héroïne d'un autre manga de Toriyama croise Goku au fil de sa quête ?",
    a: ["Arale", "Ranma", "Lum", "Nausicaä"],
    why: "Le Village Pingouin surgit en pleine traque du Général Blue, le temps d'un détour.",
  },
  {
    id: 'co44', cat: 'coulisses', diff: 3,
    q: "De quel appareil le nom de Freezer s'inspire-t-il ?",
    a: ["Le congélateur", "Le four", "Le lave-linge", "Le grille-pain"],
    why: "Sa famille file la métaphore du froid : Cooler, King Cold et jusqu'à son ancêtre Chilled.",
  },
  {
    id: 'co45', cat: 'coulisses', diff: 3,
    q: "En mémoire de qui Goku a-t-il baptisé son fils aîné ?",
    a: ["Son grand-père adoptif", "Son maître Kamé Sennin", "Son père Bardock", "Le Tout-Puissant"],
    why: "Le vieil homme qui l'a recueilli portait déjà le nom de Son Gohan.",
  },
  {
    id: 'co46', cat: 'coulisses', diff: 3,
    q: "Quel plat a donné son nom à Chaozu ?",
    a: ["Le ravioli chinois", "La soupe de nouilles", "Le canard laqué", "Le riz sauté"],
    why: "Son inséparable Tenshinhan doit le sien à un bol de riz garni d'omelette au crabe.",
  },
  {
    id: 'co47', cat: 'coulisses', diff: 3,
    q: "Combien de temps sépare la fin du manga de celle de sa première adaptation animée ?",
    a: ["Environ un an", "Cinq ans", "Dix ans", "Aucun : elles s'arrêtent le même mois"],
    why: "Le manga se referme en 1995, l'anime poursuit sa diffusion jusqu'en 1996.",
  },
  {
    id: 'co48', cat: 'coulisses', diff: 3,
    q: "Quel éditeur publie historiquement le manga en France ?",
    a: ["Glénat", "Kana", "Pika", "Ki-oon"],
    why: "La première édition française paraît au début des années 1990, et la série n'a jamais changé de maison.",
  },
  {
    id: "co49", cat: "coulisses", diff: 1,
    q: "Dans quel sens se lit l'édition d'origine du manga ?",
    a: ["De droite à gauche", "De gauche à droite", "De haut en bas", "En colonnes alternées"],
    why: "Le sens de lecture japonais, que l'édition française a fini par respecter après des débuts inversés.",
  },

  {
    id: "co50", cat: "coulisses", diff: 1,
    q: "Lequel de ces mangas n'a jamais été prépublié dans le Weekly Shōnen Jump ?",
    a: ["L'Attaque des Titans", "One Piece", "Naruto", "Bleach"],
    why: "Il paraissait chez un éditeur concurrent, dans un mensuel d'un tout autre catalogue.",
  },

  {
    id: "co51", cat: "coulisses", diff: 1,
    q: "En quelle année Dragon Ball Super a-t-il commencé sa diffusion ?",
    a: ["2015", "2009", "2012", "2018"],
    why: "Première série télévisée inédite après presque vingt ans d'absence.",
  },

  {
    id: "co52", cat: "coulisses", diff: 2,
    q: "Dans quelle région du Japon Akira Toriyama a-t-il vécu toute sa vie ?",
    a: ["La préfecture d'Aichi", "Tokyo", "Osaka", "Hokkaidō"],
    why: "Il a toujours refusé de monter à Tokyo, et envoyait ses planches depuis sa région natale.",
  },

  {
    id: "co53", cat: "coulisses", diff: 2,
    q: "Quelle émission a fait connaître Dragon Ball au public français à partir de 1988 ?",
    a: ["Le Club Dorothée", "Récré A2", "Les Minikeums", "Téléchat"],
    why: "Une génération entière a découvert la série là, bien avant que le manga ne soit traduit.",
  },

  {
    id: "co54", cat: "coulisses", diff: 2,
    q: "Comment s'appelle, au Japon, l'édition grand format que la France publie sous le nom de Perfect Edition ?",
    a: ["Kanzenban", "Bunkoban", "Aizoban", "Shinsoban"],
    why: "Grand format, pages couleur restaurées et nouvelles couvertures signées de l'auteur.",
  },

  {
    id: "co55", cat: "coulisses", diff: 2,
    q: "Quelle distinction française Akira Toriyama a-t-il reçue en 2019 ?",
    a: ["Chevalier des Arts et des Lettres", "La Légion d'honneur", "Le prix Goncourt", "Un César d'honneur"],
    why: "Une reconnaissance rare pour un auteur de manga, dans le pays qui l'a le plus lu après le Japon.",
  },

  {
    id: "co56", cat: "coulisses", diff: 3,
    q: "Quel titre porte le tout premier chapitre du manga ?",
    a: ["Bulma et Son Goku", "La quête des sept boules", "Le garçon à la queue", "Le nuage magique"],
    why: "Les deux noms du titre disent déjà le duo qui lance toute l'aventure.",
  },

  {
    id: "co57", cat: "coulisses", diff: 3,
    q: "Combien d'années séparent la fin de Dragon Ball GT du retour de la licence au cinéma ?",
    a: ["Environ quinze ans", "Deux ans", "Cinq ans", "Vingt-cinq ans"],
    why: "La série s'arrête en 1997 ; il faut attendre 2013 pour un nouveau long métrage.",
  },

  {
    id: "co58", cat: "coulisses", diff: 3,
    q: "Quel âge avait Akira Toriyama quand le premier chapitre est paru ?",
    a: ["29 ans", "22 ans", "35 ans", "42 ans"],
    why: "Né en avril 1955, il avait déjà quatre ans de Dr Slump derrière lui.",
  },]

