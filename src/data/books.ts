import { Book } from '../types';

export const BOOKS_COLLECTION: Book[] = [
  // 1. L'OMBRE DU CONGO — LES FILS DE SALOMON
  {
    id: 'ombre-du-congo',
    title: "L'Ombre du Congo",
    subtitle: 'Les Fils de Salomon',
    genre: "Roman d'aventure & Thriller ésotérique",
    badge: 'roman',
    badgeLabel: 'Roman',
    coverImage: '/images/ombre-du-congo.jpg',
    description:
      "De Kinshasa à Brazzaville et jusqu'au Caire, le professeur Elias Mokonzi traque le légendaire Manuscrit de Loango et l'emplacement d'un sanctuaire vieux de quatre mille ans liant l'Égypte ancienne aux royaumes bantous.",
    priceFcfa: 7500,
    priceEur: 11.5,
    isbnCode: '978-2-958432-01-4',
    rating: 4.9,
    tags: ['Sociétés Secrètes', 'Loge du Léopard', 'Loango & Nil', 'Sanctuaire Millénaire', 'Égypte Ancienne'],
    chapters: [
      {
        number: 1,
        title: "Note de l'Auteur & Table des Matières",
        content: [
          "NOTE DE L'AUTEUR :",
          "Ce roman est une œuvre de fiction. Les personnages, événements et organisations qui y sont décrits sont le fruit de l'imagination. Les références aux sociétés secrètes, religions et pratiques occultes sont basées sur des informations historiques réelles, interprétées de manière fictive pour les besoins du récit.",
          "« La vérité est rarement pure et n'est jamais simple. » — Oscar Wilde",
          "TABLE DES MATIÈRES :",
          "• Prologue — L'Initiation",
          "• Chapitre I — Le Messager des Ténèbres",
          "• Chapitre II — Les Archives Interdites",
          "• Chapitre III — Brazzaville la Nuit",
          "• Chapitre IV — La Loge du Léopard",
          "• Chapitre V — Le Manuscrit de Loango",
          "• Chapitre VI — Sur les Traces du Nil",
          "• Chapitre VII — Les Pyramides Parlent",
          "• Chapitre VIII — La Chambre Noire",
          "• Chapitre IX — Le Grand Architecte",
          "• Chapitre X — Trahisons",
          "• Chapitre XI — La Bataille de la Forêt",
          "• Chapitre XII — Le Rituel Final",
          "• Épilogue — La Lumière après l'Ombre"
        ]
      },
      {
        number: 2,
        title: "Prologue — L'Initiation",
        content: [
          "Kinshasa, 1987. Il était minuit passé quand on banda les yeux d'Elias Mokonzi.",
          "Il avait vingt-deux ans, fils d'un pasteur protestant et petit-fils d'un guérisseur traditionnel kongo. Ces deux héritages contradictoires avaient depuis toujours déchiré son âme comme un fleuve que deux courants opposent. Ce soir-là, il allait choisir.",
          "On le fit avancer dans le noir. Le sol sous ses pieds était en pierre froide. Il sentait l'encens, la cire des bougies, et quelque chose d'autre — une odeur ancienne, terreuse, comme si les murs eux-mêmes exhalaient des siècles de secrets.",
          "Une voix grave résonna, amplifiée par la pierre :",
          "— « Qui frappe à la porte du Temple ? »",
          "Elias répondit comme on le lui avait appris :",
          "— « Un homme libre, de bonnes mœurs, qui cherche la Lumière. »",
          "— « Que portes-tu avec toi, Profane ? »",
          "— « Rien que l'ignorance et la volonté de la surmonter. »",
          "On lui retira son bandeau. La salle qui se révéla devant lui lui coupa le souffle. Une loge maçonnique — mais africaine jusque dans les os. Les colonnes étaient sculptées de masques kongo. Le pavement en damier noir et blanc était incrusté de symboles vaudou. Au-dessus de l'autel, l'œil de la Providence veillait — entouré de l'Ankh égyptien, du Nsibidi des peuples Ejagham du Cameroun, et d'un serpent-arc-en-ciel.",
          "Devant lui, quinze hommes en tabliers blancs l'observaient en silence. Des médecins, des ministres, des professeurs, des militaires. Et au centre, un vieillard à la peau sombre comme l'ébène, les yeux d'un jaune presque surnaturel. Le Grand Maître.",
          "— « Bienvenue, Frère Elias. Tu entres ce soir dans la Loge du Léopard. Ce que tu vas apprendre ici ne peut être dit. Ce que tu vas voir ne peut être raconté. Es-tu prêt ? »",
          "Elias regarda les flammes des bougies danser sur les murs de pierre. Il pensa à son père qui priait Jésus chaque matin, à son grand-père qui invoquait les ancêtres chaque soir. Il pensa à lui-même, suspendu entre deux mondes.",
          "— « Je suis prêt. »",
          "Trente ans plus tard, il allait regretter ces mots."
        ]
      },
      {
        number: 3,
        title: "Chapitre I — Le Messager des Ténèbres",
        content: [
          "Brazzaville, 2017. Trente ans après.",
          "Le professeur Elias Mokonzi — docteur en archéologie, membre éminent de l'Université Marien Ngouabi, consultant pour l'UNESCO — était assis sur la terrasse de son appartement du quartier Poto-Poto, un verre de vin rouge à la main, quand son téléphone sonna.",
          "Il était vingt-deux heures. Le fleuve Congo scintillait au loin, large comme une mer. De l'autre côté, les lumières de Kinshasa clignotaient comme des étoiles tombées. La brise du soir apportait les odeurs de poisson grillé, de feuilles de manioc et de terre rouge après la pluie.",
          "Le numéro affiché était inconnu. Égyptien.",
          "— « Allô ? »",
          "La voix qui répondit était celle d'un homme vieux, tremblante mais précise :",
          "— « Frère Elias. C'est le Frère Anwar. Je t'appelle du Caire. Écoute-moi bien. »",
          "Elias se redressa. Anwar Ibrahim. Le Grand Maître de la Loge d'Osiris, la plus ancienne loge maçonnique d'Égypte. Un homme brillant, discret, d'une culture encyclopédique.",
          "— « Anwar ? Que se passe-t-il ? »",
          "— « Le Manuscrit de Loango a été retrouvé. »",
          "Elias faillit lâcher son verre. Le Manuscrit de Loango — une légende dans les cercles ésotériques africains. Un texte supposé dater du XVIe siècle, rédigé par les prêtres du royaume de Loango, qui auraient conservé des secrets remontant à l'Égypte ancienne. Une preuve d'une connexion directe entre la civilisation égyptienne et les royaumes bantous d'Afrique centrale. La plupart des historiens considéraient ce manuscrit comme un mythe.",
          "— « Impossible. C'est une légende. »",
          "— « Je l'ai tenu entre mes mains ce matin. Il est réel, Elias. Et il contient quelque chose qui va changer tout ce que nous croyons savoir sur nos origines. Mais il y a d'autres personnes qui le cherchent. Des Frères qui ont trahi les valeurs du Temple pour le pouvoir et l'argent. Je ne peux plus le garder. »",
          "— « Où est-il maintenant ? »",
          "— « Caché. Il y a une personne en qui j'ai confiance au Caire. Mais toi seul peux le déchiffrer, Elias. Tu es le seul archéologue que je connaisse qui maîtrise à la fois le kongo ancien, l'égyptien hiératique et les symboles nsibidi. »",
          "Un long silence. Elias entendit un bruit en arrière-plan. Des voix. Des pas précipités.",
          "— « Anwar, tu es en sécurité ? »",
          "— « Prends le premier avion pour Le Caire, Elias. L'avenir de tout ce que nous avons construit en dépend. »",
          "La ligne fut coupée. Elias resta immobile une longue minute, le regard perdu sur le fleuve. Puis il rentra dans son appartement et commença à faire sa valise."
        ]
      },
      {
        number: 4,
        title: "Chapitre II — Les Archives Interdites",
        content: [
          "Avant de prendre son vol, Elias avait une visite à faire.",
          "Les Archives Nationales du Congo se trouvaient dans un bâtiment colonial décrépit du centre-ville, entre une église évangélique tonitruante et un marché où l'on vendait de tout — des légumes, des téléphones, des amulettes et des prières.",
          "Son contact s'appelait Célestine Loutaya. Cinquante ans, archiviste en chef, elle avait les yeux d'une femme qui a lu trop de secrets et la bouche de quelqu'un qui sait les garder. Elle était aussi membre, dans l'ombre, de la Loge du Léopard.",
          "Elias la trouva dans la salle des archives protégées, au sous-sol, entourée de boîtes en carton et de rouleaux de microfilm.",
          "— « Le Manuscrit de Loango », dit-il sans préambule.",
          "Célestine leva les yeux. Quelque chose bougea dans son regard — de la surprise, puis de la peur, puis de la résignation.",
          "— « Tu es aussi au courant », murmura-t-elle. « Anwar m'a appelée hier soir. »",
          "Elle se leva, verrouilla la porte, et revint s'asseoir en baissant la voix :",
          "— « Elias, ce manuscrit ne devrait pas exister. Pas dans notre monde actuel. Il y a des gens qui préfèrent que certaines vérités restent enterrées. Des vérités sur nos origines. Sur le fait que la civilisation égyptienne est la fille d'une tradition bien plus ancienne venue du cœur de l'Afrique. »",
          "Elle alla vers une armoire métallique et en sortit un dossier jauni.",
          "— « J'ai des photos. Prises par un chercheur congolais dans les années 1970, avant que le manuscrit disparaisse à nouveau. Prends-les. Et fais attention à toi au Caire, Elias. Les Frères de l'Ombre n'ont pas de pitié. »",
          "Elias prit le dossier. Les photos montraient des pages couvertes d'une écriture que peu d'hommes au monde auraient pu reconnaître — un mélange de hiéroglyphes égyptiens simplifiés, de signes nsibidi et d'une écriture kongo pré-coloniale. Son cœur battit plus vite. C'était réel. C'était extraordinaire.",
          "— « Les Frères de l'Ombre », dit-il lentement. « C'est quoi exactement ? »",
          "— « Une loge dissidente. Créée dans les années 1960 par des Frères qui ont décidé que la connaissance ne devait pas être partagée — mais utilisée. Pour le pouvoir. Pour l'argent. Pour contrôler les gouvernements et les ressources naturelles. Ils ont des membres dans vingt pays africains. Des ministres, des généraux, des PDG de multinationales. »",
          "— « Et que contient vraiment le manuscrit ? »",
          "Elle le regarda longuement avant de répondre :",
          "— « Il existe, quelque part entre le Congo et l'Égypte, une chambre secrète construite il y a plus de quatre mille ans. Une chambre qui contient non pas de l'or ou des pierres précieuses — mais la Connaissance complète. Le savoir de comment fut vraiment créé le monde. »"
        ]
      },
      {
        number: 5,
        title: "Chapitre III — Brazzaville la Nuit",
        content: [
          "Cette nuit-là, Elias ne dormit pas.",
          "Il était assis à son bureau, les photos du manuscrit étalées devant lui, un dictionnaire de hiéroglyphes d'un côté, ses notes de terrain de l'autre. Les ventilateurs tournaient en silence. Le quartier dormait, mais le fleuve, lui, ne dormait jamais.",
          "Il avait passé trente ans dans la franc-maçonnerie africaine. Trente ans à croire que la Loge du Léopard était une institution noble — une fraternité d'hommes libres cherchant la lumière de la connaissance. Et il avait cru que les sociétés secrètes étaient là pour protéger les savoirs anciens des hommes cupides.",
          "Mais ce soir, pour la première fois, il sentait que la réalité était bien plus complexe.",
          "Il prit son carnet et nota ce qu'il savait des Frères de l'Ombre : fondés vers 1962-1963, en pleine vague d'indépendances africaines. Objectif initial déclaré : préserver les savoirs occultes africains contre l'influence occidentale. Objectif réel : accaparer les ressources naturelles et les leviers du pouvoir politique en Afrique centrale. Méthodes : corruption, chantage, et quand nécessaire — élimination.",
          "Il pensa à des Frères qu'il avait connus. Des hommes qui avaient soudainement disparu. Des accidents inexpliqués. Des crises cardiaques à quarante ans. Il avait toujours refusé d'y voir autre chose que des coïncidences.",
          "Son téléphone vibra. Un message crypté sur une application sécurisée. L'expéditeur était identifié comme Frère H.",
          "Le message disait : NE PARS PAS POUR L'EGYPTE. ILS SAVENT.",
          "Elias regarda fixement son écran. Puis il tapa sa réponse : J'y vais quand même.",
          "Il éteignit son téléphone, finit son café froid, et alla terminer sa valise.",
          "À l'aéroport Maya-Maya, deux heures plus tard, il remarqua deux hommes qui lisaient le même journal sans jamais tourner la page. Leurs yeux, eux, ne le quittaient pas.",
          "Il monta dans l'avion pour Addis-Abeba, correspondance pour Le Caire, et sentit pour la première fois de sa vie adulte ce qu'il n'avait ressenti qu'enfant dans la forêt — la certitude absolue d'être chassé."
        ]
      },
      {
        number: 6,
        title: "Chapitre IV — La Loge du Léopard",
        content: [
          "Un flash-back s'imposait, comme les ancêtres s'imposent aux vivants.",
          "1992. Elias avait vingt-sept ans et venait d'être élevé au grade de Compagnon dans la Loge du Léopard. Son Maître, le Dr. Théodore Nkossi — médecin, ancien ministre, homme d'une élégance et d'une intelligence rares — l'avait convoqué dans son bureau pour la Grande Révélation.",
          "— « Assois-toi, Frère Elias. Il est temps que tu saches dans quoi tu es entré. »",
          "La pièce était tapissée de livres — philosophie, théologie, histoire — mais aussi des textes qu'on ne trouvait pas en librairie : des grimoires, des traités de magie kongo, des copies de manuscrits arabes anciens.",
          "— « La Loge du Léopard n'est pas une simple loge maçonnique », dit Nkossi. « Elle remonte, dans sa forme actuelle, au XVIIe siècle. Mais ses racines plongent jusqu'au royaume de Loango, et avant cela, jusqu'à la civilisation égyptienne elle-même. Notre Loge garde quelque chose. Un secret confié il y a des siècles par les Maîtres du Loango. Un secret que les Frères de l'Ombre cherchent depuis des décennies. »",
          "— « Quel secret ? »",
          "Nkossi se leva et alla à la fenêtre. Au-dehors, Brazzaville vivait son agitation ordinaire. Des enfants jouaient au foot dans la rue.",
          "— « L'emplacement du Sanctuaire. Une chambre construite il y a plus de quatre mille ans, sous les ordres d'un pharaon dont le nom a été effacé de tous les monuments. Une chambre que les gardiens ont protégée pendant des millénaires en se déplaçant toujours plus au sud, jusqu'au cœur de l'Afrique. »",
          "Il se retourna, son regard intense :",
          "— « Le Sanctuaire contient les Tables de la Loi originelles. Pas celles de Moïse. Les précédentes. Celles sur lesquelles est inscrit le véritable nom de Dieu et les lois fondamentales de la création. Celui qui les lit acquiert une compréhension du monde que nul autre humain ne possède. »",
          "— « Et nous sommes les gardiens de cela ? »",
          "— « Nous l'étions. Jusqu'à ce qu'en 1987, un traître en notre sein vende l'emplacement partiel du Sanctuaire aux Frères de l'Ombre. Depuis, nous courons contre la montre. »"
        ]
      },
      {
        number: 7,
        title: "Chapitre V — Le Manuscrit de Loango",
        content: [
          "Le Caire l'accueillit avec sa chaleur habituelle — trente-huit degrés à neuf heures du matin, une lumière blanche et coupante, et l'odeur de millions de vies mêlées dans une ville qui ne dormait jamais.",
          "Le contact d'Anwar s'appelait Fatima Osman. Trente-cinq ans, professeure à l'Université du Caire, spécialiste des manuscrits coptes et arabes médiévaux. Elle l'attendait dans un café de Zamalek, l'air de quelqu'un qui vérifie constamment si on la suit.",
          "Ils se reconnurent au signe convenu — l'équerre et le compas dessinée furtivement du bout du doigt sur la table.",
          "— « Où est Anwar ? »",
          "Son visage se ferma.",
          "— « Il a été retrouvé mort hier matin. Officiellement, une crise cardiaque. Il avait soixante-douze ans et le cœur solide d'un homme de quarante. Mais les gens qui l'ont retrouvé disent qu'il avait l'expression de quelqu'un qui a vu quelque chose d'inimaginable avant de mourir. »",
          "Elias ferma les yeux une seconde. Anwar. Un homme bon. Un vrai Frère.",
          "Elle glissa sous la table une enveloppe épaisse en papier kraft.",
          "— « Ce ne sont que des photos. Très haute résolution. Le manuscrit lui-même est dans un coffre sécurisé. Par sécurité. »",
          "Elias ouvrit l'enveloppe et son souffle se bloqua dans sa gorge.",
          "Les photographies montraient des pages d'un parchemin brun-rouge, couvertes d'une écriture dense et serrée. Un système hybride : des hiéroglyphes égyptiens du Nouvel Empire simplifiés, des signes nsibidi — le système d'écriture secret des sociétés Ekpe d'Afrique centrale — et du kikongo pré-colonial, une forme de la langue qu'on ne parlait plus depuis le XVIIIe siècle.",
          "C'était la preuve. La preuve que les gardiens du Loango avaient véritablement reçu un héritage de l'Égypte ancienne, transmis de génération en génération, gardé secret pendant trois millénaires.",
          "— « Je peux lire ça », dit-il, la voix étranglée par l'émotion.",
          "— « Je sais. C'est pour ça qu'Anwar vous a choisi. »"
        ]
      },
      {
        number: 8,
        title: "Chapitre VI — Sur les Traces du Nil",
        content: [
          "Ils travaillèrent toute la nuit dans l'appartement de Fatima, portes barricadées, volets clos, le manuscrit étalé sur la grande table de travail. Dehors, Le Caire respirait. Une radio voisine jouait de l'Om Kalthoum.",
          "Le texte était à la fois un récit historique et un guide initiatique. Il racontait l'histoire d'un groupe de prêtres égyptiens — les Shemsu Hor, les Suivants d'Horus — qui, lors de la chute de la XXIe dynastie vers 945 av. J.-C., avaient fui vers le sud avec les objets les plus sacrés du temple d'Amon de Karnak.",
          "Ils avaient remonté le Nil, traversé le Soudan, le lac Tchad, et s'étaient finalement établis dans une région correspondant à l'actuel bassin du Congo. Là, ils avaient fondé une nouvelle communauté, transmettant leur savoir aux peuples locaux et créant un système d'écriture hybride pour préserver leurs textes sacrés.",
          "Mais le plus extraordinaire était ce que contenait la seconde partie du manuscrit.",
          "— « Mon Dieu », murmura Elias.",
          "— « Quoi ? Qu'est-ce qu'il dit ? »",
          "Il leva les yeux vers Fatima, son visage pâle dans la lumière de la lampe :",
          "— « Il dit que le Sanctuaire n'est pas en Égypte. Il n'est pas non plus au Congo. Les Shemsu Hor ont divisé le chemin en deux parties. La première moitié du plan se trouve dans une inscription cachée sous le Sphinx de Gizeh. La seconde moitié est gravée dans une grotte sous les chutes de Livingstone, sur le fleuve Congo. »",
          "— « Et ensemble, les deux moitiés indiquent... »",
          "— « L'emplacement exact du Sanctuaire. Quelque part entre les deux. Quelque part en Afrique centrale. »",
          "Un bruit sourd contre la porte d'entrée les figea tous les deux. Puis un autre. Puis le bois qui craqua.",
          "— « Ils nous ont trouvés », souffla Fatima.",
          "— « La fenêtre du fond. Vite. »"
        ]
      },
      {
        number: 9,
        title: "Chapitre VII — Les Pyramides Parlent",
        content: [
          "Ils coururent dans les ruelles du Caire comme deux ombres dans une nuit sans lune.",
          "Elias avait glissé les photos dans son sac à dos. Fatima courait devant, elle connaissait le quartier comme ses poches. Ils entendaient derrière eux des pas, des voix en arabe — trois hommes, peut-être quatre.",
          "Ils se réfugièrent dans une mosquée ouverte pour la prière du soir. Assis parmi les fidèles, invisibles, ils reprirent leur souffle.",
          "— « Qui étaient ces hommes ? » souffla Elias.",
          "— « Les Frères de l'Ombre ont des agents partout au Caire. Des policiers, des fonctionnaires, des criminels. Ils ont de l'argent et aucune limite morale. »",
          "— « Il faut aller sous le Sphinx. »",
          "Fatima le regarda comme s'il avait annoncé vouloir voler jusqu'à la lune :",
          "— « Le Sphinx est surveillé vingt-quatre heures sur vingt-quatre. Il y a des caméras partout depuis 2001. »",
          "— « Oui. Mais j'ai un ami qui est inspecteur au Conseil Suprême des Antiquités. Un Frère. Il m'a dit une fois qu'il existait un accès non documenté sous la patte gauche du Sphinx, connu seulement de quelques conservateurs. »",
          "Le lendemain, à l'aube, Elias et Fatima suivaient Hassan Kamal — l'inspecteur, un homme maigre aux doigts tachés d'encre — dans un couloir bas de plafond qui sentait le calcaire humide et l'histoire.",
          "Les lampes frontales découpaient des ombres sur des murs qu'aucun touriste n'avait jamais vus. Et là, sur une paroi de calcaire, à hauteur d'épaule, Elias découvrit ce que trois mille ans avaient caché.",
          "Une inscription dans le même système hybride du manuscrit de Loango. Le signe nsibidi du serpent sacré. Le hiéroglyphe du chemin caché. Et des coordonnées en termes célestes — mesurées par rapport à trois étoiles de la constellation d'Orion, ce système que les Égyptiens utilisaient pour cartographier leur monde.",
          "Elias photographia tout, les mains tremblantes.",
          "— « C'est réel », murmura Hassan. « Mon Dieu, c'est réel. »",
          "— « Maintenant il faut aller au Congo. Aux chutes de Livingstone. Trouver la seconde moitié. Et croiser les deux. »"
        ]
      },
      {
        number: 10,
        title: "Chapitre VIII — La Chambre Noire",
        content: [
          "Le retour en Afrique centrale fut une course contre la montre.",
          "Les chutes de Livingstone — appelées localement Kinsuka — se trouvent en aval de Kinshasa, là où le fleuve Congo rétrécit entre des gorges rocheuses avant de se précipiter dans une succession de rapides parmi les plus puissants de la planète.",
          "Elias et Fatima prirent un vol pour Kinshasa, puis traversèrent le fleuve en pirogue pour rejoindre Brazzaville. Là, Célestine les attendait avec un 4x4 et deux hommes de confiance — d'anciens militaires reconvertis qui assuraient parfois la sécurité de la Loge.",
          "Ils roulèrent vers le sud-ouest, longeant le fleuve, jusqu'aux approches des rapides. La végétation était dense, l'air chargé d'humidité et du grondement sourd des eaux.",
          "La grotte était connue des pêcheurs locaux. Un couloir étroit dans la roche, accessible seulement quand le niveau du fleuve baissait en saison sèche. Ils y entrèrent en file indienne, les pieds dans l'eau froide.",
          "Et Elias la vit.",
          "Sur la paroi du fond, protégées par un avancement naturel de la roche qui les avait gardées au sec pendant des millénaires — les inscriptions. Parfaites. Intactes.",
          "C'était l'autre moitié du plan. Les coordonnées célestes complémentaires. Croisées avec celles du Sphinx, elles donnaient un point précis dans la forêt équatoriale congolaise — à environ deux cents kilomètres au nord-est de Brazzaville.",
          "— « On y est presque », souffla-t-il.",
          "Un bruit derrière eux. Un clic métallique qu'ils reconnurent tous. Une arme qu'on arme.",
          "— « En effet », dit une voix froide. « Vous y êtes presque. Et maintenant, vous allez nous y emmener. »",
          "Elias se retourna lentement. L'homme qui les tenait en joue avait le regard froid comme le fleuve en saison sèche. Et à côté de lui, souriant — Hassan Kamal.",
          "Le Frère égyptien. Celui qui leur avait ouvert l'accès sous le Sphinx.",
          "— « Hassan... »",
          "— « Pardonne-moi, Frère. Mais il y a des offres qu'on ne refuse pas. Surtout quand elles viennent accompagnées de menaces contre ta famille. »"
        ]
      },
      {
        number: 11,
        title: "Chapitre IX — Le Grand Architecte",
        content: [
          "On les emmena dans la forêt.",
          "Deux jours de piste, les mains liées, dans des véhicules militaires. La forêt équatoriale se refermait sur eux comme une main géante. Les arbres étaient immenses, leurs cimes perdues dans une bruine perpétuelle. Des singes les observaient depuis les branches.",
          "Le camp des Frères de l'Ombre était installé dans une clairière — des tentes militaires, des générateurs, du matériel de fouille archéologique. Une centaine d'hommes au minimum.",
          "Et au centre — le Grand Maître des Frères de l'Ombre.",
          "Elias n'aurait jamais imaginé le reconnaître.",
          "C'était le Général Victor Makosso. Soixante-cinq ans, ancien chef d'état-major, figure tutélaire de plusieurs gouvernements, membre du conseil d'administration de plusieurs multinationales minières. Et un Frère — l'un des plus anciens membres de la Loge du Léopard avant sa défection dans les années 1990.",
          "— « Professeur Mokonzi. Ça fait longtemps. »",
          "— « Général. Je ne savais pas que c'était vous. »",
          "— « Peu de gens le savent. C'est l'avantage des sociétés secrètes. »",
          "— « Qu'est-ce que vous voulez vraiment ? »",
          "— « La même chose que vous. La Connaissance. Mais contrairement à vous et à vos Frères idéalistes, je ne veux pas la contempler comme un objet sacré. Je veux l'utiliser. L'Afrique a été pillée pendant cinq cents ans. Ses ressources, ses hommes, sa dignité, son histoire. Ce que ce Sanctuaire contient est la preuve que nous sommes le berceau de toute civilisation. Avec ce savoir, le rapport de force mondial change du tout au tout. »",
          "Elias le regarda. Il y avait une logique terrible dans ce discours. Et une dangerosité égale.",
          "— « Et les hommes que vous avez tués ? Anwar ? Les autres ? »",
          "Le Général ne cilla pas :",
          "— « Des dommages collatéraux. Dans toute guerre, il y a des victimes. Je le regrette. Mais je ne m'en excuse pas. »"
        ]
      },
      {
        number: 12,
        title: "Chapitre X — Trahisons",
        content: [
          "Cette nuit-là, seul dans sa tente sous bonne garde, Elias réfléchit.",
          "Il avait trente ans de maçonnerie derrière lui. Trente ans de serments. Le silence. La fraternité. La protection du sacré contre la cupidité des hommes.",
          "Mais le Général n'avait pas entièrement tort. L'Afrique avait été pillée. Son histoire avait été effacée, falsifiée, méprisée. Des générations d'Africains avaient grandi en croyant qu'ils n'avaient pas d'histoire, pas de civilisation. C'était un mensonge colossal. Et si le Sanctuaire contenait la preuve du contraire...",
          "Mais il y avait une différence fondamentale entre partager cette vérité et l'utiliser comme arme. La Connaissance ne pouvait pas être militarisée sans être corrompue.",
          "Une voix derrière lui le fit se retourner :",
          "— « Professeur. »",
          "C'était un jeune soldat. Pas plus de vingt ans, le visage anguleux, les yeux inquiets. Il parlait en chuchotant.",
          "— « Je m'appelle Didier. Mon père était franc-maçon. Loge du Léopard. »",
          "— « Qui est ton père ? »",
          "— « Emmanuel Loutaya. »",
          "Elias se figea. Loutaya. Le fils de Célestine.",
          "— « Ils ont menacé ma mère », dit le jeune homme, les lèvres tremblantes. « Ils ont dit qu'ils la tueraient si je ne rejoignais pas leur camp. Mais je ne veux pas être ici. Je veux vous aider. »",
          "— « Comment ? »",
          "Le jeune homme glissa quelque chose dans sa main. Un petit couteau. Et un plan dessiné à la main.",
          "— « Les gardes changent à trois heures du matin. Il y a une fenêtre de sept minutes. La forêt commence à cinquante mètres à l'est. »",
          "— « Pourquoi tu fais ça ? »",
          "Le jeune homme le regarda avec des yeux qui ressemblaient à ceux de sa mère :",
          "— « Parce que mon père m'a toujours dit que la Lumière valait plus que la vie. Et je crois que c'est vrai. »"
        ]
      },
      {
        number: 13,
        title: "Chapitre XI — La Bataille de la Forêt",
        content: [
          "À trois heures du matin, ils coururent.",
          "Elias, Fatima, et Célestine — qui avait été capturée le jour précédent — s'enfoncèrent dans la forêt comme des ombres, guidés par la lueur verte du compas de Célestine.",
          "La forêt équatoriale la nuit est un monde différent. Les sons s'amplifient. Le sol est traître — racines, trous, boue, eau stagnante. Ils tombaient, se relevaient, couraient encore. Derrière eux, les cris. Les lampes des soldats qui dansaient entre les arbres.",
          "Célestine avait contacté la Loge du Léopard avant d'être capturée. Une extraction était prévue à l'aube, cinq kilomètres plus au nord.",
          "Cinq kilomètres dans la forêt la nuit. Une éternité.",
          "Ils l'atteignirent.",
          "Deux hélicoptères les attendaient dans une petite clairière. Et une dizaine d'hommes de la Loge — dont certains en uniforme militaire.",
          "Ce que les Frères de l'Ombre n'avaient pas prévu, c'est que la Loge du Léopard avait, elle aussi, des généraux. Et des alliances dans les cercles du pouvoir que le vieux Makosso n'avait pas anticipées.",
          "Il y eut des coups de feu. Des négociations. Une heure de tension extrême dans la clairière baignée de brume matinale.",
          "Et puis, le Général Makosso déposa les armes. Non pas par défaite militaire. Mais parce qu'Elias lui avait dit quelque chose que personne d'autre n'aurait pu lui dire.",
          "— « Victor », dit-il en s'avançant seul vers lui, les mains visibles. « Nous avons tous les deux prêté le même serment il y a longtemps. Tu t'en souviens ? La Lumière ne peut être partagée que dans la paix. Pas dans le sang. Jamais dans le sang. »",
          "Un très long silence.",
          "— « Si le Sanctuaire existe, et si nous le trouvons — tu as raison que sa vérité appartient à toute l'Afrique. Mais cette vérité doit être révélée au monde entier, pas transformée en arme de pouvoir. C'est la différence entre nous, Victor. Je veux partager. Tu veux dominer. »",
          "Dans la forêt, un oiseau chanta l'aurore. Le Général baissa lentement son arme."
        ]
      },
      {
        number: 14,
        title: "Chapitre XII & Épilogue — Le Rituel Final & La Lumière",
        content: [
          "Le Sanctuaire fut trouvé trois semaines plus tard.",
          "En croisant les deux séries de coordonnées — celles du Sphinx et celles des chutes de Livingstone — Elias obtint un point précis : une colline dans la province du Pool, à cent quatre-vingt-dix kilomètres au nord-est de Brazzaville. Une colline que les villageois appelaient depuis toujours Ngoma Lungunda — la Colline qui se souvient.",
          "L'entrée était dissimulée sous une dalle de pierre que des siècles de végétation avaient recouverte. Il fallut trois jours pour la dégager.",
          "Ils descendirent ensemble — Elias, Fatima, Célestine, le Général Makosso, le jeune Didier, et Hassan Kamal, qui pleurait en silence, consumé de honte pour sa trahison.",
          "L'escalier de pierre descendait en spirale sur une vingtaine de mètres. L'air était sec, préservé par une alchimie architecturale que les anciens seuls connaissaient. Les murs étaient lisses, couverts de fresques d'une couleur encore vive — des scènes de vie égyptienne, des rituels, des processions. Mais aussi des scènes africaines — des danseurs masqués, des guerriers, des femmes portant des enfants.",
          "La salle finale était circulaire. Haute d'une dizaine de mètres. Au centre, sur un socle de granit noir, reposaient deux tablettes de pierre grise, couvertes d'inscriptions. Parfaitement conservées.",
          "Personne ne parla pendant très longtemps.",
          "Elias s'approcha. Ses mains tremblaient. Il lut la première ligne de la première tablette, et ses genoux manquèrent de le trahir.",
          "Ce n'était pas le nom de Dieu. Ce n'était pas une formule magique. Ce n'était pas non plus une arme.",
          "C'était une lettre. Écrite par les prêtres des Shemsu Hor, trois mille ans auparavant, adressée à ceux qui viendraient après eux. Il lut à voix haute :",
          "« Nous, serviteurs de la Lumière première, gardons ici non un trésor d'or, non une arme de domination, non un secret de pouvoir. Nous gardons une vérité simple que les hommes oublient sans cesse : toute connaissance est une. Toute humanité est une. Ce que vous cherchez n'était pas caché dans ces pierres. Il était dans le chemin que vous avez parcouru pour les trouver. »",
          "La seconde tablette listait des savoirs — astronomie, médecine, agriculture, architecture, philosophie morale — transmis par les Shemsu Hor aux peuples d'Afrique centrale, et enrichis par ces peuples pendant des siècles.",
          "La preuve de la connexion était là. Réelle. Irréfutable. Pas une arme. Un héritage.",
          "Le Général Makosso s'assit sur les marches de pierre : « J'avais tort sur la méthode. Pas sur la cause. » — « Personne ne dit le contraire », répondit Elias doucement.",
          "ÉPILOGUE — SIX MOIS APRÈS :",
          "La découverte du Sanctuaire fut annoncée lors d'une conférence conjointe à Brazzaville organisée par l'UNESCO. Ce fut un séisme scientifique mondial confirmant les racines communes entre l'Afrique subsaharienne et l'Égypte ancienne.",
          "Elias Mokonzi prit sa retraite dans une petite maison près du fleuve à Brazzaville, écrivant ses mémoires :",
          "« Les secrets que les hommes gardent le plus farouchement ne sont jamais des vérités cachées. Ce sont des peurs. Et la Lumière — la vraie, celle qu'on cherche dans les loges, les temples et les grottes secrètes — n'est rien d'autre que le courage de les regarder en face. »",
          "FIN — « La vérité est comme le soleil. On peut s'en passer un moment, mais sans elle, pas de vie. » — Victor Hugo"
        ]
      }
    ]
  },

  // 2. SHADOWS & SCARS
  {
    id: 'shadows-and-scars',
    title: 'Shadows & Scars',
    subtitle: 'Une BD adulte multiculturelle',
    genre: 'BD adulte multiculturelle',
    badge: 'bd',
    badgeLabel: 'Bande Dessinée',
    coverImage: '/images/shadows-and-scars.jpg',
    description:
      'Entre les gratte-ciels de New York et les rives du fleuve Congo à Brazzaville, une famille cache un secret qui traversera deux continents, plusieurs vies et toutes les émotions humaines.',
    priceFcfa: 9000,
    priceEur: 13.8,
    isbnCode: '978-2-958432-02-1',
    rating: 4.9,
    tags: ['Drame', 'Romance', 'Horreur', 'Humour', 'Mystère & Secrets'],
    chapters: [
      {
        number: 1,
        title: 'Présentation & Galerie des Personnages',
        content: [
          "SHADOWS & SCARS — Une BD adulte multiculturelle",
          "Scénario & Dialogues par Claude — Anthropic | 2026",
          "Œuvre de fiction — Personnages entièrement imaginaires",
          "PITCH : Entre les gratte-ciels de New York et les rives du fleuve Congo à Brazzaville, une famille cache un secret qui traversera deux continents, plusieurs vies et toutes les émotions humaines.",
          "GENRES : DRAME • ROMANCE • HORREUR • HUMOUR • MYSTÈRE",
          "LES PERSONNAGES :",
          "• NADIA MBEMBA (28 ans — Brazzaville / New York) : Fille d'un grand homme d'affaires congolais. Brillante avocate à Manhattan. Belle, fière, portant en elle les cicatrices d'une enfance dont elle ne parle jamais. Elle cache un secret sur sa naissance qui va changer sa vie.",
          "• JASON COLE (32 ans — New York) : Journaliste d'investigation afro-américain au New York Tribune. Curieux, tenace, avec un humour mordant qui cache une blessure profonde. Il tombe amoureux de Nadia au pire moment possible — quand il enquête sur son père.",
          "• KWON JI-HO (30 ans — Séoul / New York) : Architecte coréen mystérieux, ami d'enfance de Nadia. Élégant, silencieux, avec un regard qui en dit toujours plus que ses mots. Il connaît le secret de la famille Mbemba — et il a juré de le garder jusqu'à sa mort.",
          "• CÉLESTINE MBEMBA (58 ans — Brazzaville) : La mère de Nadia. Femme d'une beauté majestueuse, ancienne chanteuse de jazz, aujourd'hui épouse du puissant Édouard Mbemba. Elle sourit toujours. Mais ses yeux racontent une histoire de peur et de prison dorée.",
          "• ÉDOUARD MBEMBA (65 ans — Brazzaville) : Le père de Nadia. Milliardaire, philanthrope respecté, figure de la société congolaise. Charmant en public. Tyrannique en privé. Et derrière sa façade parfaite, un passé qui pourrait tout détruire.",
          "• LOLA BIYOUDI (27 ans — Brazzaville) : La meilleure amie de Nadia depuis l'enfance. Infirmière, drôle, directe, avec une réplique cinglante pour chaque situation. Le cœur comique de l'histoire. Mais quand la nuit tombe, Lola a aussi ses propres démons."
        ]
      },
      {
        number: 2,
        title: '[ ÉPISODE 1 — DRAME ] Racines brisées',
        content: [
          "New York. La veille du retour au Congo.",
          "Manhattan. 23h45. L'appartement de Nadia, 34e étage. Vue sur Central Park.",
          "CASE : Vue aérienne de Manhattan la nuit. Les lumières de la ville comme des étoiles renversées. Au premier plan, une silhouette féminine près d'une baie vitrée.",
          "Nadia se tient immobile devant la fenêtre. Elle tient un verre de vin rouge qu'elle ne boit pas. Sur la table derrière elle, un billet d'avion. Destination : Maya-Maya, Brazzaville. Et une lettre — une seule ligne manuscrite qu'elle a relue cent fois.",
          "CASE : Gros plan sur la lettre. On peut lire : « Ta mère est en danger. Reviens. — Ji-Ho »",
          "Son téléphone sonne. Elle ne décroche pas. Il sonne encore.",
          "JASON (voix off, téléphone) : Nadia, c'est la troisième fois que j'appelle. Je sais que tu es là. J'ai besoin de te parler. Ce soir. C'est important.",
          "CASE : Nadia ferme les yeux. Un long soupir. Elle décroche.",
          "NADIA : Jason. Il est presque minuit.",
          "JASON : Je sais. Je suis devant ta porte.",
          "CASE : Nadia ouvre la porte. Jason est là — manteau froissé, les cheveux mouillés par la pluie, une enveloppe dans la main. Il a l'air de quelqu'un qui n'a pas dormi depuis deux jours.",
          "JASON : Je fais une enquête sur les Mbemba Industries depuis six mois. Ce que j'ai trouvé... Nadia, je devais te le dire moi-même avant de publier.",
          "NADIA : De quoi tu parles ?",
          "CASE : Jason pose l'enveloppe sur la table. Des photos. Des documents. Des noms.",
          "JASON : En 1994, ton père a signé un contrat avec une milice. Des mines illégales dans le nord du Congo. Des centaines de familles déportées. Des enfants... Nadia, il y a des enfants là-dedans.",
          "CASE : Gros plan sur le visage de Nadia. Quelque chose se brise dans ses yeux.",
          "NADIA : Tu mens.",
          "JASON : Je voudrais tellement mentir. Mais les preuves sont là.",
          "Un silence immense s'installe entre eux. Dehors, la pluie tambourine contre les vitres. New York continue son bruit de fond éternel, indifférent.",
          "NADIA : Sors. Sors de chez moi, Jason.",
          "JASON (voix basse) : Nadia...",
          "NADIA : J'ai dit sors !",
          "CASE : Jason repart. La porte se referme. Nadia glisse lentement le long du mur jusqu'au sol. Les photos éparpillées autour d'elle. Elle ne pleure pas. Elle est au-delà des larmes.",
          "Et pour la première fois depuis longtemps, elle pense à sa mère."
        ]
      },
      {
        number: 3,
        title: '[ ÉPISODE 2 — ROMANCE ] Le langage des cicatrices',
        content: [
          "Brazzaville. Trois jours après.",
          "Brazzaville. Le marché du Plateau des 15 ans. Couleurs, odeurs, vie.",
          "CASE : Vue panoramique du marché de Brazzaville. Des stands colorés, des femmes en pagne, des enfants qui courent, le fleuve Congo visible au fond.",
          "Nadia marche dans le marché de son enfance. Elle n'est pas revenue depuis trois ans. Les odeurs la saisissent — le poisson fumé, la papaye, l'huile de palme. Des mémoires surgissent malgré elle.",
          "CASE : Nadia s'arrête devant un stand de fleurs. Une vieille femme lui sourit.",
          "VIEILLE FEMME : Muana Mbemba ! Tu as grandi, hein ! Tu es belle comme ta mère !",
          "Nadia sourit poliment. Mais le mot 'mère' lui fait l'effet d'une aiguille.",
          "CASE : Une main se pose sur son épaule. Elle se retourne. C'est Ji-Ho — impeccable dans sa chemise blanche, son sourire doux, ses yeux qui voient tout.",
          "JI-HO : Tu es venue.",
          "NADIA : Tu m'as dit que ma mère était en danger.",
          "JI-HO : Oui. Mais d'abord, mange quelque chose. Tu as l'air d'un zombie.",
          "NADIA : Ji-Ho...",
          "JI-HO : Je sais. Je sais tout. Mange quand même.",
          "CASE : Ils s'assoient dans un petit restaurant de rue. Brochettes, plantains, jus de gingembre. Ji-Ho mange calmement. Nadia le regarde.",
          "NADIA : Depuis combien de temps tu sais, pour mon père ?",
          "JI-HO : Depuis que j'avais seize ans. Mon père travaillait pour le sien.",
          "NADIA : Et tu ne m'as rien dit.",
          "JI-HO : Non.",
          "NADIA : Pourquoi ?",
          "CASE : Ji-Ho pose sa fourchette. Il la regarde longuement.",
          "JI-HO : Parce que j'avais peur de te perdre. Et je me déteste pour ça.",
          "Un silence. Le bruit du marché autour d'eux — les cris des vendeurs, la musique congolaise qui s'échappe d'une boutique voisine, le klaxon des voitures sur le boulevard.",
          "NADIA : Est-ce que tu m'as aimée, Ji-Ho ? Vraiment aimé ?",
          "CASE : Gros plan sur le visage de Ji-Ho. Quelque chose de vulnérable s'y lit pour la première fois.",
          "JI-HO (voix douce) : Toute ma vie. Depuis que tu avais douze ans et que tu m'as dit que j'étais trop sérieux et que je devais apprendre à danser.",
          "Nadia rit malgré elle. Un rire qui ressemble à des larmes.",
          "NADIA : Tu danses toujours aussi mal.",
          "JI-HO : Oui. Mais je me suis amélioré. Pour toi.",
          "CASE : Leurs mains se touchent sur la table. Une promesse silencieuse. Autour d'eux, Brazzaville vit, chante, respire.",
          "Certains amours n'ont pas besoin de mots. Juste de temps. Et de courage."
        ]
      },
      {
        number: 4,
        title: '[ ÉPISODE 3 — HUMOUR ] Lola ne filtre pas',
        content: [
          "La maison familiale des Mbemba. Le soir.",
          "La salle à manger des Mbemba. Un dîner de famille. Tout le monde est trop bien habillé et personne ne dit ce qu'il pense. Sauf Lola.",
          "CASE : Grande table élégante. Édouard Mbemba en bout de table, Célestine en face. Nadia et Ji-Ho d'un côté. Lola de l'autre — elle est l'« amie invitée » et elle regarde la scène comme si elle regardait une telenovela.",
          "ÉDOUARD (souriant) : Ji-Ho, mon fils. Toujours aussi élégant. L'architecture se porte bien ?",
          "JI-HO : Très bien, monsieur Mbemba. Merci.",
          "LOLA (voix basse à Nadia) : Il a dit 'mon fils'. Il sait que Ji-Ho est amoureux de toi depuis vingt ans ?",
          "NADIA (voix basse) : Lola. Tais-toi.",
          "LOLA : Je dis juste !",
          "CASE : Célestine sert la soupe. Elle sourit. Toujours ce sourire.",
          "CÉLESTINE : Lola, tu travailles toujours à l'hôpital ?",
          "LOLA : Oui madame ! Et je peux vous dire que ce métier, ça use. La semaine dernière j'ai eu un patient qui m'a dit qu'il avait mal au ventre depuis six mois. Six mois ! J'lui ai dit : monsieur, votre ventre vous a envoyé une lettre recommandée, un email et un coup de téléphone. Vous avez ignoré les trois !",
          "CASE : Célestine rit vraiment — pas son sourire de façade, un vrai rire. Édouard lève les sourcils. Nadia cache son sourire dans sa serviette.",
          "ÉDOUARD : Votre amie est... pittoresque, Nadia.",
          "LOLA (à voix haute) : Monsieur Mbemba, 'pittoresque' c'est le mot qu'on utilise quand on veut dire 'bizarre' mais qu'on est trop poli. J'accepte les deux.",
          "CASE : Ji-Ho s'étouffe avec son eau. Nadia lui tape dans le dos.",
          "JI-HO (toussant) : Elle est... rafraîchissante.",
          "LOLA : Merci Ji-Ho. Et toi tu es beau comme un drama coréen. Mais tu fais la tête comme dans les épisodes tristes. Souris un peu !",
          "CASE : Ji-Ho sourit malgré lui. C'est peut-être le premier vrai sourire qu'on lui voit.",
          "ÉDOUARD (froid) : Lola, vous avez une famille ici à Brazzaville ?",
          "LOLA : Oui ! Ma mère, mes trois sœurs, mon oncle Célestin qui joue de la sanza comme si c'était pas un instrument mais une arme, et mon chat Mobutu.",
          "ÉDOUARD : Votre chat s'appelle Mobutu ?",
          "LOLA : Oui. Parce qu'il mange tout ce qu'il trouve et il rend jamais compte de rien.",
          "CASE : Célestine éclate de rire. Édouard regarde sa femme rire et pour une seconde — une toute petite seconde — son masque se fissure.",
          "Dans cette maison pleine de secrets et de non-dits, Lola était le seul être qui disait simplement la vérité. Et ça, ça avait une valeur inestimable."
        ]
      },
      {
        number: 5,
        title: '[ ÉPISODE 4 — HORREUR ] Ce qui dort dans le fleuve',
        content: [
          "La nuit. La villa des Mbemba en périphérie de Brazzaville.",
          "2h37 du matin. La villa Mbemba. Tout le monde dort. Sauf Nadia.",
          "CASE : Couloir sombre de la villa. Nadia en pyjama, une lampe torche à la main. Elle marche vers le bureau de son père — une pièce où elle n'a jamais eu le droit d'entrer.",
          "Elle avait attendu ce moment. Attendu que son père dorme, que les gardes fassent leur ronde, que la maison devienne silencieuse comme une tombe. Elle avait besoin de preuves. Des preuves que Jason avait tort. Que son père n'était pas ce monstre.",
          "CASE : Elle pousse la porte du bureau. Elle grince. Elle s'arrête. Rien. Elle entre.",
          "CASE : Le bureau est immense. Des livres, des tableaux, un grand bureau en acajou. Et derrière le bureau — un portrait d'Édouard Mbemba jeune. Il sourit sur le portrait. Dans la lumière de la lampe torche, le sourire a quelque chose d'inquiétant.",
          "Elle commence à fouiller les tiroirs. Des contrats. Des lettres. Des noms qu'elle ne connaît pas. Et puis — au fond du dernier tiroir, sous un double fond — une boîte en métal.",
          "CASE : Gros plan sur la boîte. Elle l'ouvre avec les mains qui tremblent.",
          "Des photos. Noir et blanc. Des images qui lui brûlent les yeux. Elle les regarde une par une, et son monde s'effondre lentement, comme un immeuble qu'on dynamite au ralenti.",
          "CASE : Une photo en particulier. Une femme jeune, les yeux terrifiés. Et à côté d'elle — un homme qu'elle reconnaît. Son père. Vingt ans plus jeune. Mais c'est bien lui. Et l'expression sur son visage...",
          "Certaines vérités, une fois vues, ne peuvent plus être dé-vues.",
          "CASE : Nadia recule. Elle heurte quelque chose derrière elle. Elle se retourne.",
          "CASE : Son père est dans l'encadrement de la porte. En robe de chambre. Il la regarde. Calme. Trop calme.",
          "ÉDOUARD (voix douce, presque tendre) : Je savais que tu viendrais ici un jour.",
          "Nadia ne peut pas parler. La boîte est dans ses mains.",
          "ÉDOUARD : Pose ça, Nadia.",
          "NADIA (voix étranglée) : Qui est cette femme ?",
          "CASE : Long silence. Le visage d'Édouard ne change pas. C'est ça qui fait peur.",
          "ÉDOUARD : Une erreur. Une vieille erreur.",
          "NADIA : Non. Non, dis-moi qui c'est.",
          "CASE : Édouard avance d'un pas. Nadia recule d'un pas. Ils dansent une danse ancienne dont elle commence seulement à comprendre les règles.",
          "ÉDOUARD : Elle s'appelait Joséphine. Et ce que tu vas faire maintenant, c'est remettre cette boîte exactement où tu l'as trouvée. Et demain matin, tu repartiras pour New York. Et nous n'en parlerons plus jamais.",
          "NADIA : Et si je refuse ?",
          "CASE : Édouard la regarde. Et pour la première fois dans sa vie, Nadia voit son père tel qu'il est vraiment.",
          "Il n'avait pas besoin de répondre. La réponse était dans ses yeux.",
          "CASE : Nadia repose la boîte. Elle sort du bureau. Elle marche jusqu'à sa chambre. Elle ferme la porte à clé. Et là, dans le noir, elle envoie un message.",
          "CASE : Gros plan sur l'écran du téléphone : message à Jason Cole — « Tu avais raison. J'ai besoin d'aide. Viens. »"
        ]
      },
      {
        number: 6,
        title: '[ ÉPISODE 5 — MYSTÈRE & RÉVÉLATION ] Le nom de Joséphine',
        content: [
          "Brazzaville. Le lendemain matin.",
          "Le fleuve Congo au lever du soleil. Deux silhouettes sur la rive.",
          "CASE : Nadia et Ji-Ho assis sur la berge du fleuve. Le soleil se lève sur le Congo. Les pirogues commencent leur ballet matinal. C'est beau et ça fait mal.",
          "NADIA : Qui était Joséphine ?",
          "CASE : Ji-Ho regarde le fleuve longuement avant de répondre.",
          "JI-HO : Joséphine Loutete. Elle avait vingt-deux ans en 1994. Elle travaillait pour ton père. Et elle a vu quelque chose qu'elle n'aurait pas dû voir.",
          "NADIA : Qu'est-ce qu'elle a vu ?",
          "JI-HO : Le vrai visage de Mbemba Industries. Les camps. Les enfants. Elle a voulu témoigner.",
          "NADIA : Et mon père l'en a empêchée.",
          "CASE : Ji-Ho hoche la tête. Un seul mouvement. Mais le poids de ce geste est immense.",
          "NADIA : Elle est morte ?",
          "JI-HO : Non. Elle vit. À Pointe-Noire. Elle a un fils. Il a vingt-huit ans aujourd'hui.",
          "Un long silence. Le fleuve coule. Une pirogue passe.",
          "NADIA (voix très basse) : Ji-Ho. Regarde-moi.",
          "CASE : Ji-Ho se tourne vers elle. Dans ses yeux — la confirmation de ce qu'elle commence à comprendre.",
          "NADIA : Ce fils. C'est moi, c'est ça ? Je suis la fille de Joséphine.",
          "CASE : Silence. Le fleuve. Le soleil. Et la vérité qui remonte enfin à la surface.",
          "JI-HO (voix douce) : Célestine ne pouvait pas avoir d'enfants. Ton père a... arrangé les choses. Joséphine n'avait pas le choix.",
          "Nadia se lève. Elle marche jusqu'au bord de l'eau. Elle met les pieds dans le fleuve — froid, puissant, ancien. Comme si le Congo pouvait laver quelque chose.",
          "NADIA : Et Célestine ? Elle savait ?",
          "JI-HO : Elle savait. Et elle t'a aimée quand même. De toutes ses forces.",
          "CASE : Gros plan sur les yeux de Nadia. Des larmes. Enfin des larmes.",
          "Certaines blessures ne guérissent pas. Elles deviennent des cicatrices. Et les cicatrices, elles, ont quelque chose à dire."
        ]
      },
      {
        number: 7,
        title: '[ ÉPILOGUE — 6 MOIS PLUS TARD ] Après la pluie',
        content: [
          "New York. Le bureau de Jason Cole au New York Tribune.",
          "CASE : Jason devant son ordinateur. La une du journal à l'écran : 'MBEMBA INDUSTRIES : L'EMPIRE DU MENSONGE'. Son article. Publié. Édouard Mbemba est en garde à vue à Brazzaville.",
          "CASE : La porte s'ouvre. Nadia entre. Elle a changé — quelque chose dans sa posture, dans son regard. Elle est différente. Plus vraie.",
          "JASON : Nadia...",
          "NADIA : Je ne viens pas pour te pardonner. Pas encore. Je viens pour te remercier.",
          "JASON : Me remercier ?",
          "NADIA : Tu m'as donné la vérité. Même quand je ne la voulais pas. C'est... c'est la chose la plus courageuse que quelqu'un ait fait pour moi.",
          "CASE : Un silence. Entre eux, quelque chose change de température.",
          "JASON : Comment va ta mère ? Célestine ?",
          "NADIA : Elle témoigne contre mon père. Ça lui a pris tout son courage. Mais elle le fait.",
          "JASON : Et Joséphine ?",
          "CASE : Le visage de Nadia s'adoucit.",
          "NADIA : Je l'ai rencontrée la semaine dernière. À Pointe-Noire. C'est... c'est compliqué. C'est douloureux. Mais elle est bien. Elle a attendu ce moment pendant trente ans.",
          "CASE : Nadia s'assoit en face de Jason. Ils se regardent vraiment pour la première fois.",
          "JASON : Et Ji-Ho ?",
          "NADIA (petit sourire) : Il est retourné à Séoul. Il construit un immeuble. Il dit que l'architecture c'est comme la vie — il faut d'abord des fondations solides. Et il apprend toujours à danser.",
          "JASON : Et toi ? Qu'est-ce que tu construis ?",
          "CASE : Nadia regarde par la fenêtre. New York. La ville qui continue, qui ne s'arrête jamais.",
          "NADIA : Ma vie. La mienne. Pas celle qu'on m'a donnée. Pas celle que j'aurais dû avoir. La mienne.",
          "CASE : Jason tend la main par-dessus le bureau. Nadia la regarde. Puis elle la prend.",
          "Il n'y avait pas de happy end parfait. Il y avait juste deux personnes qui décidaient, ensemble, de recommencer.",
          "CASE : Dernière case — vue aérienne de Brazzaville et du fleuve Congo au coucher du soleil. Le fleuve brille comme de l'or. Une pirogue traverse. La vie continue.",
          "FIN",
          "« Les cicatrices sont là où la lumière entre. » — Leonard Cohen (adapté)"
        ]
      }
    ]
  },

  // 3. LES ENFANTS DE L'OMBRE
  {
    id: 'les-enfants-de-lombre',
    title: "Les Enfants de l'Ombre",
    subtitle: 'Roman d’horreur surnaturelle — Tome I & Tome II',
    genre: 'Roman d’horreur surnaturelle',
    badge: 'horreur',
    badgeLabel: 'Horreur',
    coverImage: '/images/les-enfants-de-lombre.jpg',
    description:
      "À Valombre, une vieille cloche sonne à minuit et les enfants disparaissent. Noé, Maya, Samuel et Inès pénètrent la mystérieuse porte rouge. Dix-sept ans plus tard, le message retentit : « La cloche sonnera encore. »",
    priceFcfa: 8500,
    priceEur: 13.0,
    isbnCode: '978-2-958432-09-0',
    rating: 5.0,
    tags: ['Horreur Surnaturelle', 'Valombre', 'Porte Rouge', 'La Cloche de Minuit', 'Dylogie Complète'],
    chapters: [
      {
        number: 1,
        title: "Avertissement & Structure de l'Œuvre",
        content: [
          "AVERTISSEMENT :",
          "Roman d’horreur surnaturelle entièrement original, inspiré des codes du genre mais ne reproduisant pas les personnages ni l’intrigue des films Ça.",
          "STRUCTURE EN DEUX TOMES :",
          "• TOME I — LA VILLE QUI OUBLIAIT LES ENFANTS (Chapitres 1 à 10)",
          "• TOME II — LE RETOUR DES TÉNÈBRES (Chapitres 1 à 10 & Épilogue)",
          "LES QUATRE ENFANTS DE VALOMBRE :",
          "• Noé — Le porteur de la lampe et du carnet secret, qui note chaque indice.",
          "• Maya — L'esprit d'observation et de sang-froid.",
          "• Samuel — Le protecteur du groupe.",
          "• Inès — L'intuition capable d'entendre les souffles glacés."
        ]
      },
      {
        number: 2,
        title: 'Tome I • Chapitre 1 — La cloche de minuit',
        content: [
          "La nuit enveloppait Valombre lorsque Noé, Maya, Samuel et Inès arrivèrent devant le lieu interdit. Depuis plusieurs semaines, des enfants disparaissaient sans laisser de traces. Une vieille cloche sonnait toujours à minuit. Ce soir-là, elle retentit derrière les murs de l’ancienne école.",
          "Ils avancèrent malgré la peur. Dans le couloir, une porte rouge apparut là où il n’y avait auparavant qu’un mur. Derrière elle, un souffle glacé prononça leurs prénoms. Noé serra la lampe.",
          "Ils comprirent que quelque chose les observait et que la ville cachait un secret beaucoup plus ancien qu’eux. Ils décidèrent de rester ensemble. Plus ils cherchaient la vérité, plus l’ombre semblait apprendre leurs peurs.",
          "Une silhouette apparut au bout du couloir, puis disparut lorsque la lumière revint. Personne ne parla. Ils savaient désormais qu’ils étaient entrés dans une histoire dont ils ne connaissaient pas encore la fin."
        ]
      },
      {
        number: 3,
        title: 'Tome I • Chapitre 2 — Le tunnel sous l’école',
        content: [
          "La porte rouge s'ouvrait sur un gouffre sombre. Un escalier de pierre humide s'enfonçait sous l'école.",
          "Noé éclaira les marches glissantes : « Samuel, passe devant. Inès, reste collée à Maya. »",
          "À chaque pas, l'air devenait plus dense. Les parois de calcaire étaient griffées de symboles étranges : une cloche fendue, des yeux sans paupières et une date : 1904.",
          "Au bout du boyau, une flaque d'eau noire reflétait quelque chose qui n'était pas au plafond. Ils entendirent un murmure : « Vous êtes descendus... enfin. »"
        ]
      },
      {
        number: 4,
        title: 'Tome I • Chapitre 3 — La maison aux fenêtres noires',
        content: [
          "Le tunnel les mena directement sous les fondations d'une bâtisse abandonnée en lisière de forêt : la maison dont les fenêtres avaient été peintes de noir.",
          "Dans chaque pièce, des montres et pendules s'étaient arrêtées à minuit pile.",
          "Une odeur de cire froide et de fleurs fanées flottait dans l'air. Sur une table poussiéreuse, quatre chaises étaient disposées. Devant chaque chaise, un objet leur appartenant déjà, alors qu'ils ne les avaient jamais perdus.",
          "L'ombre les connaissait depuis bien plus longtemps qu'ils ne le croyaient."
        ]
      },
      {
        number: 5,
        title: 'Tome I • Chapitre 4 — Le carnet de Noé',
        content: [
          "Noé ouvrit son carnet pour consigner l'agencement des souterrains. Mais les pages blanches se remplissaient toutes seules sous ses yeux.",
          "Des mots tracés à l'encre rouge sombre : « Samuel a peur de l'eau. Maya a peur de l'abandon. Inès a peur du noir. Et toi, Noé, tu as peur qu'ils découvrent que tu les as menés ici. »",
          "Noé referma violemment le carnet. La créature ne se nourrissait pas de chair : elle se nourrissait de leurs peurs intimes."
        ]
      },
      {
        number: 6,
        title: 'Tome I • Chapitre 5 — La fête des ombres',
        content: [
          "C'était le soir du solstice d'hiver à Valombre. Les adultes célébraient la fête de la ville, indifférents et comme hypnotisés par les lanternes jaunes.",
          "Pendant ce temps, les quatre enfants voyaient les ombres des habitants se détacher des corps pour glisser vers le réseau d'égouts.",
          "La ville entière vivait dans un pacte tacite : oublier les disparus pour avoir la paix. Les enfants étaient les seuls éveillés dans une cité d'amnésiques complices."
        ]
      },
      {
        number: 7,
        title: 'Tome I • Chapitre 6 — La porte rouge',
        content: [
          "Devant la porte rouge des profondeurs, les enfants découvrirent les affaires des camarades disparus : des sacs d'école, des billes, une écharpe rouge.",
          "La silhouette apparut, immense et mouvante, prenant la voix de leurs parents.",
          "« Venez... ici personne ne vieillit, ici personne ne vous oublie. »",
          "Maya cria : « C'est un mensonge ! Regardez ses mains ! » La silhouette n'avait pas de mains, seulement des filaments d'obscurité."
        ]
      },
      {
        number: 8,
        title: 'Tome I • Chapitres 7 à 10 — Le pacte & La dernière nuit',
        content: [
          "Face à la terreur, les quatre enfants joignirent leurs mains. Ils conclurent un pacte solennel :",
          "« Si cette créature revient un jour, si la cloche sonne à nouveau dans dix ans ou dans vingt ans, nous reviendrons ensemble. Nous n'oublierons jamais. »",
          "Dans une dernière confrontation sous la voûte de pierre, ils dirigèrent leurs lampes et leur volonté unie contre le cœur de l'obscurité. La créature poussa un hurlement qui fit vibrer les vitres de toute la ville et s'effondra dans les failles de la terre.",
          "À l'aube, Valombre semblait paisible. Les adultes vaquaient à leurs occupations, ayant déjà effacé le cauchemar de leur mémoire.",
          "Mais les quatre enfants savaient. Et ils se jurèrent de ne jamais briser leur serment."
        ]
      },
      {
        number: 9,
        title: 'Tome II • Chapitre 1 — Dix-sept ans plus tard',
        content: [
          "Dix-sept ans après leur première confrontation, les anciens amis reçurent le même message : « La cloche sonnera encore. »",
          "Ils retournèrent à Valombre. Les rues semblaient identiques, mais les habitants évitaient leur regard. Les anciennes disparitions recommencèrent.",
          "Une carte retrouvée dans les archives de la ville révéla un réseau de tunnels sous les maisons. Au centre se trouvait une chambre sans porte.",
          "Ils découvrirent alors que la créature se nourrissait moins des personnes que de leurs peurs. Pour la vaincre, ils devraient affronter chacun le souvenir qu’ils avaient passé leur vie à fuir.",
          "La nuit suivante, la ville entière plongea dans l’obscurité. Les quatre amis descendirent sous terre. La cloche sonna. L’ombre les attendait.",
          "Cette fois, ils ne fuiraient pas."
        ]
      },
      {
        number: 10,
        title: 'Tome II • Chapitres 2 à 6 — Les souvenirs, le train & La ville morte',
        content: [
          "Devenus adultes, Noé était journaliste hanté par des insomnies, Maya médecin aux urgences, Samuel architecte et Inès photographe.",
          "Leurs peurs d'enfants avaient grandi avec eux : la peur du vide, de la culpabilité, de la perte.",
          "Dans un train abandonné sous les galeries et dans la Chambre 13, l'ombre prit le visage de tout ce qu'ils avaient manqué dans leur vie.",
          "« Regardez-vous », susurrait la voix. « Vous avez fui Valombre, mais Valombre n'a jamais quitté votre sang. »"
        ]
      },
      {
        number: 11,
        title: 'Tome II • Chapitres 7 à 10 & Épilogue — Le cœur de la créature',
        content: [
          "Au centre du réseau sous terre, dans la chambre sans porte, ils découvrirent le foyer de l'entité.",
          "Pour la vaincre définitivement, il ne fallait pas attaquer avec la haine, mais avec l'acceptation lucide de leurs blessures passées.",
          "Chacun d'eux déposa au sol le souvenir qu'il fuyait depuis dix-sept ans. Privée de la terreur qui l'alimentait, l'ombre se dissipa dans un dernier soupir de brume.",
          "ÉPILOGUE :",
          "À l’aube, Valombre retrouva enfin le silence.",
          "Pourtant, sous les rues, une petite cloche tinta une dernière fois.",
          "Sur une fenêtre apparut une phrase :",
          "« Tant qu’une peur existera, l’ombre cherchera un chemin. »",
          "FIN DU TOME II."
        ]
      }
    ]
  },

  // 4. LE NOUNOURS GARDIEN DES RÊVES
  {
    id: 'le-nounours-gardien-des-reves',
    title: 'Le Nounours Gardien des Rêves',
    subtitle: 'Conte illustré pour enfants',
    genre: 'Conte & Littérature Jeunesse',
    badge: 'jeunesse',
    badgeLabel: 'Jeunesse',
    coverImage: '/images/le-nounours-gardien-des-reves.jpg',
    description:
      "Dans une petite chambre aux murs couleur de ciel, Milo le nounours tout doux et câlin veille sur le sommeil d'Emma. À minuit, il commence sa ronde, chasse les cauchemars avec sa formule magique et prépare un monde féerique rempli de bonbons et d'étoiles.",
    priceFcfa: 4500,
    priceEur: 7.0,
    isbnCode: '978-2-958432-07-6',
    rating: 5.0,
    tags: ['Conte Enfant', 'Milo le Nounours', 'Emma', 'Sommeil & Douceur', 'Monde des Étoiles'],
    chapters: [
      {
        number: 1,
        title: 'Page 1 — Le secret de Milo et la ronde de minuit',
        content: [
          "Dans une petite chambre aux murs couleur de ciel, vivait un adorable nounours appelé Milo.",
          "Milo était doux, tout rond et très câlin. Il avait une petite écharpe bleue autour du cou et deux yeux noirs qui brillaient lorsqu'ils attrapaient la lumière de la lune.",
          "Chaque soir, une petite fille appelée Emma le serrait très fort contre elle avant de dormir.",
          "— « Bonne nuit, Milo », disait-elle. « Reste près de moi. »",
          "— « Toujours », semblait répondre le petit nounours avec son sourire.",
          "Mais Emma ignorait un secret…",
          "Lorsque les enfants s'endormaient, les nounours pouvaient se réveiller. ✨",
          "Une nuit, lorsque l'horloge indiqua minuit, Milo ouvrit doucement les yeux. Il regarda Emma qui dormait paisiblement.",
          "— « Il est temps de commencer ma ronde », murmura-t-il.",
          "Milo descendit du lit et marcha sur la pointe de ses petites pattes.",
          "Il regarda sous le lit. Rien.",
          "Il regarda derrière les rideaux. Rien.",
          "Il ouvrit doucement la porte et observa le couloir. Tout était calme.",
          "Car Milo avait une mission très importante : protéger les rêves d'Emma. 🌙"
        ]
      },
      {
        number: 2,
        title: 'Page 2 — La fumée grise et la formule magique',
        content: [
          "Soudain, une petite fumée grise apparut au bout du couloir.",
          "Milo fronça les sourcils :",
          "— « Oh non… un mauvais rêve ! »",
          "La fumée entra doucement dans la chambre. Elle se transforma en un grand nuage rempli de petites images inquiétantes.",
          "Emma commença à bouger dans son sommeil.",
          "— « Non… », murmura-t-elle.",
          "Milo courut jusqu'à son oreiller. Il posa ses deux petites pattes dessus et prononça la formule magique des nounours :",
          "« Que les mauvais rêves s'en aillent,",
          "que les étoiles brillent,",
          "et que le cœur de l'enfant retrouve la paix. » ✨",
          "Aussitôt, une lumière douce apparut autour de Milo. Le nuage gris recula. Puis il disparut complètement.",
          "Emma sourit dans son sommeil.",
          "Milo soupira de soulagement :",
          "— « Voilà… tout va bien. »",
          "Mais sa mission n'était pas terminée. Il devait maintenant préparer un joli rêve."
        ]
      },
      {
        number: 3,
        title: 'Page 3 — La boîte magique et le jardin enchanté',
        content: [
          "Milo ouvrit sa petite boîte magique, cachée derrière l'oreiller.",
          "À l'intérieur se trouvaient :",
          "⭐ Une poignée de poussière d'étoiles,",
          "🌸 Trois pétales de fleurs de lune,",
          "🦋 Une aile de papillon imaginaire,",
          "🌈 Et un petit morceau d'arc-en-ciel.",
          "Milo mélangea tout cela.",
          "PLOUF !",
          "Une porte brillante apparut devant lui. De l'autre côté se trouvait un magnifique jardin :",
          "🍬 Les arbres étaient remplis de bonbons.",
          "☕ Les rivières étaient faites de chocolat chaud.",
          "🎵 Les fleurs chantaient doucement.",
          "🐰✨ Et de petits lapins dansaient sous les étoiles.",
          "Milo sourit :",
          "— « C'est parfait pour Emma. »",
          "Il souffla doucement sur la poussière magique. Elle entra dans le sommeil d'Emma. Et aussitôt, Emma se retrouva dans le magnifique jardin. Elle courait avec les petits lapins, riait avec les fleurs et regardait les étoiles danser dans le ciel.",
          "Pendant ce temps, Milo retourna s'asseoir près de son oreiller. Il regarda Emma sourire :",
          "— « Dors bien, petite Emma. »",
          "Puis il ferma doucement les yeux."
        ]
      },
      {
        number: 4,
        title: 'Page 4 — Le réveil d’Emma et le veilleur de nuit',
        content: [
          "Lorsque le soleil se leva le lendemain matin, Emma ouvrit les yeux.",
          "Elle attrapa Milo et le serra très fort :",
          "— « J'ai fait un très beau rêve cette nuit ! »",
          "Milo ne répondit pas. Il resta simplement assis sur son lit avec son petit sourire habituel.",
          "Emma ne pouvait pas savoir que pendant toute la nuit… son nounours avait veillé sur elle. 🧸❤️",
          "Et depuis ce jour, chaque fois qu'Emma s'endormait, Milo accomplissait sa mission. Il chassait les cauchemars. Il protégeait les rêves.",
          "Et surtout… il rappelait à tous les enfants qu'ils n'étaient jamais seuls dans la nuit.",
          "Alors, si ce soir tu as ton nounours près de toi, serre-le bien fort.",
          "Ferme les yeux… Respire doucement… Et laisse ton gardien des rêves t'emmener dans un monde rempli d'étoiles. 🌙✨",
          "Bonne nuit… fais de beaux rêves. 💤🧸"
        ]
      }
    ]
  },

  // 5. L'AMOUR AU-DELÀ DU HASARD
  {
    id: 'amour-au-dela-du-hasard',
    title: "L'Amour au-delà du Hasard",
    subtitle: 'Parfois, le destin ne fait pas que des hasards... Il réunit des cœurs.',
    genre: 'Roman poétique & Essai surréaliste',
    badge: 'doc',
    badgeLabel: 'Roman & Essai',
    coverImage: '/images/amour-au-dela-du-hasard.jpg',
    description:
      "Une traversée surréaliste en 50 chapitres reliant Brazzaville, Paris, Séoul et New York. Noé, jeune écrivain congolais, et l'insaisissable Alma se cherchent à travers les coïncidences, le doute, les tasses mystérieuses et la liberté d'aimer.",
    priceFcfa: 8000,
    priceEur: 12.5,
    isbnCode: '978-2-958432-06-9',
    rating: 5.0,
    tags: ['Surréalisme', 'Brazzaville - Paris - Séoul - NY', 'Hasard & Coïncidences', 'Roman d’Amour', '50 Chapitres'],
    chapters: [
      {
        number: 1,
        title: 'Note de l’Auteur & Table des Matières (50 Chapitres)',
        content: [
          "NOTE DE L’AUTEUR :",
          "Ce livre est une œuvre originale inspirée par les grands motifs de l’amour passionnel et du surréalisme : le hasard, le rêve, la rencontre, le désir, la jalousie, la liberté et la puissance de l’imagination. Il ne reproduit ni le texte ni les personnages d’une œuvre existante.",
          "L’histoire suit Noé, jeune écrivain congolais, et Alma, femme insaisissable dont l’apparition bouleverse son rapport au réel. Leur aventure traverse Brazzaville, Paris, Séoul et New York, tandis que des figures d’espionnage, de cinéma et de journalisme entrent dans leur trajectoire. Le récit mélange poésie, humour, romance, drame, mystère et quelques moments de peur.",
          "TABLE DES MATIÈRES COMPLÈTE (50 CHAPITRES) :",
          "01. La femme au parapluie rouge (Brazzaville)",
          "02. Le billet sans adresse (Paris)",
          "03. La chambre des horloges (Séoul)",
          "04. Un café qui n’existait pas (New York)",
          "05. Le rêve de la gare (Brazzaville)",
          "06. La photographie retournée (Paris)",
          "07. Le premier mensonge (Séoul)",
          "08. Le rire dans l’escalier (New York)",
          "09. Les pas derrière la porte (Brazzaville)",
          "10. La nuit sans sommeil (Paris)",
          "11. L’homme au costume sombre (Séoul)",
          "12. Le dossier bleu (New York)",
          "13. Brazzaville sous la pluie (Brazzaville)",
          "14. Le bateau qui partait à minuit (Paris)",
          "15. Le jardin interdit (Séoul)",
          "16. La voix venue de Séoul (New York)",
          "17. Les trois secondes du hasard (Brazzaville)",
          "18. La jalousie est un miroir (Paris)",
          "19. Le théâtre des ombres (Séoul)",
          "20. Le baiser et le silence (New York)",
          "21. L’appartement 17 (Brazzaville)",
          "22. La ville qui rêvait (Paris)",
          "23. La lettre de Paris (Séoul)",
          "24. Le fantôme du couloir (New York)",
          "25. Une valise pleine de souvenirs (Brazzaville)",
          "26. Le faux rendez-vous (Paris)",
          "27. Les règles de James (Séoul)",
          "28. La journaliste et le secret (New York)",
          "29. Mallory sait quelque chose (Brazzaville)",
          "30. La nuit de Manhattan (Paris)",
          "31. Le train vers l’inconnu (Séoul)",
          "32. La promesse (New York)",
          "33. Le visage dans la vitre (Brazzaville)",
          "34. Le bal des menteurs (Paris)",
          "35. Le choix impossible (Séoul)",
          "36. La chambre blanche (New York)",
          "37. Les photographies brûlées (Brazzaville)",
          "38. Le dernier message (Paris)",
          "39. Après la peur (Séoul)",
          "40. L’amour sans cadenas (New York)",
          "41. Le matin où tout changea (Brazzaville)",
          "42. Le retour du hasard (Paris)",
          "43. La deuxième rencontre (Séoul)",
          "44. Ce que les rêves avaient compris (New York)",
          "45. Le prix de la vérité (Brazzaville)",
          "46. Une ville, deux cœurs (Paris)",
          "47. Le dernier mensonge (Séoul)",
          "48. La liberté d’aimer (New York)",
          "49. La porte ouverte (Brazzaville)",
          "50. Épilogue — Le hasard nous reconnaît"
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
          "À Paris, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sans but précis. Il avait pris l’habitude de marcher lorsque les phrases refusaient de venir. Ce soir-là, pourtant, il ne cherchait pas une histoire. Il cherchait seulement un peu de calme. Dans l’air flottait l’odeur du café, et chaque détail semblait retenir son souffle.",
          "Le lendemain, un événement apparemment insignifiant bouleversa la journée. Noé reçut un message sans expéditeur. Il ne contenait qu’une phrase : « Ne va pas à Séoul avant de m’avoir retrouvée. »",
          "Sur la table, les deux tasses étaient de nouveau posées : « Pour celui qui doute », « Pour celle qui revient ».",
          "James réapparaît avec son flegme impénétrable : « Vous aimez Alma. C’est précisément ce qui vous met en danger. »",
          "Mia le rejoint : « Je cherche la même personne que vous. Et je pense que nous avons intérêt à travailler ensemble. »",
          "Dans son carnet, la porte rouge veille. Dehors, l'odeur du café recommença. Dans une autre ville, Alma murmure : « Enfin, il a compris. » Entre Paris et Séoul, deux destins continuent de se rapprocher."
        ]
      },
      {
        number: 4,
        title: 'Chapitre 3 — La chambre des horloges (Séoul)',
        content: [
          "À Séoul, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Noé avançait sans but précis. Dans l’air flottait un parfum de jasmin, et chaque détail semblait retenir son souffle.",
          "Le nouveau message sans expéditeur l'attend : « Ne va pas à New York avant de m’avoir retrouvée. »",
          "De nouveau les deux tasses, de nouveau les pas silencieux de James et l'objectif attentif de Mia.",
          "Dans son carnet, la certitude grandit : l'amour n'est pas une preuve, c'est une porte. Dehors, le parfum de jasmin recommença. Quelque part entre Séoul et New York, deux destins continuaient de se rapprocher."
        ]
      },
      {
        number: 5,
        title: "Chapitre 4 — Un café qui n'existait pas (New York)",
        content: [
          "À New York, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Dans l’air flottait les lumières des voitures, et chaque détail semblait retenir son souffle.",
          "Le message sans expéditeur boucle le cycle : « Ne va pas à Brazzaville avant de m’avoir retrouvée. »",
          "Les quatre métropoles se répondent : Brazzaville, Paris, Séoul, New York. James, Mia et les indices du hasard tissent une toile invisible.",
          "Dans la ville qui ne dort jamais, Alma sourit dans l'obscurité : « Enfin, il a compris. »"
        ]
      },
      {
        number: 6,
        title: 'Chapitre 20 — Le baiser et le silence (New York)',
        content: [
          "Au cœur du voyage, dans le tumulte feutré d'un café new-yorkais, Noé se remémore le baiser de Brazzaville.",
          "Dans l'air flottait l'odeur du café. Le silence entre deux personnes qui s'aiment est plus éloquent que toutes les promesses écrites.",
          "James l'observe au loin, rangeant discrètement un dossier bleu. Mia prend un dernier cliché.",
          "La porte rouge n'était pas un obstacle : c'était l'ouverture vers l'inconnu accepté."
        ]
      },
      {
        number: 7,
        title: 'Chapitre 34 — Le bal des menteurs (Paris)',
        content: [
          "À Paris, le soir avait cette étrange manière de rendre les choses ordinaires presque irréelles. Dans l’air flottait une chanson lointaine.",
          "Noé comprend enfin le sens des règles édictées par James et des faux rendez-vous : le doute est le miroir de la jalousie.",
          "Pour retrouver Alma, il faut renoncer au besoin d'emprisonner son secret.",
          "« L'amour sans cadenas », griffonne-t-il dans son carnet."
        ]
      },
      {
        number: 8,
        title: 'Chapitre 48 — La liberté d’aimer (New York)',
        content: [
          "À New York, dans l'air tiède où flottait un parfum de jasmin, Noé pose son stylo.",
          "La traversée du doute, de la peur, de la jalousie et du rire arrive à son terme.",
          "L'amour n'est pas une preuve. C'est une porte. Et cette porte s'ouvre sur la liberté mutuelle de deux êtres libres.",
          "Dans une chambre voisine, Alma pose la main sur la poignée de la porte rouge."
        ]
      },
      {
        number: 9,
        title: 'Chapitre 50 & Épilogue — Le hasard nous reconnaît',
        content: [
          "Des années plus tard, Noé relirait ses anciens carnets avec un sourire. Il comprendrait que certaines histoires ne sont pas faites pour être expliquées entièrement. Elles sont faites pour être vécues.",
          "Alma lui avait appris que l’amour pouvait être fou sans être une prison, passionnel sans devenir possession, mystérieux sans être mensonge. Leur histoire avait traversé des villes, des nuits, des séparations et des peurs. Elle avait survécu parce que deux personnes avaient finalement choisi la liberté plutôt que la peur.",
          "Dans la dernière page de son carnet, Noé écrivit :",
          "« Je croyais avoir rencontré Alma par hasard. Aujourd’hui, je pense que le hasard est seulement le nom que nous donnons aux choses que nous ne savons pas encore comprendre. »",
          "À celles et ceux qui continuent de croire qu’une rencontre peut changer une vie, qu’un rêve peut devenir une direction et qu’aimer quelqu’un signifie aussi lui laisser la liberté d’être lui-même.",
          "ÉPILOGUE — FIN."
        ]
      }
    ]
  }
];

export const GENRES_LIST = [
  {
    id: 'aventure',
    icon: '⚡',
    name: 'Aventure & Ésotérisme',
    description: "De l'Égypte au Congo, des quêtes initiatiques et des mystères millénaires."
  },
  {
    id: 'bd',
    icon: '🎨',
    name: 'Bande Dessinée Adulte',
    description: 'Récits graphiques multiculturels, drames intimes, humour et vérités cachées.'
  },
  {
    id: 'horreur',
    icon: '💀',
    name: 'Horreur Surnaturelle',
    description: "Les mystères obscurs de Valombre, la porte rouge et la cloche de minuit."
  },
  {
    id: 'jeunesse',
    icon: '🧸',
    name: 'Jeunesse & Conte',
    description: 'Des histoires douces et féeriques pour accompagner le sommeil et les rêves des enfants.'
  },
  {
    id: 'romance',
    icon: '🌹',
    name: 'Romance & Surréalisme',
    description: 'Le hasard, les coïncidences objectives et la traversée passionnelle de deux cœurs.'
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
