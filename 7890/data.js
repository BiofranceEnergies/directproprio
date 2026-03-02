/* ==========================================================================
   DONNÉES DU BIEN - MANDAT 7890
   ========================================================================== */
const HouseData = {
    // En-tête et Titres
    title: "Propriété de Caractère",
    subtitle: "Saint Martial De Valette • Calme & Élégance",
    location: "Saint Martial De Valette (24300)",
    type: "Propriété de Caractère",
    
    // Prix et Mandat
    price: 450000,
    feesPercent: 5.00,
    mandatRef: "437095",

    // Chiffres Clés
    surface: "180",
    rooms: "5",
    bedrooms: "3",
    land: "40 000 m²",

    // Vidéos (Fichier local pour le haut, ID Youtube pour la visite)
    heroVideoUrl: "sabouret-12.mp4",
    youtubeID: "e2gSjrCwafQ", 

    // Description "L'Art de Vivre" (Séparez chaque paragraphe par des guillemets)
    description: [
        "Située dans un environnement calme et préservé, cette magnifique propriété de caractère offre une alliance parfaite entre le charme de l'ancien et l'élégance contemporaine.",
        "La pièce de vie principale de 54 m², avec sa cuisine ouverte et sa belle hauteur sous plafond, est le véritable cœur de la maison. L'espace nuit se compose de 3 chambres spacieuses, dont une suite parentale de plain-pied avec dressing et salle d'eau.",
        "À l'extérieur, le parc de 3 500m² accueille une piscine au sel (10x4m) chauffée, avec une vue dégagée sur la vallée, sans aucun vis-à-vis. Une dépendance de 35 m² (garage simple) complète ce bien d'exception."
    ],

    // Le Verdict de Sylvain
    verdict: "C'est simple : pour trouver ce niveau de calme à 3 minutes de Nontron, il faut se lever tôt. Le rapport emplacement/prix est excellent. N'attendez pas pour visiter, c'est une valeur sûre.",

    // Diagnostics (DPE/GES)
    dpeLetter: "D",
    dpeValue: "180",
    gesLetter: "B",
    gesValue: "8",
    energyCost: "1 200 € et 1 650 €",

    // Liste des caractéristiques
    features: [
        { icon: "rect", text: "5 pièces" },
        { icon: "bed", text: "3 chambres" },
        { icon: "bath", text: "Suite parentale" },
        { icon: "sun", text: "Charme de l'ancien" },
        { icon: "pool", text: "Piscine au sel chauffée" }
    ],

    // Chapitres de la vidéo YouTube (en secondes)
    chapters: [
        { time: 0, title: "L'Arrivée", subtitle: "Extérieurs & Parc" },
        { time: 30, title: "Espace de Vie", subtitle: "Salon & Cuisine" },
        { time: 60, title: "Côté Nuit", subtitle: "Chambres & Salles d'eau" }
    ],
    
    // Vos coordonnées
    agentCity: "Saint Martial De Valette",
    agentPhone: "06.48.89.34.80",
    agentEmail: "s.matignon@proprietes-privees.com"
};
