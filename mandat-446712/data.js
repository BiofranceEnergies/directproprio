// 1. LES DONNÉES DU BIEN
const HouseData = {
    title: "Propriété de Caractère",
    subtitle: "Saint Martial De Valette • Calme & Élégance",
    location: "Saint Martial De Valette (24300)",
    type: "Propriété de Caractère",
    price: 320000,
    feesPercent: 6.00,
    feesSide: "acquéreur",
    mandatRef: "7890",
    surface: "135",
    rooms: "5",
    bedrooms: "3",
    land: "5 950 m²",
    heroVideoUrl: "sabouret-12.mp4",
    youtubeID: "cjE4hOI7Hsw", 
    description: [
        "Située dans un environnement calme et préservé, cette magnifique propriété de caractère offre une alliance parfaite entre le charme de l'ancien et l'élégance contemporaine.",
        "La pièce de vie principale de 54 m², avec sa cuisine ouverte et sa belle hauteur sous plafond, est le véritable cœur de la maison.",
        "À l'extérieur, le parc de 5 950m² accueille une piscine au sel (8x4m) chauffée, avec une vue dégagée sur la vallée."
    ],
    verdict: "C'est simple : pour trouver ce niveau de calme à 3 minutes de Nontron, il faut se lever tôt. Le rapport emplacement/prix est excellent.",
    dpeLetter: "D", dpeValue: "180",
    gesLetter: "B", gesValue: "8",
    energyCost: "1 200 € et 1 650 €",
    features: [
        { text: "5 pièces au total" },
        { text: "3 chambres spacieuses" },
        { text: "Piscine au sel chauffée" },
        { text: "Vue dégagée vallée" }
    ],
    chapters: [
        { time: 0, title: "Pièce de Vie", subtitle: "Cuisine & Salon" },
        { time: 67, title: "Chambre Parentale", subtitle: "Espace Suite" },
        { time: 110, title: "Chambre d'ami 1", subtitle: "Confort & Calme" },
        { time: 128, title: "Chambre d'ami 2", subtitle: "Second Couchage" },
        { time: 166, title: "Cellier", subtitle: "Rangements" }
    ],
    agentCity: "Saint Martial De Valette",
    agentPhone: "06.48.89.34.80"
};

// 2. INJECTION DES DONNÉES
let player; // Pour YouTube

document.addEventListener('DOMContentLoaded', () => {
    // Titres et Textes
    document.getElementById('data-main-title').textContent = HouseData.title;
    document.getElementById('data-subtitle').textContent = HouseData.subtitle;
    document.getElementById('data-location').textContent = HouseData.location;
    document.getElementById('data-type-title').textContent = HouseData.type;
    document.getElementById('data-verdict').textContent = HouseData.verdict;
    document.getElementById('data-agent-city').textContent = HouseData.agentCity;
    document.getElementById('data-agent-tel').href = `tel:${HouseData.agentPhone}`;

    // Prix et m2
    const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    document.getElementById('data-price').textContent = fmt.format(HouseData.price);
    document.getElementById('data-price-m2').textContent = `(${Math.round(HouseData.price / HouseData.surface)} € / m²)`;

    // Metrics
    document.getElementById('data-surface').textContent = HouseData.surface;
    document.getElementById('data-rooms').textContent = HouseData.rooms;
    document.getElementById('data-bedrooms').textContent = HouseData.bedrooms;
    document.getElementById('data-land').textContent = HouseData.land;

    // Description
    document.getElementById('data-description').innerHTML = HouseData.description.map(p => `<p style="margin-bottom:15px">${p}</p>`).join('');

    // Caractéristiques
    document.getElementById('data-features-list').innerHTML = HouseData.features.map(f => `
        <div class="feature-item" style="display:flex; align-items:center; gap:10px; margin-bottom:10px">
            <span style="color:var(--pp-red)">✔</span> <span>${f.text}</span>
        </div>
    `).join('');

    // Mentions Légales
    const prixHorsHono = Math.round(HouseData.price / (1 + HouseData.feesPercent / 100));
    document.getElementById('full-legal-text').innerHTML = `
        Prix de vente : ${fmt.format(HouseData.price)} HAI. Honoraires de ${HouseData.feesPercent}% TTC inclus à la charge de l'${HouseData.feesSide}. 
        Prix hors honoraires : ${fmt.format(prixHorsHono)}. Mandat n°${HouseData.mandatRef}. 
        DPE réalisé après le 1er Juillet 2021. Estimation des coûts annuels : ${HouseData.energyCost}.
    `;

    // DPE / GES
    renderLadder('conso', HouseData.dpeLetter, HouseData.dpeValue, 'kWh/m²/an');
    renderLadder('ges', HouseData.gesLetter, HouseData.gesValue, 'kg CO2/m²/an');
    
    // Chapitres Vidéo
    document.getElementById('data-chapters').innerHTML = HouseData.chapters.map((c, index) => `
        <div class="chapter-card" onclick="seekTo(${c.time})">
            <span>0${index + 1}</span>
            <h3>${c.title}</h3>
            <span>${c.subtitle}</span>
        </div>
    `).join('');
});

// Fonctions Utilitaires
function renderLadder(type, activeLetter, value, unit) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const container = document.getElementById(`dpe-ladder-${type}`);
    container.innerHTML = letters.map(l => `
        <div class="dpe-row ${l === activeLetter ? 'active-row' : ''}">
            <div class="dpe-bar ${type === 'conso' ? 'class-' : 'ges-'}${l.toLowerCase()}">${l}</div>
            ${l === activeLetter ? `<span class="dpe-value">${value} <small style="font-size:0.6rem">${unit}</small></span>` : ''}
        </div>
    `).join('');
}

// API YOUTUBE
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: HouseData.youtubeID,
        playerVars: { 'rel': 0, 'modestbranding': 1 }
    });
}

function seekTo(seconds) {
    player.seekTo(seconds, true);
    player.playVideo();
    document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
}
