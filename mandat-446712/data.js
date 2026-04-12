/* ==========================================================================
   DONNÉES DU BIEN - MANDAT 7890
   ========================================================================== */
const HouseData = {
    // En-tête et Titres
    title: "Propriété de Caractère",
    subtitle: "Abjat Sur Bandiat • Calme & Élégance",
    location: "Abjat Sur Bandiat (24300)",
    type: "Propriété de Caractère",
    
    // --- SECTION PRIX ET MANDAT (MODIFIÉE ICI) ---
    price: 320000,
    feesPercent: 6.00,        // Le pourcentage
    feesSide: "acquéreur",      // "vendeur" ou "acquéreur"
    mandatRef: "7890",
    // ----------------------------------------------

    // Chiffres Clés
    surface: "135",
    rooms: "5",
    bedrooms: "3",
    land: "5 950 m²",

    // Vidéos
    heroVideoUrl: "drone-446712-github.mp4",
    youtubeID:"cjE4hOI7Hsw", 
    

    // Description "L'Art de Vivre"
    description: [
        "Située dans un environnement calme et préservé, cette magnifique propriété de caractère offre une alliance parfaite entre le charme de l'ancien et l'élégance contemporaine.",
        "La pièce de vie principale de 54 m², avec sa cuisine ouverte et sa belle hauteur sous plafond, est le véritable cœur de la maison.",
        "À l'extérieur, le parc de 5 950m² accueille une piscine au sel (8x4m) chauffée, avec une vue dégagée sur la vallée."
    ],

    // Le Verdict de Sylvain
    verdict: "C'est simple : pour trouver ce niveau de calme à 3 minutes de Nontron, il faut se lever tôt. Le rapport emplacement/prix est excellent.",

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
        { icon: "pool", text: "Piscine au sel chauffée" }
    ],

    // Chapitres de la vidéo YouTube
 chapters: [
        { time: 0, title: "Pièce de Vie", subtitle: "Cuisine & Salon" },
        { time: 67, title: "Chambre Parentale", subtitle: "Espace Suite" },
        { time: 110, title: "Chambre d'ami 1", subtitle: "Confort & Calme" },
        { time: 128, title: "Chambre d'ami 2", subtitle: "Second Couchage" },
        { time: 166, title: "Cellier", subtitle: "Rangements & Technique" }
    ],
    
    // Vos coordonnées
    agentCity: "Saint Martial De Valette",
    agentPhone: "06.48.89.34.80",
    agentEmail: "s.matignon@proprietes-privees.com"
};
