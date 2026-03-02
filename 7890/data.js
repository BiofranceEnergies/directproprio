/* ==========================================================================
   DONNÉES DU BIEN - MANDAT 7890
   ========================================================================== */
const HouseData = {
    title: "Propriété de Caractère",
    subtitle: "Saint Martial De Valette • Calme & Élégance",
    location: "Saint Martial De Valette (24300)",
    type: "Propriété de Caractère",
    
    price: 450000,
    feesPercent: 3.9,
    mandatRef: "7890",

    surface: "180",
    rooms: "5",
    bedrooms: "3",
    land: "40 000 m²",

    // ID Youtube de votre vidéo de visite (à remplacer par le bon ID plus tard)
    youtubeID: "e2gSjrCwafQ", 
    // Chemin vers la vidéo de fond
    heroVideoUrl: "/assets/video/sabouret-12.mp4",

    dpeLetter: "D",
    dpeValue: "180",
    gesLetter: "B",
    gesValue: "8",
    energyCost: "1 200 € et 1 650 €",

    features: [
        { icon: "rect", text: "5 pièces" },
        { icon: "bed", text: "3 chambres" },
        { icon: "bath", text: "Suite parentale" },
        { icon: "sun", text: "Charme de l'ancien" },
        { icon: "pool", text: "Piscine au sel chauffée" }
    ],

    chapters: [
        { time: 0, title: "L'Arrivée", subtitle: "Extérieurs & Parc" },
        { time: 30, title: "Espace de Vie", subtitle: "Salon & Cuisine" },
        { time: 60, title: "Côté Nuit", subtitle: "Chambres & Salles d'eau" }
    ],
    
    agentCity: "Saint Martial De Valette",
    agentPhone: "06.00.00.00.00" 
};
