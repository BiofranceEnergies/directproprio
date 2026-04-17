/* ==========================================================================
   MOTEUR D'AFFICHAGE DYNAMIQUE - SYLVAIN MATIGNON
   ========================================================================== */

let player; // Variable pour YouTube

document.addEventListener('DOMContentLoaded', () => {
    // 1. Injection des textes de base
    document.getElementById('data-main-title').textContent = HouseData.title;
    document.getElementById('data-subtitle').textContent = HouseData.subtitle;
    document.getElementById('data-location').textContent = HouseData.location;
    document.getElementById('data-type-title').textContent = HouseData.type;
    document.getElementById('data-verdict').textContent = HouseData.verdict;
    document.getElementById('data-agent-city').textContent = HouseData.agentCity;
    document.getElementById('data-agent-tel').href = `tel:${HouseData.agentPhone}`;

    // 2. Gestion du Prix et m²
    const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    document.getElementById('data-price').textContent = formatter.format(HouseData.price);
    
    const priceM2 = Math.round(HouseData.price / parseInt(HouseData.surface));
    document.getElementById('data-price-m2').textContent = `(${priceM2} € / m²)`;

    // 3. Chiffres Clés
    document.getElementById('data-surface').textContent = HouseData.surface;
    document.getElementById('data-rooms').textContent = HouseData.rooms;
    document.getElementById('data-bedrooms').textContent = HouseData.bedrooms;
    document.getElementById('data-land').textContent = HouseData.land;

    // 4. Vidéo Hero (Locale)
    const videoHero = document.getElementById('data-hero-video');
    if(videoHero) videoHero.src = HouseData.heroVideoUrl;

    // 5. Description (génération auto des paragraphes)
    const descBox = document.getElementById('data-description');
    descBox.innerHTML = HouseData.description.map(text => `<p style="margin-bottom:15px;">${text}</p>`).join('');

    // 6. Caractéristiques
    const featuresBox = document.getElementById('data-features-list');
    featuresBox.innerHTML = HouseData.features.map(f => `
        <div class="feature-item">
            <svg class="immo-icon" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2"/></svg>
            <span>${f.text}</span>
        </div>
    `).join('');

    // 7. Mentions Légales Automatisées
    const prixHorsHono = Math.round(HouseData.price / (1 + HouseData.feesPercent / 100));
    document.getElementById('full-legal-text').textContent = 
        `Prix : ${formatter.format(HouseData.price)} HAI. Honoraires de ${HouseData.feesPercent}% TTC inclus à la charge de l'${HouseData.feesSide}. ` +
        `Prix hors honoraires : ${formatter.format(prixHorsHono)}. Mandat n°${HouseData.mandatRef}.`;

    // 8. Affichage DPE / GES
    renderDPE();

    // 9. Chapitres Vidéo
    const chapterBox = document.getElementById('data-chapters');
    chapterBox.innerHTML = HouseData.chapters.map((chap, index) => `
        <div class="chapter-card" onclick="goToChapter(${chap.time})">
            <span class="chapter-num">0${index + 1}</span>
            <h3>${chap.title}</h3>
            <span class="duration">${chap.subtitle}</span>
        </div>
    `).join('');
});

// --- FONCTIONS DIAGNOSTICS ---
function renderDPE() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    
    // Conso
    const consoLadder = document.getElementById('dpe-ladder-conso');
    consoLadder.innerHTML = letters.map(l => `
        <div class="dpe-row ${l === HouseData.dpeLetter ? 'active-row' : ''}">
            <div class="dpe-bar class-${l.toLowerCase()} w-${letters.indexOf(l)+1}">${l}</div>
            ${l === HouseData.dpeLetter ? `<span class="dpe-value">${HouseData.dpeValue} <span>kWh/m²/an</span></span>` : ''}
        </div>
    `).join('');

    // GES
    const gesLadder = document.getElementById('dpe-ladder-ges');
    gesLadder.innerHTML = letters.map(l => `
        <div class="dpe-row ${l === HouseData.gesLetter ? 'active-row' : ''}">
            <div class="dpe-bar ges-${l.toLowerCase()} w-${letters.indexOf(l)+1}">${l}</div>
            ${l === HouseData.gesLetter ? `<span class="dpe-value">${HouseData.gesValue} <span>kg CO2/m²/an</span></span>` : ''}
        </div>
    `).join('');

    document.getElementById('data-energy-cost').textContent = `Estimation des coûts annuels : entre ${HouseData.energyCost}.`;
}

// --- FONCTIONS YOUTUBE ---
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-injector', {
        height: '100%',
        width: '100%',
        videoId: HouseData.youtubeID,
        playerVars: { 'rel': 0, 'modestbranding': 1, 'playsinline': 1 }
    });
}

function goToChapter(seconds) {
    if (player && player.seekTo) {
        player.seekTo(seconds, true);
        player.playVideo();
        document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
    }
}
