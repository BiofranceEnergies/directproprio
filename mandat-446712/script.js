let player; 

document.addEventListener('DOMContentLoaded', () => {
    // Remplissage des textes
    document.getElementById('data-main-title').textContent = HouseData.title;
    document.getElementById('data-subtitle').textContent = HouseData.subtitle;
    document.getElementById('data-location').textContent = HouseData.location;
    document.getElementById('data-type-title').textContent = HouseData.type;
    document.getElementById('data-verdict').textContent = HouseData.verdict;
    document.getElementById('data-agent-city').textContent = HouseData.agentCity;
    document.getElementById('data-agent-tel').href = `tel:${HouseData.agentPhone}`;

    // Vidéo Hero locale
    const heroVid = document.getElementById('data-hero-video');
    if(heroVid) heroVid.src = HouseData.heroVideoUrl;

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
            <span style="color:#EA1D54">✔</span> <span>${f.text}</span>
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
        <div class="chapter-card" onclick="seekTo(${c.time})" style="cursor:pointer;">
            <span style="display:block; font-weight:bold; color:#EA1D54">0${index + 1}</span>
            <h3 style="font-size:0.9rem; margin:5px 0;">${c.title}</h3>
            <span style="font-size:0.75rem; color:#888;">${c.subtitle}</span>
        </div>
    `).join('');
});

function renderLadder(type, activeLetter, value, unit) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const container = document.getElementById(`dpe-ladder-${type}`);
    if(!container) return;
    container.innerHTML = letters.map(l => `
        <div class="dpe-row ${l === activeLetter ? 'active-row' : ''}">
            <div class="dpe-bar ${type === 'conso' ? 'class-' : 'ges-'}${l.toLowerCase()}">${l}</div>
            ${l === activeLetter ? `<span class="dpe-value">${value} <small style="font-size:0.6rem">${unit}</small></span>` : ''}
        </div>
    `).join('');
}

function onYouTubeIframeAPIReady() {
    // Note : on utilise l'ID "youtube-injector" présent dans ton HTML
    player = new YT.Player('youtube-injector', {
        height: '100%',
        width: '100%',
        videoId: HouseData.youtubeID,
        playerVars: { 'rel': 0, 'modestbranding': 1, 'playsinline': 1 }
    });
}

function seekTo(seconds) {
    if(player && player.seekTo) {
        player.seekTo(seconds, true);
        player.playVideo();
        document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
    }
}
