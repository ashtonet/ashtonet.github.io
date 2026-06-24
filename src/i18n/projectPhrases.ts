import { projects } from '../data/projects'
import type { Language } from './LanguageContext'

type SupportedLanguage = Exclude<Language, 'en' | 'es'>

const descriptions: Record<SupportedLanguage, Record<string, string>> = {
  de: {
    'Geoguessr AI': 'Version 1 trainiert mit Mapillary-Panoramen eine KI zur Standortbestimmung und erreicht 90 % Genauigkeit. Version 2 nutzt eine angepasste ResNet-50-Architektur, 61.000 Bilder und eine Haversine-Distanzverlustfunktion, um Orte in den USA trotz Jahreszeiten- und Lichtwechseln zu erkennen.',
    'Search Engine': 'Mein Team und ich entwickelten eine skalierbare Suchmaschine nach dem Vorbild von Google. Sie kombiniert TF-IDF, PageRank, einen mit MapReduce erzeugten segmentierten invertierten Index, eine REST-API und eine eigene Suchoberfläche.',
    'Instagram Clone': 'Wir erstellten drei Versionen eines Instagram-Klons: statisch, dynamisch serverseitig gerendert und als clientseitige React-Anwendung. Die letzte Version ergänzt REST-APIs, Endlos-Scrollen und Doppeltippen zum Liken ohne vollständiges Neuladen.',
    'Computer Lab VR': 'Eine interaktive VR-Nachbildung eines Raums im Bob and Betty Beyster Building der University of Michigan. Besucher können mit NPCs sprechen und einen Rennwagen auf einer Strecke fahren.',
    'Assembly Linker': 'Ein Linker, der zwei bis sechs Assembly-Objektdateien zu einer ausführbaren Datei verbindet, Segmente und symbolische Adressen verlagert, globale Bezeichner auflöst und ungültige Definitionen erkennt.',
    'Assembly Simulator': 'Ein Verhaltenssimulator für Assembly-Maschinencode. Er initialisiert Register und Programmzähler, verarbeitet Opcodes und Operanden und behandelt 16-Bit-Zweierkomplement-Offsets korrekt.',
    'Machine Code Generator': 'Ein Assembler, der Assembly einschließlich externer Referenzen in Maschinencode übersetzt. Er erzeugt Text-, Daten-, Symbol- und Relokationsabschnitte und prüft Bezeichner, Opcodes, Register und Offsets.',
    'Pipeline Simulator': 'Ein zyklusgenauer Simulator eines Pipeline-Prozessors mit Datenweiterleitung und Sprungvorhersage. Daten- und Kontrollkonflikte werden durch Weiterleitung, gezielte Pausen und die Vorhersage „nicht genommen“ behandelt.',
    'Cache Simulator': 'Ein konfigurierbarer CPU-Cache innerhalb eines Assembly-Simulators mit Write-back, Write-allocate und Layouts von direkt abgebildet bis vollassoziativ.',
    'Bank Simulator': 'Ein Simulator für Online-Banking, der Konten, Sitzungen, geplante Transaktionen, Betrugserkennung, Gebühren und Treuerabatte verwaltet und mehrere Finanzabfragen unterstützt.',
    'MST & TSP Calculator': 'Ein Graphenwerkzeug zum Erstellen minimaler Spannbäume sowie zum schnellen Annähern und optimalen Lösen des Problems des Handlungsreisenden.',
    'Zombie Defense Game': 'Ein prioritätswarteschlangenbasiertes Überlebensspiel, das Zombies nach Entfernung, Geschwindigkeit und Gesundheit auswählt und Protokolle, Statistiken sowie detaillierte Ergebnisberichte bietet.',
    '3-D Puzzle Solver': 'Ein Kommandozeilenlöser für mehrschichtige 3-D-Labyrinthe mit Breiten- oder Tiefensuche, Zustandsverfolgung und Ausgabe als Pfadliste oder kommentierte Karte.',
    'Image Resizing': 'Ein inhaltsbewusster PNG-Verkleinerer auf Basis von Seam Carving, der Pixelwichtigkeit berechnet und energiearme Nähte entfernt, um wichtige Bildbereiche zu bewahren.',
    'Euchre Simulation': 'Eine objektorientierte Simulation des klassischen Michigan-Kartenspiels mit menschlichen und automatisierten Spielern, Vererbung, Polymorphie und strategischen Algorithmen.',
    'Piazza Post Sorter': 'Ein trainierter Textklassifikator, der Diskussionsbeiträge mithilfe rekursiver Verfahren und binärer Suchbäume thematisch sortiert und aus markierten Beispielen lernt.',
    'Calculating Rocket Payloads': 'Ein numerisches Werkzeug, das mit Finite-Differenzen, physikalischer Simulation und binärer Suche Treibstoffmengen und erreichbare Raketenhöhen optimiert.',
    'Office Hours API': 'Das Backend einer Online-Sprechstundenwarteschlange. Verkettete Listen verwalten Studierende, während GET-, POST- und DELETE-Endpunkte Warteschlange und Oberfläche synchron halten.',
    'K-means Machine Learning': 'Eine Clusteranalyse von Fahrzeugdaten wie Verbrauch, Zylinderzahl und Hubraum, die Modelle mithilfe einer K-Means-Implementierung in drei Gruppen einteilt.',
    'Quantum Fault Tolerance Library': 'Eine fehlertolerante Quantenbibliothek auf Basis des Steane-Codes, die Ein-Qubit-Fehler korrigiert, robuste Quantengatter erzeugt und Messungen in logische Zustände dekodiert.',
    'Study Group Coordinator': 'Ein Quantenplaner für Lerngruppen, der Grovers Algorithmus und Quantum Counting nutzt, um logische Gruppierungsbedingungen zu erfüllen und mögliche Lösungen zu zählen.',
    'Tumor Detection': 'Ein MATLAB-Modell, das Hirntumore lokalisiert und eine geeignete Strahlungsintensität berechnet, wobei Zielabdeckung und Schutz des umliegenden Gewebes abgewogen werden.',
    'Maze Solver': 'Ein Algorithmus, der ohne Vorwissen oder Sicht nach vorn einen Labyrinthausgang findet, besuchte Positionen speichert und nur an Sackgassen zurückgeht.',
    'Computing Alaskan Precipitation': 'Ein Julia-Datenanalyseprojekt, das Umweltdaten verarbeitet und eine geografische Karte des durchschnittlichen Niederschlags in Alaska erstellt.',
    'Segway Optimization': 'Ein Regelungstechnikprojekt, das Segway-Geschwindigkeit und Rückkopplung mit Matrixmethoden steuert und einen modellprädiktiven Balance-Regler implementiert.',
    'Personal Website': 'Ein Portfolio in drei Generationen: von ersten Frontend-Experimenten über ein umfangreiches Projektarchiv bis zur modernen Website. Jede Version zeigt eine neue Entwicklungsstufe in Design, Storytelling und Webtechnik.',
  },
  fr: {
    'Geoguessr AI': 'La version 1 entraîne une IA sur des panoramas Mapillary pour deviner des lieux avec 90 % de précision. La version 2 utilise un ResNet-50 modifié, 61 000 images et une fonction de perte fondée sur la distance de Haversine pour reconnaître des lieux aux États-Unis malgré les variations de saison et de lumière.',
    'Search Engine': 'Mon équipe et moi avons développé un moteur de recherche évolutif inspiré de Google, combinant TF-IDF, PageRank, un index inversé segmenté produit avec MapReduce, une API REST et une interface de recherche.',
    'Instagram Clone': 'Nous avons créé trois versions d’un clone d’Instagram : statique, dynamique avec rendu serveur, puis application React côté client. La dernière ajoute des API REST, le défilement infini et le double toucher pour aimer sans rechargement complet.',
    'Computer Lab VR': 'Une reconstitution interactive en réalité virtuelle d’une salle du Bob and Betty Beyster Building de l’Université du Michigan. Les visiteurs peuvent parler à des PNJ et conduire une voiture de course.',
    'Assembly Linker': 'Un éditeur de liens qui combine deux à six fichiers objets assembleur, relocalise les segments et adresses symboliques, résout les symboles globaux et détecte les définitions invalides.',
    'Assembly Simulator': 'Un simulateur comportemental de code machine assembleur qui initialise les registres, interprète les instructions et gère correctement les décalages 16 bits en complément à deux.',
    'Machine Code Generator': 'Un assembleur qui traduit le code assembleur et ses références externes en code machine, produit les sections nécessaires et valide symboles, opcodes, registres et décalages.',
    'Pipeline Simulator': 'Un simulateur cycle par cycle d’un processeur pipeline avec transfert de données et prédiction de branchement, qui traite les aléas par transfert, pauses ciblées et prédiction « non pris ».',
    'Cache Simulator': 'Un cache processeur configurable intégré à un simulateur assembleur, avec écriture différée, allocation à l’écriture et organisations allant du direct au totalement associatif.',
    'Bank Simulator': 'Un simulateur bancaire en ligne qui gère comptes, sessions, transactions planifiées, détection de fraude, frais et remises de fidélité, avec plusieurs requêtes financières.',
    'MST & TSP Calculator': 'Un outil de graphes qui construit un arbre couvrant minimal et calcule des solutions approximatives ou optimales au problème du voyageur de commerce.',
    'Zombie Defense Game': 'Un jeu de survie fondé sur une file de priorité qui cible les zombies selon leur distance, vitesse et santé, avec journaux, statistiques et rapports détaillés.',
    '3-D Puzzle Solver': 'Un solveur en ligne de commande pour labyrinthes 3-D en couches, utilisant une recherche en largeur ou en profondeur et produisant une liste de chemin ou une carte annotée.',
    'Image Resizing': 'Un redimensionneur PNG sensible au contenu utilisant le seam carving pour calculer l’importance des pixels et retirer les coutures de faible énergie tout en préservant les zones importantes.',
    'Euchre Simulation': 'Une simulation orientée objet du jeu de cartes classique du Michigan, mêlant joueurs humains et automatiques, héritage, polymorphisme et algorithmes de stratégie.',
    'Piazza Post Sorter': 'Un classificateur de texte entraîné qui trie des messages de discussion par thème à l’aide de méthodes récursives et d’arbres binaires de recherche.',
    'Calculating Rocket Payloads': 'Un outil numérique qui combine différences finies, simulation physique et recherche binaire pour optimiser le carburant et l’altitude atteignable d’une fusée.',
    'Office Hours API': 'Le backend d’une file d’attente en ligne pour les permanences. Des listes chaînées gèrent les étudiants et des opérations GET, POST et DELETE synchronisent la file et l’interface.',
    'K-means Machine Learning': 'Une analyse par regroupement de données automobiles — consommation, cylindres et cylindrée — qui classe les modèles en trois groupes avec K-means.',
    'Quantum Fault Tolerance Library': 'Une bibliothèque quantique tolérante aux fautes fondée sur le code de Steane, qui corrige les erreurs sur un qubit, construit des portes robustes et décode les mesures en états logiques.',
    'Study Group Coordinator': 'Un planificateur quantique de groupes d’étude utilisant l’algorithme de Grover et le comptage quantique pour satisfaire des contraintes logiques et estimer le nombre de regroupements possibles.',
    'Tumor Detection': 'Un modèle MATLAB qui localise les tumeurs cérébrales et calcule une intensité de rayonnement adaptée en équilibrant couverture de la cible et protection des tissus voisins.',
    'Maze Solver': 'Un algorithme qui trouve la sortie d’un labyrinthe sans connaissance préalable ni visibilité, mémorise les positions visitées et ne revient en arrière qu’aux impasses.',
    'Computing Alaskan Precipitation': 'Un projet d’analyse en Julia qui traite des bases environnementales pour produire une carte géographique des précipitations moyennes en Alaska.',
    'Segway Optimization': 'Un projet de commande utilisant des méthodes matricielles pour réguler la vitesse et la rétroaction d’un Segway, avec un contrôleur prédictif capable de retrouver l’équilibre.',
    'Personal Website': 'Un portfolio développé en trois générations : des premières expériences frontend à une vaste archive de projets, puis au site moderne actuel. Chaque version marque une étape dans mon approche du design, du récit et de l’ingénierie web.',
  },
  pl: {
    'Geoguessr AI': 'Wersja 1 uczy sztuczną inteligencję na panoramach Mapillary, osiągając 90% trafności lokalizacji. Wersja 2 wykorzystuje zmodyfikowany ResNet-50, 61 000 obrazów i funkcję straty opartą na odległości Haversine’a, aby rozpoznawać miejsca w USA mimo zmian pór roku i oświetlenia.',
    'Search Engine': 'Wraz z zespołem stworzyłem skalowalną wyszukiwarkę podobną do Google, łączącą TF-IDF, PageRank, segmentowy indeks odwrócony zbudowany w MapReduce, REST API i własny interfejs.',
    'Instagram Clone': 'Stworzyliśmy trzy wersje klona Instagrama: statyczną, dynamiczną renderowaną na serwerze oraz aplikację React po stronie klienta. Ostatnia dodaje REST API, przewijanie bez końca i polubienie podwójnym stuknięciem bez pełnego przeładowania.',
    'Computer Lab VR': 'Interaktywna rekonstrukcja VR sali w budynku Bob and Betty Beyster Building na University of Michigan. Odwiedzający mogą rozmawiać z postaciami niezależnymi i prowadzić samochód wyścigowy.',
    'Assembly Linker': 'Konsolidator łączący od dwóch do sześciu plików obiektowych asemblera, przenoszący segmenty i adresy symboliczne, rozwiązujący symbole globalne i wykrywający nieprawidłowe definicje.',
    'Assembly Simulator': 'Symulator behawioralny kodu maszynowego asemblera, który inicjuje rejestry, interpretuje instrukcje i poprawnie obsługuje 16-bitowe przesunięcia w kodzie uzupełnień do dwóch.',
    'Machine Code Generator': 'Asembler tłumaczący kod wraz z odwołaniami zewnętrznymi na kod maszynowy, tworzący wymagane sekcje i sprawdzający symbole, kody operacji, rejestry oraz przesunięcia.',
    'Pipeline Simulator': 'Dokładny cyklowo symulator procesora potokowego z przekazywaniem danych i przewidywaniem skoków, rozwiązujący hazardy przez forwarding, celowane zatrzymania i predykcję „skok nie nastąpi”.',
    'Cache Simulator': 'Konfigurowalna pamięć podręczna CPU zintegrowana z symulatorem asemblera, obsługująca write-back, write-allocate oraz układy od mapowania bezpośredniego po w pełni asocjacyjne.',
    'Bank Simulator': 'Symulator bankowości internetowej zarządzający kontami, sesjami, zaplanowanymi transakcjami, wykrywaniem oszustw, opłatami i rabatami lojalnościowymi oraz obsługujący zapytania finansowe.',
    'MST & TSP Calculator': 'Narzędzie grafowe budujące minimalne drzewo rozpinające oraz wyznaczające szybkie przybliżone i optymalne rozwiązania problemu komiwojażera.',
    'Zombie Defense Game': 'Gra survivalowa oparta na kolejce priorytetowej, wybierająca zombie według odległości, szybkości i zdrowia oraz oferująca dzienniki, statystyki i szczegółowe raporty wyniku.',
    '3-D Puzzle Solver': 'Konsolowy solver warstwowych labiryntów 3-D wykorzystujący przeszukiwanie wszerz lub w głąb, śledzenie stanu i wynik w formie ścieżki albo opisanej mapy.',
    'Image Resizing': 'Narzędzie do inteligentnego zmniejszania PNG metodą seam carving, które oblicza ważność pikseli i usuwa szwy o niskiej energii, zachowując istotne fragmenty obrazu.',
    'Euchre Simulation': 'Obiektowa symulacja klasycznej gry karcianej z Michigan z graczami ludzkimi i komputerowymi, wykorzystująca dziedziczenie, polimorfizm i algorytmy strategii.',
    'Piazza Post Sorter': 'Wytrenowany klasyfikator tekstu sortujący posty dyskusyjne według tematów za pomocą metod rekurencyjnych i binarnych drzew wyszukiwania.',
    'Calculating Rocket Payloads': 'Narzędzie numeryczne łączące metody różnic skończonych, symulację fizyczną i wyszukiwanie binarne w celu optymalizacji paliwa i osiągalnej wysokości rakiety.',
    'Office Hours API': 'Backend internetowej kolejki na konsultacje. Listy połączone zarządzają studentami, a operacje GET, POST i DELETE synchronizują kolejkę z interfejsem.',
    'K-means Machine Learning': 'Analiza skupień danych pojazdów, takich jak spalanie, liczba cylindrów i pojemność, grupująca modele w trzy klasy za pomocą algorytmu K-means.',
    'Quantum Fault Tolerance Library': 'Odporna na błędy biblioteka kwantowa oparta na kodzie Steane’a, korygująca błędy pojedynczego kubitu, budująca niezawodne bramki i dekodująca pomiary do stanów logicznych.',
    'Study Group Coordinator': 'Kwantowy planer grup naukowych wykorzystujący algorytm Grovera i zliczanie kwantowe do spełniania ograniczeń logicznych oraz szacowania liczby możliwych podziałów.',
    'Tumor Detection': 'Model MATLAB lokalizujący guzy mózgu i obliczający odpowiednią intensywność promieniowania przy zachowaniu równowagi między pokryciem celu a ochroną otaczających tkanek.',
    'Maze Solver': 'Algorytm znajdujący wyjście z labiryntu bez wcześniejszej wiedzy ani widoczności, zapamiętujący odwiedzone pozycje i cofający się wyłącznie ze ślepych zaułków.',
    'Computing Alaskan Precipitation': 'Projekt analizy danych w Julii, który przetwarza bazy środowiskowe i tworzy mapę średnich opadów na Alasce.',
    'Segway Optimization': 'Projekt automatyki wykorzystujący metody macierzowe do regulacji prędkości i sprzężenia zwrotnego Segwaya oraz predykcyjny regulator odzyskujący równowagę.',
    'Personal Website': 'Portfolio rozwijane w trzech generacjach: od pierwszych eksperymentów frontendowych, przez rozbudowane archiwum projektów, po nowoczesną stronę. Każda wersja pokazuje kolejny etap mojego podejścia do projektowania, narracji i inżynierii internetowej.',
  },
}

export const projectPhrases = Object.fromEntries(
  (Object.keys(descriptions) as SupportedLanguage[]).map((language) => [
    language,
    Object.fromEntries(projects.map((project) => [project.description, descriptions[language][project.title]])),
  ]),
) as Record<SupportedLanguage, Record<string, string>>

const personalWebsite = projects.find((project) => project.title === 'Personal Website')!
const versionCopy: Record<SupportedLanguage, { titles: string[], descriptions: string[], links: string[] }> = {
  de: {
    titles: ['Das Fundament', 'Das Projektarchiv', 'Das aktuelle Portfolio'],
    descriptions: [
      'Das ursprüngliche Portfolio entstand, um Inhalte aus den University-of-Michigan-Kursen SI 339 und EECS 201 praktisch anzuwenden. Mit HTML, CSS und JavaScript lernte ich responsive Layouts, Barrierefreiheit und die Präsentation technischer Arbeit im Web.',
      'Die zweite Generation wurde zu einem umfangreichen Archiv aus Kursarbeiten, Experimenten und Technikprojekten. Detaillierte Einzelseiten bewahrten die Entwicklung meiner Arbeit und lieferten später die Inhalte für das nächste Portfolio.',
      'Die neueste Generation gestaltet das Portfolio als zusammenhängende, schnelle und barrierefreie Erfahrung. Sie vereint das Projektarchiv in einem Designsystem und nutzt React und TypeScript als moderne, gut erweiterbare Grundlage.',
    ],
    links: ['Archivierte Website besuchen', 'Aktuelle Website entdecken'],
  },
  fr: {
    titles: ['Les fondations', 'Les archives de projets', 'Le portfolio actuel'],
    descriptions: [
      'Le portfolio original est né pour mettre en pratique les cours SI 339 et EECS 201 de l’Université du Michigan. Réalisé en HTML, CSS et JavaScript, il m’a permis d’apprendre les mises en page adaptatives, l’accessibilité et la présentation de travaux techniques en ligne.',
      'La deuxième génération est devenue une archive approfondie de cours, d’expériences et de projets d’ingénierie. Ses pages détaillées ont conservé l’évolution de mon travail et fourni le contenu du portfolio suivant.',
      'La dernière génération repense le portfolio comme une expérience cohérente, rapide et accessible. Elle réunit les projets dans un même système visuel et repose sur React et TypeScript pour faciliter sa maintenance et son évolution.',
    ],
    links: ['Visiter le site archivé', 'Explorer le site actuel'],
  },
  pl: {
    titles: ['Podstawa', 'Archiwum projektów', 'Obecne portfolio'],
    descriptions: [
      'Pierwsze portfolio powstało jako miejsce do praktycznego wykorzystania wiedzy z kursów SI 339 i EECS 201 na University of Michigan. HTML, CSS i JavaScript pomogły mi nauczyć się responsywnych układów, dostępności i prezentowania pracy technicznej w sieci.',
      'Druga generacja rozrosła się w obszerne archiwum zajęć, eksperymentów i projektów inżynierskich. Szczegółowe strony zachowały rozwój mojej pracy i stały się źródłem treści dla kolejnego portfolio.',
      'Najnowsza generacja tworzy spójne, szybkie i dostępne doświadczenie zamiast zbioru osobnych stron. Łączy archiwum we wspólnym systemie projektowym i opiera się na React oraz TypeScript, dzięki czemu łatwiej ją rozwijać.',
    ],
    links: ['Odwiedź zarchiwizowaną stronę', 'Poznaj obecną stronę'],
  },
}

for (const language of Object.keys(versionCopy) as SupportedLanguage[]) {
  personalWebsite.versions?.forEach((version, index) => {
    projectPhrases[language][version.title] = versionCopy[language].titles[index]
    projectPhrases[language][version.description] = versionCopy[language].descriptions[index]
    if (version.linkLabel) projectPhrases[language][version.linkLabel] = versionCopy[language].links[index - 1]
  })
}
