/* ==========================================================================
   CONSOLE DE COMMANDE - MODIFIE LES DONNÉES DE LA MAISON ICI
   ========================================================================== */
const HouseData = {
    title: "Le Domaine des Deux Cèdres",
    subtitle: "Sarlat-la-Canéda • 4 Hectares de Sérénité",
    location: "Sarlat-la-Canéda (24200)",
    type: "Maison de caractère rénovée",
    
    price: 695000,
    feesPercent: 3.99,
    mandatRef: "358412",

    surface: "240",
    rooms: "7",
    bedrooms: "4",
    land: "4 Hectares",

    // ID Youtube (publique)
    youtubeID: "e2gSjrCwafQ", 
    // Lien vidéo fond (MP4 direct)
    heroVideoUrl: "https://raw.githubusercontent.com/BiofranceEnergies/directproprio/448ea69e534288cafa7204c71ed6da4df8c49eee/assets/video/sabouret%2012.mp4",

    dpeLetter: "D",
    dpeValue: "195",
    gesLetter: "D",
    gesValue: "38",
    energyCost: "entre 1500 € et 2100 €",

    features: [
        { icon: "rect", text: "7 pièces" },
        { icon: "bed", text: "4 chambres" },
        { icon: "bath", text: "3 salles d'eau" },
        { icon: "sun", text: "Pompe à Chaleur" },
        { icon: "pool", text: "Piscine 10x4m (Sel)" }
    ],

    chapters: [
        { time: 0, title: "Le Grand Salon", subtitle: "Rez-de-chaussée" },
        { time: 45, title: "Cuisine & Repas", subtitle: "Espace de vie" },
        { time: 90, title: "Suite Parentale", subtitle: "Espace nuit" },
        { time: 140, title: "Parc & Piscine", subtitle: "Extérieurs" }
    ],
    
    agentCity: "SARLAT-LA-CANÉDA",
    agentPhone: "06.00.00.00.00"
};

/* ==========================================================================
   MOTEUR DU SITE (NE PAS TOUCHER)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    
    // Helper texte
    function setTxt(id, txt) { 
        const el = document.getElementById(id); 
        if(el) el.innerText = txt; 
    }
    
    // 1. HEADER HERO VIDEO (MODE FORCE BRUTE)
    document.title = HouseData.title + " - Visite Privée";
    setTxt('page-title', HouseData.title);
    setTxt('data-main-title', HouseData.title);
    setTxt('data-subtitle', HouseData.subtitle);
    
    const videoHero = document.getElementById('data-hero-video');
    if(videoHero) {
        // On force les attributs vitaux pour l'autoplay
        videoHero.muted = true; // Indispensable pour Chrome/Safari
        videoHero.loop = true;
        videoHero.playsInline = true;
        
        videoHero.src = HouseData.heroVideoUrl;
        
        // On lance la lecture et on ne l'arrête JAMAIS manuellement
        var playPromise = videoHero.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // La lecture a commencé !
            })
            .catch(error => {
                // Si le navigateur bloque, on force le mute et on réessaie
                console.log("Autoplay bloqué, tentative force mute...");
                videoHero.muted = true;
                videoHero.play();
            });
        }
    }

    // 2. TEXTES ET CHIFFRES
    setTxt('data-location', HouseData.location);
    setTxt('data-type-title', HouseData.type);
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(HouseData.price);
    setTxt('data-price', formattedPrice + " €");

    setTxt('data-surface', HouseData.surface);
    setTxt('data-rooms', HouseData.rooms);
    setTxt('data-bedrooms', HouseData.bedrooms);
    setTxt('data-land', HouseData.land);

    setTxt('data-agent-city', HouseData.agentCity);
    const btnCall = document.getElementById('data-agent-tel');
    if(btnCall) btnCall.href = "tel:" + HouseData.agentPhone.replace(/\./g, '');

    // 3. LEGAL
    setTxt('legal-price', formattedPrice);
    setTxt('legal-fees', HouseData.feesPercent);
    setTxt('legal-mandat', HouseData.mandatRef);
    const netVendeur = Math.round(HouseData.price / (1 + (HouseData.feesPercent/100)));
    setTxt('legal-net-price', new Intl.NumberFormat('fr-FR').format(netVendeur));
    setTxt('data-energy-cost', "Montant estimé des dépenses annuelles d'énergie : " + HouseData.energyCost + ".");

    // 4. DPE GENERATOR
    const letters = ['A','B','C','D','E','F','G'];
    function generateLadder(targetId, activeLetter, val, unit, prefixClass) {
        const container = document.getElementById(targetId);
        if(!container) return;
        container.innerHTML = '';
        letters.forEach((l) => {
            const index = letters.indexOf(l);
            const widthClass = "w-" + (index + 1);
            const row = document.createElement('div');
            if (l === activeLetter) {
                row.className = "dpe-row active-row";
                row.innerHTML = `<div class="dpe-bar ${prefixClass}-${l.toLowerCase()} ${widthClass}">${l}</div><div class="dpe-value">${val} <span>${unit}</span></div>`;
            } else {
                row.className = "dpe-row";
                row.innerHTML = `<div class="dpe-bar ${prefixClass}-${l.toLowerCase()} ${widthClass}">${l}</div>`;
            }
            container.appendChild(row);
        });
    }
    generateLadder('dpe-ladder-conso', HouseData.dpeLetter, HouseData.dpeValue, 'kWh/m²', 'class');
    generateLadder('dpe-ladder-ges', HouseData.gesLetter, HouseData.gesValue, 'kg CO₂/m²', 'ges');

    // 5. FEATURES GENERATOR
    const featContainer = document.getElementById('data-features-list');
    if(featContainer) {
        featContainer.innerHTML = '';
        HouseData.features.forEach(f => {
            let svgPath = "";
            if(f.icon === "rect") svgPath = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>';
            else if(f.icon === "bed") svgPath = '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>';
            else if(f.icon === "bath") svgPath = '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/>';
            else if(f.icon === "sun") svgPath = '<path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/>';
            else if(f.icon === "pool") svgPath = '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>';
            else svgPath = '<circle cx="12" cy="12" r="10"/>';

            const div = document.createElement('div');
            div.className = 'feature-item';
            div.innerHTML = `<svg class="immo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg><span>${f.text}</span>`;
            featContainer.appendChild(div);
        });
    }

    // 6. YOUTUBE INJECTOR (AVEC API)
    const playerDiv = document.getElementById('youtube-injector');
    if(playerDiv) {
        playerDiv.innerHTML = `
            <iframe id="myYoutubePlayer" 
            src="https://www.youtube.com/embed/${HouseData.youtubeID}?enablejsapi=1&rel=0&modestbranding=1&showinfo=0&loop=1&playlist=${HouseData.youtubeID}" 
            title="Visite Privée" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }

    // 7. CHAPITRES
    const chapContainer = document.getElementById('data-chapters');
    if(chapContainer) {
        chapContainer.innerHTML = '';
        HouseData.chapters.forEach((c, i) => {
            const num = (i+1).toString().padStart(2, '0');
            const div = document.createElement('div');
            div.className = (i===0) ? "chapter-card active" : "chapter-card";
            div.setAttribute('onclick', `jumpToTime(${c.time}, this)`);
            div.innerHTML = `<div class="chapter-indicator"></div><div class="card-content"><span class="chapter-num">${num}</span><div class="text-group"><h3>${c.title}</h3><span class="duration">${c.subtitle}</span></div></div>`;
            chapContainer.appendChild(div);
        });
    }
});

// FONCTION SAUT VIDÉO
function jumpToTime(seconds, element) {
    var iframe = document.getElementById("myYoutubePlayer");
    if(iframe) {
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": "seekTo",
            "args": [seconds, true]
        }), "*");
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": "playVideo",
            "args": []
        }), "*");
    }
    document.querySelectorAll('.chapter-card').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
}
