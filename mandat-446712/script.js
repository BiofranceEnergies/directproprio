let player;

// Fonction obligatoire pour l'API YouTube
function onYouTubeIframeAPIReady() {
    console.log("L'API YouTube est prête, chargement de la vidéo : " + HouseData.youtubeID);
    player = new YT.Player('youtube-injector', {
        height: '100%',
        width: '100%',
        videoId: HouseData.youtubeID,
        playerVars: { 
            'rel': 0, 
            'modestbranding': 1, 
            'playsinline': 1 
        },
        events: {
            'onReady': () => console.log("Vidéo prête !"),
            'onError': (e) => console.log("Erreur YouTube : ", e)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Injection des textes
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

    // DPE / GES avec largeurs
    renderLadder('conso', HouseData.dpeLetter, HouseData.dpeValue, 'kWh/m²/an');
    renderLadder('ges', HouseData.gesLetter, HouseData.gesValue, 'kg CO2/m²/an');

    // Chapitres
    document.getElementById('data-chapters').innerHTML = HouseData.chapters.map((c, index) => `
        <div class="chapter-card" onclick="seekTo(${c.time})">
            <span class="chapter-num">0${index + 1}</span>
            <h3>${c.title}</h3>
            <span>${c.subtitle}</span>
        </div>
    `).join('');
});

function renderLadder(type, activeLetter, value, unit) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const container = document.getElementById(`dpe-ladder-${type}`);
    if(!container) return;
    container.innerHTML = letters.map((l, index) => {
        const widthClass = `w-${index + 1}`;
        return `
            <div class="dpe-row ${l === activeLetter ? 'active-row' : ''}">
                <div class="dpe-bar ${type === 'conso' ? 'class-' : 'ges-'}${l.toLowerCase()} ${widthClass}">${l}</div>
                ${l === activeLetter ? `<span class="dpe-value">${value} <span>${unit}</span></span>` : ''}
            </div>
        `;
    }).join('');
}

function seekTo(seconds) {
    if(player && player.seekTo) {
        player.seekTo(seconds, true);
        player.playVideo();
        document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
    }
}
