/* ==========================================================================
   DONNÉES DU BIEN - MANDAT 7890
   ========================================================================== */
const HouseData = {
    // En-tête et Titres
    title: "Propriété de Caractère",
    subtitle: "Saint Martial De Valette • Calme & Élégance",
    location: "Saint Martial De Valette (24300)",
    type: "Propriété de Caractère",
    
    // --- SECTION PRIX ET MANDAT (MODIFIÉE ICI) ---
    price: 153400,
    feesPercent: 6.00,        // Le pourcentage
    feesSide: "acquéreur",      // "vendeur" ou "acquéreur"
    mandatRef: "446712",
    // ----------------------------------------------

    // Chiffres Clés
    surface: "133",
    rooms: "6",
    bedrooms: "4",
    land: "1 156 m²",

    // Vidéos
    heroVideoUrl: "drone-446712-github.mp4",
    youtubeID:"cjE4hOI7Hsw", 
    

   // Description
    description: [
        "<strong>À la recherche d'un projet modulable dans un cadre verdoyant ?</strong> Située à Abjat-sur-Bandiat, cette maison des années 70 de 133 m² habitables sur une belle parcelle close et arborée de 1 156 m² offre une configuration rare sur le marché.",
        
        "<strong>Une configuration unique : Deux logements en un !</strong><br>Actuellement organisée en deux appartements totalement indépendants (sans communication intérieure), cette propriété est parfaite pour un investissement locatif, une profession libérale, ou pour accueillir deux familles en toute autonomie.",
        
        "<strong>Rez-de-chaussée (Plain-pied) :</strong> L'entrée se fait par une agréable véranda de 7,60 m² (sas d'accueil). Vous y trouverez une cuisine dînatoire lumineuse exposée Sud, deux chambres avec vue sur le jardin, une salle d'eau, un WC indépendant et un cellier. Un grand garage de 37 m² est directement accessible depuis ce niveau.",
        
        "<strong>À l'étage (Accès par escalier extérieur) :</strong> Ce second espace de vie complet propose une entrée, un salon-séjour baigné de lumière (Sud), une cuisine indépendante, deux chambres supplémentaires, une salle de bains et un WC.",
        
        "<strong>Extérieurs et Dépendances :</strong> Le terrain, entièrement clos, est un véritable havre de paix. Il dispose de nombreux atouts : un second garage de 21 m² (idéal pour un atelier), une chaufferie indépendante de 15 m² et des abris de jardin fonctionnels.",
        
        "<strong>Performances Énergétiques Exceptionnelles :</strong> Rare pour une maison de cette époque, ce bien affiche un <strong>DPE Classé B</strong>, gage de confort et d'économies réelles grâce à une Pompe à chaleur Air/Eau et un ballon thermodynamique."
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
