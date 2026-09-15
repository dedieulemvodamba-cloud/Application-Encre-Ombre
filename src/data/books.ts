import { Book } from '../types';

export const BOOKS_COLLECTION: Book[] = [
  {
    id: 'ombre-du-congo',
    title: "L'Ombre du Congo",
    subtitle: 'Les Fils de Salomon',
    genre: "Roman d'aventure",
    badge: 'roman',
    badgeLabel: 'Roman',
    description:
      "Entre les secrets de la franc-maçonnerie africaine et les mystères de l'Égypte ancienne, un archéologue congolais court contre la montre pour découvrir une vérité vieille de trois millénaires.",
    priceFcfa: 7500,
    priceEur: 11.5,
    isbnCode: '978-2-958432-01-4',
    rating: 4.9,
    tags: ['Archéologie', 'Sociétés Secrètes', 'Nil & Congo', 'Histoire Oubliée'],
    chapters: [
      {
        number: 1,
        title: 'Le manuscrit des Chutes de Boali',
        content: [
          "La nuit était tombée sur le fleuve Congo avec la lourdeur d'un voile de suie. Dans son cabinet exigu du quartier Bacongo à Brazzaville, le professeur Michel Mabiala examinait à la loupe les fragments d'un parchemin que nul n'aurait dû tenir entre ses mains.",
          "Ce n'était pas du papyrus ordinaire du Delta du Nil. La fibre était tressée d'écorce de limba séculaire, imprégnée d'une encre violette faite de sève et de minerai de cuivre. Mais les hiéroglyphes gravés dessus étaient formels : ils portaient le sceau royal de la reine de Saba et l'emblème crypté des bâtisseurs du premier Temple.",
          "— « Si ce que je lis est exact », murmura Michel en sentant un frisson glacé lui remonter l'échine, « la lignée des gardiens n'a jamais quitté le grand bassin. Ils ont traversé les cataractes bien avant les caravanes arabes et les caravelles portugaises. »",
          "Soudain, un coup sec retentit contre le volet en bois d'acajou. Dehors, un moteur de hors-bord venait de s'éteindre sur la rive du fleuve. L'alerte était donnée."
        ]
      },
      {
        number: 2,
        title: "L'Étoile et le Léopard",
        content: [
          "Au cœur de la forêt équatoriale, le silence n'est jamais vide. Il bruisse du pas des ancêtres et du chant lointain des engoulevents.",
          "Michel avançait guidé par les coordonnées gravées sur la bague d'obsidienne de son grand-père. Chaque pas dans la boue rouge semblait résonner comme une prière interdite. Devant lui s'élevait enfin le tumulus que les cartes satellites modernes avaient toujours confondu avec une colline rocheuse.",
          "— « Les secrets que les hommes gardent le plus farouchement ne sont jamais des vérités cachées », se remémora-t-il. « Ce sont des peurs. La peur de découvrir que leur pouvoir repose sur un songe. »"
        ]
      }
    ]
  },
  {
    id: 'shadows-and-scars',
    title: 'Shadows & Scars',
    subtitle: 'Une histoire entre deux continents',
    genre: 'BD adulte multiculturelle',
    badge: 'bd',
    badgeLabel: 'Bande Dessinée',
    description:
      'Entre les gratte-ciels de New York et les rives du fleuve Congo, une famille cache un secret qui traversera deux continents, plusieurs vies et toutes les émotions humaines.',
    priceFcfa: 9000,
    priceEur: 13.8,
    isbnCode: '978-2-958432-02-1',
    rating: 4.8,
    tags: ['Graphic Novel', 'Diaspora', 'New York', 'Drames & Espoirs'],
    chapters: [
      {
        number: 1,
        title: 'Planche 01 : Harlem - Minuit sous la pluie',
        content: [
          "[Case 1 - Vue en plongée] : Les néons bleutés de la 125e Rue se reflètent dans les flaques d'asphalte noir. Une silhouette enveloppée d'un manteau camel marche à pas pressés contre le vent glacial d'octobre.",
          "[Case 2 - Gros plan] : Naomi serre contre sa poitrine un dossier cartonné noué d'une ficelle de raphia traditionnel. Les lettres dorées disent : 'Héritage Mpassi — Non réclamé'.",
          "[Case 3 - Flashback teinté sépia] : Une terrasse ensoleillée à Poto-Poto en 1984. Un saxophoniste joue pour une femme dont le regard porte la nostalgie d'un monde qu'elle sait condamné.",
          "[Voix-off de Naomi] : 'Mon père a passé trente ans à New York à dessiner des gratte-ciels pour oublier la seule maison qui comptait. Mais quand le testament est tombé, les ombres n'ont pas accepté d'être effacées.'"
        ]
      },
      {
        number: 2,
        title: 'Planche 02 : Le vol de nuit vers Maya-Maya',
        content: [
          "[Case 1 - Intérieur cabine] : À 10 000 mètres d'altitude, au-dessus du Sahara étoilé. Naomi déplie un croquis inédit trouvé dans la reliure du journal intime.",
          "[Case 2 - Vue rapprochée du dessin] : Un pont suspendu invisible reliant la Statue de la Liberté aux berges du majestueux fleuve Congo.",
          "[Dialogue] : 'Tu ne fuis pas l'Amérique, petite. Tu ramènes la mémoire là où elle a pris racine.'"
        ]
      }
    ]
  },
  {
    id: 'histoire-du-monde',
    title: "L'Histoire du Monde",
    subtitle: 'De la Création à la Fin',
    genre: 'Essai illustré',
    badge: 'doc',
    badgeLabel: 'Documentaire',
    description:
      "Du Big Bang aux théories de la fin des temps, en passant par les grandes religions, la philosophie et les sociétés secrètes — un voyage à travers 13,8 milliards d'années.",
    priceFcfa: 12000,
    priceEur: 18.5,
    isbnCode: '978-2-958432-03-8',
    rating: 5.0,
    tags: ['Cosmologie', 'Philosophie', 'Civilisations', 'Futur & Eschatologie'],
    chapters: [
      {
        number: 1,
        title: 'Prologue : Le souffle primordial et le premier verbe',
        content: [
          "Avant la lumière, il n'y avait pas le vide tel que nous le concevons. Il y avait une tension infinie, un point d'une densité absolue où dormaient l'espace, le temps et toutes les mémoires à venir.",
          "Ce que la physique contemporaine nomme singularité, les mythes de l'Afrique centrale le désignaient sous le nom de 'Nzambi Mpungu' — l'incommensurable vibration primordiale qui se divise pour s'expérimenter elle-même.",
          "Depuis cet instant initial jusqu'à nos jours, chaque galaxie, chaque arbre, chaque civilisation qui s'élève et s'écroule n'est qu'une syllabe d'une même phrase cosmique."
        ]
      },
      {
        number: 2,
        title: 'Chapitre IV : Les grandes confluences des fleuves de la pensée',
        content: [
          "Pourquoi avons-nous scindé l'histoire universelle en couloirs isolés ? Du Nil au Gange, du Yangzi Jiang au Congo, les savants antiques partageaient une intuition identique : celle de l'interdépendance sacrée.",
          "Les tablettes de Kémêt répondaient aux rouleaux sumériens et aux chants des Dogons. Cet essai restitue les liens invisibles qui unissent la géométrie pythagoricienne aux fresques millénaires du Tassili."
        ]
      }
    ]
  },
  {
    id: 'livre-d-henoch',
    title: "Le Livre d'Hénoch",
    subtitle: "Traduit sur le texte éthiopien par François Martin (1906)",
    genre: "Texte Sacré & Apocryphe Majeur",
    badge: 'sacre',
    badgeLabel: 'Texte Sacré',
    description:
      "Le grand texte apocryphe majeur révélant la chute des anges veilleurs sur le mont Hermon, la descendance des géants, la vision du Trône de Cristal de la Grande Gloire, les secrets astronomiques des luminaires et le jugement dernier.",
    priceFcfa: 10000,
    priceEur: 15.0,
    isbnCode: '978-2-88241-196-8',
    rating: 5.0,
    tags: ['Angélologie', 'Les Veilleurs', 'Mont Hermon', 'Cosmologie Éthiopienne', 'William Blake'],
    chapters: [
      {
        number: 1,
        title: "Chapitre I — Prédiction du jugement dernier",
        content: [
          "1. Parole de bénédiction d'Hénoch, comment il bénit les élus et les justes qui vivront au jour de l'affliction, pour repousser tous les méchants et les impies tandis que les justes seront sauvés.",
          "2. Hénoch prit donc la parole et prononçant sa parabole, il dit, lui, l'homme juste dont les yeux ont été ouverts par le Seigneur, et qui a vu la vision du Saint qui est dans les cieux, que m'ont montrée les anges : J'ai tout appris d'eux, et j'ai compris, moi, ce que je voyais ; et ce n'est point pour cette génération, mais pour celle qui vient, lointaine.",
          "3. C'est au sujet des élus que je parle, à leur sujet que je prononce une parabole : Il sortira de sa demeure, le Saint et le Grand.",
          "4. Le Dieu du monde marchera de là sur la montagne du Sinaï, et il apparaîtra au milieu de son armée ; et, dans la force de sa puissance, il apparaîtra du haut des cieux.",
          "5. Et tous seront dans l'épouvante, et les veilleurs trembleront ; la crainte et un grand tremblement les saisiront jusqu'aux extrémités de la terre.",
          "6. Les hautes montagnes seront ébranlées, et les collines élevées seront abaissées, et elles fondront comme la cire devant la flamme.",
          "7. Aux justes, il donnera la paix, et il gardera les élus ; sur eux reposera la clémence : ils seront tous de Dieu, et ils seront heureux, et ils seront bénis, et c'est pour eux que brillera la lumière de Dieu."
        ]
      },
      {
        number: 6,
        title: "Chapitre VI — L'union des anges avec les filles des hommes",
        content: [
          "1. Or, lorsque les enfants des hommes se furent multipliés, il leur naquit en ces jours des filles belles et jolies ;",
          "2. et les anges, fils des cieux, les virent, et ils les désirèrent, et ils se dirent entre eux : « Allons, choisissons-nous des femmes parmi les enfants des hommes et engendrons-nous des enfants. »",
          "3. Alors Semyaza, leur chef, leur dit : « Je crains que vous ne vouliez peut-être pas réellement accomplir cette œuvre, et je serai, moi seul, responsable d'un grand péché. »",
          "4. Mais tous lui répondirent : « Faisons tous un serment, et promettons-nous tous les uns aux autres avec anathème de ne pas changer de desseins, mais d'exécuter réellement ce dessein. »",
          "5. Alors ils jurèrent tous ensemble et s'engagèrent là-dessus les uns envers les autres avec anathème.",
          "6. Or ils étaient en tout deux cents, et ils descendirent sur Ardis, le sommet du mont Hermon et ils l'appelèrent « mont Hermon » parce que c'est sur lui qu'ils avaient juré et s'étaient engagés avec anathème.",
          "7. Et voici les noms de leurs chefs : Semyaza, leur prince ; Arakib, Aramiel, Kôkabiel, Tamiel, Ramiel, Daniel, Ezéqiel, Baraqiel, Asaël, Armaros, Batariel, Ananiel, Zaqilê, Samsapeel, Satariel, Touriel, Yomeyal, Arazeyal. Ce sont leurs chefs de dizaine."
        ]
      },
      {
        number: 14,
        title: "Chapitre XIV — Vision d'Hénoch : la demeure de feu et le Trône de Dieu",
        content: [
          "1. Ce livre est la parole de justice et de la correction des veilleurs qui existent depuis l'éternité, selon que l'a ordonné le Saint et le Grand dans cette vision.",
          "2. Or la vision m'apparut ainsi : voici que des nuages m'appelèrent dans la vision, et une nuée m'appela ; et le cours des étoiles et les éclairs me firent hâter ; et les vents, dans la vision, me firent voler ; ils m'emportèrent en haut et me firent entrer dans les cieux.",
          "3. J'entrai jusqu'à ce que je fusse arrivé près d'un mur construit en pierres de grêle ; des langues de feu l'entouraient, et elles commencèrent à m'effrayer.",
          "4. J'entrai dans les langues de feu et j'approchai d'une grande maison, bâtie en pierres de grêle ; les murs de cette maison étaient comme une mosaïque en pierres de grêle, et son sol était de grêle. Son toit était comme le chemin des étoiles et des éclairs, au milieu se tenaient des chérubins de feu, et son ciel était d'eau.",
          "5. Et voici : une autre maison, plus grande que la première, dont toutes les portes étaient ouvertes devant moi ; elle était bâtie en langues de feu, et en tout si excellente, en magnificence, en splendeur et en grandeur, que je ne puis vous le dire.",
          "6. Et je vis dans cette maison un trône élevé dont l'aspect était celui du cristal, et dont le pourtour était comme le soleil brillant, et la voix des chérubins se faisait entendre. De sous le trône sortaient des fleuves de feu ardent.",
          "7. La Grande Gloire siégeait sur ce trône, et son vêtement était plus brillant que le soleil et plus blanc que toute neige. Pas un ange ne pouvait entrer dans cette maison et voir la face du Glorieux et du Magnifique, et aucun être de chair ne pouvait le regarder."
        ]
      },
      {
        number: 20,
        title: "Chapitre XX — Les noms et rôles des saints anges qui veillent",
        content: [
          "1. Voici les noms des saints anges qui veillent :",
          "2. Uriel, l'un des saints anges, celui du monde et du Tartare ;",
          "3. Raphaël, l'un des saints anges, celui des âmes des hommes ;",
          "4. Raguël, l'un des saints anges, qui tire vengeance du monde des luminaires ;",
          "5. Michaël, l'un des saints anges, préposé aux meilleurs des hommes, à la garde du peuple ;",
          "6. Saraqiel, l'un des saints anges, préposé aux esprits des enfants des hommes qui pèchent contre les esprits ;",
          "7. Gabriel, l'un des saints anges, préposé au paradis, aux dragons et aux chérubins ;",
          "8. Remeiel, l'un des saints anges, que Dieu a préposé sur les ressuscités. Des archanges, ce sont les sept noms."
        ]
      },
      {
        number: 46,
        title: "Chapitre XLVI — La « Tête des jours » et le Fils de l'homme",
        content: [
          "1. Là je vis quelqu'un qui avait une « tête de jours », et sa tête était comme de la laine blanche ; et avec lui un autre dont la figure avait l'apparence d'un homme, et sa figure était pleine de grâce, comme un des anges saints.",
          "2. J'interrogeai l'ange qui marchait avec moi, et qui me faisait connaître tous les secrets au sujet de ce Fils de l'homme : « Qui est-il, et d'où vient-il ? pourquoi marche-t-il avec la Tête des jours ? »",
          "3. Il me répondit et me dit : « C'est le Fils de l'homme, qui possède la justice et avec lequel la justice habite, qui révélera tous les trésors des secrets, parce que le Seigneur des esprits l'a choisi, et son sort a vaincu par le droit devant le Seigneur des esprits pour l'éternité. »",
          "4. Le Fils de l'homme fera lever les rois et les puissants de leurs couches, et les forts de leurs sièges ; et il rompra les freins des forts, et il brisera les dents des pécheurs, et il renversera les rois de leurs trônes."
        ]
      }
    ]
  },
  {
    id: 'ombre-de-kinshasa',
    title: "L'Ombre de Kinshasa",
    subtitle: 'Livre & adaptation BD — Romance • Drame • Action • Horreur • Comédie • Thriller',
    genre: "Roman d'espionnage & Adaptation BD",
    badge: 'bd',
    badgeLabel: 'Livre & BD',
    description:
      "Entre Brazzaville et Kinshasa, une mission sous haute tension rassemble James Bond, la mystérieuse Sarah Jay, une journaliste d'investigation intrépide et un groupe d'intervention coréen. Entre faux-semblants, secrets d'État et humour congolais au cœur du péril, découvrez le roman complet et son découpage en bande dessinée.",
    priceFcfa: 8000,
    priceEur: 12.0,
    isbnCode: '978-2-958432-05-2',
    rating: 4.9,
    tags: ['Brazzaville', 'Kinshasa', 'James Bond', 'Espionnage', 'Adaptation BD', 'Thriller'],
    chapters: [
      {
        number: 1,
        title: "Note d'Auteur & Personnages Principaux",
        content: [
          "NOTE : Cette œuvre est une fiction. Les personnages inspirés de personnalités ou de personnages connus sont utilisés ici dans un univers imaginaire. Les passages romantiques peuvent être sensuels, mais restent non explicites.",
          "REGISTRES & GENRES : Romance • Drame • Action • Horreur • Comédie • Thriller.",
          "GALERIE DES PERSONNAGES PRINCIPAUX :",
          "• James Bond — Agent secret britannique d'élite envoyé en Afrique centrale pour neutraliser une opération internationale clandestine.",
          "• Sarah Jay — Femme mystérieuse, hautement intelligente et déterminée, dont le passé trouble est la clé de toute l'affaire.",
          "• David — Jeune Congolais de Brazzaville, entraîné dans l'engrenage après une rencontre nocturne fortuite.",
          "• Mia Khalifa — Journaliste d'investigation indépendante traquant sans relâche les ramifications d'une organisation secrète.",
          "• Mallory — Figure centrale de l'intrigue, élégante, imprévisible et redoutable, dépositaire d'une partie cruciale de la vérité.",
          "• L'équipe coréenne — Une unité d'intervention de spécialistes venus de Séoul, disposant d'équipements technologiques de pointe.",
          "• Les alliés congolais — Habitants, enquêteurs de terrain et complices locaux indispensables à la survie de la mission."
        ]
      },
      {
        number: 2,
        title: 'Chapitre 1 — La Rencontre à Brazzaville',
        content: [
          "La nuit enveloppe Brazzaville. Dans un quartier animé, les lumières des restaurants se reflètent sur les carrosseries des voitures et sur le bitume tiède.",
          "Un jeune Congolais, David, remarque Sarah Jay assise seule à une table. Elle semble attendre quelqu'un avec une vigilance nerveuse mais dissimulée.",
          "Une conversation commence. Le courant passe immédiatement, mais Sarah reste mystérieuse, pesant chaque mot avec une prudence calculée.",
          "Avant de partir précipitamment, elle glisse à David un petit morceau de papier : « Ne fais confiance à personne. »"
        ]
      },
      {
        number: 3,
        title: 'Chapitre 2 — Le Message Secret',
        content: [
          "David découvre que le papier contient une adresse discrète et une heure précise au cœur de la ville.",
          "Au même moment, James Bond arrive secrètement à Brazzaville. Sa mission : démanteler une organisation internationale qui cherche à mettre la main sur une mystérieuse archive hautement classifiée.",
          "Mia Khalifa, journaliste indépendante, enquête elle aussi depuis des mois sur les agissements de cette même organisation.",
          "Leurs chemins finissent inévitablement par se croiser, déclenchant une onde de choc inattendue."
        ]
      },
      {
        number: 4,
        title: 'Chapitre 3 — Romance et Mensonges',
        content: [
          "Entre David et Sarah, les sentiments deviennent plus intenses chaque jour. Sarah voudrait lui révéler toute la vérité, mais elle redoute par-dessus tout de le mettre en danger de mort.",
          "Leur relation oscille entre confiance, jalousie et secrets inavoués.",
          "Pendant ce temps, Mallory apparaît dans l'arène. Elle connaît intimement Sarah et semble savoir exactement où se trouve la fameuse archive convoitée."
        ]
      },
      {
        number: 5,
        title: 'Chapitre 4 — L’Ombre Coréenne',
        content: [
          "Une équipe venue de Corée du Sud arrive discrètement à Brazzaville. Ses membres possèdent des renseignements technologiques et tactiques indispensables.",
          "Une alliance fragile se forme entre James Bond, les spécialistes coréens et les enquêteurs congolais.",
          "Mais quelqu'un trahit le groupe. Une fausse piste minutieusement orchestrée les conduit tout droit dans un ancien bâtiment abandonné."
        ]
      },
      {
        number: 6,
        title: 'Chapitre 5 — La Maison Abandonnée',
        content: [
          "Une pluie battante commence à s'abattre sur les toitures de tôle. À peine entrés dans le bâtiment silencieux, les lourdes portes d'accès se referment mystérieusement derrière eux.",
          "Des bruits de pas résonnent dans les couloirs obscurs alors que personne ne semble être là.",
          "L'horreur et l'angoisse s'installent. Même Bond perd momentanément son sang-froid face à cette sourde menace.",
          "David découvre alors par hasard une pièce cachée contenant des photographies d'espionnage et des dossiers confidentiels datant de plusieurs années."
        ]
      },
      {
        number: 7,
        title: 'Chapitre 6 — Le Rire au Milieu du Chaos',
        content: [
          "La tension devient quasi insupportable, le silence pesant prêt à exploser à tout instant.",
          "C'est alors qu'un des personnages congolais lance une remarque inattendue, teintée d'une autodérision si pure que tout le monde éclate d'un rire franc et libérateur.",
          "Même au cœur du danger mortel, l'humour permet au groupe de reprendre son souffle et sa lucidité.",
          "Mais le rire ne dure pas : une alarme stridente retentit dans tout l'édifice. Quelqu'un approche en force."
        ]
      },
      {
        number: 8,
        title: 'Chapitre 7 — La Trahison de Mallory',
        content: [
          "Mallory révèle enfin une partie de son jeu. Elle n'est pas simplement une alliée de fortune : elle obéit à sa propre mission secrète.",
          "Sarah est alors confrontée à un choix déchirant : protéger David ou tenter de sauver les personnes directement menacées par l'organisation.",
          "Bond comprend avec effroi que l'ennemi était beaucoup plus proche d'eux qu'il ne le croyait."
        ]
      },
      {
        number: 9,
        title: 'Chapitre 8 — Le Choix',
        content: [
          "Une violente confrontation éclate dans l'entrepôt. David refuse catégoriquement d'abandonner Sarah au milieu du danger.",
          "Mia Khalifa parvient à transmettre les premières preuves irréfutables pour publication dans la presse mondiale.",
          "L'équipe coréenne coordonne ses efforts avec les Congolais pour évacuer les personnes prises au piège.",
          "Bond neutralise ses adversaires et récupère l'archive convoitée, mais y découvre une dernière information stupéfiante : le véritable commanditaire est encore en liberté."
        ]
      },
      {
        number: 10,
        title: 'Chapitre 9 — Après la Tempête',
        content: [
          "Au lever du jour, Brazzaville retrouve son calme et les premières pirogues glissent sur le fleuve.",
          "David et Sarah se retrouvent enfin sur les rives. Ils savent que leur histoire ne sera pas simple, mais ils décident mutuellement de se faire confiance.",
          "Bond repart discrètement pour une nouvelle mission. Mia prépare son article à fort impact. Quant à Mallory, elle a disparu sans laisser la moindre trace."
        ]
      },
      {
        number: 11,
        title: 'Chapitre 10 — À Suivre... (Fin du Tome 1)',
        content: [
          "Dans une chambre inconnue, à des milliers de kilomètres, une silhouette ouvre l'archive dérobée.",
          "Un sourire glacial apparaît dans le reflet de l'écran.",
          "« Ils pensent que tout est terminé... »",
          "L'écran devient noir.",
          "FIN DU TOME 1."
        ]
      },
      {
        number: 12,
        title: 'Adaptation BD — Découpage Storyboard (Pages 1 & 2)',
        content: [
          "PAGE 1 — CASE 1\nVue panoramique de Brazzaville de nuit. Lumières de la ville, circulation et ambiance mystérieuse.\nDavid (voix-off) : « Cette nuit-là, je pensais que ma vie était normale... »",
          "PAGE 1 — CASE 2\nSarah est assise seule dans un restaurant. Elle regarde régulièrement vers la porte d'entrée avec anxiété.\nSarah : « Il est en retard... »",
          "PAGE 1 — CASE 3\nDavid approche de la table d'un pas hésitant. Sarah lève des yeux vifs sur lui.\nDavid : « Excusez-moi... cette place est libre ? »\nSarah : « Maintenant, oui. »",
          "PAGE 2 — CASE 1\nUn téléphone vibre sur la table. Sarah devient soudainement très sérieuse.\nSarah : « Écoute-moi bien. Ne fais confiance à personne. »",
          "PAGE 2 — CASE 2\nElle remet discrètement un carré de papier plié à David sous le rebord de la table.\nDavid : « Qu'est-ce que c'est ? »\nSarah : « La raison pour laquelle je suis venue ici. »",
          "PAGE 2 — CASE 3\nSarah disparaît dans la foule animée de Brazzaville. David reste seul, regardant le papier avec inquiétude.\nNarration : « Et c'est ainsi que commença l'affaire qui allait bouleverser plusieurs vies. »",
          "SUITE DU DÉCOUPAGE BD :\nLe tome est développé planche par planche : arrivée de James Bond, enquête de Mia Khalifa, introduction de Mallory, escouade coréenne, personnages congolais, romance sous tension entre David et Sarah, scènes de comédie spontanée, séquences d'horreur dans la maison abandonnée et confrontation finale."
        ]
      }
    ]
  },
  {
    id: 'amour-au-dela-du-hasard',
    title: "L'Amour au-delà du Hasard",
    subtitle: 'Essai & roman surréaliste de passion, de rêve, de hasard et de mémoire',
    genre: 'Essai surréaliste & Roman philosophique',
    badge: 'doc',
    badgeLabel: 'Essai',
    description:
      "Une exploration surréaliste et passionnelle en 50 chapitres traversant Brazzaville, Paris, Séoul et New York. Suivant l'écrivain Noé à la recherche de l'insaisissable Alma, cet essai médite sur les coïncidences objectives, la jalousie, le mystère, le doute et la souveraine liberté d'aimer.",
    priceFcfa: 8500,
    priceEur: 13.0,
    isbnCode: '978-2-958432-06-9',
    rating: 5.0,
    tags: ['Essai Littéraire', 'Surréalisme', 'Brazzaville - Paris - Séoul - NY', 'Hasard & Destin', 'Philosophie'],
    chapters: [
      {
        number: 1,
        title: "Note de l'Auteur & Épigraphe",
        content: [
          "« Certaines rencontres ne commencent pas quand deux êtres se voient, mais quand deux destins se reconnaissent. »",
          "NOTE DE L'AUTEUR :",
          "Ce livre est une œuvre originale inspirée par les grands motifs de l'amour passionnel et du surréalisme : le hasard, le rêve, la rencontre, le désir, la jalousie, la liberté et la puissance de l'imagination. Il ne reproduit ni le texte ni les personnages d'une œuvre existante.",
          "L'histoire suit Noé, jeune écrivain congolais, et Alma, femme insaisissable dont l'apparition bouleverse son rapport au réel. Leur aventure traverse Brazzaville, Paris, Séoul et New York, tandis que des figures d'espionnage, de cinéma et de journalisme entrent dans leur trajectoire. Le récit mélange poésie, humour, romance, drame, mystère et quelques moments de peur.",
          "CYCLE DES 50 VARIATIONS COMBINATOIRES :",
          "L'ouvrage se déploie comme une partition surréaliste où quatre métropoles mondiales se répondent en écho avec des correspondances sensorielles récurrentes : la pluie sur les vitres, l'odeur du café, le parfum de jasmin, les lumières des voitures, le vent chaud du soir, le silence d'un couloir, une chanson lointaine, le bruit d'un train et la poussière après l'orage."
        ]
      },
      {
        number: 2,
        title: 'Chapitre 1 — La femme au parapluie rouge (Brazzaville)',
        content: [
          "À Brazzaville, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sans but précis. Il avait pris l’habitude de marcher lorsque les phrases refusaient de venir. Ce soir-là, pourtant, il ne cherchait pas une histoire. Il cherchait seulement un peu de calme. Dans l’air flottait la pluie sur les vitres, et chaque détail semblait retenir son souffle.",
          "Il pensa à Alma. Depuis leur première rencontre, son nom apparaissait dans ses carnets comme s’il avait été écrit avant même qu’il ne la connaisse. Il y avait chez elle quelque chose qu’il ne savait pas définir : une présence à la fois proche et impossible à saisir. Elle pouvait rire pendant plusieurs minutes puis devenir silencieuse sans explication. Elle disait que les coïncidences étaient des lettres envoyées par l’avenir.",
          "Noé : « Tu crois vraiment que le hasard nous écrit ? »",
          "Alma : « Je crois surtout qu’il nous laisse des indices. C’est nous qui décidons de les lire. »",
          "Noé avait souri. Il n’avait pas encore compris que cette phrase deviendrait la règle secrète de leur histoire.",
          "Le lendemain, un événement apparemment insignifiant bouleversa la journée. Noé reçut un message sans expéditeur. Il ne contenait qu’une phrase : « Ne va pas à Paris avant de m’avoir retrouvée. » Il relut le message plusieurs fois. Une partie de lui voulait rire ; une autre avait déjà peur.",
          "Alma n’était pas joignable. Son téléphone sonnait dans le vide. Noé se rendit alors au lieu où ils avaient l’habitude de se retrouver. La table était libre. Deux tasses étaient posées là, bien que personne ne les ait commandées. Sur la première, un mot : « Pour celui qui doute. » Sur la seconde : « Pour celle qui revient. »",
          "Cette absurdité aurait dû le convaincre de partir. Au contraire, elle réveilla en lui cette curiosité dangereuse qui accompagne les grandes histoires. Il prit la seconde tasse, regarda la porte et attendit.",
          "Voix inconnue : « Vous attendez quelqu’un ? »",
          "Noé : « Oui. Mais je commence à me demander si cette personne existe vraiment. »",
          "Un rire discret répondit depuis le fond de la salle.",
          "La personne qui apparut n’était pas Alma. C’était un homme élégant, vêtu d’un costume sombre, qui se présenta simplement comme James. Il parlait peu et observait beaucoup. Il connaissait le prénom de Noé, son adresse et même le titre du roman qu’il n’avait encore montré à personne.",
          "James : « Vous aimez Alma. C’est précisément ce qui vous met en danger. »",
          "Noé : « Qui êtes-vous ? »",
          "James : « Quelqu’un qui préfère que vous restiez vivant assez longtemps pour comprendre. »",
          "Noé sentit la peur lui serrer la poitrine. Pourtant, derrière cette peur se trouvait une certitude plus forte : Alma n’avait pas disparu par hasard.",
          "À cet instant, une jeune journaliste entra dans le café. Elle se nommait Mia. Elle avait un appareil photo, un carnet rempli de notes et une manière de regarder les gens qui donnait l’impression qu’aucun mensonge ne pouvait lui échapper.",
          "Mia : « Je cherche la même personne que vous. Et je pense que nous avons intérêt à travailler ensemble. »",
          "Cette nuit-là, Noé rentra seul. Il ouvrit son carnet et découvrit une page qu’il ne se souvenait pas avoir écrite. Une phrase occupait le centre : « L’amour n’est pas une preuve. C’est une porte. » En dessous figurait un dessin d’une porte rouge, exactement semblable à celle qu’Alma lui avait décrite dans un rêve quelques semaines auparavant.",
          "Il comprit alors que son histoire d’amour ne serait pas une simple romance. Elle allait devenir une traversée : une traversée du doute, de la peur, de la jalousie, du rire et de la liberté.",
          "Noé : « Alma, où que tu sois, je vais te retrouver. »",
          "Dehors, la pluie sur les vitres recommença. Dans une autre ville, Alma ouvrit les yeux. Elle regarda l’heure, sourit et murmura une phrase que Noé ne pouvait pas entendre : « Enfin, il a compris. »",
          "Le hasard venait de déplacer une nouvelle pièce sur l’échiquier. Et quelque part entre Brazzaville et Paris, deux destins continuaient de se rapprocher."
        ]
      },
      {
        number: 3,
        title: 'Chapitre 2 — Le billet sans adresse (Paris)',
        content: [
          "À Paris, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sans but précis le long des quais de Seine. Dans l’air flottait l’odeur du café, et chaque détail semblait retenir son souffle.",
          "Il pensa à Alma. Depuis leur première rencontre, son nom apparaissait dans ses carnets comme s’il avait été écrit avant même qu’il ne la connaisse. Elle disait toujours que les coïncidences étaient des lettres envoyées par l’avenir.",
          "Le lendemain, un événement apparemment insignifiant bouleversa à nouveau la journée. Noé reçut un nouveau message sans expéditeur : « Ne va pas à Séoul avant de m’avoir retrouvée. »",
          "Sur une table de café parisien, deux tasses étaient posées là : « Pour celui qui doute », « Pour celle qui revient ».",
          "James et Mia réapparaissent comme des sentinelles du destin. James murmure : « Vous avancez plus vite que prévu. Ne confondez pas le mystère et le mensonge. »",
          "Cette nuit-là, la phrase résonne dans son carnet : « L’amour n’est pas une preuve. C’est une porte. » Dehors, l'odeur du café recommença. Dans une autre ville, Alma sourit : « Enfin, il a compris. » Entre Paris et Séoul, deux destins continuent leur course magnétique."
        ]
      },
      {
        number: 4,
        title: 'Chapitre 3 — La chambre des horloges (Séoul)',
        content: [
          "À Séoul, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sous les reflets de néons et les ruelles calmes de Bukchon. Dans l’air flottait un parfum de jasmin, et chaque détail semblait retenir son souffle.",
          "Le nouveau message sans expéditeur tombe : « Ne va pas à New York avant de m’avoir retrouvée. »",
          "Dans un salon de thé confidentiel, les deux tasses l'attendent encore : « Pour celui qui doute », « Pour celle qui revient ».",
          "James l'observe : « Vous avez bravé les distances. Mais êtes-vous prêt à renoncer à vouloir posséder celle que vous aimez ? »",
          "Mia note chaque mot : « Alma ne fuit pas Noé, elle le guide vers sa propre liberté d'écrivain. »",
          "Dehors, le parfum de jasmin recommença. Dans une autre ville, Alma murmure à la nuit : « Enfin, il a compris. »"
        ]
      },
      {
        number: 5,
        title: "Chapitre 4 — Un café qui n'existait pas (New York)",
        content: [
          "À New York, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sans but précis au milieu des vertiges de Manhattan. Dans l’air flottait les lumières des voitures, et chaque détail semblait retenir son souffle.",
          "Le message sans expéditeur réapparaît sur son carnet : « Ne va pas à Brazzaville avant de m’avoir retrouvée. »",
          "La boucle géographique est bouclée : Brazzaville, Paris, Séoul, New York. Les quatre coins du monde reliés par le fil invisible du hasard objectif.",
          "Noé comprend enfin la nature de l'épreuve : aimer, ce n'est pas enfermer l'autre dans une certitude, c'est embrasser le vertige du hasard."
        ]
      },
      {
        number: 6,
        title: 'Chapitre 20 — Le baiser et le silence',
        content: [
          "À la moitié exacte du voyage, les souvenirs se mêlent. Noé revoit le baiser échangé à Brazzaville, suspendu entre le fleuve et le ciel lourd d'orage.",
          "« Le silence entre deux personnes qui s'aiment n'est jamais un vide », médite-t-il. « C'est l'espace secret où les âmes s'accordent sans le bruit des justifications. »",
          "Dans le reflet des vitrines, le visage d'Alma semble flotter un instant, souriant, insaisissable et plus vivante que jamais."
        ]
      },
      {
        number: 7,
        title: 'Chapitre 34 — Le bal des menteurs',
        content: [
          "« Pourquoi avons-nous si peur de la vérité ? », note Noé dans son carnet. « Nous mentons souvent par peur de perdre ce qui ne nous appartient déjà pas. »",
          "Face à James et aux ombres de l'intrigue, Noé décide de déposer les armes du soupçon : « Si Alma doit revenir, ce sera par la seule force de sa volonté libre, non par une enquête policière. »",
          "James incline la tête, impressionné : « Vous commencez enfin à être digne du mystère. »"
        ]
      },
      {
        number: 8,
        title: 'Chapitre 48 — La liberté d’aimer',
        content: [
          "Dans la nuit de Manhattan, le parfum de jasmin se mêle à l'air tiède de l'asphalte.",
          "Noé contemple la porte rouge dessinée des mois plus tôt dans son carnet. Il réalise qu'elle n'a jamais été fermée à clé. Elle attendait simplement qu'il cesse de douter.",
          "Aimer sans cadenas, sans prison, sans jalousie : telle est la révélation surréaliste de cette traversée."
        ]
      },
      {
        number: 9,
        title: 'Chapitre 50 & Épilogue — Le hasard nous reconnaît',
        content: [
          "Des années plus tard, Noé relirait ses anciens carnets avec un sourire. Il comprendrait que certaines histoires ne sont pas faites pour être expliquées entièrement. Elles sont faites pour être vécues.",
          "Alma lui avait appris que l’amour pouvait être fou sans être une prison, passionnel sans devenir possession, mystérieux sans être mensonge. Leur histoire avait traversé des villes, des nuits, des séparations et des peurs. Elle avait survécu parce que deux personnes avaient finalement choisi la liberté plutôt que la peur.",
          "Dans la dernière page de son carnet, Noé écrivit : « Je croyais avoir rencontré Alma par hasard. Aujourd’hui, je pense que le hasard est seulement le nom que nous donnons aux choses que nous ne savons pas encore comprendre. »",
          "À celles et ceux qui continuent de croire qu’une rencontre peut changer une vie, qu’un rêve peut devenir une direction et qu’aimer quelqu’un signifie aussi lui laisser la liberté d’être lui-même.",
          "NOTE SUR L'ADAPTATION GRAPHIQUE :\nCette version peut être adaptée en bande dessinée en conservant quatre registres : romance, drame, horreur et humour. Chaque chapitre peut devenir 4 à 8 planches, avec une palette visuelle nocturne pour les scènes de mystère, des cadrages rapprochés pour les dialogues amoureux et des cases plus dynamiques pour les séquences d’action.",
          "ÉPILOGUE — FIN."
        ]
      }
    ]
  },
  {
    id: 'leo-le-petit-lapin',
    title: 'Léo, le petit lapin qui avait peur de la nuit',
    subtitle: 'Conte illustré pour enfants — Apprivoiser ses peurs et découvrir la beauté de la nuit',
    genre: 'Conte & Littérature Jeunesse',
    badge: 'jeunesse',
    badgeLabel: 'Jeunesse & Conte',
    description:
      "Dans une jolie forêt, Léo le petit lapin adore gambader le jour mais a un secret : il a très peur de la nuit. Guidé avec tendresse par sa maman, il découvre que les bruits ne sont pas des monstres mais le chant de la chouette, le vent dans les feuilles et la douce lumière des lucioles.",
    priceFcfa: 4500,
    priceEur: 7.0,
    isbnCode: '978-2-958432-07-6',
    rating: 5.0,
    tags: ['Conte Jeunesse', 'Sommeil & Nuit', 'Courage', 'Nature', 'Éveil Enfant'],
    chapters: [
      {
        number: 1,
        title: 'Le secret de Léo & Les bruits de la nuit',
        content: [
          "Dans une petite forêt entourée de grands arbres, vivait un adorable petit lapin nommé Léo.",
          "Léo avait de grandes oreilles, un petit nez rose et une queue toute blanche et ronde. Il aimait courir dans les champs, jouer avec les papillons et manger les carottes que sa maman lui préparait.",
          "Mais Léo avait un secret… Il avait très peur de la nuit. 🌙",
          "Chaque soir, lorsque le soleil commençait à disparaître derrière les arbres, Léo courait vite jusqu'à son terrier.",
          "— Maman ! Maman ! La nuit arrive !",
          "Sa maman souriait et lui répondait doucement :",
          "— N'aie pas peur, mon petit Léo. La nuit est simplement le moment où la forêt se repose.",
          "Mais Léo n'était pas convaincu.",
          "Une nuit, alors qu'il était dans son petit lit, il entendit :",
          "CRIC… CRAC…",
          "Léo ouvrit grand les yeux.",
          "— Qu'est-ce que c'était ? 😨",
          "Il se cacha sous sa couverture.",
          "Puis il entendit :",
          "Houuu… houuu…",
          "— Un monstre ! chuchota-t-il.",
          "Sa maman entra dans la chambre :",
          "— Ce n'est pas un monstre, mon petit. C'est simplement la chouette qui chante.",
          "Léo sortit doucement sa tête de sous la couverture."
        ]
      },
      {
        number: 2,
        title: 'Les lanternes de la forêt',
        content: [
          "— La chouette ?",
          "— Oui. Elle chante pour saluer la lune.",
          "Léo regarda par la fenêtre. Pour la première fois, il remarqua quelque chose de magnifique.",
          "La lune brillait dans le ciel comme une grande lampe ronde. 🌕 Des milliers de petites étoiles scintillaient autour d'elle.",
          "— Elles sont belles…",
          "— Tu vois ? répondit maman. La nuit n'est pas seulement sombre. Elle cache aussi de très belles choses.",
          "Léo sourit, mais il avait encore un peu peur.",
          "Le lendemain soir, il décida de sortir quelques minutes avec sa maman. Ils s'assirent devant le terrier. Léo regarda les étoiles.",
          "Il vit une petite luciole passer devant lui.",
          "— Regarde, maman ! Une petite lumière !",
          "— Oui. Les lucioles sont les petites lanternes de la forêt.",
          "Léo se mit à rire. Puis il entendit le vent faire danser les feuilles.",
          "Chhh… chhh…",
          "Il écouta attentivement. Ce n'était pas un bruit effrayant. C'était comme une chanson. Tout autour de lui, les animaux se préparaient à dormir. Les oiseaux étaient silencieux."
        ]
      },
      {
        number: 3,
        title: 'Le sommeil paisible & La belle découverte',
        content: [
          "Les écureuils étaient dans leurs nids. Les fleurs avaient refermé leurs pétales. Même la forêt semblait murmurer :",
          "« Bonne nuit, Léo… »",
          "Cette nuit-là, Léo retourna dans son lit. Il regarda la lune à travers la fenêtre.",
          "— Bonne nuit, lune.",
          "Puis il regarda les étoiles :",
          "— Bonne nuit, petites lumières.",
          "Il ferma les yeux. Et pour la première fois, il ne se cacha pas sous sa couverture.",
          "Il s'endormit tranquillement. 😴💤",
          "Depuis ce jour, Léo n'eut plus peur de la nuit. Il comprit que parfois, ce qui nous fait peur est simplement quelque chose que nous ne connaissons pas encore.",
          "Et chaque soir, avant de dormir, Léo regardait la lune et disait :",
          "« La nuit est calme, la forêt veille sur moi, et demain sera une nouvelle belle journée. » 🌙🐰",
          "Puis il s'endormait avec un grand sourire.",
          "🌟 MORALE DU CONTE :\nIl ne faut pas toujours avoir peur de ce que l'on ne connaît pas. Parfois, derrière nos peurs se cachent de magnifiques découvertes."
        ]
      }
    ]
  },
  {
    id: 'milo-nounours-gardien-des-reves',
    title: 'Le nounours gardien des rêves',
    subtitle: "Conte du coucher illustré — La mission secrète de Milo pour protéger le sommeil d'Emma",
    genre: 'Conte & Littérature Jeunesse',
    badge: 'jeunesse',
    badgeLabel: 'Jeunesse & Dodo',
    description:
      "Dans une petite chambre aux murs couleur de ciel, vit Milo, un adorable nounours tout rond avec sa petite écharpe bleue. Mais Emma ignore un secret : la nuit, les nounours se réveillent pour chasser les mauvais rêves et préparer des mondes féeriques aux rivières de chocolat chaud !",
    priceFcfa: 4500,
    priceEur: 7.0,
    isbnCode: '978-2-958432-08-3',
    rating: 5.0,
    tags: ['Histoire du soir', 'Nounours Gardien', 'Sommeil paisible', 'Magie & Rêves', 'Enfance'],
    chapters: [
      {
        number: 1,
        title: 'Le secret de minuit & La ronde de Milo',
        content: [
          "Dans une petite chambre aux murs couleur de ciel, vivait un adorable nounours appelé Milo.",
          "Milo était doux, tout rond et très câlin. Il avait une petite écharpe bleue autour du cou et deux yeux noirs qui brillaient lorsqu'ils attrapaient la lumière de la lune.",
          "Chaque soir, une petite fille appelée Emma le serrait très fort contre elle avant de dormir.",
          "— Bonne nuit, Milo, disait-elle. Reste près de moi.",
          "— Toujours, semblait répondre le petit nounours avec son sourire.",
          "Mais Emma ignorait un secret… Lorsque les enfants s'endormaient, les nounours pouvaient se réveiller. ✨",
          "Une nuit, lorsque l'horloge indiqua minuit, Milo ouvrit doucement les yeux. Il regarda Emma qui dormait paisiblement.",
          "— Il est temps de commencer ma ronde, murmura-t-il.",
          "Milo descendit du lit et marcha sur la pointe de ses petites pattes.",
          "Il regarda sous le lit… Rien.",
          "Il regarda derrière les rideaux… Rien.",
          "Il ouvrit doucement la porte et observa le couloir… Tout était calme.",
          "Car Milo avait une mission très importante : protéger les rêves d'Emma. 🌙"
        ]
      },
      {
        number: 2,
        title: 'Le mauvais rêve & La formule magique',
        content: [
          "Soudain, une petite fumée grise apparut au bout du couloir. Milo fronça les sourcils :",
          "— Oh non… un mauvais rêve !",
          "La fumée entra doucement dans la chambre. Elle se transforma en un grand nuage rempli de petites images inquiétantes.",
          "Emma commença à bouger dans son sommeil :",
          "— Non… murmura-t-elle.",
          "Milo courut jusqu'à son oreiller. Il posa ses deux petites pattes dessus et prononça la formule magique des nounours :",
          "« Que les mauvais rêves s'en aillent,\nque les étoiles brillent,\net que le cœur de l'enfant retrouve la paix. » ✨",
          "Aussitôt, une lumière douce et bienveillante apparut autour de Milo. Le nuage gris recula, puis disparut complètement.",
          "Emma sourit dans son sommeil. Milo soupira de soulagement :",
          "— Voilà… tout va bien.",
          "Mais sa mission n'était pas terminée. Il devait maintenant préparer un joli rêve."
        ]
      },
      {
        number: 3,
        title: 'La recette enchantée & Le jardin aux bonbons',
        content: [
          "Milo ouvrit sa petite boîte magique, cachée derrière l'oreiller. À l'intérieur se trouvaient les précieux ingrédients du songe :",
          "⭐ Une poignée de poussière d'étoiles,",
          "🌸 Trois pétales de fleurs de lune,",
          "🦋 Une aile de papillon imaginaire,",
          "🌈 Et un petit morceau d'arc-en-ciel.",
          "Milo mélangea tout cela avec amour...",
          "PLOUF !",
          "Une porte brillante apparut devant lui. De l'autre côté se trouvait un magnifique jardin : les arbres étaient remplis de bonbons, les rivières étaient faites de chocolat chaud, les fleurs chantaient doucement et de petits lapins dansaient sous les étoiles. 🐰✨",
          "Milo sourit :",
          "— C'est parfait pour Emma.",
          "Il souffla doucement sur la poussière magique. Elle entra dans le sommeil d'Emma. Aussitôt, Emma se retrouva dans le magnifique jardin : elle courait avec les petits lapins, riait avec les fleurs et regardait les étoiles danser dans le ciel.",
          "Pendant ce temps, Milo retourna s'asseoir près de son oreiller. Il regarda Emma sourire :",
          "— Dors bien, petite Emma.",
          "Puis il ferma doucement les yeux."
        ]
      },
      {
        number: 4,
        title: "Le réveil d'Emma & Le serment des gardiens",
        content: [
          "Lorsque le soleil se leva le lendemain matin, Emma ouvrit les yeux. Elle attrapa Milo et le serra très fort :",
          "— J'ai fait un très beau rêve cette nuit !",
          "Milo ne répondit pas. Il resta simplement assis sur son lit avec son petit sourire habituel.",
          "Emma ne pouvait pas savoir que pendant toute la nuit… son nounours avait veillé sur elle. 🧸❤️",
          "Et depuis ce jour, chaque fois qu'Emma s'endormait, Milo accomplissait sa mission. Il chassait les cauchemars, il protégeait les rêves, et surtout… il rappelait à tous les enfants qu'ils n'étaient jamais seuls dans la nuit.",
          "INVITATION DU SOIR :\nAlors, si ce soir tu as ton nounours près de toi, serre-le bien fort.\nFerme les yeux…\nRespire doucement…\nEt laisse ton gardien des rêves t'emmener dans un monde rempli d'étoiles. 🌙✨\n\nBonne nuit… fais de beaux rêves. 💤🧸"
        ]
      }
    ]
  },
  {
    id: 'les-enfants-de-lombre',
    title: "Les Enfants de l'Ombre",
    subtitle: 'Roman d’horreur surnaturelle — Tome I & Tome II',
    genre: 'Roman d’horreur surnaturelle & Thriller occulte',
    badge: 'horreur',
    badgeLabel: 'Horreur Surnaturelle',
    description:
      "À Valombre, une vieille cloche sonne à minuit et les enfants disparaissent sans laisser de traces. Noé, Maya, Samuel et Inès découvrent une porte rouge qui s'ouvre sur un abîme de peurs enfouies. Dix-sept ans plus tard, le même message retentit : « La cloche sonnera encore. » Ils devront redescendre sous la ville affronter ce qu'ils ont fui.",
    priceFcfa: 9000,
    priceEur: 14.0,
    isbnCode: '978-2-958432-09-0',
    rating: 5.0,
    tags: ['Horreur Surnaturelle', 'Valombre', 'Porte Rouge & Tunnels', 'Peur & Mémoire', 'Thriller Sombre'],
    chapters: [
      {
        number: 1,
        title: "Avertissement & Le mystère de Valombre",
        content: [
          "AVERTISSEMENT :",
          "Roman d’horreur surnaturelle entièrement original, inspiré des grands codes du genre mais ne reproduisant ni les personnages ni l’intrigue d'œuvres préexistantes.",
          "STRUCTURE DE LA DYLOGIE :",
          "• Tome I — La ville qui oubliait les enfants (L'enfance face à la cloche de minuit, l'apparition de la porte rouge et le pacte des quatre amis)",
          "• Tome II — Le retour des ténèbres (Dix-sept ans plus tard, le rappel de la cloche, la descente sous la ville et l'ultime confrontation avec la créature)",
          "LES QUATRE DE VALOMBRE :",
          "• Noé — Le porteur de la lampe et du carnet, refusant l'amnésie collective de la ville.",
          "• Maya — L'esprit d'observation et de lucidité face aux miroirs trompeurs.",
          "• Samuel — La force tranquille mise à l'épreuve par les voix du sous-sol.",
          "• Inès — L'intuition aiguisée, capable d'entendre le premier souffle des ombres."
        ]
      },
      {
        number: 2,
        title: 'Tome I • Chapitre 1 — La cloche de minuit',
        content: [
          "La nuit enveloppait Valombre lorsque Noé, Maya, Samuel et Inès arrivèrent devant le lieu interdit. Depuis plusieurs semaines, des enfants disparaissaient sans laisser de traces.",
          "Une vieille cloche sonnait toujours à minuit. Ce soir-là, elle retentit derrière les murs délabrés de l’ancienne école.",
          "Ils avancèrent malgré la peur. Dans le couloir, une porte rouge apparut là où il n’y avait auparavant qu’un mur aveugle.",
          "Derrière elle, un souffle glacé prononça leurs prénoms un par un. Noé serra la lampe torche d'une main tremblante.",
          "Ils comprirent que quelque chose les observait et que la ville cachait un secret beaucoup plus ancien qu’eux. Ils décidèrent de rester ensemble. Plus ils cherchaient la vérité, plus l’ombre semblait apprendre leurs peurs intimes.",
          "Une silhouette démesurée apparut au bout du couloir, puis disparut lorsque la lumière revint.",
          "Personne ne parla. Ils savaient désormais qu’ils étaient entrés dans une histoire dont ils ne connaissaient pas encore la fin."
        ]
      },
      {
        number: 3,
        title: 'Tome I • Chapitre 2 — Le tunnel sous l’école',
        content: [
          "Le loquet de la porte rouge céda sans grincer. Devant eux s'enfonçait un escalier de pierre humide dévoré par le salpêtre.",
          "Sous l'école régnait une odeur de terre remuée et de soufre. Les pas résonnaient comme si d'autres jambes marchaient à leur rythme sous leurs pieds.",
          "« Si nous nous séparons, nous sommes perdus », chuchota Samuel en formant un rempart.",
          "Sur les parois voûtées, des dessins gravés à même la roche représentaient la fondation de Valombre et un être sans visage couronné de brume."
        ]
      },
      {
        number: 4,
        title: 'Tome I • Chapitre 3 — La maison aux fenêtres noires',
        content: [
          "Le tunnel débouchait sous les caves d'un manoir abandonné en lisière de forêt : la maison aux fenêtres peintes de noir.",
          "Dans chaque pièce, des pendules arrêtées marquaient toutes la même heure : minuit précis.",
          "Maya s'arrêta nette : une boîte à musique se mit à tourner toute seule au centre d'une table poussiéreuse, jouant la mélodie que sa mère lui chantait jadis.",
          "« L'ombre ne crée rien », comprit Inès avec effroi. « Elle vole ce que nous aimons pour nous attirer dans le vide. »"
        ]
      },
      {
        number: 5,
        title: 'Tome I • Chapitre 4 — Le carnet de Noé',
        content: [
          "Noé consignait chaque indice, chaque nom d'enfant disparu et les dates des éclipses dans son carnet relié de cuir.",
          "En ouvrant le carnet à la lumière tremblotante, l'encre s'effaçait sous leurs yeux pour laisser place à une nouvelle écriture écarlate :",
          "« Valombre oublie toujours. Vous m'appartiendrez avant l'aube. »",
          "La certitude s'imposa : la mémoire était leur seule arme contre l'anéantissement."
        ]
      },
      {
        number: 6,
        title: 'Tome I • Chapitres 5 à 7 — Le pacte des ombres',
        content: [
          "Dans les entrailles de la ville, lors de la fête des ombres, ils découvrirent l'origine de la créature : une entité ancestrale née de la culpabilité collective des fondateurs de Valombre.",
          "Au centre du dédale, devant une seconde porte rouge scellée de chaînes, les quatre enfants se prirent la main.",
          "Ils jurèrent le serment du sang et de la mémoire : si l'entité venait à se réveiller un jour, qu'importe l'âge, qu'importe la distance, ils reviendraient ensemble pour l'achever."
        ]
      },
      {
        number: 7,
        title: 'Tome I • Chapitres 8 à 10 — La dernière nuit d’enfance',
        content: [
          "La première confrontation finale eut lieu sous les fondations du vieux réservoir d'eau. Dans les miroirs brisés, des visages d'enfants perdus suppliaient.",
          "En conjuguant leur courage et en refusant de céder à l'illusion de leurs peurs, Noé, Maya, Samuel et Inès parvinrent à repousser l'entité dans les failles de la terre.",
          "La cloche cessa de sonner. Mais au sortir du souterrain, ils comprirent le lourd tribut de Valombre : les adultes avaient déjà tout oublié. Pour le reste de la ville, rien ne s'était jamais passé.",
          "Les quatre enfants se séparèrent quelques années plus tard, emportant le secret dans leurs chairs."
        ]
      },
      {
        number: 8,
        title: 'Tome II • Chapitre 1 — Dix-sept ans plus tard',
        content: [
          "Dix-sept ans après leur première confrontation, les anciens amis reçurent le même message : « La cloche sonnera encore. »",
          "Ils retournèrent à Valombre. Les rues semblaient identiques, mais les habitants évitaient leur regard. Les anciennes disparitions recommencèrent.",
          "Une carte retrouvée dans les archives de la ville révéla un réseau étendu de tunnels sous les maisons. Au centre se trouvait une chambre sans porte.",
          "Ils découvrirent alors que la créature se nourrissait moins des corps que des terreurs refoulées de l'âge adulte. Pour la vaincre, ils devraient affronter chacun le souvenir qu’ils avaient passé leur vie à fuir.",
          "La nuit suivante, la ville entière plongea dans l’obscurité absolue. Les quatre amis descendirent sous terre. La cloche sonna. L’ombre les attendait.",
          "Cette fois, ils ne fuiraient pas."
        ]
      },
      {
        number: 9,
        title: 'Tome II • Chapitres 2 à 5 — La ville morte & La chambre 13',
        content: [
          "Devenus adultes, leurs peurs avaient changé de visage : le deuil pour Samuel, la solitude pour Inès, l'échec pour Noé, la perte de repères pour Maya.",
          "Dans un train désaffecté arrêté sous la roche et dans la mystérieuse Chambre 13, l'ombre tenta de les diviser en imitant leurs proches disparus.",
          "« Elle utilise nos regrets d'adultes comme des crochets ! », cria Maya. « Ne regardez pas ses yeux ! »"
        ]
      },
      {
        number: 10,
        title: 'Tome II • Chapitres 6 à 10 — Le cœur de la créature',
        content: [
          "Dans la chambre sans porte, au point le plus profond du gouffre de Valombre, la créature révéla sa véritable forme : une pulsation ténébreuse tissée de tous les cauchemars de la ville depuis un siècle.",
          "Noé brandit son ancien carnet d'enfant, soutenu par les mains jointes de Maya, Samuel et Inès.",
          "En acceptant leurs blessures sans chercher à les fuir, ils privèrent le monstre de sa substance vitale. L'ombre se déchira dans un cri silencieux qui fit trembler les fondations de Valombre."
        ]
      },
      {
        number: 11,
        title: 'Épilogue — Tant qu’une peur existera...',
        content: [
          "À l’aube, Valombre retrouva enfin le silence.",
          "Pourtant, sous les rues, une petite cloche tinta une dernière fois.",
          "Sur une fenêtre apparut une phrase tracée dans la buée fraîche du matin :",
          "« Tant qu’une peur existera, l’ombre cherchera un chemin. »",
          "FIN DU TOME II."
        ]
      }
    ]
  }
];

export const GENRES_LIST = [
  {
    id: 'mystere',
    icon: '🖤',
    name: 'Mystère',
    description: 'Des sociétés secrètes aux manuscrits oubliés, des vérités qui changent tout.'
  },
  {
    id: 'romance',
    icon: '🌹',
    name: 'Romance',
    description: 'Des amours impossibles, des liens qui traversent les cultures et les continents.'
  },
  {
    id: 'aventure',
    icon: '⚡',
    name: 'Aventure',
    description: "De l'Égypte au Congo, des récits d'action qui ne laissent pas respirer."
  },
  {
    id: 'humour',
    icon: '😂',
    name: 'Humour',
    description: 'Des personnages qui font rire même quand tout seffondre autour deux.'
  },
  {
    id: 'horreur',
    icon: '💀',
    name: 'Horreur',
    description: "Ce qui se cache dans l'ombre, la nuit, quand les masques tombent."
  }
];

export const CONTACT_INFO = {
  phoneDisplay: '+242 069 738 388',
  phoneTel: '+242069738388',
  mtnMomoDisplay: '+242 069 738 388',
  mtnMomoTel: '+242069738388',
  airtelMoneyDisplay: '+242 050 570 693',
  airtelMoneyTel: '+242050570693',
  email: 'contact@encre-ombre.cd',
  location: 'Brazzaville • New York • Kinshasa'
};
